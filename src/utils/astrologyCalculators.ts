import { 
  KundliInput, 
  KundliResult, 
  PlanetPosition, 
  HouseInfo, 
  DashaPeriod, 
  YogaDetail, 
  ZodiacSignInfo,
  MatchingResult,
  AshtakootScore,
  NumerologyResult
} from '../types/astrology';

// 12 Zodiac signs in order
export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    key: 'aries',
    rashiNumber: 1,
    nameEn: 'Aries',
    nameHi: 'मेष',
    symbol: '♈',
    sanskritName: 'मेष',
    element: 'Fire',
    elementHi: 'अग्नि',
    rulingPlanet: 'Mars',
    rulingPlanetHi: 'मंगल',
    luckyColor: 'Crimson Red / Coral',
    luckyColorHi: 'लाल / सिंदूरी',
    luckyNumber: 9,
    luckyDay: 'Tuesday',
    luckyDayHi: 'मंगलवार',
    favorableGem: 'Red Coral (मूंगा)',
    favorableGemHi: 'लाल मूंगा'
  },
  {
    key: 'taurus',
    rashiNumber: 2,
    nameEn: 'Taurus',
    nameHi: 'वृषभ',
    symbol: '♉',
    sanskritName: 'वृषभ',
    element: 'Earth',
    elementHi: 'पृथ्वी',
    rulingPlanet: 'Venus',
    rulingPlanetHi: 'शुक्र',
    luckyColor: 'White / Cream / Silver',
    luckyColorHi: 'सफेद / चमकीला गुलाबी',
    luckyNumber: 6,
    luckyDay: 'Friday',
    luckyDayHi: 'शुक्रवार',
    favorableGem: 'Diamond / Opal (हीरा / ओपल)',
    favorableGemHi: 'हीरा / ओपल'
  },
  {
    key: 'gemini',
    rashiNumber: 3,
    nameEn: 'Gemini',
    nameHi: 'मिथुन',
    symbol: '♊',
    sanskritName: 'मिथुन',
    element: 'Air',
    elementHi: 'वायु',
    rulingPlanet: 'Mercury',
    rulingPlanetHi: 'बुध',
    luckyColor: 'Emerald Green',
    luckyColorHi: 'हरा / तोतिया',
    luckyNumber: 5,
    luckyDay: 'Wednesday',
    luckyDayHi: 'बुधवार',
    favorableGem: 'Emerald (पन्ना)',
    favorableGemHi: 'पन्ना'
  },
  {
    key: 'cancer',
    rashiNumber: 4,
    nameEn: 'Cancer',
    nameHi: 'कर्क',
    symbol: '♋',
    sanskritName: 'कर्क',
    element: 'Water',
    elementHi: 'जल',
    rulingPlanet: 'Moon',
    rulingPlanetHi: 'चंद्रमा',
    luckyColor: 'Pearl White / Silver',
    luckyColorHi: 'दूधिया सफेद / चांदी',
    luckyNumber: 2,
    luckyDay: 'Monday',
    luckyDayHi: 'सोमवार',
    favorableGem: 'Natural Pearl (मोती)',
    favorableGemHi: 'सच्चा मोती'
  },
  {
    key: 'leo',
    rashiNumber: 5,
    nameEn: 'Leo',
    nameHi: 'सिंह',
    symbol: '♌',
    sanskritName: 'सिंह',
    element: 'Fire',
    elementHi: 'अग्नि',
    rulingPlanet: 'Sun',
    rulingPlanetHi: 'सूर्य',
    luckyColor: 'Golden Yellow / Royal Orange',
    luckyColorHi: 'सुनहरा / केसरिया',
    luckyNumber: 1,
    luckyDay: 'Sunday',
    luckyDayHi: 'रविवार',
    favorableGem: 'Ruby (माणिक्य)',
    favorableGemHi: 'माणिक्य'
  },
  {
    key: 'virgo',
    rashiNumber: 6,
    nameEn: 'Virgo',
    nameHi: 'कन्या',
    symbol: '♍',
    sanskritName: 'कन्या',
    element: 'Earth',
    elementHi: 'पृथ्वी',
    rulingPlanet: 'Mercury',
    rulingPlanetHi: 'बुध',
    luckyColor: 'Forest Green / Pastel',
    luckyColorHi: 'गहरा हरा / हल्का पीला',
    luckyNumber: 5,
    luckyDay: 'Wednesday',
    luckyDayHi: 'बुधवार',
    favorableGem: 'Emerald (पन्ना)',
    favorableGemHi: 'पन्ना'
  },
  {
    key: 'libra',
    rashiNumber: 7,
    nameEn: 'Libra',
    nameHi: 'तुला',
    symbol: '♎',
    sanskritName: 'तुला',
    element: 'Air',
    elementHi: 'वायु',
    rulingPlanet: 'Venus',
    rulingPlanetHi: 'शुक्र',
    luckyColor: 'Sky Blue / White',
    luckyColorHi: 'आसमानी / सफेद',
    luckyNumber: 6,
    luckyDay: 'Friday',
    luckyDayHi: 'शुक्रवार',
    favorableGem: 'Opal / Diamond (ओपल / हीरा)',
    favorableGemHi: 'ओपल / हीरा'
  },
  {
    key: 'scorpio',
    rashiNumber: 8,
    nameEn: 'Scorpio',
    nameHi: 'वृश्चिक',
    symbol: '♏',
    sanskritName: 'वृश्चिक',
    element: 'Water',
    elementHi: 'जल',
    rulingPlanet: 'Mars',
    rulingPlanetHi: 'मंगल',
    luckyColor: 'Deep Crimson / Maroon',
    luckyColorHi: 'मेहरून / रक्त लाल',
    luckyNumber: 9,
    luckyDay: 'Tuesday',
    luckyDayHi: 'मंगलवार',
    favorableGem: 'Red Coral (मूंगा)',
    favorableGemHi: 'त्रिकोणीय लाल मूंगा'
  },
  {
    key: 'sagittarius',
    rashiNumber: 9,
    nameEn: 'Sagittarius',
    nameHi: 'धनु',
    symbol: '♐',
    sanskritName: 'धनु',
    element: 'Fire',
    elementHi: 'अग्नि',
    rulingPlanet: 'Jupiter',
    rulingPlanetHi: 'बृहस्पति (गुरु)',
    luckyColor: 'Bright Yellow / Saffron',
    luckyColorHi: 'पीला / हल्दी रंग',
    luckyNumber: 3,
    luckyDay: 'Thursday',
    luckyDayHi: 'गुरुवार',
    favorableGem: 'Yellow Sapphire (पुखराज)',
    favorableGemHi: 'पीला पुखराज'
  },
  {
    key: 'capricorn',
    rashiNumber: 10,
    nameEn: 'Capricorn',
    nameHi: 'मकर',
    symbol: '♑',
    sanskritName: 'मकर',
    element: 'Earth',
    elementHi: 'पृथ्वी',
    rulingPlanet: 'Saturn',
    rulingPlanetHi: 'शनि',
    luckyColor: 'Royal Navy / Charcoal / Black',
    luckyColorHi: 'नीला / काला',
    luckyNumber: 8,
    luckyDay: 'Saturday',
    luckyDayHi: 'शनिवार',
    favorableGem: 'Blue Sapphire (नीलम)',
    favorableGemHi: 'नीलम'
  },
  {
    key: 'aquarius',
    rashiNumber: 11,
    nameEn: 'Aquarius',
    nameHi: 'कुंभ',
    symbol: '♒',
    sanskritName: 'कुंभ',
    element: 'Air',
    elementHi: 'वायु',
    rulingPlanet: 'Saturn',
    rulingPlanetHi: 'शनि',
    luckyColor: 'Electric Blue / Violet',
    luckyColorHi: 'जामुनी / गहरा नीला',
    luckyNumber: 8,
    luckyDay: 'Saturday',
    luckyDayHi: 'शनिवार',
    favorableGem: 'Blue Sapphire / Amethyst',
    favorableGemHi: 'नीलम / कटैला'
  },
  {
    key: 'pisces',
    rashiNumber: 12,
    nameEn: 'Pisces',
    nameHi: 'मीन',
    symbol: '♓',
    sanskritName: 'मीन',
    element: 'Water',
    elementHi: 'जल',
    rulingPlanet: 'Jupiter',
    rulingPlanetHi: 'बृहस्पति (गुरु)',
    luckyColor: 'Golden / Pale Yellow / Sea Green',
    luckyColorHi: 'हल्का पीला / सुनहरा',
    luckyNumber: 3,
    luckyDay: 'Thursday',
    luckyDayHi: 'गुरुवार',
    favorableGem: 'Yellow Sapphire (पुखराज)',
    favorableGemHi: 'पुखराज'
  }
];

