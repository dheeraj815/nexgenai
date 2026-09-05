import React, { useState } from 'react';
import { 
  Building2, DollarSign, CheckCircle2, AlertTriangle, 
  ArrowRight, Award, Layers, Star, Briefcase, FileText, 
  Calendar, Clock, Target, Volume2, Sparkles, Check,
  TrendingUp, Users, ShieldAlert, ChevronRight
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';

interface DriveCompany {
  id: string;
  name: string;
  tier: 'Tier 1 Dream' | 'Tier 2 Core' | 'Tier 3 Mass';
  role: string;
  ctc: string;
  minCgpa: number;
  maxBacklogs: number;
  driveDate: string;
  status: 'ELIGIBLE' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'OFFER_EXTENDED';
}

export const Year4PlacementCommand: React.FC = () => {
  const { 
    skills, 
    projects, 
    readiness, 
    xpPoints 
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'eligibility' | 'pipeline' | 'drives' | 'offers' | 'launch'>('eligibility');

  // Student Academic Profile
  const [cgpa, setCgpa] = useState<number>(8.4);
  const [backlogs, setBacklogs] = useState<number>(0);

  // CTC Calculator State
  const [inputCtc, setInputCtc] = useState<number>(18.0); // in LPA

  // 30-60-90 Day Playbook State
  const [selectedPhase, setSelectedPhase] = useState<'30' | '60' | '90'>('30');

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
      status: 'INTERVIEW_SCHEDULED'
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
      status: 'SHORTLISTED'
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
      status: 'OFFER_EXTENDED'
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
      status: 'OFFER_EXTENDED'
    }
  ];

  // CTC Computation Breakdown
  const baseSalary = inputCtc * 0.50; // 50% Basic
  const hra = baseSalary * 0.40;     // 40% of Basic
  const specialAllowance = inputCtc * 0.20;
  const pfContribution = baseSalary * 0.12;
  const annualTakeHome = (inputCtc * 100000) - (pfContribution * 100000) - 45000; // Tax estimate
  const monthlyTakeHome = Math.round(annualTakeHome / 12);

  const handleVoiceBriefing = () => {
    if ('speechSynthesis' in window) {
      const text = `Year 4 Placement Command Center: You are currently eligible for 4 tier-1 and core placement drives with your ${cgpa} CGPA. You hold 1 confirmed offer from Razorpay at 22 LPA. Focus on Google technical round 3 scheduled for October 15.`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
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
                Active Offer & CTC Engine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Year 4 Placement Command & Offer Launch Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Track live campus placement drives, verify TPO criteria with zero guesswork, deconstruct multi-tier compensation offers, and execute your first 90 days on the job like a senior engineer.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Year 4 Placement Command"
              defaultAnalogy="Placement season is an air traffic control room: multiple flights (Google, Amazon, Razorpay) are in the air. Your job is to monitor eligibility criteria, clear runway interviews, and land the highest CTC offer safely!"
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 4 Audio Command: Negotiating CTC & Acing Final Bar-Raiser Rounds"
            scriptText="Welcome to Year 4 Placement Command. This is the culmination of your 4-year engineering journey. Review your active drive shortlists below, calculate your exact monthly take-home salary, and prepare for your onboarding day one."
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-rose-400" />
                  <span>Your Academic Placement Audit</span>
                </h3>
                <p className="text-xs text-slate-400">TPO placement criteria checks based on your verified college credentials.</p>
              </div>

              <button
                onClick={handleVoiceBriefing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-bold hover:bg-rose-600/30 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Status Briefing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs text-slate-400">Cumulative CGPA</div>
                <div className="text-2xl font-black text-white">{cgpa} / 10.0</div>
                <span className="text-[10px] text-emerald-400 font-semibold">✓ Meets All Tier-1 Cutoffs (&gt; 7.5)</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs text-slate-400">Active Academic Backlogs</div>
                <div className="text-2xl font-black text-emerald-400">{backlogs}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">✓ 100% Clear History</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs text-slate-400">Readiness Score</div>
                <div className="text-2xl font-black text-rose-400">{readiness.overallScore}%</div>
                <span className="text-[10px] text-rose-300 font-semibold">Tier 1 Placement Ready</span>
              </div>
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
              <span>4-Stage Placement Funnel Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              {[
                { stage: '1. Applications', count: '14 Submitted', status: 'COMPLETED' },
                { stage: '2. Online Assessments', count: '8 Cleared', status: 'COMPLETED' },
                { stage: '3. Technical Interviews', count: '3 In Progress', status: 'ACTIVE' },
                { stage: '4. Offer Letters', count: '2 Confirmed', status: 'OFFER' }
              ].map(step => (
                <div key={step.stage} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    step.status === 'OFFER' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Campus Placement Drives Schedule</h3>
                <p className="text-xs text-slate-400">Live tracker for ongoing and upcoming recruitment rounds.</p>
              </div>
            </div>

            <div className="space-y-3">
              {drives.map(d => (
                <div key={d.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{d.name}</span>
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
                    <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-bold">
                      {d.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
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
                <p className="text-xs text-slate-400">Deconstruct Cost-to-Company (CTC) inflation into actual bank deposits.</p>
              </div>
            </div>

            {/* Slider */}
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

            {/* Salary Breakdown Cards */}
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

      {/* TAB 5: 30-60-90 DAY PLAYBOOK */}
      {activeTab === 'launch' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">The 30-60-90 Day New Engineer Playbook</h3>
                <p className="text-xs text-slate-400">How to transition from college fresher to high-performing production contributor.</p>
              </div>
              <div className="flex gap-1.5">
                {['30', '60', '90'].map(phase => (
                  <button
                    key={phase}
                    onClick={() => setSelectedPhase(phase as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedPhase === phase ? 'bg-rose-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    Days 1-{phase}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              {selectedPhase === '30' && (
                <>
                  <h4 className="text-xs font-bold text-rose-400 uppercase">First 30 Days: Absorb & Understand the Codebase</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Set up local dev environment in under 48 hours and document missing setup steps in the wiki.</li>
                    <li>Read pull request discussions from senior staff engineers to learn the company's code review norms.</li>
                    <li>Fix 3 minor bugs or typos in production to experience the full CI/CD deployment pipeline.</li>
                  </ul>
                </>
              )}
              {selectedPhase === '60' && (
                <>
                  <h4 className="text-xs font-bold text-rose-400 uppercase">Days 31-60: Ship Independent Features</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Take full ownership of an end-to-end API endpoint with comprehensive unit tests.</li>
                    <li>Proactively communicate blockers during daily standups before deadlines slip.</li>
                    <li>Participate actively in team sprint retrospectives.</li>
                  </ul>
                </>
              )}
              {selectedPhase === '90' && (
                <>
                  <h4 className="text-xs font-bold text-rose-400 uppercase">Days 61-90: Autonomy & Team Trust</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Shadow on-call rotations to learn how production incidents are triaged.</li>
                    <li>Propose an architectural optimization (e.g. database query caching) with quantifiable benchmarks.</li>
                    <li>Conduct your first 90-day review with your engineering manager with confidence.</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
