import React from 'react';
import { Building2, ShieldCheck, Heart, Sparkles, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenProfile }) => {
  return (
    <footer className="bg-[#f4f1ea] text-[#5c5953] text-xs border-t border-[#e2dcd0] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 font-serif text-[#4a5d4e] font-extrabold text-lg">
              <div className="w-7 h-7 rounded-lg bg-[#c87a53] flex items-center justify-center text-white text-sm font-bold">
                C
              </div>
              <span>CivicGuide</span>
            </div>
            <p className="text-[11px] text-[#6b665c] leading-relaxed">
              Empowering Indian citizens with transparent eligibility discovery, document preparedness checklists, and plain-language AI guidance for public welfare schemes.
            </p>
            <div className="text-[11px] text-[#4a5d4e] flex items-center gap-1.5 font-semibold bg-[#e8ede9] px-2.5 py-1 rounded-full w-fit border border-[#d2ddd4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4a5d4e]" />
              <span>Offline-first & Privacy Protected</span>
            </div>
          </div>

          {/* Core Modules Navigation */}
          <div className="space-y-2">
            <div className="text-[#4a5d4e] font-bold text-xs uppercase tracking-wider">
              Core Features
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => onNavigateTab('dashboard')}
                  className="hover:text-[#c87a53] transition"
                >
                  Citizen Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('questionnaire')}
                  className="hover:text-[#c87a53] transition"
                >
                  Eligibility Diagnostic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('explorer')}
                  className="hover:text-[#c87a53] transition"
                >
                  Schemes Explorer (10 Schemes)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('documents')}
                  className="hover:text-[#c87a53] transition"
                >
                  Document Readiness Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('applications')}
                  className="hover:text-[#c87a53] transition"
                >
                  Simulated Application Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Citizen Assistance & AI */}
          <div className="space-y-2">
            <div className="text-[#4a5d4e] font-bold text-xs uppercase tracking-wider">
              Assistance & Tools
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => onNavigateTab('ai-assist')}
                  className="hover:text-[#c87a53] transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#c87a53]" />
                  <span>AI Plain-Language Explainer</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenProfile} className="hover:text-[#c87a53] transition">
                  Change Demo Citizen Persona
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('about')}
                  className="hover:text-[#c87a53] transition"
                >
                  Citizen FAQs & Security Charter
                </button>
              </li>
              <li>
                <a
                  href="https://www.myscheme.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c87a53] transition"
                >
                  myScheme.gov.in (Official Portal)
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimers & Helplines */}
          <div className="space-y-2">
            <div className="text-[#4a5d4e] font-bold text-xs uppercase tracking-wider">
              Citizen Helplines
            </div>
            <div className="space-y-1.5 text-[11px] text-[#5c5953]">
              <div>
                <strong className="text-[#737067]">National Consumer / Grievance:</strong>{' '}
                <span className="text-[#c87a53] font-bold">1915</span>
              </div>
              <div>
                <strong className="text-[#737067]">Ayushman Bharat:</strong>{' '}
                <span className="text-[#4a5d4e] font-bold">14555</span>
              </div>
              <div>
                <strong className="text-[#737067]">PM-KISAN DBT Helpline:</strong>{' '}
                <span className="text-[#4a5d4e] font-bold">155261</span>
              </div>
              <div>
                <strong className="text-[#737067]">Cyber Crime Helpline:</strong>{' '}
                <span className="text-[#c87a53] font-bold">1930</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Mandatory Academic & MVP Disclaimer */}
        <div className="pt-6 border-t border-[#e2dcd0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#737067]">
          <div>
            CivicGuide MVP • Developed as a Computer Science Engineering AI Vibe Coding Project.
          </div>
          <div className="italic">
            Disclamer: Eligibility recommendations are indicative. Please verify official requirements on government portals.
          </div>
        </div>
      </div>
    </footer>
  );
};
