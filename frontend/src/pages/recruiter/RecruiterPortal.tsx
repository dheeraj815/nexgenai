import React, { useEffect, useState } from 'react';
import { Briefcase, Search, Users, ExternalLink, Award, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { apiRequest } from '../../api';

export const RecruiterPortal: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [skillFilter, setSkillFilter] = useState('');
  const [minReadiness, setMinReadiness] = useState('40');
  const [loading, setLoading] = useState(true);
  const [extendingOfferTo, setExtendingOfferTo] = useState<any>(null);
  const [offerRole, setOfferRole] = useState('Software Development Engineer');
  const [offerCtc, setOfferCtc] = useState('18.5');
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);

  const searchCandidates = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (skillFilter) params.append('skill', skillFilter);
    if (minReadiness) params.append('minReadiness', minReadiness);

    const res = await apiRequest(`/recruiter/talent-search?${params.toString()}`);
    if (res.success && res.data) {
      setCandidates(res.data.candidates || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchCandidates();
  }, [minReadiness]);

  const handleIssueOffer = async () => {
    if (!extendingOfferTo) return;
    setIsSubmittingOffer(true);
    await apiRequest('/recruiter/offers', {
      method: 'POST',
      body: JSON.stringify({
        userId: extendingOfferTo.id,
        role: offerRole,
        ctcSalary: parseFloat(offerCtc),
        companyName: 'Corporate Hiring Partner',
      }),
    });
    setIsSubmittingOffer(false);
    setExtendingOfferTo(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Verified Modern Hiring Surface</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Recruiter OS & Talent Search</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Discover vetted engineering talent with authentic GitHub evidence, algorithmic Coding Lab metrics, and high Career Readiness scores.
        </p>

        {/* Filter Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter by verified skill (e.g. Python, React)..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Min Readiness:</span>
            <select
              value={minReadiness}
              onChange={(e) => setMinReadiness(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
            >
              <option value="20">20%+ (Foundational)</option>
              <option value="40">40%+ (Intermediate)</option>
              <option value="70">70%+ (Placement Ready)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={searchCandidates}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
          >
            Filter Talent Pool
          </button>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    {cand.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{cand.name}</h3>
                    <span className="text-[11px] text-slate-400 block">{cand.targetRole || 'Engineering Student'}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Readiness</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{cand.readinessScore}%</span>
                </div>
              </div>

              {/* Verified Skills */}
              <div className="mt-3">
                <span className="text-[10px] font-semibold text-slate-400 block mb-1">VERIFIED SKILLS</span>
                <div className="flex flex-wrap gap-1">
                  {cand.verifiedSkills?.length > 0 ? (
                    cand.verifiedSkills.slice(0, 4).map((sk: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-emerald-300 font-medium">
                        {sk}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-500">Skills claimed / In progress</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
              {cand.githubUrl ? (
                <a
                  href={cand.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-slate-400 hover:text-white text-xs"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-slate-500">No public repo</span>
              )}

              <button
                type="button"
                onClick={() => setExtendingOfferTo(cand)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
              >
                Extend Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Modal */}
      {extendingOfferTo && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">
              Extend Job Offer to {extendingOfferTo.name}
            </h3>
            <p className="text-xs text-slate-400">
              The candidate will receive an official notification and verified offer in their Career Passport.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Position / Role Title</label>
                <input
                  type="text"
                  value={offerRole}
                  onChange={(e) => setOfferRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-300 mb-1">CTC Compensation (LPA)</label>
                <input
                  type="text"
                  value={offerCtc}
                  onChange={(e) => setOfferCtc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setExtendingOfferTo(null)}
                className="flex-1 py-2 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleIssueOffer}
                disabled={isSubmittingOffer}
                className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition disabled:opacity-50"
              >
                <span>{isSubmittingOffer ? 'Transmitting...' : 'Issue Offer'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};