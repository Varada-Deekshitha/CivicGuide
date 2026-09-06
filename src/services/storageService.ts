import {
  CitizenProfile,
  QuestionnaireAnswers,
  UserApplicationRecord,
  UserAccount,
  GovernmentScheme,
  GoogleAccount
} from '../types';
import { SCHEMES_DATA } from '../data/schemes';

const STORAGE_KEYS = {
  PROFILE: 'civicguide_citizen_profile',
  QUESTIONNAIRE: 'civicguide_questionnaire_answers',
  DOCUMENTS: 'civicguide_document_checklist',
  APPLICATIONS: 'civicguide_application_records',
  USERS: 'civicguide_users_list',
  CURRENT_USER: 'civicguide_current_user_session',
  SCHEMES: 'civicguide_schemes_database',
  GOOGLE_ACCOUNTS: 'civicguide_google_accounts'
};

export const DEFAULT_GOOGLE_ACCOUNTS: GoogleAccount[] = [
  {
    id: 'google_user_1',
    email: 'varadadeekshitha@gmail.com',
    name: 'Deekshitha Varada',
    givenName: 'Deekshitha',
    familyName: 'Varada',
    picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  }
];

export const DEFAULT_DEMO_USERS: UserAccount[] = [
  {
    id: 'user_citizen_1',
    email: 'ananya@citizen.gov.in',
    password: 'citizen123',
    fullName: 'Ananya Sharma',
    role: 'citizen',
    phone: '+91 98765 43210',
    state: 'Karnataka',
    occupation: 'student',
    createdAt: '2026-01-15T09:00:00.000Z'
  },
  {
    id: 'user_admin_1',
    email: 'admin@civicguide.gov.in',
    password: 'admin123',
    fullName: 'Sanjay Verma (Nodal Officer)',
    role: 'admin',
    phone: '+91 94444 12345',
    state: 'Delhi (NCT)',
    occupation: 'salaried',
    createdAt: '2026-01-10T08:30:00.000Z'
  }
];

export const DEFAULT_SAMPLE_PROFILE: CitizenProfile = {
  fullName: 'Ananya Sharma',
  age: 22,
  state: 'Karnataka',
  district: 'Bengaluru Urban',
  occupation: 'student',
  isStudent: true,
  incomeCategory: '1_5l_to_3l',
  area: 'urban',
  gender: 'female',
  isDifferentlyAbled: false,
  hasBPLCard: false,
  casteCategory: 'general',
  lastUpdated: new Date().toISOString()
};

export const SAMPLE_PERSONAS: Record<string, CitizenProfile> = {
  student: {
    fullName: 'Ananya Sharma',
    age: 21,
    state: 'Karnataka',
    district: 'Bengaluru',
    occupation: 'student',
    isStudent: true,
    incomeCategory: '1_5l_to_3l',
    area: 'urban',
    gender: 'female',
    isDifferentlyAbled: false,
    hasBPLCard: false,
    casteCategory: 'obc',
    lastUpdated: new Date().toISOString()
  },
  farmer: {
    fullName: 'Ramesh Patel',
    age: 44,
    state: 'Gujarat',
    district: 'Anand',
    occupation: 'farmer',
    isStudent: false,
    incomeCategory: '1_5l_to_3l',
    area: 'rural',
    gender: 'male',
    isDifferentlyAbled: false,
    hasBPLCard: true,
    casteCategory: 'general',
    lastUpdated: new Date().toISOString()
  },
  artisan: {
    fullName: 'Mohammad Rafiq',
    age: 38,
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    occupation: 'artisan',
    isStudent: false,
    incomeCategory: 'below_1_5l',
    area: 'semi_urban',
    gender: 'male',
    isDifferentlyAbled: false,
    hasBPLCard: true,
    casteCategory: 'minority',
    lastUpdated: new Date().toISOString()
  },
  senior: {
    fullName: 'Lakshmi Devi',
    age: 64,
    state: 'Tamil Nadu',
    district: 'Madurai',
    occupation: 'senior_citizen',
    isStudent: false,
    incomeCategory: 'below_1_5l',
    area: 'rural',
    gender: 'female',
    isDifferentlyAbled: false,
    hasBPLCard: true,
    casteCategory: 'sc',
    lastUpdated: new Date().toISOString()
  },
  entrepreneur: {
    fullName: 'Pooja Verma',
    age: 29,
    state: 'Maharashtra',
    district: 'Pune',
    occupation: 'self_employed',
    isStudent: false,
    incomeCategory: '3l_to_8l',
    area: 'urban',
    gender: 'female',
    isDifferentlyAbled: false,
    hasBPLCard: false,
    casteCategory: 'general',
    lastUpdated: new Date().toISOString()
  }
};

