/**
 * Universal Web Speech API cancellation & lifecycle management
 * Prevents voice bleed when navigating back, changing routes, switching tabs, or closing drawers.
 */

export const cancelAllSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (err) {
      console.warn('Failed to cancel speech synthesis:', err);
    }
  }
};

export const safeSpeak = (
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    voice?: SpeechSynthesisVoice | null;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  // Always cancel any prior speech before starting a new one
  cancelAllSpeech();

  // Clean Markdown and code blocks for crisp speech delivery
  const cleanText = text
    .replace(/#+\s/g, '')
    .replace(/`{1,3}[^`]*`{1,3}/g, 'code snippet')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~]/g, '')
    .trim();

  if (!cleanText) return null;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = options?.rate ?? 0.95;
  utterance.pitch = options?.pitch ?? 1.0;
  if (options?.voice) {
    utterance.voice = options.voice;
  }

  utterance.onstart = () => {
    if (options?.onStart) options.onStart();
  };

  utterance.onend = () => {
    if (options?.onEnd) options.onEnd();
  };

  utterance.onerror = () => {
    if (options?.onError) options.onError();
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
};
