import React, { useEffect, useState } from 'react';
import {
  Milestone,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  GraduationCap,
  Building,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../api';

export const MyJourney: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [stages, setStages] = useState<any[]>([]);
  const [myStageData, setMyStageData] = useState<any>(null);
  const [selectedStageId, setSelectedStageId] = useState<string>('CLASS_11');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadJourney() {
      const [sRes, mRes] = await Promise.all([
        apiRequest('/journey/stages'),
        apiRequest('/journey/my-stage'),
      ]);

      if (sRes.success) setStages(sRes.data.stages || []);
      if (mRes.success) {
        setMyStageData(mRes.data);
        setSelectedStageId(mRes.data.currentStage?.id || 'CLASS_11');
      }
    }
    loadJourney();
  }, [user]);

  const currentStageId = user?.profile?.academicStage || 'CLASS_11';
  const selectedStage = stages.find(s => s.id === selectedStageId) || stages[0];

  const handleAdvanceStage = async (stageId: string) => {
    setIsUpdating(true);
    const res = await apiRequest('/journey/update-stage', {
      method: 'POST',
      body: JSON.stringify({ stage: stageId }),
    });
    if (res.success) {
      await refreshUser();
      setSelectedStageId(stageId);
    }
    setIsUpdating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
              <Milestone className="w-3.5 h-3.5" />
              <span>Campus→Career Unbroken Continuum</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              The Complete Student Journey: Class 11 to Career
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              From foundational aptitude exploration in high school to college specializations and senior industry mastery.
            </p>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Current Stage:</span>
            <span className="font-bold text-brand-400">{currentStageId.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* Timeline Ribbon */}
      <div className="glass-panel rounded-xl p-4 border border-slate-800 overflow-x-auto">
        <div className="flex items-center space-x-2 min-w-[760px]">
          {stages.map((stg, idx) => {
            const isCurrent = stg.id === currentStageId;
            const isSelected = stg.id === selectedStageId;

            return (
              <React.Fragment key={stg.id}>
                <button
                  type="button"
                  onClick={() => setSelectedStageId(stg.id)}
                  className={`flex flex-col items-center p-3 rounded-xl border text-xs transition duration-150 flex-1 ${
                    isSelected
                      ? 'bg-brand-600/25 border-brand-500 text-white shadow-md shadow-brand-500/20'
                      : (isCurrent
                          ? 'bg-slate-800/90 border-brand-500/50 text-brand-300'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200')
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    {isCurrent ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600" />
                    )}
                    <span className="font-bold whitespace-nowrap">{stg.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 text-center truncate max-w-[90px]">
                    {stg.subtitle}
                  </span>
                </button>
                {idx < stages.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Card */}
      {selectedStage && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                {selectedStage.subtitle}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{selectedStage.name}</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {selectedStage.description}
              </p>
            </div>

            {selectedStage.id !== currentStageId && (
              <button
                type="button"
                onClick={() => handleAdvanceStage(selectedStage.id)}
                disabled={isUpdating}
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/30 transition disabled:opacity-50 whitespace-nowrap"
              >
                <span>Set as My Current Stage</span>
              </button>
            )}
          </div>

          {/* Key Objectives */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Core Stage Milestones & Deliverables</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedStage.keyObjectives?.map((obj: string, i: number) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 text-[10px] font-bold mt-0.5 flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-slate-200 leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};