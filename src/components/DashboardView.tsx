import React from 'react';
import {
  Compass,
  FileCheck2,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building,
  User,
  ExternalLink,
  ChevronRight,
  Search,
  Target,
  Send
} from 'lucide-react';
import { CitizenProfile, GovernmentScheme } from '../types';
import { rankSchemesForCitizen } from '../services/eligibilityEngine';
import { StorageService } from '../services/storageService';
import { CivicGuideLogo } from './CivicGuideLogo';

interface DashboardViewProps {
  schemes: GovernmentScheme[];
  profile: CitizenProfile;
  onNavigateTab: (tab: string) => void;
  onOpenProfile: () => void;
  onSelectSchemeForDetails: (scheme: GovernmentScheme) => void;
  onSelectSchemeForDocuments: (scheme: GovernmentScheme) => void;
  onSelectSchemeForAi: (scheme: GovernmentScheme) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  schemes,
  profile,
  onNavigateTab,
  onOpenProfile,
  onSelectSchemeForDetails,
  onSelectSchemeForDocuments,
  onSelectSchemeForAi
}) => {
  // Rank schemes for citizen
  const ranked = rankSchemesForCitizen(schemes, profile);
  const topMatches = ranked.slice(0, 3);
  const totalRecommended = ranked.filter((r) => r.isRecommended).length;

  // Documents stats
  const docStatusMap = StorageService.getDocumentStatusMap();
  let totalTrackedDocs = 0;
  let availableDocs = 0;
  Object.values(docStatusMap).forEach((schemeMap) => {
    Object.values(schemeMap).forEach((st) => {
      totalTrackedDocs++;
      if (st === 'available') availableDocs++;
    });
  });

  // Application tracker stats
  const appRecords = StorageService.getApplicationRecords();
  const trackedCount = Object.keys(appRecords).length;

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-[#38483b] text-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-[#2d3a2f] relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#8ca38f]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <CivicGuideLogo variant="icon" size="sm" className="bg-white/10 p-1 rounded-2xl border border-white/20" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8ede9]/20 text-[#e8ede9] text-xs font-semibold border border-[#8ca38f]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8ca38f]" />
                <span>CivicGuide • Government Scheme & Service Finder</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white">
              Welcome back, {profile.fullName || 'Citizen'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#e8ede9]/80 leading-relaxed">
              Find scholarships, agricultural subsidies, healthcare coverage, and enterprise loans matching your demographic profile. Everything runs transparently without paid APIs or data leakage.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('questionnaire')}
                className="px-5 py-2.5 bg-[#c87a53] hover:bg-[#b56b46] text-white font-medium text-xs sm:text-sm rounded-full shadow-xs transition flex items-center gap-2"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Start New Questionnaire</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab('explorer')}
                className="px-4 py-2.5 bg-[#2d3a2f] hover:bg-[#253026] text-[#e8ede9] text-xs sm:text-sm font-medium rounded-full border border-[#4a5d4e] transition flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-[#8ca38f]" />
                <span>Browse All Schemes</span>
              </button>
            </div>
          </div>

          {/* Active Citizen Profile Snapshot Card */}
          <div className="bg-[#2d3a2f]/90 backdrop-blur-xs p-5 rounded-[24px] border border-[#4a5d4e]/60 text-left min-w-[260px] sm:w-72 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#8ca38f] uppercase tracking-wider">
                Active Profile
              </span>
              <button
                onClick={onOpenProfile}
                className="text-[11px] text-[#c87a53] hover:text-[#dda184] font-semibold"
              >
                Switch Role
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#c87a53] flex items-center justify-center font-serif font-bold text-base text-white shadow-xs">
                {profile.fullName ? profile.fullName.charAt(0) : 'U'}
              </div>
              <div>
                <div className="font-semibold text-sm text-white truncate max-w-[160px]">
                  {profile.fullName || 'Citizen'}
                </div>
                <div className="text-xs text-[#8ca38f]">
                  {profile.age} yrs • {profile.occupation.replace(/_/g, ' ')}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#e8ede9]/90 pt-2 border-t border-[#4a5d4e]/40">
              <div className="flex justify-between">
                <span className="text-[#8ca38f]">State:</span>
                <span className="font-medium">{profile.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8ca38f]">Income Bracket:</span>
                <span className="font-medium">{profile.incomeCategory.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8ca38f]">Area:</span>
                <span className="font-medium capitalize">{profile.area}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Official Service Pillars Banner (from Logo) */}
      <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#e2dcd0] shadow-xs">
        <div className="text-center mb-3">
          <span className="text-[11px] font-bold text-[#4a5d4e] uppercase tracking-wider">
            • discover • Match • Apply •
          </span>
          <p className="text-xs text-[#737067] mt-0.5">
            How CivicGuide connects you to verified central and state welfare benefits
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div
            onClick={() => onNavigateTab('explorer')}
            className="p-3 rounded-2xl bg-[#f0f7ff] dark:bg-[#112338] border border-[#d0e4ff] dark:border-[#1d4068] text-center flex flex-col items-center cursor-pointer hover:border-[#1d70b8] transition"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1d70b8] text-white flex items-center justify-center mb-2 shadow-xs">
              <Search className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-[#0f3460] dark:text-[#93c5fd]">Discover</div>
            <p className="text-[10px] text-[#5c5953] dark:text-[#94a3b8] mt-0.5 leading-snug">
              Find schemes that fit your needs
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('questionnaire')}
            className="p-3 rounded-2xl bg-[#f0fdf4] dark:bg-[#0f2918] border border-[#bbf7d0] dark:border-[#1e4e2d] text-center flex flex-col items-center cursor-pointer hover:border-[#16a34a] transition"
          >
            <div className="w-8 h-8 rounded-xl bg-[#16a34a] text-white flex items-center justify-center mb-2 shadow-xs">
              <Target className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-[#14532d] dark:text-[#86efac]">Match</div>
            <p className="text-[10px] text-[#5c5953] dark:text-[#94a3b8] mt-0.5 leading-snug">
              Get matched with relevant schemes
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('documents')}
            className="p-3 rounded-2xl bg-[#fff7ed] dark:bg-[#2c170a] border border-[#fed7aa] dark:border-[#52290d] text-center flex flex-col items-center cursor-pointer hover:border-[#f97316] transition"
          >
            <div className="w-8 h-8 rounded-xl bg-[#f27212] text-white flex items-center justify-center mb-2 shadow-xs">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-[#9a3412] dark:text-[#fdba74]">Check</div>
            <p className="text-[10px] text-[#5c5953] dark:text-[#94a3b8] mt-0.5 leading-snug">
              Check eligibility & required docs
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('applications')}
            className="p-3 rounded-2xl bg-[#faf5ff] dark:bg-[#231230] border border-[#e9d5ff] dark:border-[#452060] text-center flex flex-col items-center cursor-pointer hover:border-[#9333ea] transition"
          >
            <div className="w-8 h-8 rounded-xl bg-[#80489c] text-white flex items-center justify-center mb-2 shadow-xs">
              <Send className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-[#581c87] dark:text-[#d8b4fe]">Apply</div>
            <p className="text-[10px] text-[#5c5953] dark:text-[#94a3b8] mt-0.5 leading-snug">
              Know how to apply and track status
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('about')}
            className="p-3 rounded-2xl bg-[#ecfdf5] dark:bg-[#0c2419] border border-[#a7f3d0] dark:border-[#184e36] text-center flex flex-col items-center cursor-pointer hover:border-[#059669] col-span-2 sm:col-span-1 transition"
          >
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center mb-2 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-[#065f46] dark:text-[#6ee7b7]">Trusted</div>
            <p className="text-[10px] text-[#5c5953] dark:text-[#94a3b8] mt-0.5 leading-snug">
              Information from trusted sources
            </p>
          </div>
        </div>
      </div>

      {/* 4 Quick Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => onNavigateTab('questionnaire')}
          className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#e2dcd0] shadow-xs hover:border-[#8ca38f] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#737067]">Matching Schemes</span>
            <div className="p-2 rounded-xl bg-[#e8ede9] text-[#4a5d4e] group-hover:bg-[#d9e3db] transition">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#4a5d4e]">{totalRecommended}</div>
          <div className="text-[11px] text-[#4a5d4e] font-medium mt-1">
            Based on your demographic profile
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('explorer')}
          className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#e2dcd0] shadow-xs hover:border-[#8ca38f] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#737067]">Verified Catalog</span>
            <div className="p-2 rounded-xl bg-[#f4f1ea] text-[#4a5d4e] group-hover:bg-[#edeae1] transition">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2c2c2c]">{schemes.length}</div>
          <div className="text-[11px] text-[#737067] mt-1">Central & State Initiatives</div>
        </div>

        <div
          onClick={() => onNavigateTab('documents')}
          className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#e2dcd0] shadow-xs hover:border-[#8ca38f] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#737067]">Documents Tracked</span>
            <div className="p-2 rounded-xl bg-[#fbf5f0] text-[#c87a53] group-hover:bg-[#f5e6de] transition">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#c87a53]">
            {availableDocs} / {totalTrackedDocs || 9}
          </div>
          <div className="text-[11px] text-[#c87a53] font-medium mt-1">
            Ready in personal checklist
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('applications')}
          className="bg-white p-4 sm:p-5 rounded-[24px] border border-[#e2dcd0] shadow-xs hover:border-[#8ca38f] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#737067]">Tracked Applications</span>
            <div className="p-2 rounded-xl bg-[#e8ede9] text-[#8ca38f] group-hover:bg-[#d9e3db] transition">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#4a5d4e]">{trackedCount}</div>
          <div className="text-[11px] text-[#4a5d4e] font-medium mt-1">
            In simulated progress pipeline
          </div>
        </div>
      </div>

      {/* Top 3 Recommended Schemes for You */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0] space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4a5d4e]">Top Schemes Matched to Your Profile</h2>
            <p className="text-xs text-[#737067]">
              Evaluated against your age ({profile.age}), occupation ({profile.occupation}), and income criteria.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('questionnaire')}
            className="text-xs font-semibold text-[#c87a53] hover:text-[#b56b46] flex items-center gap-1"
          >
            <span>See All Matches</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topMatches.map(({ scheme, matchScore, reasons }) => (
            <div
              key={scheme.id}
              className="p-5 rounded-[28px] border border-[#e2dcd0] bg-[#fdfcf9] hover:bg-white hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#e8ede9] text-[#4a5d4e]">
                    {scheme.category}
                  </span>
                  <span className="text-xs font-semibold text-[#8ca38f]">{matchScore}% Match</span>
                </div>

                <h3
                  onClick={() => onSelectSchemeForDetails(scheme)}
                  className="font-serif font-bold text-base text-[#2c2c2c] hover:text-[#4a5d4e] cursor-pointer line-clamp-1"
                >
                  {scheme.name}
                </h3>
                <p className="text-xs text-[#737067] mt-1 line-clamp-2 leading-relaxed">
                  {scheme.shortDescription}
                </p>

                <div className="mt-4 text-xs text-[#2c2c2c] space-y-1.5 bg-[#f9f7f2] p-3 rounded-2xl border border-[#e2dcd0]">
                  <div className="text-[11px] font-semibold text-[#4a5d4e]">Why matched:</div>
                  <div className="text-[11px] text-[#5c5953] flex items-center gap-1.5">
                    <span className="text-[#8ca38f] font-bold">✓</span>
                    <span className="line-clamp-1">{reasons[0]?.detail || 'Compatible criteria'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#e2dcd0] flex items-center justify-between">
                <button
                  onClick={() => onSelectSchemeForDetails(scheme)}
                  className="text-xs font-medium text-[#4a5d4e] hover:text-[#c87a53] transition"
                >
                  View Details
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectSchemeForAi(scheme)}
                    className="px-2.5 py-1 text-[11px] font-medium bg-[#fbf5f0] text-[#c87a53] border border-[#f0ded5] rounded-full hover:bg-[#f5e6de] transition"
                  >
                    AI Explain
                  </button>
                  <button
                    onClick={() => onSelectSchemeForDocuments(scheme)}
                    className="px-3 py-1 text-[11px] font-medium bg-[#4a5d4e] hover:bg-[#364539] text-white rounded-full transition"
                  >
                    Check Docs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Exploration Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => onNavigateTab('questionnaire')}
          className="p-6 bg-white border border-[#e2dcd0] rounded-[32px] cursor-pointer hover:shadow-md hover:border-[#8ca38f] transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#e8ede9] flex items-center justify-center text-[#4a5d4e] mb-4 group-hover:bg-[#d9e3db] transition">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#4a5d4e]">Eligibility Diagnostic</h3>
            <p className="text-xs text-[#737067] mt-1.5 leading-relaxed">
              Step through our 5-question wizard to find subsidies and grants tailored to your family.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#c87a53] group-hover:translate-x-0.5 transition-transform">
            <span>Take Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('documents')}
          className="p-6 bg-[#f9f7f2] border border-[#e2dcd0] rounded-[32px] cursor-pointer hover:shadow-md hover:border-[#8ca38f] transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#edeae1] flex items-center justify-center text-[#4a5d4e] mb-4 group-hover:bg-[#e2dcd0] transition">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2c2c2c]">Paperwork Preparedness</h3>
            <p className="text-xs text-[#737067] mt-1.5 leading-relaxed">
              Verify your documents offline without sharing sensitive copies or personal data.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#4a5d4e] group-hover:translate-x-0.5 transition-transform">
            <span>Checklist Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('ai-assist')}
          className="p-6 bg-[#fdfcf9] border border-[#e2dcd0] rounded-[32px] cursor-pointer hover:shadow-md hover:border-[#c87a53] transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#fbf5f0] flex items-center justify-center text-[#c87a53] mb-4 group-hover:bg-[#f5e6de] transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#c87a53]">Plain-Language AI Explainer</h3>
            <p className="text-xs text-[#737067] mt-1.5 leading-relaxed">
              Translate complex ministry gazettes and circulars into simple everyday language.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#c87a53] group-hover:translate-x-0.5 transition-transform">
            <span>Ask Explainer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