export const NAKSHATRAS = [
  { name: 'Ashwini', nameHi: 'अश्विनी', lord: 'Ketu', lordHi: 'केतु', rashi: 1 },
  { name: 'Bharani', nameHi: 'भरणी', lord: 'Venus', lordHi: 'शुक्र', rashi: 1 },
  { name: 'Krittika', nameHi: 'कृत्तिका', lord: 'Sun', lordHi: 'सूर्य', rashi: 1 },
  { name: 'Rohini', nameHi: 'रोहिणी', lord: 'Moon', lordHi: 'चन्द्रमा', rashi: 2 },
  { name: 'Mrigashira', nameHi: 'मृगशिरा', lord: 'Mars', lordHi: 'मंगल', rashi: 2 },
  { name: 'Ardra', nameHi: 'आर्द्रा', lord: 'Rahu', lordHi: 'राहु', rashi: 3 },
  { name: 'Punarvasu', nameHi: 'पुनर्वसु', lord: 'Jupiter', lordHi: 'गुरु', rashi: 3 },
  { name: 'Pushya', nameHi: 'पुष्य', lord: 'Saturn', lordHi: 'शनि', rashi: 4 },
  { name: 'Ashlesha', nameHi: 'आश्लेषा', lord: 'Mercury', lordHi: 'बुध', rashi: 4 },
  { name: 'Magha', nameHi: 'मघा', lord: 'Ketu', lordHi: 'केतु', rashi: 5 },
  { name: 'Purva Phalguni', nameHi: 'पूर्वा फाल्गुनी', lord: 'Venus', lordHi: 'शुक्र', rashi: 5 },
  { name: 'Uttara Phalguni', nameHi: 'उत्तरा फाल्गुनी', lord: 'Sun', lordHi: 'सूर्य', rashi: 6 },
  { name: 'Hasta', nameHi: 'हस्त', lord: 'Moon', lordHi: 'चन्द्रमा', rashi: 6 },
  { name: 'Chitra', nameHi: 'चित्रा', lord: 'Mars', lordHi: 'मंगल', rashi: 7 },
  { name: 'Swati', nameHi: 'स्वाति', lord: 'Rahu', lordHi: 'राहु', rashi: 7 },
  { name: 'Vishakha', nameHi: 'विशाखा', lord: 'Jupiter', lordHi: 'गुरु', rashi: 7 },
  { name: 'Anuradha', nameHi: 'अनुराधा', lord: 'Saturn', lordHi: 'शनि', rashi: 8 },
  { name: 'Jyeshtha', nameHi: 'ज्येष्ठा', lord: 'Mercury', lordHi: 'बुध', rashi: 8 },
  { name: 'Mula', nameHi: 'मूल', lord: 'Ketu', lordHi: 'केतु', rashi: 9 },
  { name: 'Purva Ashadha', nameHi: 'पूर्वाषाढ़ा', lord: 'Venus', lordHi: 'शुक्र', rashi: 9 },
  { name: 'Uttara Ashadha', nameHi: 'उत्तराषाढ़ा', lord: 'Sun', lordHi: 'सूर्य', rashi: 10 },
  { name: 'Shravana', nameHi: 'श्रवण', lord: 'Moon', lordHi: 'चन्द्रमा', rashi: 10 },
  { name: 'Dhanishta', nameHi: 'धनिष्ठा', lord: 'Mars', lordHi: 'मंगल', rashi: 11 },
  { name: 'Shatabhisha', nameHi: 'शतभिषा', lord: 'Rahu', lordHi: 'राहु', rashi: 11 },
  { name: 'Purva Bhadrapada', nameHi: 'पूर्वाभाद्रपद', lord: 'Jupiter', lordHi: 'गुरु', rashi: 11 },
  { name: 'Uttara Bhadrapada', nameHi: 'उत्तराभाद्रपद', lord: 'Saturn', lordHi: 'शनि', rashi: 12 },
  { name: 'Revati', nameHi: 'रेवती', lord: 'Mercury', lordHi: 'बुध', rashi: 12 }
];

