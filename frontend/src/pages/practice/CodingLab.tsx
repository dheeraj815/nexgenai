import React, { useEffect, useState } from 'react';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { apiRequest } from '../../api';

export const CodingLab: React.FC = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function loadProblems() {
      const res = await apiRequest('/coding/problems');
      if (res.success && res.data) {
        setProblems(res.data.problems || []);
        if (res.data.problems?.length > 0) {
          const first = res.data.problems[0];
          setSelectedProblem(first);
          setCode(first.starterCodeJs);
        }
      }
    }
    loadProblems();
  }, []);

  const handleSelectProblem = (prob: any) => {
    setSelectedProblem(prob);
    setCode(language === 'javascript' ? prob.starterCodeJs : prob.starterCodePy);
    setResult(null);
  };

  const handleRunCode = async () => {
    if (!selectedProblem) return;
    setIsRunning(true);
    setResult(null);

    const res = await apiRequest(`/coding/problems/${selectedProblem.slug}/run`, {
      method: 'POST',
      body: JSON.stringify({ code, language }),
    });

    setIsRunning(false);
    if (res.success && res.data) {
      setResult(res.data);
    }
  };

  const handleResetCode = () => {
    if (!selectedProblem) return;
    setCode(language === 'javascript' ? selectedProblem.starterCodeJs : selectedProblem.starterCodePy);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Algorithmic Execution Lab</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Coding Lab & Sandbox Runner</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Solve algorithmic problems in an isolated client-side sandbox. Passed challenges automatically elevate your verified skills in your Career Passport.
          </p>
        </div>

        {/* Problem Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Problem:</span>
          <select
            value={selectedProblem?.slug || ''}
            onChange={(e) => {
              const p = problems.find((item) => item.slug === e.target.value);
              if (p) handleSelectProblem(p);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
          >
            {problems.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split Pane */}
      {selectedProblem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Pane: Problem Description & Cases (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 space-y-5 overflow-y-auto max-h-[750px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">{selectedProblem.title}</h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                selectedProblem.difficulty === 'EASY'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {selectedProblem.difficulty}
              </span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed">
              <p>{selectedProblem.description}</p>
            </div>

            {/* Test Case Examples */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Example Test Cases</h3>
              {selectedProblem.publicTestCases?.map((tc: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-xs space-y-1">
                  <div className="text-slate-400">
                    Input: <span className="text-slate-200">{JSON.stringify(tc.input)}</span>
                  </div>
                  <div className="text-slate-400">
                    Expected: <span className="text-brand-300">{JSON.stringify(tc.expectedOutput)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Pane: Code Editor & Execution Console (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Editor Toolbar */}
            <div className="glass-panel rounded-xl p-3 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400">Language:</span>
                <span className="text-xs font-mono font-semibold text-brand-400 px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">
                  JavaScript (Sandbox V8)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleResetCode}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 flex items-center space-x-1.5 transition disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Executing...' : 'Run & Submit Solution'}</span>
                </button>
              </div>
            </div>

            {/* Code Textarea / Editor */}
            <div className="glass-panel rounded-xl p-4 border border-slate-800 flex-1 min-h-[360px] flex flex-col">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full flex-1 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none resize-none"
              />
            </div>

            {/* Execution Output Console */}
            {result && (
              <div className={`glass-panel rounded-xl p-4 border transition-all ${
                result.allPassed ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-rose-500/40 bg-rose-950/10'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {result.allPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span className="text-xs font-bold text-white">
                      Status: {result.status}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({result.passedCount}/{result.totalCount} test cases passed)
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{result.runtimeMs} ms</span>
                  </div>
                </div>

                {/* Test case rows */}
                <div className="space-y-1.5">
                  {result.results?.map((r: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-2 rounded font-mono text-[11px] flex justify-between items-center ${
                        r.passed ? 'bg-emerald-950/30 text-emerald-300' : 'bg-rose-950/30 text-rose-300'
                      }`}
                    >
                      <span>Test Case {r.testCase}</span>
                      <span>{r.passed ? 'PASSED' : (r.error || 'WRONG ANSWER')}</span>
                    </div>
                  ))}
                </div>

                {result.allPassed && (
                  <div className="mt-3 pt-2 border-t border-emerald-800/40 text-[11px] text-emerald-300 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Verified competency credited to your Career Passport!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};