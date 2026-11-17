"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Image from "next/image";
import { formatBDT } from "@/lib/utils/utils";
import { db } from "@/lib/supabase/mock-db";
import { ShieldCheck, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";

function SSLCommerzSandboxContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tranId = searchParams.get("tran_id") || "AAC-TXN-2026-DEMO";
  const amount = parseFloat(searchParams.get("amount") || "18500");
  const invoiceId = searchParams.get("invoice") || "inv-01";

  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [processing, setProcessing] = useState(false);

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      // Update invoice in DB
      const inv = db.invoices.find((i) => i.id === invoiceId);
      if (inv) {
        inv.status = "paid";
      }
      db.payments.push({
        id: `pay-${Date.now()}`,
        invoice_id: invoiceId,
        student_id: "stu-01",
        transaction_id: tranId,
        payment_method: selectedMethod,
        amount: amount,
        currency: "BDT",
        status: "success",
        gateway_val_id: `VAL-MOCK-${Date.now()}`,
        paid_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      });

      router.push(`/dashboard/student`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 px-4">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Gateway Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              SSLCOMMERZ SANDBOX GATEWAY
            </span>
            <h2 className="text-base font-black text-slate-900 mt-1">Aurora Academic Care</h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Total Amount</span>
            <span className="text-lg font-black text-navy-900">{formatBDT(amount)}</span>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 font-mono">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction ID:</span>
            <span className="font-bold text-slate-900">{tranId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Currency:</span>
            <span className="font-bold text-slate-900">BDT (৳)</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Choose Payment Method
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedMethod("bkash")}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedMethod === "bkash"
                  ? "bg-pink-50 border-pink-500 text-pink-700 ring-2 ring-pink-100"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              bKash Wallet
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod("nagad")}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedMethod === "nagad"
                  ? "bg-amber-50 border-amber-500 text-amber-700 ring-2 ring-amber-100"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Nagad Payment
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod("rocket")}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedMethod === "rocket"
                  ? "bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-100"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Rocket (DBBL)
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod("card")}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedMethod === "card"
                  ? "bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-100"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Visa / Mastercard
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSimulatePayment}
          disabled={processing}
          className="w-full py-3.5 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {processing ? (
            <span>Authorizing Transaction...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Confirm & Authorize {formatBDT(amount)}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-slate-400">
          SSLCOMMERZ 256-Bit SSL Encrypted Sandbox Gateway • Bangladesh
        </p>
      </div>
    </div>
  );
}

export default function SSLCommerzSandboxPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Connecting to secure sandbox gateway...</div>}>
      <SSLCommerzSandboxContent />
    </Suspense>
  );
}