export const HOUSE_DETAILS = [
  {
    house: 1,
    nameHi: 'प्रथम भाव (लग्न / तनु भाव)',
    signification: 'Self, Physical body, Personality, Vitality, Appearance, Longevity',
    significationHi: 'शारीरिक बनावट, रूप-रंग, स्वास्थ्य, आत्म-सम्मान, चरित्र और जीवन की दिशा'
  },
  {
    house: 2,
    nameHi: 'द्वितीय भाव (धन / कुटुंब भाव)',
    signification: 'Accumulated wealth, Family, Speech, Assets, Food habits',
    significationHi: 'संचित धन, पैतृक संपत्ति, परिवार, वाणी, खानपान, दाहिनी आँख'
  },
  {
    house: 3,
    nameHi: 'तृतीय भाव (सहज / पराक्रम भाव)',
    signification: 'Courage, Younger siblings, Short travels, Communication, Hard work',
    significationHi: 'पराक्रम, साहस, छोटे भाई-बहन, छोटी यात्राएं, लेखन, हाथ-कंधे'
  },
  {
    house: 4,
    nameHi: 'चतुर्थ भाव (सुख / मातृ भाव)',
    signification: 'Mother, Home, Land, Vehicles, Happiness, Mental Peace',
    significationHi: 'माता का सुख, गृह, भूमि-भवन, वाहन, सुख-शांति, छाती व हृदय'
  },
  {
    house: 5,
    nameHi: 'पंचम भाव (पुत्र / विद्या भाव)',
    signification: 'Children, Intelligence, Higher education, Purva Punya, Speculation',
    significationHi: 'संतान, तीव्र बुद्धि, उच्च विद्या, मंत्र सिद्धि, पूर्व जन्म के पुण्य'
  },
  {
    house: 6,
    nameHi: 'षष्ठ भाव (रिपु / रोग भाव)',
    signification: 'Debts, Enemies, Diseases, Competitions, Daily work',
    significationHi: 'शत्रु, रोग, ऋण, प्रतिस्पर्धा, कानूनी मामले, सेवा कार्य'
  },
  {
    house: 7,
    nameHi: 'सप्तम भाव (कलत्र / दांपत्य भाव)',
    signification: 'Spouse, Marriage, Business partnerships, Public relations',
    significationHi: 'जीवनसाथी, वैवाहिक सुख, व्यापारिक साझेदारी, जनसंपर्क'
  },
  {
    house: 8,
    nameHi: 'अष्टम भाव (आयु / रंध्र भाव)',
    signification: 'Longevity, Occult, Sudden gains/losses, Research, Transformation',
    significationHi: 'आयु, गुप्त विद्या, अचानक धनलाभ या हानि, पैतृक वसीयत, संकट'
  },
  {
    house: 9,
    nameHi: 'नवम भाव (भाग्य / धर्म भाव)',
    signification: 'Fortune, Higher wisdom, Father, Guru, Long pilgrimages',
    significationHi: 'भाग्य, धर्म, पिता, गुरु कृपा, तीर्थ यात्राएं, नैतिक मूल्य'
  },
  {
    house: 10,
    nameHi: 'दशम भाव (कर्म / राज्य भाव)',
    signification: 'Career, Profession, Fame, Social status, Government favors',
    significationHi: 'आजीविका, व्यवसाय, मान-सम्मान, पद-प्रतिष्ठा, पिता की स्थिति'
  },
  {
    house: 11,
    nameHi: 'एकादश भाव (आय / लाभ भाव)',
    signification: 'Gains, Income, Elder siblings, Friends, Fulfilled desires',
    significationHi: 'समस्त प्रकार के लाभ, आय स्रोत, बड़े भाई-बहन, मित्र मंडली, आकांक्षाएं'
  },
  {
    house: 12,
    nameHi: 'द्वादश भाव (व्यय / मोक्ष भाव)',
    signification: 'Expenses, Foreign lands, Hospitalization, Bed comforts, Moksha',
    significationHi: 'व्यय, मोक्ष, विदेश गमन, अस्पताल, शयन सुख, गुप्त दान'
  }
];

// Helper: Seeded pseudo-random based on string to ensure consistent yet rich outcomes
function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Vedic Lagna & Planetary positions calculation
 */
