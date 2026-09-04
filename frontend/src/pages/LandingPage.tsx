import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Milestone,
  Cpu,
  Layers,
  Award,
  Rocket,
  Briefcase,
  TrendingUp,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Terminal,
  ShieldAlert,
  Network,
  FileText,
  Volume2,
  Bot,
  Building,
  GraduationCap,
  Users,
  Search
} from 'lucide-react';

interface StageDetail {
  id: string;
  stepNumber: number;
  stageCode: string;
  title: string;
  subtitle: string;
  tagline: string;
  icon: any;
  color: string;
  bgGlow: string;
  focus: string;
  whatYouLearn: string[];
  aiMentorFocus: string;
  practiceLab: string;
  practiceLabDesc: string;
  proofUnlocked: string;
}

const STAGES: StageDetail[] = [
  {
    id: 'class-11',
    stepNumber: 1,
    stageCode: 'CLASS_11',
    title: 'Class 11',
    subtitle: 'Career Discovery & Aptitude',
    tagline: 'Discover your engineering curiosity and explore 30 modern tech domains early.',
    icon: Compass,
    color: 'text-sky-400',
    bgGlow: 'from-sky-500/20 to-blue-600/10 border-sky-500/30',
    focus: 'Interest discovery, aptitude assessment, algorithmic logic, and beginner exploration.',
    whatYouLearn: [
      'Computational thinking and problem decomposition',
      'Beginner Python and algorithmic puzzles',
      'Industry career pathways comparison across 30 domains',
      'Early AI Mentor personalized career suggestions'
    ],
    aiMentorFocus: 'Assesses aptitude, analyzes early interests, and recommends domain exploratory modules.',
    practiceLab: 'Computational Thinking & Logic Sandbox',
    practiceLabDesc: 'Interactive puzzles that benchmark deductive reasoning and core computational concepts.',
    proofUnlocked: 'Foundational Aptitude Badge & Career Exploration Report'
  },
  {
    id: 'class-12',
    stepNumber: 2,
    stageCode: 'CLASS_12',
    title: 'Class 12',
    subtitle: 'Career Direction & Pathways',
    tagline: 'Choose your target domain and establish your digital version control foundation.',
    icon: Milestone,
    color: 'text-indigo-400',
    bgGlow: 'from-indigo-500/20 to-purple-600/10 border-indigo-500/30',
    focus: 'Domain selection, Git/GitHub basics, portfolio foundation, and career goal setting.',
    whatYouLearn: [
      'Git version control and GitHub repository creation',
      'Web fundamentals: HTML5, modern CSS, and JavaScript primitives',
      'Selection of primary target domain (e.g. Full Stack, AI, or Cloud)',
      'Building your initial student portfolio foundation'
    ],
    aiMentorFocus: 'Guides domain pathway selection and reviews first Git repository commits.',
    practiceLab: 'Git & Version Control Simulator',
    practiceLabDesc: 'Hands-on browser terminal simulating branch creation, commits, and pull requests.',
    proofUnlocked: 'First GitHub Repository & Target Domain Pathway Roadmap'
  },
  {
    id: 'college-year-1',
    stepNumber: 3,
    stageCode: 'YEAR_1',
    title: 'College Year 1',
    subtitle: 'Core CS Foundations',
    tagline: 'Build real full-stack software and master relational database architectures.',
    icon: Cpu,
    color: 'text-emerald-400',
    bgGlow: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30',
    focus: 'Programming, Data Structures, Relational Databases, Web APIs, and collaborative projects.',
    whatYouLearn: [
      'Data Structures & Algorithms in Python / Java / C++',
      'Relational database design (PostgreSQL / SQL schemas & queries)',
      'Building REST APIs with modern server frameworks',
      'Clean code architecture and unit testing fundamentals'
    ],
    aiMentorFocus: 'Provides automated code reviews, algorithmic time-complexity hints, and project blueprints.',
    practiceLab: 'In-Browser Python & DSA Coding Lab',
    practiceLabDesc: 'Real-time isolated code runner executing test suites with runtime performance metrics.',
    proofUnlocked: 'Level 1 Verified DSA & Relational DB Skill Badges'
  },
  {
    id: 'college-year-2',
    stepNumber: 4,
    stageCode: 'YEAR_2',
    title: 'College Year 2',
    subtitle: 'Domain Specialization',
    tagline: 'Deepen expertise in Cloud, AI, Cybersecurity, or Distributed Systems.',
    icon: Layers,
    color: 'text-cyan-400',
    bgGlow: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30',
    focus: 'Advanced domain electives, microservices, containerization, and proof of work.',
    whatYouLearn: [
      'Containerization with Docker and microservices orchestration',
      'Cloud deployment (AWS / GCP) and serverless architectures',
      'Advanced domain specialization (LLM Engineering, DevOps, Cybersecurity)',
      'Deploying live full-stack projects with active demo URLs'
    ],
    aiMentorFocus: 'Recommends specialized architectural patterns and validates GitHub project proofs.',
    practiceLab: 'Defensive SOC & Cloud Sandbox',
    practiceLabDesc: 'Investigate synthetic security incidents and configure resilient cloud infrastructure.',
    proofUnlocked: 'Live Production Project Proof & Domain Specialization Certificate'
  },
  {
    id: 'college-year-3',
    stepNumber: 5,
    stageCode: 'YEAR_3',
    title: 'College Year 3',
    subtitle: 'Industry Prep & Internships',
    tagline: 'Prepare for enterprise interviews, optimize your ATS resume, and secure internships.',
    icon: Award,
    color: 'text-amber-400',
    bgGlow: 'from-amber-500/20 to-orange-600/10 border-amber-500/30',
    focus: 'System design, AI mock interviews, ATS resume optimization, and internship applications.',
    whatYouLearn: [
      'High-level distributed system design and trade-off analysis',
      'AI-powered technical and behavioral mock interview rehearsals',
      'Resume ATS optimization against real company job descriptions',
      'Internship hunting, recruiter communication, and application tracking'
    ],
    aiMentorFocus: 'Conducts spoken AI interviews, calculates readiness scores, and provides ATS feedback.',
    practiceLab: 'System Design Canvas & Voice Interviewer',
    practiceLabDesc: 'Drag-and-drop architecture canvas analyzing latency, bottlenecks, and single points of failure.',
    proofUnlocked: '85%+ ATS-Optimized Resume & Enterprise Internship Offer'
  },
  {
    id: 'college-year-4',
    stepNumber: 6,
    stageCode: 'YEAR_4',
    title: 'College Year 4',
    subtitle: 'Placement Command Center',
    tagline: 'Participate in campus placement drives and convert competitive corporate offers.',
    icon: Rocket,
    color: 'text-rose-400',
    bgGlow: 'from-rose-500/20 to-pink-600/10 border-rose-500/30',
    focus: 'Placement drives, eligibility criteria verification, recruiter shortlisting, final offers.',
    whatYouLearn: [
      'TPO placement drive registration and automated eligibility checks',
      'Company-specific technical assessments and live coding rounds',
      'Direct recruiter shortlisting based on verified Career Passport proof',
      'Offer letter evaluation, salary intelligence, and role negotiation'
    ],
    aiMentorFocus: 'Provides real-time company round preparation and salary benchmark analysis.',
    practiceLab: 'Placement Drive Eligibility Simulator',
    practiceLabDesc: 'Instant automated check against CGPA, branch, and backlog criteria with clear explanations.',
    proofUnlocked: 'Official Campus Placement Offer & Verified Graduate Passport'
  },
  {
    id: 'internship',
    stepNumber: 7,
    stageCode: 'INTERNSHIP',
    title: 'Internship',
    subtitle: 'Real-World Experience',
    tagline: 'Ship production features, collaborate with senior engineers, and log verified work.',
    icon: Briefcase,
    color: 'text-purple-400',
    bgGlow: 'from-purple-500/20 to-indigo-600/10 border-purple-500/30',
    focus: 'Production codebases, agile sprints, peer code reviews, and enterprise impact.',
    whatYouLearn: [
      'Contributing to large-scale enterprise microservices codebases',
      'Collaborative Git workflows, CI/CD pipelines, and pull request reviews',
      'Handling production telemetry, monitoring, and error budgets',
      'Documenting achievements and supervisor feedback for Pre-Placement Offers (PPOs)'
    ],
    aiMentorFocus: 'Offers on-the-job problem-solving advice and guides pre-placement offer strategies.',
    practiceLab: 'Enterprise Telemetry & Debugging Simulator',
    practiceLabDesc: 'Analyze distributed traces and logs to triage production issues rapidly.',
    proofUnlocked: 'Verified Enterprise Work Experience stamped into Career Passport'
  },
  {
    id: 'first-job',
    stepNumber: 8,
    stageCode: 'CAREER',
    title: 'First Job & Beyond',
    subtitle: 'Lifelong Career Growth',
    tagline: 'Accelerate your post-graduation promotions, upskilling, and architectural leadership.',
    icon: TrendingUp,
    color: 'text-blue-400',
    bgGlow: 'from-blue-500/20 to-cyan-600/10 border-blue-500/30',
    focus: 'Continuous upskilling, senior role transitions, leadership, and lifelong proof graph.',
    whatYouLearn: [
      'Navigating career transitions from Junior to Staff/Principal Engineer',
      'Continuous skill gap analysis and emerging technology roadmaps',
      'Open-source contributions and technical community leadership',
      'Lifelong verifiable proof of work portfolio that travels with you'
    ],
    aiMentorFocus: 'Identifies high-impact skill gaps for promotion and generates 90-day senior learning paths.',
    practiceLab: 'Executive Architecture Roadmap Lab',
    practiceLabDesc: 'Plan complex cross-functional system refactors and cloud cost optimizations.',
    proofUnlocked: 'Lifelong Senior Career Passport & Industry Verified Reputation'
  }
];

