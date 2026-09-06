import { SupportedLanguage, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN' }
];

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    portalName: 'CivicGuide',
    tagline: 'Government Scheme & Service Finder',
    publicPortal: 'Public Portal',
    navHome: 'Home',
    navDashboard: 'Dashboard',
    navEligibility: 'Eligibility Check',
    navExplorer: 'Explore Schemes',
    navDocuments: 'Document Checklist',
    navTracker: 'Demo Tracker',
    navAiExplainer: 'AI Explainer',
    navAbout: 'About & Help',
    navAdmin: 'Admin Portal',
    login: 'Log In',
    register: 'Register',
    logout: 'Log Out',
    myAccount: 'My Account',
    adminRole: 'Official Admin',
    citizenRole: 'Citizen',
    voiceSearch: 'Voice Search',
    voiceSearchPlaceholder: 'Speak to search schemes (e.g., student scholarship, farmer aid)...',
    listenVoice: 'Listen in Voice',
    stopVoice: 'Stop Audio',
    speaking: 'Speaking...',
    listening: 'Listening... speak now',
    voiceNotSupported: 'Speech recognition is not supported in this browser.',
    allCategories: 'All Categories',
    allLevels: 'All Jurisdictions',
    searchSchemes: 'Search schemes by title, ministry, or keyword...',
    applyNow: 'Apply on Portal',
    checkEligibility: 'Check Eligibility',
    viewDetails: 'View Details',
    keyBenefits: 'Key Citizen Entitlements',
    documentsNeeded: 'Documents Needed',
    helpline: 'Citizen Helpline 1915'
  },
  hi: {
    portalName: 'सिविकगाइड',
    tagline: 'सरकारी योजना एवं नागरिक सेवा खोजक',
    publicPortal: 'नागरिक पोर्टल',
    navHome: 'होम पेज',
    navDashboard: 'डैशबोर्ड',
    navEligibility: 'पात्रता जांच',
    navExplorer: 'योजनाएं खोजें',
    navDocuments: 'दस्तावेज़ सूची',
    navTracker: 'आवेदन ट्रैकर',
    navAiExplainer: 'एआई सलाहकार',
    navAbout: 'जानकारी एवं सहायता',
    navAdmin: 'प्रशासन पोर्टल',
    login: 'लॉग इन',
    register: 'पंजीकरण',
    logout: 'लॉग आउट',
    myAccount: 'मेरा खाता',
    adminRole: 'प्रशासनिक अधिकारी',
    citizenRole: 'नागरिक',
    voiceSearch: 'बोलकर खोजें',
    voiceSearchPlaceholder: 'बोलकर खोजें (जैसे: छात्रवृत्ति, किसान सहायता)...',
    listenVoice: 'आवाज़ में सुनें',
    stopVoice: 'आवाज़ रोकें',
    speaking: 'बोल रहा है...',
    listening: 'सुन रहा है... अब बोलिए',
    voiceNotSupported: 'इस ब्राउज़र में वाक् पहचान उपलब्ध नहीं है।',
    allCategories: 'सभी श्रेणियां',
    allLevels: 'सभी स्तर',
    searchSchemes: 'योजना, मंत्रालय या कीवर्ड से खोजें...',
    applyNow: 'पोर्टल पर आवेदन करें',
    checkEligibility: 'पात्रता जांचें',
    viewDetails: 'विवरण देखें',
    keyBenefits: 'प्रमुख नागरिक लाभ',
    documentsNeeded: 'आवश्यक दस्तावेज़',
    helpline: 'नागरिक हेल्पलाइन 1915'
  },
  te: {
    portalName: 'సివిక్ గైడ్',
    tagline: 'ప్రభుత్వ పథకాలు & సేవల శోధన',
    publicPortal: 'ప్రజా పోర్టల్',
    navHome: 'హోమ్',
    navDashboard: 'డ్యాష్‌బోర్డ్',
    navEligibility: 'అర్హత తనిఖీ',
    navExplorer: 'పథకాలు అన్వేషించండి',
    navDocuments: 'పత్రాల జాబితా',
    navTracker: 'దరఖాస్తు ట్రాకర్',
    navAiExplainer: 'AI సహాయకుడు',
    navAbout: 'సమాచారం & సహాయం',
    navAdmin: 'అడ్మిన్ పోర్టల్',
    login: 'లాగిన్',
    register: 'నమోదు చేసుకోండి',
    logout: 'లాగ్ అవుట్',
    myAccount: 'నా ఖాతా',
    adminRole: 'ప్రభుత్వ అధికారి',
    citizenRole: 'పౌరుడు',
    voiceSearch: 'వాయిస్ శోధన',
    voiceSearchPlaceholder: 'మాట్లాడి శోధించండి (ఉదా: స్కాలర్‌షిప్, రైతు సహాయం)...',
    listenVoice: 'వాయిస్‌లో వినండి',
    stopVoice: 'ఆపండి',
    speaking: 'మాట్లాడుతోంది...',
    listening: 'వింటోంది... ఇప్పుడు మాట్లాడండి',
    voiceNotSupported: 'ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు.',
    allCategories: 'అన్ని విభాగాలు',
    allLevels: 'అన్ని స్థాయిలు',
    searchSchemes: 'పథకం పేరు లేదా కీవర్డ్ ద్వారా శోధించండి...',
    applyNow: 'దరఖాస్తు చేయండి',
    checkEligibility: 'అర్హత చూడండి',
    viewDetails: 'వివరాలు చూడండి',
    keyBenefits: 'ప్రధాన ప్రయోజనాలు',
    documentsNeeded: 'అవసరమైన పత్రాలు',
    helpline: 'హెల్ప్‌లైన్ 1915'
  },
  ta: {
    portalName: 'சிவிக் கைடு',
    tagline: 'அரசு நலத்திட்டங்கள் & சேவைகள் கண்டறிதல்',
    publicPortal: 'மக்கள் தளம்',
    navHome: 'முகப்பு',
    navDashboard: 'முகப்பு',
    navEligibility: 'தகுதி சோதனை',
    navExplorer: 'திட்டங்களை காண்க',
    navDocuments: 'ஆவணப் பட்டியல்',
    navTracker: 'விண்ணப்ப கண்காணிப்பு',
    navAiExplainer: 'AI வழிகாட்டி',
    navAbout: 'தகவல் & உதவி',
    navAdmin: 'நிர்வாக தளம்',
    login: 'உள்நுழைக',
    register: 'பதிவு செய்க',
    logout: 'வெளியேறுக',
    myAccount: 'என் கணக்கு',
    adminRole: 'அரசு அதிகாரி',
    citizenRole: 'குடிமகன்',
    voiceSearch: 'குரல் தேடல்',
    voiceSearchPlaceholder: 'பேசி தேடுங்கள் (எ.கா: கல்வி உதவித்தொகை, விவசாய உதவி)...',
    listenVoice: 'குரலில் கேளுங்கள்',
    stopVoice: 'நிறுத்துக',
    speaking: 'பேசுகிறது...',
    listening: 'கேட்கிறது... இப்போது பேசுங்கள்',
    voiceNotSupported: 'இந்த உலாவியில் குரல் தேடல் ஆதரிக்கப்படவில்லை.',
    allCategories: 'அனைத்து பிரிவுகள்',
    allLevels: 'அனைத்து நிலைகள்',
    searchSchemes: 'திட்டம் அல்லது முக்கிய வார்த்தை மூலம் தேடுக...',
    applyNow: 'விண்ணப்பிக்க',
    checkEligibility: 'தகுதி பார்க்க',
    viewDetails: 'விவரங்கள்',
    keyBenefits: 'முக்கிய நன்மைகள்',
    documentsNeeded: 'தேவையான ஆவணங்கள்',
    helpline: 'உதவி எண் 1915'
  },
  bn: {
    portalName: 'সিভিকগাইড',
    tagline: 'সরকারি প্রকল্প ও নাগরিক পরিষেবা সন্ধানকারী',
    publicPortal: 'পাবলিক পোর্টাল',
    navHome: 'হোম',
    navDashboard: 'ড্যাশবোর্ড',
    navEligibility: 'যোগ্যতা পরীক্ষা',
    navExplorer: 'প্রকল্প অন্বেষণ',
    navDocuments: 'নথিপত্রের তালিকা',
    navTracker: 'আবেদন ট্র্যাকার',
    navAiExplainer: 'AI নির্দেশক',
    navAbout: 'সম্পর্কে ও সাহায্য',
    navAdmin: 'অ্যাডমিন পোর্টাল',
    login: 'লগ ইন',
    register: 'নিবন্ধন',
    logout: 'লগ আউট',
    myAccount: 'আমার প্রোফাইল',
    adminRole: 'সরকারি আধিকারিক',
    citizenRole: 'নাগরিক',
    voiceSearch: 'ভয়েস অনুসন্ধান',
    voiceSearchPlaceholder: 'বলে খুঁজুন (যেমন: স্কলারশিপ, কৃষক সহায়তা)...',
    listenVoice: 'ভয়েসে শুনুন',
    stopVoice: 'থামান',
    speaking: 'বলছে...',
    listening: 'শুনছে... এখন বলুন',
    voiceNotSupported: 'এই ব্রাউজারে ভয়েস সমর্থন নেই।',
    allCategories: 'সকল বিভাগ',
    allLevels: 'সকল স্তর',
    searchSchemes: 'প্রকল্প বা কীওয়ার্ড দিয়ে অনুসন্ধান করুন...',
    applyNow: 'আবেদন করুন',
    checkEligibility: 'যোগ্যতা যাচাই',
    viewDetails: 'বিস্তারিত দেখুন',
    keyBenefits: 'মূল সুবিধাসমূহ',
    documentsNeeded: 'প্রয়োজনীয় নথি',
    helpline: 'হেল্পলাইন ১৯১৫'
  },
  mr: {
    portalName: 'सिव्हिकगाईड',
    tagline: 'शासकीय योजना व नागरिक सेवा शोधक',
    publicPortal: 'नागरी पोर्टल',
    navHome: 'मुख्यपृष्ठ',
    navDashboard: 'डॅशबोर्ड',
    navEligibility: 'पात्रता पडताळणी',
    navExplorer: 'योजना शोधा',
    navDocuments: 'कागदपत्रे यादी',
    navTracker: 'अर्ज ट्रॅकर',
    navAiExplainer: 'AI मार्गदर्शक',
    navAbout: 'माहिती व मदत',
    navAdmin: 'प्रशासन पोर्टल',
    login: 'लॉग इन',
    register: 'नोंदणी करा',
    logout: 'लॉग आउट',
    myAccount: 'माझे खाते',
    adminRole: 'प्रशासकीय अधिकारी',
    citizenRole: 'नागरिक',
    voiceSearch: 'आवाजाने शोधा',
    voiceSearchPlaceholder: 'बोलून शोधा (उदा: शिष्यवृत्ती, शेतकरी अनुदान)...',
    listenVoice: 'आवाजात ऐका',
    stopVoice: 'थांबवा',
    speaking: 'बोलत आहे...',
    listening: 'ऐकत आहे... आता बोला',
    voiceNotSupported: 'या ब्राउझरमध्ये व्हॉइस सुविधा उपलब्ध नाही.',
    allCategories: 'सर्व वर्गवारी',
    allLevels: 'सर्व स्तर',
    searchSchemes: 'योजना किंवा कीवर्डद्वारे शोधा...',
    applyNow: 'अर्ज करा',
    checkEligibility: 'पात्रता तपासा',
    viewDetails: 'तपशील पहा',
    keyBenefits: 'प्रमुख लाभ',
    documentsNeeded: 'आवश्यक कागदपत्रे',
    helpline: 'नागरी हेल्पलाइन 1915'
  },
  kn: {
    portalName: 'ಸಿವಿಕ್‌ಗೈಡ್',
    tagline: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸೇವೆಗಳ ಶೋಧಕ',
    publicPortal: 'ಸಾರ್ವಜನಿಕ ಪೋರ್ಟಲ್',
    navHome: 'ಮುಖಪುಟ',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navEligibility: 'ಅರ್ಹತಾ ಪರೀಕ್ಷೆ',
    navExplorer: 'ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    navDocuments: 'ದಾಖಲೆಗಳ ಪಟ್ಟಿ',
    navTracker: 'ಅರ್ಜಿ ಟ್ರ್ಯಾಕರ್',
    navAiExplainer: 'AI ಮಾರ್ಗದರ್ಶಿ',
    navAbout: 'ಮಾಹಿತಿ & ಸಹಾಯ',
    navAdmin: 'ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್',
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    myAccount: 'ನನ್ನ ಖಾತೆ',
    adminRole: 'ಅಧಿಕಾರಿ',
    citizenRole: 'ನಾಗರಿಕ',
    voiceSearch: 'ಧ್ವನಿ ಹುಡುಕಾಟ',
    voiceSearchPlaceholder: 'ಮಾತನಾಡಿ ಹುಡುಕಿ (ಉದಾ: ವಿದ್ಯಾರ್ಥಿವೇತನ, ರೈತ ಯೋಜನೆ)...',
    listenVoice: 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ',
    stopVoice: 'ನಿಲ್ಲಿಸಿ',
    speaking: 'ಮಾತನಾಡುತ್ತಿದೆ...',
    listening: 'ಆಲಿಸುತ್ತಿದೆ... ಈಗ ಮಾತನಾಡಿ',
    voiceNotSupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸೌಲಭ್ಯ ಲಭ್ಯವಿಲ್ಲ.',
    allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    allLevels: 'ಎಲ್ಲಾ ಹಂತಗಳು',
    searchSchemes: 'ಯೋಜನೆ ಅಥವಾ ಕೀವರ್ಡ್ ಮೂಲಕ ಹುಡುಕಿ...',
    applyNow: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    checkEligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
    viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    keyBenefits: 'ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು',
    documentsNeeded: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
    helpline: 'ಸಹಾಯವಾಣಿ 1915'
  }
};

