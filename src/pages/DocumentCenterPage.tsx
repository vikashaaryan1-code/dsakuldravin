import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
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
  ScanLine
} from 'lucide-react';

export const DocumentCenterPage: React.FC = () => {
  const { documents, uploadDocument, deleteDocument, showToast, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<'Identity' | 'Address' | 'Business' | 'Tax' | 'Property' | 'Education'>('Identity');
  const [ocrScanning, setOcrScanning] = useState(false);

  const categories = ['All', 'Identity', 'Tax', 'Property', 'Education', 'Business'];

  const filteredDocs = documents.filter(doc => {
    const matchCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleUploadSubmit = () => {
    if (!newDocName.trim()) return;
    setOcrScanning(true);

    setTimeout(() => {
      uploadDocument({
        name: newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`,
        category: newDocCategory,
        fileType: 'PDF',
        status: 'verified',
        size: (Math.random() * 3 + 0.8).toFixed(1) + ' MB',
        ocrConfidence: Number((Math.random() * 3 + 96).toFixed(1)),
      });

      setOcrScanning(false);
      setIsUploading(false);
      setNewDocName('');
    }, 800);
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

      {/* QUICK DOCUMENT UTILITY TOOLS */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem' }}>
          Universal Document Processing Tools
        </h3>

        <div className="grid-4" style={{ gap: '1rem' }}>
          {[
            { title: 'Quantum AI OCR Extractor', desc: 'Extract clean Unicode text from photos, PDFs & Aadhaar cards.', icon: <ScanLine size={20} color="#1D4ED8" /> },
            { title: 'PDF Merge & Splitter', desc: 'Combine multiple marksheets or deed pages into one PDF.', icon: <Split size={20} color="#059669" /> },
            { title: 'Smart PDF Compressor', desc: 'Reduce file size below 200KB for government job portals.', icon: <Minimize2 size={20} color="#D97706" /> },
            { title: 'Resume & Biodata Maker', desc: 'ATS-friendly professional CV templates with instant PDF export.', icon: <FileCode size={20} color="#7C3AED" /> },
          ].map((tool, idx) => (
            <div
              key={idx}
              className="card"
              style={{ padding: '1.25rem', borderRadius: '14px', cursor: 'pointer' }}
              onClick={() => showToast(`Tool Launched`, `${tool.title} ready for file drag & drop.`, 'info')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {tool.icon}
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A192F' }}>{tool.title}</h4>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4 }}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOMER DOCUMENT VAULT (Section 69) */}
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
                  onClick={() => showToast('Download Started', `Downloading ${doc.name}`, 'success')}
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
                    onClick={() => showToast('Verification Link Copied', 'Shareable secure link copied to clipboard.', 'info')}
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
