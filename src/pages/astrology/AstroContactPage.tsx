import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { ASTRO_FAQS } from '../../data/astrologyData';
import { MessageSquare, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Send } from 'lucide-react';

export const AstroContactPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Career & Business');
  const [question, setQuestion] = useState('');
  const [birthDetails, setBirthDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PRASHNA-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(newId);
    setFormSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div style={{ background: '#031126', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Hero Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 70%)',
        padding: '40px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <MessageSquare size={14} color="#F59E0B" /> प्रश्न कुंडली एवं प्रत्यक्ष सहायता
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            ज्योतिषी से प्रश्न पूछें एवं संपर्क केंद्र
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            यदि आपके पास जन्म समय नहीं है, तो प्रश्न कुंडली द्वारा तात्कालिक सटीक मार्गदर्शन प्राप्त करें या हमारे केंद्र से संपर्क करें।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'start', marginBottom: '40px' }}>
          
          {/* Ask Astrologer / Prashna Form */}
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#FDE68A', fontWeight: 700 }}>
              ✍️ अपना प्रश्न दर्ज करें (Ask Your Question)
            </h3>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ margin: '0 0 8px', color: '#FDE68A', fontSize: '18px' }}>
                  आपका प्रश्न सफलतापूर्वक दर्ज कर लिया गया है!
                </h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                  संदर्भ टोकन संख्या: <strong style={{ color: '#F59E0B' }}>{ticketId}</strong>
                </p>
                <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6, background: '#0F172A', padding: '12px', borderRadius: '8px' }}>
                  हमारे वरिष्ठ वैदिक ज्योतिषाचार्य आपकी प्रश्न कुंडली का सूक्ष्म परीक्षण कर 4 से 6 कार्य घंटों में विस्तृत समाधान आपके व्हाट्सएप एवं ईमेल पर भेजेंगे।
                </p>

                <button
                  onClick={() => setFormSubmitted(false)}
                  style={{
                    marginTop: '20px',
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '999px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  अन्य प्रश्न पूछें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    आपका पूरा नाम:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राहुल कुमार शर्मा"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                      व्हाट्सएप नंबर:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#0F172A',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#FFFFFF',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                      ईमेल पता:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#0F172A',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#FFFFFF',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    प्रश्न की श्रेणी:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  >
                    <option value="Career & Business">करियर, नौकरी एवं व्यापार</option>
                    <option value="Marriage & Love">विवाह, प्रेम संबंध एवं दांपत्य</option>
                    <option value="Finance & Wealth">आर्थिक तंगी, कर्ज एवं रुका हुआ धन</option>
                    <option value="Health & Healing">स्वास्थ्य एवं रोग निवारण</option>
                    <option value="Child & Progeny">संतान सुख एवं विद्या</option>
                    <option value="Dosha & Remedies">कालसर्प, मांगलिक या साढ़ेसाती शांति</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    जन्म विवरण (तिथि, समय, स्थान - यदि ज्ञात हो):
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 15 मई 1994, प्रातः 07:15, वाराणसी (वैकल्पिक)"
                    value={birthDetails}
                    onChange={(e) => setBirthDetails(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    विस्तृत प्रश्न:
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="अपनी समस्या या प्रश्न का विस्तार से वर्णन करें ताकि सटीक कुंडली फलादेश निकाला जा सके..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '8px',
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)'
                  }}
                >
                  <Send size={16} /> प्रश्न जमा करें (Submit Prashna)
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Direct WhatsApp Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* WhatsApp Direct Help */}
            <div style={{
              background: 'linear-gradient(135deg, #064E3B 0%, #0F172A 100%)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
            }}>
              <span style={{ fontSize: '11px', color: '#A7F3D0', fontWeight: 700, textTransform: 'uppercase' }}>
                तात्कालिक 1-ऑन-1 परामर्श
              </span>
              <h3 style={{ margin: '6px 0 10px', fontSize: '18px', color: '#FDE68A', fontWeight: 800 }}>
                व्हाट्सएप पर तुरंत ज्योतिषी से जुड़ें
              </h3>
              <p style={{ margin: '0 0 18px', fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                कतार में प्रतीक्षा किए बिना सीधे हमारे वरिष्ठ ज्योतिषाचार्य से व्हाट्सएप चैट पर समाधान प्राप्त करें।
              </p>

              <a
                href="https://wa.me/919876543210?text=नमस्ते%20आचार्य%20जी,%20मुझे%20अपनी%20कुंडली%20के%20बारे%20में%20परामर्श%20चाहिए।"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)'
                }}
              >
                <span>💬</span> व्हाट्सएप पर चैट शुरू करें
              </a>
            </div>

            {/* Physical Location Card */}
            <div style={{
              background: '#1E293B',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 14px', fontSize: '16px', color: '#FDE68A', fontWeight: 700 }}>
                📍 वैदिक ज्योतिष अनुसंधान केंद्र
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#CBD5E1' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>मुख्य कार्यालय:</strong> दशाश्वमेध घाट रोड, काशी (वाराणसी), उत्तर प्रदेश - 221001
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Phone size={18} color="#10B981" style={{ flexShrink: 0 }} />
                  <div>+91 98765 43210 / +91 80000 12345</div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Mail size={18} color="#3B82F6" style={{ flexShrink: 0 }} />
                  <div>astrology@ad-digital.in</div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Clock size={18} color="#C084FC" style={{ flexShrink: 0 }} />
                  <div>परामर्श समय: प्रातः 08:00 AM से रात्रि 10:00 PM (सातों दिन)</div>
                </div>
              </div>

              {/* Google Maps Simulation Card */}
              <div style={{
                marginTop: '16px',
                height: '140px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                fontSize: '12px'
              }}>
                <MapPin size={24} color="#EF4444" style={{ marginBottom: '6px' }} />
                <span>Google Maps: काशी विश्वनाथ ज्योतिर्लिंग क्षेत्र</span>
                <span style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>अक्षांश: 25.3176° N, देशांतर: 82.9739° E</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{
          background: '#1E293B',
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '20px', color: '#FDE68A', fontWeight: 800 }}>
            ❓ अक्सर पूछे जाने वाले प्रश्न (FAQ)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ASTRO_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#0F172A',
                    borderRadius: '12px',
                    border: isOpen ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.06)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.qHi}</span>
                    {isOpen ? <ChevronUp size={18} color="#F59E0B" /> : <ChevronDown size={18} color="#94A3B8" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 18px 16px', fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6 }}>
                      <p style={{ margin: 0 }}>{faq.aHi}</p>
                      <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94A3B8', fontStyle: 'italic' }}>{faq.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
