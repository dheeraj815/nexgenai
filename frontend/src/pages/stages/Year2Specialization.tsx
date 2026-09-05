import React, { useState } from 'react';
import { 
  Cpu, Code2, Shield, Cloud, CheckCircle2, AlertTriangle, 
  Play, HelpCircle, ArrowRight, Award, Layers, Star, 
  Terminal, ChevronRight, Activity, Flame, Bot, Volume2,
  Check, RefreshCw, Zap
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { DeepTopicPlayer } from '../../components/learn/DeepTopicPlayer';
import { DEEP_CURRICULUM_DATABASE } from '../../data/curriculumData';

interface SocAlert {
  id: string;
  sourceIp: string;
  event: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  timestamp: string;
  status: 'PENDING' | 'RESOLVED';
  mitigation: string;
}

export const Year2Specialization: React.FC = () => {
  const { 
    completeStageTopic, 
    verifySkillProof, 
    xpPoints,
    readiness
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'tracks' | 'curriculum' | 'soc' | 'certs' | 'prep'>('tracks');
  const [selectedTrack, setSelectedTrack] = useState<'ai' | 'web' | 'cyber' | 'cloud'>('ai');
  const [activeDeepTopic, setActiveDeepTopic] = useState<boolean>(false);

  // SOC Simulator State
  const [alerts, setAlerts] = useState<SocAlert[]>([
    {
      id: 'ALT-101',
      sourceIp: '198.51.100.42',
      event: 'SSH Brute-Force Password Spraying Detected (2,400 attempts/min)',
      severity: 'CRITICAL',
      timestamp: 'Just now',
      status: 'PENDING',
      mitigation: 'Block IP via iptables firewall rule and enforce public-key authentication.'
    },
    {
      id: 'ALT-102',
      sourceIp: '203.0.113.19',
      event: 'SQL Injection payload detected in /api/v1/auth/login parameter',
      severity: 'HIGH',
      timestamp: '2 mins ago',
      status: 'PENDING',
      mitigation: 'Enable WAF parameterized query rule and sanitize input via prepared statements.'
    },
    {
      id: 'ALT-103',
      sourceIp: '192.0.2.88',
      event: 'Suspicious outbound DNS tunneling request to external domain',
      severity: 'MEDIUM',
      timestamp: '5 mins ago',
      status: 'PENDING',
      mitigation: 'Sinkhole malicious domain at resolver and isolate host machine.'
    }
  ]);
  const [selectedAlert, setSelectedAlert] = useState<SocAlert | null>(alerts[0]);

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'RESOLVED' } : a));
    completeStageTopic('year2', 'soc-' + id, 35);
    verifySkillProof('SOC Incident Triage & Threat Response', 'Cybersecurity', 'Intermediate');
  };

  const handleVoiceBriefing = () => {
    if ('speechSynthesis' in window) {
      const text = `Year 2 Specialization Briefing: You have selected the ${selectedTrack.toUpperCase()} pathway. At this stage, focus on building depth. Master end-to-end deployment, run security simulations, and prepare for your first summer internship.`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const trackData = {
    ai: {
      name: 'Artificial Intelligence & Machine Learning',
      badge: 'Highest Starting Salary',
      desc: 'Master deep neural networks, computer vision, natural language processing, and scalable transformer deployment.',
      skills: ['PyTorch & TensorFlow', 'Data Wrangling (Pandas/NumPy)', 'Transformer Architectures', 'Vector Databases (Pinecone/Chroma)', 'MLOps Deployment'],
      companies: ['Google DeepMind', 'NVIDIA', 'OpenAI ecosystem', 'Microsoft AI', 'Anthropic'],
      avgCtc: '₹14 - 32 LPA'
    },
    web: {
      name: 'Full Stack Web & Microservices',
      badge: 'Highest Job Demand',
      desc: 'Build high-concurrency client-server architectures using React, Next.js, Node/Go, Docker, and distributed caching.',
      skills: ['React 19 & TypeScript', 'FastAPI / Express Microservices', 'PostgreSQL & Redis Caching', 'Docker & Kubernetes', 'CI/CD Pipelines'],
      companies: ['Amazon', 'Flipkart', 'Razorpay', 'Atlassian', 'Swiggy'],
      avgCtc: '₹12 - 28 LPA'
    },
    cyber: {
      name: 'Cybersecurity & SOC Engineering',
      badge: '0% Global Unemployment',
      desc: 'Defend corporate infrastructure against active cyber warfare, inspect packets, conduct penetration tests, and remediate zero-days.',
      skills: ['SIEM Triage (Splunk/Wazuh)', 'Network Packet Forensics', 'OWASP Top 10 Web Security', 'Linux Privilege Escalation', 'Threat Hunting'],
      companies: ['CrowdStrike', 'Palo Alto Networks', 'Cisco Talos', 'Mandiant', 'Cloudflare'],
      avgCtc: '₹10 - 25 LPA'
    },
    cloud: {
      name: 'Cloud Architecture & DevOps',
      badge: 'Enterprise Backbone',
      desc: 'Automate infrastructure as code, architect multi-region high-availability systems on AWS, and manage Kubernetes clusters.',
      skills: ['AWS Solutions Architecture', 'Terraform (IaC)', 'Kubernetes Orchestration', 'Monitoring (Prometheus/Grafana)', 'Site Reliability Engineering'],
      companies: ['AWS', 'Microsoft Azure', 'Netflix', 'Uber', 'Red Hat'],
      avgCtc: '₹12 - 26 LPA'
    }
  };

  const current = trackData[selectedTrack];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/70 via-blue-950/50 to-slate-900 border border-cyan-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 04 • Year 2 Specialization
              </span>
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs">
                Deep Track & Incident Simulation
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Year 2 Domain Specialization & SOC Simulator Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Move beyond generic computer science into deep vertical mastery. Choose between AI Systems, Full Stack Web, Cybersecurity, or Cloud DevOps, and test your skills in our live Security Operations Center simulator.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Year 2 Specialization Selection"
              defaultAnalogy="In medical school, Year 1 is general human anatomy. In Year 2, doctors choose whether to specialize in Cardiology, Neurology, or Surgery. Similarly, software engineers choose AI, Web, Cyber, or Cloud to develop elite hiring value."
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 2 Audio Strategy: Choosing Your High-Demand Tech Niche Early"
            scriptText="Welcome to Year 2 Specialization. Generalist developers face severe competition. Candidates with deep specialization in AI, Full Stack, or Cyber defend higher packages and stand out in summer internship interviews. Select your track and run our real-world SOC incident simulator below."
          />
        </div>
      </div>

      {/* 5 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'tracks', label: '1. SPECIALIZATION TRACK SELECTOR', icon: Layers },
          { id: 'curriculum', label: '2. DEEP SPECIALIZED CURRICULUM', icon: Code2 },
          { id: 'soc', label: '3. LIVE SOC SECURITY SIMULATOR', icon: Shield },
          { id: 'certs', label: '4. INDUSTRY CERTIFICATIONS', icon: Award },
          { id: 'prep', label: '5. SUMMER INTERNSHIP READINESS', icon: Star }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setActiveDeepTopic(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TRACK SELECTOR */}
      {activeTab === 'tracks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'ai', name: 'AI & Machine Learning', icon: Bot, color: 'text-purple-400' },
              { id: 'web', name: 'Full Stack & Cloud Web', icon: Code2, color: 'text-blue-400' },
              { id: 'cyber', name: 'Cybersecurity & SOC', icon: Shield, color: 'text-emerald-400' },
              { id: 'cloud', name: 'Cloud & DevOps SRE', icon: Cloud, color: 'text-amber-400' }
            ].map(track => {
              const Icon = track.icon;
              const isSelected = selectedTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id as any)}
                  className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-36 ${
                    isSelected 
                      ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-md' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-6 h-6 ${track.color}`} />
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">{track.name}</span>
                    <span className="text-[10px] text-cyan-300 font-semibold uppercase">Click to Activate</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Track Overview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                    {current.badge}
                  </span>
                  <span className="text-xs text-slate-400">Target Freshers Compensation</span>
                </div>
                <h3 className="text-2xl font-black text-white">{current.name}</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">{current.desc}</p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xl font-black text-emerald-400">{current.avgCtc}</div>
                <div className="text-[10px] text-slate-400 uppercase">Average Industry Package</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Key Technical Competencies:</div>
                <div className="flex flex-wrap gap-2">
                  {current.skills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Top Hiring Employers:</div>
                <div className="flex flex-wrap gap-2">
                  {current.companies.map(c => (
                    <span key={c} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-lg text-xs font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEEP CURRICULUM */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          {activeDeepTopic ? (
            <div className="space-y-4">
              <button
                onClick={() => setActiveDeepTopic(false)}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                ← Back to Curriculum Modules
              </button>
              <DeepTopicPlayer 
                topic={DEEP_CURRICULUM_DATABASE['py-variables']}
                onNextTopic={() => setActiveDeepTopic(false)}
              />
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    <span>Specialized Engineering Modules for {current.name}</span>
                  </h3>
                  <p className="text-slate-400 text-xs">Click any topic to launch the interactive 16-step code execution player.</p>
                </div>
                <button
                  onClick={() => setActiveDeepTopic(true)}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Launch Deep Lab</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {[
                  '1. Architecture Design & Constraints',
                  '2. High-Throughput Concurrency',
                  '3. Production Data Persistence',
                  '4. State Caching & Eviction',
                  '5. Security Hardening & Zero-Trust',
                  '6. Automated Unit & Stress Tests'
                ].map(mod => (
                  <div
                    key={mod}
                    onClick={() => setActiveDeepTopic(true)}
                    className="p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-200">{mod}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LIVE SOC SIMULATOR */}
      {activeTab === 'soc' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>NexGenAI Virtual Security Operations Center (SOC)</span>
                </h3>
                <p className="text-slate-400 text-xs">Simulate live cyber incident response. Investigate malicious telemetry and apply remediation rules.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SOC Telemetry Live</span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
              {/* Alert Feed */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-400 uppercase">Incoming Incident Queue</div>
                {alerts.map(a => {
                  const isSelected = selectedAlert?.id === a.id;
                  return (
                    <div
                      key={a.id}
                      onClick={() => setSelectedAlert(a)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-cyan-950/40 border-cyan-500 text-white' 
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {a.severity}
                        </span>
                        <span className="text-[10px] text-slate-500">{a.timestamp}</span>
                      </div>
                      <div className="text-xs font-semibold leading-snug line-clamp-2">{a.event}</div>
                      <div className="text-[10px] text-slate-400 mt-1">IP: {a.sourceIp}</div>
                    </div>
                  );
                })}
              </div>

              {/* Investigation Terminal */}
              {selectedAlert && (
                <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-xs font-bold text-cyan-400 font-mono">{selectedAlert.id}</span>
                        <h4 className="text-sm font-bold text-white mt-0.5">{selectedAlert.event}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        selectedAlert.status === 'RESOLVED' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {selectedAlert.status}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
                      <div className="text-slate-400">Target Asset: <span className="text-white">PROD-GATEWAY-CLUSTER-01</span></div>
                      <div className="text-slate-400">Attacker IP: <span className="text-rose-400">{selectedAlert.sourceIp}</span></div>
                      <div className="text-slate-400">Geo-Location: <span className="text-amber-400">Anonymous Tor Relay Node</span></div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-emerald-400">Recommended Remediation Action:</div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-xl">
                        {selectedAlert.mitigation}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">+35 XP towards Cyber Readiness</span>
                    <button
                      onClick={() => handleResolveAlert(selectedAlert.id)}
                      disabled={selectedAlert.status === 'RESOLVED'}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                        selectedAlert.status === 'RESOLVED' 
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {selectedAlert.status === 'RESOLVED' ? 'Incident Remediated ✓' : 'Execute Remediation Rule'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INDUSTRY CERTIFICATIONS */}
      {activeTab === 'certs' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">High-ROI Industry Certifications for Year 2</h3>
            <p className="text-slate-400 text-xs">Certifications that validate your practical skills to recruiters before campus drives begin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'AWS Certified Solutions Architect Associate',
                org: 'Amazon Web Services',
                duration: '6 Weeks Prep',
                value: 'Validates multi-tier cloud architectures, VPC security, and EC2 scaling.'
              },
              {
                name: 'CompTIA Security+ (SY0-701)',
                org: 'CompTIA Global',
                duration: '8 Weeks Prep',
                value: 'Universal global benchmark for enterprise cyber defense and threat mitigation.'
              },
              {
                name: 'TensorFlow Developer Certificate',
                org: 'Google AI',
                duration: '4 Weeks Prep',
                value: 'Validates computer vision, NLP models, and deep learning network training.'
              }
            ].map(cert => (
              <div key={cert.name} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{cert.org}</span>
                  <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{cert.value}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>⏱ {cert.duration}</span>
                  <span className="text-cyan-400 font-semibold">High Recruiter Weight</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUMMER INTERNSHIP READINESS */}
      {activeTab === 'prep' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Summer Internship Readiness Metric</h3>
                <p className="text-slate-400 text-xs">Ensure you cross the 70% threshold before Year 2 summer placement drives commence.</p>
              </div>

              <button
                onClick={handleVoiceBriefing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-bold hover:bg-cyan-600/30 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Voice Assessment</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-xl font-black text-cyan-400">{readiness.overallScore}%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Overall Readiness</div>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-xl font-black text-purple-400">{xpPoints}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Total Experience XP</div>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-xl font-black text-emerald-400">
                  {alerts.filter(a => a.status === 'RESOLVED').length} / {alerts.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">SOC Alerts Mitigated</div>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-xl font-black text-amber-400">{readiness.statusLabel}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Candidate Tier</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready for Pre-Final Placement Command?</span>
              <a
                href="/stage/year-3"
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>Proceed to Year 3 Industry Prep</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
