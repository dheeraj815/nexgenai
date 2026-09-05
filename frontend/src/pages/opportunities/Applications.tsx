import React, { useEffect, useState } from 'react';
import { 
  Layers, Building, Calendar, ArrowRight, Clock, CheckCircle2, 
  FileText, Briefcase, ChevronRight, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../api';

const PIPELINE_STAGES = ['APPLIED', 'SCREENING', 'ASSESSMENT', 'INTERVIEW', 'OFFER'];

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  useEffect(() => {
    async function loadApps() {
      setLoading(true);
      const res = await apiRequest('/jobs/applications');
      if (res.success && res.data) {
        setApplications(res.data.applications || []);
      }
      setLoading(false);
    }
    loadApps();
  }, []);

  const filtered = applications.filter(app => {
    if (selectedFilter === 'ALL') return true;
    return app.currentStage?.toUpperCase() === selectedFilter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Application Lifecycle</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Active Applications Tracker ({applications.length})</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Track live status changes across Screening, Technical Assessments, AI Interviews, and Official Placement Offers.
            </p>
          </div>

          <Link
            to="/jobs"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-500/20 flex items-center gap-1.5 self-start sm:self-center"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Browse Openings</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'APPLIED', 'SCREENING', 'ASSESSMENT', 'INTERVIEW', 'OFFER'].map(st => (
          <button
            key={st}
            onClick={() => setSelectedFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedFilter === st
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {st} {st !== 'ALL' && `(${applications.filter(a => a.currentStage?.toUpperCase() === st).length})`}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3" />
          Loading application records...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Applications Found Under {selectedFilter}</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {selectedFilter === 'ALL' 
              ? 'You have not submitted any job applications yet. Match against corporate openings with your verified Career Passport.'
              : `You currently have 0 applications in the ${selectedFilter} stage.`}
          </p>
          <div className="pt-2">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
            >
              <span>Explore Verified Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const currentStage = app.currentStage?.toUpperCase() || 'APPLIED';
            const currentStageIndex = PIPELINE_STAGES.indexOf(currentStage);

            return (
              <div
                key={app.id}
                className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                      <Building className="w-3.5 h-3.5" />
                      <span>{app.job?.organization?.name || 'Partner Employer'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{app.job?.title}</h3>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      Submitted on {new Date(app.appliedAt || app.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      currentStage === 'OFFER' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      Current Status: {currentStage}
                    </span>
                  </div>
                </div>

                {/* Progress Pipeline */}
                <div className="pt-2">
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {PIPELINE_STAGES.map((stageName, idx) => {
                      const isCompleted = idx < currentStageIndex;
                      const isCurrent = idx === currentStageIndex;

                      return (
                        <div key={stageName} className="space-y-1.5">
                          <div className={`h-1.5 rounded-full ${
                            isCompleted || isCurrent ? 'bg-blue-500' : 'bg-slate-800'
                          }`} />
                          <span className={`text-[10px] font-bold block truncate ${
                            isCurrent ? 'text-blue-400 font-extrabold' : isCompleted ? 'text-slate-300' : 'text-slate-600'
                          }`}>
                            {stageName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next Step Guidance */}
                <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>
                      {currentStage === 'OFFER' 
                        ? 'Congratulations! Review and compare compensation in Offer Launch.' 
                        : currentStage === 'INTERVIEW'
                        ? 'Technical & behavioral rounds in progress. Practice with AI Voice Interviewer.'
                        : 'Your verified credentials have been received by the recruiter.'}
                    </span>
                  </div>

                  <Link
                    to={currentStage === 'OFFER' ? '/offer-launch' : '/interview'}
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 flex-shrink-0"
                  >
                    <span>{currentStage === 'OFFER' ? 'View Offer' : 'Prep Now'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
