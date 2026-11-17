import { NextRequest, NextResponse } from "next/server";
import { sslcommerz } from "@/lib/payments/sslcommerz";
import { db } from "@/lib/supabase/mock-db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const val_id = formData.get("val_id") as string;
    const tran_id = formData.get("tran_id") as string;
    const invoice_id = formData.get("value_a") as string;
    const status = formData.get("status") as string;

    if (!val_id || !tran_id) {
      return NextResponse.json({ message: "Invalid IPN payload" }, { status: 400 });
    }

    // Check duplicate / idempotent
    const existing = db.payments.find((p) => p.transaction_id === tran_id);
    if (existing && existing.status === "success") {
      return NextResponse.json({ message: "Transaction already processed" }, { status: 200 });
    }

    // Verify with SSLCommerz server
    const verifyResult = await sslcommerz.validateTransaction(val_id);
    if (verifyResult.isValid) {
      if (invoice_id) {
        const inv = db.invoices.find((i) => i.id === invoice_id);
        if (inv) inv.status = "paid";
      }

      db.payments.push({
        id: `pay-${Date.now()}`,
        invoice_id,
        student_id: "stu-01",
        transaction_id: tran_id,
        payment_method: "sslcommerz",
        amount: parseFloat(formData.get("amount") as string || "0"),
        currency: "BDT",
        status: "success",
        gateway_val_id: val_id,
        gateway_response: verifyResult.data,
        paid_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      });

      return NextResponse.json({ message: "IPN verified and recorded" }, { status: 200 });
    }

    return NextResponse.json({ message: "Validation failed" }, { status: 400 });
  } catch (err) {
    console.error("IPN Error:", err);
    return NextResponse.json({ message: "Error processing IPN" }, { status: 500 });
  }
}
