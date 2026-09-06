import React, { useState, useEffect } from 'react';
import {
  Building2,
  Compass,
  FileCheck2,
  HelpCircle,
  Sparkles,
  User,
  PhoneCall,
  X,
  Menu,
  CheckCircle2,
  Layers,
  ClipboardList,
  ShieldCheck,
  Languages,
  Mic,
  LogIn,
  LogOut,
  ChevronDown,
  Megaphone,
  Sun,
  Moon,
  Home,
  Headphones
} from 'lucide-react';
import { CitizenProfile, UserAccount, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, LanguageService } from '../services/languageService';
import { CivicGuideLogo } from './CivicGuideLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: CitizenProfile;
  currentUser: UserAccount | null;
  currentLanguage: SupportedLanguage;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenProfileModal: () => void;
  onOpenAuthModal: () => void;
  onOpenVoiceTranslateModal: () => void;
  onOpenOnlyVoice?: () => void;
  onLogout: () => void;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  currentUser,
  currentLanguage,
  theme,
  onToggleTheme,
  onOpenProfileModal,
  onOpenAuthModal,
  onOpenVoiceTranslateModal,
  onOpenOnlyVoice,
  onLogout,
  onSelectLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helplineModalOpen, setHelplineModalOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [broadcast, setBroadcast] = useState<string | null>(() => {
    return localStorage.getItem('civicguide_broadcast');
  });

  useEffect(() => {
    const handleStorage = () => {
      setBroadcast(localStorage.getItem('civicguide_broadcast'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const navItems = [
    { id: 'home', label: LanguageService.translate('navHome', currentLanguage) || 'Home', icon: Home },
    { id: 'dashboard', label: LanguageService.translate('navDashboard', currentLanguage), icon: Layers },
    { id: 'questionnaire', label: LanguageService.translate('navEligibility', currentLanguage), icon: ClipboardList, badge: 'Match' },
    { id: 'explorer', label: LanguageService.translate('navExplorer', currentLanguage), icon: Compass },
    { id: 'documents', label: LanguageService.translate('navDocuments', currentLanguage), icon: FileCheck2 },
    { id: 'applications', label: LanguageService.translate('navTracker', currentLanguage), icon: CheckCircle2 },
    { id: 'ai-assist', label: LanguageService.translate('navAiExplainer', currentLanguage), icon: Sparkles, badge: 'Voice AI' },
    { id: 'about', label: LanguageService.translate('navAbout', currentLanguage), icon: HelpCircle }
  ];

  // If user is Admin, add Admin Portal tab
  if (currentUser?.role === 'admin') {
    navItems.push({
      id: 'admin',
      label: LanguageService.translate('navAdmin', currentLanguage),
      icon: ShieldCheck,
      badge: 'Officer'
    });
  }

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f4f1ea] text-[#2c2c2c] shadow-xs border-b border-[#e2dcd0]">
        {/* Public Citizen Broadcast Announcement if present */}
        {broadcast && (
          <div className="bg-[#4a5d4e] text-white px-4 py-1.5 text-xs text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#3d4d40]">
            <Megaphone className="w-3.5 h-3.5 text-[#c87a53] shrink-0" />
            <span className="truncate max-w-2xl">{broadcast}</span>
            <button
              onClick={() => {
                localStorage.removeItem('civicguide_broadcast');
                setBroadcast(null);
              }}
              className="text-white/60 hover:text-white ml-2 text-xs"
              title="Dismiss banner"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top Government Disclaimer Banner */}
        <div className="bg-[#edeae1] text-[#635c51] px-4 py-1 text-[11px] text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#e2dcd0]">
          <span className="bg-[#c87a53] text-white px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider">
            Verified Portal
          </span>
          <span>
            CivicGuide Public Welfare Discovery & Voice Assistant. Multilingual Citizen Support.
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Official CivicGuide Brand Logo & Portal Badge */}
            <div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <CivicGuideLogo variant="horizontal" size="sm" />
              <span className="hidden xl:inline-block text-[10px] font-semibold bg-[#e8ede9] text-[#4a5d4e] border border-[#d2ddd4] px-2 py-0.5 rounded-full self-center">
                {currentUser?.role === 'admin' ? 'Official Admin' : 'Public Portal'}
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#e2dcd0] text-[#364539] font-semibold shadow-xs'
                        : 'text-[#5c5953] hover:text-[#4a5d4e] hover:bg-[#edeae1]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#4a5d4e]' : 'text-[#8a857a]'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold border ${
                        item.id === 'admin'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-[#e8ede9] text-[#4a5d4e] border-[#d2ddd4]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Voice Translate, Only Voice, Language Switcher, Profile/Auth */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Only Voice Hands-Free Button */}
              {onOpenOnlyVoice && (
                <button
                  type="button"
                  onClick={onOpenOnlyVoice}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#c87a53] hover:bg-[#b56b46] shadow-xs transition transform active:scale-95 cursor-pointer"
                  title="Hands-Free Only Voice Assistant"
                >
                  <Headphones className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span className="hidden sm:inline">Only Voice</span>
                </button>
              )}

              {/* Voice Assistant & Translate Button */}
              <button
                type="button"
                onClick={onOpenVoiceTranslateModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4a5d4e] bg-white hover:bg-[#edeae1] border border-[#e2dcd0] shadow-xs transition"
                title="Voice Translate & Speech"
              >
                <Mic className="w-3.5 h-3.5 text-[#c87a53]" />
                <span className="hidden md:inline">Voice & Translate</span>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#5c5953] bg-white hover:bg-[#edeae1] border border-[#e2dcd0] shadow-xs transition"
                  title="Change Language"
                >
                  <Languages className="w-3.5 h-3.5 text-[#8ca38f]" />
                  <span className="font-semibold text-[#2c2c2c]">{currentLangObj?.nativeName || 'English'}</span>
                  <ChevronDown className="w-3 h-3 text-[#737067]" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-[#e2dcd0] py-2 z-50 animate-in fade-in duration-100">
                    <div className="px-3 py-1 text-[10px] font-bold text-[#737067] uppercase tracking-wider border-b border-[#e2dcd0] mb-1">
                      Choose Portal Language
                    </div>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onSelectLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-[#f4f1ea] transition ${
                          currentLanguage === lang.code ? 'font-bold text-[#4a5d4e] bg-[#f4f1ea]' : 'text-[#2c2c2c]'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-[#737067]">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Mode Toggle (Light / Dark) */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-full text-[#5c5953] hover:text-[#2c2c2c] bg-white hover:bg-[#edeae1] border border-[#e2dcd0] shadow-xs transition flex items-center justify-center group"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform duration-200" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-[#4a5d4e] group-hover:-rotate-12 transition-transform duration-200" />
                )}
              </button>

              {/* User Account / Auth Dropdown */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-white hover:bg-[#edeae1] border border-[#e2dcd0] text-xs text-[#2c2c2c] shadow-xs transition"
                  >
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.fullName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-[#e2dcd0]"
                      />
                    ) : (
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                        currentUser.role === 'admin' ? 'bg-[#4a5d4e]' : 'bg-[#c87a53]'
                      }`}>
                        {currentUser.role === 'admin' ? (
                          <ShieldCheck className="w-4 h-4" />
                        ) : (
                          currentUser.fullName.charAt(0)
                        )}
                      </div>
                    )}
                    <div className="text-left hidden md:block">
                      <div className="font-semibold leading-tight truncate max-w-[100px] text-[#2c2c2c]">
                        {currentUser.fullName}
                      </div>
                      <div className="text-[10px] text-[#737067] leading-none capitalize flex items-center gap-1">
                        <span>{currentUser.role}</span>
                        {currentUser.authProvider === 'google' && (
                          <span className="text-[9px] text-[#1a73e8] font-semibold">Google</span>
                        )}
                      </div>
                    </div>
                    <ChevronDown className="w-3 h-3 text-[#737067]" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-[#e2dcd0] py-2 z-50 animate-in fade-in duration-100">
                      <div className="px-3 py-2 border-b border-[#e2dcd0] mb-1">
                        <div className="font-bold text-xs text-[#2c2c2c] truncate">{currentUser.fullName}</div>
                        <div className="text-[10px] text-[#737067] truncate">{currentUser.email}</div>
                        <div className="flex items-center gap-1 flex-wrap mt-1">
                          <span className={`inline-block text-[10px] px-2 py-0.2 rounded-full font-semibold ${
                            currentUser.role === 'admin'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-[#e8ede9] text-[#4a5d4e] border border-[#d2ddd4]'
                          }`}>
                            {currentUser.role === 'admin' ? 'Government Admin' : 'Citizen Beneficiary'}
                          </span>
                          {currentUser.authProvider === 'google' && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-200 font-medium">
                              Google Sign-In
                            </span>
                          )}
                        </div>
                      </div>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setActiveTab('admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-xs font-semibold text-[#4a5d4e] hover:bg-[#f4f1ea] flex items-center gap-2"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#4a5d4e]" />
                          <span>Admin Control Center</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onOpenProfileModal();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs text-[#2c2c2c] hover:bg-[#f4f1ea] flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-[#8ca38f]" />
                        <span>Edit Citizen Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenAuthModal();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs text-[#5c5953] hover:bg-[#f4f1ea] flex items-center gap-2"
                      >
                        <LogIn className="w-3.5 h-3.5 text-[#8ca38f]" />
                        <span>Switch User Account</span>
                      </button>

                      <div className="border-t border-[#e2dcd0] mt-1 pt-1">
                        <button
                          onClick={() => {
                            onLogout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-600" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#4a5d4e] hover:bg-[#3d4d40] shadow-xs transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login / Register</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#5c5953] hover:text-[#2c2c2c] hover:bg-[#edeae1]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#f4f1ea] border-t border-[#e2dcd0] px-4 pt-2 pb-4 space-y-1 shadow-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#e2dcd0] text-[#364539] font-semibold'
                      : 'text-[#5c5953] hover:bg-[#edeae1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#4a5d4e]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-[#e8ede9] text-[#4a5d4e] px-1.5 py-0.5 rounded border border-[#d2ddd4]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#e2dcd0] flex flex-col gap-2">
              <button
                onClick={() => {
                  onToggleTheme();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-[#2c2c2c] bg-white border border-[#e2dcd0] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#4a5d4e]" />
                  )}
                  <span>Appearance: {theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
                </div>
                <span className="text-xs text-[#737067]">
                  {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                </span>
              </button>

              {onOpenOnlyVoice && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOnlyVoice();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-white bg-[#c87a53] flex items-center gap-2 shadow-xs"
                >
                  <Headphones className="w-4 h-4 text-white animate-pulse" />
                  <span>Hands-Free "Only Voice" Assistant</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVoiceTranslateModal();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-[#4a5d4e] bg-white border border-[#e2dcd0] flex items-center gap-2"
              >
                <Mic className="w-4 h-4 text-[#c87a53]" />
                <span>Voice Speech & Translate Assistant</span>
              </button>

              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfileModal();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm text-[#2c2c2c] bg-white border border-[#e2dcd0] flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#4a5d4e]" />
                  <span>Profile ({currentUser.fullName})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm text-white bg-[#4a5d4e] flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In or Register</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setHelplineModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-[#c87a53] bg-[#fbf5f0] border border-[#f0ded5] flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#c87a53]" />
                <span>Emergency Public Helplines & Numbers</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Citizen Helplines Modal */}
      {helplineModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2c2c2c]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] shadow-2xl max-w-lg w-full overflow-hidden border border-[#e2dcd0] animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#4a5d4e] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-[#f4dcd1]" />
                <h3 className="font-serif font-bold text-lg">National Citizen Helplines</h3>
              </div>
              <button
                onClick={() => setHelplineModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-[#fcfbf7]">
              <p className="text-xs text-[#737067]">
                Official 24/7 toll-free public contact numbers for citizen grievance redressal, public scheme information, and emergencies:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-2xl border border-[#e2dcd0]">
                  <div className="text-[10px] font-bold text-[#737067] uppercase tracking-wider">National Consumer / Grievance</div>
                  <div className="text-lg font-serif font-extrabold text-[#4a5d4e]">1915</div>
                  <div className="text-xs text-[#5c5953]">Citizen Helpline (CPGRAMS)</div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#e2dcd0]">
                  <div className="text-[10px] font-bold text-[#737067] uppercase tracking-wider">Ayushman Bharat (Health)</div>
                  <div className="text-lg font-serif font-extrabold text-[#4a5d4e]">14555</div>
                  <div className="text-xs text-[#5c5953]">PM-JAY Hospitalization Assistance</div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#e2dcd0]">
                  <div className="text-[10px] font-bold text-[#737067] uppercase tracking-wider">PM-KISAN Farmers</div>
                  <div className="text-lg font-serif font-extrabold text-[#4a5d4e]">155261</div>
                  <div className="text-xs text-[#5c5953]">Direct Farmer DBT Support</div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#e2dcd0]">
                  <div className="text-[10px] font-bold text-[#737067] uppercase tracking-wider">National Scholarship</div>
                  <div className="text-lg font-serif font-extrabold text-[#4a5d4e]">0120-6619540</div>
                  <div className="text-xs text-[#5c5953]">NSP Student Technical Helpdesk</div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#e2dcd0]">
                  <div className="text-[10px] font-bold text-[#737067] uppercase tracking-wider">Women in Distress</div>
                  <div className="text-lg font-serif font-extrabold text-[#c87a53]">1091 / 181</div>
                  <div className="text-xs text-[#5c5953]">National Women Helpline</div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#e2dcd0]">
                  <div className="text-[10px] font-bold text-[#737067] uppercase tracking-wider">Cyber Financial Fraud</div>
                  <div className="text-lg font-serif font-extrabold text-[#c87a53]">1930</div>
                  <div className="text-xs text-[#5c5953]">Cyber Crime Helpline</div>
                </div>
              </div>

              <div className="p-3 bg-[#e8ede9] border border-[#d2ddd4] rounded-2xl text-xs text-[#4a5d4e]">
                💡 <strong>Tip for Citizens:</strong> You can also access over 1,500 Central and State services on your mobile through the <strong>UMANG app</strong> (Unified Mobile Application for New-age Governance).
              </div>
            </div>

            <div className="bg-[#f4f1ea] px-6 py-3 border-t border-[#e2dcd0] flex justify-end">
              <button
                onClick={() => setHelplineModalOpen(false)}
                className="px-5 py-2 bg-[#4a5d4e] hover:bg-[#364539] text-white rounded-full text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