export function calculateJanamKundli(input: KundliInput): KundliResult {
  const seedStr = `${input.fullName}_${input.dob}_${input.birthTime}_${input.birthPlace}`;
  const seed = getHash(seedStr);

  const [yearStr, monthStr, dayStr] = input.dob.split('-');
  const year = parseInt(yearStr || '1995', 10);
  const month = parseInt(monthStr || '1', 10);
  const day = parseInt(dayStr || '1', 10);

  const [hourStr, minStr] = (input.birthTime || '12:00').split(':');
  const hour = parseInt(hourStr || '12', 10);
  const min = parseInt(minStr || '0', 10);

  // Day of year
  const dateObj = new Date(year, month - 1, day);
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((dateObj.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

  // Approx Sun longitude: Vernal Equinox March 21 (Day ~80) is 0° Aries
  const sunLongDeg = ((dayOfYear - 80 + 365) % 365) * (360 / 365.25);
  const sunRashiIndex = Math.floor(sunLongDeg / 30) % 12;

  // Approximate Lagna based on time relative to 6:00 AM (Sunrise ~ Sun in 1st house)
  const hoursSinceSunrise = (hour + min / 60 - 6 + 24) % 24;
  const signsAdvanced = Math.floor(hoursSinceSunrise / 2); // Each sign takes ~2 hours
  const lagnaRashiIndex = (sunRashiIndex + signsAdvanced) % 12;
  const lagnaSign = ZODIAC_SIGNS[lagnaRashiIndex];

  // Moon sign & Nakshatra based on day & seed
  const moonRashiIndex = (seed % 12);
  const moonSign = ZODIAC_SIGNS[moonRashiIndex];
  const nakshatraIndex = (seed % 27);
  const birthNakshatra = NAKSHATRAS[nakshatraIndex];
  const pada = (seed % 4) + 1;

  // Nine Vedic Grahas
  const planetDefs = [
    { nameEn: 'Sun', nameHi: 'सूर्य', symbol: '☉', defaultOffset: 0 },
    { nameEn: 'Moon', nameHi: 'चन्द्र', symbol: '☽', defaultOffset: (seed % 12) },
    { nameEn: 'Mars', nameHi: 'मंगल', symbol: '♂', defaultOffset: (seed + 2) % 12 },
    { nameEn: 'Mercury', nameHi: 'बुध', symbol: '☿', defaultOffset: (sunRashiIndex + (seed % 3 - 1) + 12) % 12 },
    { nameEn: 'Jupiter', nameHi: 'गुरु', symbol: '♃', defaultOffset: (seed + 4) % 12 },
    { nameEn: 'Venus', nameHi: 'शुक्र', symbol: '♀', defaultOffset: (sunRashiIndex + (seed % 4 - 2) + 12) % 12 },
    { nameEn: 'Saturn', nameHi: 'शनि', symbol: '♄', defaultOffset: (seed + 7) % 12 },
    { nameEn: 'Rahu', nameHi: 'राहु', symbol: '☊', defaultOffset: (seed + 5) % 12 },
    { nameEn: 'Ketu', nameHi: 'केतु', symbol: '☋', defaultOffset: (seed + 11) % 12 } // Ketu is 180° opposite Rahu
  ];

  const planets: PlanetPosition[] = planetDefs.map((p, idx) => {
    let rashiIdx = p.defaultOffset;
    if (p.nameEn === 'Sun') rashiIdx = sunRashiIndex;
    if (p.nameEn === 'Moon') rashiIdx = moonRashiIndex;
    if (p.nameEn === 'Ketu') {
      const rahuSign = planetDefs.find(x => x.nameEn === 'Rahu')!.defaultOffset;
      rashiIdx = (rahuSign + 6) % 12;
    }

    const rashi = ZODIAC_SIGNS[rashiIdx];
    // House is relative to Lagna: House 1 = Lagna, House 2 = Lagna+1, etc.
    const house = ((rashiIdx - lagnaRashiIndex + 12) % 12) + 1;
    const deg = (seed * (idx + 3) * 7) % 30;
    const degStr = `${deg}° ${(seed * 13) % 60}'`;

    const nak = NAKSHATRAS[(seed + idx * 3) % 27];

    let status: PlanetPosition['status'] = 'Friendly';
    let statusHi: PlanetPosition['statusHi'] = 'मित्र';

    if (rashi.rulingPlanet === p.nameEn) {
      status = 'Own Sign';
      statusHi = 'स्वग्रही';
    } else if (
      (p.nameEn === 'Sun' && rashi.rashiNumber === 1) ||
      (p.nameEn === 'Moon' && rashi.rashiNumber === 2) ||
      (p.nameEn === 'Mars' && rashi.rashiNumber === 10) ||
      (p.nameEn === 'Mercury' && rashi.rashiNumber === 6) ||
      (p.nameEn === 'Jupiter' && rashi.rashiNumber === 4) ||
      (p.nameEn === 'Venus' && rashi.rashiNumber === 12) ||
      (p.nameEn === 'Saturn' && rashi.rashiNumber === 7)
    ) {
      status = 'Exalted';
      statusHi = 'उच्च';
    } else if (
      (p.nameEn === 'Sun' && rashi.rashiNumber === 7) ||
      (p.nameEn === 'Moon' && rashi.rashiNumber === 8) ||
      (p.nameEn === 'Mars' && rashi.rashiNumber === 4) ||
      (p.nameEn === 'Mercury' && rashi.rashiNumber === 12) ||
      (p.nameEn === 'Jupiter' && rashi.rashiNumber === 10) ||
      (p.nameEn === 'Venus' && rashi.rashiNumber === 6) ||
      (p.nameEn === 'Saturn' && rashi.rashiNumber === 1)
    ) {
      status = 'Debilitated';
      statusHi = 'नीच';
    }

    return {
      nameEn: p.nameEn,
      nameHi: p.nameHi,
      symbol: p.symbol,
      rashiNumber: rashi.rashiNumber,
      rashiNameEn: rashi.nameEn,
      rashiNameHi: rashi.nameHi,
      house,
      degrees: deg,
      degreeStr: degStr,
      nakshatra: nak.name,
      nakshatraHi: nak.nameHi,
      pada: ((seed + idx) % 4) + 1,
      isRetrograde: (idx === 4 || idx === 6) && (seed % 3 === 0),
      isCombust: idx !== 0 && Math.abs(rashiIdx - sunRashiIndex) === 0 && deg < 8,
      status,
      statusHi,
      signLord: rashi.rulingPlanet
    };
  });

  // Build 12 houses
  const houses: HouseInfo[] = Array.from({ length: 12 }, (_, i) => {
    const houseNumber = i + 1;
    const rashiIndex = (lagnaRashiIndex + i) % 12;
    const rashi = ZODIAC_SIGNS[rashiIndex];
    const details = HOUSE_DETAILS[i];
    const planetsInHouse = planets.filter(p => p.house === houseNumber);

    return {
      houseNumber,
      rashiNumber: rashi.rashiNumber,
      rashiName: rashi.nameEn,
      rashiNameHi: rashi.nameHi,
      signLord: rashi.rulingPlanet,
      signLordHi: rashi.rulingPlanetHi,
      planetsPresent: planetsInHouse,
      nameHi: details.nameHi,
      signification: details.signification,
      significationHi: details.significationHi
    };
  });

  // Vimshottari Mahadasha sequence
  const dashaPlanets = [
    { en: 'Ketu', hi: 'केतु', years: 7 },
    { en: 'Venus', hi: 'शुक्र', years: 20 },
    { en: 'Sun', hi: 'सूर्य', years: 6 },
    { en: 'Moon', hi: 'चन्द्र', years: 10 },
    { en: 'Mars', hi: 'मंगल', years: 7 },
    { en: 'Rahu', hi: 'राहु', years: 18 },
    { en: 'Jupiter', hi: 'गुरु', years: 16 },
    { en: 'Saturn', hi: 'शनि', years: 19 },
    { en: 'Mercury', hi: 'बुध', years: 17 }
  ];

  const nakLord = birthNakshatra.lord;
  const startLordIdx = dashaPlanets.findIndex(d => d.en.toLowerCase() === nakLord.toLowerCase());
  const validStart = startLordIdx >= 0 ? startLordIdx : 0;

  const currentYear = new Date().getFullYear();
  let accumulatedYear = year;

  const dashaSequence: DashaPeriod[] = [];
  for (let i = 0; i < 9; i++) {
    const dp = dashaPlanets[(validStart + i) % 9];
    const startY = accumulatedYear;
    const endY = startY + dp.years;
    accumulatedYear = endY;

    const isCurrent = currentYear >= startY && currentYear < endY;
    dashaSequence.push({
      planet: dp.en,
      planetHi: dp.hi,
      startDate: `${startY}-01-01`,
      endDate: `${endY}-12-31`,
      years: dp.years,
      isCurrent,
      subDasha: isCurrent ? 'अंतरदशा: ' + dashaPlanets[(validStart + i + 1) % 9].hi : undefined
    });
  }

  const currentDasha = dashaSequence.find(d => d.isCurrent) || dashaSequence[0];

  // Yogas detection
  const yogas: YogaDetail[] = [];

  // Gajakesari Yoga check (Jupiter & Moon in Kendra to each other)
  const jup = planets.find(p => p.nameEn === 'Jupiter')!;
  const moon = planets.find(p => p.nameEn === 'Moon')!;
  const houseDiff = Math.abs(jup.house - moon.house);
  if ([0, 3, 6, 9].includes(houseDiff) || [1, 4, 7, 10].includes(jup.house)) {
    yogas.push({
      nameEn: 'Gajakesari Yoga',
      nameHi: 'गजकेसरी महायोग',
      type: 'Raj Yoga',
      typeHi: 'राज योग',
      planetsInvolved: ['Jupiter (गुरु)', 'Moon (चन्द्र)'],
      descriptionEn: 'Formed when Jupiter and Moon are mutually in Kendra or well-aspected.',
      descriptionHi: 'बृहस्पति एवं चन्द्रमा का शुभ योग ज्ञान, प्रतिष्ठा, उच्च पद और अपार यश प्रदान करता है।',
      favorableEffect: 'Confers wisdom, spotless reputation, prosperity, and magnetic charisma.',
      favorableEffectHi: 'यह योग समाज में प्रतिष्ठित पद, दीर्घायु, स्थिर संपत्ति और शत्रु विजय देता है।'
    });
  }

  // Budhaditya Yoga
  const sun = planets.find(p => p.nameEn === 'Sun')!;
  const merc = planets.find(p => p.nameEn === 'Mercury')!;
  if (sun.house === merc.house) {
    yogas.push({
      nameEn: 'Budhaditya Yoga',
      nameHi: 'बुधादित्य राजयोग',
      type: 'Raj Yoga',
      typeHi: 'राज योग',
      planetsInvolved: ['Sun (सूर्य)', 'Mercury (बुध)'],
      descriptionEn: 'Formed by conjunction of the Sun and Mercury.',
      descriptionHi: 'सूर्य और बुध की युति व्यक्ति को प्रखर बुद्धि, प्रशासनिक क्षमता और उत्कृष्ट वाक्पटुता देती है।',
      favorableEffect: 'Sharp analytical intellect, high administrative success, and financial acumen.',
      favorableEffectHi: 'व्यापार एवं सरकारी क्षेत्र में उच्च सफलता तथा बौद्धिक प्रभुत्व प्राप्त होता है।'
    });
  }

  // Chandra Mangal Yoga
  const mars = planets.find(p => p.nameEn === 'Mars')!;
  if (moon.house === mars.house || Math.abs(moon.house - mars.house) === 6) {
    yogas.push({
      nameEn: 'Chandra-Mangal Yoga',
      nameHi: 'लक्ष्मी योग (चन्द्र-मंगल)',
      type: 'Dhana Yoga',
      typeHi: 'धन योग',
      planetsInvolved: ['Moon (चन्द्र)', 'Mars (मंगल)'],
      descriptionEn: 'Conjunction or aspect between Moon and Mars generates massive commercial wealth.',
      descriptionHi: 'चन्द्रमा और मंगल का संबंध जातक को उद्योग, रियल एस्टेट व व्यापार में अतुल्य धन दिलाता है।',
      favorableEffect: 'Exceptional enterprise ability, commercial acumen, and immovable property gains.',
      favorableEffectHi: 'भूमि, भवन, वाहन एवं स्वतंत्र व्यापार में सतत समृद्धि और संपत्ति अर्जन।'
    });
  }

  // Default Raj Yoga if none found
  if (yogas.length === 0) {
    yogas.push({
      nameEn: 'Kendra-Trikona Raj Yoga',
      nameHi: 'केंद्र-त्रिकोण राजयोग',
      type: 'Raj Yoga',
      typeHi: 'राज योग',
      planetsInvolved: ['Lagna Lord', '9th Lord'],
      descriptionEn: 'Auspicious relationship between Kendra and Trikona lords.',
      descriptionHi: 'लग्न एवं नवमेश का शुभ प्रभाव जीवन में निरंतर भाग्योदय और उन्नति सुनिश्चित करता है।',
      favorableEffect: 'Steady elevation in status, luck during challenging phases, and spiritual elevation.',
      favorableEffectHi: 'भाग्य का पूर्ण सहयोग, संकटों से सहज मुक्ति एवं परिवार में मान-सम्मान।'
    });
  }

  // Ashtakavarga and Varna details
  const varnas = ['ब्राह्मण', 'क्षत्रिय', 'वैश्य', 'शूद्र'];
  const yonis = ['अश्व', 'गज', 'मेष', 'सर्प', 'श्वान', 'मार्जार', 'मूषक', 'गौ', 'महिष', 'व्याघ्र', 'मृग', 'वानर', 'नकुल', 'सिंह'];
  const ganas = ['देव', 'मनुष्य', 'राक्षस'];
  const nadis = ['आदि (वात)', 'मध्य (पित्त)', 'अन्त्य (कफ)'];

  return {
    input,
    lagnaRashi: lagnaSign,
    moonRashi: moonSign,
    sunRashi: ZODIAC_SIGNS[sunRashiIndex],
    birthNakshatra: birthNakshatra.name,
    birthNakshatraHi: birthNakshatra.nameHi,
    nakshatraPada: pada,
    nakshatraLord: birthNakshatra.lordHi,
    charanVarna: 'Vaishya',
    varnaHi: varnas[moonRashiIndex % 4],
    yoni: 'Elephant (गज)',
    yoniHi: yonis[seed % yonis.length],
    gana: ganas[seed % 3],
    ganaHi: ganas[seed % 3],
    nadi: nadis[seed % 3],
    nadiHi: nadis[seed % 3],
    planets,
    houses,
    currentDasha,
    dashaSequence,
    yogas,
    generalPredictions: {
      personality: `Your Lagna is ${lagnaSign.nameEn} (${lagnaSign.nameHi}). You possess innate leadership, strong willpower, and magnetic charisma. Governed by ${lagnaSign.rulingPlanet}, you handle adversity with fortitude.`,
      personalityHi: `आपका लग्न ${lagnaSign.nameHi} है, जिसके स्वामी ${lagnaSign.rulingPlanetHi} हैं। आप आत्मविश्वासी, दृढ़निश्चयी और सिद्धांतप्रिय हैं। आपकी सोच दूरदर्शी है और समाज में आपका एक विशिष्ट प्रभाव रहता है।`,
      career: `Strong 10th house indicators suggest success in leadership, administrative management, digital enterprise, technology, or consulting. Mid-30s bring rapid rise.`,
      careerHi: `दशम भाव की अनुकूल स्थिति दर्शाती है कि प्रशासनिक सेवाओं, तकनीकी क्षेत्र, स्वतंत्र व्यवसाय एवं परामर्श में आपको विशेष ख्याति मिलेगी। 28 से 36 वर्ष की आयु में अभूतपूर्व उन्नति के योग हैं।`,
      marriage: `7th house dynamics show an affectionate, culturally grounded, and supportive spouse. Mutual respect and clear communication ensure harmonious marital life.`,
      marriageHi: `सप्तम भाव का विश्लेषण एक समझदार, सुसंस्कृत और निष्ठावान जीवनसाथी की उपस्थिति दर्शाता है। विचार-विमर्श में खुलापन रखने से वैवाहिक जीवन सुखद व समृद्ध रहेगा।`,
      health: `Generally robust vitality. Pay attention to digestion, seasonal weather changes, and maintain proper sleep hygiene. Regular Surya Namaskar is beneficial.`,
      healthHi: `सामान्यतः स्वास्थ्य उत्तम रहेगा। उदर (पाचन) व वात-पित्त संतुलन पर ध्यान दें। प्रातः सूर्य अर्घ्य एवं प्राणायाम से शारीरिक और मानसिक ऊर्जा में वृद्धि होगी।`,
      wealth: `2nd and 11th houses form strong financial linkages. Immovable assets, property investments, and recurring business profits will accumulate steadily after age 30.`,
      wealthHi: `द्वितीय (धन) एवं एकादश (लाभ) भाव का सुदृढ़ संयोग निरंतर आर्थिक स्थिरता देता है। 30 वर्ष के उपरांत अचल संपत्ति, भूमि एवं दीर्घकालिक निवेश से विपुल लाभ होगा।`
    },
    remedies: {
      gemstone: lagnaSign.favorableGem,
      gemstoneHi: lagnaSign.favorableGemHi,
      rudraksha: '5 Mukhi Rudraksha / 7 Mukhi Mahalaxmi Rudraksha',
      rudrakshaHi: 'पंचमुखी रुद्राक्ष अथवा सात मुखी महालक्ष्मी रुद्राक्ष',
      fastingDay: lagnaSign.luckyDay,
      fastingDayHi: lagnaSign.luckyDayHi,
      mantra: `ॐ नमो भगवते वासुदेवाय / ॐ ${lagnaSign.rulingPlanetHi} देवाय नमः`,
      donations: 'Ghee, yellow grains, copper vessels, and sweet items on Tuesday/Thursday',
      donationsHi: 'गुरुवार को चने की दाल, बेसन के लड्डू व मंगलवार को लाल वस्त्र या फल का दान करें।'
    }
  };
}

/**
 * 36 Guna Ashtakoot Matching Calculator
 */
export function calculateKundliMatching(
  groomName: string,
  groomRashiIdx: number,
  groomNakshatraIdx: number,
  brideName: string,
  brideRashiIdx: number,
  brideNakshatraIdx: number
): MatchingResult {
  const groomRashi = ZODIAC_SIGNS[groomRashiIdx % 12];
  const brideRashi = ZODIAC_SIGNS[brideRashiIdx % 12];
  const groomNak = NAKSHATRAS[groomNakshatraIdx % 27];
  const brideNak = NAKSHATRAS[brideNakshatraIdx % 27];

  const seed = getHash(`${groomName}_${brideName}_${groomRashi.nameEn}_${brideRashi.nameEn}`);

  // 1. Varna (1 pt)
  const groomVarna = groomRashiIdx % 4;
  const brideVarna = brideRashiIdx % 4;
  const varnaScore = groomVarna >= brideVarna ? 1 : 0;

  // 2. Vashya (2 pts)
  const vashyaDiff = Math.abs(groomRashiIdx - brideRashiIdx);
  const vashyaScore = [0, 4, 8].includes(vashyaDiff) ? 2 : (vashyaDiff % 2 === 0 ? 1 : (seed % 2 ? 1 : 2));

  // 3. Tara (3 pts)
  const taraScore = (seed % 3 === 0) ? 1.5 : 3;

  // 4. Yoni (4 pts)
  const yoniScore = [2, 3, 4][seed % 3];

  // 5. Graha Maitri (5 pts)
  const rashiDiff = Math.abs(groomRashiIdx - brideRashiIdx);
  let maitriScore = 5;
  if ([1, 5, 7].includes(rashiDiff)) maitriScore = 4;
  else if ([2, 6].includes(rashiDiff)) maitriScore = 3;
  else if (rashiDiff === 8) maitriScore = 1;

  // 6. Gana (6 pts)
  const ganaScore = (seed % 4 === 0) ? 3 : 6;

  // 7. Bhakoot (7 pts)
  const bhakootScore = [0, 2, 3, 4, 8, 10].includes(rashiDiff) ? 7 : (seed % 2 === 0 ? 0 : 7);

  // 8. Nadi (8 pts)
  const nadiScore = (groomNakshatraIdx % 3 !== brideNakshatraIdx % 3) ? 8 : (seed % 3 === 0 ? 0 : 8);

  const scores: AshtakootScore[] = [
    {
      name: 'Varna (वर्ण)',
      nameHi: 'वर्ण (कार्य एवं आध्यात्मिक सामंजस्य)',
      maxScore: 1,
      obtainedScore: varnaScore,
      description: 'Ego and intellectual compatibility.',
      descriptionHi: 'आध्यात्मिक झुकाव और कार्यप्रणाली में सामंजस्य दर्शाता है।',
      verdict: varnaScore === 1 ? 'Excellent' : 'Average',
      verdictHi: varnaScore === 1 ? 'अति उत्तम' : 'मध्यम'
    },
    {
      name: 'Vashya (वश्य)',
      nameHi: 'वश्य (पारस्परिक आकर्षण एवं प्रभाव)',
      maxScore: 2,
      obtainedScore: vashyaScore,
      description: 'Mutual attraction and dominance equilibrium.',
      descriptionHi: 'एक-दूसरे के प्रति स्वाभाविक समर्पण और आकर्षण का परिचायक है।',
      verdict: vashyaScore === 2 ? 'Excellent' : 'Good',
      verdictHi: vashyaScore === 2 ? 'अति उत्तम' : 'उत्तम'
    },
    {
      name: 'Tara (तारा)',
      nameHi: 'तारा (भाग्य, स्वास्थ्य एवं दीर्घायु)',
      maxScore: 3,
      obtainedScore: taraScore,
      description: 'Destiny, health, and mutual well-being.',
      descriptionHi: 'एक-दूसरे के भाग्य की अनुकूलता और दीर्घायु का विश्लेषण करता है।',
      verdict: taraScore >= 2 ? 'Good' : 'Average',
      verdictHi: taraScore >= 2 ? 'उत्तम' : 'मध्यम'
    },
    {
      name: 'Yoni (योनि)',
      nameHi: 'योनि (शारीरिक एवं जैविक सामंजस्य)',
      maxScore: 4,
      obtainedScore: yoniScore,
      description: 'Physical, biological, and intimate compatibility.',
      descriptionHi: 'शारीरिक सुख, जैविक अनुकूलता और आपसी संतुष्टि का सूचक है।',
      verdict: yoniScore >= 3 ? 'Excellent' : 'Good',
      verdictHi: yoniScore >= 3 ? 'अति उत्तम' : 'उत्तम'
    },
    {
      name: 'Graha Maitri (ग्रह मैत्री)',
      nameHi: 'ग्रह मैत्री (मित्रता एवं वैचारिक तालमेल)',
      maxScore: 5,
      obtainedScore: maitriScore,
      description: 'Psychological rapport and planetary friendship.',
      descriptionHi: 'राशि स्वामियों की मित्रता जातक-जातिका के वैचारिक तालमेल को दर्शाती है।',
      verdict: maitriScore >= 4 ? 'Excellent' : 'Good',
      verdictHi: maitriScore >= 4 ? 'अति उत्तम' : 'उत्तम'
    },
    {
      name: 'Gana (गण)',
      nameHi: 'गण (स्वभाव एवं व्यवहार अनुकूलता)',
      maxScore: 6,
      obtainedScore: ganaScore,
      description: 'Temperament and behavioral sync (Deva, Manushya, Rakshasa).',
      descriptionHi: 'मूल स्वभाव, जीवन जीने के दृष्टिकोण और संस्कारिक संतुलन का मापदंड है।',
      verdict: ganaScore === 6 ? 'Excellent' : 'Average',
      verdictHi: ganaScore === 6 ? 'अति उत्तम' : 'मध्यम'
    },
    {
      name: 'Bhakoot (भकूट)',
      nameHi: 'भकूट (पारिवारिक कल्याण एवं समृद्धि)',
      maxScore: 7,
      obtainedScore: bhakootScore,
      description: 'Emotional bond, family prosperity, and happiness.',
      descriptionHi: 'वैवाहिक जीवन में प्रेम, संतति और आर्थिक प्रगति का सबसे प्रमुख आधार है।',
      verdict: bhakootScore === 7 ? 'Excellent' : 'Poor',
      verdictHi: bhakootScore === 7 ? 'अति उत्तम' : 'न्यून'
    },
    {
      name: 'Nadi (नाड़ी)',
      nameHi: 'नाड़ी (स्वास्थ्य, आनुवांशिकी एवं वंश वृद्धि)',
      maxScore: 8,
      obtainedScore: nadiScore,
      description: 'Genetic compatibility and healthy progeny.',
      descriptionHi: 'संतान सुख, आनुवांशिकी एवं रक्त संतुलन का सबसे महत्वपूर्ण कूट (8 अंक) है।',
      verdict: nadiScore === 8 ? 'Excellent' : 'Poor',
      verdictHi: nadiScore === 8 ? 'अति उत्तम' : 'न्यून'
    }
  ];

  const totalPoints = scores.reduce((sum, s) => sum + s.obtainedScore, 0);
  const percentage = Math.round((totalPoints / 36) * 100);

  // Mangal Dosha check
  const groomMangal = (seed % 4 === 0);
  const brideMangal = (seed % 5 === 0);
  const mangalCancellation = groomMangal && brideMangal;

  let mangalVerdictEn = 'No Mangal Dosha found in either chart. Harmonious energetic balance.';
  let mangalVerdictHi = 'दोनों कुंडलियों में मांगलिक दोष अनुपस्थित है। दांपत्य जीवन के लिए पूर्ण शुभ है।';

  if (groomMangal && brideMangal) {
    mangalVerdictEn = 'Both bride and groom are Manglik. Dosha gets automatically cancelled (दोष परिहार).';
    mangalVerdictHi = 'वर एवं वधू दोनों मांगलिक हैं, जिससे शास्त्रों के अनुसार दोष स्वतः निरस्त (दोष परिहार) हो गया है।';
  } else if (groomMangal) {
    mangalVerdictEn = 'Groom is Manglik. Simple Kumbh Vivah or Hanuman Chalisa remedies recommended.';
    mangalVerdictHi = 'वर की कुंडली में आंशिक मंगल प्रभाव है। सुंदरकांड पाठ व लाल मूंगा धारण से अनुकूलता संभव है।';
  } else if (brideMangal) {
    mangalVerdictEn = 'Bride is Manglik. Ghat Vivah ritual or Vishnu idol worship balances the energy.';
    mangalVerdictHi = 'वधू की कुंडली में मंगल का प्रभाव है। घट विवाह अथवा मंगल शांति अनुष्ठान से पूर्ण समाधान संभव है।';
  }

  let recLevel: MatchingResult['recommendationLevel'] = 'Recommended';
  let recLevelHi: MatchingResult['recommendationLevelHi'] = 'शुभ व अनुकूल';

  if (totalPoints >= 28) {
    recLevel = 'Highly Recommended';
    recLevelHi = 'अति उत्तम (विवाह योग्य)';
  } else if (totalPoints >= 18) {
    recLevel = 'Recommended';
    recLevelHi = 'शुभ व अनुकूल';
  } else if (totalPoints >= 14) {
    recLevel = 'Average';
    recLevelHi = 'मध्यम (उपाय आवश्यक)';
  } else {
    recLevel = 'Not Recommended';
    recLevelHi = 'विचारणीय (दोष शांति जरूरी)';
  }

  return {
    groom: {
      name: groomName,
      rashi: `${groomRashi.nameHi} (${groomRashi.nameEn})`,
      nakshatra: groomNak.nameHi,
      mangalDosha: groomMangal
    },
    bride: {
      name: brideName,
      rashi: `${brideRashi.nameHi} (${brideRashi.nameEn})`,
      nakshatra: brideNak.nameHi,
      mangalDosha: brideMangal
    },
    totalPoints,
    percentage,
    scores,
    mangalDoshaVerdict: mangalVerdictEn,
    mangalDoshaVerdictHi: mangalVerdictHi,
    mangalCancellation,
    recommendationLevel: recLevel,
    recommendationLevelHi: recLevelHi,
    remedies: [
      'Recite Vishnu Sahasranama or Shiva Panchakshari Mantra together on Mondays.',
      'Feed green fodder to cows and offer sweets to young girls on festivals.',
      'Perform regular Lord Ganesha worship to dissolve all relationship obstacles.'
    ],
    remediesHi: [
      'विवाह पूर्व दोनों पक्ष श्री गणेश अथर्वशीर्ष एवं शिव पंचाक्षर मंत्र का पाठ करें।',
      'गौ माता को हरा चारा व गुड़ खिलाएं, इससे भकूट व नाड़ी संबंधी दोष शांत होते हैं।',
      'घर में स्फटिक श्रीयंत्र की स्थापना करें जिससे दांपत्य जीवन में सुख, शांति और समृद्धि बनी रहे।'
    ]
  };
}

/**
 * Numerology: Mulank, Bhagyank, and Namank calculation
 */
export function calculateNumerology(fullName: string, dob: string): NumerologyResult {
  // DOB: YYYY-MM-DD
  const [yearStr, monthStr, dayStr] = dob.split('-');
  const day = parseInt(dayStr || '1', 10);
  const month = parseInt(monthStr || '1', 10);
  const year = parseInt(yearStr || '2000', 10);

  // Reduce single number
  function reduceToSingle(n: number): number {
    let sum = n;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return sum;
  }

  const mulank = reduceToSingle(day);

  // Bhagyank = sum of all digits in DOB
  const dobDigitsSum = `${day}${month}${year}`.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  const bhagyank = reduceToSingle(dobDigitsSum);

  // Chaldean value table for name
  const chaldeanMap: Record<string, number> = {
    A: 1, I: 1, J: 1, Q: 1, Y: 1,
    B: 2, K: 2, R: 2,
    C: 3, G: 3, L: 3, S: 3,
    D: 4, M: 4, T: 4,
    E: 5, H: 5, N: 5, X: 5,
    U: 6, V: 6, W: 6,
    O: 7, Z: 7,
    F: 8, P: 8
  };

  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let nameSum = 0;
  for (const ch of cleanName) {
    nameSum += chaldeanMap[ch] || 1;
  }
  const namank = reduceToSingle(nameSum > 0 ? nameSum : 5);

  const planetMap: Record<number, { en: string; hi: string }> = {
    1: { en: 'Sun (सूर्य)', hi: 'सूर्य' },
    2: { en: 'Moon (चन्द्र)', hi: 'चन्द्रमा' },
    3: { en: 'Jupiter (गुरु)', hi: 'बृहस्पति (गुरु)' },
    4: { en: 'Rahu (राहु)', hi: 'राहु' },
    5: { en: 'Mercury (बुध)', hi: 'बुध' },
    6: { en: 'Venus (शुक्र)', hi: 'शुक्र' },
    7: { en: 'Ketu (केतु)', hi: 'केतु' },
    8: { en: 'Saturn (शनि)', hi: 'शनि' },
    9: { en: 'Mars (मंगल)', hi: 'मंगल' }
  };

  const traitsMap: Record<number, { en: string[]; hi: string[]; dates: number[]; days: string[]; daysHi: string[]; colors: string[]; colorsHi: string[]; compat: number[]; careerEn: string; careerHi: string }> = {
    1: {
      en: ['Visionary Leader', 'Independent', 'Original Thinker', 'Ambitious', 'Dominant'],
      hi: ['जन्मजात नेतृत्व क्षमता', 'आत्मविश्वासी', 'स्वतंत्र विचार', 'महत्वाकांक्षी', 'दृढ़ संकल्प'],
      dates: [1, 10, 19, 28],
      days: ['Sunday', 'Monday'],
      daysHi: ['रविवार', 'सोमवार'],
      colors: ['Golden Yellow', 'Orange', 'Copper'],
      colorsHi: ['सुनहरा', 'केसरिया', 'नारंगी'],
      compat: [1, 2, 3, 5, 9],
      careerEn: 'Politics, Executive Administration, Entrepreneurship, Medicine, Governance.',
      careerHi: 'प्रशासन, राजनीति, स्वतंत्र उद्योग, चिकित्सा, उच्च सरकारी पद एवं प्रबंधन।'
    },
    2: {
      en: ['Empathetic', 'Diplomatic', 'Imaginative', 'Intuitive', 'Peacemaker'],
      hi: ['भावुक व संवेदनशील', 'कूटनीतिज्ञ', 'रचनात्मक', 'शांतिप्रिय', 'कला प्रेमी'],
      dates: [2, 11, 20, 29],
      days: ['Monday', 'Sunday'],
      daysHi: ['सोमवार', 'रविवार'],
      colors: ['White', 'Cream', 'Light Green'],
      colorsHi: ['सफेद', 'हल्का हरा', 'दूधिया'],
      compat: [1, 2, 4, 7],
      careerEn: 'Arts, Counseling, Psychology, Writing, Hospitality, Marine, Public Relations.',
      careerHi: 'कला, संगीत, लेखन, परामर्श, मनोविज्ञान, जनसंपर्क एवं हॉस्पिटैलिटी।'
    },
    3: {
      en: ['Wise Scholar', 'Optimistic', 'Spiritual', 'Influential Speaker', 'Generous'],
      hi: ['ज्ञानी व दार्शनिक', 'आशावादी', 'आध्यात्मिक', 'उत्कृष्ट वक्ता', 'मार्गदर्शक'],
      dates: [3, 12, 21, 30],
      days: ['Thursday', 'Tuesday'],
      daysHi: ['गुरुवार', 'मंगलवार'],
      colors: ['Yellow', 'Saffron', 'Amber'],
      colorsHi: ['पीला', 'हल्दी रंग', 'केसरिया'],
      compat: [1, 3, 5, 9],
      careerEn: 'Teaching, Legal Practice, Finance, Astrology, Consulting, Civil Services.',
      careerHi: 'शिक्षा, वकालत, बैंक व वित्त, ज्योतिष, धार्मिक संस्थान एवं परामर्श सेवाएं।'
    },
    4: {
      en: ['Pragmatic Builder', 'Revolutionary', 'Analytical', 'Organized', 'Unconventional'],
      hi: ['व्यावहारिक निर्माता', 'क्रांतिकारी सोच', 'विश्लेषणात्मक', 'योजनाकार', 'अनुशासनप्रिय'],
      dates: [4, 13, 22, 31],
      days: ['Saturday', 'Sunday'],
      daysHi: ['शनिवार', 'रविवार'],
      colors: ['Blue', 'Grey', 'Electric Violet'],
      colorsHi: ['नीला', 'धूमिल (ग्रे)', 'बिजली जैसा जामुनी'],
      compat: [1, 2, 6, 8],
      careerEn: 'Software Engineering, Data Science, Research, Architecture, Aviation.',
      careerHi: 'सॉफ्टवेयर इंजीनियरिंग, डाटा साइंस, शोध, वास्तुशिल्प एवं वैज्ञानिक अनुसंधान।'
    },
    5: {
      en: ['Dynamic Communicator', 'Versatile', 'Adventurous', 'Commercial Savvy', 'Fast-paced'],
      hi: ['कुशल संचारक', 'बहुमुखी प्रतिभा', 'उद्यमी सोच', 'वाकपटु', 'परिवर्तनशील'],
      dates: [5, 14, 23],
      days: ['Wednesday', 'Friday'],
      daysHi: ['बुधवार', 'शुक्रवार'],
      colors: ['Emerald Green', 'Pastel Shades'],
      colorsHi: ['पन्ना हरा', 'हल्का हरा'],
      compat: [1, 3, 5, 6],
      careerEn: 'Trading, Digital Marketing, Journalism, Tech Startups, Travel, Sales.',
      careerHi: 'शेयर बाजार, डिजिटल मार्केटिंग, पत्रकारिता, टेक स्टार्टअप, ई-कॉमर्स व वाणिज्य।'
    },
    6: {
      en: ['Charismatic Host', 'Aesthetic Lover', 'Protective', 'Romantic', 'Luxury magnet'],
      hi: ['आकर्षक व्यक्तित्व', 'सौंदर्य प्रेमी', 'स्नेही', 'कलात्मक', 'सुख-साधन संपन्न'],
      dates: [6, 15, 24],
      days: ['Friday', 'Wednesday'],
      daysHi: ['शुक्रवार', 'बुधवार'],
      colors: ['Sky Blue', 'White', 'Pink'],
      colorsHi: ['आसमानी', 'सफेद', 'गुलाबी'],
      compat: [4, 5, 6, 8],
      careerEn: 'Fashion, Luxury Goods, Entertainment, Interior Design, Hospitality, Media.',
      careerHi: 'फैशन, सिनेमा, इंटीरियर डिजाइनिंग, आभूषण, लक्जरी ब्रांड्स व होटल प्रबंधन।'
    },
    7: {
      en: ['Mystic Seeker', 'Deep Thinker', 'Philosophical', 'Intuitive', 'Introspective'],
      hi: ['रहस्यवादी अन्वेषक', 'गूढ़ विचारक', 'दार्शनिक', 'अंतर्मुखी', 'अध्यात्मिक'],
      dates: [7, 16, 25],
      days: ['Monday', 'Thursday'],
      daysHi: ['सोमवार', 'गुरुवार'],
      colors: ['Light Yellow', 'White', 'Light Green'],
      colorsHi: ['हल्का पीला', 'श्वेत', 'हल्का हरा'],
      compat: [1, 2, 7, 9],
      careerEn: 'Astrology, Philosophy, Quantum Research, Poetry, Healing, Forensics.',
      careerHi: 'ज्योतिष, दर्शनशास्त्र, अनुसंधान, योग-ध्यान, हीलिंग, कविता व जासूसी।'
    },
    8: {
      en: ['Master of Destiny', 'Tenacious', 'Power Builder', 'Disciplined', 'Karmic Leader'],
      hi: ['कर्मयोगी', 'धैर्यवान', 'साम्राज्य निर्माता', 'अनुशासित', 'अथक परिश्रमी'],
      dates: [8, 17, 26],
      days: ['Saturday', 'Friday'],
      daysHi: ['शनिवार', 'शुक्रवार'],
      colors: ['Deep Blue', 'Black', 'Dark Brown'],
      colorsHi: ['गहरा नीला', 'काला', 'कत्थई'],
      compat: [3, 4, 5, 6],
      careerEn: 'Real Estate, Heavy Industries, Mining, Law Enforcement, Iron & Steel, Judiciary.',
      careerHi: 'रियल एस्टेट, भारी उद्योग, खनन, न्यायपालिका, लोहा-इस्पात एवं निर्माण क्षेत्र।'
    },
    9: {
      en: ['Fearless Warrior', 'Humanitarian', 'Courageous', 'Generous', 'High Energy'],
      hi: ['निडर व साहसी', 'ऊर्जावान', 'परोपकारी', 'स्पष्टवादी', 'सेनापति स्वभाव'],
      dates: [9, 18, 27],
      days: ['Tuesday', 'Thursday'],
      daysHi: ['मंगलवार', 'गुरुवार'],
      colors: ['Crimson Red', 'Rose', 'Bright Orange'],
      colorsHi: ['लाल', 'गुलाबी', 'चमकीला नारंगी'],
      compat: [1, 2, 3, 7, 9],
      careerEn: 'Defense Forces, Police, Sports, Surgery, Engineering, Social Activism.',
      careerHi: 'सेना, पुलिस, खेल जगत, शल्य चिकित्सा (सर्जरी), इंजीनियरिंग एवं सामाजिक संगठन।'
    }
  };

  const t = traitsMap[mulank] || traitsMap[1];

  return {
    fullName,
    birthDate: dob,
    mulank,
    bhagyank,
    namank,
    rulingPlanetEn: planetMap[mulank].en,
    rulingPlanetHi: planetMap[mulank].hi,
    personalityTraitsEn: t.en,
    personalityTraitsHi: t.hi,
    favorableDates: t.dates,
    favorableDaysEn: t.days,
    favorableDaysHi: t.daysHi,
    favorableColorsEn: t.colors,
    favorableColorsHi: t.colorsHi,
    compatibleNumbers: t.compat,
    unfavorableNumbers: [2, 4, 8].filter(n => !t.compat.includes(n)),
    favorableGemsEn: [mulank === 1 ? 'Ruby' : mulank === 5 ? 'Emerald' : 'Yellow Sapphire'],
    favorableGemsHi: [mulank === 1 ? 'माणिक्य' : mulank === 5 ? 'पन्ना' : 'पुखराज'],
    careerGuidanceEn: t.careerEn,
    careerGuidanceHi: t.careerHi
  };
}
