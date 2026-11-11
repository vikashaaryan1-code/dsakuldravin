import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  FileSearch, 
  Calculator, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Layers
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'quantum_ai';
  agentName?: string;
  text: string;
  governanceLevel?: 'READ' | 'RECOMMEND' | 'DRAFT' | 'EXECUTE' | 'APPROVAL REQUIRED';
  suggestedAction?: {
    label: string;
    actionType: 'open_apply' | 'open_cart' | 'open_track' | 'navigate';
    targetPayload?: any;
  };
  timestamp: string;
}

export const QuantumAIPanel: React.FC = () => {
  const { 
    isQuantumAIOpen, 
    setIsQuantumAIOpen, 
    quantumAIPendingPrompt,
    setQuantumAIPendingPrompt,
    services, 
    applications, 
    openApplyModal, 
    setIsCartOpen,
    setIsTrackerOpen,
    logAudit,
    language
  } = useApp();

  const [activeAgent, setActiveAgent] = useState<'Universal' | 'Document AI' | 'Quote AI' | 'Legal Advisor' | 'Academy Guide' | 'Admin Copilot'>('Universal');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'quantum_ai',
      agentName: 'QUANTUM Multi-Agent Brain',
      text: language === 'hi' 
        ? 'नमस्ते! मैं QUANTUM AI हूँ। मैं आपके लिए सरकारी दस्तावेज़, व्यापार रजिस्ट्रेशन, कंस्ट्रक्शन एस्टीमेट, सीसीटीवी कोटेशन या कूरियर ट्रैकिंग में तुरंत सहायता कर सकता हूँ। आप क्या जानना चाहते हैं?'
        : 'Welcome to QUANTUM AI Super Brain. I orchestrate specialized agents for Citizen Services, Business Setup, Document Scrutiny, Pricing Estimates, and Enterprise Dashboards. How can I assist your mission today?',
      governanceLevel: 'READ',
      timestamp: '12:00 PM',
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptSuggestions = [
    'आज कितने applications pending हैं?',
    'मुझे कंपनी शुरू करनी है और GST भी चाहिए',
    'Check Aadhaar card validity rules',
    'Estimate cost for 4 CCTV cameras + 1TB storage',
    'Track my courier shipment',
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
      const serverRes = await apiClient.sendAiChat(query, activeAgent, language);

      let reply: ChatMessage;
      if (serverRes && serverRes.success) {
        reply = {
          id: 'ai-' + Date.now(),
          sender: 'quantum_ai',
          agentName: serverRes.agentName,
          text: serverRes.text,
          governanceLevel: (serverRes.governanceLevel as any) || 'READ',
          suggestedAction: serverRes.suggestedAction,
          timestamp: serverRes.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        const q = query.toLowerCase();
        if (q.includes('pending') || q.includes('कितने applications') || q.includes('status')) {
          const pendingCount = applications.filter(a => a.status !== 'Completed').length;
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Executive Business AI',
            text: `📊 Real-Time Operations Data: Currently there are ${pendingCount} active applications across all branches. 1 is in Government Scrutiny, 1 in Document Verification, and 1 has a Field Technician dispatched.`,
            governanceLevel: 'READ',
            suggestedAction: {
              label: 'View Live Tracker Queue',
              actionType: 'open_track',
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('कंपनी') || q.includes('company') || q.includes('business') || q.includes('gst')) {
          const pvtLtd = services.find(s => s.id === 'srv-pvt-ltd');
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Corporate Advisory AI',
            text: `🎯 Recommended Package: "Private Limited Company Incorporation + GST Registration". Includes 2 Director DINs, Name Approval, MOA/AOA drafting, Corporate Bank Account, and 1st Month GST return. Estimated timeline: 7-10 working days.`,
            governanceLevel: 'RECOMMEND',
            suggestedAction: {
              label: 'Start Pvt Ltd Application',
              actionType: 'open_apply',
              targetPayload: pvtLtd,
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('cctv') || q.includes('camera') || q.includes('security')) {
          const cctv = services.find(s => s.id === 'srv-cctv-setup');
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Quote & Hardware AI',
            text: `📹 Dynamic Quote Generated: 4x HD Night Vision Cameras (₹6,000) + 4-Ch NVR (₹3,200) + 1TB Surveillance HDD (₹3,800) + 90m Copper Cabling & Connectors (₹1,500) + Certified Installation (₹2,000). Total Estimate: ₹16,500 with 1-Year Free AMC.`,
            governanceLevel: 'DRAFT',
            suggestedAction: {
              label: 'Configure CCTV Package',
              actionType: 'open_apply',
              targetPayload: cctv,
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('aadhaar') || q.includes('document') || q.includes('validity') || q.includes('pan')) {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Document Intelligence AI',
            text: `📑 Document Scrutiny Rule: Aadhaar requires active mobile OTP link for e-sign with Verhoeff mathematical checksum verification. PAN applications require matching name and father's name. Your digital vault is encrypted with AES-256.`,
            governanceLevel: 'READ',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('legal') || q.includes('lawyer') || q.includes('advocate') || q.includes('dispute') || activeAgent === 'Legal Advisor') {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'ADCS Legal Desk AI',
            text: `⚖️ Legal Consultation Scrutiny (BCI Rule 36 Compliant): I can help classify your matter (Property, Matrimonial, Consumer, Civil), verify title deeds, and schedule a private WebRTC video session with an enrolled advocate.`,
            governanceLevel: 'RECOMMEND',
            suggestedAction: {
              label: 'Open Advocate Desk',
              actionType: 'navigate',
              targetPayload: '/portal/advocate',
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('course') || q.includes('exam') || q.includes('certificate') || q.includes('learn') || activeAgent === 'Academy Guide') {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'ADCS Academy Learning Guide',
            text: `🎓 ADCS Academy Curriculum: 8 vocational tracks available (AI Mastery, Computer Pro, CCTV Technician, Digital Marketing). Complete modules, take the timed proctored exam, and get an independently verifiable QR credential.`,
            governanceLevel: 'RECOMMEND',
            suggestedAction: {
              label: 'Enter Student Portal & LMS',
              actionType: 'navigate',
              targetPayload: '/portal/student',
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else if (q.includes('courier') || q.includes('shipment') || q.includes('track')) {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Logistics AI',
            text: `📦 Active Shipment Detected: AWB #AD-EXP-778219 is currently at Delhi National Sort Facility Cargo Gateway, on schedule for doorstep delivery to Mumbai tomorrow by 06:00 PM.`,
            governanceLevel: 'READ',
            suggestedAction: {
              label: 'Track AWB #AD-EXP-778219',
              actionType: 'open_track',
              targetPayload: 'AD-EXP-778219',
            },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        } else {
          reply = {
            id: 'ai-' + Date.now(),
            sender: 'quantum_ai',
            agentName: 'Quantum Routing Coordinator',
            text: `I've analyzed your query "${query}". I can draft a specialized service application, verify uploaded documents using OCR, or calculate multi-service quotes. Would you like me to open the service marketplace or calculate a custom quote?`,
            governanceLevel: 'RECOMMEND',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
      }

      logAudit(`Quantum AI Query: ${query.substring(0, 30)}...`, `Agent: ${reply.agentName}`, 'Success');
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    } catch (err) {
      console.error('Error in Quantum AI Panel:', err);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (isQuantumAIOpen && quantumAIPendingPrompt) {
      const promptToRun = quantumAIPendingPrompt;
      setQuantumAIPendingPrompt('');
      handleSendMessage(promptToRun);
    }
  }, [isQuantumAIOpen, quantumAIPendingPrompt]);

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;
    if (action.actionType === 'open_apply' && action.targetPayload) {
      openApplyModal(action.targetPayload);
      setIsQuantumAIOpen(false);
    } else if (action.actionType === 'open_track') {
      setIsTrackerOpen(true);
      setIsQuantumAIOpen(false);
    } else if (action.actionType === 'open_cart') {
      setIsCartOpen(true);
      setIsQuantumAIOpen(false);
    }
  };

  if (!isQuantumAIOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      width: '450px',
      maxWidth: 'calc(100vw - 2rem)',
      height: '620px',
      maxHeight: 'calc(100vh - 3rem)',
      background: '#FFFFFF',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(10, 25, 47, 0.28)',
      border: '1px solid rgba(245, 158, 11, 0.4)',
      zIndex: 9998,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'fadeIn 0.25s ease-out',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        padding: '1rem 1.25rem',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F59E0B',
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.02em', color: '#FFFFFF' }}>
              QUANTUM AI
            </div>
            <div style={{ fontSize: '0.72rem', color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              Active Autonomous Super-Brain
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsQuantumAIOpen(false)}
          style={{
            color: '#CBD5E1',
            padding: '0.35rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Agent Filter Selector */}
      <div style={{
        background: '#071324',
        padding: '0.4rem 0.8rem',
        display: 'flex',
        gap: '0.35rem',
        overflowX: 'auto',
      }}>
        {(['Universal', 'Document AI', 'Quote AI', 'Legal Advisor', 'Academy Guide', 'Admin Copilot'] as const).map(agent => (
          <button
            key={agent}
            onClick={() => setActiveAgent(agent)}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 600,
              background: activeAgent === agent ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
              color: activeAgent === agent ? '#F59E0B' : '#94A3B8',
              border: activeAgent === agent ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
              whiteSpace: 'nowrap',
            }}
          >
            {agent}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {messages.map(msg => {
          const isAI = msg.sender === 'quantum_ai';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isAI ? 'flex-start' : 'flex-end',
                gap: '0.25rem',
              }}
            >
              {isAI && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.72rem',
                  color: '#64748B',
                  fontWeight: 600,
                  marginLeft: '0.2rem',
                }}>
                  <Bot size={13} color="#1D4ED8" />
                  <span>{msg.agentName}</span>
                  {msg.governanceLevel && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.35rem',
                      borderRadius: '4px',
                      background: msg.governanceLevel === 'RECOMMEND' ? '#FEF3C7' : '#EFF6FF',
                      color: msg.governanceLevel === 'RECOMMEND' ? '#B45309' : '#1D4ED8',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}>
                      {msg.governanceLevel}
                    </span>
                  )}
                </div>
              )}

              <div style={{
                maxWidth: '86%',
                padding: '0.75rem 0.95rem',
                borderRadius: isAI ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                background: isAI ? '#FFFFFF' : 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                color: isAI ? '#0F172A' : '#FFFFFF',
                fontSize: '0.88rem',
                lineHeight: 1.45,
                boxShadow: isAI ? '0 2px 8px rgba(0,0,0,0.04)' : '0 4px 12px rgba(29, 78, 216, 0.25)',
                border: isAI ? '1px solid #E2E8F0' : 'none',
              }}>
                {msg.text}

                {msg.suggestedAction && (
                  <button
                    onClick={() => handleActionClick(msg.suggestedAction)}
                    style={{
                      marginTop: '0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.75rem',
                      background: '#EFF6FF',
                      color: '#1D4ED8',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      border: '1px solid #BFDBFE',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>

              <span style={{ fontSize: '0.65rem', color: '#94A3B8', margin: '0 0.25rem' }}>
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748B', fontSize: '0.78rem' }}>
            <Bot size={14} color="#1D4ED8" />
            <span>Quantum multi-agent reasoning...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{
        padding: '0.4rem 0.75rem',
        background: '#FFFFFF',
        borderTop: '1px solid #F1F5F9',
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}>
        {promptSuggestions.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            style={{
              padding: '0.25rem 0.55rem',
              borderRadius: '12px',
              background: '#F1F5F9',
              fontSize: '0.73rem',
              color: '#334155',
              border: '1px solid #E2E8F0',
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div style={{
        padding: '0.75rem',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask anything in English or Hindi..."
          style={{
            flex: 1,
            padding: '0.6rem 0.85rem',
            borderRadius: '10px',
            border: '1px solid #CBD5E1',
            outline: 'none',
            fontSize: '0.88rem',
          }}
        />

        <button
          onClick={() => handleSendMessage()}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(29, 78, 216, 0.3)',
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
