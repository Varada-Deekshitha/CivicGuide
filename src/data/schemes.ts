import { GovernmentScheme } from '../types';

export const SCHEMES_DATA: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-Kisan Samman Nidhi (PM-KISAN)',
    shortDescription: 'Direct income support of ₹6,000 per year in three equal installments for eligible small and marginal farmer families.',
    fullDescription: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme with 100% funding from the Government of India. Under the scheme, income support of ₹6,000/- per year in three equal installments of ₹2,000/- each every four months is provided to all landholding farmer families.',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    level: 'Central',
    category: 'Agriculture',
    targetBeneficiaries: 'Small and Marginal Landholding Farmer Families across India',
    mainBenefits: [
      '₹6,000 annual financial aid credited directly via Direct Benefit Transfer (DBT)',
      'Paid in 3 equal four-monthly installments of ₹2,000 each',
      'No collateral or loan repayment requirement; 100% grant',
      'Direct link with Kisan Credit Card (KCC) for concession credit'
    ],
    basicEligibilitySummary: 'Landholder farmer families with cultivable landholding in their names. Institutional landholders and high-taxpayers are excluded.',
    eligibilityRules: {
      minAge: 18,
      allowedOccupations: ['farmer'],
      allowedIncomeCategories: ['below_1_5l', '1_5l_to_3l', '3l_to_8l'],
      allowedStates: ['All'],
      areaEligibility: ['rural', 'semi_urban'],
      specialTags: ['landholder']
    },
    requiredDocuments: [
      {
        id: 'aadhaar',
        name: 'Aadhaar Card of Landholder',
        description: 'Mandatory biometric identity proof linked with mobile number for OTP eKYC verification.',
        mandatory: true,
        issuingAuthority: 'UIDAI'
      },
      {
        id: 'land-records',
        name: 'Land Ownership Document / Khatauni / RoR',
        description: 'Revenue record showing registered agricultural land title in the applicant’s name.',
        mandatory: true,
        issuingAuthority: 'State Revenue Department / Patwari'
      },
      {
        id: 'bank-passbook',
        name: 'Bank Account Passbook (Aadhaar Seeded)',
        description: 'Copy of active savings bank account passbook with IFSC code for DBT transfer.',
        mandatory: true,
        issuingAuthority: 'Authorized Commercial/Gramin Bank'
      },
      {
        id: 'citizenship-proof',
        name: 'State Domicile / Address Proof',
        description: 'Voter ID or Domicile certificate proving village residency.',
        mandatory: false,
        issuingAuthority: 'Tahsildar / Village Panchayat'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'PM-KISAN Official Citizen Portal',
      officialPortalUrl: 'https://pmkisan.gov.in',
      steps: [
        'Visit the PM-KISAN web portal and navigate to "Farmer Corner".',
        'Select "New Farmer Registration" and enter Aadhaar Number, State, and Captcha.',
        'Fill landholding survey number, Khasra number, and land area details.',
        'Upload verified land ownership documents and submit Aadhaar OTP eKYC.',
        'Alternatively, visit the nearest Common Service Centre (CSC) or Village Agriculture Officer.'
      ],
      importantInstructions: [
        'Aadhaar must be strictly seeded with your bank account for DBT payment success.',
        'Income tax payers in the previous assessment year are not eligible.',
        'Periodic eKYC via biometric or facial recognition is mandatory every 6 months.'
      ],
      processingTimeline: '15–30 days for State Nodal Verification',
      fee: 'Free of cost on portal (nominal ₹15 at CSCs)',
      nodalDepartment: 'Department of Agriculture & Farmers Welfare',
      helpline: '155261 / 1800115526 (Toll-Free)'
    },
    tags: ['Farmers', 'Agriculture', 'Direct Benefit Transfer', 'Rural Support'],
    isDemo: true
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY (Health Protection)',
    shortDescription: 'Free health insurance cover of up to ₹5,00,000 per family per year for secondary and tertiary hospitalized care.',
    fullDescription: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world’s largest health assurance scheme. It provides a health cover of ₹5 Lakh per eligible family per year for secondary and tertiary care hospitalization across public and private empaneled hospitals.',
    ministry: 'Ministry of Health and Family Welfare',
    level: 'Central & State',
    category: 'Healthcare',
    targetBeneficiaries: 'Bottom 40% economically vulnerable families (SECC 2011 Deprivation Criteria)',
    mainBenefits: [
      'Cashless and paperless access to medical services up to ₹5 Lakh/family/year',
      'Covers pre-hospitalization (3 days) and post-hospitalization (15 days)',
      'Over 1,900 surgical and medical procedures covered including medicines and diagnostics',
      'No restrictions on family size, age, or gender'
    ],
    basicEligibilitySummary: 'Families listed under SECC 2011 database or state-notified low income/BPL criteria.',
    eligibilityRules: {
      allowedIncomeCategories: ['below_1_5l', '1_5l_to_3l'],
      allowedStates: ['All'],
      requiresBPL: true
    },
    requiredDocuments: [
      {
        id: 'aadhaar-health',
        name: 'Aadhaar Card / Government Photo ID',
        description: 'Identity proof of each family member to be added on Ayushman Golden Card.',
        mandatory: true,
        issuingAuthority: 'UIDAI'
      },
      {
        id: 'ration-card',
        name: 'Ration Card / BPL Card',
        description: 'Family Ration Card (NFSA/State BPL) showing registered household members.',
        mandatory: true,
        issuingAuthority: 'Food & Civil Supplies Department'
      },
      {
        id: 'income-cert',
        name: 'Income Certificate / SECC Letter',
        description: 'Valid income proof or PM letter verifying deprivation criteria.',
        mandatory: false,
        issuingAuthority: 'Revenue Department'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'National Health Authority (NHA) Beneficiary Portal',
      officialPortalUrl: 'https://beneficiary.nha.gov.in',
      steps: [
        'Visit beneficiary.nha.gov.in and login using your mobile number.',
        'Search beneficiary status by Ration Card number, Aadhaar number, or PM-JAY ID.',
        'If eligible family record appears, initiate Aadhaar eKYC.',
        'Download and print the Ayushman Golden Card immediately upon verification.',
        'Alternatively, visit any government hospital "Ayushman Mitra" desk for on-the-spot card creation.'
      ],
      importantInstructions: [
        'Treatment is completely cashless at all empaneled private and government hospitals.',
        'Carry your Ayushman PVC Card or e-Card along with Aadhaar when visiting the hospital.',
        'No registration agent should charge any fee for medical hospital services.'
      ],
      processingTimeline: 'Instant on-the-spot verification if name is in SECC/NFSA database',
      fee: 'Free of cost',
      nodalDepartment: 'National Health Authority (NHA)',
      helpline: '14555 (Toll-Free)'
    },
    tags: ['Health', 'Insurance', 'Hospitalization', 'BPL Families', 'Cashless'],
    isDemo: true
  },
  {
    id: 'pm-awas-yojana',
    name: 'Pradhan Mantri Awas Yojana (PMAY Housing)',
    shortDescription: 'Financial subsidy and assistance up to ₹2.67 Lakh for building or purchasing a permanent (pucca) home.',
    fullDescription: 'PMAY addresses urban and rural housing shortages among Economically Weaker Sections (EWS) and Low-Income Groups (LIG). Beneficiaries receive credit-linked interest subsidies or direct construction assistance to build dignified pucca houses with basic amenities like water, sanitation, and electricity.',
    ministry: 'Ministry of Housing and Urban Affairs',
    level: 'Central & State',
    category: 'Housing',
    targetBeneficiaries: 'Families without a permanent pucca house; EWS/LIG households, women owners prioritized',
    mainBenefits: [
      'Up to ₹2.67 Lakh interest subsidy on home loans under Credit Linked Subsidy Scheme (CLSS)',
      'Direct grant of ₹1.20 Lakh to ₹1.30 Lakh for rural house construction',
      'Mandatory female ownership or co-ownership of the house',
      'Includes basic amenities like toilet, electricity, and clean cooking connection'
    ],
    basicEligibilitySummary: 'Applicant family must not own a pucca house anywhere in India. Annual household income within EWS (up to ₹3L) or LIG (up to ₹6L).',
    eligibilityRules: {
      minAge: 21,
      allowedIncomeCategories: ['below_1_5l', '1_5l_to_3l', '3l_to_8l'],
      allowedStates: ['All']
    },
    requiredDocuments: [
      {
        id: 'aadhaar-housing',
        name: 'Aadhaar Cards of All Family Members',
        description: 'Mandatory identification for head of family and co-owner.',
        mandatory: true,
        issuingAuthority: 'UIDAI'
      },
      {
        id: 'income-proof-housing',
        name: 'Income Certificate / Salary Slip',
        description: 'Certified income proof to determine EWS / LIG subsidy bracket.',
        mandatory: true,
        issuingAuthority: 'Tahsildar / Employer'
      },
      {
        id: 'affidavit-no-pucca',
        name: 'Affidavit Confirming No Pucca House Owned',
        description: 'Self-declaration stamped by notary verifying no existing permanent home.',
        mandatory: true,
        issuingAuthority: 'Notary / Judicial Magistrate'
      },
      {
        id: 'property-land-doc',
        name: 'Land Title / Agreement to Sale',
        description: 'Property documents where house is to be constructed or purchased.',
        mandatory: true,
        issuingAuthority: 'Sub-Registrar Office'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'PMAY Urban / PMAY Gramin MIS Portal',
      officialPortalUrl: 'https://pmaymis.gov.in',
      steps: [
        'Visit pmaymis.gov.in and click on "Citizen Assessment".',
        'Choose "Benefit under other 3 components" or rural scheme option.',
        'Enter Aadhaar number and verify name.',
        'Enter family details, present address, income particulars, and bank details.',
        'Save application number and track status through the CLSS tracker.'
      ],
      importantInstructions: [
        'House must be registered in the name of the female head or joint ownership with husband.',
        'Do not pay any middlemen or unauthorized agencies.',
        'Construction progress is geo-tagged before releasing fund installments.'
      ],
      processingTimeline: '45–90 days for verification and loan subsidy sanction',
      fee: 'Free of cost',
      nodalDepartment: 'Housing & Urban Development Department',
      helpline: '011-23063285 / 1800-11-6163'
    },
    tags: ['Housing', 'Subsidy', 'PMAY', 'Home Loan', 'EWS'],
    isDemo: true
  },
  {
    id: 'post-matric-scholarship',
    name: 'National Post-Matric Scholarship Scheme',
    shortDescription: 'Scholarships covering 100% compulsory non-refundable fees plus annual maintenance allowance for college students.',
    fullDescription: 'Centrally sponsored scholarship scheme implemented by State Governments to provide financial support to SC, ST, OBC, and economically weaker students studying at post-matriculation or post-secondary stages (Class 11 to Ph.D.).',
    ministry: 'Ministry of Social Justice and Empowerment',
    level: 'Central & State',
    category: 'Education',
    targetBeneficiaries: 'Meritorious students from SC, ST, OBC, Minority, and EWS categories pursuing higher education',
    mainBenefits: [
      'Full reimbursement of compulsory non-refundable tuition fees',
      'Annual maintenance allowance up to ₹13,500/year for hostellers and ₹7,000/year for day scholars',
      'Book bank allowances and study tour allowances for professional courses',
      'Additional allowance for students with disabilities'
    ],
    basicEligibilitySummary: 'Enrolled in recognized post-secondary college/university. Family income must not exceed ₹2.5 Lakh per annum.',
    eligibilityRules: {
      minAge: 15,
      maxAge: 35,
      studentOnly: true,
      allowedOccupations: ['student'],
      allowedIncomeCategories: ['below_1_5l', '1_5l_to_3l'],
      allowedStates: ['All']
    },
    requiredDocuments: [
      {
        id: 'student-id-fee-receipt',
        name: 'College Admission Letter & Current Fee Receipt',
        description: 'Proof of active enrollment in a recognized university/college.',
        mandatory: true,
        issuingAuthority: 'College / Educational Institution'
      },
      {
        id: 'income-cert-edu',
        name: 'Income Certificate of Parents/Guardian',
        description: 'Certificate demonstrating family income below ₹2.5 Lakh.',
        mandatory: true,
        issuingAuthority: 'Revenue Department / Tahsildar'
      },
      {
        id: 'caste-cert-edu',
        name: 'Category / Caste Certificate (if applicable)',
        description: 'Valid certificate for SC, ST, OBC, or EWS quotas.',
        mandatory: true,
        issuingAuthority: 'Sub-Divisional Officer / Tahsildar'
      },
      {
        id: 'prev-marksheet',
        name: 'Previous Academic Marksheet (Class 10/12/Degree)',
        description: 'Marksheet showing passing status in previous qualifying exam.',
        mandatory: true,
        issuingAuthority: 'State Board / University'
      },
      {
        id: 'bank-passbook-student',
        name: 'Student Savings Bank Passbook',
        description: 'Active bank account in student’s own name linked to Aadhaar.',
        mandatory: true,
        issuingAuthority: 'Scheduled Commercial Bank'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Online',
      officialPortalName: 'National Scholarship Portal (NSP)',
      officialPortalUrl: 'https://scholarships.gov.in',
      steps: [
        'Register as a new student on scholarships.gov.in using Aadhaar OTP.',
        'Login using the generated Application ID and select Post-Matric Scholarship.',
        'Fill academic marks, college AISHE code, family income, and bank details.',
        'Upload required scanned documents and submit the online application.',
        'Download application printout and submit signed copy to college nodal officer for verification.'
      ],
      importantInstructions: [
        'Apply before the annual application deadline (usually October-December).',
        'Student bank account must be actively linked with Aadhaar for DBT transfer.',
        'Dual scholarship claims for the same course from multiple government bodies is prohibited.'
      ],
      processingTimeline: '30–60 days following Institute & District Nodal verification',
      fee: 'Free of cost',
      nodalDepartment: 'Department of Higher Education / Social Justice',
      helpline: '0120-6619540 (NSP Helpdesk)'
    },
    tags: ['Education', 'College', 'Scholarship', 'Fee Reimbursement', 'Students'],
    isDemo: true
  },
  {
    id: 'pm-mudra-yojana',
    name: 'Pradhan Mantri Mudra Yojana (PMMY Loan)',
    shortDescription: 'Collateral-free business loans up to ₹10–20 Lakh for micro-enterprises, self-employed individuals, and traders.',
    fullDescription: 'PMMY facilitates micro-credit to non-corporate, non-farm small/micro enterprises. Loans are classified into three tiers: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), and Tarun (₹5 Lakh to ₹10/20 Lakh) through commercial banks, RRBs, and NBFCs without requiring any collateral security.',
    ministry: 'Ministry of Finance',
    level: 'Central',
    category: 'Financial Assistance',
    targetBeneficiaries: 'Artisans, traders, shopkeepers, service providers, women entrepreneurs, and small manufacturers',
    mainBenefits: [
      'No collateral security or third-party guarantee required',
      'Affordable interest rates pegged to RBI benchmarks',
      'Mudra Debit Card provided for working capital withdrawals',
      'Zero processing fee for Shishu and Kishore loans'
    ],
    basicEligibilitySummary: 'Indian citizens with a viable business proposal for a non-farm income-generating micro-enterprise.',
    eligibilityRules: {
      minAge: 18,
      allowedOccupations: ['self_employed', 'artisan', 'daily_wage', 'salaried', 'unemployed'],
      allowedStates: ['All']
    },
    requiredDocuments: [
      {
        id: 'kyc-id',
        name: 'Aadhaar / Voter ID / PAN Card',
        description: 'Identity and citizenship proof of business proprietor/partner.',
        mandatory: true,
        issuingAuthority: 'UIDAI / NSDL'
      },
      {
        id: 'business-proof',
        name: 'Business Registration / Trade License / Udyam Certificate',
        description: 'MSME Udyam registration or shop establishment license.',
        mandatory: false,
        issuingAuthority: 'Ministry of MSME / Municipal Corporation'
      },
      {
        id: 'bank-statement',
        name: 'Bank Account Statement (Last 6 Months)',
        description: 'Statement showing existing banking operations and liquidity.',
        mandatory: true,
        issuingAuthority: 'Applicant Bank'
      },
      {
        id: 'business-plan',
        name: 'Project Proposal / Quotation for Machinery',
        description: 'Brief write-up of proposed enterprise and machinery invoices if applicable.',
        mandatory: true,
        issuingAuthority: 'Applicant Self-Prepared'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'UdyamiMitra / JanSamarth National Portal',
      officialPortalUrl: 'https://www.jansamarth.in',
      steps: [
        'Visit jansamarth.in and select "Business Activity Loan".',
        'Answer basic questionnaire regarding business type, turnover, and required loan amount.',
        'System automatically checks in-principle eligibility under Mudra categories.',
        'Upload KYC and project proposal, then choose preferred bank branch.',
        'Visit the branch with originals for document verification and disbursement.'
      ],
      importantInstructions: [
        'Never pay commission to loan brokers; PMMY loans are granted directly by banks.',
        'Ensure clean CIBIL/credit history without defaults on previous formal loans.',
        'Borrowers are given Mudra Card for hassle-free everyday withdrawals.'
      ],
      processingTimeline: '7–15 working days post document submission',
      fee: 'Zero processing fee for loans up to ₹5 Lakh',
      nodalDepartment: 'Department of Financial Services',
      helpline: '1800-180-1111 / 1800-11-0001 (National Toll-Free)'
    },
    tags: ['Business Loan', 'Startup', 'Mudra', 'Self-Employed', 'Collateral-Free'],
    isDemo: true
  },
  {
    id: 'pm-svanidhi',
    name: 'PM SVANidhi (Street Vendor Loan & Cashback)',
    shortDescription: 'Affordable working capital micro-loan starting from ₹10,000 with 7% interest subsidy and cashback incentives.',
    fullDescription: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi) provides affordable collateral-free working capital loans to street vendors to resume their livelihoods. Features initial loan of ₹10,000, progressing to ₹20,000 and ₹50,000 on timely repayments, with 7% interest subsidy credited directly.',
    ministry: 'Ministry of Housing and Urban Affairs',
    level: 'Central',
    category: 'Employment',
    targetBeneficiaries: 'Urban and peri-urban street vendors, hawkers, thela-walas, and small roadside sellers',
    mainBenefits: [
      'Initial working capital loan of ₹10,000 without any collateral or guarantor',
      'Enhanced loan limit of ₹20,000 on 2nd tranche and ₹50,000 on 3rd tranche',
      '7% per annum interest subsidy directly credited to bank account',
      'Monthly cashback up to ₹100 for conducting digital sales transactions (QR code)'
    ],
    basicEligibilitySummary: 'Street vendors in urban areas possessing Certificate of Vending or surveyed under town vending committee.',
    eligibilityRules: {
      minAge: 18,
      allowedOccupations: ['daily_wage', 'self_employed', 'artisan', 'other'],
      allowedIncomeCategories: ['below_1_5l', '1_5l_to_3l'],
      allowedStates: ['All'],
      areaEligibility: ['urban', 'semi_urban']
    },
    requiredDocuments: [
      {
        id: 'vending-proof',
        name: 'Certificate of Vending / Vending ID Card',
        description: 'Issued by Urban Local Body (ULB) / Municipality or Letter of Recommendation (LoR).',
        mandatory: true,
        issuingAuthority: 'Municipal Corporation / Town Vending Committee'
      },
      {
        id: 'aadhaar-svanidhi',
        name: 'Aadhaar Card linked to Mobile',
        description: 'Identity verification for loan disbursement.',
        mandatory: true,
        issuingAuthority: 'UIDAI'
      },
      {
        id: 'bank-svanidhi',
        name: 'Bank Passbook / Account Details',
        description: 'Savings account details where loan amount will be deposited.',
        mandatory: true,
        issuingAuthority: 'Commercial / Regional Rural Bank'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'PM SVANidhi Portal',
      officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in',
      steps: [
        'Visit pmsvanidhi.mohua.gov.in or download the PM SVANidhi mobile app.',
        'Enter mobile number linked to Aadhaar and check vending survey status.',
        'If surveyed, select lending institution (bank) and request loan amount.',
        'Submit digital application with bank passbook details.',
        'Alternatively, visit the nearest Municipal Ward Office or CSC.'
      ],
      importantInstructions: [
        'Repay monthly installments on time to unlock 7% interest rebate and higher credit limits.',
        'Set up UPI QR code at vending stall to earn cashback up to ₹1,200 annually.'
      ],
      processingTimeline: '3–7 working days',
      fee: 'Completely free',
      nodalDepartment: 'Ministry of Housing and Urban Affairs',
      helpline: '1800-11-1979'
    },
    tags: ['Street Vendors', 'Micro-Credit', 'Digital Payments', 'Livelihood'],
    isDemo: true
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    shortDescription: 'High-interest tax-free government savings scheme for girl children with 8.2% annual compounded returns.',
    fullDescription: 'Sukanya Samriddhi Account is a government-backed small deposit scheme designed exclusively for the welfare of girl children under the Beti Bachao Beti Padhao campaign. Parents can open an account anytime from birth until the child reaches 10 years of age with attractive tax benefits under Section 80C.',
    ministry: 'Ministry of Finance',
    level: 'Central',
    category: 'Women & Child Welfare',
    targetBeneficiaries: 'Parents/guardians of girl children aged up to 10 years (maximum 2 girl children per family)',
    mainBenefits: [
      'High guaranteed interest rate (currently 8.2% p.a., sovereign guarantee)',
      'Triple tax exemption (EEE): deposit, interest accrued, and maturity proceeds are 100% tax-free',
      'Minimum annual deposit of only ₹250; maximum up to ₹1.5 Lakh per financial year',
      'Partial withdrawal up to 50% allowed for higher education after child reaches 18 years'
    ],
    basicEligibilitySummary: 'Account can be opened by biological or legal guardian in the name of a girl child below 10 years of age.',
    eligibilityRules: {
      maxAge: 65,
      allowedGenders: ['all', 'female'],
      allowedStates: ['All'],
      specialTags: ['girl_child_parent']
    },
    requiredDocuments: [
      {
        id: 'child-birth-cert',
        name: 'Birth Certificate of the Girl Child',
        description: 'Hospital or Municipal birth certificate showing child’s legal name and date of birth.',
        mandatory: true,
        issuingAuthority: 'Municipal Corporation / Registrar of Births'
      },
      {
        id: 'guardian-id',
        name: 'Identity & Address Proof of Guardian',
        description: 'Aadhaar Card, PAN Card, or Passport of parent/guardian.',
        mandatory: true,
        issuingAuthority: 'UIDAI / NSDL'
      },
      {
        id: 'guardian-photo',
        name: 'Passport Size Photos of Guardian & Child',
        description: 'Recent photographs for passbook issuance.',
        mandatory: true,
        issuingAuthority: 'Self'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Offline',
      officialPortalName: 'India Post / RBI Notified Banks',
      officialPortalUrl: 'https://www.indiapost.gov.in',
      steps: [
        'Obtain SSY account opening form from nearest Post Office or authorized commercial bank branch (SBI, PNB, Canara, etc.).',
        'Fill child’s particulars and parent/guardian details.',
        'Attach attested copies of child birth certificate and guardian KYC documents.',
        'Deposit initial opening amount (minimum ₹250) via cash/cheque.',
        'Receive the Sukanya Samriddhi Passbook with account number.'
      ],
      importantInstructions: [
        'Deposit must be made for 15 years from date of account opening.',
        'Maturity occurs after 21 years from account opening or at marriage after age 18.',
        'Penalty of only ₹50 if minimum ₹250 is missed in any financial year.'
      ],
      processingTimeline: 'Same day / on-the-spot account opening',
      fee: 'Nil (minimum opening deposit ₹250)',
      nodalDepartment: 'Department of Posts / Ministry of Finance',
      helpline: '1800-266-6868 (India Post Customer Care)'
    },
    tags: ['Girl Child', 'High Interest', 'Tax Free', 'Education Fund', 'Savings'],
    isDemo: true
  },
  {
    id: 'pm-kaushal-vikas',
    name: 'PM Kaushal Vikas Yojana (PMKVY Skill Training)',
    shortDescription: 'Free industry-aligned skill development courses, recognized certification, and monetary placement reward for youth.',
    fullDescription: 'PMKVY is the flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE). It enables Indian youth to take up industry-relevant skill training that helps them in securing a better livelihood, offering free courses in technical, digital, healthcare, and industrial trades with government certification.',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    level: 'Central',
    category: 'Employment',
    targetBeneficiaries: 'Unemployed youth, school/college dropouts, and job seekers looking for skill certifications',
    mainBenefits: [
      '100% free training at accredited Pradhan Mantri Kaushal Kendras (PMKK)',
      'Government of India recognized Skill India Certificate & Assessment',
      'Direct monetary reward and travel/food allowance during training period',
      'Dedicated placement assistance through Rozgar Melas and partner employers'
    ],
    basicEligibilitySummary: 'Indian citizens aged 15–45 years with basic literacy, seeking employment or skill upgrading.',
    eligibilityRules: {
      minAge: 15,
      maxAge: 45,
      allowedOccupations: ['unemployed', 'student', 'daily_wage', 'other'],
      allowedStates: ['All']
    },
    requiredDocuments: [
      {
        id: 'aadhaar-pmkvy',
        name: 'Aadhaar Card',
        description: 'Mandatory identification for Skill India Digital ID creation.',
        mandatory: true,
        issuingAuthority: 'UIDAI'
      },
      {
        id: 'education-cert',
        name: 'Educational Marksheet / School Leaving Certificate',
        description: 'Highest educational qualification proof (8th, 10th, 12th, or ITI/Diploma).',
        mandatory: true,
        issuingAuthority: 'Educational Board / School'
      },
      {
        id: 'bank-passbook-pmkvy',
        name: 'Bank Passbook (for stipend/reward credit)',
        description: 'Personal savings bank passbook copy.',
        mandatory: true,
        issuingAuthority: 'Scheduled Commercial Bank'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'Skill India Digital Hub',
      officialPortalUrl: 'https://www.skillindiadigital.gov.in',
      steps: [
        'Register on skillindiadigital.gov.in using mobile number.',
        'Browse available courses by industry sector (IT, Healthcare, Logistics, Electronics, etc.).',
        'Locate the nearest accredited training center (PMKK).',
        'Enroll for the upcoming batch and attend counseling session.',
        'Complete classroom & practical training, clear assessment, and receive certificate.'
      ],
      importantInstructions: [
        'Training is completely free; no center is authorized to collect training fees.',
        'Attendance is marked daily via biometric system.',
        'Certificate is digitally verifiable via DigiLocker.'
      ],
      processingTimeline: 'Batches start every month',
      fee: '100% Free of Cost',
      nodalDepartment: 'National Skill Development Corporation (NSDC)',
      helpline: '088000-55555 / 1800-123-9626'
    },
    tags: ['Skill Training', 'Youth', 'Job Placement', 'Certification', 'Skill India'],
    isDemo: true
  },
  {
    id: 'atal-pension-yojana',
    name: 'Atal Pension Yojana (APY Pension Scheme)',
    shortDescription: 'Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60 for workers in the unorganized sector.',
    fullDescription: 'Atal Pension Yojana is a periodic pension scheme targeted primarily at the unorganized sector workers like housekeepers, delivery partners, drivers, agricultural labor, and shop hands, ensuring social security in old age with guaranteed returns backed by the Government of India.',
    ministry: 'Ministry of Finance',
    level: 'Central',
    category: 'Social Welfare',
    targetBeneficiaries: 'Unorganized workers, gig workers, and self-employed individuals aged 18 to 40 years',
    mainBenefits: [
      'Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 upon reaching 60 years',
      'Spouse receives same guaranteed pension amount for lifetime in case of subscriber demise',
      'Full accumulated pension wealth returned to nominee after demise of both subscriber and spouse',
      'Affordable auto-debit contribution starting from as low as ₹42 per month (at age 18)'
    ],
    basicEligibilitySummary: 'Indian citizens aged 18–40 years with an active savings bank account. Must not be an income taxpayer.',
    eligibilityRules: {
      minAge: 18,
      maxAge: 40,
      allowedOccupations: ['daily_wage', 'self_employed', 'farmer', 'artisan', 'unemployed', 'homemaker', 'other'],
      allowedIncomeCategories: ['below_1_5l', '1_5l_to_3l', '3l_to_8l'],
      allowedStates: ['All']
    },
    requiredDocuments: [
      {
        id: 'aadhaar-apy',
        name: 'Aadhaar Card',
        description: 'Identity proof and KYC compliance.',
        mandatory: true,
        issuingAuthority: 'UIDAI'
      },
      {
        id: 'bank-account-apy',
        name: 'Savings Bank Account with Auto-Debit Mandate',
        description: 'Bank passbook where monthly/quarterly premium will be auto-debited.',
        mandatory: true,
        issuingAuthority: 'Commercial / Postal Bank'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'NPS Trust / Bank NetBanking Portal',
      officialPortalUrl: 'https://enps.nsdl.com',
      steps: [
        'Visit your bank branch or log in to your bank’s Internet Banking or Mobile Banking app.',
        'Navigate to "Government Schemes / Social Security" and select "Atal Pension Yojana".',
        'Choose desired monthly pension amount (₹1,000 to ₹5,000) and contribution frequency.',
        'Provide nominee details and authorize auto-debit of monthly premium.',
        'Receive Permanent Retirement Account Number (PRAN) confirmation slip.'
      ],
      importantInstructions: [
        'Ensure sufficient balance in bank account on scheduled auto-debit date to avoid overdue interest.',
        'Subscribers who are or have been income-tax payers are not eligible under current rules.'
      ],
      processingTimeline: 'Instant activation via NetBanking, 3 days via branch',
      fee: 'Nil (Only monthly contribution)',
      nodalDepartment: 'Pension Fund Regulatory and Development Authority (PFRDA)',
      helpline: '1800-110-069'
    },
    tags: ['Pension', 'Old Age', 'Social Security', 'Unorganized Sector', 'Guaranteed Income'],
    isDemo: true
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme (Artisan Support)',
    shortDescription: 'Collateral-free credit up to ₹3 Lakh at 5% interest, ₹15,000 toolkit grant, and skill training for traditional artisans.',
    fullDescription: 'PM Vishwakarma provides comprehensive end-to-end support to artisans and craftspeople who work with their hands and tools across 18 traditional trades including carpenters, blacksmiths, potters, sculptors, cobblers, tailors, and basket weavers.',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    level: 'Central',
    category: 'Financial Assistance',
    targetBeneficiaries: 'Artisans and craftspeople engaged in 18 notified traditional family-based trades',
    mainBenefits: [
      'Recognition through PM Vishwakarma Certificate and Digital ID Card',
      'Basic and advanced skill training with ₹500 per day stipend during training',
      'Modern Toolkit Incentive of ₹15,000 credited directly to purchase advanced tools',
      'Collateral-free enterprise credit: ₹1 Lakh (Tier 1) and ₹2 Lakh (Tier 2) at subsidized 5% interest'
    ],
    basicEligibilitySummary: 'Artisan working in one of the 18 notified trades, minimum 18 years old, maximum 1 family member eligible.',
    eligibilityRules: {
      minAge: 18,
      allowedOccupations: ['artisan', 'daily_wage', 'self_employed'],
      allowedStates: ['All'],
      specialTags: ['artisan']
    },
    requiredDocuments: [
      {
        id: 'aadhaar-vishwakarma',
        name: 'Aadhaar Card linked to Mobile',
        description: 'Biometric verification of artisan identity.',
        mandatory: true,
        issuingAuthority: 'UIDAI'
      },
      {
        id: 'bank-passbook-vishwakarma',
        name: 'Bank Account Passbook',
        description: 'Savings bank account linked to Aadhaar for receiving ₹15,000 toolkit grant.',
        mandatory: true,
        issuingAuthority: 'Commercial Bank'
      },
      {
        id: 'trade-declaration',
        name: 'Traditional Trade Declaration / Panchayat Verification',
        description: 'Self-certification of working in traditional family trade, verified by Gram Panchayat or ULB.',
        mandatory: true,
        issuingAuthority: 'Gram Panchayat / Ward Councillor'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'PM Vishwakarma Official Portal',
      officialPortalUrl: 'https://pmvishwakarma.gov.in',
      steps: [
        'Visit nearest Common Service Centre (CSC) with Aadhaar and mobile phone.',
        'Perform biometric Aadhaar authentication.',
        'Select your traditional trade from the list of 18 artisan categories.',
        'Submit application for Gram Panchayat / Urban Local Body verification.',
        'Receive digital Vishwakarma ID and join scheduled 5-day basic training.'
      ],
      importantInstructions: [
        'Only one member from a family can avail the benefits of the scheme.',
        'Government servants and their family members are not eligible.'
      ],
      processingTimeline: '15–20 days for multi-stage tier verification',
      fee: 'Free of cost (covered under government scheme budget)',
      nodalDepartment: 'Ministry of MSME & Ministry of Skill Development',
      helpline: '18002677777 / 011-23061500'
    },
    tags: ['Artisans', 'Craftsmen', 'Toolkit Grant', 'Low Interest Loan', 'Skill Upgrade'],
    isDemo: true
  },
  {
    id: 'nsap-old-age-pension',
    name: 'National Social Assistance (Indira Gandhi Pension)',
    shortDescription: 'Monthly financial assistance for senior citizens (60+ years) and persons with disabilities living below poverty line.',
    fullDescription: 'The National Social Assistance Programme (NSAP) represents a significant step towards fulfilling the Directive Principles of State Policy. It provides financial assistance to senior citizens, widows, and persons with severe disabilities living below the poverty line.',
    ministry: 'Ministry of Rural Development',
    level: 'Central & State',
    category: 'Social Welfare',
    targetBeneficiaries: 'Destitute senior citizens (60+), widows (40-79), and persons with severe disabilities (80%+ disability)',
    mainBenefits: [
      'Direct monthly pension paid into the beneficiary’s bank/post office account',
      'Higher pension amount for super senior citizens aged 80 years and above',
      'Combined central and state co-contribution for enhanced monthly relief',
      'Includes disability pension and widow pension sub-schemes'
    ],
    basicEligibilitySummary: 'Applicant must be aged 60 years or above and belong to a household living below the poverty line (BPL).',
    eligibilityRules: {
      minAge: 60,
      allowedOccupations: ['senior_citizen', 'unemployed', 'daily_wage', 'homemaker'],
      allowedIncomeCategories: ['below_1_5l'],
      allowedStates: ['All'],
      requiresBPL: true
    },
    requiredDocuments: [
      {
        id: 'age-proof-nsap',
        name: 'Age Proof Certificate / Birth Certificate / Aadhaar',
        description: 'Official document proving age is 60 years or above.',
        mandatory: true,
        issuingAuthority: 'Civil Surgeon / Tahsildar / UIDAI'
      },
      {
        id: 'bpl-ration-card-nsap',
        name: 'BPL Card / Antyodaya Anna Yojana (AAY) Card',
        description: 'Verified proof of below poverty line economic status.',
        mandatory: true,
        issuingAuthority: 'Food & Civil Supplies Department'
      },
      {
        id: 'bank-passbook-nsap',
        name: 'Post Office or Bank Passbook',
        description: 'Account details for direct monthly pension credit.',
        mandatory: true,
        issuingAuthority: 'Post Office / Nationalized Bank'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'NSAP Social Welfare Portal / UMANG',
      officialPortalUrl: 'https://nsap.nic.in',
      steps: [
        'Apply online on nsap.nic.in or via the UMANG mobile application.',
        'Fill personal details, BPL survey number, age proof, and bank details.',
        'Upload verified BPL card and proof of age.',
        'Application is forwarded to the Sub-Divisional Magistrate / Tahsildar for field verification.',
        'Sanction letter is issued and pension is disbursed on monthly basis.'
      ],
      importantInstructions: [
        'Annual life certification (Jeevan Pramaan) or physical verification is required.',
        'Ensure BPL status is updated in the local Panchayat/Municipality records.'
      ],
      processingTimeline: '30–45 days',
      fee: 'Free of cost',
      nodalDepartment: 'Department of Social Welfare',
      helpline: '1800-180-6127'
    },
    tags: ['Senior Citizens', 'Elderly', 'BPL', 'Monthly Pension', 'Disability Support'],
    isDemo: true
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India Scheme (Women & SC/ST Enterprise)',
    shortDescription: 'Bank loans between ₹10 Lakh and ₹1 Crore for setting up greenfield enterprises by women or SC/ST entrepreneurs.',
    fullDescription: 'Stand-Up India facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise in manufacturing, services, or trading sector.',
    ministry: 'Ministry of Finance',
    level: 'Central',
    category: 'Employment',
    targetBeneficiaries: 'Women entrepreneurs (all categories) and SC/ST individuals establishing a new business',
    mainBenefits: [
      'Composite bank loan from ₹10 Lakh up to ₹1 Crore covering 85% of project cost',
      'Lowest applicable interest rate for the category (Base Rate + MCLR)',
      'Repayable in up to 7 years with a moratorium period of up to 18 months',
      'Handholding support via SIDBI and state industrial development centers'
    ],
    basicEligibilitySummary: 'SC/ST and/or women entrepreneur above 18 years of age setting up their first greenfield enterprise.',
    eligibilityRules: {
      minAge: 18,
      allowedGenders: ['female', 'all'],
      allowedOccupations: ['self_employed', 'salaried', 'unemployed', 'artisan'],
      allowedStates: ['All'],
      specialTags: ['entrepreneur']
    },
    requiredDocuments: [
      {
        id: 'identity-caste-standup',
        name: 'Aadhaar / Voter ID & Caste Certificate (for SC/ST)',
        description: 'Identity proof and community certificate if claiming SC/ST quota.',
        mandatory: true,
        issuingAuthority: 'Competent District Authority'
      },
      {
        id: 'project-report-standup',
        name: 'Comprehensive Detailed Project Report (DPR)',
        description: 'Feasibility analysis, projected balance sheet, and machinery quotes.',
        mandatory: true,
        issuingAuthority: 'Chartered Accountant / Certified Consultant'
      },
      {
        id: 'pan-promoter',
        name: 'PAN Card & Bank Statement of Promoter',
        description: 'Financial track record of applicant promoter.',
        mandatory: true,
        issuingAuthority: 'Income Tax Department / Bank'
      }
    ],
    applicationGuidance: {
      applicationMethod: 'Both',
      officialPortalName: 'Stand-Up India Portal',
      officialPortalUrl: 'https://www.standupmitra.in',
      steps: [
        'Visit standupmitra.in and register as a "Trainee" or "Ready Borrower".',
        'Input business trade (Manufacturing, Services, Agriculture Allied, Trading).',
        'Upload project report and choose the bank branch located nearest to project site.',
        'Attend appraisal meeting with the bank branch manager.',
        'Sanction and disbursement of composite term loan and working capital.'
      ],
      importantInstructions: [
        'Must be a greenfield enterprise (first-time venture in the chosen sector).',
        'In non-individual enterprises, 51% shareholding and controlling stake must be held by SC/ST or woman entrepreneur.'
      ],
      processingTimeline: '30–60 working days',
      fee: 'Standard bank processing charges apply',
      nodalDepartment: 'Department of Financial Services & SIDBI',
      helpline: '1800-180-1111'
    },
    tags: ['Women Entrepreneur', 'SC/ST', 'Business Loan', 'Startup', 'Greenfield'],
    isDemo: true
  }
];

export const SCHEME_CATEGORIES = [
  'All',
  'Education',
  'Healthcare',
  'Employment',
  'Housing',
  'Financial Assistance',
  'Women & Child Welfare',
  'Agriculture',
  'Social Welfare'
] as const;

export const INDIAN_STATES = [
  'All India',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi (NCT)',
  'Jammu & Kashmir',
  'Ladakh'
];
