"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase/mock-db";
import { AdmissionApplication } from "@/types/database";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Printer,
  GraduationCap,
  ArrowRight,
  PhoneCall,
  Calendar,
  Building,
  CreditCard,
  Loader2
} from "lucide-react";

function AdmissionStatusContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const [searchQuery, setSearchQuery] = useState(initialRef);
  const [application, setApplication] = useState<AdmissionApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const performSearch = async (queryStr: string) => {
    const q = queryStr.trim();
    if (!q) return;

    setHasSearched(true);
    setErrorMessage("");
    setIsSearching(true);

    try {
      const res = await fetch(`/api/admission/status?ref=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (data.success && data.application) {
        setApplication(data.application);
      } else {
        // Fallback to local mock db
        const local = db.getApplicationByRef(q);
        if (local) {
          setApplication(local);
        } else {
          setApplication(null);
          setErrorMessage(data.error || "No admission application found matching this reference number or mobile number.");
        }
      }
    } catch (err) {
      console.warn("Status fetch exception, trying local fallback:", err);
      const local = db.getApplicationByRef(q);
      if (local) {
        setApplication(local);
      } else {
        setApplication(null);
        setErrorMessage("No admission application found matching this reference number or mobile number.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      performSearch(initialRef);
    }
  }, [initialRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const getStatusBadge = (status: AdmissionApplication["status"]) => {
    switch (status) {
      case "enrolled":
        return (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled (সফলভাবে ভর্তি সম্পন্ন)
          </span>
        );
      case "approved":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved (অনুমোদিত — ফি জমা দিন)
          </span>
        );
      case "under_review":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Under Review (যাচাই চলছে)
          </span>
        );
      case "rejected":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" /> Rejected (বাতিল)
          </span>
        );
      case "pending":
      default:
        return (
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Pending Review (পর্যালোচনা অপেক্ষমান)
          </span>
        );
    }
  };

  const course =
    (application as any)?.course ||
    (application as any)?.courses ||
    db.courses.find((c) => c.id === application?.selected_course_id);

  const batch =
    (application as any)?.batch ||
    (application as any)?.batches ||
    db.batches.find((b) => b.id === application?.selected_batch_id);

  return (
    <div className="space-y-12 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 no-print">
        <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
          Live Tracker
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Admission Application Status
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          Enter your Application Reference number (e.g. <strong className="text-navy-900">AAC-2026-ADM1001</strong>) 
          or your 11-digit registered mobile number.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft max-w-xl mx-auto no-print">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. AAC-2026-ADM2512 or 01834201614"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandBlue-500 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-400" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>Track</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Links */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span>Recent Demo IDs:</span>
          <button
            onClick={() => {
              setSearchQuery("01834201614");
              performSearch("01834201614");
            }}
            className="text-brandBlue-600 font-mono hover:underline bg-blue-50 px-1.5 py-0.5 rounded font-bold"
          >
            01834201614 (yeasin Arafat)
          </button>
          <button
            onClick={() => {
              setSearchQuery("AAC-2026-ADM1001");
              performSearch("AAC-2026-ADM1001");
            }}
            className="text-brandBlue-600 font-mono hover:underline bg-blue-50 px-1.5 py-0.5 rounded"
          >
            AAC-2026-ADM1001 (Enrolled)
          </button>
          <button
            onClick={() => {
              setSearchQuery("AAC-2026-ADM1002");
              performSearch("AAC-2026-ADM1002");
            }}
            className="text-brandBlue-600 font-mono hover:underline bg-blue-50 px-1.5 py-0.5 rounded"
          >
            AAC-2026-ADM1002 (Approved)
          </button>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-center text-xs flex items-center justify-center gap-2 max-w-xl mx-auto no-print">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Result Card: Printable Official Admission Slip */}
      {application && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-10 space-y-8 printable-card animate-fadeIn">
          {/* Printable Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Aurora Academic Care"
                width={160}
                height={50}
                className="h-12 w-auto object-contain"
              />
              <div className="border-l border-slate-200 pl-3">
                <h3 className="font-bold text-navy-900 text-sm">AURORA ACADEMIC CARE</h3>
                <p className="text-[10px] text-slate-500">Official Admission Registry • Chittagong / Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge(application.status)}
              <button
                onClick={() => window.print()}
                className="no-print p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Print Confirmation Slip"
              >
                <Printer className="w-4 h-4 text-navy-900" />
                <span className="hidden sm:inline">Print Slip</span>
              </button>
            </div>
          </div>

          {/* Reference & Student Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                Application Reference
              </span>
              <span className="text-lg font-mono font-black text-navy-900">
                {application.application_reference}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Submitted: {new Date(application.created_at || Date.now()).toLocaleDateString()}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                Applicant Name
              </span>
              <span className="text-base font-bold text-navy-900 block">
                {application.student_name}
              </span>
              {application.student_name_bn && (
                <span className="text-xs text-slate-500 font-bangla block">
                  {application.student_name_bn}
                </span>
              )}
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                Permanent Student ID
              </span>
              <span className="text-base font-mono font-bold text-brandBlue-600 block">
                {application.assigned_student_id
                  ? application.assigned_student_id
                  : application.status === "approved"
                  ? "Pending Final Enrollment"
                  : "Assigned upon Approval"}
              </span>
            </div>
          </div>

          {/* Full Application Details Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-3">
              <h4 className="font-bold text-navy-900 text-sm border-b border-slate-100 pb-1.5">
                Academic & Program Enrollment
              </h4>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Selected Program:</span>
                <span className="font-semibold text-slate-800">{course?.title_en || "Academic Care"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Class Level & Group:</span>
                <span className="font-semibold text-slate-800">{application.current_class} ({application.academic_group})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Assigned Batch:</span>
                <span className="font-semibold text-slate-800">{batch?.name || "Campus Care Batch"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Learning Mode:</span>
                <span className="font-bold text-brandBlue-600 uppercase">{application.learning_mode}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Previous Institution:</span>
                <span className="font-semibold text-slate-800">{application.previous_school}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-navy-900 text-sm border-b border-slate-100 pb-1.5">
                Guardian & Verification Info
              </h4>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Guardian Name:</span>
                <span className="font-semibold text-slate-800">{application.guardian_name} ({application.guardian_relationship})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Guardian Contact:</span>
                <span className="font-semibold text-slate-800">{application.guardian_phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Student Contact:</span>
                <span className="font-semibold text-slate-800">{application.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Present Address:</span>
                <span className="font-semibold text-slate-800">{application.present_address}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="font-semibold text-slate-800">{application.emergency_contact || application.guardian_phone}</span>
              </div>
            </div>
          </div>

          {/* Official Administrative Remarks */}
          <div className="bg-navy-900 text-white p-6 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
              Administrative Review Remarks
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {application.review_notes || "Your application is undergoing verification by the admissions committee."}
            </p>
            {application.reviewed_at && (
              <span className="text-[10px] text-slate-400 block pt-1">
                Reviewed on: {new Date(application.reviewed_at).toLocaleString()} by {application.reviewed_by || "Admissions Officer"}
              </span>
            )}
          </div>

          {/* Action if approved: Direct payment button */}
          {application.status === "approved" && (
            <div className="no-print bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <h4 className="text-sm font-bold text-emerald-900">
                Congratulations! Your Admission has been Approved.
              </h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                You can now complete enrollment by paying your course fee online via SSLCOMMERZ 
                (bKash/Nagad/Rocket/Card) or visiting our campus office.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Complete Enrollment & Pay Fees →</span>
              </Link>
            </div>
          )}

          {/* Bottom official footer */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div>
              <span>Aurora Academic Care Official Computerized Slip • No signature required</span>
            </div>
            <div className="font-mono">
              Verification Code: {application.application_reference.replace("AAC-", "")}-VERIFIED
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdmissionStatusPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading Admission Status...</div>}>
      <AdmissionStatusContent />
    </Suspense>
  );
}
