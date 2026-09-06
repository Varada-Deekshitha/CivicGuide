export type OccupationType =
  | 'student'
  | 'farmer'
  | 'salaried'
  | 'self_employed'
  | 'daily_wage'
  | 'unemployed'
  | 'homemaker'
  | 'senior_citizen'
  | 'artisan'
  | 'other';

export type IncomeCategory =
  | 'below_1_5l' // Below ₹1.5 Lakh per annum (EWS / BPL)
  | '1_5l_to_3l' // ₹1.5 Lakh – ₹3 Lakh
  | '3l_to_8l'   // ₹3 Lakh – ₹8 Lakh
  | 'above_8l';   // Above ₹8 Lakh (Non-subsidized / General)

export type SchemeCategory =
  | 'Education'
  | 'Healthcare'
  | 'Employment'
  | 'Housing'
  | 'Financial Assistance'
  | 'Women & Child Welfare'
  | 'Agriculture'
  | 'Social Welfare';

export type AreaType = 'rural' | 'urban' | 'semi_urban';

export type GenderType = 'all' | 'female' | 'male' | 'other';

export interface CitizenProfile {
  fullName?: string;
  age: number;
  state: string;
  district?: string;
  occupation: OccupationType;
  isStudent: boolean;
  incomeCategory: IncomeCategory;
  area: AreaType;
  gender: GenderType;
  isDifferentlyAbled: boolean;
  hasBPLCard: boolean;
  casteCategory?: 'general' | 'obc' | 'sc' | 'st' | 'minority';
  lastUpdated: string;
}

export interface QuestionnaireAnswers {
  ageGroup: 'below_18' | '18_to_25' | '26_to_40' | '41_to_60' | 'above_60';
  exactAge?: number;
  occupation: OccupationType;
  isStudent: boolean;
  incomeCategory: IncomeCategory;
  area: AreaType;
  gender: GenderType;
  isDifferentlyAbled: boolean;
  hasBPLCard: boolean;
  selectedCategories: SchemeCategory[];
  specialIdentifiers: string[]; // 'landholder', 'street_vendor', 'girl_child_parent', 'entrepreneur', 'artisan'
}

export interface SchemeDocument {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  issuingAuthority?: string;
  sampleAlternative?: string;
}

export interface ApplicationGuidance {
  applicationMethod: 'Online' | 'Offline' | 'Both';
  officialPortalName: string;
  officialPortalUrl: string;
  steps: string[];
  importantInstructions: string[];
  processingTimeline: string;
  fee: string;
  nodalDepartment: string;
  helpline: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  ministry: string;
  level: 'Central' | 'State' | 'Central & State';
  category: SchemeCategory;
  targetBeneficiaries: string;
  mainBenefits: string[];
  basicEligibilitySummary: string;
  eligibilityRules: {
    minAge?: number;
    maxAge?: number;
    allowedOccupations?: OccupationType[];
    allowedIncomeCategories?: IncomeCategory[];
    allowedStates?: string[]; // Empty or contains 'All' means Pan-India
    allowedGenders?: GenderType[];
    studentOnly?: boolean;
    areaEligibility?: AreaType[];
    requiresBPL?: boolean;
    differentlyAbledOnly?: boolean;
    specialTags?: string[];
  };
  requiredDocuments: SchemeDocument[];
  applicationGuidance: ApplicationGuidance;
  tags: string[];
  isDemo: boolean;
}

export type ApplicationStatusType =
  | 'Not Started'
  | 'Application Guidance Viewed'
  | 'Ready to Apply'
  | 'Application Submitted — Demo'
  | 'Under Review — Demo'
  | 'Completed — Demo';

export interface UserApplicationRecord {
  schemeId: string;
  status: ApplicationStatusType;
  applicationReferenceNumber: string;
  updatedAt: string;
  notes?: string;
}

export interface EligibilityMatchReason {
  criterion: string;
  status: 'compatible' | 'neutral' | 'incompatible';
  detail: string;
}

export interface SchemeMatchResult {
  scheme: GovernmentScheme;
  matchScore: number; // 0 to 100
  isRecommended: boolean;
  reasons: EligibilityMatchReason[];
  summaryNote: string;
}

export type UserRole = 'citizen' | 'admin';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  password?: string;
  state?: string;
  occupation?: OccupationType;
  authProvider?: 'email' | 'google';
  avatarUrl?: string;
  createdAt: string;
}

export interface GoogleAccount {
  id: string;
  email: string;
  name: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr' | 'kn';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechCode: string; // e.g. 'en-IN', 'hi-IN'
}

