import React, { useEffect, useState } from 'react';
import { 
  Briefcase, Building, MapPin, CheckCircle2, XCircle, ArrowRight, 
  Sparkles, Search, Filter, ShieldCheck, ChevronDown, ChevronUp, AlertCircle, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../api';
import { useCareerJourney } from '../../context/CareerJourneyContext';

export const Jobs: React.FC = () => {
  const { skills, readiness } = useCareerJourney();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('ALL');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

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

  const handleApply = async (job: any) => {
    setApplyingId(job.id);
    await apiRequest(`/jobs/${job.id}/apply`, {
      method: 'POST',
      body: JSON.stringify({ 
        coverNote: `Applied using verified Career Passport with ${skills.length} verified skills and ${readiness.overallScore}% readiness.` 
      }),
    });
    setApplyingId(null);
    setApplicationSuccess(job.title);
    setTimeout(() => setApplicationSuccess(null), 4000);
    await loadJobs();
  };

  const studentSkillNames = skills.map(s => s.name.toLowerCase());

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.organization?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = selectedMode === 'ALL' || job.workMode?.toUpperCase() === selectedMode;
    return matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Real Employer Job Matching Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Active Opportunities & Match Analysis</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Authentic partner openings evaluated live against your verified Career Passport. Zero fabricated jobs or synthetic applicants.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/applications"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition border border-slate-700"
            >
              My Applications
            </Link>
            <Link
              to="/companies"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-500/20"
            >
              Prepare For Top Companies
            </Link>
          </div>
        </div>
      </div>

      {applicationSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Successfully submitted application for <strong>{applicationSuccess}</strong> using verified Career Passport credentials!</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role title, employer name, or tech requirements..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'REMOTE', 'HYBRID', 'ON-SITE'].map(mode => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedMode === mode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Feed */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3" />
          Analyzing Career Passport alignment against live employer database...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="p-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Live Job Provider Connected Or Listings Matching Filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Per Section 19 & 73 of the NexGenAI specification, we never fabricate fake jobs. Openings appear when partner recruiters schedule active hiring drives.
          </p>
          <div className="pt-2">
            <Link
              to="/companies"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Company Sprints & Interview Prep</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            const requiredSkills: string[] = job.skillsRequired || [];
            const matchedSkills = requiredSkills.filter(s => studentSkillNames.includes(s.toLowerCase()));
            const missingSkills = requiredSkills.filter(s => !studentSkillNames.includes(s.toLowerCase()));
            const dynamicMatchScore = requiredSkills.length > 0 
              ? Math.round((matchedSkills.length / requiredSkills.length) * 100) 
              : 0;

            return (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5" />
                        {job.organization?.name || 'Verified Employer'}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location} ({job.workMode})
                      </span>
                      {job.salaryRange && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs font-semibold text-emerald-400">{job.salaryRange}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">{job.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 max-w-2xl">{job.description}</p>
                  </div>

                  {/* Match Pill & Action */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Passport Affinity</span>
                      <span className={`text-lg font-bold font-mono ${
                        dynamicMatchScore >= 70 ? 'text-emerald-400' : dynamicMatchScore >= 40 ? 'text-blue-400' : 'text-slate-400'
                      }`}>
                        {dynamicMatchScore}%
                      </span>
                    </div>

                    {job.application ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                        Applied ({job.application.currentStage || 'Screening'})
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApply(job)}
                        disabled={applyingId === job.id}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md flex items-center space-x-1.5 transition disabled:opacity-50"
                      >
                        <span>{applyingId === job.id ? 'Submitting...' : 'Apply with Passport'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Match Analysis Toggle */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                    className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <span>{isExpanded ? 'Hide Match Breakdown' : 'View Deep Match Breakdown'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <span className="text-[11px] text-slate-500">
                    {matchedSkills.length} of {requiredSkills.length} required skills verified
                  </span>
                </div>

                {/* Expanded Match Breakdown (Section 19) */}
                {isExpanded && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Skills You Have */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Skills You Have ({matchedSkills.length})</span>
                        </div>
                        {matchedSkills.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {matchedSkills.map(sk => (
                              <span key={sk} className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                                {sk} ✓
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-500 italic">No exact verified skills matched for this listing yet.</p>
                        )}
                      </div>

                      {/* Skills You Need */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                          <XCircle className="w-4 h-4" />
                          <span>Skills You Need ({missingSkills.length})</span>
                        </div>
                        {missingSkills.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {missingSkills.map(sk => (
                              <span key={sk} className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                                {sk}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-emerald-400 font-semibold">100% skill match! You fulfill all listed technical requirements.</p>
                        )}
                      </div>
                    </div>

                    {/* Recommended Next Step */}
                    <div className="pt-2 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <span className="text-slate-400">
                        Target Role: <strong>{job.title}</strong> • Experience Level: <strong>{job.experienceLevel || 'Fresher / Graduate'}</strong>
                      </span>
                      <Link
                        to="/companies"
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                      >
                        <span>Start 4-Week Prep Roadmap For This Employer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
