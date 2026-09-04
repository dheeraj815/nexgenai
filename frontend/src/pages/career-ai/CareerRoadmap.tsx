import React, { useEffect, useState } from 'react';
import { Calendar, Sparkles, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../api';

export const CareerRoadmap: React.FC = () => {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRoadmaps = async () => {
    setLoading(true);
    const res = await apiRequest('/ai/roadmap');
    if (res.success && res.data) {
      setRoadmaps(res.data.roadmaps || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const handleGenerate = async (duration: number) => {
    setIsGenerating(true);
    await apiRequest('/ai/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify({
        durationDays: duration,
        targetRole: user?.profile?.targetRole || 'Full Stack Engineer',
      }),
    });
    setIsGenerating(false);
    await loadRoadmaps();
  };

  const activeRoadmap = roadmaps.find((r) => r.durationDays === selectedDuration) || roadmaps[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Structured Career Trajectory</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Career Learning Roadmap</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Structured week-by-week execution goals for {user?.profile?.targetRole || 'Engineering'}. These are free competency roadmaps designed to organize your learning and proof of work.
          </p>
        </div>

        {/* Duration Tabs */}
        <div className="flex items-center space-x-2">
          {[30, 60, 90].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDuration(d)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedDuration === d
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* Active Roadmap Timeline */}
      {activeRoadmap ? (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                {activeRoadmap.durationDays}-Day Learning Plan
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">{activeRoadmap.title}</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Target: {activeRoadmap.targetRole}
            </span>
          </div>

          <div className="space-y-4">
            {activeRoadmap.items?.map((item: any) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    W{item.weekNumber}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.goalDescription}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-slate-300">
                      <span>Competency: <strong className="text-brand-300">{item.skillName}</strong></span>
                      <span>Action: <strong className="text-emerald-300">{item.actionItem}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <span className="text-xs font-medium text-slate-400">Week {item.weekNumber} Milestone</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Roadmap Generated for {selectedDuration} Days Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Generate your personalized, structured {selectedDuration}-day career learning roadmap tailored to your target role and academic stage.
          </p>
          <button
            type="button"
            onClick={() => handleGenerate(selectedDuration)}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/30 inline-flex items-center space-x-2 transition disabled:opacity-50"
          >
            <span>{isGenerating ? 'Generating Roadmap...' : `Generate ${selectedDuration}-Day Roadmap`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};