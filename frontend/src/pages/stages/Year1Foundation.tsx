import React, { useState } from 'react';
import { 
  Code2, Terminal, Database, Layers, ArrowRight, 
  CheckCircle2, Play, Sparkles, BookOpen, Star, 
  Cpu, Compass, ChevronRight, FileCode2
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const Year1Foundation: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<'cpp' | 'python' | 'java' | 'c'>('python');
  const [dsaStructure, setDsaStructure] = useState<'array' | 'stack' | 'queue'>('array');
  const [stackItems, setStackItems] = useState<number[]>([10, 20, 30]);

  const langDetails = {
    python: {
      name: 'Python 3.12 Core',
      useCase: 'Best for rapid development, scripting, data manipulation, and AI foundations.',
      keyConcepts: ['Variables & Dynamic Typing', 'Lists, Tuples, Dicts', 'Functions & Scope', 'OOP & Classes', 'File I/O'],
      starterSnippet: 'def is_palindrome(word: str) -> bool:\n    clean = word.lower().replace(" ", "")\n    return clean == clean[::-1]\n\nprint(is_palindrome("racecar"))  # True'
    },
    cpp: {
      name: 'C++20 & STL',
      useCase: 'Industry standard for high-performance computing, game engines, and competitive programming.',
      keyConcepts: ['Pointers & References', 'Memory Allocation (new/delete)', 'STL Vectors, Maps, Sets', 'Class Templates', 'Time Complexity O(N)'],
      starterSnippet: '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    nums.push_back(5);\n    std::cout << "Size: " << nums.size() << std::endl;\n    return 0;\n}'
    },
    java: {
      name: 'Java 21 (LTS)',
      useCase: 'Dominant in enterprise backends, Android app development, and large-scale microservices.',
      keyConcepts: ['JVM Architecture', 'Garbage Collection', 'Object-Oriented Design', 'Generics & Collections', 'Exception Handling'],
      starterSnippet: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Enterprise Core Ready!");\n    }\n}'
    },
    c: {
      name: 'ANSI C Foundations',
      useCase: 'Hardware interface, operating system kernels, embedded systems, and understanding memory.',
      keyConcepts: ['Stack vs Heap', 'Pointer Arithmetic', 'Structs & Typedef', 'Manual malloc/free', 'Bitwise Operations'],
      starterSnippet: '#include <stdio.h>\nint main() {\n    int x = 42;\n    int *ptr = &x;\n    printf("Value: %d, Address: %p\\n", *ptr, (void*)ptr);\n    return 0;\n}'
    }
  };

  const pushStack = () => {
    if (stackItems.length >= 6) return;
    const nextVal = (stackItems[stackItems.length - 1] || 0) + 10;
    setStackItems([...stackItems, nextVal]);
  };

  const popStack = () => {
    if (stackItems.length === 0) return;
    setStackItems(stackItems.slice(0, -1));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-slate-900 border border-emerald-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Stage 03 • College Year 1
              </span>
              <span className="px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs">
                Core CS & Foundation
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Computer Science Foundations & DSA Level 1
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Master fundamental programming languages (Python, C++, Java, C), internalize data structure mechanics with interactive visualizers, and build your first deployed software project.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="Data Structures & Pointers"
            defaultAnalogy="Think of computer memory like a long street of houses, where each house has a specific street number (its memory address). A regular variable is the furniture inside the house. A pointer is simply a slip of paper with someone else's street number written on it!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Year 1 Strategy: Avoiding the Common First-Year Trap"
            scriptText="Welcome to College Year 1! The biggest mistake first-year students make is getting stuck in tutorial hell or only cramming for university exams without writing code. This year, your two core priorities are: master one language deeply, and understand fundamental data structures like Arrays, Stacks, and Hash Maps with actual practice."
          />
        </div>
      </div>

      {/* "What Should I Do Today?" Card */}
      <div className="p-5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-slate-900 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl mt-0.5">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">What Should I Do Today?</span>
              <span className="text-[10px] text-slate-400 font-mono">20 min estimated</span>
            </div>
            <h3 className="text-base font-medium text-white mt-0.5">
              Interact with the LIFO Stack Visualizer & Implement a Stack in Python
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Visualizing push and pop operations reinforces stack mechanics, unlocking the <strong>DSA Foundations Level 1</strong> badge.
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            window.scrollTo({ top: 750, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <span>Open DSA Visualizer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Core Language Tracks */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-emerald-400" />
              <span>Core Language Tracks</span>
            </h2>
            <p className="text-xs text-slate-400">Select your primary programming language for Year 1 foundations.</p>
          </div>

          <div className="flex gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            {(['python', 'cpp', 'java', 'c'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase transition-all ${
                  selectedLang === lang ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'cpp' ? 'C++' : lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">{langDetails[selectedLang].name}</h3>
              <p className="text-xs text-slate-400 mt-1">{langDetails[selectedLang].useCase}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-300">Must-Master Concepts:</span>
              <div className="space-y-1.5">
                {langDetails[selectedLang].keyConcepts.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400">Starter Canonical Pattern:</span>
            <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto h-[220px]">
              <code>{langDetails[selectedLang].starterSnippet}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* DSA Level 1 Interactive Visualizer */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>DSA Level 1: Interactive Stack (LIFO) Visualizer</span>
            </h2>
            <p className="text-xs text-slate-400">
              Last-In, First-Out: Test push and pop operations directly to understand call stack and memory mechanics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={pushStack}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              + Push Item
            </button>
            <button
              onClick={popStack}
              className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              - Pop Item
            </button>
          </div>
        </div>

        <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center min-h-[220px]">
          <div className="w-48 border-b-4 border-l-4 border-r-4 border-emerald-500/50 rounded-b-xl p-3 flex flex-col-reverse gap-2 bg-slate-900/60 min-h-[160px]">
            {stackItems.length === 0 ? (
              <span className="text-xs text-slate-500 text-center my-auto">Stack is Empty (NULL)</span>
            ) : (
              stackItems.map((val, idx) => (
                <div
                  key={idx}
                  className="w-full p-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-mono text-xs font-bold text-center rounded-lg shadow-md animate-fade-in flex items-center justify-between"
                >
                  <span className="text-[10px] text-emerald-200">Index {idx}</span>
                  <span>Value: {val}</span>
                  {idx === stackItems.length - 1 && (
                    <span className="text-[9px] bg-white text-slate-900 px-1 py-0.2 rounded font-bold">TOP</span>
                  )}
                </div>
              ))
            )}
          </div>
          <span className="text-[11px] text-slate-400 mt-3 font-mono">
            Stack Top: {stackItems.length > 0 ? stackItems[stackItems.length - 1] : 'None'} | Elements Count: {stackItems.length}
          </span>
        </div>
      </div>

      {/* "What to Learn Next" */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-slate-400">
          What to Learn Next to Reach Your Goal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-emerald-400">Step 1 (Immediate)</span>
            <h4 className="text-sm font-medium text-white">College Year 2 Specialization</h4>
            <p className="text-xs text-slate-400">Choose your track: AI/ML, Cloud/DevOps, or Defensive Cybersecurity SOC.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 2 (Upcoming)</span>
            <h4 className="text-sm font-medium text-white">Year 3 Industry Prep</h4>
            <p className="text-xs text-slate-400">Audit your ATS resume and study System Design high-level architectures.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-slate-500">Step 3 (Goal)</span>
            <h4 className="text-sm font-medium text-white">Placement Command Center</h4>
            <p className="text-xs text-slate-400">Clear campus recruitment rounds and secure dream company offers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
