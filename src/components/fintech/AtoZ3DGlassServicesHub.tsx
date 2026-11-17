import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { 
  Send, 
  Fingerprint, 
  Zap, 
  Volume2, 
  Key, 
  Landmark, 
  FileText, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  Coins, 
  Sparkles, 
  Plane, 
  Car, 
  Flame, 
  Droplet, 
  Tv, 
  Wifi, 
  Smartphone, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Compass, 
  GraduationCap, 
  Printer, 
  HeartHandshake, 
  Moon, 
  Sun, 
  Award,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export type AtoZCategoryKey = 
  | 'all'
  | 'government'
  | 'banking'
  | 'bbps'
  | 'business'
  | 'astrology'
  | 'loans-insurance'
  | 'travel'
  | 'cyber-education';

interface AtoZ3DGlassServicesHubProps {
  onSelectTab?: (tab: 'superapp' | 'dmt' | 'aeps' | 'bbps' | 'soundbox' | 'apikeys') => void;
  currentHubTab?: string;
}

export const AtoZ3DGlassServicesHub: React.FC<AtoZ3DGlassServicesHubProps> = ({
  onSelectTab,
  currentHubTab = 'superapp'
}) => {
  const navigate = useNavigate();
  const { services, openApplyModal, language, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<AtoZCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Definition of A to Z Services with 3D Glass Styling & Workflow Targets
  const aToZServices = [
    // --- GOVERNMENT & CITIZEN ---
    {
      id: 'srv-aadhaar-update',
      cat: 'government',
      title: language === 'hi' ? 'आधार कार्ड अपडेट' : 'Aadhaar Card Update',
      sub: language === 'hi' ? 'बायोमेट्रिक व पता सुधार' : 'UIDAI Biometric & Address',
      icon: <Fingerprint size={22} />,
      color: '#00BAF2',
      glow: 'rgba(0, 186, 242, 0.4)',
      badge: 'UIDAI',
      serviceId: 'srv-aadhaar-update'
    },
    {
      id: 'srv-pan-new',
      cat: 'government',
      title: language === 'hi' ? 'पैन कार्ड Form 49A' : 'PAN Card Form 49A',
      sub: language === 'hi' ? 'नया व सुधार (2 घंटे में e-PAN)' : 'NSDL & UTIITSL e-PAN',
      icon: <CreditCard size={22} />,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      badge: 'POPULAR',
      serviceId: 'srv-pan-new'
    },
    {
      id: 'srv-passport-assist',
      cat: 'government',
      title: language === 'hi' ? 'पासपोर्ट सेवा केंद्र' : 'Passport Seva Tatkaal',
      sub: language === 'hi' ? 'तत्काल व सामान्य अपॉइंटमेंट' : 'MEA Official Appointment',
      icon: <Plane size={22} />,
      color: '#6366F1',
      glow: 'rgba(99, 102, 241, 0.4)',
      badge: 'GOVT',
      serviceId: 'srv-passport-assist'
    },
    {
      id: 'srv-voter-card',
      cat: 'government',
      title: language === 'hi' ? 'वोटर कार्ड NVSP' : 'Voter ID Card NVSP',
      sub: language === 'hi' ? 'नया पहचान पत्र व संशोधन' : 'Election Commission Form 6/8',
      icon: <CheckCircle2 size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: 'FREE CHECK',
      serviceId: 'srv-voter-card'
    },
    {
      id: 'srv-ayushman-card',
      cat: 'government',
      title: language === 'hi' ? 'आयुष्मान भारत ABHA' : 'Ayushman Bharat Card',
      sub: language === 'hi' ? '₹5 लाख मुफ्त इलाज कार्ड' : 'PM-JAY ₹5L Cashless Health',
      icon: <HeartHandshake size={22} />,
      color: '#EC4899',
      glow: 'rgba(236, 72, 153, 0.4)',
      badge: '₹5 LAKH',
      serviceId: 'srv-ayushman-card'
    },
    {
      id: 'srv-dl-assistance',
      cat: 'government',
      title: language === 'hi' ? 'ड्राइविंग लाइसेंस सारथी' : 'Driving License Sarathi',
      sub: language === 'hi' ? 'लर्निंग व परमानेंट स्लॉट' : 'MoRTH Learner & RTO Test',
      icon: <Car size={22} />,
      color: '#3B82F6',
      glow: 'rgba(59, 130, 246, 0.4)',
      badge: 'RTO',
      serviceId: 'srv-dl-assistance'
    },
    {
      id: 'srv-income-cert',
      cat: 'government',
      title: language === 'hi' ? 'आय / जाति / निवास' : 'Income / Caste / Domicile',
      sub: language === 'hi' ? 'ई-डिस्ट्रिक्ट तहसील प्रमाण-पत्र' : 'State e-District Certificates',
      icon: <FileText size={22} />,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)',
      badge: 'TEHSIL',
      serviceId: 'srv-income-cert'
    },
    {
      id: 'srv-eshram-reg',
      cat: 'government',
      title: language === 'hi' ? 'ई-श्रम व श्रमिक कल्याण' : 'E-Shram Labour Card',
      sub: language === 'hi' ? '₹2 लाख बीमा व सरकारी योजना' : 'Direct DBT & Accident Cover',
      icon: <ShieldCheck size={22} />,
      color: '#F97316',
      glow: 'rgba(249, 115, 22, 0.4)',
      badge: 'DBT',
      serviceId: 'srv-eshram-reg'
    },
    {
      id: 'srv-pmkisan-reg',
      cat: 'government',
      title: language === 'hi' ? 'पीएम किसान eKYC' : 'PM Kisan Samman Nidhi',
      sub: language === 'hi' ? '₹6,000 वार्षिक DBT सत्यापन' : 'eKYC & Beneficiary Status',
      icon: <Landmark size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: 'FARMER',
      serviceId: 'srv-pmkisan-reg'
    },

    // --- BANKING & AEPS ---
    {
      id: 'fin-dmt',
      cat: 'banking',
      title: language === 'hi' ? 'मनी ट्रांसफर (DMT)' : 'To Mobile / Bank',
      sub: language === 'hi' ? 'IMPS/NEFT तुरंत बैंक खाता' : 'DMT 24x7 Instant Send',
      icon: <Send size={22} />,
      color: '#00BAF2',
      glow: 'rgba(0, 186, 242, 0.4)',
      badge: 'INSTANT',
      actionType: 'tab',
      tabKey: 'dmt'
    },
    {
      id: 'fin-aeps',
      cat: 'banking',
      title: language === 'hi' ? 'आधार ATM (AEPS)' : 'Aadhaar ATM (AEPS)',
      sub: language === 'hi' ? 'अंगूठे से नकदी निकासी' : 'Biometric Cash Out',
      icon: <Fingerprint size={22} />,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      badge: '0% CHARGE',
      actionType: 'tab',
      tabKey: 'aeps'
    },
    {
      id: 'fin-soundbox',
      cat: 'banking',
      title: language === 'hi' ? 'साउंडबॉक्स ऑडियो' : 'Soundbox Audio',
      sub: language === 'hi' ? 'Paytm/PhonePe वॉइस अलर्ट' : 'UPI Voice Broadcasts',
      icon: <Volume2 size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: '4G AUDIO',
      actionType: 'tab',
      tabKey: 'soundbox'
    },
    {
      id: 'fin-gold',
      cat: 'banking',
      title: language === 'hi' ? '24K डिजिटल गोल्ड' : '24K Digital Gold',
      sub: language === 'hi' ? '₹10 से निवेश, 99.99% शुद्ध' : "Brinks Insured Vault",
      icon: <Coins size={22} />,
      color: '#F3D477',
      glow: 'rgba(243, 212, 119, 0.45)',
      badge: '99.99%',
      actionType: 'gold'
    },
    {
      id: 'fin-apikeys',
      cat: 'banking',
      title: language === 'hi' ? 'गेटवे API कीज़' : 'Gateway API Keys',
      sub: language === 'hi' ? 'DMT, AEPS व BBPS APIs' : 'Connect Developer APIs',
      icon: <Key size={22} />,
      color: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.4)',
      badge: 'DEV',
      actionType: 'tab',
      tabKey: 'apikeys'
    },

    // --- RECHARGES & BBPS UTILITY BILLS ---
    {
      id: 'bbps-electricity',
      cat: 'bbps',
      title: language === 'hi' ? 'बिजली बिल भुगतान' : 'Electricity Bill',
      sub: language === 'hi' ? 'सभी राज्यों के 100+ डिस्कॉम' : 'All State Power Discoms',
      icon: <Zap size={22} />,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      badge: 'BBPS',
      actionType: 'tab',
      tabKey: 'bbps'
    },
    {
      id: 'bbps-mobile',
      cat: 'bbps',
      title: language === 'hi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge',
      sub: language === 'hi' ? 'Jio, Airtel, Vi, BSNL' : 'Prepaid & Postpaid Plans',
      icon: <Smartphone size={22} />,
      color: '#00BAF2',
      glow: 'rgba(0, 186, 242, 0.4)',
      badge: 'CASHBACK',
      actionType: 'tab',
      tabKey: 'bbps'
    },
    {
      id: 'bbps-dth',
      cat: 'bbps',
      title: language === 'hi' ? 'DTH टीवी रिचार्ज' : 'DTH TV Recharge',
      sub: language === 'hi' ? 'Tata Play, Airtel, Dish TV' : 'Instant Channel Activation',
      icon: <Tv size={22} />,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)',
      badge: 'INSTANT',
      actionType: 'tab',
      tabKey: 'bbps'
    },
    {
      id: 'bbps-gas',
      cat: 'bbps',
      title: language === 'hi' ? 'LPG गैस सिलेंडर' : 'LPG Gas Booking',
      sub: language === 'hi' ? 'Indane, Bharat, HP Gas' : 'Official Booking & Receipt',
      icon: <Flame size={22} />,
      color: '#EF4444',
      glow: 'rgba(239, 68, 68, 0.4)',
      badge: 'CYLINDER',
      actionType: 'tab',
      tabKey: 'bbps'
    },
    {
      id: 'bbps-fastag',
      cat: 'bbps',
      title: language === 'hi' ? 'फास्टैग रिचार्ज' : 'FASTag Recharge',
      sub: language === 'hi' ? 'NETC राष्ट्रीय टोलवे' : 'Instant Toll Clearance',
      icon: <Car size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: 'NETC',
      actionType: 'tab',
      tabKey: 'bbps'
    },
    {
      id: 'bbps-water',
      cat: 'bbps',
      title: language === 'hi' ? 'पानी का बिल' : 'Water Board Bill',
      sub: language === 'hi' ? 'नगर निगम एवं जल बोर्ड' : 'Municipal Water Supply',
      icon: <Droplet size={22} />,
      color: '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.4)',
      badge: 'GOVT',
      actionType: 'tab',
      tabKey: 'bbps'
    },
    {
      id: 'bbps-broadband',
      cat: 'bbps',
      title: language === 'hi' ? 'ब्रॉडबैंड व फाइबर' : 'Broadband Fiber',
      sub: language === 'hi' ? 'JioFiber, Airtel Xstream' : 'High-Speed Internet Bill',
      icon: <Wifi size={22} />,
      color: '#6366F1',
      glow: 'rgba(99, 102, 241, 0.4)',
      badge: 'FIBER',
      actionType: 'tab',
      tabKey: 'bbps'
    },

    // --- BUSINESS, GST & MSME ---
    {
      id: 'srv-gst-reg',
      cat: 'business',
      title: language === 'hi' ? 'जीएसटी नया रजिस्ट्रेशन' : 'GST Registration',
      sub: language === 'hi' ? '15-अंकों का GSTIN व रिटर्न' : '15-Digit GSTIN Certificate',
      icon: <Building2 size={22} />,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      badge: 'GSTIN',
      serviceId: 'srv-gst-reg'
    },
    {
      id: 'srv-msme-udyam',
      cat: 'business',
      title: language === 'hi' ? 'एमएसएमई उद्यम प्रमाण-पत्र' : 'MSME Udyam Certificate',
      sub: language === 'hi' ? 'सरकारी सब्सिडी व मुद्रा लोन हेतु' : 'Govt MSME Gold Seal',
      icon: <Award size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: 'UDYAM',
      serviceId: 'srv-msme-udyam'
    },
    {
      id: 'srv-pvt-ltd',
      cat: 'business',
      title: language === 'hi' ? 'प्राइवेट लिमिटेड कंपनी' : 'Pvt Ltd Company Inc.',
      sub: language === 'hi' ? 'MCA SPICe+ रजिस्ट्रेशन' : 'MCA Incorporation & CIN',
      icon: <Landmark size={22} />,
      color: '#3B82F6',
      glow: 'rgba(59, 130, 246, 0.4)',
      badge: 'MCA',
      serviceId: 'srv-pvt-ltd'
    },
    {
      id: 'srv-fssai-lic',
      cat: 'business',
      title: language === 'hi' ? 'FSSAI फ़ूड लाइसेंस' : 'FSSAI Food License',
      sub: language === 'hi' ? 'होटल, रेस्टोरेंट व किराना' : 'Food Safety Standard Auth',
      icon: <ShieldCheck size={22} />,
      color: '#EC4899',
      glow: 'rgba(236, 72, 153, 0.4)',
      badge: 'FOOD',
      serviceId: 'srv-fssai-lic'
    },
    {
      id: 'srv-trademark-file',
      cat: 'business',
      title: language === 'hi' ? 'ट्रेडमार्क ब्रांड सुरक्षा' : 'Trademark Filing (TM)',
      sub: language === 'hi' ? 'लोगो, नाम व ब्रांड पेटेंट' : 'Intellectual Property Protection',
      icon: <ShieldCheck size={22} />,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)',
      badge: 'TM',
      serviceId: 'srv-trademark-file'
    },
    {
      id: 'srv-dsc-class3',
      cat: 'business',
      title: language === 'hi' ? 'डिजिटल सिग्नेचर (DSC)' : 'Class 3 DSC Token',
      sub: language === 'hi' ? 'टेंडर, MCA व IT रिटर्न टोकन' : 'FIPS Cryptographic USB Token',
      icon: <Key size={22} />,
      color: '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.4)',
      badge: 'CLASS 3',
      serviceId: 'srv-dsc-class3'
    },

    // --- VEDIC ASTROLOGY & KUNDLI ---
    {
      id: 'srv-astro-kundli',
      cat: 'astrology',
      title: language === 'hi' ? 'सटीक जन्म कुंडली' : 'Vedic Janam Kundli',
      sub: language === 'hi' ? '12 भाव, नवग्रह व 25 वर्ष फल' : '12 Bhavas & Navagraha Prediction',
      icon: <Sun size={22} />,
      color: '#F3D477',
      glow: 'rgba(243, 212, 119, 0.5)',
      badge: 'VEDIC',
      serviceId: 'srv-astro-kundli'
    },
    {
      id: 'srv-astro-matching',
      cat: 'astrology',
      title: language === 'hi' ? '36 गुण कुंडली मिलान' : '36 Guna Kundli Matching',
      sub: language === 'hi' ? 'अष्टकूट मिलान व मंगल दोष निवारण' : 'Ashtakoot Marriage Compatibility',
      icon: <HeartHandshake size={22} />,
      color: '#EC4899',
      glow: 'rgba(236, 72, 153, 0.4)',
      badge: 'VIVAH',
      serviceId: 'srv-astro-matching'
    },
    {
      id: 'srv-astro-consultation',
      cat: 'astrology',
      title: language === 'hi' ? 'ज्योतिष आचार्य परामर्श' : 'Astrologer Live Consult',
      sub: language === 'hi' ? 'गोल्ड मेडलिस्ट वैदिक आचार्य' : '1-on-1 Certified Consultation',
      icon: <Sparkles size={22} />,
      color: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.4)',
      badge: 'VERIFIED',
      serviceId: 'srv-astro-consultation'
    },
    {
      id: 'srv-astro-gemstones',
      cat: 'astrology',
      title: language === 'hi' ? 'प्रमाणित रत्न व रुद्राक्ष' : 'Certified Gemstones',
      sub: language === 'hi' ? 'सरकारी लैब प्रमाणित 100% शुद्ध' : 'Govt Lab Certified & Energized',
      icon: <Coins size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: 'LAB CERT',
      serviceId: 'srv-astro-gemstones'
    },

    // --- LOANS & INSURANCE ---
    {
      id: 'srv-biz-loan',
      cat: 'loans-insurance',
      title: language === 'hi' ? 'मुद्रा व MSME लोन' : 'Mudra Business Loan',
      sub: language === 'hi' ? 'बिना गारंटी ₹5 लाख तक' : 'Collateral-Free MSME Credit',
      icon: <Landmark size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: 'PRE-APPROVED',
      serviceId: 'srv-biz-loan'
    },
    {
      id: 'srv-health-ins',
      cat: 'loans-insurance',
      title: language === 'hi' ? 'परिवार स्वास्थ्य बीमा' : 'Family Health Mediclaim',
      sub: language === 'hi' ? 'कैशलेस अस्पताल उपचार कवर' : '10,000+ Cashless Hospitals',
      icon: <HeartHandshake size={22} />,
      color: '#00BAF2',
      glow: 'rgba(0, 186, 242, 0.4)',
      badge: 'CASHLESS',
      serviceId: 'srv-health-ins'
    },
    {
      id: 'srv-motor-ins',
      cat: 'loans-insurance',
      title: language === 'hi' ? 'वाहन बीमा (बाइक/कार)' : 'Vehicle Motor Insurance',
      sub: language === 'hi' ? 'जीरो डेप्रिसिएशन व त्वरित क्लेम' : 'Zero Depreciation Bike/Car',
      icon: <Car size={22} />,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      badge: 'ZERO DEP',
      serviceId: 'srv-motor-ins'
    },
    {
      id: 'srv-personal-loan',
      cat: 'loans-insurance',
      title: language === 'hi' ? 'पर्सनल लोन' : 'Instant Personal Loan',
      sub: language === 'hi' ? 'कम ब्याज दर, तुरंत खाते में' : 'Paperless Aadhaar Sanction',
      icon: <CreditCard size={22} />,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)',
      badge: 'FAST DISBURSAL',
      serviceId: 'srv-personal-loan'
    },

    // --- TRAVEL & TICKETS ---
    {
      id: 'srv-travel-flight-train',
      cat: 'travel',
      title: language === 'hi' ? 'तत्काल ट्रेन टिकट (IRCTC)' : 'IRCTC Tatkal Train Help',
      sub: language === 'hi' ? 'कन्फर्म सीट व PNR ट्रैकिंग' : 'Authorized Fast-Track Ticket',
      icon: <TrainIcon size={22} />,
      color: '#EF4444',
      glow: 'rgba(239, 68, 68, 0.4)',
      badge: 'IRCTC',
      serviceId: 'srv-travel-flight-train'
    },
    {
      id: 'travel-flight',
      cat: 'travel',
      title: language === 'hi' ? 'हवाई जहाज टिकट (Flight)' : 'Flight Ticket Booking',
      sub: language === 'hi' ? 'सस्ती घरेलू व अंतरराष्ट्रीय उड़ानें' : 'Lowest Airfare & Web Check-in',
      icon: <Plane size={22} />,
      color: '#00BAF2',
      glow: 'rgba(0, 186, 242, 0.4)',
      badge: 'AIRLINE',
      serviceId: 'srv-travel-flight-train'
    },
    {
      id: 'travel-bus',
      cat: 'travel',
      title: language === 'hi' ? 'इंटरस्टेट वोल्वो बस' : 'Intercity Volvo Bus',
      sub: language === 'hi' ? 'AC स्लीपर व सीटर बसें' : 'State & Private Luxury Bus',
      icon: <Car size={22} />,
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
      badge: 'LIVE GPS',
      serviceId: 'srv-travel-flight-train'
    },

    // --- CYBER CAFE & EXAMS ---
    {
      id: 'srv-exam-admit',
      cat: 'cyber-education',
      title: language === 'hi' ? 'सरकारी नौकरी फॉर्म' : 'Sarkari Job Exam Forms',
      sub: language === 'hi' ? 'SSC, UPSC, रेलवे व एडमिट कार्ड' : 'Online Form & Hall Ticket',
      icon: <GraduationCap size={22} />,
      color: '#6366F1',
      glow: 'rgba(99, 102, 241, 0.4)',
      badge: 'ADMIT CARD',
      serviceId: 'srv-exam-admit'
    },
    {
      id: 'srv-color-print-xerox',
      cat: 'cyber-education',
      title: language === 'hi' ? 'कलर ज़ेरॉक्स व लैमिनेशन' : 'Color Print & Lamination',
      sub: language === 'hi' ? 'हाई-क्वालिटी प्रिंट व बाइंडिंग' : 'Commercial Heavy Duty Print',
      icon: <Printer size={22} />,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      badge: 'HD PRINT',
      serviceId: 'srv-color-print-xerox'
    },
    {
      id: 'srv-cafe-session',
      cat: 'cyber-education',
      title: language === 'hi' ? 'हाई-स्पीड इंटरनेट कैफे' : 'Cyber Cafe Workstation',
      sub: language === 'hi' ? 'सुरक्षित ब्राउज़िंग व डॉक डाउनलोड' : 'High-Speed PC & Scanning',
      icon: <Compass size={22} />,
      color: '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.4)',
      badge: '1 GBPS',
      serviceId: 'srv-cafe-session'
    }
  ];

  // Helper train icon
  function TrainIcon(props: { size?: number }) {
    return (
      <svg width={props.size || 22} height={props.size || 22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="3" rx="2"/>
        <path d="M4 11h16"/>
        <path d="M12 3v8"/>
        <path d="m8 19-2 3"/>
        <path d="m18 22-2-3"/>
        <circle cx="8" cy="15" r="1"/>
        <circle cx="16" cy="15" r="1"/>
      </svg>
    );
  }

  // Filtered Services List
  const filteredServices = aToZServices.filter(item => {
    const matchCat = selectedCategory === 'all' || item.cat === selectedCategory;
    const matchSearch = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Action Click Handler: Full Functional Workflow
  const handleServiceClick = (item: typeof aToZServices[0]) => {
    if (item.actionType === 'tab' && onSelectTab && item.tabKey) {
      onSelectTab(item.tabKey as any);
      showToast(item.title, `Switched to ${item.title} Hub`, 'info');
      return;
    }

    if (item.actionType === 'gold') {
      showToast('24K Digital Gold', 'Opening Gold purchase desk.', 'info');
      if (onSelectTab) onSelectTab('superapp');
      return;
    }

    // Try finding in services catalog
    const target = services.find(s => s.id === item.serviceId || s.slug === item.serviceId);
    if (target) {
      openApplyModal(target);
    } else {
      // Create fallback item for full workflow modal
      openApplyModal({
        id: item.id,
        title: item.title,
        titleHi: item.title,
        description: item.sub,
        descriptionHi: item.sub,
        category: (item.cat as any) || 'government',
                basePrice: 50,
        govtFee: 0,
        timeline: 'Same Day Processing',
        timelineHi: 'उसी दिन प्रोसेसिंग',
        requiredDocs: ['Aadhaar Card', 'Mobile Number'],
        slug: item.id,
        badge: item.badge as any,
        icon: "Sparkles",
        requiredDocsHi: ["आधार कार्ड", "मोबाइल नंबर"]
      } as any);
    }
  };

  // Category Configuration
  const categoriesList: { key: AtoZCategoryKey; label: string; icon: string }[] = [
    { key: 'all', label: language === 'hi' ? '🌟 सभी ए टू जेड (All)' : '🌟 All A to Z', icon: '🌟' },
    { key: 'government', label: language === 'hi' ? '🏛️ सरकारी सेवाएँ' : '🏛️ Government', icon: '🏛️' },
    { key: 'banking', label: language === 'hi' ? '💳 बैंकिंग व AEPS' : '💳 Banking & AEPS', icon: '💳' },
    { key: 'bbps', label: language === 'hi' ? '⚡ बिल व रिचार्ज' : '⚡ BBPS & Recharge', icon: '⚡' },
    { key: 'business', label: language === 'hi' ? '🏢 कंपनी व GST' : '🏢 Business & Tax', icon: '🏢' },
    { key: 'astrology', label: language === 'hi' ? '🔮 वैदिक ज्योतिष' : '🔮 Vedic Astrology', icon: '🔮' },
    { key: 'loans-insurance', label: language === 'hi' ? '🛡️ ऋण व बीमा' : '🛡️ Loans & Insurance', icon: '🛡️' },
    { key: 'travel', label: language === 'hi' ? '✈️ यात्रा व ट्रेन' : '✈️ Travel & IRCTC', icon: '✈️' },
    { key: 'cyber-education', label: language === 'hi' ? '🎓 कैफे व परीक्षा' : '🎓 Cyber & Exams', icon: '🎓' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      
      {/* 1. 3D GLASS CATEGORY SELECTOR TABS (FROSTED AESTHETIC) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        overflowX: 'auto',
        padding: '0.4rem 0.2rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {categoriesList.map(cat => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.14) 100%)' 
                  : 'rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#FFFFFF' : '#CBD5E1',
                border: isSelected 
                  ? '2px solid #F3D477' 
                  : '1px solid rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '999px',
                padding: '0.5rem 1.15rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: isSelected 
                  ? '0 6px 20px rgba(243, 212, 119, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)' 
                  : 'none',
                transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. DYNAMIC SERVICE-RELATED TEMPLATE BANNER (HIGH-DEFINITION 3D GLASS SHOWCASE) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1.5px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 16px 40px rgba(0, 15, 45, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        padding: '1.5rem 1.75rem',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Glowing Ambience Circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 186, 242, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.45rem' }}>
              <span style={{
                background: '#F3D477',
                color: '#061A36',
                fontWeight: 900,
                fontSize: '0.72rem',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                letterSpacing: '0.04em'
              }}>
                {selectedCategory === 'all' && 'A TO Z UNIFIED DIGITAL ECOSYSTEM'}
                {selectedCategory === 'government' && 'OFFICIAL CITIZEN STATUTORY DESK'}
                {selectedCategory === 'banking' && 'NPCI & RBI REGULATED FINANCIAL NETWORK'}
                {selectedCategory === 'bbps' && 'NPCI BHARAT BILLPAY CERTIFIED'}
                {selectedCategory === 'business' && 'MCA & GSTN AUTHORIZED CORPORATE SUITE'}
                {selectedCategory === 'astrology' && 'VEDIC JYOTISH & KUNDLI RESEARCH KENDRA'}
                {selectedCategory === 'loans-insurance' && 'PRE-APPROVED MUDRA & CASHLESS MEDICLAIM'}
                {selectedCategory === 'travel' && 'IRCTC AUTHORIZED TRAVEL & AIRPORT DESK'}
                {selectedCategory === 'cyber-education' && 'ONLINE EXAM FORMS & DOCUMENT REPOSITORIES'}
              </span>

              <span style={{
                background: 'rgba(255, 255, 255, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#E2E8F0',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <ShieldCheck size={13} color="#10B981" />
                <span>100% DPDP Act Compliant • Zero OTP Bypass Guarantee</span>
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)', fontWeight: 900, margin: '0 0 0.35rem 0', color: '#FFFFFF' }}>
              {selectedCategory === 'all' && (language === 'hi' ? 'हर काम डिजिटल • हर समाधान एक जगह (A to Z Services)' : 'Complete A to Z Unified Digital Services & Workflows')}
              {selectedCategory === 'government' && (language === 'hi' ? 'सरकारी एवं नागरिक सेवाएँ • आधार, पैन, पासपोर्ट व प्रमाण-पत्र' : 'Government Citizen Services • Aadhaar, PAN, Passport & Welfare')}
              {selectedCategory === 'banking' && (language === 'hi' ? 'बैंकिंग सुपर-ऐप • DMT मनी ट्रांसफर, आधार ATM व साउंडबॉक्स' : 'FinTech Super-App • Instant DMT, Aadhaar ATM & Soundbox Audio')}
              {selectedCategory === 'bbps' && (language === 'hi' ? 'भारत बिल पे • बिजली बिल, मोबाइल रिचार्ज, गैस व फास्टैग' : 'BBPS Utility Hub • Electricity Bills, Recharges, LPG & FASTag')}
              {selectedCategory === 'business' && (language === 'hi' ? 'कंपनी रजिस्ट्रेशन, 15-अंकों का GSTIN व MSME उद्यम' : 'Corporate Suite • Pvt Ltd Company, 15-Digit GSTIN & MSME Udyam')}
              {selectedCategory === 'astrology' && (language === 'hi' ? 'वैदिक जन्म कुंडली, 36 गुण मिलान व नवग्रह शांति' : 'Vedic Astrology • 12-Bhava Janam Kundli, 36-Guna Match & Vastu')}
              {selectedCategory === 'loans-insurance' && (language === 'hi' ? 'मुद्रा बिजनेस लोन व कैशलेस हेल्थ मेडिक्लेम पॉलिसी' : 'Pre-Approved Mudra Loans & ₹5L Cashless Health Insurance')}
              {selectedCategory === 'travel' && (language === 'hi' ? 'आईआरसीटीसी तत्काल ट्रेन टिकट, फ्लाइट व वोल्वो बस' : 'Fast-Track IRCTC Tatkal Tickets, Flights & Volvo Luxury Buses')}
              {selectedCategory === 'cyber-education' && (language === 'hi' ? 'सरकारी नौकरी ऑनलाइन फॉर्म, एडमिट कार्ड व कलर प्रिंट' : 'Sarkari Job Forms, Admit Cards & High-Resolution Cyber Center')}
            </h2>

            <p style={{ fontSize: '0.86rem', color: '#CBD5E1', margin: 0, maxWidth: '780px', lineHeight: 1.55 }}>
              {selectedCategory === 'all' && 'Akul Dravin Digital Services connects 59+ enterprise citizen and commercial facilities. Pick any service below to open the instant assisted workflow with customer special discount and official statutory invoice.'}
              {selectedCategory === 'government' && 'Instant assisted filing for Aadhaar updates, Form 49A PAN, Passport Tatkaal appointments, Driving Licenses, Ration cards, and direct benefit transfer welfare schemes.'}
              {selectedCategory === 'banking' && 'Instant bank transfers via IMPS, cash withdrawal via biometric Aadhaar ATM (AEPS), live voice alerts on UPI soundbox, and Brinks vault insured 24K digital gold.'}
              {selectedCategory === 'bbps' && 'Pay electricity bills across 100+ state power boards, recharge mobile and DTH cards, book LPG cooking gas cylinders, and top-up NETC FASTag with zero convenience surcharge.'}
              {selectedCategory === 'business' && 'Launch your startup with MCA SPICe+ incorporation, obtain 15-digit GSTIN with first month return filing, secure Government MSME Udyam gold seal, and Class 3 DSC tokens.'}
              {selectedCategory === 'astrology' && 'Computerized 25-year predictive life horoscope, authentic 36-guna marriage compatibility, Kundli Dosha remedies, and certified laboratory energized Vedic gemstones.'}
              {selectedCategory === 'loans-insurance' && 'Paperless collateral-free business loans under PMMY Mudra scheme, comprehensive ₹5 Lakh family health insurance, and two-wheeler/car zero-depreciation coverage.'}
              {selectedCategory === 'travel' && 'Instant seat confirmation assistance on Indian Railways, lowest airfare comparison on domestic flights, and GPS-tracked luxury interstate bus bookings.'}
              {selectedCategory === 'cyber-education' && 'Error-free online application filling for SSC, UPSC, and State PSC examinations, live hall ticket downloads, and heavy-duty commercial color printing.'}
            </p>
          </div>

          {/* Quick Search & Customer Discount Highlight */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '220px' }}>
            {/* Customer Special Discount Pill */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.15) 100%)',
              border: '1px solid #34D399',
              borderRadius: '12px',
              padding: '0.55rem 0.85rem',
              color: '#A7F3D0',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
            }}>
              <span style={{ fontSize: '1rem' }}>🎁</span>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 900 }}>कस्टमर स्पेशल डिस्काउंट</div>
                <div style={{ fontSize: '0.7rem', color: '#6EE7B7' }}>अपने हिसाब से छूट पाएँ (₹25, ₹50, 10%)</div>
              </div>
            </div>

            {/* Quick Filter Search Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              borderRadius: '12px',
              padding: '0.5rem 0.85rem',
            }}>
              <Search size={15} color="#CBD5E1" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'सेवा खोजें (Search Service)...' : 'Search any service...'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. SIGNATURE 3D GLASS SERVICES GRID (MATCHING USER SCREENSHOT EXACTLY) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(136px, 1fr))',
        gap: '0.95rem',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '1.25rem',
        borderRadius: '24px',
        border: '1.5px solid rgba(255, 255, 255, 0.16)',
        boxShadow: '0 12px 36px rgba(0, 15, 45, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
      }}>
        {filteredServices.map(item => {
          return (
            <button
              key={item.id}
              onClick={() => handleServiceClick(item)}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)',
                color: '#FFFFFF',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '18px',
                padding: '1.1rem 0.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.55rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 8px 20px rgba(0, 10, 30, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.borderColor = '#F3D477';
                e.currentTarget.style.boxShadow = `0 14px 28px ${item.glow || 'rgba(243, 212, 119, 0.35)'}, inset 0 1px 2px rgba(255, 255, 255, 0.4)`;
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.1) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 10, 30, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)';
              }}
            >
              {/* Top Mini Badge */}
              {item.badge && (
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  background: 'rgba(243, 212, 119, 0.2)',
                  border: '1px solid rgba(243, 212, 119, 0.5)',
                  color: '#F3D477',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  padding: '1px 5px',
                  borderRadius: '999px',
                  letterSpacing: '0.04em'
                }}>
                  {item.badge}
                </div>
              )}

              {/* Glowing Circular 3D Glass Icon Container */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.color || '#F3D477',
                boxShadow: `0 4px 14px ${item.glow || 'rgba(0,0,0,0.2)'}, inset 0 1px 1px rgba(255, 255, 255, 0.5)`
              }}>
                {item.icon}
              </div>

              {/* Service Title */}
              <div style={{
                fontSize: '0.84rem',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.25,
                marginTop: '0.1rem'
              }}>
                {item.title}
              </div>

              {/* Service Subtitle */}
              <div style={{
                fontSize: '0.7rem',
                color: '#CBD5E1',
                lineHeight: 1.3,
                opacity: 0.9
              }}>
                {item.sub}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
