class VoiceService:
    def __init__(self):
        self.provider = "WebSpeechAPI"

    def get_voice_config(self) -> dict:
        return {
            "provider": self.provider,
            "supported_modes": ["TextToSpeech", "SpeechToText"],
            "default_speed": 1.0,
            "default_pitch": 1.0,
            "privacy": "Client-side processing; zero continuous recording without explicit permission."
        }

voice_service = VoiceService()
