import React, { useState } from 'react';
import { 
  GitBranch, GraduationCap, Award, Compass, ArrowRight, 
  CheckCircle2, ExternalLink, BookOpen, Layers, Star, 
  Terminal, Shield, Cpu, ChevronRight, FileText, Check, Trophy,
  Github, Globe, Calendar, Bot, Volume2, Target, Lightbulb,
  Building, Sparkles, AlertCircle
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';

export const Class12Direction: React.FC = () => {
  const { 
    completeStageTopic, 
    verifySkillProof, 
    submitProjectProof, 
    xpPoints,
    skills,
    projects
  } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'degree' | 'git' | 'portfolio' | 'industry' | 'direction'>('degree');
  const [selectedDegree, setSelectedDegree] = useState<'btech_cse' | 'btech_ai' | 'cyber' | 'bca'>('btech_cse');
  const [compareDegree, setCompareDegree] = useState<'btech_ai' | 'cyber' | 'bca' | null>('btech_ai');

  // Git Terminal Simulator State
  const [gitStep, setGitStep] = useState(1);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Initialized virtual terminal session.',
    'Type "git init" to initialize your first Git repository.'
  ]);

  // Portfolio Launch Checklist State (Starts completely clean)
  const [portfolioChecklist, setPortfolioChecklist] = useState<Record<string, boolean>>({
    github_account: false,
    first_readme: false,
    first_repo: false,
    linkedin_profile: false,
    portfolio_website: false
  });

  // Project Submission Form
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const degreeData = {
    btech_cse: {
      name: 'B.Tech in Computer Science & Engineering',
      duration: '4 Years',
      avgPackage: '₹8.5 - 26.0 LPA',
      coreSubjects: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Compiler Design'],
      bestFor: 'Students seeking the highest versatility across Software Engineering, Cloud Architecture, and Distributed Systems.',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Flipkart'],
      pros: 'Widest eligibility across all campus drives; highest placement volume.',
      cons: 'Competitive peer group; heavy theoretical core curriculum in early semesters.'
    },
    btech_ai: {
      name: 'B.Tech in Artificial Intelligence & Data Science',
      duration: '4 Years',
      avgPackage: '₹9.0 - 28.0 LPA',
      coreSubjects: ['Linear Algebra & Probability', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'LLM Architectures'],
      bestFor: 'Students passionate about applied mathematics, algorithmic predictions, and generative AI platforms.',
      topRecruiters: ['NVIDIA', 'OpenAI ecosystem', 'Amazon AWS', 'Fractal Analytics', 'Microsoft AI'],
      pros: 'Direct specialization into the highest-growth tech domain of the decade.',
      cons: 'Requires strong mathematical comfort; less focus on low-level OS internals.'
    },
    cyber: {
      name: 'B.Tech in Cybersecurity & Forensics',
      duration: '4 Years',
      avgPackage: '₹8.0 - 24.0 LPA',
      coreSubjects: ['Cryptography', 'Network Security', 'SOC Operations', 'Penetration Testing', 'Incident Response'],
      bestFor: 'Curious investigators who love threat analysis, ethical hacking, and defending enterprise infrastructure.',
      topRecruiters: ['CrowdStrike', 'Palo Alto Networks', 'Cisco', 'Deloitte Cyber', 'Mandiant'],
      pros: 'Huge talent shortage globally; mission-critical enterprise demand.',
      cons: 'Certifications (CompTIA, CEH) often required alongside degree.'
    },
    bca: {
      name: 'Bachelor of Computer Applications (BCA + MCA)',
      duration: '3 + 2 Years',
      avgPackage: '₹5.5 - 16.0 LPA',
      coreSubjects: ['Web Technologies', 'Java & Python', 'Database Administration', 'Software Testing', 'Enterprise Apps'],
      bestFor: 'Hands-on practical builders seeking immediate software development capability without entrance exam stress.',
      topRecruiters: ['TCS Digital', 'Wipro Turbo', 'Accenture', 'Cognizant', 'Zoho'],
      pros: 'Faster timeline; heavy focus on practical coding rather than physics and chemistry.',
      cons: 'Tier-1 product companies sometimes prioritize 4-year B.Tech graduates.'
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    setTerminalInput('');
    if (!cmd) return;

    setTerminalLogs(prev => [...prev, `$ ${cmd}`]);

    if (cmd === 'git init' && gitStep === 1) {
      setTerminalLogs(prev => [...prev, 'Initialized empty Git repository in /workspace/my-first-repo/.git/']);
      setGitStep(2);
      completeStageTopic('class12', 'git-init', 20);
    } else if (cmd === 'git add .' && gitStep === 2) {
      setTerminalLogs(prev => [...prev, 'Staged changes in working directory for commit.']);
      setGitStep(3);
    } else if (cmd.startsWith('git commit') && gitStep === 3) {
      setTerminalLogs(prev => [...prev, '[main (root-commit) 7a3c9e1] feat: launch my first developer project', ' 1 file changed, 24 insertions(+)']);
      setGitStep(4);
      verifySkillProof('Git Version Control', 'Tools', 'Foundational');
    } else {
      setTerminalLogs(prev => [...prev, `Command executed: ${cmd}. (Hint: Follow the step guide above)`]);
    }
  };

  const handleToggleChecklist = (key: string) => {
    setPortfolioChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim()) return;
    submitProjectProof('proj-class12-' + Date.now(), projectGithub, 'https://demo.nexgenai.edu');
    setIsSubmitted(true);
    setTimeout(() => {
      setProjectTitle('');
      setProjectDesc('');
      setProjectGithub('');
      setIsSubmitted(false);
    }, 3000);
  };

  const handleVoiceRoadmap = () => {
    if ('speechSynthesis' in window) {
      const text = `Class 12 Pre-College Roadmap: During your final school year, dedicate 3 hours per week to building your GitHub portfolio. If you choose B.Tech Computer Science, your goal is to master Git and write your first 50 lines of Python before day one of college.`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentDegree = degreeData[selectedDegree];
  const compared = compareDegree ? degreeData[compareDegree] : null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/70 via-indigo-950/50 to-slate-900 border border-purple-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 02 • Class 12 Direction Engine
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Pre-College Engineering Blueprint
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Degree Matrix & Pre-College Launch Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Eliminate college admission confusion. Compare degrees side-by-side with real recruiter packages, master developer tools like Git & GitHub before freshman year, and launch your first project portfolio.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="College & Degree Strategy"
              defaultAnalogy="Choosing your degree is like choosing an engine for a rocket: B.Tech CSE is the high-thrust engine accepted everywhere. Specialized degrees like AI or Cyber give you an early edge if you are 100% certain of your passion. The key is to start coding now so you are in the top 5% on Day 1."
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Class 12 Strategy Audio: How to Enter College Ahead of 95% of Your Batch"
            scriptText="Welcome to Class 12 Direction. In this stage, you compare degrees objectively, learn Git version control, and set up your GitHub profile so that when college begins, you are already building projects while others are learning how to install code editors."
          />
        </div>
      </div>

      {/* 5 Master Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'degree', label: '1. DEGREE MATRIX & COMPARISON', icon: GraduationCap },
          { id: 'git', label: '2. GIT & TERMINAL SIMULATOR', icon: Terminal },
          { id: 'portfolio', label: '3. PORTFOLIO LAUNCHPAD', icon: Github },
          { id: 'industry', label: '4. INDUSTRY OPPORTUNITIES', icon: Building },
          { id: 'direction', label: '5. AI 12-MONTH ROADMAP', icon: Compass }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DEGREE MATRIX & COMPARISON */}
      {activeTab === 'degree' && (
        <div className="space-y-6">
          {/* Degree Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'btech_cse', name: 'B.Tech CSE', badge: 'Most Popular' },
              { id: 'btech_ai', name: 'B.Tech AI / Data', badge: 'High Growth' },
              { id: 'cyber', name: 'B.Tech Cyber', badge: 'High Defense Demand' },
              { id: 'bca', name: 'BCA + MCA', badge: 'Fast Track' }
            ].map(deg => (
              <button
                key={deg.id}
                onClick={() => setSelectedDegree(deg.id as any)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedDegree === deg.id 
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-md' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[10px] text-purple-400 font-bold uppercase mb-1">{deg.badge}</div>
                <div className="text-sm font-bold text-white">{deg.name}</div>
              </button>
            ))}
          </div>

          {/* Detailed Degree Profile */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-extrabold text-white">{currentDegree.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{currentDegree.bestFor}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-black text-emerald-400">{currentDegree.avgPackage}</div>
                <div className="text-[10px] text-slate-400 uppercase">Average Freshers CTC Range</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Core Subjects You Will Study:</div>
                <div className="flex flex-wrap gap-2">
                  {currentDegree.coreSubjects.map(sub => (
                    <span key={sub} className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg text-xs">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Primary Recruiter Brands:</div>
                <div className="flex flex-wrap gap-2">
                  {currentDegree.topRecruiters.map(rec => (
                    <span key={rec} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-lg text-xs font-medium">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1">
                <div className="text-xs font-bold text-emerald-400">Advantages & Pros:</div>
                <p className="text-xs text-slate-300">{currentDegree.pros}</p>
              </div>
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-bold text-amber-400">Important Considerations:</div>
                <p className="text-xs text-slate-300">{currentDegree.cons}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GIT & TERMINAL SIMULATOR */}
      {activeTab === 'git' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <span>Interactive Git & Developer Terminal Simulator</span>
                </h3>
                <p className="text-slate-400 text-xs">Every tech company runs on Git. Complete the 3 steps below to verify your Git badge.</p>
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-bold">
                Step {gitStep} of 4
              </span>
            </div>

            {/* Instruction Prompts */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-1">
              <div className="text-xs font-bold text-purple-300">
                {gitStep === 1 && 'Task 1: Type "git init" and press Enter to start version control.'}
                {gitStep === 2 && 'Task 2: Type "git add ." to stage your code changes.'}
                {gitStep === 3 && 'Task 3: Type "git commit -m "feat: launch project"" to create a permanent snapshot.'}
                {gitStep === 4 && 'Awesome work! You have successfully mastered basic Git version control.'}
              </div>
            </div>

            {/* Terminal Window */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
              <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] text-slate-400 ml-2">bash ~ /workspace/nexgen-starter</span>
              </div>

              <div className="p-4 space-y-1 text-slate-300 h-48 overflow-y-auto">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={log.startsWith('$') ? 'text-purple-400 font-bold' : 'text-slate-400'}>
                    {log}
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="border-t border-slate-800 p-2 flex items-center gap-2 bg-slate-900/60">
                <span className="text-purple-400 pl-2">$</span>
                <input
                  type="text"
                  placeholder="Type git command here..."
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent text-white focus:outline-none text-xs"
                />
                <button type="submit" className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-bold">
                  Execute
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PORTFOLIO LAUNCHPAD */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Github className="w-4 h-4 text-purple-400" />
                <span>Pre-College Developer Setup Checklist</span>
              </h3>
              <div className="space-y-2.5">
                {[
                  { key: 'github_account', label: 'Create GitHub Account & Profile README' },
                  { key: 'first_readme', label: 'Write Markdown Bio detailing interests' },
                  { key: 'first_repo', label: 'Push your first repository with code' },
                  { key: 'linkedin_profile', label: 'Build LinkedIn profile highlighting aspiring engineer' },
                  { key: 'portfolio_website', label: 'Deploy a simple personal bio site on Vercel' }
                ].map(item => {
                  const isChecked = portfolioChecklist[item.key];
                  return (
                    <div 
                      key={item.key}
                      onClick={() => handleToggleChecklist(item.key)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-purple-950/20 border-purple-500/40 text-purple-200' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-semibold">{item.label}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Submission Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Submit Your First Milestone Project</span>
              </h3>
              <p className="text-xs text-slate-400">
                Have you built a small calculator, website, or CLI tool? Submit it to permanently add proof to your Career Passport.
              </p>

              <form onSubmit={handleSubmitProject} className="space-y-3">
                <input
                  type="text"
                  placeholder="Project Title (e.g. Student GPA Calculator)"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <textarea
                  placeholder="Short Description of what it does..."
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="url"
                  placeholder="GitHub Repository URL (optional)"
                  value={projectGithub}
                  onChange={(e) => setProjectGithub(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  {isSubmitted ? 'Project Verified & Added to Passport! ✓' : 'Submit Project Proof (+50 XP)'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INDUSTRY OPPORTUNITIES */}
      {activeTab === 'industry' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Entry-Level Industry Realities for School Grads</h3>
            <p className="text-slate-400 text-xs">What top tech firms look for in early candidates and high school hackathon winners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'High School Hackathons',
                desc: 'Compete in Smart India Hackathon Junior or Google Code-in platforms to win cash prizes and direct college admission weightage.',
                icon: Trophy,
                color: 'text-amber-400'
              },
              {
                title: 'Open Source Micro-Contributions',
                desc: 'Fix typos in documentation, add unit test suites to open source tools, and get your name listed on global contributor boards.',
                icon: Github,
                color: 'text-purple-400'
              },
              {
                title: 'Pre-College Tech Fellowships',
                desc: 'Programs like MLH Fellowship and GirlScript Summer of Code offer stipends to passionate high-school and freshman coders.',
                icon: Award,
                color: 'text-emerald-400'
              }
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: AI 12-MONTH ROADMAP */}
      {activeTab === 'direction' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-purple-400" />
                  <span>Personalized 12-Month Pre-College Blueprint</span>
                </h3>
                <p className="text-slate-400 text-xs">Follow this monthly timeline to enter your college as a standout coder.</p>
              </div>

              <button
                onClick={handleVoiceRoadmap}
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold hover:bg-purple-600/30 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen to Roadmap Audio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { phase: 'Months 1-3', title: 'Language Foundations', focus: 'Master Python or C++ syntax and write 20 small algorithmic scripts.' },
                { phase: 'Months 4-6', title: 'Developer Tooling', focus: 'Master Git branches, terminal navigation, and deploy 1 project to Vercel.' },
                { phase: 'Months 7-9', title: 'Entrance & Portfolio', focus: 'Balance school exams while keeping GitHub commit streak alive on weekends.' },
                { phase: 'Months 10-12', title: 'College Day 1 Advantage', focus: 'Solve first 50 LeetCode Easy problems before campus orientation begins.' }
              ].map(p => (
                <div key={p.phase} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                    {p.phase}
                  </span>
                  <h4 className="text-xs font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.focus}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready for Engineering First Year?</span>
              <a
                href="/stage/year-1"
                className="flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
              >
                <span>Launch Year 1 Foundation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
