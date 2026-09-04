import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Award, AlertCircle, ArrowRight, XCircle, Sparkles } from 'lucide-react';
import { apiRequest } from '../../api';

export const Assessments: React.FC = () => {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [activeAssessment, setActiveAssessment] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadAssessments = async () => {
    setLoading(true);
    const res = await apiRequest('/assessments');
    if (res.success && res.data) {
      setAssessments(res.data.assessments || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const handleStartAssessment = async (slug: string) => {
    setLoading(true);
    const res = await apiRequest(`/assessments/${slug}`);
    if (res.success && res.data) {
      setActiveAssessment(res.data.assessment);
      setAnswers({});
      setResult(null);
    }
    setLoading(false);
  };

  const handleSubmitAttempt = async () => {
    if (!activeAssessment) return;
    setIsSubmitting(true);
    const res = await apiRequest(`/assessments/${activeAssessment.slug}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers, timeSpentSeconds: 120 }),
    });
    setIsSubmitting(false);
    if (res.success && res.data) {
      setResult(res.data.attempt);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Competency Assessment Engine</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Skill Assessments & Quizzes</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Validate technical aptitude through domain evaluations. Passing assessments with 70%+ elevates your skill status to ASSESSED and 85%+ to VERIFIED.
        </p>
      </div>

      {!activeAssessment ? (
        /* Catalog Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assessments.map((a) => (
            <div
              key={a.id}
              className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-semibold text-brand-400 uppercase bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                    {a.academicStage.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {a.timeLimitMinutes} min
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{a.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{a.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">{a._count?.questions || 3} Questions</span>
                <button
                  type="button"
                  onClick={() => handleStartAssessment(a.slug)}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition"
                >
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Assessment Runner */
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">{activeAssessment.title}</h2>
              <span className="text-xs text-slate-400">Pass mark: {activeAssessment.passPercentage}%</span>
            </div>

            <button
              type="button"
              onClick={() => { setActiveAssessment(null); setResult(null); }}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Back to Catalog
            </button>
          </div>

          {!result ? (
            <div className="space-y-6">
              {activeAssessment.questions?.map((q: any, qIdx: number) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-white">
                    {qIdx + 1}. {q.questionText}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options?.map((opt: any) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAnswers({ ...answers, [q.id]: opt.id })}
                        className={`p-3 rounded-lg border text-left text-xs transition ${
                          answers[q.id] === opt.id
                            ? 'bg-brand-600/20 border-brand-500 text-white font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <span className="font-bold mr-2 text-brand-400">{opt.id}.</span>
                        <span>{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleSubmitAttempt}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/30 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Evaluating Assessment...' : 'Submit Answers for Scoring'}
              </button>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-5">
              <div className={`p-6 rounded-2xl border text-center ${
                result.passed ? 'bg-emerald-950/20 border-emerald-800 text-emerald-300' : 'bg-rose-950/20 border-rose-800 text-rose-300'
              }`}>
                <h3 className="text-2xl font-extrabold">{result.percentage}% Score</h3>
                <p className="text-xs mt-1">
                  {result.passed ? 'Congratulations! You passed this assessment.' : 'You did not meet the pass mark this time.'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Answer Review</h4>
                {result.questionReview?.map((rev: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>{idx + 1}. {rev.questionText}</span>
                      {rev.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Your choice: <strong className={rev.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>{rev.selected || 'None'}</strong> | Correct: <strong className="text-emerald-400">{rev.correctAnswer}</strong>
                    </div>
                    <p className="text-slate-300 text-[11px] mt-1 italic">{rev.explanation}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => { setActiveAssessment(null); setResult(null); loadAssessments(); }}
                className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};