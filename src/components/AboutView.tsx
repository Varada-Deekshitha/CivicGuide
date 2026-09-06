import React from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
  Code2,
  HelpCircle,
  FileCheck2,
  Lock,
  Sparkles,
  Search,
  Target,
  Send
} from 'lucide-react';
import { CivicGuideLogo } from './CivicGuideLogo';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Header with Brand Emblem */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-[#e2dcd0]">
          <CivicGuideLogo variant="horizontal" size="md" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8ede9] text-[#4a5d4e] border border-[#d2ddd4] text-xs font-semibold w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Welfare Discovery Portal</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#4a5d4e]">
          About CivicGuide
        </h1>
        <p className="text-xs text-[#737067] mt-0.5">
          Citizen Public Service & Government Scheme Discovery Platform
        </p>

        <p className="text-xs sm:text-sm text-[#5c5953] leading-relaxed mt-4">
          Hundreds of public welfare schemes are launched by Central and State ministries across India each year—providing subsidized healthcare, student scholarships, farm equipment incentives, skill development programs, and low-interest credit for micro-enterprises. However, millions of citizens miss out due to complex official circulars, unclear eligibility requirements, and lack of document readiness.
        </p>

        <p className="text-xs sm:text-sm text-[#5c5953] leading-relaxed mt-2">
          <strong className="text-[#2c2c2c]">CivicGuide</strong> solves this gap by translating bureaucratic requirements into an intuitive, transparent citizen-first experience with multilingual speech recognition, real-time voice translation, and role-based administration.
        </p>
      </div>

      {/* Core Architectural Tenets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-[#e2dcd0] space-y-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-[#e8ede9] text-[#4a5d4e] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2c2c2c]">100% Client-Side Privacy</h3>
          <p className="text-xs text-[#737067] leading-relaxed">
            No Aadhaar cards, bank account numbers, or certificates are ever uploaded. All profile details and document checklists are processed and stored locally inside your web browser.
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-[#e2dcd0] space-y-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-[#f4f1ea] text-[#5c5953] flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2c2c2c]">Deterministic Rule Matching</h3>
          <p className="text-xs text-[#737067] leading-relaxed">
            Scheme recommendations are calculated using explicit rule logic (age boundaries, occupation categories, income ceilings) ensuring complete transparency and zero paid API dependence.
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-[#e2dcd0] space-y-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-[#fbf5f0] text-[#c87a53] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2c2c2c]">Optional AI Simplifier</h3>
          <p className="text-xs text-[#737067] leading-relaxed">
            Google AI Studio / Gemini 3.8 Flash powers plain-language summaries and application walkthroughs, with intelligent client-side fallbacks if disconnected or offline.
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-[#e2dcd0] space-y-2.5 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-[#fbf5f0] text-[#c87a53] flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-sm font-bold text-[#2c2c2c]">Anti-Scam Citizen Guidance</h3>
          <p className="text-xs text-[#737067] leading-relaxed">
            Always reminds citizens never to share OTPs, pay unauthorized intermediaries, or trust unverified fake websites mimicking official government domains.
          </p>
        </div>
      </div>

      {/* The 5 Pillars of CivicGuide (from Logo) */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif font-bold text-[#4a5d4e]">
              The 5 Service Pillars • Discover • Match • Apply
            </h2>
            <p className="text-xs text-[#737067] mt-0.5">
              Core design philosophy featured in our official identity and workflow
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl bg-[#f0f7ff] border border-[#d0e4ff] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#1d70b8] text-white flex items-center justify-center mb-2 shadow-xs">
              <Search className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-xs text-[#0f3460]">1. Discover</h4>
            <p className="text-[11px] text-[#5c5953] mt-1 leading-snug">
              Find schemes that fit your exact demographic needs across all sectors.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#16a34a] text-white flex items-center justify-center mb-2 shadow-xs">
              <Target className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-xs text-[#14532d]">2. Match</h4>
            <p className="text-[11px] text-[#5c5953] mt-1 leading-snug">
              Instant rule matching against income, caste category, state, and age.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#f27212] text-white flex items-center justify-center mb-2 shadow-xs">
              <FileCheck2 className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-xs text-[#9a3412]">3. Check</h4>
            <p className="text-[11px] text-[#5c5953] mt-1 leading-snug">
              Check prerequisite certificates and documents in your offline checklist.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf5ff] border border-[#e9d5ff] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#80489c] text-white flex items-center justify-center mb-2 shadow-xs">
              <Send className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-xs text-[#581c87]">4. Apply</h4>
            <p className="text-[11px] text-[#5c5953] mt-1 leading-snug">
              Step-by-step guidance on official portals, offline CSC desks, and application tracking.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] text-center flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#059669] text-white flex items-center justify-center mb-2 shadow-xs">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-xs text-[#065f46]">5. Trusted</h4>
            <p className="text-[11px] text-[#5c5953] mt-1 leading-snug">
              Verified ministry sources, anti-fraud vigilance, and zero data leakage.
            </p>
          </div>
        </div>
      </div>

      {/* Citizen FAQs */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0] space-y-5">
        <h2 className="text-base font-serif font-bold text-[#4a5d4e] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#8ca38f]" />
          <span>Frequently Asked Citizen Questions</span>
        </h2>

        <div className="space-y-3.5">
          <div className="p-4 sm:p-5 bg-[#f9f7f2] rounded-2xl border border-[#e2dcd0]">
            <h4 className="text-xs font-serif font-bold text-[#2c2c2c] mb-1">
              Does CivicGuide guarantee that my application will be approved?
            </h4>
            <p className="text-xs text-[#5c5953] leading-relaxed">
              No. CivicGuide provides discovery and eligibility diagnostics based on the answers you enter. Final verification, document authentication, and sanctioning are solely performed by the respective government department or nodal authority.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-[#f9f7f2] rounded-2xl border border-[#e2dcd0]">
            <h4 className="text-xs font-serif font-bold text-[#2c2c2c] mb-1">
              How do I apply if I don't have internet access or a smartphone?
            </h4>
            <p className="text-xs text-[#5c5953] leading-relaxed">
              You can visit your nearest <strong>Common Service Centre (CSC)</strong>, Gram Panchayat Seva Kendra, or Cyber Kiosk. Village Level Entrepreneurs (VLEs) are authorized to assist with biometric eKYC, digital scanning, and application submission for small statutory fees.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-[#f9f7f2] rounded-2xl border border-[#e2dcd0]">
            <h4 className="text-xs font-serif font-bold text-[#2c2c2c] mb-1">
              What is DigiLocker and should I use it?
            </h4>
            <p className="text-xs text-[#5c5953] leading-relaxed">
              Yes. DigiLocker (digilocker.gov.in) is the Government of India's official cloud storage for electronic documents. You can digitally fetch authentic copies of your Aadhaar, driving license, marksheet, and vehicle registration directly into government scheme portals without physical paper submissions.
            </p>
          </div>
        </div>
      </div>

      {/* National Portal Links */}
      <div className="bg-[#4a5d4e] text-white rounded-[28px] p-6 sm:p-8 shadow-xs border border-[#3d4d40] space-y-4">
        <h3 className="text-xs font-bold text-[#8ca38f] uppercase tracking-wider">
          Official National Public Portals
        </h3>
        <p className="text-xs text-[#e8ede9]/90">
          Official Government of India portals for citizens:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://www.myscheme.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-[#3a493d] hover:bg-[#2e3b31] rounded-2xl border border-[#5c6f60] flex items-center justify-between transition"
          >
            <div>
              <div className="text-xs font-serif font-bold text-white">myScheme Portal</div>
              <div className="text-[10px] text-[#8ca38f]">myscheme.gov.in</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#8ca38f]" />
          </a>

          <a
            href="https://web.umang.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-[#3a493d] hover:bg-[#2e3b31] rounded-2xl border border-[#5c6f60] flex items-center justify-between transition"
          >
            <div>
              <div className="text-xs font-serif font-bold text-white">UMANG Mobile App</div>
              <div className="text-[10px] text-[#8ca38f]">umang.gov.in</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#8ca38f]" />
          </a>

          <a
            href="https://pgportal.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-[#3a493d] hover:bg-[#2e3b31] rounded-2xl border border-[#5c6f60] flex items-center justify-between transition"
          >
            <div>
              <div className="text-xs font-serif font-bold text-white">CPGRAMS Grievance</div>
              <div className="text-[10px] text-[#8ca38f]">pgportal.gov.in</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#8ca38f]" />
          </a>
        </div>
      </div>
    </div>
  );
};
