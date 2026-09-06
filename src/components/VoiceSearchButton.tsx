import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, LanguageService } from '../services/languageService';

// Extend window for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
  language: SupportedLanguage;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  buttonText?: string;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onTranscript,
  language,
  size = 'md',
  className = '',
  buttonText
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
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
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback(LanguageService.translate('voiceNotSupported', language));
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
      recognition.lang = langObj?.speechCode || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setFeedback(LanguageService.translate('listening', language));
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onTranscript(transcript);
          setFeedback(`"${transcript}"`);
          setTimeout(() => setFeedback(null), 2500);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setFeedback('Microphone permission blocked. Please allow microphone in browser.');
        } else if (event.error === 'no-speech') {
          setFeedback('No speech detected. Please speak again.');
        } else {
          setFeedback(`Voice error: ${event.error}`);
        }
        setTimeout(() => setFeedback(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition', err);
      setIsListening(false);
      setFeedback('Unable to start microphone.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-xs sm:text-sm',
    lg: 'px-4 py-2.5 text-sm'
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={!isSupported}
        title={
          !isSupported
            ? 'Voice input not supported in this browser'
            : isListening
            ? 'Stop listening'
            : `Click to speak (${language.toUpperCase()})`
        }
        className={`inline-flex items-center justify-center gap-1.5 rounded-full transition-all shadow-xs cursor-pointer ${
          sizeClasses[size]
        } ${
          isListening
            ? 'bg-[#c87a53] text-white animate-pulse ring-2 ring-[#c87a53]/50'
            : 'bg-[#f4f1ea] hover:bg-[#edeae1] text-[#4a5d4e] border border-[#e2dcd0]'
        } ${!isSupported ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      >
        {isListening ? (
          <MicOff className="w-4 h-4 text-white" />
        ) : (
          <Mic className="w-4 h-4 text-[#c87a53]" />
        )}
        {buttonText && <span>{buttonText}</span>}
      </button>

      {/* Floating listening indicator or feedback bubble */}
      {feedback && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#2c2c2c] text-white text-xs shadow-lg border border-white/10 flex items-center gap-1.5 animate-in fade-in duration-150">
          {isListening && (
            <span className="w-2 h-2 rounded-full bg-[#c87a53] animate-ping inline-block" />
          )}
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
};
