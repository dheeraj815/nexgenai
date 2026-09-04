import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface VoiceContextType {
  // TTS (Text-to-Speech)
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  
  // STT (Speech-to-Text)
  startListening: (onResult: (transcript: string) => void) => void;
  stopListening: () => void;
  isListening: boolean;
  transcript: string;
  micPermissionState: 'prompt' | 'granted' | 'denied' | 'unsupported';
  isTtsSupported: boolean;
  isSttSupported: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [micPermissionState, setMicPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'unsupported'>('prompt');

  const recognitionRef = useRef<any>(null);
  const callbackRef = useRef<((t: string) => void) | null>(null);

  const isTtsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const isSttSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Load voices
  useEffect(() => {
    if (!isTtsSupported) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
      if (available.length > 0 && !selectedVoice) {
        // Prefer natural English voices
        const preferred = available.find(v => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')))) || available[0];
        setSelectedVoice(preferred);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [isTtsSupported]);

  // STT Initialization
  useEffect(() => {
    if (!isSttSupported) {
      setMicPermissionState('unsupported');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      setMicPermissionState('granted');
    };

    rec.onresult = (event: any) => {
      let current = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);
      if (callbackRef.current) {
        callbackRef.current(current);
      }
    };

    rec.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setMicPermissionState('denied');
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, [isSttSupported]);

  const speak = (text: string) => {
    if (!isTtsSupported) return;
    window.speechSynthesis.cancel(); // Cancel any ongoing speech

    // Clean markdown symbols for natural speech
    const cleanText = text
      .replace(/#+\s/g, '')
      .replace(/`{1,3}[^`]*`{1,3}/g, 'code snippet')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = speechRate;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (!isTtsSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    if (!isTtsSupported) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stop = () => {
    if (!isTtsSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const startListening = (onResult: (transcript: string) => void) => {
    if (!recognitionRef.current) return;
    callbackRef.current = onResult;
    setTranscript('');
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.warn('Recognition already started or failed to start:', e);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch (e) {
      console.warn('Recognition stop error:', e);
    }
    setIsListening(false);
  };

  return (
    <VoiceContext.Provider
      value={{
        speak,
        pause,
        resume,
        stop,
        isPlaying,
        isPaused,
        speechRate,
        setSpeechRate,
        voices,
        selectedVoice,
        setSelectedVoice,
        startListening,
        stopListening,
        isListening,
        transcript,
        micPermissionState,
        isTtsSupported,
        isSttSupported,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) throw new Error('useVoice must be used within a VoiceProvider');
  return context;
};