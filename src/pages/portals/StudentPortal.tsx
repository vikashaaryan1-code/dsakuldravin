import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { CertificateBranding } from '../../components/branding';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  Play, 
  FileText, 
  QrCode, 
  Download, 
  AlertCircle,
  ExternalLink,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  Printer,
  Copy,
  Terminal,
  Cpu,
  Laptop,
  HelpCircle,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ACADEMY_TUTORIAL_DATA, TutorialModule } from '../../data/academyTutorials';

export const StudentPortal: React.FC = () => {
  const { showToast, logAudit } = useApp();
  const navigate = useNavigate();

  const [student] = useState({
    name: 'Suman Saurabh',
    studentId: 'AD-STU-2026-904',
    aadhaarMasked: 'XXXXXXXX4912'
  });

  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({
    'CRS-AI-101-M1': true,
    'CRS-AI-101-M2': true,
    'CRS-AI-101-M3': true,
    'CRS-AI-101-M4': true,
    'CRS-COMP-102-M1': true,
    'CRS-COMP-102-M2': true,
    'CRS-COMP-102-M3': false,
    'CRS-COMP-102-M4': false,
    'CRS-CCTV-103-M1': true,
    'CRS-CCTV-103-M2': true,
    'CRS-CCTV-103-M3': true,
    'CRS-CCTV-103-M4': false,
    'CRS-MKT-104-M1': true,
    'CRS-MKT-104-M2': false,
    'CRS-MKT-104-M3': false,
    'CRS-MKT-104-M4': false,
  });

  const [courses, setCourses] = useState([
    {
      id: 'CRS-AI-101' as const,
      title: 'ADCS AI Mastery & Prompt Engineering',
      titleHi: 'एआई मास्टरी एवं प्रॉम्प्ट इंजीनियरिंग',
      certId: 'ADCS-ACAD-2026-991204',
      syllabus: [
        'Module 1: LLM Architecture & Token Limits',
        'Module 2: Advanced Few-Shot Prompt Engineering',
        'Module 3: Multi-Agent Systems & Tool Calling',
        'Module 4: Autonomous Coding & API Orchestration'
      ]
    },
    {
      id: 'CRS-COMP-102' as const,
      title: 'ADCS Computer Pro & Windows Operating Fundamentals',
      titleHi: 'कंप्यूटर प्रो एवं विंडोज ऑपरेटिंग फंडामेंटल्स',
      certId: null,
      syllabus: [
        'Module 1: Computer Hardware & Peripherals',
        'Module 2: Windows 11 Navigation & File Management',
        'Module 3: Internet & Safe Digital Banking',
        'Module 4: MS Office Suite Fundamentals'
      ]
    },
    {
      id: 'CRS-CCTV-103' as const,
      title: 'ADCS CCTV & IP Surveillance Installation Technician',
      titleHi: 'सीसीटीवी एवं आईपी सर्विलांस इंस्टालेशन टेक्नीशियन',
      certId: null,
      syllabus: [
        'Module 1: Optical Sensors, Focal Lengths & Camera Form Factors',
        'Module 2: Coaxial RG-59 vs Cat6 UTP & Connector Termination',
        'Module 3: NVR/DVR Setup, Storage Calculation & H.265+ Compression',
        'Module 4: Static IP, Cloud P2P App & AI Intrusion Detection'
      ]
    },
    {
      id: 'CRS-MKT-104' as const,
      title: 'ADCS Digital Marketing & WhatsApp Automation Specialist',
      titleHi: 'डिजिटल मार्केटिंग एवं व्हाट्सएप ऑटोमेशन स्पेशलिस्ट',
      certId: null,
      syllabus: [
        'Module 1: Digital Marketing Funnels & Customer Acquisition Economics',
        'Module 2: Google Business Profile & Hyperlocal SEO Optimization',
        'Module 3: Meta Ads Manager & Custom Audience Targeting',
        'Module 4: Official WhatsApp Business API & Webhook Automation'
      ]
    }
  ]);

  // Active tutorial reader state
  const [activeTutorial, setActiveTutorial] = useState<TutorialModule | null>(null);
  const [tutorialLang, setTutorialLang] = useState<'en' | 'hi'>('en');
  const [tutorialTab, setTutorialTab] = useState<'content' | 'lab' | 'quiz'>('content');
  const [quizSelections, setQuizSelections] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [copiedSnippet, setCopiedSnippet] = useState<number | null>(null);

  // Active proctored exam state
  const [activeExamCourseId, setActiveExamCourseId] = useState<string | null>(null);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: string }>({});
  const [generatedCert, setGeneratedCert] = useState<{
    certId: string;
    studentName: string;
    courseTitle: string;
    date: string;
    grade: string;
    qrUrl: string;
  } | null>(null);

  // Helper to calculate course progress
  const getCourseProgress = (courseId: string) => {
    const moduleKeys = [1, 2, 3, 4].map(num => `${courseId}-M${num}`);
    const completedCount = moduleKeys.filter(k => completedModules[k]).length;
    return Math.round((completedCount / moduleKeys.length) * 100);
  };

  const courseExamQuestions: Record<string, { id: number; question: string; options: { key: string; text: string }[]; correct: string }[]> = {
    'CRS-AI-101': [
      {
        id: 1,
        question: 'In modern generative AI models, what role does the temperature parameter serve?',
        options: [
          { key: 'A', text: 'Controls randomness/entropy in token probability sampling' },
          { key: 'B', text: 'Sets the maximum physical CPU temperature threshold' },
          { key: 'C', text: 'Limits the total number of input tokens per second' }
        ],
        correct: 'A'
      },
      {
        id: 2,
        question: 'Which prompting pattern provides input-output demonstration exemplars before the query?',
        options: [
          { key: 'A', text: 'Zero-shot inference' },
          { key: 'B', text: 'Few-shot exemplar demonstration' },
          { key: 'C', text: 'Token quantization' }
        ],
        correct: 'B'
      },
      {
        id: 3,
        question: 'What is the primary function of an AI agent tool calling interface?',
        options: [
          { key: 'A', text: 'Allowing the model to interact with external APIs, databases, and environments' },
          { key: 'B', text: 'Preventing the model from running any code' },
          { key: 'C', text: 'Displaying decorative UI icons only' }
        ],
        correct: 'A'
      }
    ],
    'CRS-COMP-102': [
      {
        id: 1,
        question: 'Which keyboard shortcut opens the Windows 11 Task Manager directly without an intermediate security screen?',
        options: [
          { key: 'A', text: 'Ctrl + Shift + Esc' },
          { key: 'B', text: 'Alt + F4' },
          { key: 'C', text: 'Ctrl + Alt + Del' }
        ],
        correct: 'A'
      },
      {
        id: 2,
        question: 'What is the primary technical distinction between RAM and Solid State Drive (SSD) storage?',
        options: [
          { key: 'A', text: 'RAM is volatile high-speed working memory; SSD is persistent non-volatile storage' },
          { key: 'B', text: 'RAM is only used during computer startup and deleted afterward' },
          { key: 'C', text: 'SSD can only hold text files, while RAM holds images' }
        ],
        correct: 'A'
      },
      {
        id: 3,
        question: 'In Microsoft Excel, what does the formula =VLOOKUP(A2, D:F, 3, FALSE) execute?',
        options: [
          { key: 'A', text: 'Searches for A2 in column D and returns the exact matching value from column F' },
          { key: 'B', text: 'Multiplies cell A2 by 3 and rounds up' },
          { key: 'C', text: 'Deletes duplicate rows in columns D through F' }
        ],
        correct: 'A'
      },
      {
        id: 4,
        question: 'Which browser indicator confirms an authenticated, 256-bit TLS encrypted session for safe digital banking?',
        options: [
          { key: 'A', text: 'https:// prefix with a valid closed padlock icon matching the bank domain' },
          { key: 'B', text: 'Any page that loads in dark mode' },
          { key: 'C', text: 'A popup requesting your ATM PIN via WhatsApp' }
        ],
        correct: 'A'
      }
    ],
    'CRS-CCTV-103': [
      {
        id: 1,
        question: 'Which standard Cat6 color code sequence connects to Pin 1 and Pin 2 under TIA/EIA-568-B?',
        options: [
          { key: 'A', text: 'Pin 1: White-Orange, Pin 2: Orange' },
          { key: 'B', text: 'Pin 1: White-Green, Pin 2: Green' },
          { key: 'C', text: 'Pin 1: Blue, Pin 2: White-Blue' }
        ],
        correct: 'A'
      },
      {
        id: 2,
        question: 'How does H.265+ video encoding reduce required hard drive storage by up to 80% compared to legacy H.264?',
        options: [
          { key: 'A', text: 'By dynamically modeling static background pixels and only recording active moving blocks' },
          { key: 'B', text: 'By deleting every second frame permanently' },
          { key: 'C', text: 'By converting high-resolution video into black and white' }
        ],
        correct: 'A'
      },
      {
        id: 3,
        question: 'Under international standard EN 62676-4 DORI criteria, what pixel density is mandatory for positive legal face identification?',
        options: [
          { key: 'A', text: '250 Pixels per Meter (PPM)' },
          { key: 'B', text: '25 Pixels per Meter (PPM)' },
          { key: 'C', text: '5 Pixels per Meter (PPM)' }
        ],
        correct: 'A'
      },
      {
        id: 4,
        question: 'What is the primary operational advantage of Cloud P2P remote access over legacy router port forwarding?',
        options: [
          { key: 'A', text: 'Zero router ports opened and seamless traversal through Carrier-Grade NAT (CGNAT)' },
          { key: 'B', text: 'Requires physical cable between phone and camera' },
          { key: 'C', text: 'Works only when broadband internet is turned off' }
        ],
        correct: 'A'
      }
    ],
    'CRS-MKT-104': [
      {
        id: 1,
        question: 'If an advertising campaign spends ₹3,000 on Meta Ads and generates 30 paying Kendra customers, what is the CAC?',
        options: [
          { key: 'A', text: '₹100 per customer (₹3,000 / 30)' },
          { key: 'B', text: '₹10 per customer' },
          { key: 'C', text: '₹300 per customer' }
        ],
        correct: 'A'
      },
      {
        id: 2,
        question: 'What does the NAP consistency rule require for dominant ranking in the Google Local 3-Pack?',
        options: [
          { key: 'A', text: 'Business Name, Address, and Phone must be 100% identical across all online directories' },
          { key: 'B', text: 'Changing your phone number every Monday' },
          { key: 'C', text: 'Listing different addresses on Facebook and Google' }
        ],
        correct: 'A'
      },
      {
        id: 3,
        question: 'Which Meta Campaign Objective must be selected for high-intent customer inquiries to WhatsApp Business?',
        options: [
          { key: 'A', text: 'Leads / Messages' },
          { key: 'B', text: 'Traffic' },
          { key: 'C', text: 'Brand Awareness' }
        ],
        correct: 'A'
      },
      {
        id: 4,
        question: 'What is the fundamental difference between the official WhatsApp Cloud API and unauthorized web scrapers?',
        options: [
          { key: 'A', text: 'Official Cloud API is hosted on Meta infrastructure with zero risk of phone number blocking' },
          { key: 'B', text: 'Cloud API can only send text without emojis' },
          { key: 'C', text: 'Web scrapers are officially endorsed by the Indian government' }
        ],
        correct: 'A'
      }
    ]
  };

  const handleStartExam = (courseId: string) => {
    setActiveExamCourseId(courseId);
    setExamSubmitted(false);
    setSelectedAnswers({});
    showToast('Examination Started', `You have 20 minutes to complete the proctored evaluation for ${courseId}.`, 'info');
  };

  const handleSubmitExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExamCourseId) return;

    const questions = courseExamQuestions[activeExamCourseId] || courseExamQuestions['CRS-AI-101'];
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });

    const percent = Math.round((score / questions.length) * 100);
    setExamSubmitted(true);

    const courseObj = courses.find(c => c.id === activeExamCourseId);
    const courseTitle = courseObj ? courseObj.title : 'ADCS Professional Track';

    if (percent >= 66) {
      const certId = 'ADCS-ACAD-2026-' + Math.floor(100000 + Math.random() * 900000);
      const certData = {
        certId,
        studentName: student.name,
        courseTitle: courseTitle,
        date: new Date().toISOString().split('T')[0],
        grade: percent >= 90 ? 'Grade A (Distinction)' : 'Grade A (Qualified)',
        qrUrl: `https://akuldravindigital.com/verify-certificate/${certId}`
      };
      setGeneratedCert(certData);
      setCourses(prev => prev.map(c => c.id === activeExamCourseId ? { ...c, certId } : c));
      showToast('Examination Passed!', `Score: ${percent}%. Your official private training certificate (${certId}) is issued.`, 'success');
      logAudit(`Student passed exam for ${activeExamCourseId} with ${percent}%`, `ADCS Academy • Issued ${certId}`, 'Success');
    } else {
      showToast('Passing Criteria Not Met', `Score: ${percent}%. Minimum 66% required. Please review the tutorial modules and retake.`, 'error');
      logAudit(`Exam attempt failed for ${activeExamCourseId} (${percent}%)`, 'ADCS Academy', 'Warning');
    }
  };

  const handleDownloadCertificate = () => {
    if (!generatedCert) return;
    printBrandedADCSDocument({
      title: `Academy Certificate — ${generatedCert.courseTitle}`,
      documentType: 'ACADEMY COMPLETION CERTIFICATE',
      documentNumber: generatedCert.certId,
      issuedDate: generatedCert.date,
      orientation: 'landscape',
      verificationUrl: generatedCert.qrUrl,
      rows: [
        { label: 'Scholar Name', value: generatedCert.studentName },
        { label: 'Student UID', value: student.studentId },
        { label: 'Course Track', value: generatedCert.courseTitle },
        { label: 'Performance Grade', value: generatedCert.grade },
        { label: 'Authorized Signatory', value: 'Dr. Alok Nath Verma (Dean of Academy)' },
      ],
      notes: ['Private vocational & professional competency credential issued by AKUL DRAVIN DIGITAL SERVICES.'],
    });
    showToast('Credential Print View Ready', `Opened A4 printable credential for ${generatedCert.certId}.`, 'success');
  };

  // Open Tutorial Viewer
  const handleOpenTutorial = (tutorialKey: string) => {
    const data = ACADEMY_TUTORIAL_DATA[tutorialKey];
    if (data) {
      setActiveTutorial(data);
      setTutorialTab('content');
      showToast('Study Material Loaded', `${data.title} is now open in the interactive reader.`, 'info');
    } else {
      showToast('Module Not Found', 'Detailed tutorial content is being compiled for this module.', 'warning');
    }
  };

  // Mark module as completed
  const handleMarkModuleComplete = (modId: string) => {
    setCompletedModules(prev => ({
      ...prev,
      [modId]: true
    }));
    showToast('Module Completed!', `Progress updated for ${modId}. Excellent work!`, 'success');
    logAudit(`Completed tutorial module ${modId}`, 'ADCS Academy');
  };

  // Copy code snippet to clipboard
  const handleCopyCode = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(idx);
    showToast('Copied to Clipboard', 'Code snippet copied successfully.', 'info');
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  // Navigate to adjacent module
  const handleNavigateModule = (direction: 'prev' | 'next') => {
    if (!activeTutorial) return;
    const currentCourse = activeTutorial.courseId;
    const currentNum = activeTutorial.moduleNumber;
    const nextNum = direction === 'next' ? currentNum + 1 : currentNum - 1;
    const targetKey = `${currentCourse}-M${nextNum}`;
    if (ACADEMY_TUTORIAL_DATA[targetKey]) {
      setActiveTutorial(ACADEMY_TUTORIAL_DATA[targetKey]);
      setTutorialTab('content');
    }
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #061A36 60%, #2563EB 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ background: '#F59E0B', color: '#000000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
              ADCS ACADEMY LMS
            </span>
            <span style={{ background: '#10B981', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
              REGISTERED SCHOLAR
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.3rem', color: '#FFFFFF' }}>
            {student.name}
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>
            Student UID: <strong>{student.studentId}</strong> • Aadhaar: {student.aadhaarMasked}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Enrolled Courses</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8' }}>4 Tracks</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Certificates Earned</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>{generatedCert ? '1 Active' : '0 Earned'}</div>
          </div>
        </div>
      </div>

      {/* Statutory Disclosure Alert */}
      <div style={{
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: '12px',
        padding: '0.85rem 1.25rem',
        marginBottom: '2rem',
        fontSize: '0.82rem',
        color: '#061A36',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        <AlertCircle size={18} color="#2563EB" style={{ flexShrink: 0 }} />
        <div>
          <strong>Official Certification Notice:</strong> Certificates issued by ADCS Academy represent private vocational and professional competency credentials awarded under the Akul Dravin Digital Services curriculum. They are independently verifiable via public QR code and cryptographic ledger.
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE TUTORIAL VIEWER & LABORATORY MODAL
         ========================================================================= */}
      {activeTutorial && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            border: '1px solid #CBD5E1',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              padding: '1.25rem 1.75rem',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  background: '#2563EB',
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {activeTutorial.courseId === 'CRS-AI-101' ? <Cpu size={22} color="#FFFFFF" /> : <Laptop size={22} color="#FFFFFF" />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#3B82F6', color: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {activeTutorial.id}
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, background: 'rgba(255,255,255,0.15)', color: '#E2E8F0', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      ⏱️ {activeTutorial.estimatedMinutes} Mins Read
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, background: activeTutorial.level === 'Beginner' ? '#10B981' : activeTutorial.level === 'Intermediate' ? '#F59E0B' : '#EF4444', color: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {activeTutorial.level} Level
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.25rem 0 0', color: '#F8FAFC' }}>
                    {tutorialLang === 'hi' ? activeTutorial.titleHi : activeTutorial.title}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {/* Language Switcher */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', padding: '2px', borderRadius: '8px' }}>
                  <button
                    onClick={() => setTutorialLang('en')}
                    style={{
                      border: 'none',
                      background: tutorialLang === 'en' ? '#2563EB' : 'transparent',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setTutorialLang('hi')}
                    style={{
                      border: 'none',
                      background: tutorialLang === 'hi' ? '#2563EB' : 'transparent',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    हिन्दी
                  </button>
                </div>

                <button
                  onClick={() => setActiveTutorial(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#94A3B8',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Close Tutorial Reader"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div style={{
              display: 'flex',
              background: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              padding: '0 1.5rem'
            }}>
              <button
                onClick={() => setTutorialTab('content')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  background: 'transparent',
                  borderBottom: tutorialTab === 'content' ? '3px solid #2563EB' : '3px solid transparent',
                  color: tutorialTab === 'content' ? '#2563EB' : '#64748B',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={16} /> 1. Comprehensive Theory (थ्योरी)
              </button>
              <button
                onClick={() => setTutorialTab('lab')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  background: 'transparent',
                  borderBottom: tutorialTab === 'lab' ? '3px solid #2563EB' : '3px solid transparent',
                  color: tutorialTab === 'lab' ? '#2563EB' : '#64748B',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <Terminal size={16} /> 2. Hands-on Laboratory (प्रैक्टिकल लैब)
              </button>
              <button
                onClick={() => setTutorialTab('quiz')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  background: 'transparent',
                  borderBottom: tutorialTab === 'quiz' ? '3px solid #2563EB' : '3px solid transparent',
                  color: tutorialTab === 'quiz' ? '#2563EB' : '#64748B',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <HelpCircle size={16} /> 3. Knowledge Check Quiz (प्रश्नोत्तरी)
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.75rem',
              backgroundColor: '#FFFFFF',
              color: '#1E293B'
            }}>
              {/* TAB 1: CONTENT & THEORY */}
              {tutorialTab === 'content' && (
                <div>
                  {/* Overview Card */}
                  <div style={{
                    background: '#F0F9FF',
                    border: '1px solid #BAE6FD',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    marginBottom: '1.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 800, color: '#0369A1', marginBottom: '0.35rem' }}>
                      <Sparkles size={14} /> MODULE OBJECTIVE & OVERVIEW
                    </div>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: '#0C4A6E', lineHeight: 1.6 }}>
                      {tutorialLang === 'hi' ? activeTutorial.overviewHi : activeTutorial.overview}
                    </p>
                  </div>

                  {/* Sections */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {activeTutorial.sections.map((sec, idx) => (
                      <div key={idx} style={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '14px',
                        padding: '1.5rem',
                        background: '#FFFFFF',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                          <span style={{
                            background: '#EFF6FF',
                            color: '#2563EB',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px'
                          }}>
                            Part {idx + 1}
                          </span>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>
                            {tutorialLang === 'hi' ? sec.headingHi : sec.heading}
                          </h3>
                        </div>

                        {/* Section Content Paragraphs */}
                        <div style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                          {sec.content.split('\n\n').map((para, pIdx) => (
                            <p key={pIdx} style={{ margin: '0 0 0.85rem' }}>
                              {para}
                            </p>
                          ))}
                        </div>

                        {/* Code / Command Snippet */}
                        {sec.codeSnippet && (
                          <div style={{ marginBottom: '1.25rem' }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              background: '#0F172A',
                              padding: '0.5rem 1rem',
                              borderTopLeftRadius: '8px',
                              borderTopRightRadius: '8px',
                              fontSize: '0.75rem',
                              color: '#94A3B8',
                              fontWeight: 700
                            }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Terminal size={14} color="#38BDF8" /> Command Reference / Code Snippet
                              </span>
                              <button
                                onClick={() => handleCopyCode(sec.codeSnippet!, idx)}
                                style={{
                                  background: 'rgba(255,255,255,0.1)',
                                  border: 'none',
                                  color: copiedSnippet === idx ? '#4ADE80' : '#E2E8F0',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.72rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.3rem'
                                }}
                              >
                                {copiedSnippet === idx ? <Check size={12} /> : <Copy size={12} />}
                                {copiedSnippet === idx ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            <pre style={{
                              margin: 0,
                              background: '#1E293B',
                              color: '#F8FAFC',
                              padding: '1rem',
                              borderBottomLeftRadius: '8px',
                              borderBottomRightRadius: '8px',
                              fontSize: '0.82rem',
                              overflowX: 'auto',
                              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                              lineHeight: 1.5
                            }}>
                              {sec.codeSnippet}
                            </pre>
                          </div>
                        )}

                        {/* Key Takeaway */}
                        <div style={{
                          background: '#FEF9C3',
                          border: '1px solid #FDE047',
                          borderRadius: '8px',
                          padding: '0.85rem 1rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem'
                        }}>
                          <Lightbulb size={18} color="#CA8A04" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div style={{ fontSize: '0.82rem', color: '#854D0E', lineHeight: 1.5 }}>
                            <strong>{tutorialLang === 'hi' ? 'मुख्य निष्कर्ष (Key Takeaway):' : 'Key Takeaway:'}</strong> {sec.keyTakeaway}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: HANDS-ON LABORATORY */}
              {tutorialTab === 'lab' && (
                <div>
                  <div style={{
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
                    border: '1px solid #BFDBFE',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Terminal size={20} color="#2563EB" />
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                        {activeTutorial.practicalExercise.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 1.25rem' }}>
                      Follow these step-by-step practical laboratory instructions to build hands-on proficiency with the concepts covered in this module.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {activeTutorial.practicalExercise.instructions.map((step, sIdx) => (
                        <div key={sIdx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          background: '#FFFFFF',
                          padding: '0.85rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0'
                        }}>
                          <span style={{
                            background: '#2563EB',
                            color: '#FFFFFF',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            flexShrink: 0
                          }}>
                            {sIdx + 1}
                          </span>
                          <span style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: 1.5, marginTop: '2px' }}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Expected Outcome */}
                    <div style={{
                      background: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      borderRadius: '10px',
                      padding: '1rem 1.25rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#065F46', fontWeight: 800, fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                        <CheckCircle2 size={16} color="#059669" /> Expected Practical Outcome (सत्यापन)
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#047857', lineHeight: 1.5 }}>
                        {activeTutorial.practicalExercise.expectedOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: KNOWLEDGE CHECK QUIZ */}
              {tutorialTab === 'quiz' && (
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem' }}>
                      Module Knowledge Verification Quiz
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                      Answer all questions to validate your conceptual understanding before marking this module as complete.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {activeTutorial.quizQuestions.map((q, qIdx) => {
                      const selectedIdx = quizSelections[`${activeTutorial.id}-${qIdx}`];
                      const isChecked = quizSubmitted[activeTutorial.id];
                      return (
                        <div key={qIdx} style={{
                          background: '#F8FAFC',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          padding: '1.25rem'
                        }}>
                          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0F172A', marginBottom: '0.75rem' }}>
                            Question {qIdx + 1}: {q.question}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedIdx === oIdx;
                              let optBg = '#FFFFFF';
                              let optBorder = '#CBD5E1';

                              if (isChecked) {
                                if (oIdx === q.correctIndex) {
                                  optBg = '#DCFCE7';
                                  optBorder = '#16A34A';
                                } else if (isSelected && oIdx !== q.correctIndex) {
                                  optBg = '#FEE2E2';
                                  optBorder = '#EF4444';
                                }
                              } else if (isSelected) {
                                optBg = '#EFF6FF';
                                optBorder = '#3B82F6';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => {
                                    if (!isChecked) {
                                      setQuizSelections(prev => ({
                                        ...prev,
                                        [`${activeTutorial.id}-${qIdx}`]: oIdx
                                      }));
                                    }
                                  }}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.65rem 0.85rem',
                                    borderRadius: '8px',
                                    background: optBg,
                                    border: `1px solid ${optBorder}`,
                                    textAlign: 'left',
                                    cursor: isChecked ? 'default' : 'pointer',
                                    fontSize: '0.85rem',
                                    color: '#1E293B'
                                  }}
                                >
                                  <span style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    background: isSelected ? '#2563EB' : '#F1F5F9',
                                    color: isSelected ? '#FFFFFF' : '#475569',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    flexShrink: 0
                                  }}>
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation banner after check */}
                          {isChecked && (
                            <div style={{
                              background: '#F1F5F9',
                              borderLeft: '4px solid #2563EB',
                              padding: '0.75rem 1rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              color: '#334155'
                            }}>
                              <strong>Explanation:</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => {
                        setQuizSubmitted(prev => ({
                          ...prev,
                          [activeTutorial.id]: true
                        }));
                        showToast('Quiz Evaluated', 'Review your results and explanations above.', 'info');
                      }}
                      style={{
                        padding: '0.65rem 1.25rem',
                        background: '#2563EB',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      Check My Answers
                    </button>
                    {quizSubmitted[activeTutorial.id] && (
                      <button
                        onClick={() => {
                          setQuizSubmitted(prev => ({ ...prev, [activeTutorial.id]: false }));
                          setQuizSelections(prev => {
                            const copy = { ...prev };
                            activeTutorial.quizQuestions.forEach((_, idx) => {
                              delete copy[`${activeTutorial.id}-${idx}`];
                            });
                            return copy;
                          });
                        }}
                        style={{
                          padding: '0.65rem 1.25rem',
                          background: '#F1F5F9',
                          color: '#475569',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        Reset Quiz
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div style={{
              background: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              padding: '1rem 1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  disabled={activeTutorial.moduleNumber <= 1}
                  onClick={() => handleNavigateModule('prev')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: activeTutorial.moduleNumber <= 1 ? '#F1F5F9' : '#FFFFFF',
                    color: activeTutorial.moduleNumber <= 1 ? '#94A3B8' : '#334155',
                    cursor: activeTutorial.moduleNumber <= 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  <ChevronLeft size={16} /> Prev Module
                </button>
                <button
                  disabled={activeTutorial.moduleNumber >= 4}
                  onClick={() => handleNavigateModule('next')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: activeTutorial.moduleNumber >= 4 ? '#F1F5F9' : '#FFFFFF',
                    color: activeTutorial.moduleNumber >= 4 ? '#94A3B8' : '#334155',
                    cursor: activeTutorial.moduleNumber >= 4 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  Next Module <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#475569',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={15} /> Print / Save PDF
                </button>

                <button
                  onClick={() => {
                    handleMarkModuleComplete(activeTutorial.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '6px',
                    background: completedModules[activeTutorial.id] ? '#10B981' : '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={16} />
                  {completedModules[activeTutorial.id] ? 'Completed ✓ (Update Progress)' : 'Mark Module as Completed'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Proctored Examination Console */}
      {activeExamCourseId && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '2px solid #2563EB',
          padding: '2rem',
          marginBottom: '2.5rem',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Proctored Final Examination • {activeExamCourseId}
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Passing Score: 66% • Time Window: 20 Minutes • Single Attempt Policy
              </div>
            </div>
            <button
              onClick={() => setActiveExamCourseId(null)}
              style={{ background: '#F1F5F9', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
            >
              Exit Console
            </button>
          </div>

          <form onSubmit={handleSubmitExam}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {(courseExamQuestions[activeExamCourseId] || courseExamQuestions['CRS-AI-101']).map(q => (
                <div key={q.id} style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', marginBottom: '0.75rem' }}>
                    Q{q.id}. {q.question}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {q.options.map(opt => (
                      <label
                        key={opt.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          background: selectedAnswers[q.id] === opt.key ? '#EFF6FF' : '#FFFFFF',
                          border: selectedAnswers[q.id] === opt.key ? '1px solid #3B82F6' : '1px solid #CBD5E1',
                          padding: '0.6rem 0.85rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        <input
                          type="radio"
                          name={`q_${q.id}`}
                          value={opt.key}
                          checked={selectedAnswers[q.id] === opt.key}
                          onChange={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                          required
                        />
                        <span><strong>({opt.key})</strong> {opt.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                background: '#16A34A',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              <CheckCircle2 size={18} /> Submit Examination & Calculate Score
            </button>
          </form>
        </div>
      )}

      {/* Generated Verifiable Certificate Display (When Passed) */}
      {generatedCert && (
        <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CertificateBranding
            certificateId={generatedCert.certId}
            certificateTitle="Certificate of Skill & Professional Competence"
            recipientName={generatedCert.studentName}
            subtitleOrCourse={generatedCert.courseTitle}
            credentialDetail={`Scholar UID: ${student.studentId} — Satisfactorily completed all curriculum requirements, practical modules, and proctored examination.`}
            gradeOrScore={generatedCert.grade}
            issueDate={generatedCert.date}
            issuerName="Dr. Alok Nath Verma"
            issuerDesignation="Dean, ADCS Academy of Excellence"
            verificationUrl={generatedCert.qrUrl}
          />
          <div className="adcs-no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={handleDownloadCertificate} className="btn-primary">
              <Download size={14} /> Export Printable Credential
            </button>
            <button type="button" onClick={() => window.print()} className="btn-navy">
              <Printer size={14} /> Print / PDF Slip
            </button>
            <button type="button" onClick={() => navigate(`/verify-certificate/${generatedCert.certId}`)} className="btn-secondary">
              <ExternalLink size={14} /> Public Verification Portal
            </button>
          </div>
        </div>
      )}

      {/* Enrolled Courses & Modules Section */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              My Enrolled Courses & Learning Tracks
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748B' }}>
              Click on any module to open the comprehensive A-to-Z theory, practical laboratory, and quiz reader.
            </p>
          </div>
          <span style={{ fontSize: '0.78rem', background: '#F1F5F9', color: '#475569', padding: '0.35rem 0.75rem', borderRadius: '6px', fontWeight: 700 }}>
            📖 Complete A-to-Z Study Materials Ready
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {courses.map(crs => {
            const currentProgress = getCourseProgress(crs.id);
            const is100Percent = currentProgress === 100;

            return (
              <div key={crs.id} style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ background: '#2563EB', color: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                        {crs.id}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                        {crs.title}
                      </h4>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {crs.titleHi} • Progress: <strong>{currentProgress}%</strong> ({Math.round(currentProgress / 25)} of 4 Modules Completed)
                    </div>
                  </div>

                  <div>
                    {is100Percent ? (
                      <button
                        onClick={() => handleStartExam(crs.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.5rem 1.15rem',
                          borderRadius: '8px',
                          background: '#16A34A',
                          color: '#FFFFFF',
                          border: 'none',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                        }}
                      >
                        <Award size={16} /> Take Final Online Exam (Ready)
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#D97706', background: '#FEF3C7', padding: '0.4rem 0.75rem', borderRadius: '6px', fontWeight: 700 }}>
                        Course In Progress ({currentProgress}%)
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                  <div style={{ width: `${currentProgress}%`, height: '100%', background: is100Percent ? '#10B981' : '#3B82F6', transition: 'width 0.4s ease' }} />
                </div>

                {/* Modules grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                  {crs.syllabus.map((mTitle, idx) => {
                    const modKey = `${crs.id}-M${idx + 1}`;
                    const isDone = completedModules[modKey];
                    const tutorialInfo = ACADEMY_TUTORIAL_DATA[modKey];

                    return (
                      <div
                        key={idx}
                        onClick={() => handleOpenTutorial(modKey)}
                        style={{
                          fontSize: '0.85rem',
                          color: '#1E293B',
                          background: '#FFFFFF',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: isDone ? '1px solid #86EFAC' : '1px solid #CBD5E1',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.6rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#2563EB';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isDone ? '#86EFAC' : '#CBD5E1';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div style={{ marginTop: '2px', flexShrink: 0 }}>
                              {isDone ? (
                                <CheckCircle2 size={16} color="#16A34A" />
                              ) : (
                                <BookOpen size={16} color="#2563EB" />
                              )}
                            </div>
                            <div>
                              <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.85rem' }}>
                                {mTitle}
                              </div>
                              {tutorialInfo && (
                                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                                  {tutorialInfo.titleHi}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '0.5rem' }}>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                            ⏱️ {tutorialInfo ? tutorialInfo.estimatedMinutes : 30} mins • 3 parts
                          </span>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: isDone ? '#16A34A' : '#2563EB',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}>
                            {isDone ? 'Completed' : '📖 Study A-Z'} <ChevronRight size={13} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
