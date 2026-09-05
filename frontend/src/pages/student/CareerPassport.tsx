import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  FolderGit2,
  Code2,
  Share2,
  ExternalLink,
  Sparkles,
  Edit3,
  X,
  Save,
  BookOpen,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { apiRequest } from '../../api';

export const CareerPassport: React.FC = () => {
  const { user, updateProfile, refreshUser } = useAuth();
  const { skills: journeySkills, projects: journeyProjects, readiness: journeyReadiness } = useCareerJourney();
  const [passport, setPassport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Edit Profile modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInstitution, setEditInstitution] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editCgpa, setEditCgpa] = useState('');
  const [editTargetRole, setEditTargetRole] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadPassport() {
      setLoading(true);
      const res = await apiRequest('/passport');
      if (res.success && res.data) {
        setPassport(res.data.passport);
      }
      setLoading(false);
    }
    loadPassport();
  }, [user]);

  const openEditModal = () => {
    setEditFirstName(user?.firstName || '');
    setEditLastName(user?.lastName || '');
    setEditInstitution(user?.profile?.institutionName || '');
    setEditBranch(user?.profile?.branch || '');
    setEditCgpa(user?.profile?.cgpa ? user.profile.cgpa.toString() : '');
    setEditTargetRole(user?.profile?.targetRole || '');
    setSaveSuccess(false);
    setShowEditModal(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    const cgpaNum = parseFloat(editCgpa);
    await updateProfile({
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      institutionName: editInstitution.trim(),
      branch: editBranch.trim(),
      cgpa: isNaN(cgpaNum) ? 0.0 : cgpaNum,
      targetRole: editTargetRole.trim(),
    });
    await refreshUser();
    setIsSavingProfile(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setShowEditModal(false);
      setSaveSuccess(false);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  const profile = passport?.profile;

  // Real user info from auth context (most up-to-date)
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const avatarInitial = firstName?.[0] || lastName?.[0] || '?';

  const institution = user?.profile?.institutionName || profile?.institutionName || profile?.institution || '';
  const branch = user?.profile?.branch || profile?.branch || profile?.department || '';
  const cgpa = user?.profile?.cgpa || profile?.cgpa || 0;
  const targetRole = user?.profile?.targetRole || profile?.targetRole || profile?.target_role || '';
  const academicStageRaw = user?.profile?.academicStage || profile?.academicStage || profile?.academic_stage || '';
  const academicStageLabel = academicStageRaw.replace(/_/g, ' ');

  const readiness = journeyReadiness;

  // Only show real skills/projects from journey context — zero dummy fallbacks
  const skills = journeySkills || [];
  const projects = journeyProjects || [];
  const submissions = passport?.codingSubmissions || [];
  const socAttempts = passport?.socIncidentAttempts || [];
  const systemDesigns = passport?.systemDesignDiagrams || [];

  return (
    <div className="space-y-6">

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-brand-400" />
                Edit Profile
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editFirstName}
                    onChange={e => setEditFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:border-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={e => setEditLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">School / College Name</label>
                <input
                  type="text"
                  value={editInstitution}
                  onChange={e => setEditInstitution(e.target.value)}
                  placeholder="e.g. Delhi Public School, IIIT Hyderabad"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Branch / Stream</label>
                <input
                  type="text"
                  value={editBranch}
                  onChange={e => setEditBranch(e.target.value)}
                  placeholder="e.g. Computer Science, Science (PCM)"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:border-brand-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">CGPA / Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={editCgpa}
                    onChange={e => setEditCgpa(e.target.value)}
                    placeholder="e.g. 8.5"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:border-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Target Role</label>
                  <input
                    type="text"
                    value={editTargetRole}
                    onChange={e => setEditTargetRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition disabled:opacity-60"
              >
                {isSavingProfile ? (
                  <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                ) : saveSuccess ? (
                  <span>✓ Saved!</span>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-purple flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-brand-500/20 flex-shrink-0">
              {avatarInitial}
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {fullName || 'Your Name'}
                </h1>
                {academicStageLabel && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300">
                    {academicStageLabel}
                  </span>
                )}
              </div>

              {(branch || institution) ? (
                <p className="text-xs text-slate-400 mt-1">
                  {[branch, institution].filter(Boolean).join(' • ')}
                </p>
              ) : (
                <button
                  onClick={openEditModal}
                  className="text-xs text-brand-400 hover:text-brand-300 mt-1 flex items-center gap-1 transition"
                >
                  <PlusCircle className="w-3 h-3" />
                  Add School / College & Branch
                </button>
              )}

              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {targetRole ? (
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                    Target Role: <strong className="text-white">{targetRole}</strong>
                  </span>
                ) : (
                  <button onClick={openEditModal} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-brand-400 hover:text-brand-300 text-xs flex items-center gap-1 transition">
                    <PlusCircle className="w-3 h-3" /> Add Target Role
                  </button>
                )}
                {cgpa > 0 && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                    CGPA: <strong className="text-emerald-400">{cgpa}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={openEditModal}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 text-xs font-medium border border-brand-600/40 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <Link
              to="/portfolio"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Career Readiness Score */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Career Readiness Score: {readiness?.overallScore || 0}%</span>
          </h2>
          <span className="text-xs text-slate-400">Earned by completing real activities</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Skills Proof</div>
            <div className="text-base font-bold text-brand-400 mt-1">{readiness?.dimensions?.skills?.weightedScore?.toFixed(0) || 0}/20</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Projects Delivered</div>
            <div className="text-base font-bold text-purple-400 mt-1">{readiness?.dimensions?.projects?.weightedScore?.toFixed(0) || 0}/20</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Labs & Coding</div>
            <div className="text-base font-bold text-emerald-400 mt-1">{readiness?.dimensions?.coding?.weightedScore?.toFixed(0) || 0}/15</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Resume & ATS</div>
            <div className="text-base font-bold text-amber-400 mt-1">{readiness?.dimensions?.resume?.weightedScore?.toFixed(0) || 0}/15</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-400">Interviews</div>
            <div className="text-base font-bold text-cyan-400 mt-1">{readiness?.dimensions?.interview?.weightedScore?.toFixed(0) || 0}/15</div>
          </div>
        </div>

        {readiness?.overallScore === 0 && (
          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300">
            <strong>Start earning your score:</strong> Complete learning topics, verify skills, and submit projects in your Stage.
          </div>
        )}
      </div>

      {/* Grid: Skills Ledger & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Ledger */}
        <div className="glass-panel rounded-xl p-5 border border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Skills Ledger ({skills.length})</span>
            </h2>
            <Link to="/skills" className="text-xs text-brand-400 hover:underline">Manage Skills</Link>
          </div>

          {skills.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <Award className="w-8 h-8 text-slate-700 mx-auto" />
              <p className="text-xs text-slate-500">No skills verified yet.</p>
              <Link
                to="/skills"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 text-brand-400 text-xs font-medium border border-brand-600/30 hover:bg-brand-600/30 transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Claim Your First Skill
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {skills.map((s: any) => (
                <div key={s.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">{s.skillName || s.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{s.evidences?.length || s.evidenceCount || 0} evidence artifacts</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    (s.status === 'VERIFIED' || s.verified) ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-400' :
                    (s.status === 'EVIDENCE_SUBMITTED' ? 'bg-brand-950/80 border border-brand-800 text-brand-400' : 'bg-slate-800 text-slate-400')
                  }`}>
                    {s.status || (s.verified ? 'VERIFIED' : 'CLAIMED')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects Proof of Work */}
        <div className="glass-panel rounded-xl p-5 border border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-brand-400" />
              <span>Projects & Proof ({projects.length})</span>
            </h2>
            <Link to="/projects" className="text-xs text-brand-400 hover:underline">+ New Project</Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <FolderGit2 className="w-8 h-8 text-slate-700 mx-auto" />
              <p className="text-xs text-slate-500">No projects added yet.</p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 text-brand-400 text-xs font-medium border border-brand-600/30 hover:bg-brand-600/30 transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add Your First Project
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {projects.map((p: any) => (
                <div key={p.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-white">{p.title}</h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-brand-400 hover:underline mt-2 text-[11px]"
                    >
                      <span>View GitHub Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Practical Labs Evidence */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent-purple" />
          <span>Practical Engineering Evidence</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <span className="text-slate-400">Coding Lab Submissions</span>
            <div className="text-lg font-bold text-white mt-1">{submissions.length} attempted</div>
            {submissions.length === 0 ? (
              <Link to="/coding" className="text-[11px] text-brand-400 hover:underline mt-1 block">
                Start Coding Lab →
              </Link>
            ) : (
              <span className="text-[11px] text-emerald-400 font-medium">
                {submissions.filter((c: any) => c.status === 'ACCEPTED').length} Accepted
              </span>
            )}
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <span className="text-slate-400">System Design Architectures</span>
            <div className="text-lg font-bold text-white mt-1">{systemDesigns.length} diagrams</div>
            {systemDesigns.length === 0 ? (
              <Link to="/system-design" className="text-[11px] text-brand-400 hover:underline mt-1 block">
                Open System Design Lab →
              </Link>
            ) : (
              <span className="text-[11px] text-purple-400 font-medium">Architecture Analyzer Verified</span>
            )}
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <span className="text-slate-400">SOC Threat Investigations</span>
            <div className="text-lg font-bold text-white mt-1">{socAttempts.length} investigated</div>
            {socAttempts.length === 0 ? (
              <Link to="/soc" className="text-[11px] text-brand-400 hover:underline mt-1 block">
                Enter SOC Simulator →
              </Link>
            ) : (
              <span className="text-[11px] text-rose-400 font-medium">
                {socAttempts.filter((s: any) => s.passed).length} Resolved Incidents
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Getting Started CTA — shown when user has zero activities */}
      {skills.length === 0 && projects.length === 0 && submissions.length === 0 && (
        <div className="glass-panel rounded-xl p-6 border border-brand-900/40 bg-brand-950/20 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-brand-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Your Career Passport is empty — let's fill it!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete learning topics, verify skills, and submit projects to build your verified proof of work.
            Everything you earn here is real — shown to recruiters and TPOs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to={`/stage/${(user?.profile?.academicStage || 'CLASS_11').toLowerCase().replace(/_/g, '-')}`}
              className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition"
            >
              Go to My Stage →
            </Link>
            <Link
              to="/skills"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              Claim a Skill
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};