const DOMAINS_LIST = [
  { name: 'Artificial Intelligence', cat: 'Data & AI', icon: '🧠' },
  { name: 'Machine Learning', cat: 'Data & AI', icon: '📊' },
  { name: 'Generative AI / LLMs', cat: 'Data & AI', icon: '✨' },
  { name: 'Full Stack Development', cat: 'Core Engineering', icon: '💻' },
  { name: 'Backend Engineering', cat: 'Core Engineering', icon: '⚙️' },
  { name: 'Cloud Computing', cat: 'Infrastructure', icon: '☁️' },
  { name: 'DevOps / SRE', cat: 'Infrastructure', icon: '🔄' },
  { name: 'Cybersecurity', cat: 'Security', icon: '🛡️' },
  { name: 'SOC Operations', cat: 'Security', icon: '🚨' },
  { name: 'System Design', cat: 'Core Engineering', icon: '📐' },
  { name: 'Mobile Development', cat: 'Core Engineering', icon: '📱' },
  { name: 'Data Engineering', cat: 'Data & AI', icon: '🗄️' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<StageDetail | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredDomains = activeCategory === 'All'
    ? DOMAINS_LIST
    : DOMAINS_LIST.filter(d => d.cat === activeCategory);

  const handleNextStage = () => {
    if (!selectedStage) return;
    const currentIndex = STAGES.findIndex(s => s.id === selectedStage.id);
    if (currentIndex < STAGES.length - 1) {
      setSelectedStage(STAGES[currentIndex + 1]);
    } else {
      setSelectedStage(STAGES[0]);
    }
  };

  const handlePrevStage = () => {
    if (!selectedStage) return;
    const currentIndex = STAGES.findIndex(s => s.id === selectedStage.id);
    if (currentIndex > 0) {
      setSelectedStage(STAGES[currentIndex - 1]);
    } else {
      setSelectedStage(STAGES[STAGES.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-brand-500/30">
      {/* Top Radiant Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07090e]/85 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition duration-200">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                NexGenAI
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-semibold border border-brand-500/30">
                  Campus→Career
                </span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-slate-300">
            <a href="#continuum" className="hover:text-white transition">The Continuum</a>
            <a href="#surfaces" className="hover:text-white transition">Product OS</a>
            <a href="#labs" className="hover:text-white transition">Practice Labs</a>
            <a href="#domains" className="hover:text-white transition">30 Domains</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-xs font-semibold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-md shadow-brand-600/30 transition hover:scale-[1.02]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-600/20 via-purple-600/20 to-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-600/10 blur-[90px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-300 text-xs font-medium mb-6 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-200">The Student & TPO Operating System for Modern Hiring</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-brand-400 to-purple-400">Class 11 to Placement</span>.
            <br />
            One Unbroken Career Journey.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            NexGenAI replaces disjointed tools with one continuous operating system connecting high school discovery, college engineering foundations, verifiable proof of work, TPO placement drives, and recruiter hiring.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center space-x-2 transition hover:scale-[1.02]"
            >
              <span>Start Your Free Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#continuum"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-slate-600 flex items-center justify-center space-x-2 transition"
            >
              <span>Explore The 8 Stages</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Live System Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="glass-panel p-4 rounded-xl border border-white/[0.06]">
              <div className="text-xs text-slate-400 font-medium">Curriculum</div>
              <div className="text-base font-bold text-white mt-0.5">30 Tech Domains</div>
              <div className="text-[11px] text-slate-400 mt-1">From AI & Full Stack to SOC & Systems</div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/[0.06]">
              <div className="text-xs text-slate-400 font-medium">Continuum</div>
              <div className="text-base font-bold text-white mt-0.5">8 Connected Stages</div>
              <div className="text-[11px] text-slate-400 mt-1">Class 11 → First Job & Beyond</div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/[0.06]">
              <div className="text-xs text-slate-400 font-medium">Verification</div>
              <div className="text-base font-bold text-white mt-0.5">Real Proof of Work</div>
              <div className="text-[11px] text-slate-400 mt-1">GitHub, coding labs, & assessments</div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/[0.06]">
              <div className="text-xs text-slate-400 font-medium">Monetization</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">100% Free Access</div>
              <div className="text-[11px] text-slate-400 mt-1">No plans, subscriptions, or paywalls</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUUM SECTION WITH INTERACTIVE POPUP MODALS */}
      <section id="continuum" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#090d16]/70 border-t border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-brand-400 tracking-wider uppercase mb-2">
              The Complete 8-Stage Continuum
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Click Any Stage to Preview the Experience
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every stage delivers customized courses, hands-on practice labs, and milestone proof stamped directly into the Career Passport.
            </p>
          </div>

          {/* Continuum Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map((s) => {
              const IconComponent = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStage(s)}
                  className="group text-left p-5 rounded-2xl glass-panel border border-white/[0.08] hover:border-brand-500/50 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition" />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-400 group-hover:text-brand-300 transition">
                        Step {s.stepNumber} of 8
                      </span>
                      <div className={`p-2 rounded-xl bg-white/[0.04] ${s.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition">
                      {s.title}
                    </h3>
                    <div className="text-xs font-medium text-slate-400 mb-2">
                      {s.subtitle}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {s.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300">
                    <span>Preview Stage Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ANIMATED STAGE POP-UP MODAL */}
      {selectedStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-2xl bg-[#0c121e] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 animate-modal-pop max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStage(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-xl bg-white/[0.06] ${selectedStage.color}`}>
                {React.createElement(selectedStage.icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Continuum Step {selectedStage.stepNumber} of 8
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedStage.title} — {selectedStage.subtitle}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
              {selectedStage.tagline}
            </p>

            {/* Content Sections */}
            <div className="space-y-4 text-xs">
              {/* What You Learn */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.06]">
                <div className="font-bold text-white text-sm mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  What You Master at This Stage
                </div>
                <ul className="space-y-1.5 text-slate-300 pl-1">
                  {selectedStage.whatYouLearn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Career Mentor Adaptation */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.06]">
                <div className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  AI Career Mentor Adaptation
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedStage.aiMentorFocus}
                </p>
              </div>

              {/* Practice Lab & Proof */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06]">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Interactive Practice Lab
                  </div>
                  <div className="text-emerald-300 font-semibold mb-0.5">{selectedStage.practiceLab}</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">{selectedStage.practiceLabDesc}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06]">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Passport Proof Unlocked
                  </div>
                  <div className="text-amber-300 font-semibold mb-0.5">Stamped Milestone</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">{selectedStage.proofUnlocked}</div>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevStage}
                  className="px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-300 flex items-center space-x-1 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNextStage}
                  className="px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-300 flex items-center space-x-1 transition"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedStage(null);
                  navigate(`/register?stage=${selectedStage.stageCode}`);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-1.5 transition hover:scale-[1.02]"
              >
                <span>Register at this Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3 PRODUCT SURFACES */}
      <section id="surfaces" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-brand-400 tracking-wider uppercase mb-2">
            Three Specialized Product Surfaces
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            One Unified Operating System
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Designed specifically for students learning skills, colleges managing placement outcomes, and recruiters seeking verified talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student OS */}
          <div className="glass-panel p-6 rounded-2xl border border-brand-500/20 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Student OS</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Complete learning journey, Career Passport, verified skill graph, in-browser practice labs, and 24/7 AI Career Mentor.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                  <span>Interactive Career Passport & Proof Graph</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                  <span>In-Browser Python Coding & SOC Labs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                  <span>ATS Resume Keyword Optimizer</span>
                </li>
              </ul>
            </div>
            <Link
              to="/register"
              className="mt-6 text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1"
            >
              <span>Explore Student Experience</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* College / TPO OS */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">College & TPO OS</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Streamline campus placement drives, automate student eligibility checks, and track verified placement rates with real data.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Configurable Eligibility Rules (CGPA, Backlogs)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Real-time Candidate Shortlisting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Live Placement Statistics & Offer Tracking</span>
                </li>
              </ul>
            </div>
            <Link
              to="/login"
              className="mt-6 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center space-x-1"
            >
              <span>TPO Officer Portal</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Recruiter OS */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Recruiter OS</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Discover pre-vetted candidates by actual verified skills, review code proofs, schedule interviews, and issue campus offers.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero-Resume-Spam Candidate Discovery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inspect Genuine Code & Project Proofs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Placement Drive Participation</span>
                </li>
              </ul>
            </div>
            <Link
              to="/login"
              className="mt-6 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>Recruiter Talent Search</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRACTICE LABS SHOWCASE */}
      <section id="labs" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#090d16]/70 border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-brand-400 tracking-wider uppercase mb-2">
              Interactive Practice Labs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Real Sandboxes. No Mocked Proofs.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every skill assessment is executed in real-time with genuine validation, test suites, and deterministic scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coding Lab */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">In-Browser Coding Lab</h3>
                    <div className="text-[11px] text-slate-400">Isolated Python & DSA Execution</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Sandbox
                </span>
              </div>
              <div className="bg-[#05070c] rounded-xl p-3 border border-white/[0.06] font-mono text-xs text-slate-300 mb-3 overflow-x-auto">
                <span className="text-purple-400">def</span> <span className="text-blue-400">two_sum</span>(nums, target):<br />
                &nbsp;&nbsp;seen = &#123;&#125;<br />
                &nbsp;&nbsp;<span className="text-purple-400">for</span> i, n <span className="text-purple-400">in</span> enumerate(nums):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> target - n <span className="text-purple-400">in</span> seen: <span className="text-purple-400">return</span> [seen[target - n], i]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;seen[n] = i
              </div>
              <p className="text-xs text-slate-400">
                Executes code against hidden unit test cases, measures execution runtime, and stamps verified algorithm skills.
              </p>
            </div>

            {/* SOC Simulator */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Defensive SOC Incident Simulator</h3>
                    <div className="text-[11px] text-slate-400">Real Syslog & Lateral Movement Triage</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Defensive
                </span>
              </div>
              <div className="bg-[#05070c] rounded-xl p-3 border border-white/[0.06] font-mono text-xs text-slate-300 mb-3">
                <div className="text-rose-400">[ALERT] Event 4688: Encoded PowerShell on WS-4402</div>
                <div className="text-slate-400 mt-1">[IOC] Outbound SYN to 198.51.100.23:443 (Rogue C2)</div>
                <div className="text-emerald-400 mt-1">[ACTION] Host isolated from VLAN. Kerberos tokens revoked.</div>
              </div>
              <p className="text-xs text-slate-400">
                Students inspect synthetic syslog streams, isolate compromised endpoints, and document root-cause containment plans.
              </p>
            </div>

            {/* System Design Canvas */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Network className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">System Design Architecture Canvas</h3>
                    <div className="text-[11px] text-slate-400">Distributed Scalability & Bottleneck Analysis</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Assemble high-throughput architectures using API Gateways, Load Balancers, Redis clusters, Kafka message queues, and PostgreSQL replicas. Evaluates single points of failure and capacity trade-offs.
              </p>
              <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-300">
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">Load Balancers</span>
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">Redis Cache</span>
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">Kafka Events</span>
                <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">PostgreSQL Master-Replica</span>
              </div>
            </div>

            {/* Resume ATS Studio */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Resume ATS Optimizer Studio</h3>
                    <div className="text-[11px] text-slate-400">Instant Keyword Matcher & Metric Detector</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  ATS Scanner
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Upload your resume PDF/DOCX and benchmark it against target job descriptions. Highlights missing technical competencies, keyword alignment, and quantifies engineering achievements.
              </p>
              <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-300">
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Matched: Python, SQL, Docker</span>
                <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Missing: Redis, Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 30 TECH DOMAINS EXPLORER */}
      <section id="domains" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-brand-400 tracking-wider uppercase mb-2">
            Broad Multi-Domain Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            30 Standardized Engineering Taxonomies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Whether you are exploring Generative AI, Cloud Systems, Mobile Apps, or Cybersecurity, NexGenAI provides structured, stage-aligned paths.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {['All', 'Core Engineering', 'Data & AI', 'Infrastructure', 'Security'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredDomains.map((d, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl glass-panel border border-white/[0.06] hover:border-brand-500/40 transition group flex items-center space-x-3"
            >
              <div className="text-xl">{d.icon}</div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-brand-300 transition">{d.name}</div>
                <div className="text-[10px] text-slate-400">{d.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#090d16] to-[#05070b] border-t border-white/[0.06] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-brand-500/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Build Your Verifiable Career Passport Today
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join students, college placement officers, and recruiters using NexGenAI to transform education into verified industry proof.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center space-x-2 transition hover:scale-[1.02]"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-panel text-slate-300 hover:text-white font-semibold text-sm border border-slate-700/80 transition"
            >
              <span>Sign In to Your Passport</span>
            </Link>
          </div>

          <div className="mt-8 text-xs text-slate-400">
            100% Free • Zero Subscriptions • Zero Paywalls • Real Verifiable Proof
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#05070a] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-200">NexGenAI — Campus→Career AI</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            The Student & TPO Operating System for Skills, Learning, Proof of Work, Placements & Modern Hiring.
          </div>
        </div>
      </footer>
    </div>
  );
};
