import React from 'react';
import {
  X,
  Building,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  IndianRupee,
  CheckCircle2,
  Send,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { GovernmentScheme, CitizenProfile, SupportedLanguage } from '../types';
import { VoiceSpeakerButton } from './VoiceSpeakerButton';

interface SchemeDetailsModalProps {
  scheme: GovernmentScheme | null;
  profile: CitizenProfile;
  currentLanguage?: SupportedLanguage;
  onClose: () => void;
  onOpenDocuments: (scheme: GovernmentScheme) => void;
  onOpenAi: (scheme: GovernmentScheme) => void;
  onOpenApply: (scheme: GovernmentScheme) => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({
  scheme,
  profile,
  currentLanguage = 'en',
  onClose,
  onOpenDocuments,
  onOpenAi,
  onOpenApply
}) => {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2c2c2c]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#fcfbf7] rounded-[32px] shadow-2xl max-w-3xl w-full border border-[#e2dcd0] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#4a5d4e] text-white px-6 sm:px-8 py-5 flex items-start justify-between gap-4 shrink-0 border-b border-[#3d4d40]">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-[11px] font-semibold px-3 py-0.5 rounded-full bg-[#3a493d] text-[#e8ede9] border border-[#8ca38f]/40">
                {scheme.category}
              </span>
              <span className="text-[11px] text-[#e8ede9]/90 bg-[#3a493d] px-2.5 py-0.5 rounded-full border border-[#8ca38f]/30">
                {scheme.level} Scheme
              </span>
              <span className="text-[11px] text-[#8ca38f] font-medium">
                {scheme.ministry}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold leading-snug text-white">{scheme.name}</h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <VoiceSpeakerButton
              textToSpeak={`${scheme.name}. ${scheme.shortDescription}. Benefits include: ${scheme.mainBenefits.join('. ')}. Eligibility: ${scheme.basicEligibilitySummary}`}
              language={currentLanguage}
              label="Listen"
              size="sm"
            />
            <button
              onClick={onClose}
              className="text-[#e8ede9]/80 hover:text-white p-1 rounded-full transition shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-[#737067] uppercase tracking-wider mb-1.5">
              Scheme Description & Purpose
            </h3>
            <p className="text-xs sm:text-sm text-[#5c5953] leading-relaxed">
              {scheme.fullDescription}
            </p>
          </div>

          {/* Key Benefits */}
          <div className="p-5 bg-white rounded-2xl border border-[#e2dcd0] shadow-xs">
            <h3 className="text-xs font-serif font-bold text-[#4a5d4e] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8ca38f]" />
              <span>Key Citizen Entitlements & Financial Benefits</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#2c2c2c]">
              {scheme.mainBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#4a5d4e] font-bold shrink-0">✔</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Beneficiaries & Eligibility Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#e2dcd0] shadow-xs">
              <h4 className="text-xs font-serif font-bold text-[#4a5d4e] mb-1">Target Beneficiaries</h4>
              <p className="text-xs text-[#5c5953] leading-relaxed">
                {scheme.targetBeneficiaries}
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#e2dcd0] shadow-xs">
              <h4 className="text-xs font-serif font-bold text-[#4a5d4e] mb-1">Basic Eligibility Summary</h4>
              <p className="text-xs text-[#5c5953] leading-relaxed">
                {scheme.basicEligibilitySummary}
              </p>
            </div>
          </div>

          {/* Structured Eligibility Rules Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-[#737067] uppercase tracking-wider mb-2">
              Eligibility Matrix
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#e2dcd0] shadow-xs">
                <span className="text-[10px] text-[#737067] block">Age Range:</span>
                <span className="font-bold text-[#2c2c2c]">
                  {scheme.eligibilityRules.minAge ?? 'None'} – {scheme.eligibilityRules.maxAge ?? 'No upper limit'} yrs
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#e2dcd0] shadow-xs">
                <span className="text-[10px] text-[#737067] block">Area Focus:</span>
                <span className="font-bold text-[#2c2c2c] capitalize">
                  {scheme.eligibilityRules.areaEligibility?.join(', ') || 'All Areas'}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#e2dcd0] shadow-xs">
                <span className="text-[10px] text-[#737067] block">Fee / Cost:</span>
                <span className="font-bold text-[#4a5d4e]">
                  {scheme.applicationGuidance.fee}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#e2dcd0] shadow-xs">
                <span className="text-[10px] text-[#737067] block">Processing Time:</span>
                <span className="font-bold text-[#2c2c2c]">
                  {scheme.applicationGuidance.processingTimeline}
                </span>
              </div>
            </div>
          </div>

          {/* Required Documents Summary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#737067] uppercase tracking-wider">
                Required Documents ({scheme.requiredDocuments.length})
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onOpenDocuments(scheme);
                }}
                className="text-xs font-medium text-[#c87a53] hover:text-[#b56b46] transition"
              >
                Open Interactive Checklist →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scheme.requiredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl border border-[#e2dcd0] bg-white flex items-start gap-2.5 text-xs shadow-xs"
                >
                  <FileCheck2 className="w-4 h-4 text-[#4a5d4e] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#2c2c2c]">{doc.name}</div>
                    <div className="text-[10px] text-[#737067]">
                      {doc.mandatory ? 'Mandatory' : 'Conditional'} • {doc.issuingAuthority || 'Govt'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Portal & Contact */}
          <div className="p-5 bg-[#4a5d4e] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs border border-[#3d4d40]">
            <div>
              <div className="text-xs text-[#e8ede9]/80">Official Portal & Helpline:</div>
              <div className="text-sm font-serif font-bold text-white mt-0.5">
                {scheme.applicationGuidance.officialPortalName}
              </div>
              <div className="text-xs text-[#8ca38f] mt-0.5 flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3 text-[#8ca38f]" />
                <span>Helpline: {scheme.applicationGuidance.helpline}</span>
              </div>
            </div>

            <a
              href={scheme.applicationGuidance.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#c87a53] hover:bg-[#b56b46] text-white text-xs font-medium rounded-full flex items-center gap-1.5 transition shrink-0 shadow-xs"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#f4f1ea] border-t border-[#e2dcd0] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenAi(scheme);
            }}
            className="px-4 py-2 bg-white hover:bg-[#edeae1] text-[#4a5d4e] border border-[#e2dcd0] rounded-full text-xs font-medium flex items-center gap-1.5 transition shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c87a53]" />
            <span>AI Plain-Language Explainer</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenDocuments(scheme);
              }}
              className="px-4 py-2 bg-white hover:bg-[#edeae1] text-[#5c5953] border border-[#e2dcd0] rounded-full text-xs font-medium flex items-center gap-1.5 transition shadow-xs"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#8ca38f]" />
              <span>Document Checklist</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenApply(scheme);
              }}
              className="px-5 py-2 bg-[#4a5d4e] hover:bg-[#3d4d40] text-white rounded-full text-xs font-medium shadow-xs flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Apply & Track</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
