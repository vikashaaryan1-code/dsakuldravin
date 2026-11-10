/**
 * AKUL DRAVIN CLOUD AI • Universal Unified API Client
 * Connects seamlessly to the backend API Gateway with transparent graceful fallback
 * to offline / local state if the network or backend is unreachable.
 */

const API_BASE = '/api';

async function fetchJSON<T>(url: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      console.warn(`[apiClient] HTTP ${res.status} on ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.info(`[apiClient] Offline or unreachable (${url}), engaging local fallback mode.`);
    return null;
  }
}

export const apiClient = {
  /**
   * Health & Microservice Status
   */
  async checkHealth() {
    return fetchJSON<{
      status: string;
      version: string;
      platform: string;
      uptimeSeconds: number;
      modules: string[];
    }>(`${API_BASE}/health`);
  },

  /**
   * Services Catalog
   */
  async getServices(category?: string) {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return fetchJSON<{ success: boolean; count: number; services: any[] }>(`${API_BASE}/services${query}`);
  },

  async addService(service: any) {
    return fetchJSON<{ success: boolean; service: any }>(`${API_BASE}/services`, {
      method: 'POST',
      body: JSON.stringify(service)
    });
  },

  /**
   * Citizen & Enterprise Applications
   */
  async getApplications() {
    return fetchJSON<{ success: boolean; count: number; applications: any[] }>(`${API_BASE}/applications`);
  },

  async submitApplication(appData: any) {
    return fetchJSON<{ success: boolean; application: any; trackingNumber: string }>(`${API_BASE}/applications`, {
      method: 'POST',
      body: JSON.stringify(appData)
    });
  },

  async updateApplicationStatus(id: string, status: string, notes?: string, actorRole?: string) {
    return fetchJSON<{ success: boolean; application: any }>(`${API_BASE}/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes, actorRole })
    });
  },

  async trackApplication(trackingNumber: string) {
    return fetchJSON<{ success: boolean; record: any }>(`${API_BASE}/applications/track/${encodeURIComponent(trackingNumber)}`);
  },

  /**
   * Authentication & OTP Verification
   */
  async login(phone: string, role = 'customer') {
    return fetchJSON<{ success: boolean; phone: string; role: string; testOtpHint: string }>(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ phone, role })
    });
  },

  async verifyOtp(phone: string, otp: string, role = 'customer') {
    return fetchJSON<{ success: boolean; token: string; user: any }>(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      body: JSON.stringify({ phone, otp, role })
    });
  },

  /**
   * Vedic Astrology Calculations
   */
  async getKundli(birthDate: string, birthTime = '12:00', birthPlace = 'New Delhi') {
    const query = `?birthDate=${encodeURIComponent(birthDate)}&birthTime=${encodeURIComponent(birthTime)}&birthPlace=${encodeURIComponent(birthPlace)}`;
    return fetchJSON<{ success: boolean; kundli: any }>(`${API_BASE}/astrology/kundli${query}`);
  },

  async matchKundli(boy: any, girl: any) {
    return fetchJSON<{ success: boolean; matchResult: any }>(`${API_BASE}/astrology/match`, {
      method: 'POST',
      body: JSON.stringify({ boy, girl })
    });
  },

  /**
   * Quantum AI & Autonomous Multi-Agent Orchestration
   */
  async sendAiChat(message: string, activeAgent = 'Universal', language = 'en') {
    return fetchJSON<{
      success: boolean;
      agentName: string;
      text: string;
      governanceLevel: string;
      suggestedAction?: any;
      timestamp: string;
    }>(`${API_BASE}/ai/chat`, {
      method: 'POST',
      body: JSON.stringify({ message, activeAgent, language })
    });
  },

  /**
   * Document OCR Scrutiny & Verhoeff Checksum Validation
   */
  async scrutinizeDocument(docType: 'aadhaar' | 'pan' | 'gstin' | 'voter' | string, docNumber: string) {
    return fetchJSON<{
      success: boolean;
      docType: string;
      docNumber: string;
      isValid: boolean;
      reason: string;
      analyzedAt: string;
    }>(`${API_BASE}/ai/document-scrutiny`, {
      method: 'POST',
      body: JSON.stringify({ docType, docNumber })
    });
  },

  /**
   * Super Admin Enterprise Stats
   */
  async getStats() {
    return fetchJSON<{ success: boolean; stats: any }>(`${API_BASE}/stats`);
  },

  /**
   * Unified Payment Gateway & UPI Engine
   */
  async createPaymentOrder(paymentData: {
    amount: number;
    currency?: string;
    customerName?: string;
    customerPhone?: string;
    items?: any[];
  }) {
    return fetchJSON<{ success: boolean; order: any }>(`${API_BASE}/payments/create-order`, {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  },

  async verifyPayment(verificationData: {
    orderId: string;
    paymentId?: string;
    paymentMethod?: string;
    amount?: number;
    items?: any[];
  }) {
    return fetchJSON<{ success: boolean; transaction: any }>(`${API_BASE}/payments/verify`, {
      method: 'POST',
      body: JSON.stringify(verificationData)
    });
  },

  async getPaymentHistory() {
    return fetchJSON<{ success: boolean; count: number; transactions: any[] }>(`${API_BASE}/payments/history`);
  },

  /**
   * CRM Leads
   */
  async getCRMLeads() {
    return fetchJSON<{ success: boolean; count: number; leads: any[] }>(`${API_BASE}/crm/leads`);
  },

  async createCRMLead(lead: any) {
    return fetchJSON<{ success: boolean; lead: any }>(`${API_BASE}/crm/leads`, {
      method: 'POST',
      body: JSON.stringify(lead)
    });
  },

  async updateCRMLeadStage(id: string, stage: string) {
    return fetchJSON<{ success: boolean; lead: any }>(`${API_BASE}/crm/leads/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stage })
    });
  },

  /**
   * Cyber Cafe Workstation Terminals
   */
  async getWorkstations() {
    return fetchJSON<{ success: boolean; count: number; workstations: any[] }>(`${API_BASE}/cyber-cafe/workstations`);
  },

  async startWorkstationSession(id: string, sessionData: { customerName: string; phone?: string; task?: string }) {
    return fetchJSON<{ success: boolean; station: any }>(`${API_BASE}/cyber-cafe/workstations/${id}/start`, {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  },

  async stopWorkstationSession(id: string) {
    return fetchJSON<{ success: boolean; station: any; bill: number }>(`${API_BASE}/cyber-cafe/workstations/${id}/stop`, {
      method: 'POST'
    });
  },

  /**
   * Citizen Document Vault & Upload Engine
   */
  async getDocuments() {
    return fetchJSON<{ success: boolean; count: number; documents: any[] }>(`${API_BASE}/documents`);
  },

  async uploadDocument(docData: {
    applicantName?: string;
    docType?: string;
    fileName: string;
    fileBase64?: string;
    mimeType?: string;
    serviceId?: string;
  }) {
    return fetchJSON<{ success: boolean; document: any }>(`${API_BASE}/documents/upload`, {
      method: 'POST',
      body: JSON.stringify(docData)
    });
  },

  /**
   * Enterprise HRMS
   */
  async getEmployees() {
    return fetchJSON<{ success: boolean; count: number; employees: any[] }>(`${API_BASE}/hrms/employees`);
  },

  async addEmployee(employee: any) {
    return fetchJSON<{ success: boolean; employee: any }>(`${API_BASE}/hrms/employees`, {
      method: 'POST',
      body: JSON.stringify(employee)
    });
  },

  async toggleEmployeeAttendance(id: string, status?: string) {
    return fetchJSON<{ success: boolean; employee: any }>(`${API_BASE}/hrms/employees/${id}/attendance`, {
      method: 'POST',
      body: JSON.stringify({ status })
    });
  },

  /**
   * Enterprise ERP Inventory
   */
  async getInventory() {
    return fetchJSON<{ success: boolean; count: number; inventory: any[] }>(`${API_BASE}/erp/inventory`);
  },

  async addInventoryItem(item: any) {
    return fetchJSON<{ success: boolean; item: any }>(`${API_BASE}/erp/inventory`, {
      method: 'POST',
      body: JSON.stringify(item)
    });
  },

  async updateInventoryStock(id: string, deltaOrQuantity: { delta?: number; stockQuantity?: number }) {
    return fetchJSON<{ success: boolean; item: any }>(`${API_BASE}/erp/inventory/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify(deltaOrQuantity)
    });
  },

  /**
   * Real-Time Server-Sent Events (SSE) Listener
   */
  subscribeToEvents(onEvent: (event: { type: string; payload: any; timestamp: string }) => void) {
    if (typeof window === 'undefined' || !window.EventSource) return () => {};

    try {
      const source = new EventSource(`${API_BASE}/events`);

      source.addEventListener('application:created', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('application:status_changed', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('payment:completed', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('service:created', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('crm:lead_created', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('crm:stage_updated', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('workstation:session_started', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('workstation:session_stopped', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('document:uploaded', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('hrms:employee_created', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('hrms:attendance_updated', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('erp:inventory_created', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      source.addEventListener('erp:stock_updated', (e: MessageEvent) => {
        try { onEvent(JSON.parse(e.data)); } catch (err) {}
      });

      return () => {
        source.close();
      };
    } catch (err) {
      console.warn('Real-time SSE subscription unavailable in this environment');
      return () => {};
    }
  }
};
