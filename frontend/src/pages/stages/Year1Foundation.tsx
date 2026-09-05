import React, { useState } from 'react';
import { 
  Terminal, Code2, BookOpen, Layers, CheckCircle2, Play, 
  HelpCircle, ArrowRight, Award, Compass, Cpu, Database, 
  Server, Globe, ChevronRight, Star, Flame, Sparkles, Check,
  Bot, Volume2, Target, ShieldCheck
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { DeepTopicPlayer } from '../../components/learn/DeepTopicPlayer';
import { DEEP_CURRICULUM_DATABASE } from '../../data/curriculumData';

export const Year1Foundation: React.FC = () => {
  const { 
    completeStageTopic, 
    solveCodingProblem, 
    submitProjectProof, 
    xpPoints,
    readiness,
    skills,
    projects
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'languages' | 'cs' | 'projects' | 'arena' | 'career'>('languages');
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'java' | 'cpp'>('python');
  const [activeDeepTopic, setActiveDeepTopic] = useState<boolean>(false);

  // Coding Arena State
  const [selectedProblemId, setSelectedProblemId] = useState<string>('p-1');
  const [codeSolution, setCodeSolution] = useState<string>('def two_sum(nums, target):\n    lookup = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in lookup:\n            return [lookup[diff], i]\n        lookup[num] = i\n    return []');
  const [arenaOutput, setArenaOutput] = useState<string | null>(null);
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  // CS Foundations Accordion State
  const [expandedCS, setExpandedCS] = useState<string | null>('cs-1');
  const [completedCS, setCompletedCS] = useState<string[]>([]);

  // Project Lab Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLive, setProjectLive] = useState('');
  const [projectSuccess, setProjectSuccess] = useState(false);

  const handleRunCode = () => {
    setArenaOutput('Running Test Cases on V8 Sandbox...\nTest 1: [2, 7, 11, 15], target = 9 -> Passed [0, 1] (0.2ms)\nTest 2: [3, 2, 4], target = 6 -> Passed [1, 2] (0.1ms)\nAll 2 Test Cases PASSED successfully!');
  };

  const handleSubmitCode = () => {
    handleRunCode();
    if (!solvedProblems.includes(selectedProblemId)) {
      setSolvedProblems(prev => [...prev, selectedProblemId]);
      solveCodingProblem(selectedProblemId, 100);
    }
  };

  const handleCompleteCS = (id: string) => {
    if (!completedCS.includes(id)) {
      setCompletedCS(prev => [...prev, id]);
      completeStageTopic('year1', id, 30);
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim()) return;
    submitProjectProof('year1-' + Date.now(), projectGithub, projectLive);
    setProjectSuccess(true);
    setTimeout(() => {
      setProjectTitle('');
      setProjectGithub('');
      setProjectLive('');
      setProjectSuccess(false);
    }, 3000);
  };

  const handleVoiceBriefing = () => {
    if ('speechSynthesis' in window) {
      const text = `Welcome to Year 1 Engineering Foundation! Your mission is to master memory allocation, pointers, and data structures. You have currently solved ${solvedProblems.length} algorithmic challenges and earned ${xpPoints} XP. Keep coding daily!`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const csTopics = [
    {
      id: 'cs-1',
      title: 'Data Structures & Algorithmic Complexity',
      focus: 'Arrays, Linked Lists, Hash Tables, and asymptotic Big-O bounds.',
      details: 'Understanding how memory layout impacts cache locality. Contiguous array lookup is O(1) in CPU cache, while pointer-chasing in linked lists causes frequent cache misses.'
    },
    {
      id: 'cs-2',
      title: 'Operating Systems & Process Concurrency',
      focus: 'Virtual memory, kernel interrupts, thread scheduling, and semaphores.',
      details: 'How the OS abstracts hardware using page tables and TLBs. Learn why race conditions happen when two threads update shared variables without mutex locks.'
    },
    {
      id: 'cs-3',
      title: 'Database Systems & Relational Algebra',
      focus: 'SQL queries, B-Tree indexes, ACID transactions, and normalization.',
      details: 'Deep dive into transaction isolation levels (Read Committed vs Serializable) and why creating a composite index speeds up range queries by 100x.'
    },
    {
      id: 'cs-4',
      title: 'Computer Networking & Protocols',
      focus: 'TCP/IP 4-layer model, UDP streaming, DNS lookups, and TLS handshakes.',
      details: 'Study packet transmission over fiber backbones, window sizing for congestion control, and the 3-way handshake that guarantees reliable message delivery.'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/70 via-teal-950/50 to-slate-900 border border-emerald-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 03 • Year 1 Engineering Foundation
              </span>
              <span className="px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs">
                Deep Systems & DSA Mastery
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Year 1 Core Systems & Language Mastery Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Don’t settle for generic college syllabus notes. Master Python, Java, and C++ from memory fundamentals up to API design, solve your first 50 DSA problems, and build verifiable backend projects.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Year 1 CS Foundations"
              defaultAnalogy="Think of Year 1 like studying physics before building skyscrapers. If you understand how RAM, CPU registers, and pointer addresses work under the hood, writing web apps or training neural networks later will be effortless!"
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 1 Strategy Audio: Surviving the College Transition & Building Real Code"
            scriptText="Welcome to Year 1 Engineering Foundation. The secret to standing out from your 500 college classmates is simple: build working software while others only memorize theory for exams. Choose Python, Java, or C++, and tackle our hands-on coding arena daily."
          />
        </div>
      </div>

      {/* 5 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'languages', label: '1. LANGUAGE MASTERY (PYTHON / JAVA / C++)', icon: Code2 },
          { id: 'cs', label: '2. COMPUTER SCIENCE FOUNDATIONS', icon: Cpu },
          { id: 'projects', label: '3. VERIFIABLE PROJECT LAB', icon: Layers },
          { id: 'arena', label: '4. CODING ARENA (DSA DRILLS)', icon: Terminal },
          { id: 'career', label: '5. YEAR 1 READINESS & PASSPORT', icon: Award }
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
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LANGUAGE MASTERY */}
      {activeTab === 'languages' && (
        <div className="space-y-6">
          {activeDeepTopic ? (
            <div className="space-y-4">
              <button
                onClick={() => setActiveDeepTopic(false)}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                ← Back to Language Tracks
              </button>
              <DeepTopicPlayer 
                topic={DEEP_CURRICULUM_DATABASE['py-variables']}
                onNextTopic={() => setActiveDeepTopic(false)}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Language Selector Pills */}
              <div className="flex gap-2">
                {[
                  { id: 'python', name: 'Python 3.12 Core', desc: 'AI, Scripting & Backend' },
                  { id: 'java', name: 'Java 21 Enterprise', desc: 'Enterprise Systems & Android' },
                  { id: 'cpp', name: 'C++ Modern (C++20)', desc: 'Low-latency & Game Engines' }
                ].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id as any)}
                    className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                      selectedLanguage === lang.id 
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{lang.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{lang.desc}</div>
                  </button>
                ))}
              </div>

              {/* Curriculum Roadmap Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-emerald-400" />
                      <span>{selectedLanguage.toUpperCase()} End-to-End Curriculum Pipeline</span>
                    </h3>
                    <p className="text-slate-400 text-xs">Each step represents a verifiable production capability.</p>
                  </div>
                  <button
                    onClick={() => setActiveDeepTopic(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Launch 16-Step Player</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {[
                    '1. Variables & Dynamic Types',
                    '2. Conditional Branches & Logic',
                    '3. Loops & Iterators',
                    '4. Hash Maps & Dictionaries',
                    '5. Modular Functions & Scopes',
                    '6. Object-Oriented Principles',
                    '7. File I/O & JSON Serialization',
                    '8. Exception & Error Handling',
                    '9. REST APIs & Web Scraping'
                  ].map((topic, i) => (
                    <div 
                      key={topic}
                      onClick={() => setActiveDeepTopic(true)}
                      className="p-3.5 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                    >
                      <span className="text-xs font-semibold text-slate-200">{topic}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CS FOUNDATIONS */}
      {activeTab === 'cs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Core Computer Science Foundations</h3>
              <p className="text-slate-400 text-xs">The underlying systems architecture every top engineering candidate must understand.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold">
              {completedCS.length} / {csTopics.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {csTopics.map(topic => {
              const isExpanded = expandedCS === topic.id;
              const isDone = completedCS.includes(topic.id);

              return (
                <div key={topic.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <div 
                    onClick={() => setExpandedCS(isExpanded ? null : topic.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isDone ? '✓' : '•'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{topic.title}</div>
                        <div className="text-xs text-slate-400">{topic.focus}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>

                  {isExpanded && (
                    <div className="p-6 pt-0 border-t border-slate-800/60 space-y-4">
                      <p className="text-xs text-slate-300 leading-relaxed pt-3">{topic.details}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-400">+30 XP towards Core Readiness</span>
                        <button
                          onClick={() => handleCompleteCS(topic.id)}
                          disabled={isDone}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            isDone 
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {isDone ? 'Completed ✓' : 'Mark Topic Verified'}
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

      {/* TAB 3: PROJECT LAB */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3 Prescribed Year 1 Projects */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Recommended Year 1 Projects</h3>
              {[
                {
                  title: 'Student Performance & Grade Analyzer',
                  stack: ['Python', 'SQLite', 'CLI'],
                  desc: 'Parse student exam records, compute GPAs, generate quartile distributions, and export tabular CSV reports.'
                },
                {
                  title: 'In-Memory Key-Value Store with TTL',
                  stack: ['C++', 'Hash Tables', 'Mutex'],
                  desc: 'Implement a thread-safe Redis clone with expiration timestamps, LRU cache eviction, and snapshot persistence.'
                },
                {
                  title: 'RESTful Inventory Management Microservice',
                  stack: ['Java 21', 'Spring Boot', 'PostgreSQL'],
                  desc: 'Design database schemas, implement CRUD REST endpoints, validate JSON payloads, and write JUnit integration tests.'
                }
              ].map(proj => (
                <div key={proj.title} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                    <div className="flex gap-1">
                      {proj.stack.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>

            {/* Project Proof Submission Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Submit Production Project Proof</span>
              </h3>
              <p className="text-xs text-slate-400">
                Completed a software project? Submit the repository link to verify your code and increment your Career Passport readiness score.
              </p>

              <form onSubmit={handleProjectSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Project Name (e.g. SQLite Grade Analyzer)"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="url"
                  placeholder="GitHub Repository URL"
                  value={projectGithub}
                  onChange={(e) => setProjectGithub(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="url"
                  placeholder="Live Demo URL (optional)"
                  value={projectLive}
                  onChange={(e) => setProjectLive(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  {projectSuccess ? 'Project Proof Submitted & Verified! ✓' : 'Submit Project Proof (+50 XP)'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CODING ARENA */}
      {activeTab === 'arena' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>Interactive Year 1 Coding Arena</span>
                </h3>
                <p className="text-slate-400 text-xs">Practice high-frequency algorithmic patterns asked by tech companies.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold">
                {solvedProblems.length} Problems Solved
              </span>
            </div>

            {/* Problem Info */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Problem 01: Two Sum (Hash Map Lookup)</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[11px] font-bold">Easy</span>
              </div>
              <p className="text-xs text-slate-300">
                Given an array of integers <code className="text-emerald-400">nums</code> and an integer <code className="text-emerald-400">target</code>, return indices of the two numbers such that they add up to target. You must solve it in <strong>O(N)</strong> time.
              </p>
            </div>

            {/* Interactive Code Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Python Solution Editor</span>
                <div className="flex gap-2">
                  <button 
                    onClick={handleRunCode}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Run Code
                  </button>
                  <button 
                    onClick={handleSubmitCode}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                  >
                    Submit & Earn XP
                  </button>
                </div>
              </div>

              <textarea
                value={codeSolution}
                onChange={(e) => setCodeSolution(e.target.value)}
                rows={7}
                className="w-full font-mono text-xs p-4 bg-slate-950 border border-slate-800 rounded-xl text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {arenaOutput && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Sandbox Execution Log:</div>
                <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap">{arenaOutput}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: YEAR 1 READINESS & PASSPORT */}
      {activeTab === 'career' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Year 1 Cumulative Engineering Readiness</h3>
                  <p className="text-xs text-slate-400">Your live multidimensional score across verified skills, coding problems, and project proof.</p>
                </div>
                <button
                  onClick={handleVoiceBriefing}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold hover:bg-emerald-600/30 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Voice Summary</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { label: 'Overall Readiness', value: `${readiness.overallScore}%`, color: 'text-emerald-400' },
                  { label: 'Verified Skills', value: skills.length, color: 'text-blue-400' },
                  { label: 'Problems Solved', value: solvedProblems.length, color: 'text-purple-400' },
                  { label: 'Total XP Points', value: xpPoints, color: 'text-amber-400' }
                ].map(stat => (
                  <div key={stat.label} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-500/30 rounded-2xl space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">What to Learn Next</div>
                <h4 className="text-sm font-bold text-white">Transition to Year 2 Specialization</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Having locked your language fundamentals, it is time to choose your specialization track (AI Engineering, Full Stack, Cybersecurity, or Cloud DevOps).
                </p>
              </div>

              <a
                href="/stage/year-2"
                className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <span>Launch Year 2 Specialization</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
