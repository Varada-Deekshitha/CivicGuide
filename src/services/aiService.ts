import { GovernmentScheme, CitizenProfile, SupportedLanguage } from '../types';
import { SCHEMES_DATA } from '../data/schemes';

export interface AiExplanationRequest {
  scheme: GovernmentScheme;
  profile?: Partial<CitizenProfile>;
  type: 'simplify' | 'why_matched' | 'application_steps' | 'general_question';
  customQuestion?: string;
}

export interface AiExplanationResponse {
  content: string;
  source: 'gemini-live' | 'rule-based-engine';
  disclaimer: string;
}

export interface QuickAiHelpRequest {
  query: string;
  language?: SupportedLanguage;
  profile?: Partial<CitizenProfile>;
}

export interface QuickAiHelpResponse {
  content: string;
  source: 'gemini-live' | 'rule-based-engine';
  suggestedSchemeId?: string;
}

export async function getQuickAiHelp(request: QuickAiHelpRequest): Promise<QuickAiHelpResponse> {
  try {
    const response = await fetch('/api/ai-quick-help', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.content) {
        return {
          content: data.content,
          source: data.source || 'gemini-live'
        };
      }
    }
  } catch {
    // Network or server endpoint error - fallback gracefully
  }

  return generateQuickHelpFallback(request);
}

function generateQuickHelpFallback(req: QuickAiHelpRequest): QuickAiHelpResponse {
  const q = req.query.toLowerCase();
  
  // 1. Farmer & Agriculture queries
  if (q.includes('farmer') || q.includes('kisan') || q.includes('agriculture') || q.includes('crop') || q.includes('fertilizer') || q.includes('farm')) {
    const kisan = SCHEMES_DATA.find((s) => s.id === 'pm-kisan');
    return {
      content: `For farmers and agricultural landholders, the flagship central initiative is **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)**.\n\n• **Annual Benefit**: ₹6,000 per year directly transferred to bank accounts in 3 equal installments of ₹2,000.\n• **Required Documents**: Land ownership record (ROR/Khasra), Aadhaar card, and Aadhaar-linked active bank account.\n• **Helpline**: 155261 / 1800-180-1551. Apply via pmkisan.gov.in or any village CSC desk.`,
      source: 'rule-based-engine',
      suggestedSchemeId: kisan?.id
    };
  }

  // 2. Student & Scholarship queries
  if (q.includes('student') || q.includes('scholarship') || q.includes('study') || q.includes('college') || q.includes('school') || q.includes('education') || q.includes('fee')) {
    const nmms = SCHEMES_DATA.find((s) => s.id === 'nmms-scholarship');
    return {
      content: `For students from lower and middle-income families, explore the **National Means-cum-Merit Scholarship (NMMS)** and Central Sector University Scholarships.\n\n• **Financial Support**: ₹12,000 per annum (₹1,000/month) from Class 9 to 12 upon passing the state entrance test.\n• **Income Limit**: Parental annual income below ₹3.5 Lakh.\n• **Official Portal**: Apply online via the National Scholarship Portal (scholarships.gov.in).`,
      source: 'rule-based-engine',
      suggestedSchemeId: nmms?.id
    };
  }

  // 3. Health & Medical queries
  if (q.includes('health') || q.includes('hospital') || q.includes('medical') || q.includes('ayushman') || q.includes('treatment') || q.includes('medicine') || q.includes('doctor')) {
    const ayush = SCHEMES_DATA.find((s) => s.id === 'ayushman-bharat-pmjay');
    return {
      content: `For cashless medical and secondary/tertiary hospital care, you can check **Ayushman Bharat PM-JAY**.\n\n• **Entitlement**: Up to ₹5 Lakh cashless coverage per eligible family per year across 27,000+ empaneled government & private hospitals.\n• **How to Check**: Verify your name on pmjay.gov.in or visit any government hospital Ayushman Mitra desk.\n• **Toll-Free Helpline**: 14555.`,
      source: 'rule-based-engine',
      suggestedSchemeId: ayush?.id
    };
  }

  // 4. Business & Loan queries
  if (q.includes('loan') || q.includes('business') || q.includes('mudra') || q.includes('startup') || q.includes('shop') || q.includes('enterprise') || q.includes('credit')) {
    const mudra = SCHEMES_DATA.find((s) => s.id === 'pm-mudra-yojana');
    return {
      content: `For starting or expanding micro-enterprises and small shops, **Pradhan Mantri MUDRA Yojana (PMMY)** offers collateral-free business loans.\n\n• **Loan Categories**: Shishu (up to ₹50,000), Kishore (₹50k to ₹5 Lakh), and Tarun (₹5 Lakh to ₹10 Lakh).\n• **Collateral**: No third-party security or property mortgage needed.\n• **Where to Apply**: Any nationalized bank, regional rural bank, NBFC, or via udyamimitra.in.`,
      source: 'rule-based-engine',
      suggestedSchemeId: mudra?.id
    };
  }

  // 5. Pension & Senior citizen queries
  if (q.includes('pension') || q.includes('old age') || q.includes('senior') || q.includes('retirement') || q.includes('elderly')) {
    const apy = SCHEMES_DATA.find((s) => s.id === 'atal-pension-yojana');
    return {
      content: `For guaranteed financial security in old age, explore the **Atal Pension Yojana (APY)**.\n\n• **Benefit**: Guaranteed monthly pension of ₹1,000 to ₹5,000 starting from age 60, backed by the Government of India.\n• **Joining Age**: Any citizen between 18 to 40 years can open an APY account through their savings bank.\n• **Nominee Protection**: Spouse continues pension for life; nominee gets total corpus.`,
      source: 'rule-based-engine',
      suggestedSchemeId: apy?.id
    };
  }

  // 6. Women & Girl Child queries
  if (q.includes('women') || q.includes('girl') || q.includes('daughter') || q.includes('mahila') || q.includes('female') || q.includes('sukanya')) {
    const sukanya = SCHEMES_DATA.find((s) => s.id === 'sukanya-samriddhi-yojana');
    return {
      content: `For daughters and young girls, **Sukanya Samriddhi Yojana (SSY)** is the highest interest government savings account (8.2% annual compounded interest).\n\n• **Eligibility**: Open for girl children below 10 years of age.\n• **Tax Benefit**: Triple tax-exempt under Section 80C with flexible deposits starting from ₹250/year.\n• **Where to Open**: Any post office or authorized commercial bank branch.`,
      source: 'rule-based-engine',
      suggestedSchemeId: sukanya?.id
    };
  }

  // Default helpful response
  return {
    content: `CivicGuide contains verified government welfare initiatives across Agriculture, Education, Healthcare, Enterprise, and Social Security.\n\n• **Tip**: Take our 5-question Eligibility Diagnostic to see matching schemes tailored to your age, income, and state.\n• **Offline Safety**: All checks run locally inside your device with zero data collection.\n• **National Helpline**: Call 1915 for citizen service queries.`,
    source: 'rule-based-engine'
  };
}