export const StorageService = {
  getProfile(): CitizenProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed reading profile from storage', e);
    }
    return DEFAULT_SAMPLE_PROFILE;
  },

  saveProfile(profile: CitizenProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed saving profile', e);
    }
  },

  getQuestionnaireAnswers(): QuestionnaireAnswers | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUESTIONNAIRE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading questionnaire answers', e);
    }
    return null;
  },

  saveQuestionnaireAnswers(answers: QuestionnaireAnswers): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONNAIRE, JSON.stringify(answers));
    } catch (e) {
      console.error('Failed saving questionnaire answers', e);
    }
  },

  // Document checklist storage
  getDocumentStatusMap(): Record<string, Record<string, 'available' | 'pending'>> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading document checklist', e);
    }
    // Default demo readiness for first scheme
    return {
      'pm-kisan': {
        aadhaar: 'available',
        'land-records': 'pending',
        'bank-passbook': 'available'
      },
      'post-matric-scholarship': {
        'student-id-fee-receipt': 'available',
        'income-cert-edu': 'available',
        'caste-cert-edu': 'pending',
        'prev-marksheet': 'available',
        'bank-passbook-student': 'available'
      }
    };
  },

  saveDocumentStatus(schemeId: string, docId: string, status: 'available' | 'pending'): void {
    try {
      const current = this.getDocumentStatusMap();
      if (!current[schemeId]) {
        current[schemeId] = {};
      }
      current[schemeId][docId] = status;
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(current));
    } catch (e) {
      console.error('Failed saving document status', e);
    }
  },

  resetSchemeDocuments(schemeId: string): void {
    try {
      const current = this.getDocumentStatusMap();
      delete current[schemeId];
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(current));
    } catch (e) {
      console.error('Failed resetting documents for scheme', e);
    }
  },

  // Application tracker storage
  getApplicationRecords(): Record<string, UserApplicationRecord> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading applications', e);
    }
    // Default initial demo state
    return {
      'post-matric-scholarship': {
        schemeId: 'post-matric-scholarship',
        status: 'Ready to Apply',
        applicationReferenceNumber: 'NSP-DEMO-2026-8942',
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        notes: 'Fee receipt and marksheets verified. Awaiting college nod.'
      },
      'ayushman-bharat': {
        schemeId: 'ayushman-bharat',
        status: 'Application Guidance Viewed',
        applicationReferenceNumber: 'AB-DEMO-2026-1049',
        updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        notes: 'Checked hospital empaneled list nearby.'
      }
    };
  },

  saveApplicationRecord(record: UserApplicationRecord): void {
    try {
      const current = this.getApplicationRecords();
      current[record.schemeId] = record;
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(current));
    } catch (e) {
      console.error('Failed saving application record', e);
    }
  },

  // User Accounts & Authentication
  getUsers(): UserAccount[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed reading users', e);
    }
    // Seed default users
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_DEMO_USERS));
    } catch {}
    return DEFAULT_DEMO_USERS;
  },

  saveUser(user: UserAccount): void {
    try {
      const users = this.getUsers();
      const existingIdx = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
      if (existingIdx >= 0) {
        users[existingIdx] = user;
      } else {
        users.push(user);
      }
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed saving user', e);
    }
  },

  getCurrentUser(): UserAccount | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed reading current user', e);
    }
    // Default to demo citizen account for seamless immediate usability
    return DEFAULT_DEMO_USERS[0];
  },

  setCurrentUser(user: UserAccount | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.error('Failed setting current user', e);
    }
  },

  logoutUser(): void {
    this.setCurrentUser(null);
  },

  // Dynamic Schemes (Admin add / edit / delete)
  getSchemes(): GovernmentScheme[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCHEMES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading schemes', e);
    }
    // Seed default schemes
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(SCHEMES_DATA));
    } catch {}
    return SCHEMES_DATA;
  },

  saveScheme(scheme: GovernmentScheme): void {
    try {
      const schemes = this.getSchemes();
      const idx = schemes.findIndex((s) => s.id === scheme.id);
      if (idx >= 0) {
        schemes[idx] = scheme;
      } else {
        schemes.unshift(scheme);
      }
      localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
    } catch (e) {
      console.error('Failed saving scheme', e);
    }
  },

  deleteScheme(schemeId: string): void {
    try {
      const schemes = this.getSchemes().filter((s) => s.id !== schemeId);
      localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
    } catch (e) {
      console.error('Failed deleting scheme', e);
    }
  },

  resetSchemesToDefault(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(SCHEMES_DATA));
    } catch (e) {
      console.error('Failed resetting schemes', e);
    }
  },

  // Google Accounts detection & management
  getGoogleAccounts(): GoogleAccount[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GOOGLE_ACCOUNTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading google accounts', e);
    }
    // Seed default Google account
    try {
      localStorage.setItem(STORAGE_KEYS.GOOGLE_ACCOUNTS, JSON.stringify(DEFAULT_GOOGLE_ACCOUNTS));
    } catch {}
    return DEFAULT_GOOGLE_ACCOUNTS;
  },

  setGoogleAccounts(accounts: GoogleAccount[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GOOGLE_ACCOUNTS, JSON.stringify(accounts));
    } catch (e) {
      console.error('Failed setting google accounts', e);
    }
  },

  addGoogleAccount(account: GoogleAccount): void {
    const list = this.getGoogleAccounts();
    const existingIdx = list.findIndex((a) => a.email.toLowerCase() === account.email.toLowerCase());
    if (existingIdx >= 0) {
      list[existingIdx] = account;
    } else {
      list.push(account);
    }
    this.setGoogleAccounts(list);
  },

  removeGoogleAccount(accountId: string): void {
    const list = this.getGoogleAccounts().filter((a) => a.id !== accountId);
    this.setGoogleAccounts(list);
  }
};

