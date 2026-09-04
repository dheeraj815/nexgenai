import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, Mic, MicOff, Settings2 } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';

interface VoiceControlsProps {
  textToRead?: string;
  onSpeechInput?: (transcript: string) => void;
  showMic?: boolean;
  className?: string;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  textToRead,
  onSpeechInput,
  showMic = false,
  className = '',
}) => {
  const {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    speechRate,
    setSpeechRate,
    startListening,
    stopListening,
    isListening,
    micPermissionState,
    isTtsSupported,
    isSttSupported,
  } = useVoice();

  const [showSettings, setShowSettings] = useState(false);

  if (!isTtsSupported && !isSttSupported) {
    return (
      <div className={`text-xs text-slate-500 italic ${className}`}>
        Browser speech synthesis not supported
      </div>
    );
  }

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else if (textToRead) {
      speak(textToRead);
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else if (onSpeechInput) {
      startListening(onSpeechInput);
    }
  };

  return (
    <div className={`inline-flex items-center space-x-2 bg-dark-900/90 border border-slate-700/60 rounded-lg px-2.5 py-1.5 backdrop-blur-md shadow-sm ${className}`}>
      {textToRead && (
        <>
          <button
            type="button"
            onClick={handleTogglePlay}
            title={isPlaying ? (isPaused ? 'Resume Audio' : 'Pause Audio') : 'Listen to Content'}
            className="flex items-center space-x-1.5 px-2 py-1 rounded bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 text-xs font-medium transition"
          >
            {isPlaying ? (
              isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5 text-brand-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-brand-400" />
            )}
            <span>{isPlaying ? (isPaused ? 'Resume' : 'Pause') : 'Listen'}</span>
          </button>

          {isPlaying && (
            <button
              type="button"
              onClick={stop}
              title="Stop Reading"
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          )}
        </>
      )}

      {showMic && isSttSupported && (
        <button
          type="button"
          onClick={handleToggleMic}
          title={isListening ? 'Stop recording voice' : 'Speak to AI / Voice input'}
          className={`flex items-center space-x-1.5 px-2 py-1 rounded text-xs font-medium transition ${
            isListening
              ? 'bg-rose-600/30 border border-rose-500/50 text-rose-300 animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          <span>{isListening ? 'Listening...' : 'Speak'}</span>
        </button>
      )}

      {micPermissionState === 'denied' && showMic && (
        <span className="text-[10px] text-rose-400">Mic access blocked</span>
      )}

      {/* Speed Rate Adjuster */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="p-1 rounded text-slate-400 hover:text-slate-200 transition"
          title="Voice Speed Rate"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>

        {showSettings && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-dark-900 border border-slate-700 rounded-lg p-3 shadow-2xl z-50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-300">Speech Rate</span>
              <span className="text-xs text-brand-400 font-mono">{speechRate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0.5x</span>
              <span>1.0x</span>
              <span>2.0x</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};