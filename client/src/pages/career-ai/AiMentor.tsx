import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  User,
  Compass,
  CornerDownLeft,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useVoice } from '../../context/VoiceContext';
import { apiRequest } from '../../api';

export const AiMentor: React.FC = () => {
  const { user } = useAuth();
  const {
    speak,
    startListening,
    stopListening,
    isListening,
    isSttSupported,
    isTtsSupported,
  } = useVoice();

  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: `Hello ${user?.firstName || 'there'}! I am your NexGenAI Career Mentor. I am tracking your progress in academic stage ${user?.profile?.academicStage?.replace('_', ' ') || 'Class 11'}. How can I guide your learning, projects, or placement preparation today?`,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    const res = await apiRequest('/ai/mentor/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: text,
        conversationHistory: messages,
      }),
    });

    setIsLoading(false);
    if (res.success && res.data?.reply) {
      const assistantMsg = {
        role: 'assistant',
        content: res.data.reply.content,
        provider: res.data.reply.provider,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((transcript) => {
        setInputText(transcript);
      });
    }
  };

  const quickPrompts = [
    'What should I learn next for my current academic stage?',
    'What project should I build next to improve my Career Passport?',
    'Am I placement ready based on my current skills?',
    'Should I choose Artificial Intelligence or Cybersecurity?',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Context-Aware Engineering Advisor</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Career Mentor</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Informed by your authentic academic stage, verified skills, and project proof of work. Speak your question or type below.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono bg-dark-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Stage: {user?.profile?.academicStage?.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${
                  isUser ? 'bg-brand-600' : 'bg-gradient-to-tr from-brand-500 to-accent-purple'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl max-w-2xl text-xs leading-relaxed ${
                  isUser ? 'bg-brand-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {!isUser && isTtsSupported && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => speak(m.content)}
                        className="inline-flex items-center space-x-1 text-[11px] text-brand-400 hover:text-brand-300 font-medium"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen to Advice</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce delay-200" />
              <span>Analyzing student profile & formulating guidance...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-dark-950/80">
          <div className="relative flex items-center">
            {isSttSupported && (
              <button
                type="button"
                onClick={handleVoiceInput}
                title={isListening ? 'Stop recording voice' : 'Speak to AI Mentor'}
                className={`p-2.5 rounded-lg text-xs font-medium ml-1 transition mr-2 ${
                  isListening
                    ? 'bg-rose-600/30 border border-rose-500/50 text-rose-300 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-slate-300" />}
              </button>
            )}

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isListening ? 'Listening to your voice...' : 'Ask your AI Career Mentor anything...'}
              className="w-full py-3 pl-3 pr-12 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-brand-500"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="absolute right-2.5 p-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};