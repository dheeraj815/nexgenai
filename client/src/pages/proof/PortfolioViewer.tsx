import React, { useEffect, useState } from 'react';
import { Share2, ExternalLink, Award, FolderGit2, CheckCircle2, Globe2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../api';

export const PortfolioViewer: React.FC = () => {
  const { user } = useAuth();
  const [passport, setPassport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await apiRequest('/passport');
      if (res.success && res.data) {
        setPassport(res.data.passport);
      }
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  const profile = passport?.profile;
  const skills = passport?.skills || [];
  const projects = passport?.projects || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Hero Section */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-purple mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-brand-500/25 mb-4">
          {passport?.user?.firstName?.[0] || 'U'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {passport?.user?.firstName} {passport?.user?.lastName}
        </h1>
        <p className="text-sm font-medium text-brand-400 mt-1">
          {profile?.targetRole || 'Software Engineer'} • {profile?.institutionName || 'University Student'}
        </p>
        <p className="text-xs text-slate-400 max-w-lg mx-auto mt-3 leading-relaxed">
          {profile?.bio || 'Passionate engineer creating robust software, distributed architectures, and verified proofs of work.'}
        </p>

        <div className="flex items-center justify-center space-x-3 mt-6">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
            Career Readiness: {passport?.readiness?.overallScore || 0}%
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-brand-950 border border-brand-800 text-brand-300 font-semibold">
            Stage: {profile?.academicStage?.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Verified Skills */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Verified Skills & Competencies</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map((s: any) => (
            <div key={s.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center text-xs">
              <span className="font-semibold text-white truncate">{s.skillName}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Delivered Projects */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5">
        <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-brand-400" />
          <span>Delivered Engineering Projects</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p: any) => (
            <div key={p.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
              </div>

              {p.githubUrl && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-brand-400 hover:underline font-semibold"
                  >
                    <span>View GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};