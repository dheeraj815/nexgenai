import React, { useState } from 'react';
import { 
  Trophy, CheckCircle2, AlertTriangle, Calendar, Clock, 
  Building2, ArrowRight, ShieldCheck, FileCheck, Star, 
  HelpCircle, UserCheck, ChevronRight
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const Year4PlacementCommand: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'dream' | 'super' | 'core' | 'mass'>('dream');
  const [appliedDrives, setAppliedDrives] = useState<string[]>([]);

  const eligibility = {
    cgpa: { value: '9.0', pass: true, label: 'CGPA &gt;= 8.0 Threshold' },
    backlogs: { value: '0 Backlogs', pass: true, label: 'Zero Standing Backlogs' },
    skills: { value: '4 Badges', pass: true, label: 'Verified Skill Proofs (&gt;= 3)' },
    atsResume: { value: '88% ATS Score', pass: true, label: 'TPO Verified Resume' }
  };

  const drives = {
    dream: [
      { id: 'drv-1', company: 'Amazon Web Services', role: 'SDE-1 (Cloud)', ctc: '28.5 LPA', date: 'Sept 18, 2026', location: 'Bengaluru / Hybrid', status: 'Applications Open' },
      { id: 'drv-2', company: 'Google India', role: 'Software Engineer - AI', ctc: '34.0 LPA', date: 'Sept 24, 2026', location: 'Hyderabad / In-office', status: 'Shortlisting' }
    ],
    super: [
      { id: 'drv-3', company: 'Razorpay Technologies', role: 'Backend Engineer - Payments', ctc: '18.0 LPA', date: 'Sept 20, 2026', location: 'Bengaluru', status: 'Applications Open' },
      { id: 'drv-4', company: 'Cisco Systems', role: 'Network Security Engineer', ctc: '16.5 LPA', date: 'Sept 28, 2026', location: 'Bengaluru', status: 'Aptitude Scheduled' }
    ],
    core: [
      { id: 'drv-5', company: 'Robert Bosch', role: 'Embedded Software Engineer', ctc: '9.2 LPA', date: 'Oct 02, 2026', location: 'Coimbatore', status: 'Applications Open' },
      { id: 'drv-6', company: 'Schneider Electric', role: 'Smart Grid Platform Engineer', ctc: '8.8 LPA', date: 'Oct 05, 2026', location: 'Chennai', status: 'Applications Open' }
    ],
    mass: [
      { id: 'drv-7', company: 'Tata Consultancy Services (Digital)', role: 'System Engineer', ctc: '7.0 LPA', date: 'Oct 10, 2026', location: 'Pan-India', status: 'Open for All' },
      { id: 'drv-8', company: 'Infosys (Specialist Programmer)', role: 'Power Programmer', ctc: '9.5 LPA', date: 'Oct 15, 2026', location: 'Pan-India', status: 'Open for All' }
    ]
  };

  const handleApply = (id: string) => {
    if (!appliedDrives.includes(id)) {
      setAppliedDrives([...appliedDrives, id]);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/60 via-red-950/40 to-slate-900 border border-rose-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 06 • College Year 4
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Placement Command Center
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Campus Placement Command & Drive Center
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Real-time drive scheduling, automated college TPO eligibility verification, and tier-based application tracking from Day 1 online tests to the final offer letter.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="Placement Drive Strategy"
            defaultAnalogy="Placement season is like a penalty shootout in football. You don't need to score every goal, but you must be warmed up and calm. Passing Round 1 (Online Coding) is 70% of the battle; once you reach the technical interview, your real projects will do the talking!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 4 Strategy: How to Convert Campus Drives into Offers"
            scriptText="Welcome to College Year 4! You have arrived at the placement command center. Keep your TPO credentials verified, apply early for Tier 1 and Super Dream drives, and rehearse your technical projects out loud so your interviews are natural and confident."
          />
        </div>
      </div>

      {/* "What Should I Do Today?" Card */}
      <div className="p-5 bg-gradient-to-r from-rose-500/10 via-red-500/10 to-slate-900 border border-rose-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl mt-0.5">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">What Should I Do Today?</span>
              <span className="text-[10px] text-slate-400 font-mono">Urgent: Closes in 48h</span>
            </div>
            <h3 className="text-base font-medium text-white mt-0.5">
              Submit Application for Amazon Web Services (28.5 LPA Dream Drive)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Your profile satisfies all eligibility criteria (CGPA 9.0, 0 Backlogs, 4 Verified Badges).
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            window.scrollTo({ top: 600, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <span>Apply to Drive</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Real-Time TPO Eligibility Checklist */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>TPO Placement Eligibility Verification</span>
          </h2>
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-semibold text-xs rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Eligible for All Tiers</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(eligibility).map(([key, item]) => (
            <div key={key} className="p-3.5 bg-slate-950 border border-emerald-500/20 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">{item.value}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Drive Board by Tiers */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-rose-400" />
              <span>Campus Placement Drives</span>
            </h2>
            <p className="text-xs text-slate-400">Apply to scheduled drives and manage recruitment rounds.</p>
          </div>

          <div className="flex gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            {[
              { id: 'dream', label: '⭐ Dream (18+ LPA)' },
              { id: 'super', label: '🚀 Super Dream (10-18 LPA)' },
              { id: 'core', label: '⚡ Core (6-10 LPA)' },
              { id: 'mass', label: '🏢 Mass Drives' },
            ].map(tier => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTier === tier.id ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drives[selectedTier].map(drv => (
            <div key={drv.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 hover:border-slate-700 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{drv.company}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{drv.role}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-emerald-500/30">
                  {drv.ctc}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  <span>{drv.date}</span>
                </span>
                <span>{drv.location}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[11px] text-amber-400 font-medium">Status: {drv.status}</span>
                <button
                  onClick={() => handleApply(drv.id)}
                  disabled={appliedDrives.includes(drv.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    appliedDrives.includes(drv.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer'
                  }`}
                >
                  {appliedDrives.includes(drv.id) ? 'Application Submitted ✓' : 'One-Click TPO Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "What to Learn Next" */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-slate-400">
          What to Learn Next to Reach Your Goal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-rose-400">Step 1 (Immediate)</span>
            <h4 className="text-sm font-medium text-white">Company Interview Engine</h4>
            <p className="text-xs text-slate-400">Rehearse company-specific coding questions and AI voice mock interviews.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 2 (Upcoming)</span>
            <h4 className="text-sm font-medium text-white">Offer Letter & Negotiation</h4>
            <p className="text-xs text-slate-400">Calculate CTC vs in-hand breakdown and prepare 30-day onboarding plan.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 3 (Goal)</span>
            <h4 className="text-sm font-medium text-white">Post-Placement Tech Lead Track</h4>
            <p className="text-xs text-slate-400">Excel on the job, secure promotions, and advance towards Senior Engineer.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
