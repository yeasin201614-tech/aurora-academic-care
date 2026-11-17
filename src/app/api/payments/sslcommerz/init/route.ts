import { NextRequest, NextResponse } from "next/server";
import { sslcommerz } from "@/lib/payments/sslcommerz";
import { db } from "@/lib/supabase/mock-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { invoiceId, amount, studentId } = body;

    const invoice = db.invoices.find((i) => i.id === invoiceId);
    if (!invoice) {
      return NextResponse.json(
        { success: false, error: "Invoice not found" },
        { status: 404 }
      );
    }

    const student = db.students.find((s) => s.id === studentId || s.id === invoice.student_id);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const initResult = await sslcommerz.initPayment({
      invoiceId: invoice.id,
      amount: invoice.net_amount,
      currency: "BDT",
      studentName: student?.profile?.full_name || "Mahmud Hasan",
      studentEmail: student?.profile?.email || "student@auroraacademic.com",
      studentPhone: student?.profile?.phone || "01811223344",
      courseTitle: invoice.title,
      successUrl: `${baseUrl}/api/payments/sslcommerz/callback?status=success&inv=${invoice.id}`,
      failUrl: `${baseUrl}/api/payments/sslcommerz/callback?status=fail&inv=${invoice.id}`,
      cancelUrl: `${baseUrl}/api/payments/sslcommerz/callback?status=cancel&inv=${invoice.id}`,
      ipnUrl: `${baseUrl}/api/payments/sslcommerz/ipn`,
    });

    if (initResult.status === "SUCCESS" && initResult.GatewayPageURL) {
      return NextResponse.json({
        success: true,
        gatewayUrl: initResult.GatewayPageURL,
        sessionkey: initResult.sessionkey,
      });
    }

    return NextResponse.json(
      { success: false, error: initResult.failedreason || "Payment initialization failed" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Payment init error:", err);
    return NextResponse.json(
      { success: false, error: "Internal payment processing error" },
      { status: 500 }
    );
  }
}
