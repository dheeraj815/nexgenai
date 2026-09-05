import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, Sparkles, Volume2, VolumeX, Lightbulb, 
  BookOpen, Code2, ArrowRight, CheckCircle2, MessageSquare, 
  Mic, MicOff, RefreshCw, X, Play, Pause, ChevronRight
} from 'lucide-react';

import { cancelAllSpeech } from '../../utils/voiceUtils';

interface IDontUnderstandDrawerProps {
  conceptTitle: string;
  conceptSummary?: string;
  codeSnippet?: string;
  defaultAnalogy?: string;
  onUnderstood?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const IDontUnderstandDrawer: React.FC<IDontUnderstandDrawerProps> = ({
  conceptTitle,
  conceptSummary = 'Understanding the core mechanism, architecture, and step-by-step implementation.',
  codeSnippet,
  defaultAnalogy,
  onUnderstood,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: boolean) => {
    if (!val) {
      cancelAllSpeech();
      setIsSpeaking(false);
    }
    if (controlledOnClose && !val) controlledOnClose();
    setInternalIsOpen(val);
  };

  const [activeTab, setActiveTab] = useState<'analogy' | 'scratch' | 'example' | 'hint' | 'voice' | 'rephrase'>('analogy');
  const [hintStep, setHintStep] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [understoodMarked, setUnderstoodMarked] = useState(false);

  // Stop speech when drawer closes or unmounts
  useEffect(() => {
    if (!isOpen) {
      cancelAllSpeech();
      setIsSpeaking(false);
    }

    return () => {
      cancelAllSpeech();
      setIsSpeaking(false);
    };
  }, [isOpen]);

  // Stop speech when user switches tabs within drawer
  useEffect(() => {
    cancelAllSpeech();
    setIsSpeaking(false);
  }, [activeTab]);

  // Speech synthesis helper with toggle/cut support
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      cancelAllSpeech();
      setIsSpeaking(false);
      return;
    }

    cancelAllSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Pre-crafted analogies and breakdowns based on concept
  const analogyContent = defaultAnalogy || `Think of "${conceptTitle}" like ordering food in a restaurant:
1. You (the client) don't go into the kitchen and cook the food.
2. Instead, you look at a menu (the interface/spec) and tell the waiter (the request/function).
3. The waiter delivers your order to the kitchen chef (the engine/backend).
4. The chef prepares your dish and the waiter brings it back safely on a plate (the response/return value).

In the exact same way, "${conceptTitle}" gives you a clean, reliable way to request work or organize logic without needing to manage everything in the background yourself!`;

  const scratchContent = `Let's break down "${conceptTitle}" with ZERO computer science jargon:

• Step 1: Why does this exist?
Computers are very fast, but they have zero intuition. If you tell them to do a complex task without breaking it down, they can't guess what you mean.

• Step 2: The Core Rule
Everything in this concept comes down to three things:
1. Input: What information goes in?
2. Process: What transformation or check happens?
3. Output: What result comes out?

• Step 3: How to think about it
Don't memorize the syntax. Just remember what problem it solves in real life. When building apps or solving interview problems, you use "${conceptTitle}" whenever you need reliable, predictable results.`;

  const exampleContent = codeSnippet || `// Real-world practical example of ${conceptTitle}
function demonstrateConcept(inputData) {
  console.log("1. Receiving input:", inputData);
  
  // Step 1: Validate input
  if (!inputData) {
    return { status: "error", message: "Please provide valid data" };
  }
  
  // Step 2: Apply core logic
  const result = {
    processed: true,
    data: inputData,
    timestamp: new Date().toISOString()
  };
  
  console.log("2. Processed successfully:", result);
  return result;
}

// How it looks in action:
demonstrateConcept("Ready to learn");`;

  const hints = [
    `Hint 1: Look at the inputs and outputs first. What data are you starting with, and what shape does the final answer need to have?`,
    `Hint 2: Try writing the solution in plain human language (pseudocode) before touching any code. What would you do step-by-step with pen and paper?`,
    `Hint 3: Break it into sub-tasks. Solve the easiest part first (like checking edge cases or setting up an empty container), then handle the main loop or condition.`
  ];

