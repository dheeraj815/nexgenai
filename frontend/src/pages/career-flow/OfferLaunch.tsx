import React, { useState, useEffect } from 'react';
import { 
  Award, CheckCircle2, DollarSign, Calendar, Clock, 
  ArrowRight, ShieldCheck, FileCheck, Star, Sparkles
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { cancelAllSpeech } from '../../utils/voiceUtils';

export const OfferLaunch: React.FC = () => {
  const [ctcInput, setCtcInput] = useState<number>(18); // 18 LPA

  // Stop speech when unmounting
  useEffect(() => {
    return () => {
      cancelAllSpeech();
    };
  }, []);

  // CTC Calculations
  const totalLakhs = ctcInput;
  const baseSalary = Math.round(totalLakhs * 0.70 * 10) / 10;
  const pfGratuity = Math.round(totalLakhs * 0.10 * 10) / 10;
  const performanceBonus = Math.round(totalLakhs * 0.10 * 10) / 10;
  const esopsStocks = Math.round(totalLakhs * 0.10 * 10) / 10;
  const estimatedMonthlyInHand = Math.round(((baseSalary * 100000) / 12) * 0.88);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/60 via-green-950/40 to-slate-900 border border-emerald-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 11 • Offer Launch
              </span>
              <span className="px-2.5 py-0.5 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs">
                CTC Breakdown & Onboarding
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Offer Letter Breakdown & Career Onboarding
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Understand your compensation before signing. Deconstruct CTC vs Monthly In-Hand take-home pay, and follow the 30-60-90 day engineering onboarding roadmap to stand out in your first 3 months.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="CTC vs In-Hand Salary"
            defaultAnalogy="CTC (Cost to Company) is like the total weight of a wrapped gift box including the cardboard, bubble wrap, and ribbon. In-hand take-home salary is the actual shiny toy inside that you get to play with every month!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Offer & Career Launch Guide: How to Succeed in Your First 90 Days"
            scriptText="Congratulations on reaching the Offer Launch Engine! Understanding your offer letter is critical. Move the CTC slider to inspect your actual monthly in-hand deposit, and follow the 30-60-90 day checklist so you transition seamlessly from student to high-performing software engineer."
          />
        </div>
      </div>

      {/* CTC vs In-Hand Salary Breakdown Calculator */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>CTC vs Monthly In-Hand Calculator</span>
            </h2>
            <p className="text-xs text-slate-400">Drag the slider to inspect realistic Indian tech salary deductions (TDS, PF, ESOPs).</p>
          </div>

          <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 font-mono text-sm font-bold rounded-xl border border-emerald-500/30">
            Selected CTC: {ctcInput} LPA
          </span>
        </div>

        <input
          type="range"
          min="4"
          max="50"
          step="1"
          value={ctcInput}
          onChange={(e) => setCtcInput(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Fixed Base Pay</span>
            <p className="text-base font-bold text-white font-mono">₹{baseSalary} LPA</p>
            <span className="text-[10px] text-slate-500">~70% of total package</span>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">PF & Gratuity</span>
            <p className="text-base font-bold text-indigo-300 font-mono">₹{pfGratuity} LPA</p>
            <span className="text-[10px] text-slate-500">Mandatory retirement fund</span>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Variable Bonus</span>
            <p className="text-base font-bold text-amber-300 font-mono">₹{performanceBonus} LPA</p>
            <span className="text-[10px] text-slate-500">Paid annually on review</span>
          </div>

          <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-1 bg-emerald-950/20">
            <span className="text-[10px] text-emerald-400 uppercase font-semibold">Net Monthly In-Hand</span>
            <p className="text-lg font-bold text-emerald-300 font-mono">~₹{estimatedMonthlyInHand.toLocaleString('en-IN')}</p>
            <span className="text-[10px] text-emerald-400/80">Deposited into bank account</span>
          </div>
        </div>
      </div>

      {/* 30-60-90 Day Engineering Onboarding Roadmap */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>The 30-60-90 Day High-Performer Playbook</span>
          </h2>
          <p className="text-xs text-slate-400">How to transition into a software company and become an indispensable contributor.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">Days 1 - 30: Absorb & Ship</span>
              <span className="text-xs font-mono text-slate-500">Month 1</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Clone monorepo and achieve local build on day 2</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Fix 1 small documentation or UI bug within your first week</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Schedule 15-minute 1-on-1s with all teammates</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Days 31 - 60: Autonomous Delivery</span>
              <span className="text-xs font-mono text-slate-500">Month 2</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>Own an entire feature ticket from architecture to unit testing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>Review teammates' Pull Requests with constructive feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>Understand production deployment and Datadog monitoring</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Days 61 - 90: Impact & Ownership</span>
              <span className="text-xs font-mono text-slate-500">Month 3</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Participate actively in team sprint planning and estimates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Optimize a slow database query or fix a recurring alert</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Receive stellar 90-day confirmation review from your manager</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
