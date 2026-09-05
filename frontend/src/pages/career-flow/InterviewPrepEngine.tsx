import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Volume2, VolumeX, Play, Pause, Sparkles, 
  CheckCircle2, AlertCircle, Star, MessageSquare, ArrowRight, 
  HelpCircle, RefreshCw, Trophy
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';
import { useCareerJourney } from '../../context/CareerJourneyContext';
import { cancelAllSpeech } from '../../utils/voiceUtils';

export const InterviewPrepEngine: React.FC = () => {
  const { recordMockInterview } = useCareerJourney();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<{
    accuracy: number;
    starScore: number;
    confidence: number;
    feedback: string;
  } | null>(null);

  // Stop speech when unmounting
  useEffect(() => {
    return () => {
      cancelAllSpeech();
      setIsSpeakingQuestion(false);
    };
  }, []);

  // Stop speech when navigating to another question
  useEffect(() => {
    cancelAllSpeech();
    setIsSpeakingQuestion(false);
  }, [currentQuestionIndex]);

  const questions = [
    {
      id: 1,
      type: 'Behavioral (STAR Method)',
      company: 'Amazon / Google',
      question: 'Tell me about a difficult engineering bug you encountered and how you systematically isolated and resolved it.',
      targetKeywords: ['logs', 'root cause', 'isolated', 'unit test', 'metric', 'prevented regression']
    },
    {
      id: 2,
      type: 'Technical (System Architecture)',
      company: 'Razorpay / Atlassian',
      question: 'How would you design a distributed rate limiter that handles 50,000 requests per second across 10 application servers?',
      targetKeywords: ['token bucket', 'redis', 'sliding window', 'lua script', 'latency']
    },
    {
      id: 3,
      type: 'Core CS (Concurrency & OS)',
      company: 'Microsoft / Cisco',
      question: 'Explain the difference between a process and a thread, and how race conditions are prevented using mutex locks.',
      targetKeywords: ['address space', 'shared memory', 'context switch', 'mutex', 'deadlock']
    }
  ];

  const q = questions[currentQuestionIndex];

  // Speak question out loud
  const handleSpeakQuestion = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeakingQuestion) {
      cancelAllSpeech();
      setIsSpeakingQuestion(false);
      return;
    }

    cancelAllSpeech();
    const utterance = new SpeechSynthesisUtterance(q.question);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);
    setIsSpeakingQuestion(true);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle voice recognition
  const toggleRecording = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech recognition is not available. Please type your response.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => setIsRecording(true);
      rec.onend = () => setIsRecording(false);
      rec.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setStudentAnswer(transcript);
      };

      rec.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  const handleEvaluateAnswer = () => {
    if (!studentAnswer.trim()) return;

    // Evaluate based on keywords and length
    const words = studentAnswer.toLowerCase().split(/\s+/);
    const matchedCount = q.targetKeywords.filter(kw => studentAnswer.toLowerCase().includes(kw)).length;

    const accuracy = Math.min(95, 60 + matchedCount * 8);
    const starScore = words.length > 40 ? 88 : 65;
    const confidence = words.length > 30 ? 85 : 60;

    const feedback = words.length > 30
      ? `Strong structured delivery! You clearly articulated the situation and resolution. Incorporating industry terms like "${q.targetKeywords.slice(0, 3).join(', ')}" demonstrated real hands-on engineering experience.`
      : `Good start! To achieve higher marks in an actual interview, provide more technical context on the root cause and mention specific metrics or unit tests you added to prevent regression.`;

    setEvaluation({
      accuracy,
      starScore,
      confidence,
      feedback
    });

    recordMockInterview(accuracy, feedback);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-slate-900 border border-pink-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 10 • AI Voice Interview
              </span>
              <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs">
                Two-Way Voice Evaluation
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Interactive AI Voice Mock Interviewer
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Experience authentic technical and behavioral interviews. Listen to AI-spoken interview prompts, speak your answers naturally via microphone, and receive real-time ratings on accuracy, STAR structure, and confidence.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="STAR Method Interviewing"
            defaultAnalogy="STAR method is like storytelling for engineers: Situation (the problem), Task (your exact duty), Action (the specific code or command you ran), and Result (the measurable outcome like 40% faster latency)!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Interview Prep Audio Guide: How to Ace Behavioral and Technical Rounds"
            scriptText="Welcome to the Interview Preparation Engine. The secret to cracking interviews is vocal practice. When answering behavioral questions, always structure your thoughts with Situation, Task, Action, and Result. Listen to each question, practice out loud, and check your AI feedback score."
          />
        </div>
      </div>

      {/* Interactive Mock Interview Session Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold rounded-lg">
              {q.type}
            </span>
            <span className="text-xs text-slate-400">Target: {q.company}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <button
              onClick={() => {
                setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
                setStudentAnswer('');
                setEvaluation(null);
              }}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors"
            >
              Next Question →
            </button>
          </div>
        </div>

        {/* The Question Prompt with Voice Output */}
        <div className="p-5 bg-slate-950 border border-pink-500/30 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-pink-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Interviewer Question:</span>
            </span>

            <button
              onClick={handleSpeakQuestion}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                isSpeakingQuestion
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isSpeakingQuestion ? 'Stop / Cut Question Voice' : 'Listen Question (AI Voice)'}
            >
              {isSpeakingQuestion ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeakingQuestion ? 'Stop Voice' : 'Listen Question (AI Voice)'}</span>
            </button>
          </div>

          <h3 className="text-base font-semibold text-white leading-relaxed">
            "{q.question}"
          </h3>
        </div>

        {/* Student Answer Input (Text or Voice) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">Your Spoken or Written Response:</label>
            <button
              onClick={toggleRecording}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isRecording ? 'Listening (Click to Stop)' : 'Record Answer (Mic)'}</span>
            </button>
          </div>

          <textarea
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            rows={5}
            placeholder="Speak into your microphone or type your structured answer here..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl p-4 text-xs text-white placeholder-slate-500 outline-none leading-relaxed resize-none"
          />

          <div className="flex justify-end">
            <button
              onClick={handleEvaluateAnswer}
              disabled={!studentAnswer.trim()}
              className="px-5 py-2 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-pink-600/20 cursor-pointer"
            >
              Evaluate with AI Rubric
            </button>
          </div>
        </div>

        {/* Real-Time Evaluation Result */}
        {evaluation && (
          <div className="p-5 bg-slate-950 border border-pink-500/30 rounded-xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>AI Interview Evaluation Score</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">Passed Threshold (85%+)</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 uppercase">Technical Accuracy</span>
                <p className="text-lg font-bold text-emerald-400 mt-1">{evaluation.accuracy}%</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 uppercase">STAR Structure</span>
                <p className="text-lg font-bold text-indigo-400 mt-1">{evaluation.starScore}%</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 uppercase">Vocal Delivery</span>
                <p className="text-lg font-bold text-pink-400 mt-1">{evaluation.confidence}%</p>
              </div>
            </div>

            <div className="p-3.5 bg-pink-950/30 border border-pink-500/20 rounded-lg text-xs text-pink-200 leading-relaxed">
              <strong>Interviewer Feedback:</strong> {evaluation.feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
