import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
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
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentPortal: React.FC = () => {
  const { showToast, logAudit } = useApp();
  const navigate = useNavigate();

  const [student] = useState({
    name: 'Suman Saurabh',
    studentId: 'AD-STU-2026-904',
    aadhaarMasked: 'XXXXXXXX4912'
  });

  const [enrolledCourses] = useState([
    {
      id: 'CRS-AI-101',
      title: 'ADCS AI Mastery & Prompt Engineering',
      progress: 100,
      status: 'EXAM_READY',
      score: null,
      certId: 'ADCS-ACAD-2026-991204',
      syllabus: [
        'Module 1: LLM Architecture & Token Limits',
        'Module 2: Advanced Few-Shot Prompt Engineering',
        'Module 3: Multi-Agent Systems & Tool Calling',
        'Module 4: Autonomous Coding & API Orchestration'
      ]
    },
    {
      id: 'CRS-COMP-102',
      title: 'ADCS Computer Pro & Windows Operating Fundamentals',
      progress: 60,
      status: 'IN_PROGRESS',
      score: null,
      certId: null,
      syllabus: [
        'Module 1: Computer Hardware & Peripherals',
        'Module 2: Windows 11 Navigation & File Management',
        'Module 3: Internet & Safe Digital Banking',
        'Module 4: MS Office Suite Fundamentals'
      ]
    }
  ]);

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

  const examQuestions = [
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
  ];

  const handleStartExam = (courseId: string) => {
    setActiveExamCourseId(courseId);
    setExamSubmitted(false);
    setSelectedAnswers({});
    showToast('Examination Started', 'You have 20 minutes to complete the proctored evaluation.', 'info');
  };

  const handleSubmitExam = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    examQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });

    const percent = Math.round((score / examQuestions.length) * 100);
    setExamSubmitted(true);

    if (percent >= 66) {
      const certData = {
        certId: 'ADCS-ACAD-2026-' + Math.floor(100000 + Math.random() * 900000),
        studentName: student.name,
        courseTitle: 'ADCS AI Mastery & Prompt Engineering',
        date: new Date().toISOString().split('T')[0],
        grade: percent >= 90 ? 'Grade A (Distinction)' : 'Grade A (Qualified)',
        qrUrl: `https://akuldravin.com/verify-certificate/ADCS-ACAD-2026-991204`
      };
      setGeneratedCert(certData);
      showToast('Examination Passed!', `Score: ${percent}%. Your official private training certificate is issued.`, 'success');
      logAudit(`Student passed exam for ${activeExamCourseId} with ${percent}%`, 'ADCS Academy');
    } else {
      showToast('Passing Criteria Not Met', `Score: ${percent}%. Minimum 66% required. Please review modules and retake.`, 'error');
    }
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 60%, #2563EB 100%)',
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
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8' }}>2 Tracks</div>
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
        color: '#1E3A8A',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        <AlertCircle size={18} color="#2563EB" style={{ flexShrink: 0 }} />
        <div>
          <strong>Official Certification Notice:</strong> Certificates issued by ADCS Academy represent private vocational and professional competency credentials awarded under the Akul Dravin Digital Services curriculum. They are independently verifiable via public QR code and cryptographic ledger.
        </div>
      </div>

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
              {examQuestions.map(q => (
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
        <div style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          borderRadius: '20px',
          border: '2px solid #D97706',
          padding: '2.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 10px 25px -5px rgba(217, 119, 6, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '2px solid #B45309', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#B45309', letterSpacing: '1px' }}>
                AKUL DRAVIN DIGITAL SERVICES • ACADEMY OF EXCELLENCE
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#78350F', margin: '0.3rem 0' }}>
                CERTIFICATE OF SKILL & PROFESSIONAL COMPETENCE
              </h2>
              <div style={{ fontSize: '0.85rem', color: '#92400E' }}>
                Certificate Serial: <strong>{generatedCert.certId}</strong> • Issue Date: {generatedCert.date}
              </div>
            </div>

            {/* QR Code Simulation */}
            <div style={{ background: '#FFFFFF', border: '1px solid #D97706', borderRadius: '12px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', margin: '0 auto 0.4rem' }}>
                <QrCode size={56} color="#FBBF24" />
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#78350F' }}>
                SCAN TO VERIFY
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1rem', color: '#451A03', lineHeight: 1.6 }}>
            This is to certify that <strong>{generatedCert.studentName}</strong> has satisfactorily completed all curriculum requirements, continuous hands-on laboratory modules, and successfully passed the proctored examination for:
          </p>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#78350F', margin: '0.5rem 0 1rem' }}>
            {generatedCert.courseTitle} ({generatedCert.grade})
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #D97706', paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.78rem', color: '#92400E' }}>
              Signatory: <strong>Dr. Alok Nath Verma (Dean of Academy)</strong> • Akul Dravin Digital Services Private Limited
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => window.print()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  background: '#78350F',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} /> Download Verified PDF Slip
              </button>
              <button
                onClick={() => navigate(`/verify-certificate/${generatedCert.certId}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  color: '#78350F',
                  border: '1px solid #B45309',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                <ExternalLink size={14} /> Public Verification Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enrolled Courses */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1.25rem' }}>
          My Enrolled Courses & Modules
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {enrolledCourses.map(crs => (
            <div key={crs.id} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                    {crs.title}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Track Code: {crs.id} • Progress: {crs.progress}%
                  </div>
                </div>

                <div>
                  {crs.progress === 100 ? (
                    <button
                      onClick={() => handleStartExam(crs.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 1rem',
                        borderRadius: '6px',
                        background: '#2563EB',
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Award size={14} /> Take Final Online Exam
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#D97706', background: '#FEF3C7', padding: '0.3rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
                      Course In Progress ({crs.progress}%)
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                <div style={{ width: `${crs.progress}%`, height: '100%', background: crs.progress === 100 ? '#10B981' : '#3B82F6', transition: 'width 0.3s' }} />
              </div>

              {/* Modules list */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
                {crs.syllabus.map((m, idx) => (
                  <div key={idx} style={{ fontSize: '0.78rem', color: '#334155', background: '#FFFFFF', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={13} color="#10B981" /> {m}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
