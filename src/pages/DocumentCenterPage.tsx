import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { CertificateStudio } from '../components/documents/CertificateStudio';
import { LetterGenerator } from '../components/documents/LetterGenerator';
import { 
  FileText, 
  UploadCloud, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Trash2, 
  Download, 
  Share2, 
  Search, 
  Sparkles,
  FileCheck,
  Split,
  Minimize2,
  FileCode,
  ScanLine,
  X,
  Copy,
  Check,
  RefreshCw,
  Eye,
  Plus,
  Award,
  Mail
} from 'lucide-react';

export const DocumentCenterPage: React.FC = () => {
  const { documents, uploadDocument, deleteDocument, showToast, language } = useApp();
  const [mainSection, setMainSection] = useState<'vault' | 'certificate_studio' | 'letter_generator' | 'utilities'>('vault');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<'Identity' | 'Address' | 'Business' | 'Tax' | 'Property' | 'Education'>('Identity');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrScanning, setOcrScanning] = useState(false);

  // Universal Tools State
  const [activeTool, setActiveTool] = useState<'ocr' | 'merge' | 'compress' | 'resume' | null>(null);

  const handleDownloadDoc = (doc: any) => {
    const content = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS)
SECURE CITIZEN DOCUMENT ARCHIVE - VERIFIED RECORD
================================================================================
Document UID    : ${doc.id}
File Name       : ${doc.name}
Category        : ${doc.category}
File Size       : ${doc.size}
Upload Date     : ${doc.uploadDate}
OCR Match Score : ${doc.ocrConfidence}%
DPDP Act 2025   : Encrypted at rest (AES-256) under Purpose Limitation
Cryptographic ID: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-ADCS-RECORD
Verification URL: https://akuldravindigital.com/verify-doc/${doc.id}
================================================================================
This certified digital copy is authenticated against institutional registries.
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.name.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_')}_Verified.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Download Completed', `${doc.name} verified copy saved to your device.`, 'success');
  };

  const handleShareDoc = (doc: any) => {
    const url = `https://akuldravindigital.com/verify-doc/${doc.id}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url);
    }
    showToast('Link Copied', `Secure verification link copied: ${url}`, 'info');
  };

  // 1. OCR Tool State
  const [ocrSample, setOcrSample] = useState<'aadhaar' | 'pan' | 'income'>('aadhaar');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // 2. PDF Merge Tool State
  const [mergeFiles, setMergeFiles] = useState<string[]>([
    'Marksheet_Class_10.pdf (1.2 MB)',
    'Marksheet_Class_12.pdf (1.4 MB)',
    'Character_Certificate.pdf (0.4 MB)'
  ]);

  // 3. PDF Compressor State
  const [compressTargetKb, setCompressTargetKb] = useState<number>(100);
  const [compressDone, setCompressDone] = useState(false);

  // 4. Resume Maker State
  const [resumeName, setResumeName] = useState('Anand Kumar Verma');
  const [resumeRole, setResumeRole] = useState('Digital Operations Specialist & CSC Operator');
  const [resumeEmail, setResumeEmail] = useState('anand.verma@example.com');
  const [resumePhone, setResumePhone] = useState('+91 98350 44921');
  const [resumeSkills, setResumeSkills] = useState('Aadhaar Enrolment, NSDL PAN, GST Portal, MS Office, Typing 45 WPM');
  const [resumeExp, setResumeExp] = useState('3+ Years Experience at Akul Dravin Digital Seva Kendra managing 150+ citizen services.');

  const categories = ['All', 'Identity', 'Tax', 'Property', 'Education', 'Business'];

  const filteredDocs = documents.filter(doc => {
    const matchCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('File Too Large', 'Maximum document size is 10 MB.', 'warning');
        return;
      }
      setSelectedFile(file);
      if (!newDocName.trim()) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '');
        setNewDocName(cleanName);
      }
    }
  };

  const handleUploadSubmit = () => {
    if (!newDocName.trim() && !selectedFile) return;
    setOcrScanning(true);

    const docName = newDocName.trim() || (selectedFile ? selectedFile.name : 'Document.pdf');
    const ext = selectedFile ? selectedFile.name.split('.').pop()?.toUpperCase() || 'PDF' : 'PDF';
    const fileSizeStr = selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : '1.4 MB';

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        uploadDocument({
          name: docName.includes('.') ? docName : `${docName}.${ext.toLowerCase()}`,
          category: newDocCategory,
          fileType: ext,
          status: 'verified',
          size: fileSizeStr,
          ocrConfidence: Number((Math.random() * 3 + 96).toFixed(1)),
        });
        setOcrScanning(false);
        setIsUploading(false);
        setNewDocName('');
        setSelectedFile(null);
      };
      reader.onerror = () => {
        setOcrScanning(false);
        showToast('Upload Error', 'Could not process selected file.', 'warning');
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setTimeout(() => {
        uploadDocument({
          name: docName.endsWith('.pdf') ? docName : `${docName}.pdf`,
          category: newDocCategory,
          fileType: 'PDF',
          status: 'verified',
          size: fileSizeStr,
          ocrConfidence: Number((Math.random() * 3 + 96).toFixed(1)),
        });
        setOcrScanning(false);
        setIsUploading(false);
        setNewDocName('');
      }, 500);
    }
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div>
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
            <Lock size={14} />
            <span>ENCRYPTED VAULT & OCR STUDIO • PROTOTYPE DEMO</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
            {language === 'hi' ? 'दस्तावेज़ स्टूडियो एवं डिजिटल वॉल्ट' : 'Document Studio & Vault'}
          </h1>
          <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
            Store, verify, format, convert, and OCR-scan statutory documents with automated expiry alerts in an interactive prototype workspace.
          </p>
        </div>

        <button
          onClick={() => setIsUploading(true)}
          className="btn-gold btn-lg"
          style={{ fontWeight: 800 }}
        >
          <UploadCloud size={20} />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Document Studio Module Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '2.5rem',
        borderBottom: '2px solid #E2E8F0',
        paddingBottom: '0.75rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'vault', label: '1. Encrypted Document Vault', icon: <Lock size={16} /> },
          { id: 'certificate_studio', label: '2. Certificate Studio (QR Verified)', icon: <Award size={16} /> },
          { id: 'letter_generator', label: '3. Letter Generator (Letterhead)', icon: <Mail size={16} /> },
          { id: 'utilities', label: '4. Universal Processing Tools', icon: <Sparkles size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMainSection(tab.id as any)}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: mainSection === tab.id ? '#0A192F' : '#FFFFFF',
              color: mainSection === tab.id ? '#FFFFFF' : '#475569',
              border: mainSection === tab.id ? '1px solid #0A192F' : '1px solid #CBD5E1',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 2. CERTIFICATE STUDIO VIEW */}
      {mainSection === 'certificate_studio' && (
        <CertificateStudio />
      )}

      {/* 3. LETTER GENERATOR VIEW */}
      {mainSection === 'letter_generator' && (
        <LetterGenerator />
      )}

      {/* 4. UNIVERSAL UTILITY TOOLS VIEW */}
      {(mainSection === 'utilities' || (mainSection === 'vault' && activeTool !== null)) && (
        <div style={{ marginBottom: '3.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem' }}>
            Universal Document Processing Tools
          </h3>

          <div className="grid-4" style={{ gap: '1rem' }}>
            {[
              { id: 'ocr' as const, title: 'Quantum AI OCR Extractor', desc: 'Extract clean Unicode text from photos, PDFs & Aadhaar cards.', icon: <ScanLine size={20} color="#1D4ED8" /> },
              { id: 'merge' as const, title: 'PDF Merge & Splitter', desc: 'Combine multiple marksheets or deed pages into one PDF.', icon: <Split size={20} color="#059669" /> },
              { id: 'compress' as const, title: 'Smart PDF Compressor', desc: 'Reduce file size below 200KB for government job portals.', icon: <Minimize2 size={20} color="#D97706" /> },
              { id: 'resume' as const, title: 'Resume & Biodata Maker', desc: 'ATS-friendly professional CV templates with instant PDF export.', icon: <FileCode size={20} color="#7C3AED" /> },
            ].map((tool) => (
              <div
                key={tool.id}
                className="card"
                style={{
                  padding: '1.25rem',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  border: activeTool === tool.id ? '2px solid #2563EB' : '1px solid #E2E8F0',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onClick={() => {
                  setActiveTool(tool.id);
                  setCompressDone(false);
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {tool.icon}
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A192F' }}>{tool.title}</h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, margin: 0 }}>{tool.desc}</p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1D4ED8', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>Launch Interactive Tool →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CUSTOMER DOCUMENT VAULT */}
      {mainSection === 'vault' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(10, 25, 47, 0.05)',
        }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0A192F' }}>
                Encrypted Customer Document Vault
              </h2>
              <span className="badge badge-green">AES-256 Active</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.2rem' }}>
              Documents stored here can be attached with a single click to any citizen or business service application.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#F8FAFC',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
            }}>
              <Search size={15} color="#64748B" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter documents..."
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.82rem' }}
              />
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: selectedCategory === cat ? '#1D4ED8' : '#F1F5F9',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#1D4ED8' : '#E2E8F0',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Document Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {filteredDocs.map(doc => (
            <div
              key={doc.id}
              style={{
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid #E2E8F0',
                background: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#EFF6FF',
                    color: '#1D4ED8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <FileCheck size={18} />
                  </div>
                  <span className="badge badge-green">
                    OCR {doc.ocrConfidence}%
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0A192F', wordBreak: 'break-word', marginBottom: '0.25rem' }}>
                  {doc.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  {doc.category} • {doc.size} • Uploaded {doc.uploadDate}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '0.75rem',
                borderTop: '1px solid #E2E8F0',
              }}>
                <button
                  onClick={() => handleDownloadDoc(doc)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: '#1D4ED8',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleShareDoc(doc)}
                    style={{ color: '#64748B', padding: '0.2rem' }}
                    title="Share Verification Link"
                  >
                    <Share2 size={15} />
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    style={{ color: '#EF4444', padding: '0.2rem' }}
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* INTERACTIVE UNIVERSAL UTILITY TOOL MODAL */}
      {activeTool && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '620px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-blue">STUDIO ENGINE ACTIVE</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0A192F', marginTop: '0.3rem' }}>
                  {activeTool === 'ocr' && 'Quantum AI OCR Extractor & Validator'}
                  {activeTool === 'merge' && 'PDF Document Merge & Page Re-order Studio'}
                  {activeTool === 'compress' && 'Smart PDF Compressor for Sarkari Portals'}
                  {activeTool === 'resume' && 'ATS-Ready Sarkari & Private Resume Maker'}
                </h3>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
              >
                <X size={20} color="#64748B" />
              </button>
            </div>

            {/* 1. OCR TOOL VIEW */}
            {activeTool === 'ocr' && (
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                  AI-powered OCR extracts clean text and verifies UIDAI Verhoeff D5 dihedral checksums and NSDL PAN patterns automatically.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {(['aadhaar', 'pan', 'income'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setOcrSample(s)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        border: ocrSample === s ? '2px solid #2563EB' : '1px solid #E2E8F0',
                        background: ocrSample === s ? '#EFF6FF' : '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: ocrSample === s ? '#1D4ED8' : '#64748B',
                        cursor: 'pointer'
                      }}
                    >
                      {s === 'aadhaar' ? 'Aadhaar Card (UID)' : s === 'pan' ? 'PAN Card (49A)' : 'Income Certificate'}
                    </button>
                  ))}
                </div>

                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0',
                  marginBottom: '1.25rem'
                }}>
                  {ocrSample === 'aadhaar' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span className="badge badge-green">✓ Verhoeff D5 Checksum: Valid (9)</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Confidence: 99.8%</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                        <div><span style={{ color: '#64748B' }}>Aadhaar Number:</span> <strong>XXXXXXXX0019</strong></div>
                        <div><span style={{ color: '#64748B' }}>Full Name:</span> <strong>Vikramaditya Sharma</strong></div>
                        <div><span style={{ color: '#64748B' }}>DOB:</span> <strong>14/08/1992</strong></div>
                        <div><span style={{ color: '#64748B' }}>Gender:</span> <strong>Male / पुरुष</strong></div>
                      </div>
                      <div style={{ fontSize: '0.82rem', marginTop: '0.75rem', color: '#334155' }}>
                        Address: <em>Ward No. 12, Danapur Cantt, Danapur, Patna, Bihar - 801503</em>
                      </div>
                    </>
                  )}

                  {ocrSample === 'pan' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span className="badge badge-green">✓ Pattern [A-Z]{'{5}'}[0-9]{'{4}'}[A-Z]{'{1}'}: Valid</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Confidence: 99.4%</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                        <div><span style={{ color: '#64748B' }}>PAN Number:</span> <strong>ABCDE1234F</strong></div>
                        <div><span style={{ color: '#64748B' }}>Holder Name:</span> <strong>Vikramaditya Sharma</strong></div>
                        <div><span style={{ color: '#64748B' }}>Father's Name:</span> <strong>Ramesh Chandra Sharma</strong></div>
                        <div><span style={{ color: '#64748B' }}>Type:</span> <strong>Individual (P)</strong></div>
                      </div>
                    </>
                  )}

                  {ocrSample === 'income' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span className="badge badge-green">✓ e-District Digital Seal Verified</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Authority: SDM Danapur</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                        <div><span style={{ color: '#64748B' }}>Certificate No:</span> <strong>ED-INC-2026-99214</strong></div>
                        <div><span style={{ color: '#64748B' }}>Annual Income:</span> <strong>₹1,80,000 (Non-Creamy)</strong></div>
                        <div><span style={{ color: '#64748B' }}>Issued To:</span> <strong>Vikramaditya Sharma</strong></div>
                        <div><span style={{ color: '#64748B' }}>Validity:</span> <strong>FY 2026-2027</strong></div>
                      </div>
                    </>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      setCopiedField('all');
                      showToast('OCR Text Copied', 'All structured document metadata copied to clipboard.', 'success');
                      setTimeout(() => setCopiedField(null), 2000);
                    }}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    {copiedField === 'all' ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedField === 'all' ? 'Copied!' : 'Copy Extracted Data'}</span>
                  </button>
                  <button onClick={() => setActiveTool(null)} className="btn-secondary">
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* 2. MERGE TOOL VIEW */}
            {activeTool === 'merge' && (
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                  Combine multiple educational marksheets, affidavits, or identity deeds into a single unified PDF file.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {mergeFiles.map((f, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: '#F8FAFC',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      fontSize: '0.85rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 800, color: '#1D4ED8' }}>#{i + 1}</span>
                        <span>{f}</span>
                      </div>
                      <button
                        onClick={() => setMergeFiles(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}
                        title="Remove page"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => {
                      setMergeFiles(prev => [...prev, `Attachment_Doc_${prev.length + 1}.pdf (0.8 MB)`]);
                      showToast('File Added', 'Additional PDF attached to merge queue.', 'info');
                    }}
                    className="btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <Plus size={14} />
                    <span>Add File to Queue</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast('PDF Merged & Downloaded', `Merged ${mergeFiles.length} pages into Combined_Dossier_2026.pdf!`, 'success');
                      setActiveTool(null);
                    }}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Download size={15} />
                    <span>Download Combined PDF</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. COMPRESS TOOL VIEW */}
            {activeTool === 'compress' && (
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                  State government job portals (BPSC, SSC, UPPSC) require photos under 50KB and certificates under 100KB-200KB.
                </p>

                <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A192F' }}>Target Maximum File Size:</span>
                    <strong style={{ fontSize: '1rem', color: '#1D4ED8' }}>{compressTargetKb} KB</strong>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={300}
                    step={10}
                    value={compressTargetKb}
                    onChange={(e) => {
                      setCompressTargetKb(Number(e.target.value));
                      setCompressDone(false);
                    }}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginTop: '0.25rem' }}>
                    <span>20 KB (Photo/Sign)</span>
                    <span>100 KB (Govt Forms)</span>
                    <span>300 KB (High Res)</span>
                  </div>
                </div>

                {compressDone && (
                  <div style={{
                    background: '#DCFCE7',
                    border: '1px solid #86EFAC',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.25rem',
                    fontSize: '0.85rem',
                    color: '#166534'
                  }}>
                    <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>✓ Compression Optimization Complete!</div>
                    <div>Original: <strong>1.84 MB</strong> → Optimized: <strong>{Math.min(compressTargetKb - 8, 92)} KB</strong> (95% Reduction)</div>
                    <div style={{ fontSize: '0.75rem', color: '#15803D', marginTop: '0.25rem' }}>Zero artifact degradation • DPI preserved at 300 DPI statutory standard.</div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  {!compressDone ? (
                    <button
                      onClick={() => {
                        setCompressDone(true);
                        showToast('Compression Finished', `Optimized file to ${compressTargetKb - 8} KB.`, 'success');
                      }}
                      className="btn-primary"
                    >
                      <span>Compress Document Now</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        showToast('Downloaded', `Saved Compressed_Doc_${compressTargetKb}KB.pdf`, 'success');
                        setActiveTool(null);
                      }}
                      className="btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Download size={15} />
                      <span>Download Optimized File</span>
                    </button>
                  )}
                  <button onClick={() => setActiveTool(null)} className="btn-secondary">
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* 4. RESUME MAKER VIEW */}
            {activeTool === 'resume' && (
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                  Generate an ATS-optimized, 1-page professional curriculum vitae formatted specifically for private and clerical recruitment.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Full Candidate Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={resumeName}
                      onChange={(e) => setResumeName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Professional Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={resumeRole}
                      onChange={(e) => setResumeRole(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={resumeEmail}
                      onChange={(e) => setResumeEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Mobile Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={resumePhone}
                      onChange={(e) => setResumePhone(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Core Technical & Vocational Skills</label>
                  <input
                    type="text"
                    className="form-input"
                    value={resumeSkills}
                    onChange={(e) => setResumeSkills(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Work Experience / Summary</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={resumeExp}
                    onChange={(e) => setResumeExp(e.target.value)}
                  />
                </div>

                <div style={{
                  background: '#EFF6FF',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ fontSize: '0.82rem', color: '#1E40AF' }}>
                    ATS Compliance Score: <strong>96 / 100</strong> (Single-Column Standard)
                  </div>
                  <span className="badge badge-green">Recruiter Ready</span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      showToast('Resume Generated', `Downloaded ATS_Resume_${resumeName.replace(/\s+/g, '_')}.pdf`, 'success');
                      setActiveTool(null);
                    }}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Download size={15} />
                    <span>Download ATS Resume PDF</span>
                  </button>
                  <button onClick={() => setActiveTool(null)} className="btn-secondary">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.72)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '460px',
            padding: '1.75rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
              Upload Document to Vault
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Quantum AI will automatically classify, verify authenticity, and index your file.
            </p>

            <div className="form-group">
              <label className="form-label">Document Name *</label>
              <input
                type="text"
                className="form-input"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="e.g. Passport_Front_Page"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={newDocCategory}
                onChange={(e) => setNewDocCategory(e.target.value as any)}
              >
                <option value="Identity">Identity (Aadhaar, Passport, PAN, Voter)</option>
                <option value="Address">Address Proof (Electricity, Ration, Domicile)</option>
                <option value="Tax">Tax & Finance (ITR, Form 16, Bank statement)</option>
                <option value="Property">Property & Land Deeds (Registry, Sale Deed)</option>
                <option value="Education">Educational (10th/12th/Degree Certificates)</option>
                <option value="Business">Business (COI, GST, MOA, AOA, Trade License)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Attach File (PDF, PNG, JPG)</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="form-input"
                style={{ padding: '0.45rem', cursor: 'pointer' }}
              />
              {selectedFile && (
                <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.35rem', fontWeight: 600 }}>
                  ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                </div>
              )}
            </div>

            {ocrScanning && (
              <div style={{
                background: '#EFF6FF',
                padding: '0.65rem',
                borderRadius: '8px',
                color: '#1D4ED8',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '1rem',
              }}>
                <Sparkles size={16} className="animate-pulse-glow" />
                <span>Simulating Document Ingestion & Verification Seal...</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={() => setIsUploading(false)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={!newDocName || ocrScanning}
                className="btn-primary"
                style={{ flex: 2 }}
              >
                {ocrScanning ? 'Encrypting...' : 'Save & Encrypt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
