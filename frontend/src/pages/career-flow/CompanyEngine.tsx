import React, { useState } from 'react';
import { 
  Building2, Search, DollarSign, Layers, CheckCircle2, 
  HelpCircle, Star, ArrowRight, ExternalLink, Code2, Users,
  Award, ShieldAlert, Sparkles, Clock, Target, Calendar,
  ChevronRight, Brain, Briefcase, Zap, CheckCircle, Flame
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';

interface CompanyData {
  id: string;
  name: string;
  category: 'MAANG' | 'Product' | 'Fintech' | 'Service';
  industry: string;
  founded: string;
  hq: string;
  employees: string;
  tagline: string;
  ctc: string;
  targetRole: string;
  requiredSkills: string[];
  rounds: { title: string; desc: string; duration: string }[];
  techStack: string[];
  questions: { q: string; type: 'Coding' | 'System Design' | 'Behavioral'; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
  cultureTip: string;
  insiderAdvice: string;
}

const COMPANIES: Record<string, CompanyData> = {
  google: {
    id: 'google',
    name: 'Google India',
    category: 'MAANG',
    industry: 'Cloud, Search & AI Platforms',
    founded: '1998',
    hq: 'Mountain View, CA (Bengaluru & Hyderabad)',
    employees: '180,000+',
    tagline: 'Organizing the world’s information and making it universally accessible.',
    ctc: '₹32 - 45 LPA (Base ₹18L + RSUs + Performance Bonus)',
    targetRole: 'Software Engineer - Distributed Systems',
    requiredSkills: ['Python', 'DSA', 'System Design', 'C++', 'APIs', 'Distributed Systems'],
    rounds: [
      { title: 'Round 1: Online Screening', desc: '2 LeetCode Medium/Hard DP & Graph questions on Google CodeSignal.', duration: '90 mins' },
      { title: 'Round 2: Technical Interview 1', desc: 'Data structures, algorithm complexity & optimal Big-O spacetime.', duration: '45 mins' },
      { title: 'Round 3: Technical Interview 2', desc: 'Advanced concurrency, recursion, trees, memory safety & API contracts.', duration: '45 mins' },
      { title: 'Round 4: Googleyness & Leadership', desc: 'Behavioral evaluation on intellectual humility and collaboration.', duration: '45 mins' }
    ],
    techStack: ['C++', 'Python', 'Go', 'Kubernetes', 'Spanner DB', 'TensorFlow', 'gRPC'],
    questions: [
      { q: 'Find the median of two sorted arrays in O(log(min(n, m))) time.', type: 'Coding', difficulty: 'Hard' },
      { q: 'Design a distributed rate limiter for Google Maps API requests handling 1M QPS.', type: 'System Design', difficulty: 'Medium' },
      { q: 'Tell me about a time you navigated an ambiguous engineering requirement.', type: 'Behavioral', difficulty: 'Medium' }
    ],
    cultureTip: 'Demonstrate intellectual humility, clear algorithmic communication, and ability to handle edge cases gracefully.',
    insiderAdvice: 'Do not jump to code right away. Spend the first 7 minutes discussing constraints, inputs, and edge cases before writing a single line.'
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon Web Services (AWS)',
    category: 'MAANG',
    industry: 'Cloud Infrastructure & E-Commerce',
    founded: '1994',
    hq: 'Seattle, WA (Hyderabad & Bengaluru)',
    employees: '1,500,000+',
    tagline: 'Earth’s most customer-centric company and leading cloud infrastructure provider.',
    ctc: '₹28 - 40 LPA (Base ₹16.5L + Sign-on Bonus + Stocks)',
    targetRole: 'Software Development Engineer I (SDE-1)',
    requiredSkills: ['Java', 'Python', 'DSA', 'AWS', 'Object Oriented Design', 'APIs'],
    rounds: [
      { title: 'Round 1: Online Assessment (OA)', desc: '2 coding problems + Work Simulation & Behavioral assessment.', duration: '120 mins' },
      { title: 'Round 2: Data Structures & Algorithms', desc: 'Heaps, Trees, Sliding Window, and Hash Maps.', duration: '60 mins' },
      { title: 'Round 3: Low-Level Design (LLD)', desc: 'Object-Oriented Design patterns, SOLID principles, and clean interfaces.', duration: '60 mins' },
      { title: 'Round 4: Bar Raiser & LP', desc: 'Deep dive into 2 of the 16 Amazon Leadership Principles.', duration: '60 mins' }
    ],
    techStack: ['Java', 'Python', 'AWS DynamoDB', 'Docker', 'SQS', 'TypeScript', 'Kubernetes'],
    questions: [
      { q: 'Design an in-memory file system with directory creation, file write, and search.', type: 'Coding', difficulty: 'Hard' },
      { q: 'Design a parking lot management system adhering to SOLID principles.', type: 'System Design', difficulty: 'Medium' },
      { q: 'Tell me about a time you had to deliver with incomplete data (Bias for Action).', type: 'Behavioral', difficulty: 'Medium' }
    ],
    cultureTip: 'Every single interview response must link back to Leadership Principles like Customer Obsession and Ownership.',
    insiderAdvice: 'Prepare 5 distinct STAR stories covering Customer Obsession, Ownership, Bias for Action, and Deliver Results.'
  },
  razorpay: {
    id: 'razorpay',
    name: 'Razorpay Technologies',
    category: 'Fintech',
    industry: 'Payment Gateways & Neo-Banking',
    founded: '2014',
    hq: 'Bengaluru, India',
    employees: '3,500+',
    tagline: 'The payments and banking infrastructure for modern digital commerce.',
    ctc: '₹18 - 26 LPA (Base ₹15L + ESOPs + Joining Bonus)',
    targetRole: 'Backend Engineer - Payments Core',
    requiredSkills: ['Python', 'SQL', 'FastAPI', 'Redis', 'PostgreSQL', 'APIs'],
    rounds: [
      { title: 'Round 1: Machine Coding Round', desc: 'Build a fully functional working micro-service or CLI with clean unit tests.', duration: '90 mins' },
      { title: 'Round 2: System Architecture & DB', desc: 'Database transactions, ACID isolation levels, idempotency keys.', duration: '60 mins' },
      { title: 'Round 3: Core CS & Problem Solving', desc: 'Multithreading, race conditions, Redis caching strategies.', duration: '60 mins' },
      { title: 'Round 4: Cultural Fit & Engineering Values', desc: 'Speed of execution, debugging philosophy, and product ownership.', duration: '45 mins' }
    ],
    techStack: ['Go', 'Python', 'FastAPI', 'PostgreSQL', 'Kafka', 'Redis', 'Docker'],
    questions: [
      { q: 'Implement an idempotent payment processing webhook handler with replay protection.', type: 'System Design', difficulty: 'Hard' },
      { q: 'How do you prevent double-spending in a high-concurrency digital wallet?', type: 'System Design', difficulty: 'Medium' },
      { q: 'Implement LRU Cache with O(1) get and put operations.', type: 'Coding', difficulty: 'Medium' }
    ],
    cultureTip: 'High focus on clean production code, idempotency, unit test coverage, and fast execution speed.',
    insiderAdvice: 'Show that you care about edge cases: network timeouts, partial DB commits, and duplicate API requests.'
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft IDC',
    category: 'MAANG',
    industry: 'Enterprise Cloud, Productivity & AI',
    founded: '1975',
    hq: 'Redmond, WA (Hyderabad, Bengaluru & Noida)',
    employees: '220,000+',
    tagline: 'Empowering every person and organization on the planet to achieve more.',
    ctc: '₹26 - 36 LPA (Base ₹15.5L + RSUs + Performance Bonus)',
    targetRole: 'Software Engineer - Azure Core',
    requiredSkills: ['C++', 'Python', 'DSA', 'System Design', 'APIs', 'Cloud'],
    rounds: [
      { title: 'Round 1: Online Assessment', desc: '3 algorithmic problems on Codility.', duration: '90 mins' },
      { title: 'Round 2: Data Structures Round', desc: 'Linked lists, Binary Trees, DFS/BFS graph traversals.', duration: '45 mins' },
      { title: 'Round 3: Problem Solving & Design', desc: 'System architecture, API contracts, concurrency.', duration: '45 mins' },
      { title: 'Round 4: Hiring Manager', desc: 'Growth mindset, technical ambition, and team communication.', duration: '45 mins' }
    ],
    techStack: ['C#', 'C++', 'Python', 'Azure', 'TypeScript', 'React', 'SQL Server'],
    questions: [
      { q: 'Serialize and deserialize a binary tree efficiently.', type: 'Coding', difficulty: 'Medium' },
      { q: 'Design a distributed key-value store with eventual consistency.', type: 'System Design', difficulty: 'Medium' },
      { q: 'Describe a project where you demonstrated a Growth Mindset when faced with failure.', type: 'Behavioral', difficulty: 'Easy' }
    ],
    cultureTip: 'Microsoft values the Growth Mindset over being a "know-it-all". Explain your learning process openly.',
    insiderAdvice: 'Always emphasize how you test your code. Mention unit tests, mock objects, and stress test scenarios.'
  },
  flipkart: {
    id: 'flipkart',
    name: 'Flipkart (Walmart Group)',
    category: 'Product',
    industry: 'E-Commerce Marketplace & Supply Chain',
    founded: '2007',
    hq: 'Bengaluru, India',
    employees: '30,000+',
    tagline: 'Leading India’s e-commerce revolution through high-scale technology.',
    ctc: '₹22 - 32 LPA (Base ₹16L + ESOPs + Annual Performance)',
    targetRole: 'Software Development Engineer - Fulfilment',
    requiredSkills: ['Java', 'DSA', 'SQL', 'System Design', 'Redis', 'Kafka'],
    rounds: [
      { title: 'Round 1: Machine Coding Round', desc: 'Live object-oriented design implementation with runnable code.', duration: '90 mins' },
      { title: 'Round 2: Problem Solving & DSA', desc: 'Graph theory, dynamic programming, heaps.', duration: '60 mins' },
      { title: 'Round 3: System Design & Scaling', desc: 'Flash-sale architecture, Kafka event streaming, distributed caching.', duration: '60 mins' },
      { title: 'Round 4: Engineering Manager', desc: 'High-pressure troubleshooting and cultural ownership.', duration: '45 mins' }
    ],
    techStack: ['Java', 'Kafka', 'HBase', 'Redis', 'MySQL', 'Elasticsearch', 'Docker'],
    questions: [
      { q: 'Build a concurrent bowling alley scoring application in 90 minutes.', type: 'Coding', difficulty: 'Hard' },
      { q: 'Design a Big Billion Days flash-sale inventory reservation engine.', type: 'System Design', difficulty: 'Hard' },
      { q: 'How would you handle sudden 100x traffic spikes without bringing down the database?', type: 'System Design', difficulty: 'Medium' }
    ],
    cultureTip: 'Machine coding round is eliminating. Ensure clean class diagrams and clean OOP design patterns.',
    insiderAdvice: 'Spend 20 mins on UML design, 50 mins on clean implementation, and 20 mins on test cases.'
  }
};

export const CompanyEngine: React.FC = () => {
  const { 
    skills, 
    activeCompanyPrep, 
    startCompanyPreparation, 
    markPrepWeekCompleted,
    readiness 
  } = useCareerJourney();

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('google');
  const [activeTab, setActiveTab] = useState<'profile' | 'prepare' | 'questions' | 'rubric'>('prepare');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const current = COMPANIES[selectedCompanyId] || COMPANIES.google;

  // Compute skill gap dynamically for the selected company
  const verifiedSkillNames = skills.filter(s => s.verified).map(s => s.name.toLowerCase());
  const matchedSkills = current.requiredSkills.filter(req => 
    verifiedSkillNames.some(vs => vs.includes(req.toLowerCase()) || req.toLowerCase().includes(vs))
  );
  const gapSkills = current.requiredSkills.filter(req => !matchedSkills.includes(req));
  const matchRate = Math.round((matchedSkills.length / Math.max(1, current.requiredSkills.length)) * 100);

  const handleStartPrep = () => {
    startCompanyPreparation(current.id, current.name, current.targetRole, current.requiredSkills);
    setActiveTab('prepare');
  };

  const isCurrentCompanyActive = activeCompanyPrep && activeCompanyPrep.companyId === current.id;

  const filteredCompanies = Object.values(COMPANIES).filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-900 border border-indigo-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 09 • Company Intelligence & Target Prep
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Zero Hardcoding • Live Skill Gap Analysis
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Target Company & Hiring Preparation Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Don’t prepare randomly for 1,000 topics. Select your target tech company, uncover your exact skill gaps against their hiring rubric, and execute a laser-focused 4-week preparation plan.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Company-Targeted Preparation"
              defaultAnalogy="Imagine training for the Olympics: you don't run 100m sprint, practice archery, and swim all at once. If your target is Google, you focus 80% on advanced DSA and system architecture. If it's Razorpay, you master clean machine coding and database transactions."
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Company Targeting Strategy: How Top Candidates Crack 20+ LPA Tech Offers"
            scriptText="Welcome to the Company Preparation Engine. Most students fail campus placements because they study generic tutorials. Top candidates analyze the exact tech stacks, 4-round rubrics, and high-frequency questions of their target company. Choose your target employer now and launch your personalized 4-week roadmap."
          />
        </div>
      </div>

      {/* Target Employer Selector Bar */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search companies (e.g. Google, Amazon, Razorpay)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-700/60 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['ALL', 'MAANG', 'Product', 'Fintech'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Company Quick-Select Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
          {filteredCompanies.map(c => {
            const isSelected = c.id === selectedCompanyId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCompanyId(c.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  isSelected 
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Building2 className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{c.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-normal">
                  {c.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Company Dashboard Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">{current.name}</h2>
              <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-xs font-semibold">
                {current.targetRole}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-xs font-medium">
                {current.ctc}
              </span>
            </div>
            <p className="text-slate-300 text-sm">{current.tagline}</p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
              <span>📍 HQ: {current.hq}</span>
              <span>🏢 Employees: {current.employees}</span>
              <span>⚡ Industry: {current.industry}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleStartPrep}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Target className="w-4 h-4" />
              <span>PREPARE FOR THIS COMPANY</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'prepare', label: 'PREPARATION & SKILL GAP', icon: Zap },
            { id: 'profile', label: 'ROUNDS & TECH STACK', icon: Layers },
            { id: 'questions', label: 'SOURCED QUESTIONS', icon: Code2 },
            { id: 'rubric', label: 'INSIDER RUBRIC', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PREPARE & SKILL GAP ENGINE */}
        {activeTab === 'prepare' && (
          <div className="space-y-6">
            {/* Live Skill Gap Analysis Panel */}
            <div className="p-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-400" />
                    <span>Your Skill Match Analysis vs {current.name}</span>
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Target Role: <strong className="text-slate-200">{current.targetRole}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-black text-indigo-400">{matchRate}%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Skill Match Rate</div>
                  </div>
                  <div className="w-14 h-14 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center font-bold text-xs text-white">
                    {matchRate}%
                  </div>
                </div>
              </div>

              {/* Grid: What They Want vs What You Have */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Required Skills */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase">
                    <span>Company Requirements ({current.requiredSkills.length})</span>
                    <span className="text-indigo-400">Target Standard</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.requiredSkills.map(skill => {
                      const isMatched = matchedSkills.includes(skill);
                      return (
                        <span 
                          key={skill}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                            isMatched 
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                              : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                          }`}
                        >
                          {isMatched ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                          <span>{skill}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Skill Gap Card */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase">
                    <span>Your Skill Gaps to Close ({gapSkills.length})</span>
                    <span className="text-rose-400 font-semibold">Priority Action</span>
                  </div>
                  {gapSkills.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {gapSkills.map(gap => (
                          <span 
                            key={gap}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-lg text-xs font-bold"
                          >
                            <Flame className="w-3.5 h-3.5 text-rose-400" />
                            <span>{gap} (Action Required)</span>
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                        Mastering these {gapSkills.length} missing skill areas will elevate your match rate from <strong>{matchRate}%</strong> to <strong>100%</strong> before interviews begin.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-medium flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Congratulations! You possess all primary technical skills required by this employer.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4-Week Structured Preparation Roadmap */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Structured 4-Week Company Preparation Roadmap</span>
                  </h3>
                  <p className="text-slate-400 text-xs">
                    {isCurrentCompanyActive 
                      ? `Active preparation program launched for ${current.name}` 
                      : `Click "PREPARE FOR THIS COMPANY" to begin this 4-week Sprint`}
                  </p>
                </div>
                {isCurrentCompanyActive && (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active Preparation Enrolled</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    week: 1,
                    title: 'Week 1: Algorithmic Foundations & High-Frequency Patterns',
                    focus: `Master the top DSA patterns asked at ${current.name}: Two Pointers, Sliding Window, and Hash Maps.`,
                    topics: ['Array Decomposition', 'Sliding Window Substrings', 'Hash Map O(1) Lookups', 'Big-O Analysis'],
                  },
                  {
                    week: 2,
                    title: 'Week 2: Advanced Coding, Trees & Graph Traversals',
                    focus: `Tackle LeetCode Medium/Hard questions identical to ${current.name} Round 1 & 2 screenings.`,
                    topics: ['Binary Search on Answers', 'BFS/DFS Graph Traversals', 'Dynamic Programming Subproblems', 'Tree Serialization'],
                  },
                  {
                    week: 3,
                    title: 'Week 3: High-Scale System Design & Production Architecture',
                    focus: `Study distributed systems, caching strategies, and database isolation levels requested by ${current.name}.`,
                    topics: ['Redis Cache-Aside Pattern', 'Database Sharding & Replication', 'Rate Limiting Algorithms', 'API Idempotency'],
                  },
                  {
                    week: 4,
                    title: 'Week 4: AI Voice Mock Interviews & Leadership Rubric',
                    focus: `Simulate authentic 45-minute live technical rounds and nail your STAR behavioral stories.`,
                    topics: ['STAR Method Behavioral Drill', 'Past Sourced Tech Questions', 'Live Bar Raiser Simulation', 'Offer Negotiation Strategy'],
                  }
                ].map(w => {
                  const isCompleted = Boolean(isCurrentCompanyActive && activeCompanyPrep?.weeklyRoadmap?.find(x => x.week === w.week)?.isCompleted);
                  return (
                    <div 
                      key={w.week}
                      className={`p-5 rounded-xl border transition-all ${
                        isCompleted 
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                          }`}>
                            WEEK 0{w.week}
                          </span>
                          <span className="text-xs font-bold text-white">{w.title}</span>
                        </div>
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>

                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">{w.focus}</p>

                      <div className="space-y-1.5 mb-4">
                        {w.topics.map(t => (
                          <div key={t} className="flex items-center gap-2 text-[11px] text-slate-300">
                            <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-medium">+30 XP Milestone</span>
                        {isCurrentCompanyActive && (
                          <button
                            onClick={() => markPrepWeekCompleted(w.week)}
                            disabled={isCompleted}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isCompleted 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                            }`}
                          >
                            {isCompleted ? 'Completed ✓' : 'Mark Week Complete'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ROUNDS & PRODUCTION TECH STACK */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 4-Round Breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>The 4-Round Hiring Process at {current.name}</span>
                </h3>
                <div className="space-y-3">
                  {current.rounds.map((round, idx) => (
                    <div key={round.title} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white">{round.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {round.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 pl-7 leading-relaxed">{round.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Culture */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span>Production Tech Stack Used Daily</span>
                  </h3>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <p className="text-xs text-slate-400">
                      Engineers at {current.name} work on these production tools. Having hands-on projects with these stacks guarantees interviewer excitement.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {current.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Culture & Behavioral Evaluation Rubric</span>
                  </h3>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-emerald-300">What Interviewers Grade For:</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{current.cultureTip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SOURCED QUESTIONS */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span>Real Past Interview Questions Sourced from {current.name}</span>
                </h3>
                <p className="text-slate-400 text-xs">Authentic coding, system design, and behavioral questions asked in the past 6 months.</p>
              </div>
            </div>

            <div className="space-y-3">
              {current.questions.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.difficulty === 'Hard' 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white">{item.q}</div>
                  </div>

                  <button 
                    onClick={() => {
                      // Voice narration of question
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(item.q);
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg shrink-0 transition-all"
                  >
                    <span>Listen & Practice</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INSIDER RUBRIC */}
        {activeTab === 'rubric' && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>Inside the Hiring Committee: How Decisions Are Made</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {current.insiderAdvice}
              </p>
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl space-y-2">
                <div className="text-xs font-bold text-indigo-300 uppercase">The 3 Fatal Mistakes Freshers Make:</div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li>Writing code before agreeing on constraints and inputs with the interviewer.</li>
                  <li>Failing to test with edge cases (empty input, negative numbers, overflow).</li>
                  <li>Using generic bullet points on resumes instead of quantifiable business impact.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
