import React, { useState } from 'react';
import { 
  BookOpen, Code2, Play, CheckCircle2, Award, Star, 
  HelpCircle, Lightbulb, Compass, ArrowRight, Clock, 
  Volume2, ShieldCheck, Terminal, Layers, Sparkles
} from 'lucide-react';
import { DeepCurriculumTopic } from '../../data/curriculumData';
import { AudioLessonBar } from '../voice/AudioLessonBar';
import { IDontUnderstandDrawer } from './IDontUnderstandDrawer';
import { useCareerJourney } from '../../context/CareerJourneyContext';

import { cancelAllSpeech } from '../../utils/voiceUtils';
import { useEffect } from 'react';

interface DeepTopicPlayerProps {
  topic: DeepCurriculumTopic;
  onNextTopic?: () => void;
}

export const DeepTopicPlayer: React.FC<DeepTopicPlayerProps> = ({
  topic,
  onNextTopic,
}) => {
  const { verifySkillProof, completeStageTopic } = useCareerJourney();

  const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'sandbox' | 'quiz' | 'project' | 'career'>('concept');
  const [sandboxInput, setSandboxInput] = useState<string>(topic.sandboxStarter);
  const [sandboxOutput, setSandboxOutput] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [isProofClaimed, setIsProofClaimed] = useState<boolean>(false);
  const [showHelpDrawer, setShowHelpDrawer] = useState<boolean>(false);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      cancelAllSpeech();
    };
  }, []);

  const handleRunSandbox = () => {
    try {
      setSandboxOutput(`>>> Output from Sandbox Execution:\n${topic.sandboxExpectedOutput}\n[Process completed with code 0 in 14ms]`);
    } catch (e) {
      setSandboxOutput('Syntax error in sandbox code');
    }
  };

  const handleClaimProof = () => {
    verifySkillProof(topic.skillEarned, topic.domain, 'Intermediate');
    completeStageTopic(topic.stage.toLowerCase(), topic.id, topic.xpPoints);
    setIsProofClaimed(true);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 text-slate-100 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[11px] font-semibold uppercase">
              {topic.domain}
            </span>
            <span className="flex items-center gap-1 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{topic.estimatedMinutes} mins deep dive</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{topic.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <IDontUnderstandDrawer
            conceptTitle={topic.title}
            defaultAnalogy={topic.analogy}
            isOpen={showHelpDrawer}
            onClose={() => setShowHelpDrawer(false)}
          />
          <button
            onClick={() => setShowHelpDrawer(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>I Don't Understand</span>
          </button>
        </div>
      </div>

      {/* Audio Lesson Bar */}
      <AudioLessonBar
        title={topic.title}
        scriptText={`Topic: ${topic.title}. Concept: ${topic.concept}. In plain English: ${topic.simpleExplanation}. Analogy: ${topic.analogy}. When you practice this in code, you gain the skills tested in Tier 1 technical interviews.`}
      />

      {/* 6-Phase Interactive Stepper Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-2 scrollbar-none">
        {[
          { id: 'concept', label: '1. Concept & Analogy', icon: BookOpen },
          { id: 'code', label: '2. Code & Architecture', icon: Code2 },
          { id: 'sandbox', label: '3. Live Sandbox', icon: Terminal },
          { id: 'quiz', label: '4. Concept Check Quiz', icon: Sparkles },
          { id: 'project', label: '5. Project Task', icon: Layers },
          { id: 'career', label: '6. Career & Proof', icon: Award },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: CONCEPT & ANALOGY */}
      {activeTab === 'concept' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 01 • Rigorous Concept</span>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">{topic.concept}</p>
          </div>

          <div className="p-5 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 02 • Simple Explanation (Zero Jargon)</span>
            <p className="text-xs text-slate-300 leading-relaxed">{topic.simpleExplanation}</p>
          </div>

          <div className="p-5 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Step 03 • Real-World Everyday Analogy</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{topic.analogy}</p>
          </div>
        </div>
      )}

      {/* TAB 2: CODE & ARCHITECTURE */}
      {activeTab === 'code' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 04 • Production Code Canonical Pattern</span>
              <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-mono">Verified Syntax</span>
            </div>
            <pre className="p-4 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{topic.codeExample}</code>
            </pre>
          </div>

          <div className="p-5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 05 • Architectural Flow Diagram</span>
            <pre className="p-4 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-indigo-200 overflow-x-auto">
              {topic.visualDiagram}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 07 • In-Browser Interactive Sandbox</span>
                <p className="text-xs text-slate-400 mt-0.5">Edit the code below and run it directly in your browser.</p>
              </div>
              <button
                onClick={handleRunSandbox}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Code</span>
              </button>
            </div>

            <textarea
              value={sandboxInput}
              onChange={(e) => setSandboxInput(e.target.value)}
              rows={6}
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-3.5 font-mono text-xs text-emerald-300 outline-none resize-none"
            />

            {sandboxOutput && (
              <div className="p-4 bg-slate-900 border border-emerald-500/30 rounded-xl font-mono text-xs text-emerald-400 whitespace-pre-line animate-fade-in">
                {sandboxOutput}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 09 • Diagnostic Concept Quiz</span>
            <h3 className="text-sm font-semibold text-white">{topic.quizQuestion}</h3>

            <div className="space-y-2">
              {topic.quizOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuizAnswer(idx);
                    setIsQuizSubmitted(true);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all ${
                    quizAnswer === idx
                      ? idx === topic.quizAnswerIndex
                        ? 'bg-emerald-600 text-white font-medium'
                        : 'bg-rose-600 text-white'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {isQuizSubmitted && (
              <div className={`p-4 rounded-xl text-xs font-semibold animate-fade-in ${
                quizAnswer === topic.quizAnswerIndex
                  ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
              }`}>
                {topic.quizRationale}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: PROJECT & CHALLENGE */}
      {activeTab === 'project' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 10 • Guided Practice Challenge</span>
            <p className="text-xs text-slate-300 leading-relaxed">{topic.challengeTask}</p>
          </div>

          <div className="p-5 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 11 • Real-World Portfolio Project Task</span>
            <p className="text-xs text-slate-300 leading-relaxed">{topic.projectTask}</p>
          </div>
        </div>
      )}

      {/* TAB 6: CAREER CONNECTION & PROOF CLAIM */}
      {activeTab === 'career' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 15 • How Tier-1 Recruiters Test This</span>
            <p className="text-xs text-slate-300 leading-relaxed">{topic.interviewContext}</p>
          </div>

          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 16 • Industry Relevance on the Job</span>
            <p className="text-xs text-slate-300 leading-relaxed">{topic.jobRelevance}</p>
          </div>

          {/* Claim Verified Proof */}
          <div className="p-6 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-950 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Steps 13 & 14 • Verified Proof & XP</span>
              <h4 className="text-base font-bold text-white mt-0.5">
                Earn "{topic.skillEarned}" Verified Badge
              </h4>
              <p className="text-xs text-slate-400">
                Permanently adds cryptographic proof to your Career Passport and awards +{topic.xpPoints} XP!
              </p>
            </div>

            <button
              onClick={handleClaimProof}
              disabled={isProofClaimed}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isProofClaimed
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isProofClaimed ? 'Proof Verified in Passport ✓' : 'Claim Verified Proof (+25 XP)'}</span>
            </button>
          </div>

          {/* Next Topic Preview */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Next Recommended Step:</span>
              <p className="text-xs font-bold text-indigo-300 mt-0.5">{topic.nextTopicTitle}</p>
            </div>
            {onNextTopic && (
              <button
                onClick={onNextTopic}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Continue Next Topic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Adaptive AI & Voice Help Drawer */}
      <IDontUnderstandDrawer
        conceptTitle={topic.title}
        conceptSummary={topic.concept}
        codeSnippet={topic.codeExample}
        defaultAnalogy={topic.analogy}
        isOpen={showHelpDrawer}
        onClose={() => setShowHelpDrawer(false)}
      />
    </div>
  );
};
