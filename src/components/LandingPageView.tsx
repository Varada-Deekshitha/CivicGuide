import React, { useState } from 'react';
import {
  Search,
  Mic,
  ArrowRight,
  ClipboardList,
  Compass,
  FileCheck2,
  Send,
  Target,
  ShieldCheck,
  Building,
  Users,
  GraduationCap,
  HeartPulse,
  Sprout,
  Briefcase,
  Home,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { GovernmentScheme, CitizenProfile, SupportedLanguage } from '../types';
import { CivicGuideLogo } from './CivicGuideLogo';
import { VoiceSearchButton } from './VoiceSearchButton';
import { LanguageService } from '../services/languageService';
import { rankSchemesForCitizen } from '../services/eligibilityEngine';

interface LandingPageViewProps {
  schemes: GovernmentScheme[];
  profile: CitizenProfile;
  currentLanguage: SupportedLanguage;
  onNavigateTab: (tab: string) => void;
  onSelectSchemeForDetails: (scheme: GovernmentScheme) => void;
  onSelectSchemeForDocuments: (scheme: GovernmentScheme) => void;
  onSelectSchemeForAi: (scheme: GovernmentScheme) => void;
  onOpenOnlyVoice: () => void;
  onOpenQuickAiHelp?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  schemes,
  profile,
  currentLanguage,
  onNavigateTab,
  onSelectSchemeForDetails,
  onSelectSchemeForDocuments,
  onSelectSchemeForAi,
  onOpenOnlyVoice,
  onOpenQuickAiHelp
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [speakingSchemeId, setSpeakingSchemeId] = useState<string | null>(null);

  // Quick Eligibility Interactive Calculator state
  const [calcAge, setCalcAge] = useState<number>(profile.age || 28);
  const [calcOccupation, setCalcOccupation] = useState<string>(profile.occupation || 'farmer');
  const [calcIncome, setCalcIncome] = useState<string>(profile.incomeCategory || 'below_1_lakh');
  const [calcState, setCalcState] = useState<string>(profile.state || 'Karnataka');

  // Calculate live matching count for quick calculator
  const previewProfile: CitizenProfile = {
    ...profile,
    age: Number(calcAge),
    occupation: calcOccupation as any,
    incomeCategory: calcIncome as any,
    state: calcState
  };
  const previewRanked = rankSchemesForCitizen(schemes, previewProfile);
  const eligibleCount = previewRanked.filter((r) => r.isRecommended).length;

  // Sectors definitions
  const sectors = [
    {
      id: 'Agriculture',
      name: 'Agriculture & Farmers',
      icon: Sprout,
      count: schemes.filter((s) => s.category === 'Agriculture').length,
      desc: 'Annual cash aid, crop insurance, subsidized fertilizers & farm equipment.',
      color: 'bg-[#16a34a]',
      bgLight: 'bg-[#f0fdf4] dark:bg-[#0f2918] border-[#bbf7d0] dark:border-[#1e4e2d] text-[#14532d] dark:text-[#86efac]'
    },
    {
      id: 'Education',
      name: 'Students & Education',
      icon: GraduationCap,
      count: schemes.filter((s) => s.category === 'Education').length,
      desc: 'Pre-matric & post-matric scholarships, merit stipends, tuition waivers.',
      color: 'bg-[#1d70b8]',
      bgLight: 'bg-[#f0f7ff] dark:bg-[#112338] border-[#d0e4ff] dark:border-[#1d4068] text-[#0f3460] dark:text-[#93c5fd]'
    },
    {
      id: 'Healthcare',
      name: 'Healthcare & Seniors',
      icon: HeartPulse,
      count: schemes.filter((s) => s.category === 'Healthcare' || s.category === 'Social_Welfare').length,
      desc: 'Ayushman Bharat cashless hospital treatment, senior citizen pensions.',
      color: 'bg-[#f27212]',
      bgLight: 'bg-[#fff7ed] dark:bg-[#2c170a] border-[#fed7aa] dark:border-[#52290d] text-[#9a3412] dark:text-[#fdba74]'
    },
    {
      id: 'Women_Empowerment',
      name: 'Women & Child Welfare',
      icon: Users,
      count: schemes.filter((s) => s.category === 'Women_Empowerment').length,
      desc: 'Sukanya Samriddhi high-interest savings, maternity nutrition assistance.',
      color: 'bg-[#80489c]',
      bgLight: 'bg-[#faf5ff] dark:bg-[#231230] border-[#e9d5ff] dark:border-[#452060] text-[#581c87] dark:text-[#d8b4fe]'
    },
    {
      id: 'Business_MSME',
      name: 'Micro Enterprises & MSME',
      icon: Briefcase,
      count: schemes.filter((s) => s.category === 'Business_MSME').length,
      desc: 'Collateral-free Mudra credit up to ₹10 Lakh, PMEGP capital subsidies.',
      color: 'bg-[#059669]',
      bgLight: 'bg-[#ecfdf5] dark:bg-[#0c2419] border-[#a7f3d0] dark:border-[#184e36] text-[#065f46] dark:text-[#6ee7b7]'
    },
    {
      id: 'Housing_Rural',
      name: 'Housing & Rural Infra',
      icon: Home,
      count: schemes.filter((s) => s.category === 'Housing_Rural').length,
      desc: 'Subsidized pucca houses, rooftop solar panels, clean tap water access.',
      color: 'bg-[#c87a53]',
      bgLight: 'bg-[#fbf5f0] dark:bg-[#281c15] border-[#f0ded5] dark:border-[#4a2e22] text-[#843c17] dark:text-[#f8b495]'
    }
  ];

  // Featured flagship schemes
  const flagshipSchemes = schemes.slice(0, 4);

  const handleSpeakScheme = (scheme: GovernmentScheme) => {
    if (speakingSchemeId === scheme.id) {
      LanguageService.stopSpeaking();
      setSpeakingSchemeId(null);
      return;
    }

    setSpeakingSchemeId(scheme.id);
    const audioText = `${scheme.name}. ${scheme.shortDescription}. Major benefits include: ${scheme.mainBenefits.join(', ')}. Target beneficiaries: ${scheme.targetBeneficiaries}. Official portal is ${scheme.applicationGuidance.officialPortalName}.`;
    
    LanguageService.speak(
      audioText,
      currentLanguage,
      () => setSpeakingSchemeId(scheme.id),
      () => setSpeakingSchemeId(null),
      () => setSpeakingSchemeId(null)
    );
  };

  const handleVoiceSearch = (text: string) => {
    setSearchQuery(text);
    onNavigateTab('explorer');
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. Hero Section with Brand Logo & Voice-First Search */}
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#38483b] via-[#2d3a2f] to-[#1f2820] text-white p-6 sm:p-10 lg:p-14 border border-[#2d3a2f] shadow-lg">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8ca38f]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#c87a53]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Official Emblem & Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CivicGuideLogo variant="horizontal" size="md" className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-xs border border-white/20" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8ede9]/15 text-[#e8ede9] text-xs font-semibold border border-[#8ca38f]/30">
              <ShieldCheck className="w-4 h-4 text-[#8ca38f]" />
              <span>National Citizen Welfare & Scheme Discovery Portal</span>
            </div>
          </div>

          {/* Display Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Discover Government Schemes You & Your Family Are Entitled To
            </h1>
            <p className="text-sm sm:text-base text-[#e8ede9]/85 max-w-2xl mx-auto leading-relaxed">
              Fast, transparent, and 100% free. Find student scholarships, farming subsidies, cashless hospital treatment, and business loans without middlemen fees or data leakage.
            </p>
          </div>

          {/* Voice-First Search Input Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white dark:bg-[#1a211b] rounded-full p-2 shadow-2xl border-2 border-[#8ca38f]/40 focus-within:border-[#c87a53] transition">
              <Search className="w-5 h-5 text-[#737067] ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    onNavigateTab('explorer');
                  }
                }}
                placeholder="Search schemes or tap mic to speak in your language..."
                className="w-full px-3 py-2 text-sm text-[#2c2c2c] dark:text-white placeholder-[#737067] bg-transparent focus:outline-hidden"
              />

              <div className="flex items-center gap-1.5 shrink-0 pr-1">
                <VoiceSearchButton
                  onTranscript={handleVoiceSearch}
                  language={currentLanguage}
                  size="md"
                  buttonText="Speak"
                />

                <button
                  type="button"
                  onClick={() => onNavigateTab('explorer')}
                  className="px-4 py-2 rounded-full bg-[#4a5d4e] hover:bg-[#3d4d40] text-white text-xs sm:text-sm font-semibold shadow-xs transition flex items-center gap-1"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick suggested searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-[#e8ede9]/90">
              <span className="text-[#8ca38f] text-[11px] font-semibold uppercase tracking-wider">
                Popular:
              </span>
              {['PM-KISAN', 'Ayushman Card', 'College Scholarship', 'Mudra Business Loan', 'Atal Pension'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term);
                    onNavigateTab('explorer');
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] transition text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenOnlyVoice}
              className="px-5 py-3 rounded-full bg-[#c87a53] hover:bg-[#b56b46] text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center gap-2 group transform active:scale-95"
            >
              <Headphones className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Only Voice Assistant (Hands-Free)</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('questionnaire')}
              className="px-5 py-3 rounded-full bg-white hover:bg-[#f4f1ea] text-[#4a5d4e] font-semibold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4 text-[#4a5d4e]" />
              <span>5-Question Eligibility Match</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('explorer')}
              className="px-4 py-3 rounded-full bg-[#253026] hover:bg-[#1d261e] text-[#e8ede9] border border-[#4a5d4e] text-xs sm:text-sm font-medium transition flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#8ca38f]" />
              <span>Browse All {schemes.length} Schemes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. The 5 Official Service Pillars (Direct from the Logo Poster) */}
      <section className="bg-white dark:bg-[#1f2620] rounded-[32px] p-6 sm:p-8 border border-[#e2dcd0] dark:border-[#38483b] shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-bold text-[#4a5d4e] dark:text-[#8ca38f] uppercase tracking-wider">
            • Discover • Match • Apply •
          </span>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2c2c2c] dark:text-white mt-1">
            How CivicGuide Delivers Transparent Welfare
          </h2>
          <p className="text-xs sm:text-sm text-[#737067] dark:text-[#94a3b8] mt-1">
            Built following the 5 core pillars to empower ordinary citizens with zero complexity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div
            onClick={() => onNavigateTab('explorer')}
            className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#112338] border border-[#d0e4ff] dark:border-[#1d4068] text-center flex flex-col items-center cursor-pointer hover:border-[#1d70b8] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1d70b8] text-white flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0f3460] dark:text-[#93c5fd]">1. Discover</h3>
            <p className="text-xs text-[#5c5953] dark:text-[#94a3b8] mt-1 leading-snug">
              Find schemes that fit your exact demographic needs across agriculture, health, education, and loans.
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('questionnaire')}
            className="p-4 rounded-2xl bg-[#f0fdf4] dark:bg-[#0f2918] border border-[#bbf7d0] dark:border-[#1e4e2d] text-center flex flex-col items-center cursor-pointer hover:border-[#16a34a] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#16a34a] text-white flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#14532d] dark:text-[#86efac]">2. Match</h3>
            <p className="text-xs text-[#5c5953] dark:text-[#94a3b8] mt-1 leading-snug">
              Instant rule-based matching against your income tier, category, age, and state requirements.
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('documents')}
            className="p-4 rounded-2xl bg-[#fff7ed] dark:bg-[#2c170a] border border-[#fed7aa] dark:border-[#52290d] text-center flex flex-col items-center cursor-pointer hover:border-[#f97316] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#f27212] text-white flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#9a3412] dark:text-[#fdba74]">3. Check</h3>
            <p className="text-xs text-[#5c5953] dark:text-[#94a3b8] mt-1 leading-snug">
              Check prerequisite certificates, income proofs, and eligibility documents in an offline checklist.
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('applications')}
            className="p-4 rounded-2xl bg-[#faf5ff] dark:bg-[#231230] border border-[#e9d5ff] dark:border-[#452060] text-center flex flex-col items-center cursor-pointer hover:border-[#9333ea] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#80489c] text-white flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#581c87] dark:text-[#d8b4fe]">4. Apply</h3>
            <p className="text-xs text-[#5c5953] dark:text-[#94a3b8] mt-1 leading-snug">
              Know how to apply via official ministry portals, local CSC desks, and track your application status.
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('about')}
            className="p-4 rounded-2xl bg-[#ecfdf5] dark:bg-[#0c2419] border border-[#a7f3d0] dark:border-[#184e36] text-center flex flex-col items-center cursor-pointer hover:border-[#059669] col-span-1 sm:col-span-2 lg:col-span-1 transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#065f46] dark:text-[#6ee7b7]">5. Trusted</h3>
            <p className="text-xs text-[#5c5953] dark:text-[#94a3b8] mt-1 leading-snug">
              Direct information from verified ministry gazettes. Strict anti-scam vigilance and no data selling.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Browse by Citizen Beneficiary Sectors */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-[#4a5d4e] dark:text-[#8ca38f] uppercase tracking-wider">
              Citizen Categories
            </span>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2c2c2c] dark:text-white">
              Explore Welfare by Beneficiary Sector
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('explorer')}
            className="text-xs font-semibold text-[#c87a53] hover:underline flex items-center gap-1 w-fit"
          >
            <span>View all sectors</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  onNavigateTab('explorer');
                }}
                className={`p-5 rounded-[28px] border transition cursor-pointer flex flex-col justify-between hover:shadow-md group ${sec.bgLight}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${sec.color} text-white flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white dark:bg-black/30 border border-current">
                      {sec.count} Schemes
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#2c2c2c] dark:text-white mb-1">
                    {sec.name}
                  </h3>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between text-xs font-semibold">
                  <span>Explore Schemes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Quick 1-Minute Eligibility Interactive Matcher */}
      <section className="bg-gradient-to-r from-[#f4f1ea] via-[#fcfbf7] to-[#edeae1] dark:from-[#253026] dark:via-[#1f2620] dark:to-[#181f19] rounded-[32px] p-6 sm:p-8 border border-[#e2dcd0] dark:border-[#38483b] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e8ede9] dark:bg-[#2d3a2f] text-[#4a5d4e] dark:text-[#8ca38f] text-xs font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>Instant 1-Minute Diagnostic Preview</span>
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2c2c2c] dark:text-white">
              See How Many Government Schemes Match You
            </h2>
            <p className="text-xs text-[#5c5953] dark:text-[#94a3b8] leading-relaxed">
              Adjust your profile details below to see instantaneous match results based on official rules. No personal phone numbers or ID required.
            </p>

            {/* Live Result Counter Box */}
            <div className="p-4 bg-white dark:bg-[#2d3a2f] rounded-2xl border border-[#e2dcd0] dark:border-[#38483b] flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-bold text-[#737067] dark:text-[#94a3b8] uppercase tracking-wider">
                  Calculated Matches
                </span>
                <div className="text-2xl font-serif font-bold text-[#4a5d4e] dark:text-[#8ca38f]">
                  {eligibleCount} Welfare Initiatives
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('questionnaire')}
                className="px-4 py-2 rounded-full bg-[#c87a53] hover:bg-[#b56b46] text-white text-xs font-semibold shadow-xs transition flex items-center gap-1"
              >
                <span>Full Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#1a211b] p-5 rounded-[24px] border border-[#e2dcd0] dark:border-[#38483b] shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#5c5953] dark:text-[#94a3b8] mb-1">
                  Citizen Age (Years): <strong className="text-[#2c2c2c] dark:text-white">{calcAge}</strong>
                </label>
                <input
                  type="range"
                  min={14}
                  max={80}
                  value={calcAge}
                  onChange={(e) => setCalcAge(Number(e.target.value))}
                  className="w-full accent-[#4a5d4e]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5c5953] dark:text-[#94a3b8] mb-1">
                  Occupation:
                </label>
                <select
                  value={calcOccupation}
                  onChange={(e) => setCalcOccupation(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-[#f4f1ea] dark:bg-[#253026] border border-[#e2dcd0] dark:border-[#38483b] text-[#2c2c2c] dark:text-white focus:outline-hidden"
                >
                  <option value="student">Student / Scholar</option>
                  <option value="farmer">Farmer / Landholder</option>
                  <option value="self_employed">Small Business / Trader</option>
                  <option value="daily_wage_laborer">Daily Wage Laborer</option>
                  <option value="homemaker">Homemaker</option>
                  <option value="unemployed">Job Seeker</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5c5953] dark:text-[#94a3b8] mb-1">
                  Annual Household Income:
                </label>
                <select
                  value={calcIncome}
                  onChange={(e) => setCalcIncome(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-[#f4f1ea] dark:bg-[#253026] border border-[#e2dcd0] dark:border-[#38483b] text-[#2c2c2c] dark:text-white focus:outline-hidden"
                >
                  <option value="below_1_lakh">Below ₹1 Lakh (BPL / EWS)</option>
                  <option value="1_to_3_lakh">₹1 Lakh to ₹3 Lakh</option>
                  <option value="3_to_6_lakh">₹3 Lakh to ₹6 Lakh</option>
                  <option value="above_6_lakh">Above ₹6 Lakh</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5c5953] dark:text-[#94a3b8] mb-1">
                  Domicile State:
                </label>
                <select
                  value={calcState}
                  onChange={(e) => setCalcState(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-[#f4f1ea] dark:bg-[#253026] border border-[#e2dcd0] dark:border-[#38483b] text-[#2c2c2c] dark:text-white focus:outline-hidden"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="All India">All India / Central</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e2dcd0] dark:border-[#38483b] flex items-center justify-between">
              <span className="text-[11px] text-[#737067] dark:text-[#94a3b8]">
                Instant calculations using deterministic rule engine
              </span>
              <button
                type="button"
                onClick={() => onNavigateTab('dashboard')}
                className="text-xs font-bold text-[#4a5d4e] dark:text-[#8ca38f] hover:underline"
              >
                View in Dashboard &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured National Flagship Welfare Initiatives */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#4a5d4e] dark:text-[#8ca38f] uppercase tracking-wider">
              Flagship Programs
            </span>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2c2c2c] dark:text-white">
              Featured National Welfare Schemes
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('explorer')}
            className="text-xs font-semibold text-[#c87a53] hover:underline flex items-center gap-1"
          >
            <span>View all schemes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flagshipSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white dark:bg-[#1f2620] rounded-[28px] p-5 sm:p-6 border border-[#e2dcd0] dark:border-[#38483b] shadow-xs flex flex-col justify-between hover:border-[#8ca38f] transition group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#e8ede9] dark:bg-[#2d3a2f] text-[#4a5d4e] dark:text-[#8ca38f] border border-[#d2ddd4] dark:border-[#38483b]">
                    {scheme.category.replace(/_/g, ' ')} • {scheme.level}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSpeakScheme(scheme)}
                    className={`p-1.5 rounded-full transition ${
                      speakingSchemeId === scheme.id
                        ? 'bg-[#c87a53] text-white animate-pulse'
                        : 'text-[#737067] hover:text-[#4a5d4e] bg-[#f4f1ea] dark:bg-[#253026]'
                    }`}
                    title="Listen to summary in audio"
                  >
                    {speakingSchemeId === scheme.id ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-[#c87a53]" />
                    )}
                  </button>
                </div>

                <h3 className="font-serif font-bold text-base sm:text-lg text-[#2c2c2c] dark:text-white group-hover:text-[#4a5d4e] dark:group-hover:text-[#8ca38f] transition">
                  {scheme.name}
                </h3>
                <p className="text-xs text-[#5c5953] dark:text-[#94a3b8] mt-1 line-clamp-2 leading-relaxed">
                  {scheme.shortDescription}
                </p>

                {/* Main Entitlements */}
                <div className="mt-3 p-3 rounded-2xl bg-[#fcfbf7] dark:bg-[#181f19] border border-[#e2dcd0] dark:border-[#38483b] space-y-1">
                  <span className="text-[10px] font-bold text-[#737067] dark:text-[#94a3b8] uppercase tracking-wider">
                    Key Entitlement:
                  </span>
                  <div className="text-xs font-semibold text-[#4a5d4e] dark:text-[#8ca38f]">
                    {scheme.mainBenefits[0]}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e2dcd0] dark:border-[#38483b] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSchemeForDocuments(scheme)}
                  className="text-xs font-semibold text-[#737067] dark:text-[#94a3b8] hover:text-[#2c2c2c] flex items-center gap-1"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-[#c87a53]" />
                  <span>Check Docs</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectSchemeForAi(scheme)}
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-[#4a5d4e] dark:text-[#8ca38f] hover:bg-[#edeae1] dark:hover:bg-[#2d3a2f] flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#c87a53]" />
                    <span>AI Simplify</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectSchemeForDetails(scheme)}
                    className="px-3.5 py-1.5 rounded-full bg-[#4a5d4e] hover:bg-[#3d4d40] text-white text-xs font-semibold shadow-xs transition flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Voice & Accessibility Callout Banner */}
      <section className="rounded-[32px] bg-[#fbf5f0] dark:bg-[#281c15] p-6 sm:p-8 border border-[#f0ded5] dark:border-[#4a2e22] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c87a53] uppercase tracking-wider">
              <Headphones className="w-4 h-4" />
              <span>Full Voice & Speech Accessibility</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2c2c2c] dark:text-white">
              Cannot Read or Prefer Speaking? Use "Only Voice" Mode
            </h3>
            <p className="text-xs sm:text-sm text-[#5c5953] dark:text-[#d1b8ab] leading-relaxed">
              CivicGuide supports voice search, voice translation, and continuous speech recognition in 7 Indian languages. Just tap the microphone, speak what you need, and listen to the steps read aloud.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenOnlyVoice}
              className="px-5 py-3 rounded-full bg-[#c87a53] hover:bg-[#b56b46] text-white text-xs sm:text-sm font-semibold shadow-md transition flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-white" />
              <span>Launch Only Voice Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Official Helplines & Anti-Fraud Notice */}
      <section className="bg-[#4a5d4e] text-white rounded-[28px] p-6 sm:p-8 shadow-xs border border-[#3d4d40] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#5d7361] pb-4">
          <div>
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8ca38f]" />
              <span>Official Citizen Safety & Anti-Fraud Notice</span>
            </h3>
            <p className="text-xs text-[#e8ede9]/80 mt-0.5">
              CivicGuide is an independent discovery tool. Never pay unauthorized intermediaries or share bank OTPs.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold w-fit">
            <span>Toll-Free National Helpline:</span>
            <strong className="text-amber-300">1915</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#3d4d40] border border-[#5d7361]">
            <span className="text-[#8ca38f] text-[10px] uppercase font-bold block">Kisan Call Centre</span>
            <strong className="text-white font-serif">1800-180-1551</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#3d4d40] border border-[#5d7361]">
            <span className="text-[#8ca38f] text-[10px] uppercase font-bold block">Ayushman PM-JAY</span>
            <strong className="text-white font-serif">14555 / 1800-111-565</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#3d4d40] border border-[#5d7361]">
            <span className="text-[#8ca38f] text-[10px] uppercase font-bold block">Cyber Crime Alert</span>
            <strong className="text-white font-serif">1930 / 155261</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#3d4d40] border border-[#5d7361]">
            <span className="text-[#8ca38f] text-[10px] uppercase font-bold block">National Scholarship</span>
            <strong className="text-white font-serif">0120-6619540</strong>
          </div>
        </div>
      </section>
    </div>
  );
};
