import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Award, Layers, CheckCircle2, ChevronRight, 
  Star, Sparkles, BookOpen, Shield, Code2, Users
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { cancelAllSpeech } from '../../utils/voiceUtils';

export const CareerGrowth: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  // Stop speech when unmounting
  useEffect(() => {
    return () => {
      cancelAllSpeech();
    };
  }, []);

  const ladder = [
    {
      level: 0,
      title: 'SDE-1 (Associate / Junior Engineer)',
      tenure: '0 - 2 Years',
      salary: '₹8 - 25 LPA',
      focus: 'Execution, writing clean code, submitting well-tested PRs, and learning the codebase.',
      rubric: ['High test coverage', 'Consistent sprint story delivery', 'Receptive to code reviews']
    },
    {
      level: 1,
      title: 'SDE-2 (Software Engineer)',
      tenure: '2 - 5 Years',
      salary: '₹22 - 50 LPA',
      focus: 'Autonomous feature delivery, low-level design, database optimization, and reducing tech debt.',
      rubric: ['Owns end-to-end microservices', 'Designs resilient database schemas', 'Mentors junior engineers']
    },
    {
      level: 2,
      title: 'Senior Software Engineer (SDE-3)',
      tenure: '5 - 8 Years',
      salary: '₹45 - 90 LPA',
      focus: 'Distributed system architecture, system reliability, cross-functional collaboration, and incident postmortems.',
      rubric: ['Authors RFC design docs', 'Prevents architectural bottlenecks', 'Drives team engineering culture']
    },
    {
      level: 3,
      title: 'Staff Engineer / Tech Lead',
      tenure: '8+ Years',
      salary: '₹85 LPA - ₹1.5 Cr+',
      focus: 'Sets technical direction for multiple teams, influences business strategy, and develops next-gen engineering leaders.',
      rubric: ['Solves multi-quarter business problems', 'Defines enterprise standards', 'Unblocks cross-org dependencies']
    }
  ];

  const current = ladder[selectedLevel];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950/60 via-purple-950/40 to-slate-900 border border-violet-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 12 • Lifelong Growth
              </span>
              <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs">
                Junior to Tech Lead
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Post-Placement Tech Lead & Promotion Ladder
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Landing the job is just Day 1. Climb the software engineering ladder from Junior Developer to Senior Engineer and Tech Lead with actionable promotion rubrics and advanced upskilling tracks.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="The Software Engineering Ladder"
            defaultAnalogy="Climbing the engineering ladder is like leveling up in a strategy game: SDE-1 is a skilled swordsman who fights well. SDE-2 is a squad commander who plans small skirmishes. Senior and Staff engineers are generals who design the battlefield defenses!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Career Growth Audio Guide: How to Accelerate Promotions in Tech"
            scriptText="Welcome to the Career Growth Engine. Getting hired is only the beginning of your journey. High-performing engineers don't wait for annual reviews; they align with company rubrics, author clear design proposals, and actively elevate the engineers around them."
          />
        </div>
      </div>

      {/* Engineering Career Ladder Interactive Explorer */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            <span>The Software Engineering Promotion Ladder</span>
          </h2>
          <p className="text-xs text-slate-400">Click each level to inspect expected responsibilities, salary compensation, and promotion requirements.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {ladder.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLevel(idx)}
              className={`p-3.5 rounded-xl text-xs font-bold transition-all text-left flex flex-col gap-1 ${
                selectedLevel === idx
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span className="text-[10px] text-violet-300 uppercase font-mono">Level {idx + 1}</span>
              <span className="truncate">{step.title.split('(')[0]}</span>
            </button>
          ))}
        </div>

        <div className="p-5 bg-slate-950 border border-violet-500/30 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">{current.title}</h3>
              <span className="text-xs text-violet-400">Typical Experience: {current.tenure}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Compensation Band:</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-emerald-500/30">
                {current.salary}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Core Focus:</strong> {current.focus}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-violet-300">Promotion Verification Criteria:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {current.rubric.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
