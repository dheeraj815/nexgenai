import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, AlertCircle, FileText, ArrowRight, 
  Layers, Database, Server, Star, Sparkles, ExternalLink, RefreshCw
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const Year3IndustryPrep: React.FC = () => {
  const [targetCompany, setTargetCompany] = useState<'tier1' | 'fintech' | 'cloud'>('tier1');
  const [selectedSystemComponent, setSelectedSystemComponent] = useState<string>('cache');

  const companyRequirements = {
    tier1: {
      name: 'Tier 1 Product Companies (Google, Microsoft, Amazon)',
      matchRate: 78,
      verifiedMatches: ['Python 3.12 Core', 'Data Structures & Algorithms (Trees, Graphs)', 'Git & Version Control', 'REST APIs'],
      missingSkills: ['Distributed System Design (Caching & Sharding)', 'High-Concurrency Concurrency Locks', 'Kubernetes Helm Deployments']
    },
    fintech: {
      name: 'High-Growth FinTech (Razorpay, Stripe, CRED)',
      matchRate: 85,
      verifiedMatches: ['PostgreSQL Relational DB', 'ACID Transactions', 'FastAPI Microservices', 'Unit Testing'],
      missingSkills: ['Idempotency Keys & Webhooks', 'Kafka Event Streaming']
    },
    cloud: {
      name: 'Cloud & Infrastructure (AWS, Cloudflare, Datadog)',
      matchRate: 70,
      verifiedMatches: ['Linux System Administration', 'Docker Containerization', 'TCP/IP Networking'],
      missingSkills: ['Terraform Infrastructure-as-Code', 'eBPF Observability', 'Prometheus Alert Rules']
    }
  };

  const systemComponents: Record<string, { title: string; role: string; analogy: string; implementation: string }> = {
    cache: {
      title: 'Redis Distributed In-Memory Cache',
      role: 'Reduces database load by serving frequent reads from RAM with sub-millisecond latency.',
      analogy: 'Like keeping your keys in your pocket instead of walking up into the attic every time you open the front door.',
      implementation: 'Use Cache-Aside pattern: Check Redis first (GET key). If miss, fetch from PostgreSQL, write to Redis with 300s TTL.'
    },
    loadbalancer: {
      title: 'Nginx / HAProxy Load Balancer',
      role: 'Distributes incoming HTTP requests evenly across multiple backend application instances.',
      analogy: 'Like an airport usher directing passengers into 5 different security checkpoint lines to prevent any single line from bottlenecking.',
      implementation: 'Use Round-Robin or Least-Connections algorithm with active health check probes (/healthz).'
    },
    sharding: {
      title: 'Database Sharding & Replication',
      role: 'Partitions massive database tables across multiple physical servers based on a shard key (e.g., user_id % 4).',
      analogy: 'Like splitting a giant 1,000-page phone directory into 4 smaller alphabetized booklets (A-F, G-M, N-S, T-Z).',
      implementation: 'Maintain 1 Primary Master for Writes and 2 Read Replicas for scalable queries.'
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-950/60 via-amber-950/40 to-slate-900 border border-orange-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 05 • College Year 3
              </span>
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs">
                Industry Preparation
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Industry Alignment, System Design & ATS Optimization
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Bridge the gap between academic theory and corporate expectations. Diagnose skill gaps for top recruiters, master High-Level System Design, and ensure your resume passes ATS filters.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="High-Level System Design"
            defaultAnalogy="Think of System Design like planning a city water supply. Writing code is like plumbing a single bathroom. System design is deciding where the main water dam goes, how wide the pipes should be, and what backup generator kicks in if the main pump fails!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 3 Strategy: The Pre-Placement Year Playbook"
            scriptText="Welcome to College Year 3! This is the most critical year before campus placement drives begin in early Year 4. Your focus must shift to System Design fundamentals, matching your skills against target company requirements, and auditing your ATS resume so you get shortlisted for technical interviews."
          />
        </div>
      </div>

      {/* "What Should I Do Today?" Card */}
      <div className="p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-slate-900 border border-orange-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-xl mt-0.5">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">What Should I Do Today?</span>
              <span className="text-[10px] text-slate-400 font-mono">20 min estimated</span>
            </div>
            <h3 className="text-base font-medium text-white mt-0.5">
              Review Missing Skills for Tier 1 Companies & Study Redis Caching Architecture
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Closing your 22% skill gap for Tier 1 product companies will boost your readiness score and qualify you for dream drives.
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            window.scrollTo({ top: 600, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <span>Diagnose Skill Gap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top 50 Companies Skill Gap Analyzer */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Target Recruiter Skill Gap Analyzer</span>
            </h2>
            <p className="text-xs text-slate-400">Compare your verified portfolio against current corporate hiring bars.</p>
          </div>

          <div className="flex gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            {(['tier1', 'fintech', 'cloud'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setTargetCompany(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  targetCompany === cat ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'tier1' ? 'Tier 1 Giants' : cat === 'fintech' ? 'Top FinTech' : 'Cloud Infra'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">{companyRequirements[targetCompany].name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Match Level:</span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-emerald-500/30">
                {companyRequirements[targetCompany].matchRate}% Match
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Skills in Your Profile ({companyRequirements[targetCompany].verifiedMatches.length})</span>
              </span>
              <div className="space-y-1.5">
                {companyRequirements[targetCompany].verifiedMatches.map((m, idx) => (
                  <div key={idx} className="p-2 bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs rounded-lg">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Identified Skill Gaps to Close ({companyRequirements[targetCompany].missingSkills.length})</span>
              </span>
              <div className="space-y-1.5">
                {companyRequirements[targetCompany].missingSkills.map((gap, idx) => (
                  <div key={idx} className="p-2 bg-rose-950/20 border border-rose-500/30 text-rose-200 text-xs rounded-lg flex items-center justify-between">
                    <span>{gap}</span>
                    <span className="text-[10px] text-rose-300 underline cursor-pointer">Learn Now</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Design Fundamentals */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-orange-400" />
            <span>Interactive System Design Architecture</span>
          </h2>
          <p className="text-xs text-slate-400">Click a component below to understand its architectural purpose, real-world analogy, and implementation.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'cache', name: '⚡ In-Memory Cache (Redis)' },
            { id: 'loadbalancer', name: '⚖️ Load Balancer (Nginx)' },
            { id: 'sharding', name: '🗄️ Database Sharding' },
          ].map(comp => (
            <button
              key={comp.id}
              onClick={() => setSelectedSystemComponent(comp.id)}
              className={`p-3.5 rounded-xl text-xs font-semibold transition-all text-center ${
                selectedSystemComponent === comp.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-1 ring-orange-400'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>

        <div className="p-5 bg-slate-950 border border-orange-500/30 rounded-xl space-y-3">
          <h3 className="text-sm font-bold text-white">{systemComponents[selectedSystemComponent].title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{systemComponents[selectedSystemComponent].role}</p>
          <div className="p-3 bg-slate-900 rounded-lg text-xs text-amber-300 border border-slate-800">
            <strong>Analogy:</strong> {systemComponents[selectedSystemComponent].analogy}
          </div>
          <div className="p-3 bg-slate-900 rounded-lg text-xs text-indigo-300 border border-slate-800 font-mono">
            <strong>Implementation:</strong> {systemComponents[selectedSystemComponent].implementation}
          </div>
        </div>
      </div>

      {/* "What to Learn Next" */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-slate-400">
          What to Learn Next to Reach Your Goal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-orange-400">Step 1 (Immediate)</span>
            <h4 className="text-sm font-medium text-white">Year 4 Placement Command</h4>
            <p className="text-xs text-slate-400">Verify TPO eligibility, track campus drives, and practice mock interviews.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 2 (Upcoming)</span>
            <h4 className="text-sm font-medium text-white">Company Interview Engine</h4>
            <p className="text-xs text-slate-400">Master round-specific questions asked by Google, Amazon, and Infosys.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 3 (Goal)</span>
            <h4 className="text-sm font-medium text-white">Offer & Career Launch</h4>
            <p className="text-xs text-slate-400">Analyze CTC structure, sign your offer letter, and prepare for onboarding.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
