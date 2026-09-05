import React, { useState, useEffect } from 'react';
import { 
  Building2, Calendar, Clock, CheckCircle2, AlertCircle, 
  HelpCircle, ArrowRight, Star, FileText, Users, Award,
  DollarSign, Target, Check, Sparkles, Volume2, Bot,
  Flame, ChevronRight, ShieldCheck, Play
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';

interface PlacementDrive {
  id: string;
  company: string;
  tier: 'Tier 1 Dream' | 'Tier 2 Core' | 'Tier 3 Mass';
  role: string;
  ctc: string;
  cutoffCgpa: number;
  date: string;
  requiredSkills: string[];
  status: 'OPEN' | 'REGISTERED' | 'SHORTLISTED';
}

export const PlacementEngine: React.FC = () => {
  const { 
    skills, 
    activeCompanyPrep, 
    startCompanyPreparation, 
    markPrepWeekCompleted,
    recordMockInterview,
    xpPoints 
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'drives' | 'profiles' | 'gap' | 'hub' | 'mock'>('drives');
  const [selectedDriveId, setSelectedDriveId] = useState<string>('drv-google');

  // Registration Tracker
  const [registeredDrives, setRegisteredDrives] = useState<string[]>(['drv-google', 'drv-razorpay']);

  // Mock Assessment State
  const [mockQuestionIdx, setMockQuestionIdx] = useState(0);
  const [mockScore, setMockScore] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 mins
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const drives: PlacementDrive[] = [
    {
      id: 'drv-google',
      company: 'Google India',
      tier: 'Tier 1 Dream',
      role: 'Software Engineer - Systems',
      ctc: '₹34.0 LPA',
      cutoffCgpa: 8.0,
      date: 'Oct 15, 2026',
      requiredSkills: ['Python', 'DSA', 'System Design', 'C++'],
      status: 'REGISTERED'
    },
    {
      id: 'drv-microsoft',
      company: 'Microsoft IDC',
      tier: 'Tier 1 Dream',
      role: 'Software Development Engineer',
      ctc: '₹28.0 LPA',
      cutoffCgpa: 7.5,
      date: 'Oct 20, 2026',
      requiredSkills: ['C++', 'Python', 'DSA', 'System Design'],
      status: 'OPEN'
    },
    {
      id: 'drv-amazon',
      company: 'Amazon AWS',
      tier: 'Tier 1 Dream',
      role: 'SDE-1',
      ctc: '₹26.5 LPA',
      cutoffCgpa: 7.5,
      date: 'Oct 28, 2026',
      requiredSkills: ['Java', 'Python', 'DSA', 'AWS'],
      status: 'OPEN'
    },
    {
      id: 'drv-razorpay',
      company: 'Razorpay Technologies',
      tier: 'Tier 1 Dream',
      role: 'Backend Engineer',
      ctc: '₹22.0 LPA',
      cutoffCgpa: 7.0,
      date: 'Nov 04, 2026',
      requiredSkills: ['Python', 'SQL', 'FastAPI', 'Redis'],
      status: 'REGISTERED'
    },
    {
      id: 'drv-flipkart',
      company: 'Flipkart',
      tier: 'Tier 1 Dream',
      role: 'Software Engineer',
      ctc: '₹20.0 LPA',
      cutoffCgpa: 7.0,
      date: 'Nov 10, 2026',
      requiredSkills: ['Java', 'DSA', 'SQL', 'Redis'],
      status: 'OPEN'
    },
    {
      id: 'drv-tcs',
      company: 'TCS Digital',
      tier: 'Tier 2 Core',
      role: 'Systems Engineer',
      ctc: '₹7.5 LPA',
      cutoffCgpa: 6.5,
      date: 'Nov 18, 2026',
      requiredSkills: ['Python', 'SQL', 'Java'],
      status: 'OPEN'
    }
  ];

  const currentDrive = drives.find(d => d.id === selectedDriveId) || drives[0];

  const handleRegister = (id: string) => {
    if (!registeredDrives.includes(id)) {
      setRegisteredDrives(prev => [...prev, id]);
    }
  };

  const handleStartCompanyPrep = () => {
    startCompanyPreparation(
      currentDrive.company.toLowerCase(),
      currentDrive.company,
      currentDrive.role,
      currentDrive.requiredSkills
    );
    setActiveTab('gap');
  };

  const handleFinishMock = () => {
    setTimerActive(false);
    setMockScore(90);
    recordMockInterview(90, 'High algorithmic precision, clear reasoning under time constraints.');
  };

  const handleVoiceBriefing = () => {
    if ('speechSynthesis' in window) {
      const text = `Placement Engine Status: You are registered for ${registeredDrives.length} active campus placement drives. Your next round is with ${currentDrive.company} on ${currentDrive.date}. Launch your target 4-week roadmap to clear the technical cutoff!`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/70 via-indigo-950/50 to-slate-900 border border-blue-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 08 • Campus Placement Operations
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                TPO & Off-Campus Synchronized
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Institutional & Off-Campus Placement Drive Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Register for institutional recruitment drives, compare hiring bars across Tier 1, 2, and 3 employers, analyze your exact company skill gaps, and simulate timed placement rounds.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Campus Placement Strategy"
              defaultAnalogy="Think of campus drives like boarding high-speed trains at a central station. Tier-1 trains arrive first with top packages. If you prepare your technical tickets (DSA, System Design, Projects) early, you board on Day 1 instead of waiting for general mass recruitment."
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Placement Audio Briefing: How to Clear Tier-1 Online Assessments on Day 1"
            scriptText="Welcome to the Placement Drive Engine. Manage your upcoming test slots, register for top campus drives, check your exact skill gap against company hiring rubrics, and run timed online assessments."
          />
        </div>
      </div>

      {/* 5 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'drives', label: '1. AVAILABLE CAMPUS DRIVES', icon: Calendar },
          { id: 'profiles', label: '2. COMPANY PROFILES & PREP', icon: Building2 },
          { id: 'gap', label: '3. SKILL GAP & 4-WEEK ROADMAP', icon: Target },
          { id: 'hub', label: '4. APPLICATION STATUS HUB', icon: FileText },
          { id: 'mock', label: '5. TIMED ONLINE ASSESSMENT', icon: Clock }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AVAILABLE CAMPUS DRIVES */}
      {activeTab === 'drives' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Verified Placement Opportunities</h3>
              <p className="text-xs text-slate-400">Campus and off-campus recruitment drives currently accepting registrations.</p>
            </div>

            <button
              onClick={handleVoiceBriefing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-bold hover:bg-blue-600/30 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Drive Audio Briefing</span>
            </button>
          </div>

          <div className="space-y-3">
            {drives.map(drive => {
              const isRegistered = registeredDrives.includes(drive.id);
              return (
                <div 
                  key={drive.id}
                  onClick={() => setSelectedDriveId(drive.id)}
                  className={`p-5 bg-slate-900 border rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer transition-all ${
                    selectedDriveId === drive.id 
                      ? 'border-blue-500 shadow-md bg-blue-950/20' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">{drive.company}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">
                        {drive.tier}
                      </span>
                      {isRegistered && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Registered ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">{drive.role} • Min CGPA: {drive.cutoffCgpa}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {drive.requiredSkills.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-400">{drive.ctc}</div>
                      <div className="text-[10px] text-slate-500">Drive Date: {drive.date}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(drive.id);
                        }}
                        disabled={isRegistered}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isRegistered 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                        }`}
                      >
                        {isRegistered ? 'Registered' : 'Register for Drive'}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDriveId(drive.id);
                          handleStartCompanyPrep();
                        }}
                        className="px-3 py-2 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/40 rounded-xl text-xs font-bold transition-all"
                      >
                        Prepare
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: COMPANY PROFILES & PREP */}
      {activeTab === 'profiles' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white">{currentDrive.company}</h3>
                <span className="text-xs text-blue-400 font-semibold">{currentDrive.role} • {currentDrive.ctc}</span>
              </div>

              <button
                onClick={handleStartCompanyPrep}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Launch Targeted 4-Week Prep Sprint
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Hiring Interview Rounds:</div>
                <div className="space-y-2">
                  {[
                    'Round 1: Online Assessment (Coding + Aptitude)',
                    'Round 2: Technical Interview 1 (DSA & Complexity)',
                    'Round 3: Technical Interview 2 (System Architecture & APIs)',
                    'Round 4: Bar Raiser & Cultural Alignment'
                  ].map((r, idx) => (
                    <div key={r} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Production Tech Stacks:</div>
                <div className="flex flex-wrap gap-2">
                  {currentDrive.requiredSkills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-blue-300 font-medium rounded-lg text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SKILL GAP & 4-WEEK ROADMAP */}
      {activeTab === 'gap' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span>Target Company Preparation Roadmap</span>
            </h3>

            {activeCompanyPrep ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400">Active Prep Plan for:</span>
                    <h4 className="text-base font-bold text-white">{activeCompanyPrep.companyName} ({activeCompanyPrep.targetRole})</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-blue-400">{activeCompanyPrep.matchScore}%</span>
                    <div className="text-[10px] text-slate-400 uppercase">Match Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {activeCompanyPrep.weeklyRoadmap.map(w => (
                    <div key={w.week} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-400">Week 0{w.week}</span>
                        {w.isCompleted && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-xs font-bold text-white">{w.title}</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{w.focus}</p>

                      <button
                        onClick={() => markPrepWeekCompleted(w.week)}
                        disabled={w.isCompleted}
                        className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all ${
                          w.isCompleted ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        {w.isCompleted ? 'Week Completed ✓' : 'Mark Week Complete'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center space-y-3">
                <p className="text-xs text-slate-400">No active company roadmap selected yet. Pick a drive in Tab 1 and click Prepare.</p>
                <button
                  onClick={handleStartCompanyPrep}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Start Google India Roadmap
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: APPLICATION STATUS HUB */}
      {activeTab === 'hub' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Live Application Tracking Pipeline</h3>
            <div className="space-y-3">
              {[
                { company: 'Google India', role: 'Software Engineer L3', status: 'Online Assessment Scheduled', date: 'Oct 15' },
                { company: 'Razorpay', role: 'Backend Engineer', status: 'Technical Interview Round 2', date: 'Oct 18' },
                { company: 'TCS Digital', role: 'Systems Engineer', status: 'Application Submitted', date: 'Nov 02' }
              ].map(app => (
                <div key={app.company} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{app.company}</div>
                    <div className="text-xs text-slate-400">{app.role}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                      {app.status}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">{app.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TIMED ONLINE ASSESSMENT */}
      {activeTab === 'mock' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Timed Campus Placement Mock Assessment</h3>
                <p className="text-xs text-slate-400">Simulate authentic 10-minute online screening tests.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-sm font-bold text-amber-400">
                  ⏱ {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>

                {!timerActive && (
                  <button
                    onClick={() => setTimerActive(true)}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Start Timer
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="text-xs font-bold text-blue-400">Question 01 of 05 (Algorithmic Logic):</div>
              <p className="text-xs text-slate-200">
                What is the worst-case spacetime complexity of inserting N elements into a Binary Search Tree (BST) without self-balancing rotations?
              </p>
            </div>

            <div className="space-y-2">
              {[
                'A) O(1) time, O(1) space',
                'B) O(log N) time, O(log N) space',
                'C) O(N) time (skewed degenerate tree), O(N) stack space',
                'D) O(N^2) time'
              ].map((opt, i) => (
                <div 
                  key={opt}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-blue-500/50 rounded-xl text-xs text-slate-300 cursor-pointer flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs text-slate-400">+40 XP on Completion</span>
              <button
                onClick={handleFinishMock}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Submit & Record Assessment Score
              </button>
            </div>

            {mockScore !== null && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold">
                ✓ Test Completed! Score: {mockScore}/100. Recorded to your Career Passport.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
