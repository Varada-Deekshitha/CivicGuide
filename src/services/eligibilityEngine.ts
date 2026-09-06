import {
  CitizenProfile,
  QuestionnaireAnswers,
  GovernmentScheme,
  SchemeMatchResult,
  EligibilityMatchReason
} from '../types';

export function evaluateSchemeEligibility(
  scheme: GovernmentScheme,
  profile: Partial<CitizenProfile>,
  answers?: Partial<QuestionnaireAnswers>
): SchemeMatchResult {
  const reasons: EligibilityMatchReason[] = [];
  let score = 50; // base score

  // 1. Age Check
  const userAge = profile.age ?? (answers?.exactAge ?? (answers?.ageGroup === 'below_18' ? 16 : answers?.ageGroup === '18_to_25' ? 22 : answers?.ageGroup === '26_to_40' ? 32 : answers?.ageGroup === '41_to_60' ? 50 : 65));
  
  const minAge = scheme.eligibilityRules.minAge;
  const maxAge = scheme.eligibilityRules.maxAge;

  if (minAge !== undefined || maxAge !== undefined) {
    if (minAge !== undefined && userAge < minAge) {
      reasons.push({
        criterion: 'Age Criteria',
        status: 'incompatible',
        detail: `Minimum age required is ${minAge} years (provided age: ${userAge} years).`
      });
      score -= 30;
    } else if (maxAge !== undefined && userAge > maxAge) {
      reasons.push({
        criterion: 'Age Criteria',
        status: 'incompatible',
        detail: `Maximum eligible age limit is ${maxAge} years (provided age: ${userAge} years).`
      });
      score -= 30;
    } else {
      reasons.push({
        criterion: 'Age Requirement',
        status: 'compatible',
        detail: `Age requirement appears compatible (${userAge} years aligns with range ${minAge ?? 0}–${maxAge ?? 'No upper limit'}).`
      });
      score += 15;
    }
  } else {
    reasons.push({
      criterion: 'Age Requirement',
      status: 'neutral',
      detail: 'No specific age ceiling; open across family brackets.'
    });
    score += 5;
  }

  // 2. Occupation & Student Check
  const userOccupation = profile.occupation ?? answers?.occupation;
  const isStudent = profile.isStudent ?? answers?.isStudent;

  if (scheme.eligibilityRules.studentOnly) {
    if (isStudent || userOccupation === 'student') {
      reasons.push({
        criterion: 'Student Status',
        status: 'compatible',
        detail: 'Active student status directly satisfies higher education beneficiary criteria.'
      });
      score += 25;
    } else {
      reasons.push({
        criterion: 'Student Status',
        status: 'incompatible',
        detail: 'This scheme is specifically tailored for enrolled students.'
      });
      score -= 40;
    }
  } else if (scheme.eligibilityRules.allowedOccupations && scheme.eligibilityRules.allowedOccupations.length > 0) {
    if (userOccupation && scheme.eligibilityRules.allowedOccupations.includes(userOccupation)) {
      reasons.push({
        criterion: 'Occupation Compatibility',
        status: 'compatible',
        detail: `Occupation (${formatOccupation(userOccupation)}) matches targeted beneficiary groups.`
      });
      score += 20;
    } else {
      reasons.push({
        criterion: 'Occupation Compatibility',
        status: 'neutral',
        detail: `Primary focus is on ${scheme.eligibilityRules.allowedOccupations.map(formatOccupation).join(', ')}. General citizens may apply if related criteria are met.`
      });
      score -= 10;
    }
  } else {
    reasons.push({
      criterion: 'Occupation Category',
      status: 'compatible',
      detail: 'Open across all occupational and livelihood backgrounds.'
    });
    score += 10;
  }

  // 3. Income Category Check
  const userIncome = profile.incomeCategory ?? answers?.incomeCategory;
  if (scheme.eligibilityRules.allowedIncomeCategories && scheme.eligibilityRules.allowedIncomeCategories.length > 0) {
    if (userIncome && scheme.eligibilityRules.allowedIncomeCategories.includes(userIncome)) {
      reasons.push({
        criterion: 'Income Category',
        status: 'compatible',
        detail: `Income category (${formatIncome(userIncome)}) appears compatible with economic eligibility thresholds.`
      });
      score += 20;
    } else if (userIncome === 'above_8l') {
      reasons.push({
        criterion: 'Income Ceiling',
        status: 'incompatible',
        detail: 'Income tier exceeds subsidized welfare thresholds (usually targeted up to ₹3L–₹8L).'
      });
      score -= 25;
    } else {
      reasons.push({
        criterion: 'Income Criteria',
        status: 'neutral',
        detail: 'Income verification subject to local revenue officer / tahsildar certification.'
      });
    }
  } else {
    reasons.push({
      criterion: 'Income Requirement',
      status: 'compatible',
      detail: 'Universal benefit or not constrained by strict income ceilings.'
    });
    score += 10;
  }

  // 4. Area Check (Rural / Urban)
  const userArea = profile.area ?? answers?.area;
  if (scheme.eligibilityRules.areaEligibility && scheme.eligibilityRules.areaEligibility.length > 0) {
    if (userArea && scheme.eligibilityRules.areaEligibility.includes(userArea)) {
      reasons.push({
        criterion: 'Geographic Area',
        status: 'compatible',
        detail: `Domicile in ${userArea.replace('_', '-')} sector qualifies under target regional rollout.`
      });
      score += 10;
    } else if (userArea) {
      reasons.push({
        criterion: 'Geographic Focus',
        status: 'neutral',
        detail: `Specifically prioritizes ${scheme.eligibilityRules.areaEligibility.join(', ')} residents.`
      });
      score -= 10;
    }
  }

  // 5. Gender / Special Category Check
  const userGender = profile.gender ?? answers?.gender;
  if (scheme.eligibilityRules.allowedGenders && scheme.eligibilityRules.allowedGenders.length > 0) {
    if (scheme.eligibilityRules.allowedGenders.includes('all') || (userGender && scheme.eligibilityRules.allowedGenders.includes(userGender))) {
      reasons.push({
        criterion: 'Gender / Target Group',
        status: 'compatible',
        detail: 'Beneficiary group requirements satisfied.'
      });
      score += 10;
    } else {
      reasons.push({
        criterion: 'Target Group Focus',
        status: 'neutral',
        detail: `Prioritizes ${scheme.eligibilityRules.allowedGenders.join(', ')} applicants.`
      });
      score -= 15;
    }
  }

  // 6. BPL card / Deprivation Check
  const hasBPL = profile.hasBPLCard ?? answers?.hasBPLCard;
  if (scheme.eligibilityRules.requiresBPL) {
    if (hasBPL) {
      reasons.push({
        criterion: 'BPL / SECC Priority',
        status: 'compatible',
        detail: 'BPL/Ration Card status confirms high priority under deprivation guidelines.'
      });
      score += 20;
    } else {
      reasons.push({
        criterion: 'BPL Requirement',
        status: 'neutral',
        detail: 'Targeted primarily at BPL / SECC database families. Non-BPL individuals may have limited access.'
      });
      score -= 15;
    }
  }

  // 7. Preferred Category Boost (from questionnaire)
  if (answers?.selectedCategories && answers.selectedCategories.includes(scheme.category)) {
    score += 15;
  }

  // Normalize score between 10 and 98% (never 100% to reflect indicative disclaimer)
  const normalizedScore = Math.max(15, Math.min(98, score));
  const isRecommended = normalizedScore >= 55;

  return {
    scheme,
    matchScore: normalizedScore,
    isRecommended,
    reasons,
    summaryNote:
      normalizedScore >= 75
        ? 'High Potential Alignment: Multiple profile indicators match core beneficiary criteria.'
        : normalizedScore >= 50
        ? 'Moderate Alignment: Several basic requirements match, but specific verification is advised.'
        : 'Limited Direct Alignment: General scheme that may have alternative eligibility routes.'
  };
}