export const LanguageService = {
  getCurrentLanguage(): SupportedLanguage {
    try {
      const saved = localStorage.getItem('civicguide_lang');
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved as SupportedLanguage;
      }
    } catch {
      // fallback
    }
    return 'en';
  },

  setLanguage(code: SupportedLanguage): void {
    try {
      localStorage.setItem('civicguide_lang', code);
    } catch (e) {
      console.error(e);
    }
  },

  translate(key: string, lang: SupportedLanguage): string {
    const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
    return dict[key] || UI_TRANSLATIONS.en[key] || key;
  },

  // Speech synthesis (Voice reading / Text to Speech)
  speak(
    text: string,
    lang: SupportedLanguage,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: unknown) => void
  ): boolean {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported on this browser.');
      return false;
    }

    try {
      window.speechSynthesis.cancel(); // cancel any active speech

      const cleanText = text.replace(/[*#_`]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
      const targetTag = langObj?.speechCode || 'en-IN';
      utterance.lang = targetTag;
      utterance.rate = 0.95; // comfortable citizen listening speed
      utterance.pitch = 1.0;

      // Try finding appropriate local voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(
        (v) => v.lang.startsWith(targetTag) || v.lang.startsWith(lang)
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = (e) => {
        console.error('Speech synthesis error', e);
        if (onError) onError(e);
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.error('TTS error', err);
      if (onError) onError(err);
      return false;
    }
  },

  stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
