import { NextRequest, NextResponse } from "next/server";
import { sslcommerz } from "@/lib/payments/sslcommerz";
import { db } from "@/lib/supabase/mock-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { val_id, invoice_id } = body;

    if (!val_id) {
      return NextResponse.json(
        { success: false, error: "Missing validation ID (val_id)" },
        { status: 400 }
      );
    }

    // Server-side validation via SSLCOMMERZ Validator API
    const validation = await sslcommerz.validateTransaction(val_id);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: "Transaction verification failed with SSLCOMMERZ" },
        { status: 400 }
      );
    }

    // Mark invoice as paid in DB
    if (invoice_id) {
      const inv = db.invoices.find((i) => i.id === invoice_id);
      if (inv) {
        inv.status = "paid";
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and invoice updated.",
      transaction: validation.data,
    });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json(
      { success: false, error: "Internal payment verification error" },
      { status: 500 }
    );
  }
}
