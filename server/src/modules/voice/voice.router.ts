import { Router } from 'express';

export const voiceRouter = Router();

voiceRouter.get('/status', (req, res) => {
  return res.json({
    success: true,
    capabilities: {
      clientWebSpeechApi: true,
      textToSpeech: 'Web Speech API Synthesis (Local & Browser Engine)',
      speechToText: 'Web Speech Recognition (Browser Standard)',
      controlsSupported: ['PLAY', 'PAUSE', 'RESUME', 'STOP', 'SPEECH_RATE', 'VOICE_SELECT', 'MUTE'],
      features: [
        'Lesson content audio narration',
        'AI Career Mentor spoken conversations',
        'AI Mock Interview spoken responses & evaluation',
      ],
    },
  });
});
