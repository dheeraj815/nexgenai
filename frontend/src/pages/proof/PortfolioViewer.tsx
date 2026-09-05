import React, { useState } from 'react';
import { 
  Share2, ExternalLink, Award, FolderGit2, CheckCircle2, Globe2, 
  Sparkles, Copy, Check, Eye, Lock, Download, Github, Linkedin, Mail 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareerJourney } from '../../context/CareerJourneyContext';

export const PortfolioViewer: React.FC = () => {
  const { user } = useAuth();
  const { skills, projects, readiness, academicProfile } = useCareerJourney();
  const [isCopied, setIsCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || '' : '';
  const targetRole = user?.profile?.targetRole || '';
  const academicStage = user?.profile?.academicStage || '';
  const institution = academicProfile.collegeName || user?.profile?.institutionName || '';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleExportJson = () => {
    const data = {
      user: {
        name: fullName,
        email: user?.email,
        academicStage: academicStage,
      },
      academicProfile,
      readinessScore: readiness.overallScore,
      readinessBreakdown: readiness,
      verifiedSkills: skills,
      deliveredProjects: projects,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CareerPassport_${fullName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              isPublic 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isPublic ? <Eye className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isPublic ? 'Public Portfolio (Visible to Recruiters)' : 'Private Mode'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Proof</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Link Copied!' : 'Share Portfolio'}</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-8 sm:p-12 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-500/25">
          {fullName[0] || '?'}
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {fullName}
          </h1>
          <p className="text-sm font-semibold text-blue-400 mt-1">
            {[targetRole, institution].filter(Boolean).join(' • ')}
          </p>
          <p className="text-xs text-slate-400 max-w-lg mx-auto mt-2 leading-relaxed">
            Verified candidate profile backed by cryptographic proof of work, practical coding submissions, and academic credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
            Readiness Score: {readiness.overallScore}%
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold">
            Stage: {academicStage.replace(/_/g, ' ')}
          </span>
          {academicProfile.cgpa > 0 && (
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold">
              CGPA: {academicProfile.cgpa.toFixed(1)} / 10.0
            </span>
          )}
        </div>
      </div>

      {/* Verified Skills */}
      <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Verified Skills & Competencies ({skills.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Validated through assessments & code submissions</span>
        </div>

        {skills.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-950/50 rounded-xl border border-slate-800/80">
            No skills verified yet. Complete topics or assessments across any stage to earn verified proof badges.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.map((s) => (
              <div key={s.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-white block">{s.name}</span>
                  <span className="text-[10px] text-slate-400">{s.category} • {s.level}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivered Projects */}
      <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <span>Delivered Engineering Projects ({projects.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Source code & production architectures</span>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-950/50 rounded-xl border border-slate-800/80">
            No projects submitted yet. Build milestone projects in Project Labs to display proof here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{p.title}</h3>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {p.techStack?.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                {p.githubUrl && (
                  <div className="pt-2 border-t border-slate-900">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:underline font-semibold"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View GitHub Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Academic Credentials Section */}
      <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider">
          Academic Credentials & Verification
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-500 block">Institution</span>
            <span className="text-white font-bold">{institution}</span>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-500 block">Branch & Discipline</span>
            <span className="text-white font-bold">{academicProfile.branch}</span>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-500 block">Current Academic Standing</span>
            <span className="text-white font-bold">
              {academicProfile.cgpa > 0 ? `${academicProfile.cgpa.toFixed(1)} CGPA` : 'Pending Input'} • {academicProfile.backlogs} Backlogs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
