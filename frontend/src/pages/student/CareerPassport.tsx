import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Award,
  FolderGit2,
  CheckCircle2,
  Code2,
  Cpu,
  Shield,
  FileText,
  Briefcase,
  Share2,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { apiRequest } from '../../api';

export const CareerPassport: React.FC = () => {
  const { user } = useAuth();
  const { skills: journeySkills, projects: journeyProjects, readiness: journeyReadiness } = useCareerJourney();
  const [passport, setPassport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  const profile = passport?.profile;
  const readiness = passport?.readiness ? {
    ...passport.readiness,
    overall_score: journeyReadiness.overallScore
  } : { overall_score: journeyReadiness.overallScore };
  const skills = (journeySkills && journeySkills.length > 0) ? journeySkills : (passport?.skills || []);
  const projects = (journeyProjects && journeyProjects.length > 0) ? journeyProjects : (passport?.projects || []);
  const submissions = passport?.codingSubmissions || [];
  const attempts = passport?.assessmentAttempts || [];
  const socAttempts = passport?.socIncidentAttempts || [];
  const systemDesigns = passport?.systemDesignDiagrams || [];
  const resumes = passport?.resumes || [];
  const offers = passport?.offers || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-purple flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-brand-500/20 flex-shrink-0">
              {passport?.user?.firstName?.[0] || 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {passport?.user?.firstName} {passport?.user?.lastName}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300">
                  {profile?.academicStage?.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {profile?.branch || 'Engineering'} • {profile?.institutionName || 'University Student'}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {profile?.targetRole && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                    Target Role: <strong className="text-white">{profile.targetRole}</strong>
                  </span>
                )}
                {profile?.cgpa && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                    CGPA: <strong className="text-emerald-400">{profile.cgpa}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
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

      {/* Career Readiness Multi-Factor Breakdown */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Career Readiness Score: {readiness?.overallScore || 0}%</span>
          </h2>
          <span className="text-xs text-slate-400">Deterministic Multi-Factor Evaluation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Skills Proof</div>
            <div className="text-base font-bold text-brand-400 mt-1">{readiness?.skills?.score || 0}/25</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Projects Delivered</div>
            <div className="text-base font-bold text-purple-400 mt-1">{readiness?.projects?.score || 0}/25</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Labs & Coding</div>
            <div className="text-base font-bold text-emerald-400 mt-1">{readiness?.assessmentsAndLabs?.score || 0}/25</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Resume & ATS</div>
            <div className="text-base font-bold text-amber-400 mt-1">{readiness?.resumeAts?.score || 0}/15</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-400">Experience</div>
            <div className="text-base font-bold text-cyan-400 mt-1">{readiness?.experience?.score || 0}/10</div>
          </div>
        </div>

        {readiness?.strengths?.length > 0 && (
          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 mb-2">
            <strong>Key Strengths:</strong> {readiness.strengths.join(' ')}
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
            <p className="text-xs text-slate-500 p-4 text-center">No skills claimed yet. Visit Skills & Proof to claim competencies.</p>
          ) : (
            <div className="space-y-2">
              {skills.map((s: any) => (
                <div key={s.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">{s.skillName}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{s.evidences?.length || 0} evidence artifacts linked</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    s.status === 'VERIFIED' ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-400' :
                    (s.status === 'EVIDENCE_SUBMITTED' ? 'bg-brand-950/80 border border-brand-800 text-brand-400' : 'bg-slate-800 text-slate-400')
                  }`}>
                    {s.status}
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
            <p className="text-xs text-slate-500 p-4 text-center">No projects added yet. Create and link your GitHub repositories.</p>
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

      {/* Practical Labs: Coding, SOC, System Design */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent-purple" />
          <span>Practical Engineering Evidence</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <span className="text-slate-400">Coding Lab Submissions</span>
            <div className="text-lg font-bold text-white mt-1">{submissions.length} attempted</div>
            <span className="text-[11px] text-emerald-400 font-medium">
              {submissions.filter((c: any) => c.status === 'ACCEPTED').length} Accepted
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <span className="text-slate-400">System Design Architectures</span>
            <div className="text-lg font-bold text-white mt-1">{systemDesigns.length} diagrams</div>
            <span className="text-[11px] text-purple-400 font-medium">Architecture Analyzer Verified</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <span className="text-slate-400">SOC Threat Investigations</span>
            <div className="text-lg font-bold text-white mt-1">{socAttempts.length} investigated</div>
            <span className="text-[11px] text-rose-400 font-medium">
              {socAttempts.filter((s: any) => s.passed).length} Resolved Incidents
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};