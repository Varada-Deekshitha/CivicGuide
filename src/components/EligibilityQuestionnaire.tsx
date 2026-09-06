import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  RefreshCw,
  FileCheck2,
  ChevronRight,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  CitizenProfile,
  QuestionnaireAnswers,
  SchemeCategory,
  OccupationType,
  IncomeCategory,
  AreaType,
  GovernmentScheme
} from '../types';
import { rankSchemesForCitizen } from '../services/eligibilityEngine';
import { SCHEME_CATEGORIES } from '../data/schemes';

interface EligibilityQuestionnaireProps {
  schemes: GovernmentScheme[];
  profile: CitizenProfile;
  onUpdateProfileFromQuestionnaire: (updated: Partial<CitizenProfile>) => void;
  onSelectSchemeForDetails: (scheme: GovernmentScheme) => void;
  onSelectSchemeForDocuments: (scheme: GovernmentScheme) => void;
  onSelectSchemeForAi: (scheme: GovernmentScheme) => void;
}

export const EligibilityQuestionnaire: React.FC<EligibilityQuestionnaireProps> = ({
  schemes,
  profile,
  onUpdateProfileFromQuestionnaire,
  onSelectSchemeForDetails,
  onSelectSchemeForDocuments,
  onSelectSchemeForAi
}) => {
  const [step, setStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Questionnaire state initialized from user profile
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    ageGroup:
      profile.age < 18
        ? 'below_18'
        : profile.age <= 25
        ? '18_to_25'
        : profile.age <= 40
        ? '26_to_40'
        : profile.age <= 60
        ? '41_to_60'
        : 'above_60',
    exactAge: profile.age,
    occupation: profile.occupation,
    isStudent: profile.isStudent,
    incomeCategory: profile.incomeCategory,
    area: profile.area,
    gender: profile.gender,
    isDifferentlyAbled: profile.isDifferentlyAbled,
    hasBPLCard: profile.hasBPLCard,
    selectedCategories: ['Education', 'Healthcare', 'Employment', 'Financial Assistance'],
    specialIdentifiers: []
  });

  const totalSteps = 5;

  const toggleCategory = (cat: SchemeCategory) => {
    setAnswers((prev) => {
      const exists = prev.selectedCategories.includes(cat);
      if (exists) {
        return { ...prev, selectedCategories: prev.selectedCategories.filter((c) => c !== cat) };
      } else {
        return { ...prev, selectedCategories: [...prev.selectedCategories, cat] };
      }
    });
  };

  const toggleSpecialId = (id: string) => {
    setAnswers((prev) => {
      const exists = prev.specialIdentifiers.includes(id);
      if (exists) {
        return { ...prev, specialIdentifiers: prev.specialIdentifiers.filter((i) => i !== id) };
      } else {
        return { ...prev, specialIdentifiers: [...prev.specialIdentifiers, id] };
      }
    });
  };

  const handleCompleteQuestionnaire = () => {
    // Sync answers back to citizen profile
    onUpdateProfileFromQuestionnaire({
      age: answers.exactAge || (answers.ageGroup === '18_to_25' ? 22 : answers.ageGroup === '26_to_40' ? 32 : 55),
      occupation: answers.occupation,
      isStudent: answers.isStudent,
      incomeCategory: answers.incomeCategory,
      area: answers.area,
      gender: answers.gender,
      isDifferentlyAbled: answers.isDifferentlyAbled,
      hasBPLCard: answers.hasBPLCard
    });
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setStep(1);
  };

  // Matched schemes calculation using rule-based engine
  const matchedResults = rankSchemesForCitizen(schemes, profile, answers);
  const recommendedSchemes = matchedResults.filter((r) => r.isRecommended);

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-[#38483b] text-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-[#2d3a2f]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8ede9]/20 text-[#e8ede9] text-xs font-semibold mb-3 border border-[#8ca38f]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#8ca38f]" />
            <span>Interactive Rule-Based Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            Government Scheme Eligibility Questionnaire
          </h1>
          <p className="mt-2 text-sm text-[#e8ede9]/80 leading-relaxed">
            Answer 5 quick citizen questions to discover which Central and State public services and subsidies you may be eligible for. Matching uses transparent, predictable eligibility rules.
          </p>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-[32px] shadow-xs border border-[#e2dcd0] overflow-hidden">
          {/* Progress Header */}
          <div className="border-b border-[#e2dcd0] p-4 sm:p-6 bg-[#f9f7f2]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#5c5953] mb-2">
              <span>
                Step {step} of {totalSteps}:{' '}
                {step === 1 && 'Age & Residence'}
                {step === 2 && 'Occupation & Livelihood'}
                {step === 3 && 'Household Income & Ration Card'}
                {step === 4 && 'Desired Support Areas'}
                {step === 5 && 'Special Beneficiary Criteria'}
              </span>
              <span className="text-[#4a5d4e] font-bold">{Math.round((step / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-[#edeae1] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#4a5d4e] h-full transition-all duration-300 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Questionnaire Steps */}
          <div className="p-6 sm:p-8">
            {/* Step 1: Age & Residence */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2c2c] mb-1">
                    1. What is your age group?
                  </h3>
                  <p className="text-xs text-[#737067] mb-4">
                    Age is a primary factor for scholarships (15–35), youth skill programs (18–45), and pensions (60+).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'below_18', label: 'Under 18 years', desc: 'Minors & Child Welfare' },
                      { id: '18_to_25', label: '18 – 25 years', desc: 'Students & Early Youth' },
                      { id: '26_to_40', label: '26 – 40 years', desc: 'Working Adults & Artisans' },
                      { id: '41_to_60', label: '41 – 60 years', desc: 'Mature Workers & Homemakers' },
                      { id: 'above_60', label: '60+ years', desc: 'Senior Citizens & Retirees' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            ageGroup: opt.id as any,
                            exactAge:
                              opt.id === 'below_18'
                                ? 16
                                : opt.id === '18_to_25'
                                ? 22
                                : opt.id === '26_to_40'
                                ? 32
                                : opt.id === '41_to_60'
                                ? 48
                                : 65
                          })
                        }
                        className={`p-4 rounded-2xl border text-left transition ${
                          answers.ageGroup === opt.id
                            ? 'border-[#4a5d4e] bg-[#e8ede9]/60 ring-2 ring-[#4a5d4e]/20'
                            : 'border-[#e2dcd0] hover:border-[#8ca38f] bg-white'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#2c2c2c]">{opt.label}</div>
                        <div className="text-xs text-[#737067] mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e2dcd0]">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2c2c] mb-1">
                    Where do you currently reside?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                    {[
                      { id: 'rural', label: 'Rural Area', desc: 'Village or Gram Panchayat' },
                      { id: 'urban', label: 'Urban City / Town', desc: 'Municipal Corporation or Municipality' },
                      { id: 'semi_urban', label: 'Semi-Urban Area', desc: 'Town Periphery or Suburban' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAnswers({ ...answers, area: opt.id as AreaType })}
                        className={`p-4 rounded-2xl border text-left transition ${
                          answers.area === opt.id
                            ? 'border-[#4a5d4e] bg-[#e8ede9]/60 ring-2 ring-[#4a5d4e]/20'
                            : 'border-[#e2dcd0] hover:border-[#8ca38f] bg-white'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#2c2c2c]">{opt.label}</div>
                        <div className="text-xs text-[#737067] mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Occupation & Work */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2c2c] mb-1">
                    2. What is your primary occupation / activity?
                  </h3>
                  <p className="text-xs text-[#737067] mb-4">
                    Certain schemes are designated specifically for farmers, traditional artisans, students, or street vendors.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: 'student', label: '🎓 Student', desc: 'High school or higher education' },
                      { id: 'farmer', label: '🌾 Farmer / Agriculture', desc: 'Cultivator or agricultural laborer' },
                      { id: 'artisan', label: '🛠️ Artisan / Craftsman', desc: 'Carpenter, potter, tailor, blacksmith' },
                      { id: 'self_employed', label: '💼 Small Business / Shopkeeper', desc: 'Micro-entrepreneur, trader, store' },
                      { id: 'daily_wage', label: '🛒 Daily Wage / Street Vendor', desc: 'Hawker, gig worker, manual laborer' },
                      { id: 'salaried', label: '🏢 Salaried Employee', desc: 'Private or organized firm' },
                      { id: 'unemployed', label: '🔍 Job Seeker / Unemployed', desc: 'Looking for jobs or skill training' },
                      { id: 'senior_citizen', label: '👴 Senior Citizen / Retired', desc: 'Retired from active work' },
                      { id: 'homemaker', label: '🏡 Homemaker', desc: 'Managing domestic household' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            occupation: opt.id as OccupationType,
                            isStudent: opt.id === 'student'
                          })
                        }
                        className={`p-3.5 rounded-2xl border text-left transition ${
                          answers.occupation === opt.id
                            ? 'border-[#4a5d4e] bg-[#e8ede9]/60 ring-2 ring-[#4a5d4e]/20'
                            : 'border-[#e2dcd0] hover:border-[#8ca38f] bg-white'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#2c2c2c]">{opt.label}</div>
                        <div className="text-xs text-[#737067] mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#f9f7f2] border border-[#e2dcd0] rounded-2xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={answers.isStudent}
                      onChange={(e) => setAnswers({ ...answers, isStudent: e.target.checked })}
                      className="w-4 h-4 text-[#4a5d4e] rounded border-[#e2dcd0] focus:ring-[#4a5d4e] accent-[#4a5d4e]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2c2c2c]">
                        Are you currently an enrolled student in a school/college?
                      </div>
                      <div className="text-[11px] text-[#737067]">
                        Checking this automatically activates higher education scholarship matches.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Income & Ration Card */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2c2c] mb-1">
                    3. What is your approximate annual household income?
                  </h3>
                  <p className="text-xs text-[#737067] mb-4">
                    Subsidized healthcare, housing, and scholarships generally have income thresholds under ₹2.5L to ₹3L.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'below_1_5l',
                        label: 'Below ₹1.5 Lakh / year',
                        desc: 'EWS / BPL threshold (High priority for maximum welfare grants)'
                      },
                      {
                        id: '1_5l_to_3l',
                        label: '₹1.5 Lakh – ₹3 Lakh / year',
                        desc: 'Qualifies for National Scholarships, PMAY housing subsidy, and Mudra loans'
                      },
                      {
                        id: '3l_to_8l',
                        label: '₹3 Lakh – ₹8 Lakh / year',
                        desc: 'Middle income bracket (Eligible for enterprise loans, skill training, and pensions)'
                      },
                      {
                        id: 'above_8l',
                        label: 'Above ₹8 Lakh / year',
                        desc: 'General bracket (Eligible for universal credit schemes and small savings accounts)'
                      }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setAnswers({ ...answers, incomeCategory: opt.id as IncomeCategory })
                        }
                        className={`p-4 rounded-2xl border text-left transition ${
                          answers.incomeCategory === opt.id
                            ? 'border-[#4a5d4e] bg-[#e8ede9]/60 ring-2 ring-[#4a5d4e]/20'
                            : 'border-[#e2dcd0] hover:border-[#8ca38f] bg-white'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#2c2c2c]">{opt.label}</div>
                        <div className="text-xs text-[#737067] mt-1">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e2dcd0]">
                  <h4 className="text-xs font-bold text-[#4a5d4e] uppercase tracking-wider mb-2">
                    Household Deprivation Indicator
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="p-4 bg-[#f9f7f2] hover:bg-[#edeae1] rounded-2xl border border-[#e2dcd0] flex items-center gap-3 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={answers.hasBPLCard}
                        onChange={(e) => setAnswers({ ...answers, hasBPLCard: e.target.checked })}
                        className="w-4 h-4 text-[#4a5d4e] rounded border-[#e2dcd0] focus:ring-[#4a5d4e] accent-[#4a5d4e]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#2c2c2c]">
                          Possess Ration Card / BPL / Antyodaya Card
                        </div>
                        <div className="text-[11px] text-[#737067]">
                          Unlocks Ayushman Bharat & National Social Assistance
                        </div>
                      </div>
                    </label>

                    <label className="p-4 bg-[#f9f7f2] hover:bg-[#edeae1] rounded-2xl border border-[#e2dcd0] flex items-center gap-3 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={answers.isDifferentlyAbled}
                        onChange={(e) =>
                          setAnswers({ ...answers, isDifferentlyAbled: e.target.checked })
                        }
                        className="w-4 h-4 text-[#4a5d4e] rounded border-[#e2dcd0] focus:ring-[#4a5d4e] accent-[#4a5d4e]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#2c2c2c]">
                          Person with Disability (PwD / Divyangjan)
                        </div>
                        <div className="text-[11px] text-[#737067]">
                          Unlocks disability pension & higher scholarship allowances
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Desired Support Areas */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2c2c] mb-1">
                    4. Which type of government support are you seeking?
                  </h3>
                  <p className="text-xs text-[#737067] mb-4">
                    Choose one or more categories of interest to tailor scheme rankings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {SCHEME_CATEGORIES.filter((c) => c !== 'All').map((cat) => {
                    const isSelected = answers.selectedCategories.includes(cat as SchemeCategory);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat as SchemeCategory)}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                          isSelected
                            ? 'border-[#4a5d4e] bg-[#e8ede9]/60 ring-2 ring-[#4a5d4e]/20'
                            : 'border-[#e2dcd0] hover:border-[#8ca38f] bg-white'
                        }`}
                      >
                        <span className="font-semibold text-xs sm:text-sm text-[#2c2c2c]">
                          {cat}
                        </span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[#4a5d4e] shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#e2dcd0] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Special Identifiers */}
            {step === 5 && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2c2c] mb-1">
                    5. Do any of these specific citizen profiles apply to you?
                  </h3>
                  <p className="text-xs text-[#737067] mb-4">
                    Select any that describe your situation (optional, helps find dedicated targeted schemes):
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'landholder',
                      label: '🌾 Cultivable Agricultural Landholder',
                      desc: 'Own or farm registered agricultural land (PM-KISAN match)'
                    },
                    {
                      id: 'street_vendor',
                      label: '🛒 Street Vendor / Roadside Hawker',
                      desc: 'Vending fruits, vegetables, snacks, or daily articles (PM SVANidhi match)'
                    },
                    {
                      id: 'artisan',
                      label: '🪚 Traditional Artisan / Craftsperson',
                      desc: 'Working with hands and tools in 18 traditional crafts (PM Vishwakarma match)'
                    },
                    {
                      id: 'girl_child_parent',
                      label: '👧 Parent of Girl Child (under 10 yrs)',
                      desc: 'Eligible for Sukanya Samriddhi high-interest savings'
                    },
                    {
                      id: 'entrepreneur',
                      label: '💡 Aspiring Entrepreneur / First-Time Business',
                      desc: 'Planning a new startup or micro-enterprise (Mudra & Stand-Up India)'
                    }
                  ].map((item) => {
                    const isSelected = answers.specialIdentifiers.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleSpecialId(item.id)}
                        className={`p-4 rounded-2xl border text-left transition ${
                          isSelected
                            ? 'border-[#4a5d4e] bg-[#e8ede9]/60 ring-2 ring-[#4a5d4e]/20'
                            : 'border-[#e2dcd0] hover:border-[#8ca38f] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-sm text-[#2c2c2c]">{item.label}</div>
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-[#4a5d4e] shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-[#e2dcd0] shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-[#737067] mt-1">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-[#e2dcd0] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-medium text-[#4a5d4e] hover:text-[#2c2c2c] bg-[#edeae1] hover:bg-[#e2dcd0] rounded-full flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous Step
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-[#4a5d4e] hover:bg-[#364539] rounded-full flex items-center gap-1.5 shadow-xs transition"
                >
                  Next Step
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteQuestionnaire}
                  className="px-6 py-2.5 text-xs font-medium text-white bg-[#c87a53] hover:bg-[#b56b46] rounded-full flex items-center gap-2 shadow-xs transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Eligible Schemes
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          {/* Indicative Disclaimer Banner */}
          <div className="bg-[#fbf5f0] border border-[#f0ded5] rounded-2xl p-4 text-[#8a4b2a] text-xs flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 text-[#c87a53] shrink-0 mt-0.5" />
            <div>
              <strong className="font-serif font-bold block text-sm mb-0.5">
                Official Eligibility Disclaimer:
              </strong>
              You may be eligible based on the information provided. These recommendations are calculated using transparent indicative rules. Citizens must verify the latest official criteria and deadlines on official portals before applying.
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="bg-white rounded-[24px] border border-[#e2dcd0] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#4a5d4e]">
                Found {recommendedSchemes.length} Potentially Relevant Schemes
              </h2>
              <p className="text-xs text-[#737067]">
                Ranked by rule compatibility with your profile ({profile.age} yrs, {profile.occupation}, {profile.state}).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-full border border-[#e2dcd0] text-[#4a5d4e] hover:bg-[#f9f7f2] text-xs font-medium flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#4a5d4e]" />
                <span>Retake Questions</span>
              </button>
            </div>
          </div>

          {/* Matched Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recommendedSchemes.map((result) => {
              const { scheme, matchScore, reasons } = result;
              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-[28px] border border-[#e2dcd0] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Category + Match Score Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#e8ede9] text-[#4a5d4e]">
                        {scheme.category}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f4f1ea] text-[#4a5d4e] border border-[#d2ddd4]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4a5d4e]" />
                        <span>{matchScore}% Compatibility</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#2c2c2c] leading-snug">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-[#737067] mt-1.5 line-clamp-2 leading-relaxed">
                      {scheme.shortDescription}
                    </p>

                    {/* Transparent "Why this scheme may be relevant" */}
                    <div className="mt-4 p-4 bg-[#f9f7f2] rounded-2xl border border-[#e2dcd0] space-y-2">
                      <div className="text-[11px] font-bold text-[#4a5d4e] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4a5d4e]" />
                        <span>Why this scheme may be relevant:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#5c5953]">
                        {reasons.slice(0, 3).map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span
                              className={`shrink-0 font-bold ${
                                r.status === 'compatible'
                                  ? 'text-[#4a5d4e]'
                                  : r.status === 'neutral'
                                  ? 'text-[#c87a53]'
                                  : 'text-rose-600'
                              }`}
                            >
                              {r.status === 'compatible' ? '✓' : r.status === 'neutral' ? '•' : '✗'}
                            </span>
                            <span>{r.detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Benefit Highlight */}
                    <div className="mt-3 text-xs text-[#2c2c2c] bg-[#e8ede9]/50 p-3 rounded-2xl border border-[#d2ddd4]">
                      <strong className="text-[#4a5d4e] font-semibold block text-[11px] mb-0.5">
                        Primary Citizen Benefit:
                      </strong>
                      <span>{scheme.mainBenefits[0]}</span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-5 pt-3 border-t border-[#e2dcd0] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectSchemeForDetails(scheme)}
                      className="text-xs font-semibold text-[#4a5d4e] hover:text-[#c87a53] flex items-center gap-1 transition"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectSchemeForAi(scheme)}
                        className="px-3 py-1.5 rounded-full bg-[#fbf5f0] hover:bg-[#f5e6de] text-[#c87a53] text-[11px] font-medium border border-[#f0ded5] flex items-center gap-1 transition"
                        title="Plain-Language AI Explainer"
                      >
                        <Sparkles className="w-3 h-3 text-[#c87a53]" />
                        <span>AI Explain</span>
                      </button>

                      <button
                        onClick={() => onSelectSchemeForDocuments(scheme)}
                        className="px-3.5 py-1.5 rounded-full bg-[#4a5d4e] hover:bg-[#364539] text-white text-[11px] font-medium flex items-center gap-1 transition shadow-xs"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-[#8ca38f]" />
                        <span>Documents</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
