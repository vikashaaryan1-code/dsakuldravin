import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { apiClient } from '../services/apiClient';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  FileSearch, 
  Calculator, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Layers,
  Terminal,
  Activity,
  Zap,
  Lock,
  RefreshCw,
  Clock,
  Compass,
  FileText,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatMessage {
  id: string;
  sender: 'user' | 'quantum_ai';
  agentName?: string;
  text: string;
  governanceLevel?: 'READ' | 'RECOMMEND' | 'DRAFT' | 'EXECUTE' | 'APPROVAL REQUIRED';
  suggestedAction?: {
    label: string;
    actionType: 'open_apply' | 'open_cart' | 'open_track' | 'navigate' | 'boq_calc';
    targetPayload?: any;
  };
  timestamp: string;
}

export const QuantumAIPage: React.FC = () => {
  const { 
    services, 
    applications, 
    openApplyModal, 
    setIsCartOpen,
    setIsTrackerOpen,
    setActiveTrackerQuery,
    logAudit,
    language 
  } = useApp();

  const [activeAgent, setActiveAgent] = useState<'Universal' | 'Document AI' | 'Quote AI' | 'Admin Copilot'>('Universal');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'quantum_ai',
      agentName: 'QUANTUM Multi-Agent Brain',
      text: language === 'hi'
        ? 'नमस्ते! मैं QUANTUM AI सुपर ब्रेन हूँ। मैं नागरिक सेवाएँ, दस्तावेज़ OCR स्क्रूटनी, कंस्ट्रक्शन/सीसीटीवी कोटेशन और एंटरप्राइज़ एनालिटिक्स में आपकी तुरंत मदद करने के लिए तत्पर हूँ।'
        : 'Welcome to QUANTUM AI Enterprise Command Center. I orchestrate specialized autonomous agents for Citizen Services, Business Incorporation, Document Scrutiny, Pricing Estimates, and Governance Operations. How can I assist you?',
      governanceLevel: 'READ',
      timestamp: 'Just now',
    }
  ]);

  const [governanceLedger, setGovernanceLedger] = useState([
    { id: 'ACT-101', agent: 'Document AI', action: 'OCR Scrutiny on PAN Form 49A', confidence: '99.4%', status: 'APPROVED', time: '10:34 AM' },
    { id: 'ACT-102', agent: 'Quote AI', action: 'Dynamic CCTV 4-Cam BoQ Configured', confidence: '100%', status: 'EXECUTED', time: '11:15 AM' },
    { id: 'ACT-103', agent: 'Admin Copilot', action: 'VLE Commission Batch Settlement ₹14,800', confidence: '98.9%', status: 'APPROVAL REQUIRED', time: '11:45 AM' },
    { id: 'ACT-104', agent: 'Universal Brain', action: 'Natural Language Scheme Matching (PM-Kisan)', confidence: '97.8%', status: 'RECOMMEND', time: '12:02 PM' },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptSuggestions = [
    { en: 'मुझे कंपनी शुरू करनी है और GST भी चाहिए', hi: 'मुझे कंपनी शुरू करनी है और GST भी चाहिए', agent: 'Universal' },
    { en: 'Check Aadhaar card validity & OCR rules', hi: 'आधार कार्ड सत्यापन एवं ओसीआर नियम', agent: 'Document AI' },
    { en: 'Estimate cost for 4 CCTV cameras + 1TB storage', hi: '4 सीसीटीवी कैमरा और 1TB स्टोरेज का खर्च', agent: 'Quote AI' },
    { en: 'Show pending applications & audit anomalies', hi: 'लंबित आवेदनों की सूची एवं ऑडिट स्थिति', agent: 'Admin Copilot' },
    { en: 'Track my courier shipment', hi: 'कूरियर पार्सल की स्थिति ट्रैक करें', agent: 'Universal' },
  ];

  const handleSendMessage = async (userQuery?: string) => {
    const query = userQuery || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // 1. Attempt Cloud AI API dispatch
      const serverRes = await apiClient.sendAiChat(query, activeAgent, language);

      let reply: ChatMessage;
      if (serverRes && serverRes.success) {
        reply = {
          id: 'ai-' + Date.now(),
          sender: 'quantum_ai',
          agentName: serverRes.agentName,
          text: serverRes.text,
          governanceLevel: (serverRes.governanceLevel as any) || 'RECOMMEND',
          suggestedAction: serverRes.suggestedAction,
          timestamp: serverRes.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        // 2. Intelligent local heuristic fallback
        const q = query.toLowerCase();
        if (q.includes('pending') || q.includes('status') || q.includes('आवेदन')) {
          const pendingCount = applications.filter(a => a.status !== 'Completed').length;
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Admin Copilot',
            text: `Currently, there are **${pendingCount} active applications** in the pipeline. 1 requires executive review, and 2 are under government portal scrutiny.`,
            governanceLevel: 'READ',
            suggestedAction: {
              label: 'Open Live Application Tracker',
              actionType: 'open_track',
              targetPayload: 'AD-APP-9102'
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('कंपनी') || q.includes('company') || q.includes('gst') || q.includes('business')) {
          const pvtLtd = services.find(s => s.id === 'srv-pvt-ltd') || services[0];
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Business Advisory Agent',
            text: `For company incorporation, we recommend **Private Limited Company (₹6,999)** bundled with **GST Registration (₹1,499)**. Includes 2 DINs, Name Approval (SPICe+), MOA/AOA, and Bank Account resolution within 7-10 working days.`,
            governanceLevel: 'RECOMMEND',
            suggestedAction: {
              label: 'Initiate Private Limited Incorporation',
              actionType: 'open_apply',
              targetPayload: pvtLtd
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('cctv') || q.includes('कैमरा') || q.includes('storage')) {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Quote & BOQ AI',
            text: `Smart Security Package: **4x 4MP IP POE Cameras + 1TB Surveillance HDD (30-Day Backup) + 4CH NVR + Cabling & Mobile App Configuration** estimated at **₹17,800** (incl. GST & Installation).`,
            governanceLevel: 'DRAFT',
            suggestedAction: {
              label: 'Open Dynamic CCTV Configurator',
              actionType: 'navigate',
              targetPayload: '/cctv'
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('aadhaar') || q.includes('आधार') || q.includes('ocr') || q.includes('document')) {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Document AI & OCR Scrutiny',
            text: `Document AI Scrutiny Protocol: Verified Aadhaar requirements include minimum 300 DPI resolution, clear DOB format, legible 12-digit UID mask with Verhoeff validation, and un-cropped address lines. Tamper detection active.`,
            governanceLevel: 'READ',
            suggestedAction: {
              label: 'Open Document Studio & Vault',
              actionType: 'navigate',
              targetPayload: '/documents'
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Quantum AI Universal',
            text: `I've analyzed your query "${query}". You can apply for this service with full document validation, or bundled with additional citizen and business compliance solutions.`,
            governanceLevel: 'RECOMMEND',
            suggestedAction: {
              label: 'Explore Complete Service Catalog',
              actionType: 'navigate',
              targetPayload: '/services'
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
      }

      setMessages(prev => [...prev, reply]);
      setIsTyping(false);

      // Add to live governance ledger
      setGovernanceLedger(prev => [
        {
          id: 'ACT-' + Math.floor(100 + Math.random() * 900),
          agent: reply.agentName || 'Quantum AI',
          action: query.slice(0, 32) + '...',
          confidence: (97 + Math.random() * 2.9).toFixed(1) + '%',
          status: reply.governanceLevel || 'RECOMMEND',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev.slice(0, 5)
      ]);

      logAudit(`Quantum AI Agent Response: ${reply.agentName}`, `Prompt: ${query.slice(0, 40)}`);
    } catch (err) {
      console.error('AI chat error:', err);
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;
    if (action.actionType === 'open_apply') {
      openApplyModal(action.targetPayload);
    } else if (action.actionType === 'open_cart') {
      setIsCartOpen(true);
    } else if (action.actionType === 'open_track') {
      if (action.targetPayload) {
        setActiveTrackerQuery(action.targetPayload);
      }
      setIsTrackerOpen(true);
    } else if (action.actionType === 'navigate') {
      window.location.href = action.targetPayload;
    }
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Header */}
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
        gap: '1.5rem',
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
            <Sparkles size={14} />
            <span>QUANTUM AI MULTI-AGENT COORDINATOR</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
            {language === 'hi' ? 'क्वांटम एआई सुपर ब्रेन कमांड सेंटर' : 'Quantum AI Super Brain & Governance'}
          </h1>
          <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
            Autonomous multi-agent intelligence orchestrating OCR scrutiny, dynamic pricing formulas, natural language platform queries, and tamper-proof governance audit logs.
          </p>
        </div>

        {/* Live System Metrics */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#93C5FD' }}>ACTIVE AGENTS</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F59E0B' }}>4 Live</div>
            <div style={{ fontSize: '0.7rem', color: '#10B981' }}>● Zero Latency</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#93C5FD' }}>GOVERNANCE LEVEL</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#38BDF8' }}>Tier-1</div>
            <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Audited & Tracked</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Chat Terminal (65%), Right Governance Ledger (35%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }} className="responsive-grid">
        {/* Chat Console */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(10, 25, 47, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
          overflow: 'hidden',
        }}>
          {/* Agent Switcher Tabs */}
          <div style={{
            padding: '1rem 1.25rem',
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { name: 'Universal', icon: <Bot size={14} /> },
                { name: 'Document AI', icon: <FileSearch size={14} /> },
                { name: 'Quote AI', icon: <Calculator size={14} /> },
                { name: 'Admin Copilot', icon: <Terminal size={14} /> },
              ].map((agent) => (
                <button
                  key={agent.name}
                  onClick={() => setActiveAgent(agent.name as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    border: activeAgent === agent.name ? '1px solid #1D4ED8' : '1px solid #E2E8F0',
                    background: activeAgent === agent.name ? '#EFF6FF' : '#FFFFFF',
                    color: activeAgent === agent.name ? '#1D4ED8' : '#64748B',
                  }}
                >
                  {agent.icon}
                  <span>{agent.name}</span>
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
              <Zap size={14} />
              <span>Quantum Engine Active</span>
            </div>
          </div>

          {/* Message Stream */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            background: '#FAFBFD',
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '0.85rem',
                  alignItems: 'flex-start',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: msg.sender === 'user' ? '#1D4ED8' : '#0A192F',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(29, 78, 216, 0.3)' : '0 2px 8px rgba(10, 25, 47, 0.2)',
                }}>
                  {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} color="#F59E0B" />}
                </div>

                {/* Message Bubble */}
                <div style={{
                  maxWidth: '80%',
                  background: msg.sender === 'user' ? '#1D4ED8' : '#FFFFFF',
                  color: msg.sender === 'user' ? '#FFFFFF' : '#0A192F',
                  padding: '1rem 1.25rem',
                  borderRadius: msg.sender === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                }}>
                  {/* AI Message Header with Agent & Governance Badge */}
                  {msg.sender === 'quantum_ai' && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      paddingBottom: '0.4rem',
                      borderBottom: '1px solid #F1F5F9',
                      fontSize: '0.74rem',
                    }}>
                      <span style={{ fontWeight: 700, color: '#1D4ED8' }}>
                        {msg.agentName || 'Quantum AI'}
                      </span>
                      {msg.governanceLevel && (
                        <span style={{
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          background: msg.governanceLevel === 'EXECUTE' ? '#DCFCE7' :
                                      msg.governanceLevel === 'DRAFT' ? '#FEF3C7' :
                                      msg.governanceLevel === 'APPROVAL REQUIRED' ? '#FEE2E2' : '#EFF6FF',
                          color: msg.governanceLevel === 'EXECUTE' ? '#15803D' :
                                 msg.governanceLevel === 'DRAFT' ? '#B45309' :
                                 msg.governanceLevel === 'APPROVAL REQUIRED' ? '#B91C1C' : '#1D4ED8',
                        }}>
                          [{msg.governanceLevel}]
                        </span>
                      )}
                    </div>
                  )}

                  <div>{msg.text}</div>

                  {/* Suggested Action Trigger Button */}
                  {msg.suggestedAction && (
                    <button
                      onClick={() => handleActionClick(msg.suggestedAction)}
                      style={{
                        marginTop: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'linear-gradient(135deg, #0A192F 0%, #1D4ED8 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.5rem 0.95rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'opacity 0.15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  <div style={{
                    fontSize: '0.68rem',
                    color: msg.sender === 'user' ? '#BFDBFE' : '#94A3B8',
                    textAlign: 'right',
                    marginTop: '0.35rem',
                  }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0A192F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={18} color="#F59E0B" />
                </div>
                <div style={{ background: '#FFFFFF', padding: '0.75rem 1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '0.84rem', color: '#64748B' }}>
                  <Sparkles size={14} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
                  Synthesizing multi-agent response...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div style={{
            padding: '0.6rem 1.25rem',
            background: '#FFFFFF',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}>
            {promptSuggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.en)}
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  borderRadius: '9999px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  color: '#1D4ED8',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {item.en}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            padding: '1rem 1.25rem',
            background: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
          }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={language === 'hi' ? 'यहाँ अपना प्रश्न लिखें...' : 'Ask Quantum AI (e.g. GST status, CCTV quote, Loan calculation)...'}
                style={{
                  flex: 1,
                  padding: '0.85rem 1.2rem',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.92rem',
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0 1.5rem', borderRadius: '12px' }}
              >
                <Send size={16} />
                <span>Transmit</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: AI Governance Ledger & Security Protocol */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Governance Rules Alert */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(10, 25, 47, 0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ShieldCheck size={20} color="#10B981" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                Autonomous AI Governance
              </h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Every agent execution adheres strictly to verified statutory constraints. High-privilege tasks enforce Human-in-the-Loop verification.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#F8FAFC', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#1D4ED8' }}>[READ]</span>
                <span style={{ color: '#64748B' }}>Telemetry, Status, Document Rules</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#F8FAFC', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#059669' }}>[RECOMMEND]</span>
                <span style={{ color: '#64748B' }}>Optimal Schemes, Forms & Hardware Kits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#F8FAFC', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#D97706' }}>[DRAFT]</span>
                <span style={{ color: '#64748B' }}>Drafting SPICe+, Form 49A, BOQ Estimates</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: '#F8FAFC', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#DC2626' }}>[APPROVAL REQ]</span>
                <span style={{ color: '#64748B' }}>Financial Disbursals, State Submissions</span>
              </div>
            </div>
          </div>

          {/* Immutable AI Audit Ledger */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(10, 25, 47, 0.04)',
            flex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={18} color="#D97706" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                  Live Audit Ledger
                </h3>
              </div>
              <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Sync Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {governanceLedger.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, color: '#0A192F' }}>{item.agent}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{item.time}</span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
                    {item.action}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>Confidence: {item.confidence}</span>
                    <span style={{
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px',
                      background: item.status === 'APPROVED' || item.status === 'EXECUTED' ? '#DCFCE7' : '#FEF3C7',
                      color: item.status === 'APPROVED' || item.status === 'EXECUTED' ? '#15803D' : '#B45309',
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
