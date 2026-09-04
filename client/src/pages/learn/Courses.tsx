import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Clock, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { apiRequest } from '../../api';

export const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const domainParam = searchParams.get('domain');

  const [courses, setCourses] = useState<any[]>([]);
  const [stageFilter, setStageFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      let url = '/learning/courses';
      const params = new URLSearchParams();
      if (domainParam) params.append('domain', domainParam);
      if (stageFilter !== 'ALL') params.append('stage', stageFilter);

      const qs = params.toString();
      if (qs) url += `?${qs}`;

      const res = await apiRequest(url);
      if (res.success && res.data) {
        setCourses(res.data.courses || []);
      }
      setLoading(false);
    }
    loadCourses();
  }, [domainParam, stageFilter]);

  const stages = ['ALL', 'CLASS_11', 'CLASS_12', 'YEAR_1', 'YEAR_2', 'YEAR_3', 'YEAR_4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic Stage Curriculum</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Structured Course Engine</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Modular, progression-based courses engineered for high school discovery and college technical mastery.
        </p>

        {/* Stage Filter */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {stages.map((stg) => (
            <button
              key={stg}
              onClick={() => setStageFilter(stg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                stageFilter === stg
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {stg === 'ALL' ? 'All Stages' : stg.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((c) => (
          <div
            key={c.id}
            className="glass-panel glass-panel-hover rounded-xl p-5 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2.5">
                <span className="text-[10px] font-semibold text-brand-400 uppercase bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                  {c.domain?.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {c.academicStage.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{c.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">{c.summary}</p>

              <div className="flex items-center space-x-4 mt-4 text-[11px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{c.estimatedHours} hrs</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BarChart className="w-3.5 h-3.5 text-slate-500" />
                  <span>{c.difficulty}</span>
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Progress: <strong className="text-white">{c.progressPercent || 0}%</strong>
              </div>
              <Link
                to={`/courses/${c.slug}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition"
              >
                <span>Learn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};