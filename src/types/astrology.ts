export type ZodiacSignKey = 
  | 'aries' 
  | 'taurus' 
  | 'gemini' 
  | 'cancer' 
  | 'leo' 
  | 'virgo' 
  | 'libra' 
  | 'scorpio' 
  | 'sagittarius' 
  | 'capricorn' 
  | 'aquarius' 
  | 'pisces';

export interface ZodiacSignInfo {
  key: ZodiacSignKey;
  rashiNumber: number; // 1 to 12
  nameEn: string;
  nameHi: string;
  symbol: string;
  sanskritName: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementHi: 'अग्नि' | 'पृथ्वी' | 'वायु' | 'जल';
  rulingPlanet: string;
  rulingPlanetHi: string;
  luckyColor: string;
  luckyColorHi: string;
  luckyNumber: number;
  luckyDay: string;
  luckyDayHi: string;
  favorableGem: string;
  favorableGemHi: string;
}

export interface KundliInput {
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dob: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  language?: 'hi' | 'en';
}

export interface PlanetPosition {
  nameEn: string;
  nameHi: string;
  symbol: string;
  rashiNumber: number; // 1 to 12
  rashiNameEn: string;
  rashiNameHi: string;
  house: number; // 1 to 12
  degrees: number;
  degreeStr: string;
  nakshatra: string;
  nakshatraHi: string;
  pada: number;
  isRetrograde: boolean;
  isCombust: boolean;
  status: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy';
  statusHi: 'उच्च' | 'नीच' | 'स्वग्रही' | 'मित्र' | 'सम' | 'शत्रु';
  signLord: string;
}

export interface HouseInfo {
  houseNumber: number; // 1 to 12
  rashiNumber: number;
  rashiName: string;
  rashiNameHi: string;
  signLord: string;
  signLordHi: string;
  planetsPresent: PlanetPosition[];
  nameHi: string; // उदा. लग्न/तन भाव, धन भाव
  signification: string;
  significationHi: string;
}

export interface DashaPeriod {
  planet: string;
  planetHi: string;
  startDate: string;
  endDate: string;
  years: number;
  isCurrent: boolean;
  subDasha?: string;
}

export interface YogaDetail {
  nameEn: string;
  nameHi: string;
  type: 'Raj Yoga' | 'Dhana Yoga' | 'Spiritual Yoga' | 'Dosha';
  typeHi: 'राज योग' | 'धन योग' | 'अध्यात्म योग' | 'दोष';
  planetsInvolved: string[];
  descriptionEn: string;
  descriptionHi: string;
  favorableEffect: string;
  favorableEffectHi: string;
}

export interface KundliResult {
  input: KundliInput;
  lagnaRashi: ZodiacSignInfo;
  moonRashi: ZodiacSignInfo;
  sunRashi: ZodiacSignInfo;
  birthNakshatra: string;
  birthNakshatraHi: string;
  nakshatraPada: number;
  nakshatraLord: string;
  charanVarna: string;
  varnaHi: string;
  yoni: string;
  yoniHi: string;
  gana: string;
  ganaHi: string;
  nadi: string;
  nadiHi: string;
  planets: PlanetPosition[];
  houses: HouseInfo[];
  currentDasha: DashaPeriod;
  dashaSequence: DashaPeriod[];
  yogas: YogaDetail[];
  generalPredictions: {
    personality: string;
    personalityHi: string;
    career: string;
    careerHi: string;
    marriage: string;
    marriageHi: string;
    health: string;
    healthHi: string;
    wealth: string;
    wealthHi: string;
  };
  remedies: {
    gemstone: string;
    gemstoneHi: string;
    rudraksha: string;
    rudrakshaHi: string;
    fastingDay: string;
    fastingDayHi: string;
    mantra: string;
    donations: string;
    donationsHi: string;
  };
}

export interface AshtakootScore {
  name: string;
  nameHi: string;
  maxScore: number;
  obtainedScore: number;
  description: string;
  descriptionHi: string;
  verdict: 'Excellent' | 'Good' | 'Average' | 'Poor';
  verdictHi: 'अति उत्तम' | 'उत्तम' | 'मध्यम' | 'न्यून';
}

export interface MatchingResult {
  groom: {
    name: string;
    rashi: string;
    nakshatra: string;
    mangalDosha: boolean;
  };
  bride: {
    name: string;
    rashi: string;
    nakshatra: string;
    mangalDosha: boolean;
  };
  totalPoints: number; // out of 36
  percentage: number;
  scores: AshtakootScore[];
  mangalDoshaVerdict: string;
  mangalDoshaVerdictHi: string;
  mangalCancellation: boolean;
  recommendationLevel: 'Highly Recommended' | 'Recommended' | 'Average' | 'Not Recommended';
  recommendationLevelHi: 'अति उत्तम (विवाह योग्य)' | 'शुभ व अनुकूल' | 'मध्यम (उपाय आवश्यक)' | 'विचारणीय (दोष शांति जरूरी)';
  remedies: string[];
  remediesHi: string[];
}

