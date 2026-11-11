import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  PlusCircle, 
  Users, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  BarChart3,
  Video
} from 'lucide-react';

export const InstructorPortal: React.FC = () => {
  const { showToast, logAudit } = useApp();

  const [courses, setCourses] = useState([
    {
      id: 'CRS-AI-101',
      title: 'ADCS AI Mastery & Prompt Engineering',
      category: 'Artificial Intelligence',
      duration: '40 Hours',
      modules: 12,
      enrolled: 428,
      certified: 312,
      passingGrade: '70%',
      status: 'PUBLISHED'
    },
    {
      id: 'CRS-COMP-102',
      title: 'ADCS Computer Pro & Windows Operating Fundamentals',
      category: 'Foundational Tech',
      duration: '30 Hours',
      modules: 10,
      enrolled: 890,
      certified: 760,
      passingGrade: '60%',
      status: 'PUBLISHED'
    },
    {
      id: 'CRS-CCTV-103',
      title: 'ADCS CCTV & IP Surveillance Installation Technician',
      category: 'Hardware & Networking',
      duration: '45 Hours',
      modules: 14,
      enrolled: 215,
      certified: 184,
      passingGrade: '75%',
      status: 'PUBLISHED'
    },
    {
      id: 'CRS-MKT-104',
      title: 'ADCS Digital Marketing & WhatsApp Automation Specialist',
      category: 'Digital Marketing',
      duration: '35 Hours',
      modules: 11,
      enrolled: 340,
      certified: 290,
      passingGrade: '65%',
      status: 'PUBLISHED'
    }
  ]);

  const [newQuestionCourse, setNewQuestionCourse] = useState('CRS-AI-101');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [correctOption, setCorrectOption] = useState('A');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    showToast('Question Added to Bank', `New question registered under course ${newQuestionCourse}.`, 'success');
    logAudit(`Instructor added question to ${newQuestionCourse}`, 'ADCS Academy');
    setQuestionText('');
    setOptionA('');
    setOptionB('');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #312E81 60%, #4338CA 100%)',
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
              ADCS ACADEMY
            </span>
            <span style={{ background: '#10B981', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
              MASTER INSTRUCTOR
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.3rem', color: '#FFFFFF' }}>
            Dr. Alok Nath Verma • Academy Dean
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>
            Curriculum Authoring • Question Bank Orchestration • Private Training Certification
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Total Enrolled</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8' }}>1,873 Students</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Certificates Issued</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>1,546 Validated</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Left: Published Courses Catalogue */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Curriculum & Course Tracks
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#4338CA', background: '#EEF2FF', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
              {courses.length} Active Tracks
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {courses.map(crs => (
              <div key={crs.id} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                    {crs.title}
                  </div>
                  <span style={{ fontSize: '0.7rem', background: '#DCFCE7', color: '#059669', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                    {crs.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span>⏱️ {crs.duration}</span>
                  <span>📚 {crs.modules} Modules</span>
                  <span>🎯 Pass: {crs.passingGrade}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#334155', borderTop: '1px dashed #CBD5E1', paddingTop: '0.4rem' }}>
                  <span>Enrolled: <strong>{crs.enrolled}</strong></span>
                  <span>Certified: <strong style={{ color: '#059669' }}>{crs.certified}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Question Bank & Exam Config */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
            Examination Question Bank Manager
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 1.25rem' }}>
            Add verified multiple-choice questions for randomized final proctored evaluations
          </p>

          <form onSubmit={handleAddQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Target Course:
              </label>
              <select
                value={newQuestionCourse}
                onChange={e => setNewQuestionCourse(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Question Statement:
              </label>
              <textarea
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="e.g. Which LLM architecture parameter directly governs temperature sampling variability?"
                rows={3}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.2rem' }}>Option A:</label>
                <input
                  type="text"
                  value={optionA}
                  onChange={e => setOptionA(e.target.value)}
                  placeholder="Temperature scalar (0.0 to 1.0)"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.2rem' }}>Option B:</label>
                <input
                  type="text"
                  value={optionB}
                  onChange={e => setOptionB(e.target.value)}
                  placeholder="Context window token limit"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Correct Option Key:
              </label>
              <select
                value={correctOption}
                onChange={e => setCorrectOption(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: '#4338CA',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              <PlusCircle size={16} /> Save Question to Bank
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