export function rankSchemesForCitizen(
  schemes: GovernmentScheme[],
  profile: Partial<CitizenProfile>,
  answers?: Partial<QuestionnaireAnswers>
): SchemeMatchResult[] {
  const results = schemes.map((scheme) => evaluateSchemeEligibility(scheme, profile, answers));
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

function formatOccupation(occ: string): string {
  const map: Record<string, string> = {
    student: 'Student',
    farmer: 'Farmer / Agriculturalist',
    salaried: 'Salaried Employee',
    self_employed: 'Self-Employed / Business Owner',
    daily_wage: 'Daily Wage / Gig Worker',
    unemployed: 'Job Seeker / Unemployed',
    homemaker: 'Homemaker',
    senior_citizen: 'Senior Citizen / Retiree',
    artisan: 'Artisan / Traditional Craftsman',
    other: 'Other'
  };
  return map[occ] || occ;
}

function formatIncome(inc: string): string {
  const map: Record<string, string> = {
    below_1_5l: 'Below ₹1.5 Lakh / yr (EWS)',
    '1_5l_to_3l': '₹1.5 Lakh – ₹3 Lakh / yr',
    '3l_to_8l': '₹3 Lakh – ₹8 Lakh / yr',
    above_8l: 'Above ₹8 Lakh / yr'
  };
  return map[inc] || inc;
}
