import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPageView } from './components/LandingPageView';
import { DashboardView } from './components/DashboardView';
import { EligibilityQuestionnaire } from './components/EligibilityQuestionnaire';
import { SchemeExplorer } from './components/SchemeExplorer';
import { DocumentsChecklist } from './components/DocumentsChecklist';
import { ApplicationTracker } from './components/ApplicationTracker';
import { AiExplainerView } from './components/AiExplainerView';
import { AboutView } from './components/AboutView';
import { ProfileModal } from './components/ProfileModal';
import { SchemeDetailsModal } from './components/SchemeDetailsModal';
import { AuthModal } from './components/AuthModal';
import { VoiceTranslateModal } from './components/VoiceTranslateModal';
import { OnlyVoiceAssistant } from './components/OnlyVoiceAssistant';
import { SmallAiHelp } from './components/SmallAiHelp';
import { AdminDashboardView } from './components/AdminDashboardView';
import { SCHEMES_DATA } from './data/schemes';
import { StorageService } from './services/storageService';
import { CitizenProfile, GovernmentScheme, UserAccount, SupportedLanguage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [schemes, setSchemes] = useState<GovernmentScheme[]>(() => StorageService.getSchemes());
  const [profile, setProfile] = useState<CitizenProfile>(() => StorageService.getProfile());
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => StorageService.getCurrentUser());
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('civicguide_lang') as SupportedLanguage) || 'en';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('civicguide_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme>(() => schemes[0] || SCHEMES_DATA[0]);
  
  // Modals state
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [voiceTranslateModalOpen, setVoiceTranslateModalOpen] = useState<boolean>(false);
  const [onlyVoiceModalOpen, setOnlyVoiceModalOpen] = useState<boolean>(false);
  const [detailsModalScheme, setDetailsModalScheme] = useState<GovernmentScheme | null>(null);

  // Sync theme with document class and localStorage
  useEffect(() => {
    localStorage.setItem('civicguide_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem('civicguide_lang', lang);
  };

  const handleRefreshSchemes = () => {
    const updated = StorageService.getSchemes();
    setSchemes(updated);
    if (!updated.some((s) => s.id === selectedScheme.id) && updated.length > 0) {
      setSelectedScheme(updated[0]);
    }
  };

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    // If admin signs in, directly redirect to admin dashboard
    if (user.role === 'admin') {
      setActiveTab('admin');
    }
  };

  const handleLogout = () => {
    StorageService.logoutUser();
    setCurrentUser(null);
    if (activeTab === 'admin') {
      setActiveTab('dashboard');
    }
  };

  const handleSaveProfile = (newProfile: CitizenProfile) => {
    StorageService.saveProfile(newProfile);
    setProfile(newProfile);
  };

  const handleUpdateProfileFromQuestionnaire = (updated: Partial<CitizenProfile>) => {
    const merged: CitizenProfile = {
      ...profile,
      ...updated,
      lastUpdated: new Date().toISOString()
    };
    StorageService.saveProfile(merged);
    setProfile(merged);
  };

  // Navigations from card actions
  const handleOpenDetails = (scheme: GovernmentScheme) => {
    setDetailsModalScheme(scheme);
  };

  const handleOpenDocuments = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    setActiveTab('documents');
  };

  const handleOpenAiExplainer = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    setActiveTab('ai-assist');
  };

  const handleOpenApplyTracker = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    setActiveTab('applications');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#2c2c2c] flex flex-col font-sans antialiased selection:bg-[#c87a53] selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        currentUser={currentUser}
        currentLanguage={currentLanguage}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        onOpenProfileModal={() => setProfileModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenVoiceTranslateModal={() => setVoiceTranslateModalOpen(true)}
        onOpenOnlyVoice={() => setOnlyVoiceModalOpen(true)}
        onLogout={handleLogout}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <LandingPageView
            schemes={schemes}
            profile={profile}
            currentLanguage={currentLanguage}
            onNavigateTab={setActiveTab}
            onSelectSchemeForDetails={handleOpenDetails}
            onSelectSchemeForDocuments={handleOpenDocuments}
            onSelectSchemeForAi={handleOpenAiExplainer}
            onOpenOnlyVoice={() => setOnlyVoiceModalOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            schemes={schemes}
            profile={profile}
            onNavigateTab={setActiveTab}
            onOpenProfile={() => setProfileModalOpen(true)}
            onSelectSchemeForDetails={handleOpenDetails}
            onSelectSchemeForDocuments={handleOpenDocuments}
            onSelectSchemeForAi={handleOpenAiExplainer}
          />
        )}

        {activeTab === 'questionnaire' && (
          <EligibilityQuestionnaire
            schemes={schemes}
            profile={profile}
            onUpdateProfileFromQuestionnaire={handleUpdateProfileFromQuestionnaire}
            onSelectSchemeForDetails={handleOpenDetails}
            onSelectSchemeForDocuments={handleOpenDocuments}
            onSelectSchemeForAi={handleOpenAiExplainer}
          />
        )}

        {activeTab === 'explorer' && (
          <SchemeExplorer
            schemes={schemes}
            currentLanguage={currentLanguage}
            onSelectSchemeForDetails={handleOpenDetails}
            onSelectSchemeForDocuments={handleOpenDocuments}
            onSelectSchemeForAi={handleOpenAiExplainer}
            onSelectSchemeForApply={handleOpenApplyTracker}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsChecklist
            schemes={schemes}
            selectedScheme={selectedScheme}
            onSelectScheme={setSelectedScheme}
            onNavigateToApply={handleOpenApplyTracker}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationTracker
            schemes={schemes}
            selectedScheme={selectedScheme}
            onSelectScheme={setSelectedScheme}
            onOpenDocuments={handleOpenDocuments}
            onOpenAiExplainer={handleOpenAiExplainer}
          />
        )}

        {activeTab === 'ai-assist' && (
          <AiExplainerView
            schemes={schemes}
            selectedScheme={selectedScheme}
            profile={profile}
            currentLanguage={currentLanguage}
            onSelectScheme={setSelectedScheme}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboardView
            schemes={schemes}
            currentUser={currentUser}
            onRefreshSchemes={handleRefreshSchemes}
            onPreviewScheme={handleOpenDetails}
          />
        )}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Citizen Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* User Login & Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLogin}
      />

      {/* Voice Assistant & Multi-Language Translate Modal */}
      <VoiceTranslateModal
        isOpen={voiceTranslateModalOpen}
        onClose={() => setVoiceTranslateModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Scheme Details Modal */}
      <SchemeDetailsModal
        scheme={detailsModalScheme}
        profile={profile}
        currentLanguage={currentLanguage}
        onClose={() => setDetailsModalScheme(null)}
        onOpenDocuments={handleOpenDocuments}
        onOpenAi={handleOpenAiExplainer}
        onOpenApply={handleOpenApplyTracker}
      />

      {/* Hands-Free Only Voice Assistant Modal */}
      <OnlyVoiceAssistant
        isOpen={onlyVoiceModalOpen}
        onClose={() => setOnlyVoiceModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        onSelectSchemeForDetails={handleOpenDetails}
        profile={profile}
      />

      {/* Floating Small AI Help Assistant */}
      <SmallAiHelp
        currentLanguage={currentLanguage}
        profile={profile}
        onOpenSchemeDetails={handleOpenDetails}
        onNavigateTab={setActiveTab}
        onOpenOnlyVoice={() => setOnlyVoiceModalOpen(true)}
      />
    </div>
  );
}

