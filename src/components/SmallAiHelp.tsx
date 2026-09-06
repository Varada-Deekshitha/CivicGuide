import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Mic,
  Volume2,
  VolumeX,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Bot,
  User,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { SupportedLanguage, GovernmentScheme, CitizenProfile } from '../types';
import { getQuickAiHelp } from '../services/aiService';
import { LanguageService, SUPPORTED_LANGUAGES } from '../services/languageService';
import { VoiceSearchButton } from './VoiceSearchButton';
import { SCHEMES_DATA } from '../data/schemes';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedSchemeId?: string;
}

interface SmallAiHelpProps {
  currentLanguage: SupportedLanguage;
  profile?: CitizenProfile;
  onOpenSchemeDetails?: (scheme: GovernmentScheme) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenOnlyVoice?: () => void;
}

export const SmallAiHelp: React.FC<SmallAiHelpProps> = ({
  currentLanguage,
  profile,
  onOpenSchemeDetails,
  onNavigateTab,
  onOpenOnlyVoice
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Namaste! I am your CivicGuide AI Helper. How can I assist you with government schemes, eligibility, or required documents today?',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🌾 Farmers Aid', query: 'What financial aid schemes are available for small farmers?' },
    { label: '🎓 Scholarships', query: 'What scholarships can school and college students apply for?' },
    { label: '🏥 Health Card', query: 'How does Ayushman Bharat ₹5 Lakh health coverage work?' },
    { label: '💼 Mudra Loan', query: 'How can I get a collateral-free Mudra loan for my small business?' },
    { label: '👵 Pension', query: 'What is the eligibility for Atal Pension Yojana?' }
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Clean up any speaking voice when unmounting
  useEffect(() => {
    return () => {
      LanguageService.stopSpeaking();
    };
  }, []);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await getQuickAiHelp({
        query: textToSend,
        language: currentLanguage,
        profile: profile
      });

      const aiMsgId = `ai-${Date.now()}`;
      setMessages([
        ...newMessages,
        {
          id: aiMsgId,
          sender: 'ai',
          text: response.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedSchemeId: response.suggestedSchemeId
        }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'CivicGuide AI is currently assisting many citizens. Please verify with official helpline 1915 or browse the scheme catalog.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (recognizedText: string) => {
    setInputQuery(recognizedText);
    handleSend(recognizedText);
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (speakingId === msgId) {
      LanguageService.stopSpeaking();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(msgId);
    LanguageService.speak(
      text,
      currentLanguage,
      () => setSpeakingId(msgId),
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  const handleOpenSuggestedScheme = (schemeId: string) => {
    const scheme = SCHEMES_DATA.find((s) => s.id === schemeId);
    if (scheme && onOpenSchemeDetails) {
      onOpenSchemeDetails(scheme);
    } else if (onNavigateTab) {
      onNavigateTab('explorer');
    }
  };

  return (
    <aside aria-label="CivicGuide AI Assistant" className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] max-h-[560px] h-[80vh] sm:h-[540px] bg-[#fcfbf7] dark:bg-[#1f2620] rounded-[28px] shadow-2xl border border-[#e2dcd0] dark:border-[#38483b] flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#4a5d4e] dark:bg-[#2d3a2f] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#3d4d40]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm text-white">Civic AI Help</h3>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#38483b] text-[#8ca38f] rounded-full border border-[#8ca38f]/30">
                    2.5 Flash
                  </span>
                </div>
                <p className="text-[10px] text-[#e8ede9]/80">Plain-language citizen guidance</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onOpenOnlyVoice && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenOnlyVoice();
                  }}
                  className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-[#c87a53] hover:bg-[#b56b46] text-white flex items-center gap-1 transition"
                  title="Switch to Voice-Only Mode"
                >
                  <Mic className="w-3 h-3" />
                  <span>Only Voice</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  LanguageService.stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 text-[#e8ede9]/80 hover:text-white hover:bg-white/10 rounded-full transition"
                aria-label="Close AI Help"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2 bg-[#f4f1ea] dark:bg-[#181f19] border-b border-[#e2dcd0] dark:border-[#2d3a2f] overflow-x-auto flex items-center gap-1.5 no-scrollbar shrink-0">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p.query)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-[#253026] hover:bg-[#edeae1] text-[#4a5d4e] dark:text-[#a3b8a6] border border-[#e2dcd0] dark:border-[#38483b] whitespace-nowrap shrink-0 transition"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#fcfbf7] dark:bg-[#1a211b] text-xs">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isAi ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                      isAi
                        ? 'bg-[#4a5d4e] text-white'
                        : 'bg-[#c87a53] text-white'
                    }`}
                  >
                    {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className="max-w-[82%] space-y-1.5">
                    <div
                      className={`p-3 rounded-2xl leading-relaxed whitespace-pre-line text-xs ${
                        isAi
                          ? 'bg-white dark:bg-[#253026] text-[#2c2c2c] dark:text-[#e2e8f0] border border-[#e2dcd0] dark:border-[#38483b] shadow-xs'
                          : 'bg-[#4a5d4e] text-white rounded-tr-xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* AI Message Action Footer: Listen via Voice & View Scheme */}
                    {isAi && (
                      <div className="flex items-center gap-2 pt-0.5 pl-1">
                        <button
                          type="button"
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full transition ${
                            speakingId === msg.id
                              ? 'bg-[#c87a53] text-white animate-pulse'
                              : 'text-[#4a5d4e] dark:text-[#8ca38f] hover:bg-[#edeae1] dark:hover:bg-[#2d3a2f]'
                          }`}
                          title="Read out loud"
                        >
                          {speakingId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-[#c87a53]" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>

                        {msg.suggestedSchemeId && (
                          <button
                            type="button"
                            onClick={() => handleOpenSuggestedScheme(msg.suggestedSchemeId!)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#c87a53] hover:underline"
                          >
                            <span>Open Scheme</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#737067] dark:text-[#94a3b8] p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4a5d4e]" />
                <span>Checking central & state scheme rules...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-white dark:bg-[#1f2620] border-t border-[#e2dcd0] dark:border-[#38483b] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask a question or speak your need..."
                  className="w-full pl-3 pr-10 py-2 rounded-full text-xs bg-[#f4f1ea] dark:bg-[#283329] border border-[#e2dcd0] dark:border-[#3d4d40] text-[#2c2c2c] dark:text-white placeholder-[#737067] focus:outline-hidden focus:ring-1 focus:ring-[#4a5d4e]"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                  <VoiceSearchButton
                    onTranscript={handleVoiceInput}
                    language={currentLanguage}
                    size="sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="p-2 rounded-full bg-[#4a5d4e] hover:bg-[#3d4d40] disabled:opacity-40 text-white shadow-xs transition shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-[#737067] dark:text-[#94a3b8] px-2 pt-1.5">
              <span>National Helpline: 1915</span>
              <span>100% Offline Privacy Protected</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        {onOpenOnlyVoice && (
          <button
            type="button"
            onClick={onOpenOnlyVoice}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#c87a53] hover:bg-[#b56b46] text-white shadow-lg font-medium text-xs border border-[#d98c66] transition group hover:scale-105 active:scale-95"
            title="Open Only-Voice Mode"
          >
            <Mic className="w-4 h-4 text-white animate-pulse" />
            <span className="font-semibold">Only Voice</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (isOpen) LanguageService.stopSpeaking();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#4a5d4e] hover:bg-[#3d4d40] text-white shadow-xl border border-[#5d7361] transition group hover:scale-105 active:scale-95"
          aria-expanded={isOpen}
          aria-label="Ask Civic AI Help"
        >
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span className="font-serif font-bold text-xs">Civic AI Help</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        </button>
      </div>
    </aside>
  );
};