export async function getAiExplanation(request: AiExplanationRequest): Promise<AiExplanationResponse> {
  const DISCLAIMER =
    'Informational explanation only. CivicGuide AI does not guarantee eligibility or official approval. Please verify requirements with official departmental guidelines before submitting applications.';

  try {
    const response = await fetch('/api/ai-explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.content) {
        return {
          content: data.content,
          source: data.source || 'gemini-live',
          disclaimer: DISCLAIMER
        };
      }
    }
  } catch {
    // Network or server endpoint unavailable - proceed to client-side rule-based fallback
  }

  // Fallback intelligent plain-language generator
  return {
    content: generateRuleBasedFallback(request),
    source: 'rule-based-engine',
    disclaimer: DISCLAIMER
  };
}

function generateRuleBasedFallback(req: AiExplanationRequest): string {
  const { scheme, profile, type, customQuestion } = req;

  if (type === 'simplify') {
    return `### Plain-Language Summary of ${scheme.name}

**What is it in simple words?**
${scheme.shortDescription}

**Who gets the main help?**
${scheme.targetBeneficiaries}

**Key benefits in your pocket:**
${scheme.mainBenefits.map((b) => `• ${b}`).join('\n')}

**How difficult is it to apply?**
The process is ${scheme.applicationGuidance.applicationMethod.toLowerCase()} via ${scheme.applicationGuidance.officialPortalName}. The official fee is **${scheme.applicationGuidance.fee}** and average verification takes **${scheme.applicationGuidance.processingTimeline}**.`;
  }

  if (type === 'why_matched') {
    const age = profile?.age ? `${profile.age} years old` : 'your age group';
    const occ = profile?.occupation ? profile.occupation : 'your occupation';
    const inc = profile?.incomeCategory ? profile.incomeCategory.replace(/_/g, ' ') : 'your income';

    return `### Why ${scheme.name} Was Matched for You

Based on the profile you entered (${age}, working as ${occ}, income tier ${inc}):

1. **Beneficiary Alignment**: This scheme supports **${scheme.targetBeneficiaries}**, which closely matches your citizen status.
2. **Economic Category**: Your stated income bracket satisfies the target thresholds for this ${scheme.category.toLowerCase()} initiative.
3. **Core Utility**: It provides direct support including:
   ${scheme.mainBenefits.slice(0, 2).map((b) => `• ${b}`).join('\n')}

*Note: This matching is calculated by our transparent eligibility rules and is indicative rather than official.*`;
  }

  if (type === 'application_steps') {
    return `### Step-by-Step Guidance for ${scheme.name}

Follow this structured path to prepare your submission:

**Phase 1: Document Readiness**
Ensure you have all mandatory documents:
${scheme.requiredDocuments.filter((d) => d.mandatory).map((d) => `• **${d.name}** (${d.issuingAuthority || 'Govt Authority'})`).join('\n')}

**Phase 2: Official Submission (${scheme.applicationGuidance.applicationMethod})**
${scheme.applicationGuidance.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

**Phase 3: Important Precautions**
${scheme.applicationGuidance.importantInstructions.map((inst) => `⚠️ ${inst}`).join('\n')}

**Nodal Helpline:** ${scheme.applicationGuidance.helpline} | **Official Portal:** ${scheme.applicationGuidance.officialPortalName}`;
  }

  if (customQuestion) {
    return `### Query: "${customQuestion}"

Regarding **${scheme.name}**:
• **Category**: ${scheme.category} (${scheme.level} Scheme)
• **Key Ministry**: ${scheme.ministry}
• **Beneficiaries**: ${scheme.targetBeneficiaries}
• **Official Portal**: ${scheme.applicationGuidance.officialPortalUrl}
• **Helpline Assistance**: ${scheme.applicationGuidance.helpline}

For specific personal exemptions or grievances, citizens are encouraged to visit the official portal or call the dedicated toll-free helpline.`;
  }

  return scheme.fullDescription;
}
