import React, { useState } from 'react';
import { 
  Building2, Search, DollarSign, Layers, CheckCircle2, 
  HelpCircle, Star, ArrowRight, ExternalLink, Code2, Users
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const CompanyEngine: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('google');

  const companies: Record<string, {
    name: string;
    tagline: string;
    ctc: string;
    rounds: string[];
    techStack: string[];
    questions: string[];
    cultureTip: string;
  }> = {
    google: {
      name: 'Google India',
      tagline: 'Organizing the world’s information and making it universally accessible.',
      ctc: '₹32 - 45 LPA (Base ₹18L + RSUs + Bonus)',
      rounds: [
        'Round 1: Online Assessment (2 LeetCode Medium/Hard DP & Graphs)',
        'Round 2: Technical Interview (Algorithmic Problem Solving & Big-O)',
        'Round 3: Advanced Data Structures & Concurrency',
        'Round 4: Googleyness & Leadership Behavioral'
      ],
      techStack: ['C++', 'Python', 'Go', 'Kubernetes', 'Spanner DB', 'TensorFlow'],
      questions: [
        'Find the median of two sorted arrays in O(log(min(n, m))) time.',
        'Design a rate limiter for Google Maps API requests.',
        'Tell me about a time you resolved a disagreement in an engineering team.'
      ],
      cultureTip: 'Demonstrate intellectual humility, clear algorithmic communication, and ability to handle edge cases gracefully.'
    },
    amazon: {
      name: 'Amazon Web Services (AWS)',
      tagline: 'Earth’s most customer-centric company and leading cloud infrastructure provider.',
      ctc: '₹28 - 38 LPA (Base ₹16.5L + Sign-on Bonus + Stocks)',
      rounds: [
        'Round 1: Online Assessment (Debugging + 2 Coding Problems + Work Simulation)',
        'Round 2: Data Structures (Trees, Priority Queues, Hash Maps)',
        'Round 3: Low-Level Object Oriented Design (SOLID principles)',
        'Round 4: Bar Raiser & Amazon 16 Leadership Principles'
      ],
      techStack: ['Java', 'Python', 'AWS Services (DynamoDB, SQS, S3)', 'Docker'],
      questions: [
        'Design an in-memory file system with directory creation and search.',
        'Given a stream of integers, find the top K most frequent elements.',
        'Tell me about a time you had to deliver with incomplete data (Bias for Action).'
      ],
      cultureTip: 'Every single answer must link back to Leadership Principles like Customer Obsession and Ownership.'
    },
    razorpay: {
      name: 'Razorpay Technologies',
      tagline: 'The payments and banking platform for modern Indian businesses.',
      ctc: '₹18 - 25 LPA (Base ₹15L + ESOPs)',
      rounds: [
        'Round 1: Machine Coding Round (Build a functional mini-service in 90 mins)',
        'Round 2: System Architecture & Database Transactions',
        'Round 3: Core CS (OS, DB locks, Redis Caching)',
        'Round 4: Founder / Director Cultural Alignment'
      ],
      techStack: ['Go', 'Python', 'FastAPI', 'PostgreSQL', 'Kafka', 'Redis'],
      questions: [
        'Implement an idempotent payment processing webhook handler.',
        'How do you prevent double-spending in a high-concurrency wallet transaction?',
        'Design a scalable distributed locker system.'
      ],
      cultureTip: 'High focus on clean code, unit test coverage, and fast execution speed.'
    }
  };

  const current = companies[selectedCompanyId] || companies.google;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 09 • Company Intelligence
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Verified Tech Stacks & Rounds
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Job & Company Intelligence Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Deconstruct target employers before your interview. Study their 4-round hiring process, exact production tech stacks, compensation breakdown, and authentic past questions.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="Target Company Research"
            defaultAnalogy="Interviewing without researching the company is like taking a test for a subject you never opened. Knowing their tech stack and hiring rubric beforehand turns the interview from a guessing game into a prepared presentation!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Company Intelligence Audio Guide: How to Target High-Paying Tech Firms"
            scriptText="Welcome to the Company Intelligence Engine. Never walk into an interview blind. Review the specific rounds, typical CTC packages, and past coding questions for each employer, so you can tailor your preparation to their exact hiring bar."
          />
        </div>
      </div>

      {/* Company Selector & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          {Object.keys(companies).map(key => (
            <button
              key={key}
              onClick={() => setSelectedCompanyId(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedCompanyId === key
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{companies[key].name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Company Intelligence Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{current.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{current.tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Total CTC Package:</span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-emerald-500/30">
              {current.ctc}
            </span>
          </div>
        </div>

        {/* Hiring Rounds */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Official 4-Round Hiring Process</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {current.rounds.map((r, i) => (
              <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Production Tech Stack */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <span>Technologies Used in Production</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {current.techStack.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-950 border border-indigo-500/30 text-indigo-200 text-xs rounded-lg font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Past Questions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>Real Past Interview Questions</span>
          </h3>
          <div className="space-y-2">
            {current.questions.map((q, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono">
                {q}
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Behavioral Tip */}
        <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
          <strong>Key Cultural Advice:</strong> {current.cultureTip}
        </div>
      </div>
    </div>
  );
};
