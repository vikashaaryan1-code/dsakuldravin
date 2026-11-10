import React, { useState, useEffect, useRef } from 'react';
import { AstrologerProfile } from '../../types/astrology';
import { X, Send, Phone, Video, ShieldCheck, Clock, Sparkles, User, Award } from 'lucide-react';

interface AstrologerChatModalProps {
  astrologer: AstrologerProfile;
  onClose: () => void;
  initialUserName?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'astrologer';
  text: string;
  timestamp: string;
}

export const AstrologerChatModal: React.FC<AstrologerChatModalProps> = ({
  astrologer,
  onClose,
  initialUserName = 'जातक'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'astrologer',
      text: `नमस्ते ${initialUserName} जी! 🙏 मैं ${astrologer.nameHi} हूँ। आपकी जन्म कुंडली और गोचर ग्रहों का अध्ययन कर रहा हूँ। आज आप किस विषय में मार्गदर्शन चाहते हैं?`,
      timestamp: 'अभी'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt pills
  const quickPrompts = [
    'मेरे विवाह एवं जीवनसाथी के योग कब बनेंगे?',
    'करियर में पदोन्नति और नया व्यापार कब शुरू करें?',
    'आर्थिक स्थिरता और धन लाभ के लिए कौन सा उपाय करें?',
    'मेरे लिए कौन सा रत्न या रुद्राक्ष शुभ रहेगा?'
  ];

  // Duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDurationSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Trigger Astrologer intelligent simulated response
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('विवाह') || lower.includes('marriage') || lower.includes('शादी')) {
        reply = `आपकी कुंडली के सप्तम भाव और गुरु की शुभ दृष्टि से आने वाले 6 से 11 महीनों में विवाह के अति शुभ योग बन रहे हैं। जीवनसाथी धार्मिक, संस्कारी और आर्थिक रूप से समर्थ होगा। गुरु मंत्र का जप एवं गुरुवार को चने की दाल का दान आपके लिए विशेष कल्याणकारी रहेगा।`;
      } else if (lower.includes('करियर') || lower.includes('नौकरी') || lower.includes('व्यापार') || lower.includes('job') || lower.includes('career')) {
        reply = `दशमेश सूर्य और बुध की युति आपके करियर में बड़े बदलाव के संकेत दे रही है। आगामी 3 माह में पदोन्नति या नए व्यापारिक अनुबंध का योग है। नित्य प्रातः सूर्य को तांबे के लोटे से अर्घ्य दें और महत्वपूर्ण बैठक में हरे या सफेद वस्त्र पहनें।`;
      } else if (lower.includes('रत्न') || lower.includes('gemstone') || lower.includes('रुद्राक्ष')) {
        reply = `आपकी लग्न राशि की ऊर्जा के अनुसार प्राकृतिक पन्ना (Emerald) या पीला पुखराज (Yellow Sapphire) आपके भाग्य भाव को अत्यंत सक्रिय करेगा। साथ ही मानसिक शांति के लिए पंचमुखी रुद्राक्ष माला धारण करना उत्तम है।`;
      } else if (lower.includes('धन') || lower.includes('पैसा') || lower.includes('finance')) {
        reply = `द्वितीय और एकादश भाव की स्थिति से ज्ञात होता है कि रुका हुआ धन शीघ्र वापस मिलेगा। शुक्रवार को मां महालक्ष्मी को खीर का भोग लगाएं और श्रीयंत्र की पूजा करें, धन का सतत आगमन होगा।`;
      } else {
        reply = `बहुत सुंदर प्रश्न है। ग्रहों की स्थिति दर्शाती है कि आपकी कुंडली में गजकेसरी योग का प्रभाव सक्रिय हो रहा है। धैर्य बनाए रखें, अगले कुछ सप्ताह आपके पक्ष में सकारात्मक परिवर्तन लाएंगे। मैं इसके निवारण हेतु विशेष वैदिक अनुष्ठान भी सुझा रहा हूँ।`;
      }

      const astroMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'astrologer',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setIsTyping(false);
      setMessages(prev => [...prev, astroMsg]);
    }, 1800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#0F172A',
        width: '100%',
        maxWidth: '560px',
        height: '620px',
        borderRadius: '24px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(217, 119, 6, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={astrologer.avatarUrl}
                alt={astrologer.nameHi}
                style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #F59E0B' }}
              />
              <span style={{
                position: 'absolute',
                bottom: '1px',
                right: '1px',
                width: '12px',
                height: '12px',
                background: '#10B981',
                borderRadius: '50%',
                border: '2px solid #0F172A'
              }} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h4 style={{ margin: 0, color: '#FDE68A', fontSize: '16px', fontWeight: 700 }}>
                  {astrologer.nameHi}
                </h4>
                <ShieldCheck size={16} color="#10B981" />
              </div>
              <p style={{ margin: '2px 0 0', color: '#94A3B8', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>★ {astrologer.rating}</span>
                <span>•</span>
                <span>{astrologer.experienceYears}+ वर्ष अनुभव</span>
                <span>•</span>
                <span style={{ color: '#F59E0B' }}>₹{astrologer.chatRatePerMin}/मिनट</span>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '999px',
              padding: '4px 10px',
              color: '#FDE68A',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Clock size={12} />
              {formatTimer(durationSeconds)}
            </div>

            <button
              onClick={onClose}
              style={{
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          background: 'radial-gradient(ellipse at bottom, #1E1B4B 0%, #0F172A 70%)'
        }}>
          {/* Security Banner */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#A7F3D0',
            textAlign: 'center'
          }}>
            🔒 100% गोपनीय एवं सुरक्षित ज्योतिषीय परामर्श सत्र | वैदिक वैदिक गणना द्वारा संचालित
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '82%',
                background: m.sender === 'user' 
                  ? 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' 
                  : 'rgba(30, 41, 59, 0.95)',
                color: m.sender === 'user' ? '#FFFFFF' : '#E2E8F0',
                padding: '12px 16px',
                borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                border: m.sender === 'astrologer' ? '1px solid rgba(245, 158, 11, 0.25)' : 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                fontSize: '13px',
                lineHeight: 1.5
              }}>
                <div>{m.text}</div>
                <div style={{
                  textAlign: 'right',
                  fontSize: '10px',
                  opacity: 0.65,
                  marginTop: '4px'
                }}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FDE68A', fontSize: '12px' }}>
              <Sparkles size={14} className="animate-spin" />
              <span>{astrologer.nameHi} कुंडली का फलादेश लिख रहे हैं...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Pills */}
        <div style={{
          padding: '8px 16px',
          background: '#0B1120',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          gap: '8px'
        }}>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              style={{
                fontSize: '11px',
                color: '#FDE68A',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                padding: '4px 10px',
                borderRadius: '999px',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '12px 16px',
          background: '#1E293B',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="अपना प्रश्न यहाँ लिखें (उदा. करियर, विवाह, उपाय)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '999px',
              padding: '10px 18px',
              color: '#FFFFFF',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            style={{
              background: inputText.trim() ? '#D97706' : 'rgba(217, 119, 6, 0.4)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputText.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
