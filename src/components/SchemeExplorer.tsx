import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  Building,
  FileCheck2,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpDown,
  BookOpen,
  Send,
  Volume2
} from 'lucide-react';
import { GovernmentScheme, SchemeCategory, SupportedLanguage } from '../types';
import { SCHEME_CATEGORIES } from '../data/schemes';
import { VoiceSearchButton } from './VoiceSearchButton';
import { VoiceSpeakerButton } from './VoiceSpeakerButton';

interface SchemeExplorerProps {
  schemes: GovernmentScheme[];
  currentLanguage?: SupportedLanguage;
  onSelectSchemeForDetails: (scheme: GovernmentScheme) => void;
  onSelectSchemeForDocuments: (scheme: GovernmentScheme) => void;
  onSelectSchemeForAi: (scheme: GovernmentScheme) => void;
  onSelectSchemeForApply: (scheme: GovernmentScheme) => void;
}

export const SchemeExplorer: React.FC<SchemeExplorerProps> = ({
  schemes,
  currentLanguage = 'en',
  onSelectSchemeForDetails,
  onSelectSchemeForDocuments,
  onSelectSchemeForAi,
  onSelectSchemeForApply
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const TARGET_GROUPS = [
    'All',
    'Farmers',
    'Students & Youth',
    'Artisans & Craftsmen',
    'Self-Employed / Traders',
    'Women & Families',
    'Senior Citizens & PwD',
    'Low Income (BPL/EWS)'
  ];

  // Filtering logic
  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesDesc = s.shortDescription.toLowerCase().includes(q);
        const matchesCategory = s.category.toLowerCase().includes(q);
        const matchesBeneficiary = s.targetBeneficiaries.toLowerCase().includes(q);
        const matchesTags = s.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesBeneficiary && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && s.category !== selectedCategory) {
        return false;
      }

      // Level filter (Central vs State)
      if (selectedLevel !== 'All' && s.level !== selectedLevel) {
        return false;
      }

      // Target Group filter
      if (selectedTargetGroup !== 'All') {
        const group = selectedTargetGroup.toLowerCase();
        if (group.includes('farmer') && !s.tags.some((t) => t.toLowerCase().includes('farmer')) && s.category !== 'Agriculture') {
          return false;
        }
        if (group.includes('student') && !s.tags.some((t) => t.toLowerCase().includes('student') || t.toLowerCase().includes('education') || t.toLowerCase().includes('youth'))) {
          return false;
        }
        if (group.includes('artisan') && !s.tags.some((t) => t.toLowerCase().includes('artisan') || t.toLowerCase().includes('craft'))) {
          return false;
        }
        if (group.includes('self-employed') && !s.tags.some((t) => t.toLowerCase().includes('business') || t.toLowerCase().includes('mudra') || t.toLowerCase().includes('vendor') || t.toLowerCase().includes('startup'))) {
          return false;
        }
        if (group.includes('women') && s.category !== 'Women & Child Welfare' && !s.tags.some((t) => t.toLowerCase().includes('women') || t.toLowerCase().includes('girl'))) {
          return false;
        }
        if (group.includes('senior') && !s.tags.some((t) => t.toLowerCase().includes('senior') || t.toLowerCase().includes('pension'))) {
          return false;
        }
        if (group.includes('bpl') && !s.tags.some((t) => t.toLowerCase().includes('bpl') || t.toLowerCase().includes('cashless') || t.toLowerCase().includes('subsidy'))) {
          return false;
        }
      }

      return true;
    });
  }, [schemes, searchQuery, selectedCategory, selectedTargetGroup, selectedLevel]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedTargetGroup !== 'All' ||
    selectedLevel !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTargetGroup('All');
    setSelectedLevel('All');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8ede9] text-[#4a5d4e] text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5 text-[#4a5d4e]" />
              <span>Public Service Directory</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#4a5d4e] tracking-tight">
              Government Schemes & Public Services
            </h1>
            <p className="text-xs text-[#737067] mt-1">
              Browse {schemes.length} verified sample schemes across central ministries and departments.
            </p>
          </div>

          {/* Search Input Bar with Voice Recognition */}
          <div className="w-full md:w-96 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#737067] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes or tap mic to speak..."
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm border border-[#e2dcd0] rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#8ca38f] bg-[#fdfcf9] text-[#2c2c2c]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737067] hover:text-[#2c2c2c]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Voice Speech Recognition Button */}
            <VoiceSearchButton
              language={currentLanguage}
              onTranscript={(transcript) => setSearchQuery(transcript)}
              size="md"
            />
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="mt-5 pt-4 border-t border-[#e2dcd0]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SCHEME_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-[#4a5d4e] text-white shadow-xs'
                      : 'bg-[#f4f1ea] hover:bg-[#edeae1] text-[#5c5953]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5c5953] bg-[#f9f7f2] p-3.5 rounded-2xl border border-[#e2dcd0]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Target Group Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-[#4a5d4e]">Target Group:</span>
              <select
                value={selectedTargetGroup}
                onChange={(e) => setSelectedTargetGroup(e.target.value)}
                className="bg-white border border-[#e2dcd0] rounded-xl px-2.5 py-1.5 text-xs text-[#2c2c2c] focus:outline-none focus:ring-1 focus:ring-[#8ca38f]"
              >
                {TARGET_GROUPS.map((tg) => (
                  <option key={tg} value={tg}>
                    {tg}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-[#4a5d4e]">Government Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-white border border-[#e2dcd0] rounded-xl px-2.5 py-1.5 text-xs text-[#2c2c2c] focus:outline-none focus:ring-1 focus:ring-[#8ca38f]"
              >
                <option value="All">All Levels</option>
                <option value="Central">Central Govt</option>
                <option value="Central & State">Central & State Combined</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#737067]">
              Showing <strong className="text-[#2c2c2c]">{filteredSchemes.length}</strong> of {schemes.length}
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#c87a53] hover:text-[#b56b46] font-semibold underline underline-offset-2 ml-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty Search State */}
      {filteredSchemes.length === 0 && (
        <div className="bg-white rounded-[32px] p-12 text-center border border-[#e2dcd0] shadow-xs max-w-lg mx-auto">
          <div className="w-12 h-12 bg-[#f4f1ea] rounded-full flex items-center justify-center mx-auto text-[#737067] mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#2c2c2c]">No schemes found</h3>
          <p className="text-xs text-[#737067] mt-1 max-w-sm mx-auto">
            We could not find any government schemes matching your current keyword or filter criteria.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-5 py-2 bg-[#4a5d4e] text-white rounded-full text-xs font-medium hover:bg-[#364539] transition"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-[28px] border border-[#e2dcd0] shadow-xs hover:shadow-md hover:border-[#8ca38f] transition flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-5 sm:p-6">
              {/* Category & Demo Tag & Voice Read */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#e8ede9] text-[#4a5d4e]">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] font-medium text-[#737067] bg-[#f9f7f2] border border-[#e2dcd0] px-2 py-0.5 rounded-full">
                    {scheme.level}
                  </span>
                </div>

                <VoiceSpeakerButton
                  textToSpeak={`${scheme.name}. ${scheme.shortDescription}. Key benefit: ${scheme.mainBenefits[0] || ''}`}
                  language={currentLanguage}
                  label="Listen"
                  size="sm"
                />
              </div>

              {/* Title & Short Description */}
              <h3
                onClick={() => onSelectSchemeForDetails(scheme)}
                className="font-serif font-bold text-base text-[#2c2c2c] group-hover:text-[#4a5d4e] transition cursor-pointer leading-snug line-clamp-2"
              >
                {scheme.name}
              </h3>
              <p className="text-xs text-[#737067] mt-2 line-clamp-2 leading-relaxed">
                {scheme.shortDescription}
              </p>

              {/* Beneficiary Pill */}
              <div className="mt-4 p-2.5 bg-[#f9f7f2] rounded-xl text-[11px] text-[#5c5953] border border-[#e2dcd0]">
                <span className="font-semibold text-[#4a5d4e]">Target Beneficiaries:</span>{' '}
                <span className="line-clamp-1">{scheme.targetBeneficiaries}</span>
              </div>

              {/* Main Benefit Bullet */}
              <div className="mt-2.5 text-xs text-[#4a5d4e] bg-[#e8ede9]/60 p-2.5 rounded-xl border border-[#d2ddd4] flex items-start gap-1.5">
                <span className="text-[#8ca38f] font-bold shrink-0">★</span>
                <span className="text-[11px] line-clamp-2 font-medium">
                  {scheme.mainBenefits[0]}
                </span>
              </div>

              {/* Required Documents Count */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-[#737067] pt-3 border-t border-[#e2dcd0]">
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#8ca38f]" />
                  <span>{scheme.requiredDocuments.length} Required Documents</span>
                </span>
                <span className="font-medium text-[#4a5d4e]">
                  {scheme.applicationGuidance.applicationMethod} Application
                </span>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="bg-[#fbfbf9] px-5 py-3.5 border-t border-[#e2dcd0] flex items-center justify-between gap-1">
              <button
                onClick={() => onSelectSchemeForDetails(scheme)}
                className="text-xs font-semibold text-[#4a5d4e] hover:text-[#c87a53] flex items-center gap-0.5 transition"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onSelectSchemeForAi(scheme)}
                  className="px-2.5 py-1.5 bg-[#fbf5f0] hover:bg-[#f5e6de] text-[#c87a53] text-[11px] font-medium rounded-full border border-[#f0ded5] flex items-center gap-1 transition"
                  title="Plain-language AI breakdown"
                >
                  <Sparkles className="w-3 h-3 text-[#c87a53]" />
                  <span>AI</span>
                </button>

                <button
                  onClick={() => onSelectSchemeForDocuments(scheme)}
                  className="px-3 py-1.5 bg-white hover:bg-[#f4f1ea] text-[#4a5d4e] text-[11px] font-medium rounded-full border border-[#e2dcd0] flex items-center gap-1 transition"
                >
                  <FileCheck2 className="w-3 h-3 text-[#8ca38f]" />
                  <span>Checklist</span>
                </button>

                <button
                  onClick={() => onSelectSchemeForApply(scheme)}
                  className="px-3 py-1.5 bg-[#c87a53] hover:bg-[#b56b46] text-white text-[11px] font-medium rounded-full shadow-xs flex items-center gap-1 transition"
                >
                  <Send className="w-3 h-3" />
                  <span>Apply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
