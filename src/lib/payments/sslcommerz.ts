// SSLCOMMERZ Payment Integration Service (Bangladesh Gateway)
// Supports bKash, Nagad, Rocket, Upay, Visa, Mastercard, AMEX, Internet Banking

export interface SSLCommerzInitParams {
  invoiceId: string;
  amount: number;
  currency: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseTitle: string;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
  ipnUrl: string;
}

export interface SSLCommerzInitResponse {
  status: "SUCCESS" | "FAILED";
  failedreason?: string;
  sessionkey?: string;
  GatewayPageURL?: string;
  redirectGatewayURL?: string;
}

export class SSLCommerzService {
  private storeId: string;
  private storePasswd: string;
  private isLive: boolean;
  private baseUrl: string;

  constructor() {
    this.storeId = process.env.SSLCOMMERZ_STORE_ID || "aurora_sandbox";
    this.storePasswd = process.env.SSLCOMMERZ_STORE_PASSWORD || "aurora_secret_pass";
    this.isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";
    this.baseUrl = this.isLive
      ? "https://securepay.sslcommerz.com"
      : "https://sandbox.sslcommerz.com";
  }

  /**
   * Server-Side Payment Session Initialization
   */
  public async initPayment(params: SSLCommerzInitParams): Promise<SSLCommerzInitResponse> {
    const postData = new URLSearchParams({
      store_id: this.storeId,
      store_passwd: this.storePasswd,
      total_amount: params.amount.toFixed(2),
      currency: params.currency || "BDT",
      tran_id: `AAC-TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      success_url: params.successUrl,
      fail_url: params.failUrl,
      cancel_url: params.cancelUrl,
      ipn_url: params.ipnUrl,
      cus_name: params.studentName,
      cus_email: params.studentEmail || "student@auroraacademic.com",
      cus_add1: "Dhaka, Bangladesh",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: params.studentPhone,
      shipping_method: "NO",
      product_name: params.courseTitle,
      product_category: "Education",
      product_profile: "non-physical-goods",
      value_a: params.invoiceId, // Invoice mapping
    });

    try {
      // If running in development mock mode without active external sandbox credentials:
      if (!process.env.SSLCOMMERZ_STORE_ID) {
        const mockTranId = `AAC-TXN-${Date.now()}`;
        return {
          status: "SUCCESS",
          sessionkey: `MOCK_SESSION_${Date.now()}`,
          GatewayPageURL: `/api/payments/sslcommerz/sandbox-gateway?tran_id=${mockTranId}&amount=${params.amount}&invoice=${params.invoiceId}`,
        };
      }

      const response = await fetch(`${this.baseUrl}/gwprocess/v4/api.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: postData.toString(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("SSLCommerz Init Error:", error);
      return {
        status: "FAILED",
        failedreason: error instanceof Error ? error.message : "Unknown gateway error",
      };
    }
  }

  /**
   * Server-Side Transaction Verification (Validation API)
   * Mandatory verification before confirming payment in DB
   */
  public async validateTransaction(val_id: string): Promise<{ isValid: boolean; data: any }> {
    if (!val_id) return { isValid: false, data: null };

    // In dev mock sandbox:
    if (val_id.startsWith("VAL-MOCK-") || !process.env.SSLCOMMERZ_STORE_ID) {
      return {
        isValid: true,
        data: {
          status: "VALID",
          val_id,
          amount: "18500.00",
          currency: "BDT",
          tran_date: new Date().toISOString(),
        },
      };
    }

    const verifyUrl = `${this.baseUrl}/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${this.storeId}&store_passwd=${this.storePasswd}&v=1&format=json`;

    try {
      const response = await fetch(verifyUrl);
      const data = await response.json();
      if (data.status === "VALID" || data.status === "VALIDATED") {
        return { isValid: true, data };
      }
      return { isValid: false, data };
    } catch (err) {
      console.error("SSLCommerz Validation Failed:", err);
      return { isValid: false, data: null };
    }
  }
}

export const sslcommerz = new SSLCommerzService();
