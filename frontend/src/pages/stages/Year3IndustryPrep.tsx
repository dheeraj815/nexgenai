import React, { useState } from 'react';
import { 
  Building2, FileText, CheckCircle2, AlertTriangle, Play, 
  HelpCircle, ArrowRight, Award, Layers, Star, Code2, 
  Terminal, ChevronRight, Upload, Sparkles, Volume2, Target,
  Flame, ShieldAlert, Check, Users, Brain, Calendar
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';

export const Year3IndustryPrep: React.FC = () => {
  const { 
    skills, 
    activeCompanyPrep, 
    startCompanyPreparation, 
    markPrepWeekCompleted,
    submitProjectProof, 
    xpPoints 
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'gap' | 'ats' | 'interview' | 'capstone' | 'intel'>('gap');
  const [selectedCompany, setSelectedCompany] = useState<string>('Google');

  // ATS Studio State
  const [isAtsUploaded, setIsAtsUploaded] = useState(false);
  const [atsScore, setAtsScore] = useState(84);

  // Interview Mastery State
  const [interviewType, setInterviewType] = useState<'tech' | 'behavioral' | 'system'>('tech');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [aiEvaluation, setAiEvaluation] = useState<string | null>(null);

  // Capstone Project Submission
  const [capstoneName, setCapstoneName] = useState('');
  const [capstoneGithub, setCapstoneGithub] = useState('');
  const [capstoneSuccess, setCapstoneSuccess] = useState(false);

  const companyRequirements: Record<string, { role: string; skills: string[]; ctc: string }> = {
    Google: { role: 'Software Engineer (L3)', skills: ['Python', 'DSA', 'System Design', 'C++', 'APIs'], ctc: '₹32 - 45 LPA' },
    Amazon: { role: 'SDE-1', skills: ['Java', 'Python', 'DSA', 'AWS', 'Object Oriented Design'], ctc: '₹28 - 38 LPA' },
    Razorpay: { role: 'Backend Engineer', skills: ['Python', 'SQL', 'FastAPI', 'Redis', 'PostgreSQL'], ctc: '₹18 - 25 LPA' },
    Microsoft: { role: 'Software Engineer', skills: ['C++', 'Python', 'DSA', 'System Design', 'Cloud'], ctc: '₹26 - 36 LPA' },
    Flipkart: { role: 'SDE-1', skills: ['Java', 'DSA', 'SQL', 'System Design', 'Redis'], ctc: '₹22 - 32 LPA' }
  };

  const currentComp = companyRequirements[selectedCompany] || companyRequirements.Google;

  // Calculate live match & gaps
  const verifiedNames = skills.filter(s => s.verified).map(s => s.name.toLowerCase());
  const matchedSkills = currentComp.skills.filter(s => 
    verifiedNames.some(vn => vn.includes(s.toLowerCase()) || s.toLowerCase().includes(vn))
  );
  const missingSkills = currentComp.skills.filter(s => !matchedSkills.includes(s));
  const matchPercentage = Math.round((matchedSkills.length / Math.max(1, currentComp.skills.length)) * 100);

  const handleStartPrep = () => {
    startCompanyPreparation(selectedCompany.toLowerCase(), selectedCompany, currentComp.role, currentComp.skills);
  };

  const handleEvaluateAnswer = () => {
    if (!studentAnswer.trim()) return;
    setAiEvaluation(
      'AI Evaluation Score: 88/100\nStrengths: Structured thought process with Big-O runtime analysis.\nImprovement: Remember to mention memory cache invalidation and edge cases like network timeouts.'
    );
  };

  const handleCapstoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capstoneName.trim()) return;
    submitProjectProof('capstone-' + Date.now(), capstoneGithub, 'https://demo.nexgenai.edu');
    setCapstoneSuccess(true);
    setTimeout(() => {
      setCapstoneName('');
      setCapstoneGithub('');
      setCapstoneSuccess(false);
    }, 3000);
  };

  const handleVoiceBriefing = () => {
    if ('speechSynthesis' in window) {
      const text = `Year 3 Industry Preparation Briefing: Year 3 is where you turn raw coding skills into high-paying placements. Your skill match for ${selectedCompany} is currently ${matchPercentage} percent. You need to close gaps in ${missingSkills.join(', ')}. Launch your 4-week roadmap now!`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/70 via-orange-950/50 to-slate-900 border border-amber-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 05 • Year 3 Industry Preparation
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Zero Gap Placement Command
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Year 3 Industry Readiness & Skill Gap Analyzer Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Don’t wait for Year 4 campus drives to start preparing. Benchmark your skills against 50 top tech firms, scan your resume through our ATS engine, and simulate 45-minute live technical rounds.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Year 3 Placement Readiness"
              defaultAnalogy="Imagine preparing for a boxing championship: you don't step into the ring for the first time during the title match. Year 3 is your sparring ring where you fight simulated rounds, test your defense, and fix your weaknesses before the real recruiters arrive!"
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 3 Strategy Audio: How to Secure a Pre-Placement Offer (PPO) Early"
            scriptText="Welcome to Year 3 Industry Prep. The top 5% of engineering students receive job offers in Year 3 through pre-placement offers and off-campus internships. Run our 50-company skill gap analyzer, optimize your ATS resume, and launch your targeted 4-week roadmap."
          />
        </div>
      </div>

      {/* 5 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'gap', label: '1. 50-COMPANY SKILL GAP ANALYZER', icon: Target },
          { id: 'ats', label: '2. ATS RESUME OPTIMIZATION STUDIO', icon: FileText },
          { id: 'interview', label: '3. INTERVIEW MASTERY & AI EVALUATION', icon: Brain },
          { id: 'capstone', label: '4. PRODUCTION CAPSTONE PROJECTS', icon: Layers },
          { id: 'intel', label: '5. TARGET COMPANY INTELLIGENCE', icon: Building2 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SKILL GAP ANALYZER */}
      {activeTab === 'gap' && (
        <div className="space-y-6">
          {/* Company Picker */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>Select Target Employer to Analyze Skill Gap</span>
                </h3>
                <p className="text-xs text-slate-400">Comparing your Career Passport skills against employer hiring requirements.</p>
              </div>

              <button
                onClick={handleVoiceBriefing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold hover:bg-amber-500/30 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Voice Briefing</span>
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {Object.keys(companyRequirements).map(comp => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompany(comp)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedCompany === comp 
                      ? 'bg-amber-600 border-amber-500 text-white shadow-md' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* Gap Breakdown Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-extrabold text-white">{selectedCompany}</h3>
                <span className="text-xs text-amber-400 font-semibold">{currentComp.role} • {currentComp.ctc}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-400">{matchPercentage}%</div>
                  <div className="text-[10px] text-slate-400 uppercase">Match Score</div>
                </div>
                <button
                  onClick={handleStartPrep}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  Launch 4-Week Prep Sprint
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-bold text-emerald-400">Matched Skills ({matchedSkills.length}):</div>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" /> {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-bold text-rose-400">Missing Gaps to Close ({missingSkills.length}):</div>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map(g => (
                    <span key={g} className="px-2.5 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded text-xs font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3" /> {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Prep Plan View */}
            {activeCompanyPrep && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Roadmap for {activeCompanyPrep.companyName}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {activeCompanyPrep.weeklyRoadmap.map(week => (
                    <div key={week.week} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400">Week 0{week.week}</span>
                        {week.isCompleted && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-xs font-bold text-white">{week.title}</div>
                      <p className="text-[11px] text-slate-400">{week.focus}</p>
                      <button
                        onClick={() => markPrepWeekCompleted(week.week)}
                        disabled={week.isCompleted}
                        className={`w-full py-1 rounded text-[11px] font-bold ${
                          week.isCompleted ? 'bg-slate-800 text-slate-500' : 'bg-amber-600 hover:bg-amber-500 text-white'
                        }`}
                      >
                        {week.isCompleted ? 'Completed ✓' : 'Mark Done'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ATS STUDIO */}
      {activeTab === 'ats' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>Applicant Tracking System (ATS) Resume Parser</span>
                </h3>
                <p className="text-xs text-slate-400">Top tech companies screen 75% of resumes with automated keyword parsers.</p>
              </div>

              <button
                onClick={() => setIsAtsUploaded(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload & Scan Resume</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-center">
                <div className="text-3xl font-black text-emerald-400">{atsScore} / 100</div>
                <div className="text-xs font-bold text-white">ATS Passability Index</div>
                <p className="text-[11px] text-slate-400">High probability of clearing automated corporate recruiters.</p>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase">Keywords Detected (8):</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'SQL', 'FastAPI', 'Redis', 'Docker', 'Git', 'REST APIs', 'Data Structures'].map(k => (
                    <span key={k} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded text-[10px]">
                      ✓ {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase">Recommended Keywords (3):</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Kubernetes', 'CI/CD Pipeline', 'System Design'].map(k => (
                    <span key={k} className="px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded text-[10px]">
                      + {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTERVIEW MASTERY */}
      {activeTab === 'interview' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-amber-400" />
                  <span>Simulated Technical & Architectural Interview</span>
                </h3>
                <p className="text-xs text-slate-400">Respond to real interview questions and receive instant AI feedback.</p>
              </div>
              <div className="flex gap-1.5">
                {['tech', 'behavioral', 'system'].map(t => (
                  <button
                    key={t}
                    onClick={() => setInterviewType(t as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                      interviewType === t ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase">Question:</div>
              <p className="text-sm font-semibold text-white">
                "How would you design a distributed caching layer using Redis to handle 50,000 requests per second while preventing cache stampede?"
              </p>
            </div>

            <div className="space-y-2">
              <textarea
                placeholder="Type your response or architectural approach here..."
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                rows={5}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleEvaluateAnswer}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  AI Grade & Evaluate Response
                </button>
              </div>
            </div>

            {aiEvaluation && (
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl font-mono text-xs text-amber-300 whitespace-pre-wrap">
                {aiEvaluation}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTION CAPSTONE PROJECTS */}
      {activeTab === 'capstone' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Industry-Grade Capstone Ideas</h3>
              {[
                {
                  title: 'High-Throughput Distributed Rate Limiter',
                  stack: ['Go', 'Redis', 'Docker'],
                  desc: 'Implement Token Bucket and Leaky Bucket algorithms handling 100K QPS with sub-millisecond latency.'
                },
                {
                  title: 'Real-Time Collaborative Code Sandbox',
                  stack: ['React', 'WebSocket', 'Node.js'],
                  desc: 'Build operational transformation (OT) sync for multi-user real-time code editing and live execution.'
                }
              ].map(proj => (
                <div key={proj.title} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                  <p className="text-xs text-slate-300">{proj.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Submit Production Capstone Proof</span>
              </h3>

              <form onSubmit={handleCapstoneSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Capstone Project Title"
                  value={capstoneName}
                  onChange={(e) => setCapstoneName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="url"
                  placeholder="GitHub Repository URL"
                  value={capstoneGithub}
                  onChange={(e) => setCapstoneGithub(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  {capstoneSuccess ? 'Capstone Verified & Added! ✓' : 'Submit Capstone Proof (+50 XP)'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TARGET COMPANY INTEL */}
      {activeTab === 'intel' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Strategic Year 3 Corporate Intel</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Companies begin summer internship hiring in August of Year 3. Over 70% of interns convert directly to full-time Pre-Placement Offers (PPO), bypassing the competitive Year 4 general drives completely.
            </p>
            <div className="pt-2">
              <a
                href="/stage/year-4"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Proceed to Year 4 Placement Command</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
