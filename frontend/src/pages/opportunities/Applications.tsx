import React, { useEffect, useState } from 'react';
import { Layers, Building, Calendar, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { apiRequest } from '../../api';

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Application Pipeline</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Active Applications ({applications.length})</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Track real-time status changes across Screening, Technical Assessments, AI Interviews, and Official Placement Offers.
        </p>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center text-slate-400 text-xs">
          No active job applications submitted yet. Explore jobs to apply with your verified Career Passport.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass-panel rounded-xl p-4 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-brand-400 font-semibold">{app.job?.organization?.name}</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{app.job?.title}</h3>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                  app.currentStage === 'OFFER' ? 'bg-emerald-900 text-emerald-300' : 'bg-brand-900/60 text-brand-300 border border-brand-800'
                }`}>
                  {app.currentStage}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};