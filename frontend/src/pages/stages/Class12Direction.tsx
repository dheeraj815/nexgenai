import React, { useState } from 'react';
import { 
  GitBranch, GraduationCap, Award, Compass, ArrowRight, 
  CheckCircle2, ExternalLink, BookOpen, Layers, Star, 
  Terminal, Shield, Cpu, ChevronRight, FileText
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const Class12Direction: React.FC = () => {
  const [selectedDegree, setSelectedDegree] = useState<'btech_cse' | 'btech_ai' | 'cyber' | 'bca'>('btech_cse');
  const [gitStep, setGitStep] = useState(1);

  const degreeData = {
    btech_cse: {
      name: 'B.Tech in Computer Science & Engineering',
      duration: '4 Years',
      avgPackage: '8.5 - 24.0 LPA',
      coreSubjects: ['DSA', 'Operating Systems', 'DBMS', 'Computer Networks', 'Compiler Design'],
      bestFor: 'Students wanting maximum versatility across Software Engineering, Cloud, and Systems.',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Infosys']
    },
    btech_ai: {
      name: 'B.Tech in Artificial Intelligence & Data Science',
      duration: '4 Years',
      avgPackage: '9.0 - 28.0 LPA',
      coreSubjects: ['Linear Algebra', 'Machine Learning', 'Deep Learning', 'Big Data', 'NLP'],
      bestFor: 'Students passionate about math, algorithms, generative AI, and data-driven products.',
      topRecruiters: ['NVIDIA', 'OpenAI', 'Amazon AWS', 'Fractal', 'Mu Sigma']
    },
    cyber: {
      name: 'B.Tech in Cybersecurity & Forensics',
      duration: '4 Years',
      avgPackage: '7.5 - 22.0 LPA',
      coreSubjects: ['Network Security', 'Cryptography', 'Ethical Hacking', 'SOC Operations', 'Digital Forensics'],
      bestFor: 'Analytical minds interested in defense, vulnerability research, and threat response.',
      topRecruiters: ['Palo Alto', 'CrowdStrike', 'Cisco', 'Deloitte Cyber', 'KPMG']
    },
    bca: {
      name: 'Bachelor of Computer Applications (BCA + MCA)',
      duration: '3 + 2 Years',
      avgPackage: '5.5 - 14.0 LPA',
      coreSubjects: ['Application Development', 'Web Technologies', 'Java/Python', 'Database Administration'],
      bestFor: 'Practical coders looking for fast entry into software development without engineering entrance stress.',
      topRecruiters: ['TCS', 'Wipro', 'Accenture', 'Tech Mahindra', 'Capgemini']
    }
  };

  const currentDegree = degreeData[selectedDegree];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-slate-900 border border-purple-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 02 • Class 12
              </span>
              <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs">
                Direction & Pre-College
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Degree & Career Direction Matrix
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Make informed college decisions, compare degrees with real placement statistics, and build your pre-college developer foundations in Git, Terminal, and Markdown.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="Class 12 Degree Selection"
            defaultAnalogy="Choosing a degree is like choosing an adventure vehicle: B.Tech CSE is like a reliable SUV that can drive on any road. B.Tech AI is like a tuned racecar built specifically for data racetracks. Both get you to great destinations if you build real skills!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Class 12 Audio Guide: Choosing Your Degree and Setting Up GitHub"
            scriptText="Welcome to Class 12 Direction! In this stage, you bridge the gap between high school and higher education. Compare degrees by reviewing their core curriculum and placement records, and take your first step as a real developer by creating your GitHub profile and learning Git commands."
          />
        </div>
      </div>

      {/* "What Should I Do Today?" Card */}
      <div className="p-5 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-slate-900 border border-purple-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl mt-0.5">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">What Should I Do Today?</span>
              <span className="text-[10px] text-slate-400 font-mono">15 min estimated</span>
            </div>
            <h3 className="text-base font-medium text-white mt-0.5">
              Complete the Pre-College Git & GitHub Starter Pack
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Initialize your first Git repository and create your first README.md file to earn the <strong>Version Control Initiate</strong> badge.
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            window.scrollTo({ top: 600, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <span>Open Git Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Degree Comparison Matrix */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <span>Tech Degree Comparison Matrix</span>
          </h2>
          <p className="text-xs text-slate-400">Select a stream below to inspect realistic salary outcomes, curriculum, and suitability.</p>
        </div>

        {/* Stream Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'btech_cse', label: '💻 B.Tech CSE' },
            { id: 'btech_ai', label: '🧠 B.Tech AI & Data' },
            { id: 'cyber', label: '🛡️ Cybersecurity' },
            { id: 'bca', label: '⚡ BCA / MCA' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedDegree(tab.id as any)}
              className={`p-3 rounded-xl text-xs font-semibold transition-all text-center ${
                selectedDegree === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Selected Degree Detail Card */}
        <div className="p-5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">{currentDegree.name}</h3>
              <span className="text-xs text-purple-400">Duration: {currentDegree.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Average Starting CTC:</span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-emerald-500/30">
                {currentDegree.avgPackage}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Core Subjects You Will Learn:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentDegree.coreSubjects.map((sub, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-md">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Top Campus Recruiters:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentDegree.topRecruiters.map((comp, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs rounded-md">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-lg text-xs text-slate-300 border border-slate-800">
            <strong>Ideal Persona:</strong> {currentDegree.bestFor}
          </div>
        </div>
      </div>

      {/* Pre-College Git & Terminal Starter Pack */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>Pre-College Developer Starter Pack</span>
          </h2>
          <p className="text-xs text-slate-400">Master Git version control before day 1 of college to stand in the top 5% of your incoming batch.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: 1,
              title: '1. Create GitHub Account',
              desc: 'Set up your developer identity on github.com. This acts as your public engineering resume.'
            },
            {
              step: 2,
              title: '2. Master 5 Git Commands',
              desc: 'Learn git init, git add, git commit, git push, and git status to track code versions safely.'
            },
            {
              step: 3,
              title: '3. Write a Clean README.md',
              desc: 'Learn Markdown syntax (headers, links, bullet points, badges) to document your projects.'
            }
          ].map(item => (
            <div key={item.step} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400">{item.title}</span>
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-mono">
                  {item.step}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Git Terminal Simulation */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400">bash-terminal: ~/pre-college-starter</span>
            <span className="text-emerald-400 font-mono">git version 2.44.0</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-indigo-200 space-y-1">
            <p className="text-slate-400"># 1. Initialize your first repository</p>
            <p className="text-emerald-400">$ git init</p>
            <p className="text-slate-400"># 2. Stage your files</p>
            <p className="text-emerald-400">$ git add README.md</p>
            <p className="text-slate-400"># 3. Save your changes with a clear message</p>
            <p className="text-emerald-400">$ git commit -m "feat: initial commit of Class 12 roadmap"</p>
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
            <span className="text-xs font-mono text-purple-400">Step 1 (Immediate)</span>
            <h4 className="text-sm font-medium text-white">College Year 1 Foundation</h4>
            <p className="text-xs text-slate-400">Master C++/Java/Python, basic algorithms, and terminal navigation.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 2 (Upcoming)</span>
            <h4 className="text-sm font-medium text-white">Year 2 Specialization</h4>
            <p className="text-xs text-slate-400">Pick AI/ML, Cloud, or Cybersecurity and solve 50+ DSA problems.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 3 (Goal)</span>
            <h4 className="text-sm font-medium text-white">High-Stipend Internship</h4>
            <p className="text-xs text-slate-400">Land a paid tech internship before your 3rd year begins.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
