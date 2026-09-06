import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  HelpCircle,
  BookOpen,
  Send,
  Loader2,
  ChevronDown,
  ShieldAlert,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Volume2
} from 'lucide-react';
import { GovernmentScheme, CitizenProfile, SupportedLanguage } from '../types';
import { getAiExplanation, AiExplanationResponse } from '../services/aiService';
import { VoiceSearchButton } from './VoiceSearchButton';
import { VoiceSpeakerButton } from './VoiceSpeakerButton';

interface AiExplainerViewProps {
  schemes: GovernmentScheme[];
  selectedScheme: GovernmentScheme;
  profile: CitizenProfile;
  currentLanguage?: SupportedLanguage;
  onSelectScheme: (scheme: GovernmentScheme) => void;
}

export const AiExplainerView: React.FC<AiExplainerViewProps> = ({
  schemes,
  selectedScheme,
  profile,
  currentLanguage = 'en',
  onSelectScheme
}) => {
  const [activeTask, setActiveTask] = useState<'simplify' | 'why_matched' | 'application_steps' | 'custom'>('simplify');
  const [customQuestion, setCustomQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiExplanationResponse | null>(null);

  const runExplanation = async (
    type: 'simplify' | 'why_matched' | 'application_steps' | 'general_question',
    question?: string
  ) => {
    setLoading(true);
    try {
      const resp = await getAiExplanation({
        scheme: selectedScheme,
        profile,
        type,
        customQuestion: question
      });
      setResult(resp);
    } catch (e) {
      console.error('Explanation generation failed', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically generate simplified view on scheme change or initial load
    runExplanation(activeTask === 'custom' ? 'simplify' : activeTask);
  }, [selectedScheme]);

  const handleTaskClick = (task: 'simplify' | 'why_matched' | 'application_steps') => {
    setActiveTask(task);
    runExplanation(task);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setActiveTask('custom');
    runExplanation('general_question', customQuestion);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#4a5d4e] text-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-[#3d4d40]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3a493d] text-[#e8ede9] text-xs font-semibold mb-2.5 border border-[#8ca38f]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#8ca38f]" />
            <span>AI Plain-Language Explainer (Zero-Cost / Fallback Capable)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
            Plain-Language Citizen Explainer
          </h1>
          <p className="text-xs sm:text-sm text-[#e8ede9]/90 mt-2 leading-relaxed">
            Government policies can be complex. CivicGuide AI breaks down bureaucratic guidelines, eligibility rules, and application procedures into friendly, jargon-free citizen summaries.
          </p>
        </div>
      </div>

      {/* Scheme Selector & Controls */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="sm:w-80">
            <label className="block text-[11px] font-bold text-[#737067] uppercase tracking-wider mb-1">
              Select Scheme to Explain:
            </label>
            <div className="relative">
              <select
                value={selectedScheme.id}
                onChange={(e) => {
                  const target = schemes.find((s) => s.id === e.target.value);
                  if (target) onSelectScheme(target);
                }}
                className="w-full bg-[#fdfcf9] border border-[#e2dcd0] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#8ca38f] appearance-none pr-8 truncate"
              >
                {schemes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#737067] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Quick Explainer Modes */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTaskClick('simplify')}
              disabled={loading}
              className={`px-4 py-2 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                activeTask === 'simplify'
                  ? 'bg-[#4a5d4e] text-white shadow-xs'
                  : 'bg-[#f4f1ea] hover:bg-[#edeae1] text-[#5c5953]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Simplify Scheme</span>
            </button>

            <button
              onClick={() => handleTaskClick('why_matched')}
              disabled={loading}
              className={`px-4 py-2 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                activeTask === 'why_matched'
                  ? 'bg-[#4a5d4e] text-white shadow-xs'
                  : 'bg-[#f4f1ea] hover:bg-[#edeae1] text-[#5c5953]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Why It Matches Me</span>
            </button>

            <button
              onClick={() => handleTaskClick('application_steps')}
              disabled={loading}
              className={`px-4 py-2 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                activeTask === 'application_steps'
                  ? 'bg-[#4a5d4e] text-white shadow-xs'
                  : 'bg-[#f4f1ea] hover:bg-[#edeae1] text-[#5c5953]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>How to Apply</span>
            </button>
          </div>
        </div>

        {/* Custom Question Bar */}
        <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-[#e2dcd0] flex items-center gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder={`Ask a question or tap mic to speak (e.g. "Do I need a bank account in my own name?")`}
            className="flex-1 px-4 py-2.5 border border-[#e2dcd0] rounded-full text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#8ca38f] bg-[#fdfcf9] text-[#2c2c2c]"
          />
          <VoiceSearchButton
            language={currentLanguage}
            onTranscript={(text) => setCustomQuestion(text)}
            size="md"
          />
          <button
            type="submit"
            disabled={loading || !customQuestion.trim()}
            className="px-5 py-2.5 bg-[#c87a53] hover:bg-[#b56b46] disabled:opacity-50 text-white rounded-full text-xs font-medium transition flex items-center gap-1.5 shadow-xs"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Ask AI</span>
          </button>
        </form>
      </div>

      {/* Output Panel */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0] space-y-5">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#e2dcd0] gap-2">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base text-[#4a5d4e]">
              Guidance for {selectedScheme.name}
            </span>
            {result && (
              <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#f9f7f2] text-[#737067] border border-[#e2dcd0]">
                Source: {result.source === 'gemini-live' ? 'Gemini 3.8 Flash' : 'Standard Rule Engine'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {result && (
              <VoiceSpeakerButton
                textToSpeak={result.content}
                language={currentLanguage}
                label="Listen Explanation"
                size="sm"
              />
            )}

            <button
              onClick={() => runExplanation(activeTask === 'custom' ? 'simplify' : activeTask, customQuestion)}
              disabled={loading}
              className="text-xs text-[#737067] hover:text-[#4a5d4e] flex items-center gap-1 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-[#737067]">
            <Loader2 className="w-8 h-8 animate-spin text-[#4a5d4e]" />
            <p className="text-xs font-medium">Synthesizing plain-language explanation...</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none text-[#2c2c2c] text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
              {result.content}
            </div>

            {/* Disclaimer Box */}
            <div className="mt-6 p-4 bg-[#fbf5f0] border border-[#f0ded5] rounded-2xl text-[#737067] text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#c87a53] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-[11px] mb-0.5 text-[#c87a53]">
                  Informational AI Policy:
                </strong>
                {result.disclaimer}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
