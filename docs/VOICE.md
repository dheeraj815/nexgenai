# NexGenAI Voice Architecture

## Voice Engine Specification
- **Implementation**: `client/src/context/VoiceContext.tsx` and `client/src/components/voice/VoiceControls.tsx`.
- **Text-to-Speech (TTS)**: Built on the browser-standard `SpeechSynthesis` interface with voice profile selection and speed rate adjustment (0.5x to 2.0x).
- **Speech-to-Text (STT)**: Built on `SpeechRecognition` / `webkitSpeechRecognition` with explicit permission prompts and live recording visualizers.
- **Supported Workflows**:
  - Course lesson audio narration
  - Spoken AI Career Mentor questions and advice
  - Mock interview oral responses