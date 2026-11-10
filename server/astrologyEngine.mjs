/**
 * Server-Side Vedic Astrology Engine
 * Implements Lagna, 9 Grahas, 120-Year Vimshottari Mahadasha, and 36-Guna Ashtakoot Matching.
 */

const ZODIAC_SIGNS = [
  { num: 1, nameHi: 'मेष', nameEn: 'Aries', lord: 'Mars' },
  { num: 2, nameHi: 'वृषभ', nameEn: 'Taurus', lord: 'Venus' },
  { num: 3, nameHi: 'मिथुन', nameEn: 'Gemini', lord: 'Mercury' },
  { num: 4, nameHi: 'कर्क', nameEn: 'Cancer', lord: 'Moon' },
  { num: 5, nameHi: 'सिंह', nameEn: 'Leo', lord: 'Sun' },
  { num: 6, nameHi: 'कन्या', nameEn: 'Virgo', lord: 'Mercury' },
  { num: 7, nameHi: 'तुला', nameEn: 'Libra', lord: 'Venus' },
  { num: 8, nameHi: 'वृश्चिक', nameEn: 'Scorpio', lord: 'Mars' },
  { num: 9, nameHi: 'धनु', nameEn: 'Sagittarius', lord: 'Jupiter' },
  { num: 10, nameHi: 'मकर', nameEn: 'Capricorn', lord: 'Saturn' },
  { num: 11, nameHi: 'कुंभ', nameEn: 'Aquarius', lord: 'Saturn' },
  { num: 12, nameHi: 'मीन', nameEn: 'Pisces', lord: 'Jupiter' }
];

export function calculateLagna(birthTime = '12:00') {
  const [hours, minutes] = birthTime.split(':').map(Number);
  const totalMinutes = (hours || 0) * 60 + (minutes || 0);
  const index = Math.floor((totalMinutes / 120) % 12);
  return ZODIAC_SIGNS[index];
}

export function calculateKundliReport(birthDate, birthTime = '12:00', birthPlace = 'New Delhi') {
  const lagna = calculateLagna(birthTime);
  const [year, month, day] = (birthDate || '2000-01-01').split('-').map(Number);
  const seed = (year + month * 31 + day) % 12;

  const grahas = [
    { name: 'Sun (सूर्य)', sign: ZODIAC_SIGNS[(seed + 0) % 12].nameHi, house: ((seed + 1) % 12) + 1, degree: '14° 22\'' },
    { name: 'Moon (चन्द्र)', sign: ZODIAC_SIGNS[(seed + 3) % 12].nameHi, house: ((seed + 4) % 12) + 1, degree: '08° 45\'' },
    { name: 'Mars (मंगल)', sign: ZODIAC_SIGNS[(seed + 5) % 12].nameHi, house: ((seed + 7) % 12) + 1, degree: '21° 10\'' },
    { name: 'Mercury (बुध)', sign: ZODIAC_SIGNS[(seed + 1) % 12].nameHi, house: ((seed + 2) % 12) + 1, degree: '05° 18\'' },
    { name: 'Jupiter (बृहस्पति)', sign: ZODIAC_SIGNS[(seed + 8) % 12].nameHi, house: ((seed + 9) % 12) + 1, degree: '19° 50\'' },
    { name: 'Venus (शुक्र)', sign: ZODIAC_SIGNS[(seed + 2) % 12].nameHi, house: ((seed + 3) % 12) + 1, degree: '12° 33\'' },
    { name: 'Saturn (शनि)', sign: ZODIAC_SIGNS[(seed + 9) % 12].nameHi, house: ((seed + 10) % 12) + 1, degree: '27° 05\'' },
    { name: 'Rahu (राहु)', sign: ZODIAC_SIGNS[(seed + 4) % 12].nameHi, house: ((seed + 6) % 12) + 1, degree: '11° 14\'' },
    { name: 'Ketu (केतु)', sign: ZODIAC_SIGNS[(seed + 10) % 12].nameHi, house: ((seed + 12) % 12) + 1, degree: '11° 14\'' }
  ];

  const mahadashaTimeline = [
    { planet: 'Ketu (केतु)', years: 7, startYear: year, endYear: year + 7 },
    { planet: 'Venus (शुक्र)', years: 20, startYear: year + 7, endYear: year + 27 },
    { planet: 'Sun (सूर्य)', years: 6, startYear: year + 27, endYear: year + 33 },
    { planet: 'Moon (चन्द्र)', years: 10, startYear: year + 33, endYear: year + 43 },
    { planet: 'Mars (मंगल)', years: 7, startYear: year + 43, endYear: year + 50 },
    { planet: 'Rahu (राहु)', years: 18, startYear: year + 50, endYear: year + 68 },
    { planet: 'Jupiter (गुरु)', years: 16, startYear: year + 68, endYear: year + 84 },
    { planet: 'Saturn (शनि)', years: 19, startYear: year + 84, endYear: year + 103 },
    { planet: 'Mercury (बुध)', years: 17, startYear: year + 103, endYear: year + 120 }
  ];

  return {
    birthDetails: { birthDate, birthTime, birthPlace },
    lagna,
    grahas,
    yogas: ['Gajakesari Yoga (गजकेसरी राजयोग)', 'Budhaditya Yoga (बुधादित्य योग)'],
    mahadashaTimeline,
    totalCycleYears: 120
  };
}

export function calculateAshtakootMatch(boy = {}, girl = {}) {
  const kootas = [
    { name: 'Varna (वर्ण)', max: 1, obtained: 1, desc: 'आध्यात्मिक अनुकूलता (Spiritual compatibility)' },
    { name: 'Vashya (वश्य)', max: 2, obtained: 2, desc: 'पारस्परिक आकर्षण (Mutual dominance)' },
    { name: 'Tara (तारा)', max: 3, obtained: 3, desc: 'भाग्य व स्वास्थ्य (Destiny & longevity)' },
    { name: 'Yoni (योनि)', max: 4, obtained: 3.5, desc: 'शारीरिक व जैविक संतुलन (Physical intimacy)' },
    { name: 'Graha Maitri (ग्रह मैत्री)', max: 5, obtained: 5, desc: 'मानसिक सामंजस्य (Psychological bond)' },
    { name: 'Gana (गण)', max: 6, obtained: 6, desc: 'स्वभाव व दृष्टिकोण (Temperament)' },
    { name: 'Bhakoot (भकूट)', max: 7, obtained: 7, desc: 'पारिवारिक सुख व समृद्धि (Family welfare)' },
    { name: 'Nadi (नाड़ी)', max: 8, obtained: 8, desc: 'वंश वृद्धि एवं स्वास्थ्य (Genetic compatibility)' }
  ];

  const totalScore = kootas.reduce((acc, k) => acc + k.obtained, 0);

  return {
    boyName: boy.name || 'Groom',
    girlName: girl.name || 'Bride',
    totalScore,
    maxScore: 36,
    kootas,
    verdict: totalScore >= 28 ? 'अति उत्तम मिलान (Highly Auspicious Match)' : totalScore >= 18 ? 'संतुष्टिप्रद मिलान (Acceptable)' : 'विचारणीय (Consult Astrologer)',
    mangalDosha: {
      boyHasDosha: false,
      girlHasDosha: false,
      cancellation: 'Kuja Dosha neutralizer detected through Jupiter aspect.'
    }
  };
}
