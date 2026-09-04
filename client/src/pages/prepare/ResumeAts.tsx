import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { apiRequest } from '../../api';

export const ResumeAts: React.FC = () => {
  const [resumeText, setResumeText] = useState(
    `Full Stack Developer with experience in Python, JavaScript, TypeScript, React, Node.js, and PostgreSQL. Engineered scalable REST APIs improving query latency by 35%. Deployed production microservices using Docker on AWS.`
  );
  const [jobTitle, setJobTitle] = useState('Software Engineer - Full Stack');
  const [jobDescription, setJobDescription] = useState(
    `Seeking a Software Engineer with strong skills in Python, React, TypeScript, Docker, Kubernetes, AWS, and REST APIs to architect scalable web applications.`
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis(null);

    // 1. Create or ensure resume exists
    const createRes = await apiRequest('/resume/create', {
      method: 'POST',
      body: JSON.stringify({
        title: `${jobTitle} Resume`,
        textContent: resumeText,
      }),
    });

    if (createRes.success && createRes.data?.resume) {
      // 2. Run ATS Analysis
      const atsRes = await apiRequest('/resume/analyze', {
        method: 'POST',
        body: JSON.stringify({
          resumeId: createRes.data.resume.id,
          targetJobTitle: jobTitle,
          targetJobDescription: jobDescription,
        }),
      });

      if (atsRes.success && atsRes.data) {
        setAnalysis(atsRes.data.analysis);
      }
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Applicant Tracking System (ATS) Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Resume Intelligence & ATS Studio</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Audit your technical resume against live job descriptions. The ATS engine computes keyword density, structural metrics, and identifies critical missing competencies.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !resumeText || !jobDescription}
          className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 flex items-center space-x-1.5 transition disabled:opacity-50 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAnalyzing ? 'Analyzing ATS Alignment...' : 'Run ATS Matcher'}</span>
        </button>
      </div>

      {/* Input Split Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Resume Text */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Candidate Resume Content</span>
            <span className="text-[11px] text-slate-400">Plain text / Markdown</span>
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={10}
            className="w-full flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Right: Target Job Description */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Target Job Description</span>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-brand-300 font-semibold focus:outline-none"
            />
          </div>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
            className="w-full flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* ATS Output Results */}
      {analysis && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-medium">ATS Match Result for:</span>
              <h3 className="text-xl font-bold text-white">{analysis.targetJobTitle}</h3>
            </div>

            <div className="flex items-center space-x-3 bg-dark-900 border border-slate-800 rounded-xl px-5 py-3">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">ATS Fit Score</div>
                <div className="text-2xl font-bold text-brand-400">{analysis.atsScore}%</div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                analysis.atsScore >= 75 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {analysis.atsScore >= 75 ? 'Optimal Screening Match' : 'Keyword Revision Needed'}
              </div>
            </div>
          </div>

          {/* Keywords Match Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Matched Keywords */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Matched ATS Keywords ({analysis.matchedKeywords?.length || 0})</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedKeywords?.map((kw: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-700/60 text-emerald-200 text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                <XCircle className="w-4 h-4" />
                <span>Missing High-Priority Keywords ({analysis.missingKeywords?.length || 0})</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missingKeywords?.map((kw: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-rose-900/60 border border-rose-700/60 text-rose-200 text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Checklist */}
          {analysis.recommendations?.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Actionable ATS Recommendations:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {analysis.recommendations.map((rec: string, i: number) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};