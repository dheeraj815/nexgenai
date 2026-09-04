import React, { useEffect, useState } from 'react';
import { Briefcase, Building, MapPin, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { apiRequest } from '../../api';

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);

  const loadJobs = async () => {
    setLoading(true);
    const res = await apiRequest('/jobs');
    if (res.success && res.data) {
      setJobs(res.data.jobs || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleApply = async (jobId: string) => {
    setApplyingId(jobId);
    await apiRequest(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify({ coverNote: 'Applying via NexGenAI verified Career Passport' }),
    });
    setApplyingId(null);
    await loadJobs();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Verified Industry Hiring</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Active Opportunities & Job Matching</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Real corporate hiring partner openings matched directly against your verified Career Passport skills. No fake listings.
        </p>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-brand-400">{job.organization?.name}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location} ({job.workMode})
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">{job.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 max-w-2xl">{job.description}</p>

              {/* Skills Match Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.skillsRequired?.map((sk: string, i: number) => {
                  const hasSkill = job.matchingSkills?.includes(sk);
                  return (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center space-x-1 ${
                        hasSkill
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {hasSkill && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      <span>{sk}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right Action & Match Meter */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Match Affinity</span>
                <span className="text-lg font-bold text-brand-400 font-mono">{job.matchScore}%</span>
              </div>

              {job.application ? (
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                  Applied ({job.application.currentStage})
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApply(job.id)}
                  disabled={applyingId === job.id}
                  className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 flex items-center space-x-1.5 transition disabled:opacity-50"
                >
                  <span>{applyingId === job.id ? 'Applying...' : 'Apply with Passport'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};