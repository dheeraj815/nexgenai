import React, { useState } from 'react';
import { 
  Sparkles, Code2, Shield, Palette, Cpu, Terminal, Compass, 
  ArrowRight, CheckCircle2, Play, Volume2, HelpCircle, RefreshCw, 
  Star, Trophy, ChevronRight, BookOpen, Layers, Target, Check,
  Bot, Flame, Brain, Database, Globe, Lightbulb
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { DeepTopicPlayer } from '../../components/learn/DeepTopicPlayer';
import { DEEP_CURRICULUM_DATABASE } from '../../data/curriculumData';

export const Class11Discover: React.FC = () => {
  const { 
    completeStageTopic, 
    stageProgress, 
    xpPoints, 
    skills, 
    projects 
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'discovery' | 'foundations' | 'domains' | 'paths' | 'mentor'>('discovery');

  // Tab 1: Career Discovery State (Starts clean)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);

  // Tab 2: Tech Foundations State (Starts clean: 0 completed)
  const [expandedFoundationTopic, setExpandedFoundationTopic] = useState<string | null>('fb-1');
  const [foundationCodeOutput, setFoundationCodeOutput] = useState<Record<string, string>>({});
  const [completedFoundations, setCompletedFoundations] = useState<string[]>([]);

  // Tab 3: Domain Exploration State
  const [activeDeepTopicId, setActiveDeepTopicId] = useState<string | null>(null);

  // Tab 5: AI Mentor State
  const [mentorInput, setMentorInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Welcome to Class 11! I am your AI Career Architect. You do not need to memorize anything. Just explore without fear and find what excites your curiosity!'
    }
  ]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleStrength = (strength: string) => {
    setSelectedStrengths(prev => 
      prev.includes(strength) ? prev.filter(s => s !== strength) : [...prev, strength]
    );
  };

  const handleFoundationRun = (topicId: string, output: string) => {
    setFoundationCodeOutput(prev => ({ ...prev, [topicId]: output }));
  };

  const handleCompleteFoundation = (topicId: string) => {
    if (!completedFoundations.includes(topicId)) {
      setCompletedFoundations(prev => [...prev, topicId]);
      completeStageTopic('class11', topicId, 25);
    }
  };

  const handleSendMentorMessage = () => {
    if (!mentorInput.trim()) return;
    const userText = mentorInput;
    setMentorInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);

    // Smart contextual response based on query
    setTimeout(() => {
      let reply = "That's a fantastic inquiry! In Class 11, the smartest move is to understand logic and variables before jumping into heavy frameworks. Try running our Python sandbox!";
      const lower = userText.toLowerCase();
      if (lower.includes('career') || lower.includes('job')) {
        reply = "With your current interest in AI and Software, aiming for an AI Systems Engineer or Full Stack Developer path gives you the highest job demand and starting CTCs exceeding 18 LPA.";
      } else if (lower.includes('python') || lower.includes('code')) {
        reply = "Python is the #1 language for Class 11 because of its clean English-like syntax. Check out the 'Variables & State' deep module in Tab 3!";
      } else if (lower.includes('math') || lower.includes('marks')) {
        reply = "Do not worry if school math feels dry. Tech programming uses practical logic, graph connections, and problem decomposition — which you can build step-by-step.";
      }
      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 400);
  };

  const handleVoiceMentorBriefing = () => {
    if ('speechSynthesis' in window) {
      const text = `Welcome to Class 11 Tech Discovery! You currently have ${selectedInterests.length} selected interests and ${xpPoints} experience points. I recommend diving into the Python dynamic variables lesson in Domain Exploration next.`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const foundationTopics = [
    {
      id: 'fb-1',
      title: '1. Computer Architecture & Binary Logic',
      desc: 'Understand how silicon transistors represent 0s and 1s, how the CPU reads instructions, and why memory hierarchy (RAM vs SSD) determines software speed.',
      code: `// CPU Instruction Pipeline Simulation
const registerA = 0b00001010; // 10 in binary
const registerB = 0b00000101; // 5 in binary
const aluResult = registerA + registerB; // 15
console.log("ALU Output:", aluResult, "Binary:", aluResult.toString(2));`,
      expectedOutput: 'ALU Output: 15 Binary: 1111'
    },
    {
      id: 'fb-2',
      title: '2. How the Global Internet Works (HTTP & DNS)',
      desc: 'Discover what happens within 50 milliseconds when you type google.com: DNS translation, TCP handshakes, TLS encryption, and server response payloads.',
      code: `// Simulated HTTP Request Lifecycle
const dnsLookup = (domain) => "142.250.190.46";
const tcpHandshake = (ip) => "SYN -> SYN-ACK -> ACK Connected!";
console.log("Resolved IP:", dnsLookup("google.com"));
console.log(tcpHandshake("142.250.190.46"));`,
      expectedOutput: 'Resolved IP: 142.250.190.46\nSYN -> SYN-ACK -> ACK Connected!'
    },
    {
      id: 'fb-3',
      title: '3. Digital Literacy, Privacy & Cyber Safety',
      desc: 'Learn cryptographic hashing, password entropy, phishing mitigation, and why modern identity relies on asymmetric public-private key cryptography.',
      code: `// Asymmetric Hashing Demonstration
function simpleHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
  }
  return "SHA256_SIM_" + Math.abs(hash).toString(16);
}
console.log("Hashed Password:", simpleHash("NexGenAI@2026"));`,
      expectedOutput: 'Hashed Password: SHA256_SIM_3a8f9c1b'
    },
    {
      id: 'fb-4',
      title: '4. AI & Machine Learning Fundamentals',
      desc: 'Unpack the difference between rule-based procedural programming (if/else) and machine learning (learning weights from past labeled patterns).',
      code: `// Rule-based vs Machine Learning Prediction
const ruleBased = (temp) => temp > 30 ? "Hot" : "Mild";
const mlWeights = { w: 0.85, bias: 2.1 };
const predict = (x) => (x * mlWeights.w + mlWeights.bias).toFixed(1);
console.log("Rule:", ruleBased(32), "| ML Output:", predict(32));`,
      expectedOutput: 'Rule: Hot | ML Output: 29.3'
    },
    {
      id: 'fb-5',
      title: '5. Programming Fundamentals & Algorithms',
      desc: 'Master variables, data structures, conditional branches, loops, and Big-O efficiency before writing production code.',
      code: `// Algorithm Time Complexity: Linear Search O(N)
const numbers = [12, 45, 67, 89, 92];
const target = 67;
const foundIndex = numbers.findIndex(n => n === target);
console.log("Found at Index:", foundIndex, "Steps Taken:", foundIndex + 1);`,
      expectedOutput: 'Found at Index: 2 Steps Taken: 3'
    },
    {
      id: 'fb-6',
      title: '6. Computational Decomposition & Problem Solving',
      desc: 'Break large ambiguous real-world problems down into small, deterministic functions that can be verified and tested independently.',
      code: `// Decomposing an E-Commerce Cart Checkout
const items = [{ price: 400 }, { price: 600 }];
const subtotal = items.reduce((acc, curr) => acc + curr.price, 0);
const tax = subtotal * 0.18;
const total = subtotal + tax;
console.log("Total Payable:", total);`,
      expectedOutput: 'Total Payable: 1180'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/70 via-indigo-950/50 to-slate-900 border border-blue-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 01 • Class 11 Operating System
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Zero Pressure • Full Discovery Engine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Class 11 Curiosity & Career Discovery Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Never choose your stream blind. Test drive coding, AI, cybersecurity, and system architecture in bite-sized modules, discover your natural aptitude, and see which tech career fits your brain.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Class 11 Exploration"
              defaultAnalogy="Class 11 is like walking into a state-of-the-art tech lab where every single machine is free to touch. You don't have to pick a college major today; you just run experiments, earn XP, and let your curiosity lead you."
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Class 11 Audio Briefing: What to Learn First and How to Build Early Tech Proof"
            scriptText="Welcome to your Class 11 discovery journey on NexGenAI. Today, you are exploring what you love before school exams box you into a stream. Try our interest radar, test the interactive sandboxes in Tech Foundations, and run our deep topic player."
          />
        </div>
      </div>

      {/* 5 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'discovery', label: '1. CAREER DISCOVERY & APTITUDE', icon: Compass },
          { id: 'foundations', label: '2. TECH FOUNDATIONS (6 TOPICS)', icon: Cpu },
          { id: 'domains', label: '3. DOMAIN EXPLORER & DEEP LABS', icon: Layers },
          { id: 'paths', label: '4. STRUCTURED LEARNING PATHS', icon: BookOpen },
          { id: 'mentor', label: '5. AI MENTOR & PROOF PASSPORT', icon: Brain }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setActiveDeepTopicId(null);
              }}
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

      {/* TAB 1: CAREER DISCOVERY & APTITUDE */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          {/* Interest Radar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <span>Interactive Interest Radar (Select all that excite you)</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Click domains to toggle. Your selections dynamically reshape your career recommendations.</p>
              </div>
              <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold">
                {selectedInterests.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'AI & Machine Learning', icon: Bot, color: 'text-purple-400' },
                { name: 'Software Development', icon: Code2, color: 'text-blue-400' },
                { name: 'Cybersecurity', icon: Shield, color: 'text-emerald-400' },
                { name: 'Data Science', icon: Database, color: 'text-cyan-400' },
                { name: 'Cloud & DevOps', icon: Globe, color: 'text-amber-400' },
                { name: 'UI/UX Design', icon: Palette, color: 'text-rose-400' },
                { name: 'Robotics & IoT', icon: Cpu, color: 'text-orange-400' },
                { name: 'Game Development', icon: Flame, color: 'text-indigo-400' }
              ].map(item => {
                const Icon = item.icon;
                const isSelected = selectedInterests.includes(item.name);
                return (
                  <button
                    key={item.name}
                    onClick={() => toggleInterest(item.name)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-28 ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <span className="text-xs font-bold leading-snug">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aptitude Compass Quiz */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>5-Minute Cognitive Aptitude Compass</span>
            </h3>

            <div className="space-y-4">
              {[
                {
                  q: "1. When you encounter a broken website or slow phone, what is your first instinct?",
                  options: [
                    "Open inspect element or settings to figure out why it failed (Logical)",
                    "Imagine a cleaner, smoother interface that would make it intuitive (Creative)",
                    "Look for security loopholes or permissions it shouldn't have (Security)",
                    "Think about how much data and battery it is consuming (Analytical)"
                  ]
                },
                {
                  q: "2. Which project would you proudly showcase to your friends?",
                  options: [
                    "An AI bot that answers homework questions in your voice (AI/ML)",
                    "A multiplayer web game built completely from scratch (Software)",
                    "An automated penetration tool that checks Wi-Fi vulnerabilities (Cyber)",
                    "A live stock market or sports prediction dashboard (Data Science)"
                  ]
                }
              ].map((item, qIdx) => (
                <div key={qIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                  <div className="text-xs font-bold text-slate-200">{item.q}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.options.map((opt, optIdx) => {
                      const isChosen = quizAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                            isChosen 
                              ? 'bg-purple-600/20 border-purple-500 text-white font-semibold' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths Finder */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span>Strengths Finder: Your Core Superpowers</span>
              </h3>
              <span className="text-xs text-slate-400">{selectedStrengths.length} Superpowers Active</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                'Logical Thinking', 'Curiosity', 'Pattern Recognition', 'Spatial Visualization',
                'Rapid Debugging', 'Communication', 'Attention to Detail', 'Systems Thinking',
                'Creative Problem Solving', 'Persistence', 'Speed Learning', 'Empathy'
              ].map(str => {
                const isSelected = selectedStrengths.includes(str);
                return (
                  <button
                    key={str}
                    onClick={() => toggleStrength(str)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isSelected 
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{str}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECH FOUNDATIONS */}
      {activeTab === 'foundations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">The 6 Foundational Building Blocks</h3>
              <p className="text-slate-400 text-xs">Complete each foundation to unlock verified Class 11 badges.</p>
            </div>
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold">
              {completedFoundations.length} / 6 Completed
            </div>
          </div>

          <div className="space-y-3">
            {foundationTopics.map(topic => {
              const isExpanded = expandedFoundationTopic === topic.id;
              const isCompleted = completedFoundations.includes(topic.id);
              const output = foundationCodeOutput[topic.id];

              return (
                <div 
                  key={topic.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <div 
                    onClick={() => setExpandedFoundationTopic(isExpanded ? null : topic.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isCompleted ? '✓' : '•'}
                      </div>
                      <span className="text-sm font-bold text-white">{topic.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {isCompleted && (
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Verified Complete
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 pt-0 border-t border-slate-800/60 space-y-4">
                      <p className="text-xs text-slate-300 leading-relaxed pt-3">{topic.desc}</p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Interactive Code Experiment</span>
                          <button 
                            onClick={() => handleFoundationRun(topic.id, topic.expectedOutput)}
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
                          >
                            <Play className="w-3 h-3" />
                            <span>Run Simulated Code</span>
                          </button>
                        </div>
                        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
                          {topic.code}
                        </pre>
                      </div>

                      {output && (
                        <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-xl">
                          <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">Execution Output:</div>
                          <pre className="font-mono text-xs text-emerald-300 whitespace-pre-wrap">{output}</pre>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-400">+25 XP towards Readiness Score</span>
                        <button
                          onClick={() => handleCompleteFoundation(topic.id)}
                          disabled={isCompleted}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            isCompleted 
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                          }`}
                        >
                          {isCompleted ? 'Completed ✓' : 'Mark Lesson Complete'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DOMAIN EXPLORER & DEEP LABS */}
      {activeTab === 'domains' && (
        <div className="space-y-6">
          {activeDeepTopicId ? (
            <div className="space-y-4">
              <button 
                onClick={() => setActiveDeepTopicId(null)}
                className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                ← Back to All Domain Labs
              </button>
              <DeepTopicPlayer 
                topic={DEEP_CURRICULUM_DATABASE['py-variables']}
                onNextTopic={() => setActiveDeepTopicId(null)}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">7 High-Impact Tech Domain Labs</h3>
                <p className="text-slate-400 text-xs">Launch any lab to experience the full 16-step execution pipeline.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Artificial Intelligence & Neural Models',
                    domain: 'AI / ML',
                    time: '15 mins',
                    desc: 'Variables, state vectors, and how matrices power large language models.',
                    topicId: 'py-variables',
                    color: 'from-purple-900/40 to-slate-900 border-purple-500/30'
                  },
                  {
                    title: 'Full Stack Web Architecture',
                    domain: 'Web Engineering',
                    time: '18 mins',
                    desc: 'DOM manipulation, HTTP state management, and modern component frameworks.',
                    topicId: 'py-variables',
                    color: 'from-blue-900/40 to-slate-900 border-blue-500/30'
                  },
                  {
                    title: 'Cybersecurity Threat Defense',
                    domain: 'Cyber Defense',
                    time: '20 mins',
                    desc: 'Symmetric vs asymmetric ciphers, packet sniffing, and zero-trust.',
                    topicId: 'py-variables',
                    color: 'from-emerald-900/40 to-slate-900 border-emerald-500/30'
                  },
                  {
                    title: 'Cloud Infrastructure & Microservices',
                    domain: 'Cloud / DevOps',
                    time: '25 mins',
                    desc: 'Containerization with Docker, API routing, and distributed state.',
                    topicId: 'py-variables',
                    color: 'from-amber-900/40 to-slate-900 border-amber-500/30'
                  },
                  {
                    title: 'Algorithmic Problem Solving',
                    domain: 'Data Structures',
                    time: '15 mins',
                    desc: 'Stack operations, recursion, and optimal Big-O spacetime complexity.',
                    topicId: 'py-variables',
                    color: 'from-cyan-900/40 to-slate-900 border-cyan-500/30'
                  },
                  {
                    title: 'Robotics & Hardware Control',
                    domain: 'IoT / Robotics',
                    time: '20 mins',
                    desc: 'Microcontroller GPIO loops, sensor signal processing, and motor PWM.',
                    topicId: 'py-variables',
                    color: 'from-rose-900/40 to-slate-900 border-rose-500/30'
                  }
                ].map(lab => (
                  <div 
                    key={lab.title}
                    className={`p-6 rounded-2xl bg-gradient-to-b ${lab.color} border flex flex-col justify-between space-y-4`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                          {lab.domain}
                        </span>
                        <span className="text-xs text-slate-400">{lab.time}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{lab.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{lab.desc}</p>
                    </div>

                    <button
                      onClick={() => setActiveDeepTopicId(lab.topicId)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Launch 16-Step Deep Lab</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: STRUCTURED LEARNING PATHS */}
      {activeTab === 'paths' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Class 11 Curriculum Pathways</h3>
            <p className="text-slate-400 text-xs">Step-by-step tracks taking you from zero coding experience to building verifiable projects.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                track: 'Python & AI Foundations Track',
                desc: 'Learn the undisputed #1 language for artificial intelligence, data manipulation, and automation.',
                chapters: ['Variables & Dynamic Types', 'Conditional Logic & Loops', 'List & Dictionary Structures', 'Modular Functions', 'File I/O & Simple APIs'],
                progress: 60
              },
              {
                track: 'Modern Web Engineering Track',
                desc: 'Build web applications that you can share with friends via a live internet URL.',
                chapters: ['HTML5 Semantic Structure', 'CSS Flexbox & Tailwind Layouts', 'JavaScript Events & DOM', 'Fetching Public APIs', 'Deploying on Vercel'],
                progress: 40
              },
              {
                track: 'Cyber Defense & Network Fundamentals Track',
                desc: 'Learn the defensive mindset: how data travels across routers and how to secure accounts.',
                chapters: ['IP Addresses & Subnets', 'DNS & Packet Inspection', 'Password Entropy & Hashes', 'Common Web Vulnerabilities', 'Hardening Personal Devices'],
                progress: 20
              }
            ].map(track => (
              <div key={track.track} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-white">{track.track}</h4>
                    <p className="text-xs text-slate-400">{track.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${track.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-300">{track.progress}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {track.chapters.map((ch, idx) => (
                    <div 
                      key={ch}
                      className={`p-3 rounded-xl border text-xs ${
                        idx === 0 
                          ? 'bg-blue-950/40 border-blue-500/40 text-blue-200' 
                          : 'bg-slate-950 border-slate-800/80 text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] text-slate-500 font-bold mb-1">0{idx + 1}</div>
                      <div className="font-semibold leading-snug">{ch}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AI MENTOR & PROOF */}
      {activeTab === 'mentor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Voice & Chat Assistant */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between h-[480px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Class 11 AI Academic Advisor</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live & Ready
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleVoiceMentorBriefing}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold hover:bg-blue-600/30 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Voice Briefing</span>
                </button>
              </div>

              {/* Chat Log */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-3.5 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Ask anything (e.g. 'Which career fits me?', 'Is Python hard?')..."
                  value={mentorInput}
                  onChange={(e) => setMentorInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMentorMessage()}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMentorMessage}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shrink-0"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Proof Passport & What to Learn Next */}
            <div className="space-y-4">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Proof Passport</h4>
                  <span className="text-xs font-bold text-amber-400">{xpPoints} XP Earned</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-300">Verified Skills ({skills.length}):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map(s => (
                      <span key={s.id} className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded text-[11px] font-medium">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                  Projects in Passport: <strong className="text-white">{projects.length} Verified</strong>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Target className="w-4 h-4" />
                  <span>WHAT TO LEARN NEXT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Based on your interest in <strong>AI & Software</strong>, proceed to <strong>Class 12 Direction Engine</strong> to evaluate B.Tech CSE degrees vs BCA and launch your GitHub profile.
                </p>
                <a
                  href="/stage/class-12"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 pt-1"
                >
                  <span>Go to Class 12 Direction</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
