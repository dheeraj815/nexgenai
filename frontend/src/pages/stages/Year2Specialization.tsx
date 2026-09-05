import React, { useState } from 'react';
import { 
  Cpu, Shield, Cloud, Globe, ArrowRight, CheckCircle2, 
  AlertTriangle, Play, Star, Terminal, Layers, RefreshCw
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const Year2Specialization: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<'ai' | 'fullstack' | 'soc' | 'devops'>('soc');
  const [socResolved, setSocResolved] = useState(false);
  const [socActionTaken, setSocActionTaken] = useState<string | null>(null);

  const tracks = {
    ai: {
      title: 'AI / Machine Learning & LLMs',
      desc: 'Build intelligent applications, train transformers, and construct enterprise RAG search engines.',
      skills: ['Python 3.12', 'PyTorch / TensorFlow', 'HuggingFace Transformers', 'LangChain / LlamaIndex', 'Vector DBs (Qdrant/Pinecone)'],
      capstone: 'Autonomous AI Research Assistant with Citation Grounding'
    },
    fullstack: {
      title: 'Modern Full-Stack Microservices',
      desc: 'Architect reactive web apps with Python FastAPI, TypeScript, PostgreSQL, and Redis caching.',
      skills: ['FastAPI / Python', 'React 18 & TypeScript', 'PostgreSQL & SQLAlchemy', 'Redis Cache', 'Docker Microservices'],
      capstone: 'High-Concurrency Real-Time Collaborative Whiteboard'
    },
    soc: {
      title: 'Defensive Cybersecurity & SOC Operations',
      desc: 'Analyze security telemetry, detect brute-force attacks, and execute incident containment procedures.',
      skills: ['SIEM Splunk / Elastic', 'Linux Log Forensics', 'Snort / Suricata IDS', 'Firewall Rule Configuration', 'MITRE ATT&CK Framework'],
      capstone: 'Enterprise Incident Response Playbook & SIEM Pipeline'
    },
    devops: {
      title: 'Cloud Architecture & DevOps SRE',
      desc: 'Automate infrastructure with Terraform, deploy Kubernetes clusters, and build zero-downtime CI/CD pipelines.',
      skills: ['Docker & Containerization', 'Kubernetes (K8s)', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'Prometheus & Grafana'],
      capstone: 'Multi-Region High-Availability Kubernetes Cluster'
    }
  };

  const handleSocAction = (action: string) => {
    setSocActionTaken(action);
    setSocResolved(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-slate-900 border border-cyan-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 04 • College Year 2
              </span>
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs">
                Domain Specialization
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Domain Specialization & Incident Simulation
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Transition from generic coding into professional specialization. Build production-grade capstone projects in AI, Full-Stack, Cyber SOC, or Cloud SRE.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="Specialization vs General Coding"
            defaultAnalogy="In medicine, a general doctor knows basic health, but a cardiologist knows the heart with mastery. In software, Year 1 makes you a general doctor. Year 2 is when you choose your medical specialty (AI, Cybersecurity, or Cloud) so top companies hire you for real depth!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 2 Strategy: Choosing Depth and Shipping Milestone Projects"
            scriptText="Welcome to College Year 2! This is the most crucial year for setting yourself apart. While most students drift, you must pick one clear track and build at least two production-grade projects that prove you can solve real engineering challenges."
          />
        </div>
      </div>

      {/* "What Should I Do Today?" Card */}
      <div className="p-5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-slate-900 border border-cyan-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl mt-0.5">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">What Should I Do Today?</span>
              <span className="text-[10px] text-slate-400 font-mono">15 min estimated</span>
            </div>
            <h3 className="text-base font-medium text-white mt-0.5">
              Triage the Live SSH Brute-Force Incident in the SOC Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Inspect suspicious authentication logs, identify the attacker IP, and execute firewall isolation.
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            window.scrollTo({ top: 700, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <span>Open SOC Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Deep Specialization Tracks */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Select Your Specialization Track</span>
          </h2>
          <p className="text-xs text-slate-400">Choose your area of focus for Year 2 deep-dive projects.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'ai', name: '🤖 AI / ML & LLMs', icon: Cpu },
            { id: 'fullstack', name: '🌐 Full-Stack Microservices', icon: Globe },
            { id: 'soc', name: '🛡️ Defensive Cyber SOC', icon: Shield },
            { id: 'devops', name: '☁️ Cloud & DevOps SRE', icon: Cloud },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedTrack(item.id as any)}
              className={`p-3.5 rounded-xl text-xs font-semibold transition-all text-left flex flex-col gap-2 ${
                selectedTrack === item.id
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-1 ring-cyan-400'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">{tracks[selectedTrack].title}</h3>
            <p className="text-xs text-slate-400 mt-1">{tracks[selectedTrack].desc}</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-cyan-300">Core Technology Stack:</span>
            <div className="flex flex-wrap gap-2">
              {tracks[selectedTrack].skills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs text-cyan-200">
            <strong>Target Capstone Project:</strong> {tracks[selectedTrack].capstone}
          </div>
        </div>
      </div>

      {/* Defensive SOC Incident Simulator */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-rose-400" />
              <span>Live Defensive SOC Incident Simulator</span>
            </h2>
            <p className="text-xs text-slate-400">
              Active Security Alert: SSH Brute-Force anomaly detected on port 22.
            </p>
          </div>

          <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SEVERITY: HIGH</span>
          </span>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
          <div className="text-slate-400"># System Auth Log Stream:</div>
          <p className="text-rose-400">[ALERT 14:02:18] 427 failed password attempts for user 'root' from 198.51.100.44</p>
          <p className="text-rose-400">[ALERT 14:02:22] Repeated authentication failure from IP 198.51.100.44 (Threshold &gt; 50/sec)</p>
          <p className="text-amber-400">[IOC DETECTED] Threat Actor fingerprint matches Hydra automated dictionary attack.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSocAction('IPTABLES_BLOCK')}
            disabled={socResolved}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            🛡️ Execute: iptables -A INPUT -s 198.51.100.44 -j DROP
          </button>
          <button
            onClick={() => handleSocAction('DISABLE_PASSWORDS')}
            disabled={socResolved}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            🔑 Enforce: PasswordAuthentication no (SSH Keys Only)
          </button>
        </div>

        {socResolved && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 space-y-1 animate-fade-in">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Incident Contained Successfully!</span>
            </div>
            <p className="text-slate-300">
              Action `{socActionTaken}` successfully blocked the threat actor. Evidence added to your verified Career Passport! +30 XP.
            </p>
          </div>
        )}
      </div>

      {/* "What to Learn Next" */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-slate-400">
          What to Learn Next to Reach Your Goal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-cyan-400">Step 1 (Immediate)</span>
            <h4 className="text-sm font-medium text-white">College Year 3 Industry Prep</h4>
            <p className="text-xs text-slate-400">Audit your resume with ATS and study System Design architectures.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 2 (Upcoming)</span>
            <h4 className="text-sm font-medium text-white">Placement Command Center</h4>
            <p className="text-xs text-slate-400">Verify TPO drive eligibility and conduct live AI mock interviews.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 3 (Goal)</span>
            <h4 className="text-sm font-medium text-white">Super-Dream Job Offer</h4>
            <p className="text-xs text-slate-400">Secure high-impact full-time offer with CTC negotiation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