export interface RashiHoroscope {
  signKey: ZodiacSignKey;
  date: string;
  daily: {
    overviewEn: string;
    overviewHi: string;
    careerEn: string;
    careerHi: string;
    loveEn: string;
    loveHi: string;
    healthEn: string;
    healthHi: string;
    financeEn: string;
    financeHi: string;
    luckyNumber: number;
    luckyColor: string;
    luckyColorHi: string;
    luckyDirection: string;
    luckyDirectionHi: string;
    auspiciousTime: string;
    remedyEn: string;
    remedyHi: string;
  };
  weekly: {
    summaryEn: string;
    summaryHi: string;
    keyAdviceEn: string;
    keyAdviceHi: string;
  };
  monthly: {
    summaryEn: string;
    summaryHi: string;
    planetaryTransitNotesEn: string;
    planetaryTransitNotesHi: string;
  };
}

export interface PanchangData {
  dateStr: string;
  dayOfWeek: string;
  dayOfWeekHi: string;
  vikramSamvat: number;
  shakaSamvat: number;
  ayana: string;
  ayanaHi: string;
  ritu: string;
  rituHi: string;
  monthAmanta: string;
  monthPurnimanta: string;
  monthPurnimantaHi: string;
  paksha: 'Shukla Paksha' | 'Krishna Paksha';
  pakshaHi: 'शुक्ल पक्ष' | 'कृष्ण पक्ष';
  tithi: {
    nameEn: string;
    nameHi: string;
    endTime: string;
    nextTithiEn?: string;
  };
  nakshatra: {
    nameEn: string;
    nameHi: string;
    endTime: string;
    lord: string;
    lordHi: string;
  };
  yoga: {
    nameEn: string;
    nameHi: string;
    endTime: string;
  };
  karana: {
    nameEn: string;
    nameHi: string;
    endTime: string;
  };
  sunTimes: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    sunSignEn: string;
    sunSignHi: string;
    moonSignEn: string;
    moonSignHi: string;
  };
  shubhMuhurat: {
    abhijitMuhurat: string;
    amritKaal: string;
    brahmaMuhurat: string;
    vijayaMuhurat: string;
  };
  ashubhMuhurat: {
    rahuKaal: string;
    yamaganda: string;
    gulikaKaal: string;
    durMuhurat: string;
  };
  festivalsAndVrats: Array<{
    nameEn: string;
    nameHi: string;
    type: string;
  }>;
}

export interface TarotCard {
  id: number;
  nameEn: string;
  nameHi: string;
  archetype: string;
  element: string;
  keywordsEn: string[];
  keywordsHi: string[];
  uprightMeaningEn: string;
  uprightMeaningHi: string;
  reversedMeaningEn: string;
  reversedMeaningHi: string;
  adviceEn: string;
  adviceHi: string;
  imageUrl?: string;
  cardSymbol: string;
}

export interface NumerologyResult {
  fullName: string;
  birthDate: string;
  mulank: number; // 1-9
  bhagyank: number; // 1-9
  namank: number; // 1-9
  rulingPlanetEn: string;
  rulingPlanetHi: string;
  personalityTraitsEn: string[];
  personalityTraitsHi: string[];
  favorableDates: number[];
  favorableDaysEn: string[];
  favorableDaysHi: string[];
  favorableColorsEn: string[];
  favorableColorsHi: string[];
  compatibleNumbers: number[];
  unfavorableNumbers: number[];
  favorableGemsEn: string[];
  favorableGemsHi: string[];
  careerGuidanceEn: string;
  careerGuidanceHi: string;
}

export interface AstrologerProfile {
  id: string;
  nameEn: string;
  nameHi: string;
  titleEn: string;
  titleHi: string;
  specialities: string[];
  specialitiesHi: string[];
  experienceYears: number;
  languages: string[];
  languagesHi: string[];
  rating: number;
  reviewCount: number;
  consultationsCount: number;
  chatRatePerMin: number;
  callRatePerMin: number;
  isOnline: boolean;
  avatarUrl: string;
  bioEn: string;
  bioHi: string;
  educationEn: string;
  educationHi: string;
  badges: string[];
  badgesHi: string[];
}

export interface AstroProduct {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'gemstone' | 'rudraksha' | 'yantra' | 'report' | 'pooja-item';
  categoryHi: 'रत्न' | 'रुद्राक्ष' | 'यंत्र' | 'कुंडली रिपोर्ट' | 'पूजा सामग्री';
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  badge?: string;
  badgeHi?: string;
  imageUrl: string;
  shortDescEn: string;
  shortDescHi: string;
  benefitsEn: string[];
  benefitsHi: string[];
  certification?: string;
  certificationHi?: string;
}

export interface AstroBlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  author: string;
  authorHi: string;
  date: string;
  readTime: string;
  readTimeHi: string;
  imageUrl: string;
  excerptEn: string;
  excerptHi: string;
  contentEn: string;
  contentHi: string;
  tags: string[];
}
