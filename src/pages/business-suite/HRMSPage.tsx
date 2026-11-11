import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  Download, 
  Printer,
  X,
  CheckCircle2,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { EmployeeRecord } from '../../types';

export const HRMSPage: React.FC = () => {
  const { employees, toggleEmployeeAttendance, logAudit, showToast } = useApp();
  
  const [activeTab, setActiveTab] = useState<'employees' | 'attendance' | 'payroll'>('employees');
  const [selectedPayslipEmp, setSelectedPayslipEmp] = useState<EmployeeRecord | null>(null);

  // Leave Modal State
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveEmpId, setLeaveEmpId] = useState(employees[0]?.id || '');
  const [leaveType, setLeaveType] = useState('Casual Leave (CL)');
  const [startDate, setStartDate] = useState('2026-11-15');
  const [endDate, setEndDate] = useState('2026-11-16');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveConfirmed, setLeaveConfirmed] = useState<string | null>(null);

  const presentCount = employees.filter(e => e.attendanceStatus === 'Present').length;
  const attendanceRate = Math.round((presentCount / employees.length) * 100) || 0;
  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

  const handleToggleAttendance = (emp: EmployeeRecord) => {
    toggleEmployeeAttendance(emp.id);
    const newStatus = emp.attendanceStatus === 'Present' ? 'Absent' : 'Present';
    logAudit('HR_ATTENDANCE', `Marked attendance for ${emp.name} as ${newStatus}`, 'Success');
  };

  const handleExportNEFTBatch = () => {
    const headers = 'Employee_ID,Beneficiary_Name,Account_Number,IFSC_Code,Gross_Salary,EPF_12,ESIC_075,PT_200,Net_Disbursement,Payment_Narration\n';
    const rows = employees.map(e => {
      const epf = Math.round(e.salary * 0.12);
      const esic = Math.round(e.salary * 0.0075);
      const deductions = epf + esic + 200;
      const net = e.salary - deductions;
      return `${e.id},"${e.name}",981002938102,ICIC0000102,${e.salary},${epf},${esic},200,${net},"ADCS_SALARY_NOV2026"`;
    }).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ADCS_Bank_Batch_NEFT_Payroll_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logAudit('HR_PAYROLL', `Exported NEFT salary batch for ${employees.length} employees`, 'Success');
    showToast('NEFT Export Generated', `✓ Official bank bulk upload CSV for ${employees.length} employees downloaded.`, 'success');
  };

  const handleApplyLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find(empItem => empItem.id === leaveEmpId) || employees[0];
    const leaveId = 'LEV-' + Math.floor(1000 + Math.random() * 9000);
    setLeaveConfirmed(leaveId);
    logAudit('HR_LEAVE', `Leave ${leaveId} approved for ${emp.name} (${leaveType}) from ${startDate} to ${endDate}`, 'Success');
    showToast('Leave Approved & Recorded', `Leave ${leaveId} recorded for ${emp.name}.`, 'success');
  };

  const handleDownloadPayslip = (emp: EmployeeRecord) => {
    const epf = Math.round(emp.salary * 0.12);
    const esic = Math.round(emp.salary * 0.0075);
    const net = emp.salary - epf - esic - 200;
    const payslipText = `===============================================================
AKUL DRAVIN DIGITAL SERVICES PRIVATE LIMITED
HEADQUARTERS: BAILEY ROAD COMMERCIAL ZONE, PATNA, BIHAR - 800001
OFFICIAL MONTHLY SALARY PAYSLIP • STATUTORY FORM 16 ANNEXURE
===============================================================
PAYSLIP ID:        PSL-${emp.id}-${Date.now().toString().slice(-4)}
DATE OF ISSUE:     ${new Date().toLocaleDateString('en-GB')}
EMPLOYEE NAME:     ${emp.name}
EMPLOYEE ID:       ${emp.id}
DEPARTMENT:        ${emp.department}
DESIGNATION:       ${emp.designation}
BANK A/C NO:       XXXXXX9381 (ICICI BANK)
IFSC CODE:         ICIC0000102
---------------------------------------------------------------
EARNINGS (GROSS)                            AMOUNT (INR)
1. Basic Pay & Dearness Allowance (DA):     ₹${Math.round(emp.salary * 0.6).toLocaleString('en-IN')}
2. House Rent Allowance (HRA):              ₹${Math.round(emp.salary * 0.25).toLocaleString('en-IN')}
3. Special Operational Allowance:           ₹${Math.round(emp.salary * 0.15).toLocaleString('en-IN')}
---------------------------------------------------------------
TOTAL GROSS CTC:                            ₹${emp.salary.toLocaleString('en-IN')}
---------------------------------------------------------------
STATUTORY DEDUCTIONS                        AMOUNT (INR)
1. Employee Provident Fund (EPF @ 12%):     ₹${epf.toLocaleString('en-IN')}
2. Employee State Insurance (ESIC @ 0.75%): ₹${esic.toLocaleString('en-IN')}
3. Professional Tax (PT):                   ₹200
---------------------------------------------------------------
TOTAL DEDUCTIONS:                           ₹${(epf + esic + 200).toLocaleString('en-IN')}
===============================================================
NET SALARY DISBURSED TO BANK:               ₹${net.toLocaleString('en-IN')}
===============================================================
Digital Signature: DIGITALLY SEALED BY DR. ALOK NATH VERMA (DIRECTOR - ADCS)
Statutory Note: Generated under Section 192 of the Income Tax Act, 1961.
===============================================================`;

    const blob = new Blob([payslipText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payslip_${emp.name.replace(/\s+/g, '_')}_Nov2026.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Payslip Downloaded', `Official digitally-signed Payslip for ${emp.name} downloaded successfully.`, 'success');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-navy">SECTION 26 ENTERPRISE HRMS</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Human Capital & Automated Payroll Engine</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
              Staff Operations, Attendance & Payroll
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
              Centralized workforce management for franchise service centers, cyber operators, and back-office legal consultants.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => { setShowLeaveModal(true); setLeaveConfirmed(null); }}
              className="btn btn-outline"
            >
              <Calendar size={16} /> Apply Staff Leave
            </button>
            <button 
              onClick={() => setSelectedPayslipEmp(employees[0])}
              className="btn btn-primary"
            >
              <FileText size={16} /> Generate Monthly Payslip
            </button>
          </div>
        </div>

        {/* HR Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL ROSTER HEADCOUNT</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              {employees.length} Personnel
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across 5 active departments</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRESENT TODAY</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981' }}>
              {presentCount} / {employees.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>{attendanceRate}% Daily compliance</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL MONTHLY PAYROLL</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
              ₹{totalPayroll.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>PF & ESIC compliant</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>BIOMETRIC STATUS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981', marginTop: '6px' }}>
              Real-Time Geofence Sync
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Aadhaar UIDAI Enabled</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          {[
            { id: 'employees', label: 'Employee Directory', icon: Users },
            { id: 'attendance', label: 'Live Daily Attendance Punch', icon: Clock },
            { id: 'payroll', label: 'Payroll & Salary Slips', icon: DollarSign }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                  background: isActive ? '#fff' : 'transparent',
                  color: isActive ? 'var(--primary-navy)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--border-color)' : 'none',
                  borderBottom: isActive ? '2px solid var(--primary-blue)' : 'none',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: EMPLOYEE DIRECTORY */}
        {activeTab === 'employees' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Registered Workforce Roster</h3>
              <span className="badge badge-navy">{employees.length} Active Records</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Employee ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Full Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Designation</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Department</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Today's Status</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Monthly CTC</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{emp.id}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{emp.name}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{emp.designation}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>{emp.department}</span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className={`badge ${emp.attendanceStatus === 'Present' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.75rem' }}>
                          {emp.attendanceStatus === 'Present' ? '● Present' : '○ Absent / Off'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>₹{emp.salary.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedPayslipEmp(emp)}
                          className="btn btn-sm btn-outline"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                        >
                          <FileText size={12} /> View Payslip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE PUNCH */}
        {activeTab === 'attendance' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.4rem' }}>
                Daily Geofenced Biometric & Manual Punch Terminal
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Click below to simulate employee check-in or check-out. Updates real-time presence indicators.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {employees.map(emp => {
                const isPresent = emp.attendanceStatus === 'Present';
                return (
                  <div
                    key={emp.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isPresent ? '#10B981' : 'var(--border-color)'}`,
                      background: isPresent ? 'rgba(16, 185, 129, 0.04)' : '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '1rem' }}>{emp.name}</h4>
                        <span className={`badge ${isPresent ? 'badge-green' : 'badge-navy'}`} style={{ fontSize: '0.7rem' }}>
                          {isPresent ? 'CHECKED IN' : 'AWAY'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{emp.designation} • {emp.department}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Performance Score: <strong>{emp.performanceScore}%</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAttendance(emp)}
                      className={`btn ${isPresent ? 'btn-outline' : 'btn-primary'}`}
                      style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
                    >
                      <Clock size={14} /> {isPresent ? 'Punch Out / Mark Absent' : 'Punch In (Check In)'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PAYROLL SLIPS */}
        {activeTab === 'payroll' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Monthly Statutory Payroll Register</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  Statutory EPF (12%), ESIC (0.75%), and Professional Tax computed on base CTC
                </p>
              </div>
              <button 
                onClick={handleExportNEFTBatch}
                className="btn btn-primary"
              >
                <Download size={15} /> Export Bank Batch NEFT
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-card-alt)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Employee</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Designation</th>
                    <th style={{ padding: '0.85rem 1rem' }}>CTC Gross</th>
                    <th style={{ padding: '0.85rem 1rem' }}>EPF (12%)</th>
                    <th style={{ padding: '0.85rem 1rem' }}>ESIC (0.75%)</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Net Take Home</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => {
                    const epf = Math.round(emp.salary * 0.12);
                    const esic = Math.round(emp.salary * 0.0075);
                    const netSalary = emp.salary - epf - esic - 200; // 200 PT
                    return (
                      <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>{emp.name}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{emp.designation}</td>
                        <td style={{ padding: '1rem', fontWeight: 700 }}>₹{emp.salary.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '1rem', color: '#EF4444' }}>-₹{epf.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '1rem', color: '#EF4444' }}>-₹{esic.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '1rem', fontWeight: 800, color: '#10B981' }}>₹{netSalary.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button 
                            onClick={() => setSelectedPayslipEmp(emp)}
                            className="btn btn-sm btn-outline"
                          >
                            <FileText size={14} /> Payslip
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* STAFF LEAVE REQUEST MODAL */}
        {showLeaveModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass-card" style={{
              background: '#FFFFFF',
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              {!leaveConfirmed ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <span className="badge badge-navy">STAFF LEAVE SYSTEM</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', margin: '0.25rem 0' }}>
                        Apply Staff Leave & Roster Absence
                      </h3>
                    </div>
                    <button onClick={() => setShowLeaveModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <X size={20} color="#64748B" />
                    </button>
                  </div>

                  <form onSubmit={handleApplyLeaveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Select Employee *</label>
                      <select
                        className="form-input"
                        value={leaveEmpId}
                        onChange={(e) => setLeaveEmpId(e.target.value)}
                      >
                        {employees.map(e => (
                          <option key={e.id} value={e.id}>
                            {e.name} ({e.designation} - {e.department})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Leave Category *</label>
                      <select
                        className="form-input"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                      >
                        <option value="Casual Leave (CL)">Casual Leave (CL) • 2 Days Balance</option>
                        <option value="Medical / Sick Leave (SL)">Medical / Sick Leave (SL) • 5 Days Balance</option>
                        <option value="Earned Privilege Leave (PL)">Earned Privilege Leave (PL) • 12 Days Balance</option>
                        <option value="Emergency Personal Leave">Emergency Personal Leave</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.8rem' }}>Start Date *</label>
                        <input
                          type="date"
                          required
                          className="form-input"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.8rem' }}>End Date *</label>
                        <input
                          type="date"
                          required
                          className="form-input"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Reason for Absence *</label>
                      <textarea
                        required
                        rows={2}
                        className="form-textarea"
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        placeholder="State purpose of leave (e.g. Family function, medical emergency)..."
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button type="button" onClick={() => setShowLeaveModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1.5 }}>
                        Approve & Record Leave
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: '#DCFCE7',
                    color: '#16A34A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.35rem' }}>
                    Staff Leave Formally Approved
                  </h3>
                  <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: 'var(--radius-sm)', margin: '1rem 0', textAlign: 'left', fontSize: '0.85rem' }}>
                    <div>Ref Token: <strong style={{ color: '#1D4ED8' }}>{leaveConfirmed}</strong></div>
                    <div>Leave Type: <strong>{leaveType}</strong></div>
                    <div>Duration: <strong>{startDate} to {endDate}</strong></div>
                  </div>
                  <button onClick={() => setShowLeaveModal(false)} className="btn btn-primary" style={{ width: '100%' }}>
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAYSLIP MODAL */}
        {selectedPayslipEmp && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass-card" style={{
              background: '#FFFFFF',
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--primary-navy)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-navy)' }}>AKUL DRAVIN DIGITAL SERVICES</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Monthly Payslip • Form 16 Annexure</div>
                </div>
                <span className="badge badge-navy">CONFIDENTIAL</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Employee Name:</span> <strong>{selectedPayslipEmp.name}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Employee ID:</span> <strong>{selectedPayslipEmp.id}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Department:</span> <strong>{selectedPayslipEmp.department}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Designation:</span> <strong>{selectedPayslipEmp.designation}</strong></div>
              </div>

              <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Base Gross Salary (Monthly CTC):</span>
                  <strong>₹{selectedPayslipEmp.salary.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EF4444', marginBottom: '0.35rem' }}>
                  <span>Employee PF Contribution (12%):</span>
                  <span>-₹{Math.round(selectedPayslipEmp.salary * 0.12).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EF4444', marginBottom: '0.35rem' }}>
                  <span>Employee ESIC (0.75%):</span>
                  <span>-₹{Math.round(selectedPayslipEmp.salary * 0.0075).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EF4444', marginBottom: '0.5rem' }}>
                  <span>Professional Tax (PT):</span>
                  <span>-₹200</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem', color: '#10B981' }}>
                  <span>Net Disbursed Take-Home:</span>
                  <span>
                    ₹{(selectedPayslipEmp.salary - Math.round(selectedPayslipEmp.salary * 0.1275) - 200).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button onClick={() => setSelectedPayslipEmp(null)} className="btn btn-outline">Close</button>
                <button 
                  onClick={() => handleDownloadPayslip(selectedPayslipEmp)} 
                  className="btn btn-primary"
                >
                  <Download size={16} /> Download Signed PDF
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