  const voiceExplanation = `Hello! Don't worry if "${conceptTitle}" seems tricky at first. Every great software engineer was once confused by this exact topic. Let's make it super simple. At its core, "${conceptTitle}" is just a tool to organize logic and solve problems efficiently. Listen to the breakdown: First, identify what goes in. Second, follow the clear recipe. Third, verify the result. You've got this!`;

  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    // Adaptive AI answers based on query
    setCustomAnswer(
      `Great question about "${userQuery}"! In the context of ${conceptTitle}, think of it like this: When you encounter this situation, always ask yourself what data changes state and what stays constant. Keep your solution focused on one responsibility at a time.`
    );
  };

  const handleMarkUnderstood = () => {
    cancelAllSpeech();
    setIsSpeaking(false);
    setUnderstoodMarked(true);
    if (onUnderstood) onUnderstood();
    setTimeout(() => {
      setIsOpen(false);
      setUnderstoodMarked(false);
    }, 1200);
  };

  // Toggle voice speech recognition if available
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser. Please type your question.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserQuery(transcript);
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating / Embedded Trigger Button */}
      {controlledIsOpen === undefined && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 hover:border-amber-400 text-amber-300 rounded-xl font-medium text-xs shadow-lg shadow-amber-500/10 transition-all group cursor-pointer"
          title="Stuck or confused? Click for instant AI & voice explanations!"
        >
          <HelpCircle className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>I Don't Understand</span>
          <span className="bg-amber-500/30 text-amber-200 text-[10px] px-1.5 py-0.5 rounded font-mono">
            AI + Voice
          </span>
        </button>
      )}

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-xl h-full bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-slide-left"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
                  <Lightbulb className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-base">Adaptive AI Tutor</h3>
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                      Zero Stress
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
                    Concept: <span className="text-slate-200 font-medium">{conceptTitle}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(
                    activeTab === 'analogy' ? analogyContent :
                    activeTab === 'scratch' ? scratchContent :
                    activeTab === 'example' ? exampleContent :
                    activeTab === 'voice' ? voiceExplanation :
                    hints[hintStep - 1]
                  )}
                  className={`p-2 rounded-lg border transition-all ${
                    isSpeaking 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse' 
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                  }`}
                  title={isSpeaking ? 'Stop reading' : 'Listen to explanation'}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (6 adaptive modes) */}
            <div className="flex overflow-x-auto p-2 gap-1.5 border-b border-slate-800 bg-slate-950/60 scrollbar-none">
              <button
                onClick={() => setActiveTab('analogy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'analogy'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Explain Simply (Analogy)</span>
              </button>

              <button
                onClick={() => setActiveTab('scratch')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'scratch'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Teach from Basics</span>
              </button>

              <button
                onClick={() => setActiveTab('example')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'example'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Show Example</span>
              </button>

              <button
                onClick={() => setActiveTab('hint')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'hint'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Give Me a Hint</span>
              </button>

              <button
                onClick={() => setActiveTab('voice')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'voice'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Explain by Voice</span>
              </button>

              <button
                onClick={() => setActiveTab('rephrase')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'rephrase'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rephrase</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* TAB 1: ANALOGY */}
              {activeTab === 'analogy' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                      <Lightbulb className="w-4 h-4" />
                      <span>Everyday Real-World Analogy</span>
                    </div>
                    <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                      {analogyContent}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Analogy takeaway: Concepts are just standard tools built to make complex problems manageable.</span>
                  </div>
                </div>
              )}

              {/* TAB 2: BASICS (ZERO JARGON) */}
              {activeTab === 'scratch' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <BookOpen className="w-4 h-4" />
                      <span>Zero-Jargon Foundation Breakdown</span>
                    </div>
                    <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                      {scratchContent}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EXAMPLE */}
              {activeTab === 'example' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-blue-950/30 border border-blue-500/30 rounded-xl space-y-3">
                    <div className="flex items-center justify-between text-blue-400 font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        <span>Working Code Demonstration</span>
                      </div>
                      <span className="text-[10px] text-blue-300/80 bg-blue-500/20 px-2 py-0.5 rounded">
                        Executable
                      </span>
                    </div>
                    <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
                      <code>{exampleContent}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 4: STEP-BY-STEP HINTS */}
              {activeTab === 'hint' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-purple-950/30 border border-purple-500/30 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Progressive Clue {hintStep} of {hints.length}</span>
                      </div>
                      <div className="flex gap-1">
                        {hints.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx + 1 <= hintStep ? 'bg-purple-400' : 'bg-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 border border-purple-500/20 rounded-lg text-sm text-purple-200">
                      {hints[hintStep - 1]}
                    </div>

                    {hintStep < hints.length && (
                      <button
                        onClick={() => setHintStep(s => s + 1)}
                        className="inline-flex items-center gap-1 text-xs text-purple-300 hover:text-purple-100 font-medium transition-colors"
                      >
                        <span>Still not sure? Reveal next hint</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: VOICE EXPLANATION */}
              {activeTab === 'voice' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-6 bg-gradient-to-br from-pink-950/40 to-slate-900 border border-pink-500/30 rounded-xl text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-400 shadow-lg shadow-pink-500/20">
                      {isSpeaking ? (
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-4 bg-pink-400 animate-bounce" />
                          <span className="w-1 h-7 bg-pink-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1 h-5 bg-pink-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      ) : (
                        <Volume2 className="w-8 h-8" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-white font-medium text-sm">Personal AI Audio Mentor</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {isSpeaking ? 'Speaking explanation out loud...' : 'Click play to listen to a soothing, step-by-step vocal breakdown'}
                      </p>
                    </div>

                    <button
                      onClick={() => speakText(voiceExplanation)}
                      className="px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-pink-600/30 transition-all inline-flex items-center gap-2"
                    >
                      {isSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isSpeaking ? 'Pause Audio' : 'Play Voice Explanation'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 6: REPHRASE */}
              {activeTab === 'rephrase' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                      <RefreshCw className="w-4 h-4" />
                      <span>Alternative Perspective</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Instead of thinking about "{conceptTitle}" as abstract syntax, picture it as a safety contract.
                      In modern engineering teams, this pattern prevents 80% of common production crashes by validating
                      information upfront and maintaining predictable flow across the system.
                    </p>
                  </div>
                </div>
              )}

              {/* Custom Ask Anything Section */}
              <div className="border-t border-slate-800 pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Have a specific doubt about this? Ask by text or voice:</span>
                  </label>
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    className={`p-1.5 rounded-lg border text-xs transition-all ${
                      isListening
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title={isListening ? 'Stop recording voice' : 'Speak your question'}
                  >
                    {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <form onSubmit={handleCustomQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="e.g. Why do we need this instead of a simple variable?"
                    className="flex-1 bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors"
                  >
                    Ask AI
                  </button>
                </form>

                {customAnswer && (
                  <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 leading-relaxed animate-fade-in flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>{customAnswer}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer / Resolution */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Did this clarify the concept?
              </span>

              <button
                onClick={handleMarkUnderstood}
                disabled={understoodMarked}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  understoodMarked
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{understoodMarked ? 'Awesome! Unlocked +20 XP' : 'Yes, I Understand Now!'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
