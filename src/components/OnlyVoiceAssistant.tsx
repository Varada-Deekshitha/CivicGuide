import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Headphones,
  CheckCircle2,
  Radio,
  ExternalLink,
  Languages,
  AlertCircle
} from 'lucide-react';
import { SupportedLanguage, GovernmentScheme, CitizenProfile } from '../types';
import { SUPPORTED_LANGUAGES, LanguageService } from '../services/languageService';
import { getQuickAiHelp } from '../services/aiService';
import { SCHEMES_DATA } from '../data/schemes';

interface OnlyVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onSelectSchemeForDetails?: (scheme: GovernmentScheme) => void;
  profile?: CitizenProfile;
}

export const OnlyVoiceAssistant: React.FC<OnlyVoiceAssistantProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
  onSelectSchemeForDetails,
  profile
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [voiceReply, setVoiceReply] = useState<string>('');
  const [matchedScheme, setMatchedScheme] = useState<GovernmentScheme | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Tap the microphone to speak');
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      LanguageService.stopSpeaking();
    };
  }, []);

  // When modal opens, introduce voice assistant in citizen's selected language
  useEffect(() => {
    if (isOpen) {
      const welcomeGreetings: Record<SupportedLanguage, string> = {
        en: 'Namaste! Welcome to CivicGuide Voice Assistant. Please speak your welfare or scheme need.',
        hi: 'नमस्ते! सिविकगाइड वॉइस असिस्टेंट में आपका स्वागत है। अपनी आवश्यकता बोलकर बताएं।',
        te: 'నమస్కారం! సివిక్ గైడ్ వాయిస్ అసిస్టెంట్‌కి స్వాగతం. మీకు కావలసిన పథకం గురించి మాట్లాడండి.',
        ta: 'வணக்கம்! சிவிக் கைடு வாய்ஸ் அசிஸ்டண்டிற்கு வரவேற்கிறோம். உங்கள் தேவையை பேசுங்கள்.',
        bn: 'নমস্কার! সিভিকগাইড ভয়েস অ্যাসিস্ট্যান্টে স্বাগতম। আপনার প্রয়োজনীয় প্রকল্পের কথা বলুন।',
        mr: 'नमस्कार! सिव्हिकगाईड व्हॉइस असिस्टंटमध्ये आपले स्वागत आहे. आपली आवश्यकता बोला.',
        kn: 'ನಮಸ್ಕಾರ! ಸಿವಿಕ್ ಗೈಡ್ ಧ್ವನಿ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಅಗತ್ಯವನ್ನು ಮಾತನಾಡಿ ತಿಳಿಸಿ.'
      };

      const greeting = welcomeGreetings[currentLanguage] || welcomeGreetings.en;
      setStatusMessage('Voice Assistant Ready • Speak anytime');
      setVoiceReply(greeting);

      // Speak welcome greeting
      LanguageService.speak(
        greeting,
        currentLanguage,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    } else {
      LanguageService.stopSpeaking();
      setIsSpeaking(false);
      setIsListening(false);
    }
  }, [isOpen, currentLanguage]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    LanguageService.stopSpeaking();
    setIsSpeaking(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatusMessage('Speech recognition is not supported in this browser environment.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);
      recognition.lang = langObj?.speechCode || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage('Listening to your voice... Speak now');
      };

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSpokenTranscript(transcript);
          setStatusMessage(`Analyzing: "${transcript}"...`);
          await processVoiceQuery(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setStatusMessage('Microphone access was denied. Please allow microphone in browser settings.');
        } else if (event.error === 'no-speech') {
          setStatusMessage('No voice detected. Please tap the microphone and speak again.');
        } else {
          setStatusMessage(`Voice error (${event.error}). Tap below to retry.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
      setStatusMessage('Unable to access microphone.');
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setStatusMessage('Listening paused');
  };

  const processVoiceQuery = async (query: string) => {
    setIsListening(false);
    setStatusMessage('Finding verified welfare matches & preparing voice response...');

    try {
      const result = await getQuickAiHelp({
        query: query,
        language: currentLanguage,
        profile: profile
      });

      setVoiceReply(result.content);

      let matched: GovernmentScheme | null = null;
      if (result.suggestedSchemeId) {
        matched = SCHEMES_DATA.find((s) => s.id === result.suggestedSchemeId) || null;
      } else {
        // Find best scheme by keyword
        const qLow = query.toLowerCase();
        matched = SCHEMES_DATA.find((s) =>
          s.name.toLowerCase().includes(qLow) ||
          s.shortDescription.toLowerCase().includes(qLow) ||
          s.category.toLowerCase().includes(qLow)
        ) || null;
      }

      setMatchedScheme(matched);
      setStatusMessage('Speaking response aloud...');

      // Read reply aloud
      LanguageService.speak(
        result.content,
        currentLanguage,
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          setStatusMessage('Response complete. Tap mic to ask another question.');
        },
        () => {
          setIsSpeaking(false);
          setStatusMessage('Response complete.');
        }
      );
    } catch (err) {
      console.error(err);
      const fallbackText = 'We found relevant schemes for your need. You can view the scheme catalog on the dashboard.';
      setVoiceReply(fallbackText);
      LanguageService.speak(fallbackText, currentLanguage);
    }
  };

  const handleQuickVoiceSimulation = (phrase: string) => {
    setSpokenTranscript(phrase);
    processVoiceQuery(phrase);
  };

  const toggleSpeechAudio = () => {
    if (isSpeaking) {
      LanguageService.stopSpeaking();
      setIsSpeaking(false);
    } else if (voiceReply) {
      LanguageService.speak(
        voiceReply,
        currentLanguage,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const quickSamples = [
    { label: '🌾 Farmers', text: 'I am a farmer with small land, what schemes can I get?' },
    { label: '🎓 Students', text: 'Scholarships for college and school education' },
    { label: '🏥 Healthcare', text: 'How to get Ayushman Bharat 5 lakh hospital card?' },
    { label: '💼 Small Business', text: 'Mudra loan without bank guarantee for my shop' },
    { label: '👵 Old Age', text: 'Atal Pension Yojana monthly guarantee after 60' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#2c2c2c]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#fcfbf7] dark:bg-[#1a211b] rounded-[36px] shadow-2xl max-w-xl w-full border border-[#e2dcd0] dark:border-[#38483b] overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#4a5d4e] text-white px-6 py-5 flex items-center justify-between shrink-0 border-b border-[#3d4d40]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-lg text-white">Only Voice Assistant</h2>
                <span className="text-[10px] font-semibold bg-[#c87a53] text-white px-2 py-0.5 rounded-full">
                  Hands-Free
                </span>
              </div>
              <p className="text-xs text-[#e8ede9]/80">Speak your question, listen to the answer</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              LanguageService.stopSpeaking();
              onClose();
            }}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close voice mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selection Bar */}
        <div className="px-6 py-2.5 bg-[#f4f1ea] dark:bg-[#253026] border-b border-[#e2dcd0] dark:border-[#38483b] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#5c5953] dark:text-[#a3b8a6]">
            <Languages className="w-3.5 h-3.5 text-[#8ca38f]" />
            <span className="font-medium">Spoken Language:</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onSelectLanguage(lang.code)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
                  currentLanguage === lang.code
                    ? 'bg-[#4a5d4e] text-white font-bold'
                    : 'bg-white dark:bg-[#1a211b] text-[#2c2c2c] dark:text-[#e2e8f0] border border-[#e2dcd0] dark:border-[#38483b] hover:bg-[#edeae1]'
                }`}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 flex flex-col items-center text-center">
          {/* Central Big Microphone Button */}
          <div className="relative my-2 flex items-center justify-center">
            {/* Animated Pulsing Soundwave Rings */}
            {isListening && (
              <>
                <div className="absolute w-36 h-36 rounded-full bg-[#c87a53]/20 animate-ping pointer-events-none" />
                <div className="absolute w-28 h-28 rounded-full bg-[#c87a53]/30 animate-pulse pointer-events-none" />
              </>
            )}

            {isSpeaking && (
              <div className="absolute w-32 h-32 rounded-full bg-[#4a5d4e]/25 animate-pulse pointer-events-none" />
            )}

            <button
              type="button"
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl border-4 transition-all transform active:scale-95 cursor-pointer z-10 ${
                isListening
                  ? 'bg-[#c87a53] text-white border-white ring-4 ring-[#c87a53]/50 scale-105'
                  : isSpeaking
                  ? 'bg-[#4a5d4e] text-white border-[#8ca38f]'
                  : 'bg-white dark:bg-[#253026] text-[#4a5d4e] dark:text-[#8ca38f] border-[#e2dcd0] dark:border-[#4a5d4e] hover:border-[#c87a53]'
              }`}
              title={isListening ? 'Tap to stop listening' : 'Tap to speak your question'}
            >
              {isListening ? (
                <>
                  <MicOff className="w-8 h-8 text-white" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Stop</span>
                </>
              ) : isSpeaking ? (
                <>
                  <Volume2 className="w-8 h-8 text-white animate-bounce" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 text-[#c87a53]" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Tap to Speak</span>
                </>
              )}
            </button>
          </div>

          {/* Real-time Status Caption */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#4a5d4e] dark:text-[#8ca38f] tracking-wide">
              {statusMessage}
            </p>
            {spokenTranscript && (
              <div className="p-3 bg-white dark:bg-[#253026] rounded-2xl border border-[#e2dcd0] dark:border-[#38483b] text-xs font-medium text-[#2c2c2c] dark:text-white max-w-md mx-auto">
                <span className="text-[#737067] dark:text-[#94a3b8] block text-[10px] uppercase tracking-wider mb-0.5">
                  You said:
                </span>
                "{spokenTranscript}"
              </div>
            )}
          </div>

          {/* Spoken Voice Answer Card */}
          {voiceReply && (
            <div className="w-full bg-white dark:bg-[#253026] rounded-[28px] p-5 border border-[#e2dcd0] dark:border-[#38483b] text-left shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#e2dcd0] dark:border-[#38483b] pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c87a53]" />
                  <span className="text-xs font-serif font-bold text-[#4a5d4e] dark:text-[#8ca38f]">
                    CivicGuide Audio Response
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleSpeechAudio}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#f4f1ea] dark:bg-[#1a211b] hover:bg-[#edeae1] text-[#4a5d4e] dark:text-[#8ca38f] flex items-center gap-1.5 transition"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-[#c87a53]" />
                      <span>Stop Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#c87a53]" />
                      <span>Replay Audio</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#2c2c2c] dark:text-[#e2e8f0] leading-relaxed whitespace-pre-line">
                {voiceReply}
              </p>

              {/* Matched Scheme Direct Link */}
              {matchedScheme && (
                <div className="mt-3 p-3 rounded-2xl bg-[#f4f1ea] dark:bg-[#1f2620] border border-[#e2dcd0] dark:border-[#38483b] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#c87a53] uppercase tracking-wider">
                      Matched Welfare Scheme
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#4a5d4e] dark:text-[#8ca38f]">
                      {matchedScheme.name}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      LanguageService.stopSpeaking();
                      onClose();
                      if (onSelectSchemeForDetails) {
                        onSelectSchemeForDetails(matchedScheme);
                      }
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#4a5d4e] text-white hover:bg-[#3d4d40] transition flex items-center gap-1 shrink-0"
                  >
                    <span>View Scheme</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Voice Topics (1-tap speech simulation) */}
          <div className="w-full pt-2">
            <span className="text-[11px] font-semibold text-[#737067] dark:text-[#94a3b8] block mb-2">
              Or tap a common question to listen immediately:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickSamples.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickVoiceSimulation(sample.text)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#253026] hover:bg-[#edeae1] text-[#4a5d4e] dark:text-[#8ca38f] border border-[#e2dcd0] dark:border-[#38483b] shadow-xs transition"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f4f1ea] dark:bg-[#181f19] border-t border-[#e2dcd0] dark:border-[#38483b] flex items-center justify-between text-[11px] text-[#737067] dark:text-[#94a3b8]">
          <span>National Citizen Helpline: <strong>1915</strong></span>
          <span>100% Client-Side Voice Processing</span>
        </div>
      </div>
    </div>
  );
};
