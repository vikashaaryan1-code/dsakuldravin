import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  X, 
  Compass, 
  Search, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  User, 
  Phone, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const UniversalTrackerModal: React.FC = () => {
  const { 
    isTrackerOpen, 
    setIsTrackerOpen, 
    applications, 
    shipments, 
    activeTrackerQuery, 
    setActiveTrackerQuery 
  } = useApp();

  const [inputQuery, setInputQuery] = useState(activeTrackerQuery || 'AD-APP-9102');
  const [searchedEntity, setSearchedEntity] = useState<any>(() => {
    return applications[0] || null;
  });

  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    // Check in applications
    const foundApp = applications.find(a => 
      a.id.toLowerCase() === trimmed.toLowerCase() ||
      a.applicantPhone.includes(trimmed) ||
      a.applicantEmail.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (foundApp) {
      setSearchedEntity({ type: 'application', data: foundApp });
      return;
    }

    // Check in shipments
    const foundShipment = shipments.find(s => 
      s.awb.toLowerCase() === trimmed.toLowerCase() ||
      s.id.toLowerCase() === trimmed.toLowerCase()
    );

    if (foundShipment) {
      setSearchedEntity({ type: 'shipment', data: foundShipment });
      return;
    }

    setSearchedEntity(null);
  };

  React.useEffect(() => {
    if (activeTrackerQuery) {
      setInputQuery(activeTrackerQuery);
      handleSearch(activeTrackerQuery);
    }
  }, [activeTrackerQuery, isTrackerOpen]);

  if (!isTrackerOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 25, 47, 0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease-out',
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '750px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#061A36',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36' }}>
                Universal Application & Order Tracker
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Real-Time Milestone Timeline • Document Status • Assigned Executive
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackerOpen(false)}
            style={{ padding: '0.4rem', color: '#64748B', borderRadius: '8px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          background: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          gap: '0.65rem',
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F8FAFC',
            padding: '0.6rem 0.95rem',
            borderRadius: '10px',
            border: '1px solid #CBD5E1',
          }}>
            <Search size={16} color="#64748B" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Enter Application ID (AD-APP-9102) or AWB (AD-EXP-778219)..."
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#061A36',
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(inputQuery)}
            />
          </div>

          <button
            onClick={() => handleSearch(inputQuery)}
            className="btn-primary"
            style={{ padding: '0.6rem 1.25rem' }}
          >
            Track Status
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{
          padding: '0.5rem 1.5rem',
          background: '#F8FAFC',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          overflowX: 'auto',
          fontSize: '0.75rem',
        }}>
          <span style={{ fontWeight: 700, color: '#64748B' }}>Quick Samples:</span>
          {applications.map(app => (
            <button
              key={app.id}
              onClick={() => {
                setInputQuery(app.id);
                setSearchedEntity({ type: 'application', data: app });
              }}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#075ACB',
                fontWeight: 600,
              }}
            >
              {app.id}
            </button>
          ))}
          {shipments.map(shp => (
            <button
              key={shp.awb}
              onClick={() => {
                setInputQuery(shp.awb);
                setSearchedEntity({ type: 'shipment', data: shp });
              }}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#D97706',
                fontWeight: 600,
              }}
            >
              {shp.awb}
            </button>
          ))}
        </div>

        {/* Tracker Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {!searchedEntity ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
              <AlertCircle size={40} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#061A36', marginBottom: '0.25rem' }}>
                No Application or Order Found
              </h4>
              <p style={{ fontSize: '0.85rem' }}>
                Please check the token number or select one of the active sample tokens above.
              </p>
            </div>
          ) : searchedEntity.type === 'application' || searchedEntity.id?.startsWith('AD-APP') ? (
            (() => {
              const app = searchedEntity.data || searchedEntity;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Entity Details Card */}
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid #E2E8F0',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36' }}>
                            {app.id}
                          </span>
                          <span className={`badge ${app.status === 'Completed' ? 'badge-green' : 'badge-blue'}`}>
                            {app.status}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#075ACB' }}>
                          {app.serviceName}
                        </h4>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Submitted on</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#061A36' }}>{app.submittedAt}</div>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #E2E8F0',
                      fontSize: '0.82rem',
                    }}>
                      <div>
                        <div style={{ color: '#64748B' }}>Applicant Name:</div>
                        <div style={{ fontWeight: 600, color: '#061A36' }}>{app.applicantName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Assigned Officer:</div>
                        <div style={{ fontWeight: 600, color: '#061A36' }}>{app.assignedTo || 'Regional Queue'}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Location / Branch:</div>
                        <div style={{ fontWeight: 600, color: '#061A36' }}>{app.city}, {app.state}</div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Milestone Timeline */}
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#061A36', marginBottom: '1rem' }}>
                      Live Progress Lifecycle
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      {app.trackingSteps.map((step: any, index: number) => {
                        const isLast = index === app.trackingSteps.length - 1;
                        return (
                          <div key={index} style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: step.isCompleted ? '#059669' : step.isCurrent ? '#075ACB' : '#E2E8F0',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                boxShadow: step.isCurrent ? '0 0 10px rgba(29, 78, 216, 0.4)' : 'none',
                              }}>
                                {step.isCompleted ? <CheckCircle2 size={16} /> : index + 1}
                              </div>
                              {!isLast && (
                                <div style={{
                                  width: '2px',
                                  height: '48px',
                                  background: step.isCompleted ? '#059669' : '#E2E8F0',
                                  margin: '4px 0',
                                }} />
                              )}
                            </div>

                            <div style={{ paddingBottom: '1.25rem', flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: step.isCurrent ? '#075ACB' : '#061A36' }}>
                                  {step.title}
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
                                  {step.date}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.2rem' }}>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            // Courier Shipment Track view
            (() => {
              const shp = searchedEntity.data || searchedEntity;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{
                    background: '#FEF3C7',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    border: '1px solid #FDE68A',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#B45309' }}>COURIER AWB TRACKING</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36' }}>{shp.awb}</div>
                      <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.2rem' }}>
                        From {shp.senderCity} ➔ To {shp.receiverCity} ({shp.serviceType})
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-gold">{shp.status}</span>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.5rem' }}>
                        Expected: {shp.expectedDelivery}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {shp.timeline.map((item: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: item.done ? '#D97706' : '#E2E8F0',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                          }}>
                            {item.done ? <CheckCircle2 size={15} /> : idx + 1}
                          </div>
                          {idx < shp.timeline.length - 1 && (
                            <div style={{ width: '2px', height: '40px', background: item.done ? '#D97706' : '#E2E8F0' }} />
                          )}
                        </div>
                        <div style={{ paddingBottom: '1rem', flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#061A36' }}>
                            {item.stage}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                            {item.location} • {item.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};
