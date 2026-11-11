import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { 
  GraduationCap, 
  FileCheck2, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Users,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const EducationPage: React.FC = () => {
  const { openApplyModal, services, language } = useApp();

  const eduItems = [
    { title: 'SSC / UPSC / Railway Form Filling', rate: '₹99 / application', desc: 'Accurate photograph and signature compression, post preferences selection, and payment verification.', slug: 'exam-form-filling' },
    { title: 'Central University & College Admissions', rate: '₹299 / form', desc: 'CUET counseling, domicile preference validation, and document upload assistance.', slug: 'admission-assistance' },
    { title: 'Professional ATS Resume & CV Studio', rate: '₹199 / format', desc: 'International standard 1-page resume template optimized for applicant tracking systems (ATS).', slug: 'resume-cv-studio' },
    { title: 'Digital Literacy & Typing Certification', rate: '₹499 / course', desc: 'Government-recognized 30-day computer course certificate for clerical recruitment exams.', slug: 'typing-certification' },
  ];

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid #F59E0B',
          borderRadius: '9999px',
          padding: '0.3rem 0.75rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#F59E0B',
          marginBottom: '1rem',
        }}>
          <GraduationCap size={14} />
          <span>CAREER GUIDANCE & EXAMINATION DESK</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'शिक्षा, करियर एवं परीक्षा सहायता' : 'Education & Career Desk'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Zero-error competitive exam registration, university admission counseling, ATS-ready resume creation, and skill development certifications.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
        {eduItems.map((item, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              padding: '1.75rem',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-blue">STUDENT DESK</span>
                <span className="badge badge-gold">{item.rate}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {item.desc}
              </p>
            </div>

            <button
              onClick={() => {
                const matched = services.find(s => s.slug === item.slug);
                if (matched) {
                  openApplyModal(matched);
                } else {
                  const fallback = services.find(s => s.slug === 'exam-form-filling') || services[0];
                  const parsedRate = parseInt(item.rate.replace(/[^\d]/g, ''), 10);
                  openApplyModal({
                    ...fallback,
                    title: item.title,
                    basePrice: Number.isFinite(parsedRate) && parsedRate > 0 ? parsedRate : fallback.basePrice,
                    professionalFee: Number.isFinite(parsedRate) && parsedRate > 0 ? parsedRate : fallback.professionalFee,
                  });
                }
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Get Application Assistance</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* ADCS Academy & LMS Hub Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 60%, #312E81 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        marginBottom: '2.5rem',
      }}>
        <div style={{ maxWidth: '600px' }}>
          <span style={{ background: '#F59E0B', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
            ADCS ACADEMY LMS
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', margin: '0.5rem 0 0.5rem' }}>
            Vocational Skill Tracks & Verifiable Certifications
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            Master Generative AI, Computer Fundamentals, CCTV Installation, and Digital Marketing. Pass timed online proctored exams and receive verifiable private professional credentials with QR security.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/portal/student"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            <BookOpen size={16} /> Enter Student Portal & LMS
          </Link>

          <Link
            to="/verify-certificate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#38BDF8',
              border: '1px solid #38BDF8',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            <Award size={16} /> Verify Certificate Online
          </Link>
        </div>
      </div>

      {/* Official Examination, Admissions & Scholarship Portals Directory */}
      <div style={{
        background: '#F8FAFC',
        borderRadius: '20px',
        padding: '1.75rem',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0A192F', fontWeight: 800, fontSize: '1.05rem' }}>
              <ShieldCheck size={18} color="#1D4ED8" />
              <span>Authorized Examination, Admissions & Scholarship Portals</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.25rem 0 0' }}>
              Direct official government portals for applicant-authenticated OTP login and statutory submission. ADCS provides document compression & assisted filing only.
            </p>
          </div>
          <Link to="/documents" className="badge badge-blue" style={{ textDecoration: 'none' }}>
            Open Photo/Marksheet Vault
          </Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {[
            { name: 'SSC Official Portal (ssc.gov.in)', url: 'https://ssc.gov.in/' },
            { name: 'UPSC Online (upsconline.nic.in)', url: 'https://upsconline.nic.in/' },
            { name: 'NTA Exams — CUET / JEE / NEET', url: 'https://exams.nta.ac.in/' },
            { name: 'National Scholarship Portal (NSP)', url: 'https://scholarships.gov.in/' },
            { name: 'Academic Bank of Credits (DigiLocker)', url: 'https://www.abc.gov.in/' },
          ].map((portal) => (
            <a
              key={portal.url}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#1E293B',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <span>{portal.name}</span>
              <ExternalLink size={13} color="#2563EB" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
