import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, RotateCcw, FastForward } from 'lucide-react';
import { cancelAllSpeech } from '../../utils/voiceUtils';

interface AudioLessonBarProps {
  title: string;
  scriptText: string;
  onEnded?: () => void;
}

export const AudioLessonBar: React.FC<AudioLessonBarProps> = ({
  title,
  scriptText,
  onEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check support and clean up on unmount
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setHasVoiceSupport(false);
    }

    return () => {
      cancelAllSpeech();
      setIsPlaying(false);
    };
  }, []);

  // Cancel speech whenever the lesson script or title changes
  useEffect(() => {
    cancelAllSpeech();
    setIsPlaying(false);
  }, [scriptText, title]);

  const handleTogglePlay = () => {
    if (!hasVoiceSupport) {
      alert('Speech synthesis is not supported in this browser environment.');
      return;
    }

    if (isPlaying) {
      cancelAllSpeech();
      setIsPlaying(false);
    } else {
      cancelAllSpeech();
      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsPlaying(false);
        if (onEnded) onEnded();
      };
      utterance.onerror = () => setIsPlaying(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    cancelAllSpeech();
    setIsPlaying(false);
  };

  const handleRestart = () => {
    cancelAllSpeech();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleCycleRate = () => {
    const nextRate = rate === 1.0 ? 1.25 : rate === 1.25 ? 1.5 : 1.0;
    setRate(nextRate);
    if (isPlaying) {
      handleRestart();
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 rounded-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={handleTogglePlay}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30'
          }`}
          title={isPlaying ? 'Pause / Stop Audio' : 'Listen to Audio Lesson'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {isPlaying && (
          <button
            onClick={handleStop}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all"
            title="Cut / Stop Voice Audio"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">AI Voice Audio Lesson</span>
            <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 text-[10px] rounded border border-indigo-500/30 font-mono">
              TTS Layer
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
            {isPlaying ? 'Speaking: ' + title : 'Listen along while reading or coding'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Animated Waveform when playing */}
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-1 h-5 px-2">
            <span className="w-1 h-2 bg-indigo-400 animate-pulse" />
            <span className="w-1 h-4 bg-purple-400 animate-pulse [animation-delay:0.15s]" />
            <span className="w-1 h-5 bg-indigo-400 animate-pulse [animation-delay:0.3s]" />
            <span className="w-1 h-3 bg-pink-400 animate-pulse [animation-delay:0.45s]" />
          </div>
        )}

        <button
          onClick={handleRestart}
          className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 text-xs transition-colors"
          title="Restart from beginning"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleCycleRate}
          className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
          title="Change playback speed"
        >
          {rate}x
        </button>
      </div>
    </div>
  );
};
