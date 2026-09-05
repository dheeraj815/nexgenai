import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Search, DollarSign, MapPin, Calendar, ArrowRight, 
  CheckCircle2, Clock, ShieldCheck, Award, FileText, Send, 
  Filter, Building2, UserCheck, Flame, Star, Sparkles, Target, 
  Volume2, VolumeX, Bot, Check, ChevronRight, Bookmark, ThumbsUp
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { cancelAllSpeech } from '../../utils/voiceUtils';

interface InternshipRole {
  id: string;
  company: string;
  role: string;
  stipend: string;
  duration: string;
  location: string;
  domain: string;
  mode: 'Remote' | 'Hybrid' | 'On-site';
  requiredSkills: string[];
  deadline: string;
  description: string;
}

export const InternshipEngine: React.FC = () => {
  const { 
    skills, 
    verifySkillProof, 
    submitProjectProof, 
    xpPoints 
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'find' | 'apply' | 'prep' | 'sim' | 'onboard' | 'track'>('find');
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

  // Stop speech when unmounting
  useEffect(() => {
    return () => {
      cancelAllSpeech();
      setIsVoiceSpeaking(false);
    };
  }, []);

  // Stop speech when switching tabs
  useEffect(() => {
    cancelAllSpeech();
    setIsVoiceSpeaking(false);
  }, [activeTab]);
  const [selectedRole, setSelectedRole] = useState<string>('int-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');

  // Application State
  const [applicantName, setApplicantName] = useState('Candidate Student');
  const [applicantEmail, setApplicantEmail] = useState('candidate@demo.edu');
  const [coverNote, setCoverNote] = useState('');
  const [appliedRoles, setAppliedRoles] = useState<string[]>([]);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Interview Simulation State
  const [simAnswer, setSimAnswer] = useState('');
  const [simFeedback, setSimFeedback] = useState<string | null>(null);

  // Track & Prove State
  const [workLogText, setWorkLogText] = useState('');
  const [workLogs, setWorkLogs] = useState<string[]>([
    'Day 01: Set up local Docker containers and configured Postgres DB.',
    'Day 02: Submitted PR #104 fixing webhook retry latency by 40%.'
  ]);
  const [newInternSkill, setNewInternSkill] = useState('');

  const internships: InternshipRole[] = [
    {
      id: 'int-1',
      company: 'Razorpay Technologies',
      role: 'Backend Engineering Intern',
      stipend: '₹60,000 / month',
      duration: '6 Months (Summer)',
      location: 'Bengaluru / Hybrid',
      domain: 'Fintech',
      mode: 'Hybrid',
      requiredSkills: ['Python', 'SQL', 'FastAPI', 'Redis'],
      deadline: 'In 4 Days',
      description: 'Build core payment webhooks and idempotent transaction ledgers handling 5,000 requests/sec.'
    },
    {
      id: 'int-2',
      company: 'CRED',
      role: 'Frontend UI Systems Intern',
      stipend: '₹65,000 / month',
      duration: '3 Months (Summer)',
      location: 'Bengaluru / On-site',
      domain: 'Consumer Tech',
      mode: 'On-site',
      requiredSkills: ['React', 'TypeScript', 'Tailwind', 'APIs'],
      deadline: 'In 7 Days',
      description: 'Craft 60FPS fluid micro-interactions and state machines for high-net-worth member journeys.'
    },
    {
      id: 'int-3',
      company: 'Postman',
      role: 'API Platform Intern',
      stipend: '₹75,000 / month',
      duration: '6 Months',
      location: 'Remote / Global',
      domain: 'Developer Tools',
      mode: 'Remote',
      requiredSkills: ['Node.js', 'APIs', 'Docker', 'Git'],
      deadline: 'In 10 Days',
      description: 'Optimize HTTP protocol inspection and WebSocket streaming inside the Postman core engine.'
    },
    {
      id: 'int-4',
      company: 'Google Cloud India',
      role: 'Cloud Engineering Intern',
      stipend: '₹1,00,000 / month',
      duration: '3 Months',
      location: 'Hyderabad / Hybrid',
      domain: 'Cloud / AI',
      mode: 'Hybrid',
      requiredSkills: ['Python', 'C++', 'DSA', 'Distributed Systems'],
      deadline: 'In 14 Days',
      description: 'Assist in optimizing Kubernetes cluster resource scheduling and real-time node telemetry.'
    }
  ];

  const current = internships.find(i => i.id === selectedRole) || internships[0];

  // Live Skill Match Calculation
  const verifiedNames = skills.filter(s => s.verified).map(s => s.name.toLowerCase());
  const matchedSkills = current.requiredSkills.filter(req => 
    verifiedNames.some(vn => vn.includes(req.toLowerCase()) || req.toLowerCase().includes(vn))
  );
  const gapSkills = current.requiredSkills.filter(req => !matchedSkills.includes(req));
  const matchRate = Math.round((matchedSkills.length / Math.max(1, current.requiredSkills.length)) * 100);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appliedRoles.includes(current.id)) {
      setAppliedRoles(prev => [...prev, current.id]);
    }
    setApplicationSuccess(true);
    setTimeout(() => setApplicationSuccess(false), 3000);
  };

  const handleSimulateInterview = () => {
    if (!simAnswer.trim()) return;
    setSimFeedback(
      'Interview Score: 92/100 (Strong Hire)\nInterviewer Feedback: Clear explanation of idempotent keys and retry backoff. Demonstrates production maturity beyond average interns.'
    );
  };

  const handleAddWorkLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workLogText.trim()) return;
    setWorkLogs(prev => [...prev, `Week Log: ${workLogText}`]);
    setWorkLogText('');
  };

  const handleClaimInternSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInternSkill.trim()) return;
    verifySkillProof(newInternSkill, 'Internship Experience', 'Advanced');
    setNewInternSkill('');
  };

  const handleVoiceBriefing = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isVoiceSpeaking) {
      cancelAllSpeech();
      setIsVoiceSpeaking(false);
      return;
    }

    cancelAllSpeech();
    const text = `Internship Engine Briefing: You are reviewing the ${current.role} position at ${current.company} offering ${current.stipend}. Your skill match rate is ${matchRate} percent. Close your gap in ${gapSkills.join(', ')} to maximize your shortlist probability!`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsVoiceSpeaking(false);
    utterance.onerror = () => setIsVoiceSpeaking(false);
    setIsVoiceSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const filteredInternships = internships.filter(item => {
    const matchesSearch = item.company.toLowerCase().includes(searchTerm.toLowerCase()) || item.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'ALL' || item.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/70 via-indigo-950/50 to-slate-900 border border-blue-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 07 • 20-Step Internship Lifecycle
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Verified High-Stipend Offers
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Summer & Off-Campus Internship Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Find elite paid internships, calculate your live skill match percentage, submit proof-backed applications, simulate interviews, and convert summer roles into confirmed full-time PPOs.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Summer Internship Strategy"
              defaultAnalogy="An internship is like a 90-day mutual test drive. The company sees how fast you learn and ship code, and you get paid while securing an early full-time offer before college final year even starts!"
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Internship Audio Guide: How to Convert a Summer Internship into a 25+ LPA Job Offer"
            scriptText="Welcome to the Internship Lifecycle Engine. Securing an internship is the single most effective shortcut to bypassing campus drive competition. Explore openings, audit your match score, and practice your technical rounds."
          />
        </div>
      </div>

      {/* 6 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'find', label: '1. FIND & AUDIT INTERNSHIPS', icon: Search },
          { id: 'apply', label: '2. MATCH & ONE-CLICK APPLY', icon: Send },
          { id: 'prep', label: '3. TAILORED PREPARATION', icon: Target },
          { id: 'sim', label: '4. LIVE INTERVIEW SIMULATOR', icon: Bot },
          { id: 'onboard', label: '5. OFFER & PRE-JOINING', icon: Award },
          { id: 'track', label: '6. INTERNSHIP WORK LOG & PROOF', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: FIND & AUDIT */}
      {activeTab === 'find' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 w-full focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceBriefing}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isVoiceSpeaking
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    : 'bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30'
                }`}
                title={isVoiceSpeaking ? 'Stop / Cut Audio Role Breakdown' : 'Listen to Audio Role Breakdown'}
              >
                {isVoiceSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isVoiceSpeaking ? 'Stop Audio' : 'Audio Role Breakdown'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInternships.map(item => {
              const isSelected = selectedRole === item.id;
              const isApplied = appliedRoles.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedRole(item.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                    isSelected 
                      ? 'bg-blue-950/30 border-blue-500 text-white shadow-lg shadow-blue-500/10' 
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400">{item.company}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">
                        {item.mode}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{item.role}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-emerald-400">{item.stipend}</div>
                      <div className="text-[10px] text-slate-400">{item.duration} • {item.location}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isApplied && (
                        <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                          Applied ✓
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRole(item.id);
                          setActiveTab('apply');
                        }}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all"
                      >
                        View & Apply
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MATCH & APPLY */}
      {activeTab === 'apply' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Skill Match Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase">Your Skill Match vs {current.company}</h3>
                <span className="text-xl font-black text-blue-400">{matchRate}%</span>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-emerald-400">Matched Skills ({matchedSkills.length}):</div>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded text-xs">
                      ✓ {s}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-bold text-rose-400 pt-2">Missing Skill Gaps ({gapSkills.length}):</div>
                <div className="flex flex-wrap gap-1.5">
                  {gapSkills.map(g => (
                    <span key={g} className="px-2.5 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded text-xs font-bold">
                      • {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Submission Form */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Application to {current.company}</h3>
                  <p className="text-xs text-slate-400">Target Role: {current.role} • {current.stipend}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-xs font-bold">
                  Verified Candidate
                </span>
              </div>

              <form onSubmit={handleApply} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Full Name</label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Why are you the ideal candidate for this role?</label>
                  <textarea
                    placeholder="Mention your production projects and GitHub verification..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                >
                  {applicationSuccess ? 'Application Successfully Submitted! ✓' : 'Submit Proof-Backed Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TAILORED PREPARATION */}
      {activeTab === 'prep' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">4-Week Sprint Plan for {current.company}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { week: 'Week 1', title: 'Language & Async Core', focus: 'Master Python concurrency, event loops, and type hinting.' },
                { week: 'Week 2', title: 'REST & Database Locks', focus: 'PostgreSQL ACID transactions and Redis cache invalidation.' },
                { week: 'Week 3', title: 'System Architecture', focus: 'Idempotency patterns and webhook delivery with retries.' },
                { week: 'Week 4', title: 'Mock Interviews', focus: 'Simulate 45-minute live pair programming rounds.' }
              ].map(w => (
                <div key={w.week} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                    {w.week}
                  </span>
                  <div className="text-xs font-bold text-white">{w.title}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{w.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERVIEW SIMULATOR */}
      {activeTab === 'sim' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Technical Round Simulation for {current.company}</h3>
                <p className="text-xs text-slate-400">Authentic past question asked to intern candidates.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="text-xs font-bold text-blue-400 uppercase">Question:</div>
              <p className="text-sm font-semibold text-white">
                "Explain how you would handle an idempotent payment request when a customer double-clicks the 'Pay Now' button."
              </p>
            </div>

            <textarea
              placeholder="Type your explanation or pseudocode..."
              value={simAnswer}
              onChange={(e) => setSimAnswer(e.target.value)}
              rows={4}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSimulateInterview}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              Evaluate My Technical Response
            </button>

            {simFeedback && (
              <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl font-mono text-xs text-blue-300 whitespace-pre-wrap">
                {simFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: OFFER & PRE-JOINING */}
      {activeTab === 'onboard' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Pre-Joining Checklist for Summer Interns</h3>
            <div className="space-y-2.5">
              {[
                'Sign offer letter and upload signed copy to HR portal.',
                'Open corporate salary bank account (HDFC / ICICI).',
                'Set up company email and authenticators (Duo / Okta).',
                'Review the engineering team’s onboarding documentation.',
                'Clone starter template and verify Docker builds locally.'
              ].map(item => (
                <div key={item} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: WORK LOG & PROOF */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Internship Daily Work Log</h3>
              <form onSubmit={handleAddWorkLog} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Log today's accomplishment (e.g. Merged PR #104)..."
                  value={workLogText}
                  onChange={(e) => setWorkLogText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold">
                  Add Log
                </button>
              </form>

              <div className="space-y-2">
                {workLogs.map((log, i) => (
                  <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Claim Verified Internship Skill</h3>
              <p className="text-xs text-slate-400">Acquired a new production skill during your internship? Add it directly to your permanent Career Passport.</p>

              <form onSubmit={handleClaimInternSkill} className="space-y-3">
                <input
                  type="text"
                  placeholder="Skill Name (e.g. Kafka Streaming, Kubernetes)"
                  value={newInternSkill}
                  onChange={(e) => setNewInternSkill(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify & Add to Career Passport (+35 XP)
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
