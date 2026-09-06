import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { LanguageService } from '../services/languageService';

interface VoiceSpeakerButtonProps {
  textToSpeak: string;
  language: SupportedLanguage;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VoiceSpeakerButton: React.FC<VoiceSpeakerButtonProps> = ({
  textToSpeak,
  language,
  label,
  size = 'md',
  className = ''
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (isSpeaking) {
        LanguageService.stopSpeaking();
      }
    };
  }, [isSpeaking]);

  const handleToggleSpeak = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSpeaking) {
      LanguageService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const ok = LanguageService.speak(
        textToSpeak,
        language,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
      if (!ok) {
        setIsSpeaking(false);
      }
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm'
  };

  return (
    <button
      type="button"
      onClick={handleToggleSpeak}
      title={isSpeaking ? 'Stop speaking' : `Listen aloud in ${language.toUpperCase()}`}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all shadow-xs ${
        sizeClasses[size]
      } ${
        isSpeaking
          ? 'bg-[#c87a53] text-white ring-2 ring-[#c87a53]/40 animate-pulse'
          : 'bg-[#f4f1ea] hover:bg-[#edeae1] text-[#4a5d4e] border border-[#e2dcd0]'
      } ${className}`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-white" />
          <span>{label || 'Stop Audio'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#c87a53]" />
          <span>{label || 'Listen'}</span>
        </>
      )}
    </button>
  );
};
