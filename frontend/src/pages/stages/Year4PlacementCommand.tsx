import React, { useState, useEffect } from 'react';
import { 
  Building2, DollarSign, CheckCircle2, AlertTriangle, 
  ArrowRight, Award, Layers, Star, Briefcase, FileText, 
  Calendar, Clock, Target, Volume2, VolumeX, Sparkles, Check,
  TrendingUp, Users, ShieldAlert, ChevronRight, Save, Edit3
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { cancelAllSpeech } from '../../utils/voiceUtils';

interface DriveCompany {
  id: string;
  name: string;
  tier: 'Tier 1 Dream' | 'Tier 2 Core' | 'Tier 3 Mass';
  role: string;
  ctc: string;
  minCgpa: number;
  maxBacklogs: number;
  driveDate: string;
  requiredSkills: string[];
}

export const Year4PlacementCommand: React.FC = () => {
  const { 
    academicProfile, 
    updateAcademicProfile,
    readiness, 
    xpPoints,
    passedAssessmentsCount,
    completedMockInterviewsCount,
    completeStageTopic
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'eligibility' | 'pipeline' | 'drives' | 'offers' | 'launch'>('eligibility');
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

  // Stop speech when unmounting
  useEffect(() => {
    return () => {
      cancelAllSpeech();
      setIsVoiceSpeaking(false);
    };
  }, []);

  // Stop speech when switching tabs
  useEffect(() => {
    cancelAllSpeech();
    setIsVoiceSpeaking(false);
  }, [activeTab]);

  // Interactive Academic Profile Input State
  const [inputCgpa, setInputCgpa] = useState<string>(academicProfile.cgpa > 0 ? String(academicProfile.cgpa) : '');
  const [inputBacklogs, setInputBacklogs] = useState<string>(String(academicProfile.backlogs));
  const [inputBranch, setInputBranch] = useState<string>(academicProfile.branch || 'Computer Science & Engineering');
  const [profileSaved, setProfileSaved] = useState(false);

  // Drive Registration State
  const [registeredDrives, setRegisteredDrives] = useState<string[]>([]);

  // CTC Calculator State
  const [inputCtc, setInputCtc] = useState<number>(18.0); // in LPA

  // 30-60-90 Day Playbook Checklist State
  const [playbookChecks, setPlaybookChecks] = useState<Record<string, boolean>>({});

  const drives: DriveCompany[] = [
    {
      id: 'drv-1',
      name: 'Google India',
      tier: 'Tier 1 Dream',
      role: 'Software Engineer L3',
      ctc: '₹34.0 LPA',
      minCgpa: 8.0,
      maxBacklogs: 0,
      driveDate: 'Oct 15, 2026',
      requiredSkills: ['Python', 'DSA', 'System Design', 'C++']
    },
    {
      id: 'drv-2',
      name: 'Amazon Development Centre',
      tier: 'Tier 1 Dream',
      role: 'SDE-1',
      ctc: '₹28.5 LPA',
      minCgpa: 7.5,
      maxBacklogs: 0,
      driveDate: 'Oct 22, 2026',
      requiredSkills: ['Java', 'Python', 'DSA', 'AWS']
    },
    {
      id: 'drv-3',
      name: 'Razorpay Technologies',
      tier: 'Tier 1 Dream',
      role: 'Backend Engineer',
      ctc: '₹22.0 LPA',
      minCgpa: 7.0,
      maxBacklogs: 0,
      driveDate: 'Nov 02, 2026',
      requiredSkills: ['Python', 'SQL', 'FastAPI', 'Redis']
    },
    {
      id: 'drv-4',
      name: 'Infosys Limited',
      tier: 'Tier 3 Mass',
      role: 'Specialist Programmer',
      ctc: '₹9.5 LPA',
      minCgpa: 6.5,
      maxBacklogs: 1,
      driveDate: 'Nov 12, 2026',
      requiredSkills: ['Python', 'Java', 'SQL']
    }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cgpaNum = parseFloat(inputCgpa) || 0;
    const backlogsNum = parseInt(inputBacklogs) || 0;
    updateAcademicProfile({
      cgpa: cgpaNum,
      backlogs: backlogsNum,
      branch: inputBranch
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleRegisterForDrive = (driveId: string) => {
    if (!registeredDrives.includes(driveId)) {
      setRegisteredDrives(prev => [...prev, driveId]);
      completeStageTopic('year4', 'drive-' + driveId, 30);
    }
  };

  const togglePlaybookCheck = (key: string) => {
    setPlaybookChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentCgpa = parseFloat(inputCgpa) || academicProfile.cgpa;
  const currentBacklogs = parseInt(inputBacklogs) || academicProfile.backlogs;
  const isProfileConfigured = currentCgpa > 0;

  // CTC Computation Breakdown
  const baseSalary = inputCtc * 0.50;
  const pfContribution = baseSalary * 0.12;
  const annualTakeHome = (inputCtc * 100000) - (pfContribution * 100000) - 45000;
  const monthlyTakeHome = Math.round(annualTakeHome / 12);

  const handleVoiceBriefing = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isVoiceSpeaking) {
      cancelAllSpeech();
      setIsVoiceSpeaking(false);
      return;
    }

    cancelAllSpeech();
    const text = isProfileConfigured
      ? `Year 4 Placement Command: With your registered CGPA of ${currentCgpa}, you are eligible for ${drives.filter(d => currentCgpa >= d.minCgpa && currentBacklogs <= d.maxBacklogs).length} out of ${drives.length} active campus drives. Your overall readiness is currently ${readiness.overallScore} percent.`
      : `Welcome to Year 4 Placement Command. Please enter your college CGPA and backlog status to evaluate your live eligibility across all active campus drives.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsVoiceSpeaking(false);
    utterance.onerror = () => setIsVoiceSpeaking(false);
    setIsVoiceSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/70 via-red-950/50 to-slate-900 border border-rose-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 06 • Year 4 Placement Command
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Live Dynamic Eligibility Engine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Year 4 Placement Command & Offer Launch Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Enter your real college credentials to evaluate campus drive cutoffs dynamically, register for high-package drives, and calculate your exact take-home salary.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Year 4 Placement Eligibility"
              defaultAnalogy="Placement cutoffs are like height requirements on roller coasters: enter your real CGPA and backlog details to immediately see which company rides you can board right now!"
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 4 Placement Command Audio: How Campus Drive Cutoffs and TPO Rules Work"
            scriptText="Welcome to Year 4 Placement Command. Start by entering your verified college CGPA and active backlogs. Our engine will check every company cutoff in real time and guide you through online assessments and interview rounds."
          />
        </div>
      </div>

      {/* 5 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'eligibility', label: '1. ELIGIBILITY & TPO AUDIT', icon: Target },
          { id: 'pipeline', label: '2. ACTIVE PLACEMENT PIPELINE', icon: Layers },
          { id: 'drives', label: '3. LIVE DRIVE TRACKER', icon: Calendar },
          { id: 'offers', label: '4. CTC & TAKE-HOME CALCULATOR', icon: DollarSign },
          { id: 'launch', label: '5. 30-60-90 DAY CAREER PLAYBOOK', icon: Briefcase }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ELIGIBILITY & TPO AUDIT */}
      {activeTab === 'eligibility' && (
        <div className="space-y-6">
          {/* Interactive Profile Input Box (No Hardcoded 8.4!) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-rose-400" />
                  <span>Configure Your College Academic Credentials</span>
                </h3>
                <p className="text-xs text-slate-400">Enter your real academic stats. Eligibility across all drives recalculates instantly.</p>
              </div>

              <button
                onClick={handleVoiceBriefing}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isVoiceSpeaking
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    : 'bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600/30'
                }`}
                title={isVoiceSpeaking ? 'Stop / Cut Audio Eligibility Check' : 'Listen to Audio Eligibility Check'}
              >
                {isVoiceSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isVoiceSpeaking ? 'Stop Audio' : 'Audio Eligibility Check'}</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Cumulative CGPA (out of 10)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="e.g. 8.2"
                  value={inputCgpa}
                  onChange={(e) => setInputCgpa(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Active Academic Backlogs</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="0"
                  value={inputBacklogs}
                  onChange={(e) => setInputBacklogs(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Degree Branch</label>
                <div className="flex gap-2">
                  <select
                    value={inputBranch}
                    onChange={(e) => setInputBranch(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                  </select>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{profileSaved ? 'Saved! ✓' : 'Save & Check'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Dynamic Audit Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="text-xs text-slate-400 font-medium">Configured CGPA</div>
              <div className="text-2xl font-black text-white">
                {isProfileConfigured ? `${currentCgpa} / 10.0` : 'Not Configured'}
              </div>
              <div className="text-[11px] pt-1">
                {isProfileConfigured ? (
                  currentCgpa >= 7.5 ? (
                    <span className="text-emerald-400 font-semibold">✓ Meets Tier-1 Cutoffs (≥ 7.5)</span>
                  ) : (
                    <span className="text-amber-400 font-semibold">Eligible for Tier-2 & Tier-3 Drives</span>
                  )
                ) : (
                  <span className="text-slate-500">Enter CGPA above to evaluate cutoffs</span>
                )}
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="text-xs text-slate-400 font-medium">Active Backlogs</div>
              <div className="text-2xl font-black text-white">
                {currentBacklogs}
              </div>
              <div className="text-[11px] pt-1">
                {currentBacklogs === 0 ? (
                  <span className="text-emerald-400 font-semibold">✓ 100% Clear Academic Record</span>
                ) : (
                  <span className="text-rose-400 font-semibold">⚠️ {currentBacklogs} Active Backlog(s)</span>
                )}
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="text-xs text-slate-400 font-medium">Live Readiness Score</div>
              <div className="text-2xl font-black text-rose-400">{readiness.overallScore}%</div>
              <div className="text-[11px] pt-1 text-slate-400">
                {readiness.overallScore === 0 ? 'Start lessons/coding to earn readiness' : readiness.statusLabel}
              </div>
            </div>
          </div>

          {/* Dynamic Company Cutoff Evaluation Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Live Company Cutoff Audit</h3>
            <div className="space-y-2.5">
              {drives.map(drive => {
                const isEligible = isProfileConfigured && currentCgpa >= drive.minCgpa && currentBacklogs <= drive.maxBacklogs;
                return (
                  <div key={drive.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{drive.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">{drive.tier}</span>
                      </div>
                      <p className="text-xs text-slate-400">{drive.role} • Min CGPA Cutoff: <strong className="text-slate-200">{drive.minCgpa}</strong> • Max Backlogs: {drive.maxBacklogs}</p>
                    </div>

                    <div>
                      {!isProfileConfigured ? (
                        <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs">Enter CGPA to Evaluate</span>
                      ) : isEligible ? (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Eligible to Apply
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> Cutoff Not Met (Min {drive.minCgpa})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE PLACEMENT PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-400" />
              <span>Real-Time Placement Funnel Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              {[
                { stage: '1. Drives Registered', count: `${registeredDrives.length} Drives`, status: registeredDrives.length > 0 ? 'ACTIVE' : 'NO DRIVES' },
                { stage: '2. Assessments Cleared', count: `${passedAssessmentsCount} Passed`, status: passedAssessmentsCount > 0 ? 'IN PROGRESS' : 'NOT STARTED' },
                { stage: '3. Mock Interviews', count: `${completedMockInterviewsCount} Sessions`, status: completedMockInterviewsCount > 0 ? 'IN PROGRESS' : 'NOT STARTED' },
                { stage: '4. Confirmed Offers', count: `${readiness.overallScore >= 80 ? 1 : 0} Ready`, status: readiness.overallScore >= 80 ? 'READY' : 'PENDING READINESS' }
              ].map(step => (
                <div key={step.stage} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    step.status === 'ACTIVE' || step.status === 'READY' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.status}
                  </span>
                  <div className="text-xs font-bold text-white">{step.stage}</div>
                  <p className="text-xs text-slate-400">{step.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE DRIVE TRACKER */}
      {activeTab === 'drives' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Campus Placement Drives Schedule</h3>
            <p className="text-xs text-slate-400">Click register to lock in your placement drive application.</p>

            <div className="space-y-3">
              {drives.map(d => {
                const isRegistered = registeredDrives.includes(d.id);
                return (
                  <div key={d.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{d.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">
                          {d.tier}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">{d.role} • Min CGPA: {d.minCgpa}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-black text-emerald-400">{d.ctc}</div>
                        <div className="text-[10px] text-slate-500">Drive Date: {d.driveDate}</div>
                      </div>

                      <button
                        onClick={() => handleRegisterForDrive(d.id)}
                        disabled={isRegistered}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                          isRegistered ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-500 text-white'
                        }`}
                      >
                        {isRegistered ? 'Registered ✓' : 'Register for Drive (+30 XP)'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CTC & TAKE-HOME CALCULATOR */}
      {activeTab === 'offers' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Interactive CTC & In-Hand Monthly Take-Home Calculator</span>
                </h3>
                <p className="text-xs text-slate-400">Deconstruct Cost-to-Company (CTC) into actual monthly bank deposits.</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Target CTC Package:</span>
                <span className="text-emerald-400 text-sm">₹{inputCtc.toFixed(1)} LPA</span>
              </div>
              <input
                type="range"
                min="4"
                max="45"
                step="0.5"
                value={inputCtc}
                onChange={(e) => setInputCtc(parseFloat(e.target.value))}
                className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs text-slate-400">Estimated Monthly In-Hand Deposit</div>
                <div className="text-2xl font-black text-emerald-400">₹{monthlyTakeHome.toLocaleString('en-IN')}</div>
                <span className="text-[10px] text-slate-400">After PF, Professional Tax & TDS</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs text-slate-400">Basic Salary (50% of CTC)</div>
                <div className="text-xl font-bold text-white">₹{baseSalary.toFixed(1)} LPA</div>
                <span className="text-[10px] text-slate-400">Determines PF & Gratuity</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs text-slate-400">Annual PF Savings</div>
                <div className="text-xl font-bold text-purple-400">₹{(pfContribution * 100000).toLocaleString('en-IN')}</div>
                <span className="text-[10px] text-slate-400">Compounding retirement corpus</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 30-60-90 DAY CAREER PLAYBOOK */}
      {activeTab === 'launch' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Interactive 30-60-90 Day New Engineer Playbook</h3>
            <p className="text-xs text-slate-400">Check off action items as you accomplish them during your first 90 days on the job.</p>

            <div className="space-y-2.5">
              {[
                { id: 'pb-1', text: 'Days 1-30: Configure local dev environment and deploy your first bugfix to production.' },
                { id: 'pb-2', text: 'Days 1-30: Read pull requests from senior staff engineers to understand code review standards.' },
                { id: 'pb-3', text: 'Days 31-60: Take autonomous ownership of an end-to-end API service with unit tests.' },
                { id: 'pb-4', text: 'Days 31-60: Communicate blockers proactively during daily standups.' },
                { id: 'pb-5', text: 'Days 61-90: Shadow on-call rotations to learn real-time incident mitigation.' },
                { id: 'pb-6', text: 'Days 61-90: Propose a quantifiable performance optimization (e.g. database query caching).' }
              ].map(item => {
                const isChecked = !!playbookChecks[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePlaybookCheck(item.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xs leading-relaxed">{item.text}</span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                      isChecked ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
