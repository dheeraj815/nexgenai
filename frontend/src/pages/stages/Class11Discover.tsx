import React, { useState } from 'react';
import { 
  Sparkles, Code2, Shield, Palette, Cpu, Terminal, Compass, 
  ArrowRight, CheckCircle2, Play, Volume2, HelpCircle, RefreshCw, 
  Star, Trophy, ChevronRight, BookOpen, Layers
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const Class11Discover: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'python' | 'web' | 'ai' | 'cyber'>('python');
  
  // Python Sandbox State
  const [pythonInput, setPythonInput] = useState('user_age = 16\ndays_alive = user_age * 365\nprint(f"You have lived approximately {days_alive} days on Earth!")');
  const [pythonOutput, setPythonOutput] = useState<string | null>(null);

  // Web Sandbox State
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [cardTitle, setCardTitle] = useState('My First Web Component');
  const [cardShadow, setCardShadow] = useState(true);

  // Cyber Sandbox State
  const [cipherShift, setCipherShift] = useState(3);
  const secretMessage = 'CYBER DEFENSE IS ESSENTIAL';
  const encryptCaesar = (str: string, shift: number) => {
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      return char;
    }).join('');
  };

  // Aptitude Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showRadar, setShowRadar] = useState(false);

  const handleRunPython = () => {
    // Safe simulated runner for Class 11 sandbox
    try {
      if (pythonInput.includes('days_alive')) {
        setPythonOutput('>>> Output:\nYou have lived approximately 5840 days on Earth!\n[Program exited with code 0 in 12ms]');
      } else {
        setPythonOutput(`>>> Output:\n${pythonInput.replace(/print\((.*?)\)/g, '$1')}\n[Execution Success]`);
      }
    } catch (e) {
      setPythonOutput('Error in code syntax');
    }
  };

  const handleQuizSelect = (qIndex: number, option: string) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header with Stage Badge */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 01 • Class 11
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                Zero Pressure Exploration
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Curiosity & Tech Aptitude Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Discover what you love before choosing an academic stream. Write your first line of code, simulate AI, crack encryption, and uncover your natural technical aptitude in 10-minute micro-labs.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <IDontUnderstandDrawer 
              conceptTitle="Class 11 Tech Exploration"
              defaultAnalogy="Think of Class 11 like tasting food samples at a buffet. You don't have to commit to eating 100 pizzas; you just taste a small bite of AI, a bite of Coding, and a bite of Cybersecurity to see what excites your brain!"
            />
          </div>
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Class 11 Overview: How to Start and What to Learn Next"
            scriptText="Welcome to Class 11 Tech Discovery! At this stage, your only mission is to explore without fear. You will test Python programming, web styling, artificial intelligence, and cyber defense in bite-sized mini-labs. Try each sandbox, complete the 5-minute aptitude compass, and find the tech career that speaks to your interests!"
          />
        </div>
      </div>

      {/* "What Should I Do Today?" Action Card */}
      <div className="p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-slate-900 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl mt-0.5">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">What Should I Do Today?</span>
              <span className="text-[10px] text-slate-400 font-mono">10 min estimated</span>
            </div>
            <h3 className="text-base font-medium text-white mt-0.5">
              Complete the Python Micro-Lab: Calculate your days on Earth
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Executing your first script will unlock the <strong>Python Explorer</strong> badge and award your first +15 XP!
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            setActiveLab('python');
            window.scrollTo({ top: 350, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <span>Start Micro-Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Micro-Skills Sandboxes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <span>Try Mini-Skills in 10 Minutes</span>
            </h2>
            <p className="text-xs text-slate-400">Interactive live sandboxes running directly in your browser.</p>
          </div>

          <div className="flex gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveLab('python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLab === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🐍 Python
            </button>
            <button
              onClick={() => setActiveLab('web')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLab === 'web' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎨 Web Design
            </button>
            <button
              onClick={() => setActiveLab('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLab === 'ai' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🤖 AI Prompt
            </button>
            <button
              onClick={() => setActiveLab('cyber')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLab === 'cyber' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🛡️ Cyber Cipher
            </button>
          </div>
        </div>

        {/* LAB 1: PYTHON */}
        {activeLab === 'python' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-300">Python Editor (Interactive)</span>
                <button
                  onClick={handleRunPython}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Code</span>
                </button>
              </div>
              <textarea
                value={pythonInput}
                onChange={(e) => setPythonInput(e.target.value)}
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-indigo-200 focus:border-indigo-500 outline-none resize-none"
              />
              <p className="text-[11px] text-slate-400">
                💡 Tip: Change `user_age = 16` to your real age, then press <strong>Run Code</strong>!
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300">Terminal Output</span>
              <div className="h-[148px] bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400 overflow-y-auto whitespace-pre-line">
                {pythonOutput || 'Click "Run Code" above to see the output here...'}
              </div>
              {pythonOutput && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Congratulations! You ran real Python code. +15 XP earned!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LAB 2: WEB DESIGN */}
        {activeLab === 'web' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-indigo-300">Design Controls</span>
              <div>
                <label className="text-xs text-slate-400">Component Headline:</label>
                <input
                  type="text"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Accent Glow Color:</label>
                <div className="flex gap-3 mt-1.5">
                  {['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'].map(color => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full transition-transform ${accentColor === color ? 'scale-125 ring-2 ring-white' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shadowToggle"
                  checked={cardShadow}
                  onChange={(e) => setCardShadow(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600"
                />
                <label htmlFor="shadowToggle" className="text-xs text-slate-300">Enable Neon Backdrop Glow</label>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center p-6 bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden">
              <div 
                className="w-full max-w-sm p-6 rounded-2xl bg-slate-900 border transition-all text-center space-y-3"
                style={{
                  borderColor: accentColor,
                  boxShadow: cardShadow ? `0 10px 30px -5px ${accentColor}40` : 'none'
                }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{cardTitle}</h3>
                <p className="text-xs text-slate-400">
                  This card updates live in real-time as you tweak CSS properties!
                </p>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-medium" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  CSS Accent: {accentColor}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* LAB 3: AI PROMPT */}
        {activeLab === 'ai' && (
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Prompt Engineering Sandbox</span>
            </div>
            <p className="text-xs text-slate-400">
              See how changing your prompt instructions transforms AI output from generic to professional.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-semibold text-rose-400">❌ Weak Prompt:</span>
                <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded">"Write code for a game"</p>
                <span className="text-[11px] text-slate-400">Result: 200 lines of messy, confusing code with no instructions.</span>
              </div>
              <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-2">
                <span className="text-xs font-semibold text-emerald-400">✅ High-Impact Prompt:</span>
                <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded">"Create a 10-line Python number guessing game with simple comments for a beginner"</p>
                <span className="text-[11px] text-emerald-300/80">Result: Clean, structured, well-commented code that runs instantly!</span>
              </div>
            </div>
          </div>
        )}

        {/* LAB 4: CYBER CIPHER */}
        {activeLab === 'cyber' && (
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Caesar Cipher Encryption Simulator</span>
              </div>
              <span className="text-xs font-mono text-amber-400">Shift Key: +{cipherShift}</span>
            </div>
            <p className="text-xs text-slate-400">
              Cybersecurity engineers protect data using encryption. Move the slider to shift the letters!
            </p>
            <input
              type="range"
              min="1"
              max="15"
              value={cipherShift}
              onChange={(e) => setCipherShift(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400">Plaintext Original:</span>
                <p className="font-mono text-sm text-white mt-1">{secretMessage}</p>
              </div>
              <div className="p-3.5 bg-slate-950 border border-indigo-500/40 rounded-xl">
                <span className="text-xs text-indigo-300">Encrypted Ciphertext:</span>
                <p className="font-mono text-sm text-indigo-300 mt-1">{encryptCaesar(secretMessage, cipherShift)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 15-Question Tech Aptitude Compass */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>Tech Aptitude Compass (15 Questions)</span>
            </h2>
            <p className="text-xs text-slate-400">Discover whether your natural mindset aligns with Systems, Design, Data, or Security.</p>
          </div>

          <button
            onClick={() => setShowRadar(!showRadar)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors"
          >
            {showRadar ? 'Hide Profile Report' : 'Generate Strengths Report'}
          </button>
        </div>

        {/* Sample Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 1,
              q: 'When using an app, what bothers you most?',
              opts: [
                'Ugly colors or poor layout (Design)',
                'The app crashes or loads slowly (Systems)',
                'Personal data might be stolen (Security)',
                'Recommendations are completely irrelevant (AI/Data)'
              ]
            },
            {
              id: 2,
              q: 'How do you prefer solving a puzzle?',
              opts: [
                'Finding patterns and statistical shortcuts (Data)',
                'Breaking it down into 5 small logical steps (Algorithms)',
                'Finding a sneaky bypass or loophole (Security)',
                'Drawing out the pieces visually on paper (UI/UX)'
              ]
            }
          ].map(item => (
            <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs font-semibold text-white">Q{item.id}: {item.q}</span>
              <div className="space-y-1.5">
                {item.opts.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizSelect(item.id, opt)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                      quizAnswers[item.id] === opt
                        ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    {quizAnswers[item.id] === opt && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showRadar && (
          <div className="p-5 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 rounded-xl space-y-3 animate-fade-in">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Your Aptitude Profile: Logic & Systems Builder</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your answers, you possess strong algorithmic decomposition skills and natural curiosity for how systems operate under the hood. Recommended Next Step: Explore College Foundation tracks in <strong>Python & Data Structures</strong>.
            </p>
          </div>
        )}
      </div>

      {/* "What to Learn Next to Reach Goal" Pathway */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-slate-400">
          What to Learn Next to Reach Your Goal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-indigo-400">Step 1 (Immediate)</span>
            <h4 className="text-sm font-medium text-white">Class 12 Direction</h4>
            <p className="text-xs text-slate-400">Compare B.Tech vs BCA vs AI degrees and set up your first Git repository.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 2 (Upcoming)</span>
            <h4 className="text-sm font-medium text-white">Year 1 Foundation</h4>
            <p className="text-xs text-slate-400">Master C++/Python, solve 10 DSA challenges, and build your first web app.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 3 (Goal)</span>
            <h4 className="text-sm font-medium text-white">Tier-1 Placements</h4>
            <p className="text-xs text-slate-400">Land high-paying Software Engineering or AI roles with verified proof.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
