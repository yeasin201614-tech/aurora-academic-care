"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase/mock-db";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { formatBDT } from "@/lib/utils/utils";
import {
  GraduationCap,
  Video,
  Award,
  CreditCard,
  UserCheck,
  Calendar,
  Clock,
  Printer,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  BookOpen,
  ArrowRight
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const student = db.students[0]; // Mahmud Hasan (AAC-2026-STU001)
  const results = db.results.filter((r) => r.student_id === student.id);
  const invoices = db.invoices.filter((i) => i.student_id === student.id);
  const attendance = db.attendance.filter((a) => a.student_id === student.id);
  const sessions = db.classSessions;

  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState("");

  const handlePayInvoice = (invId: string) => {
    const inv = invoices.find(i => i.id === invId);
    if (inv) {
      inv.status = "paid";
      setPaymentSuccessMsg(`Payment of ${formatBDT(inv.net_amount)} verified & received via SSLCOMMERZ (bKash Transaction: TXN-BD-${Date.now().toString().slice(-6)})`);
      setTimeout(() => setPaymentSuccessMsg(""), 5000);
    }
  };

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <DashboardSidebar
        currentRole="student"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader currentRole="student" title="Student Learning & Academic Portal" />

        <main className="p-4 sm:p-8 space-y-8">
          {paymentSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{paymentSuccessMsg}</span>
            </div>
          )}

          {/* ====================================================================
              TAB: OVERVIEW
             ==================================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Student Welcome Banner */}
              <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-gold-400 shadow flex-shrink-0">
                    <Image
                      src={student.profile?.avatar_url || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"}
                      alt={student.profile?.full_name || "Student"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-gold-500 text-navy-950 text-[10px] font-extrabold px-2 py-0.5 rounded font-mono">
                        {student.student_id_code}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">HSC 2026 Candidate</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black">
                      {student.profile?.full_name}
                    </h2>
                    <p className="text-xs text-slate-300">
                      {student.current_school} • {student.academic_group} Group
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2">
                  <button
                    onClick={() => setActiveTab("idcard")}
                    className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
                    <span>View Digital ID Card</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("live")}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-navy-950 rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Live Class</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Attendance Rate</div>
                  <div className="text-2xl font-black text-emerald-600">96.5%</div>
                  <div className="text-[11px] text-slate-400">Present in 22 of 23 sessions</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Average Model GPA</div>
                  <div className="text-2xl font-black text-navy-900">5.00 GPA</div>
                  <div className="text-[11px] text-gold-600 font-bold">Golden Merit Standing</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Batch Merit Rank</div>
                  <div className="text-2xl font-black text-brandBlue-600">#1 in Batch A</div>
                  <div className="text-[11px] text-slate-400">Out of 45 students</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Fee Invoices</div>
                  <div className="text-2xl font-black text-navy-900">1 Pending</div>
                  <div className="text-[11px] text-amber-600 font-medium">Model Test Fee due soon</div>
                </div>
              </div>

              {/* Today's Schedule & Routine */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-900">Academic Routine & Classes</h3>
                  <span className="text-xs text-slate-500 font-mono">Session 2026</span>
                </div>

                <div className="space-y-3">
                  {sessions.map((ses) => (
                    <div
                      key={ses.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-brandBlue-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                            {ses.meeting_platform?.replace("_", " ") || "Live Hall"}
                          </span>
                          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {ses.start_time} - {ses.end_time}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-navy-900">{ses.title}</h4>
                        <p className="text-xs text-slate-500">Instructor: Engr. Tanvir Ahmed • Physics Lead</p>
                      </div>

                      <a
                        href={ses.meeting_link || "https://meet.google.com/aur-phys-class"}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow flex items-center gap-1.5 flex-shrink-0"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Live Stream</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: DIGITAL STUDENT ID CARD
             ==================================================================== */}
          {activeTab === "idcard" && (
            <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
              <div className="text-center no-print">
                <h2 className="text-xl font-bold text-navy-900">Official Student Identity Card</h2>
                <p className="text-xs text-slate-500">Present this digital or printed card at campus security checkpoints.</p>
              </div>

              {/* The ID Card */}
              <div className="bg-gradient-to-b from-navy-900 via-navy-850 to-navy-950 text-white rounded-3xl p-6 border-2 border-gold-500 shadow-2xl space-y-6 printable-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />

                <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                  <div className="bg-white px-2 py-1 rounded-md">
                    <Image
                      src="/logo.png"
                      alt="Aurora Logo"
                      width={120}
                      height={40}
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider">
                    STUDENT ID CARD
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden border-2 border-gold-400 shadow flex-shrink-0">
                    <Image
                      src={student.profile?.avatar_url || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"}
                      alt={student.profile?.full_name || "Student"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-lg font-black text-white">{student.profile?.full_name}</div>
                    <div className="font-mono text-gold-400 font-bold text-sm">{student.student_id_code}</div>
                    <div className="text-slate-300">Class: {student.class_level} ({student.academic_group})</div>
                    <div className="text-slate-400 text-[11px]">College: {student.current_school}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-navy-950/80 p-3 rounded-xl border border-navy-800 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Batch Code:</span>
                    <span className="font-bold text-slate-200">HSC-SCI-A</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Blood Group:</span>
                    <span className="font-bold text-red-400">{student.blood_group}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Emergency:</span>
                    <span className="font-bold text-slate-200">{student.emergency_contact}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Valid Thru:</span>
                    <span className="font-bold text-gold-400">DEC 2026</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-navy-800">
                  Aurora Academic Care • Dhanmondi Main Campus • Helpline: +880 1712-345678
                </div>
              </div>

              <div className="text-center no-print">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold rounded-xl shadow flex items-center justify-center gap-2 mx-auto"
                >
                  <Printer className="w-4 h-4 text-gold-400" />
                  <span>Print Student ID Card</span>
                </button>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: INVOICES & PAY ONLINE
             ==================================================================== */}
          {activeTab === "invoices" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Fee Invoices & Receipts</h2>
                  <p className="text-xs text-slate-500">Pay tuition, model tests, and admission fees securely via SSLCOMMERZ.</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Supported:</span>
                  <span className="font-bold text-pink-600">bKash</span> •
                  <span className="font-bold text-amber-600">Nagad</span> •
                  <span className="font-bold text-blue-600">Cards</span>
                </div>
              </div>

              <div className="space-y-4">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-navy-900 text-xs">{inv.invoice_number}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          inv.status === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-navy-900">{inv.title}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-3">
                        <span>Due Date: {inv.due_date}</span>
                        {inv.discount > 0 && <span className="text-emerald-600 font-semibold">Scholarship Discount: {formatBDT(inv.discount)}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Net Payable</span>
                        <span className="text-lg font-black text-navy-900">{formatBDT(inv.net_amount)}</span>
                      </div>

                      {inv.status === "pending" ? (
                        <button
                          onClick={() => handlePayInvoice(inv.id)}
                          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow flex items-center gap-1.5"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay via SSLCOMMERZ</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => window.print()}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Download Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: RESULTS & MARKSHEET
             ==================================================================== */}
          {activeTab === "results" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Academic Marksheet & Assessment Record</h2>
                  <p className="text-xs text-slate-500">Official model test performance scored on Bangladesh 5.00 GPA standard.</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Marksheet
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      <th className="p-3 rounded-tl-xl font-semibold">Assessment Test</th>
                      <th className="p-3 font-semibold text-center">Marks</th>
                      <th className="p-3 font-semibold text-center">Letter Grade</th>
                      <th className="p-3 font-semibold text-center">GPA</th>
                      <th className="p-3 font-semibold text-center">Batch Merit</th>
                      <th className="p-3 rounded-tr-xl font-semibold">Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 border-x border-b border-slate-200">
                    {results.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-navy-900">
                          {db.exams.find(e => e.id === res.exam_id)?.title || "Assessment"}
                        </td>
                        <td className="p-3 text-center font-bold text-navy-900">{res.marks_obtained}</td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-xs">
                            {res.grade}
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold">{res.grade_point.toFixed(2)}</td>
                        <td className="p-3 text-center font-bold text-gold-600 font-mono">#{res.merit_rank}</td>
                        <td className="p-3 text-slate-600 italic">{res.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: LIVE ONLINE CLASS LAUNCHER
             ==================================================================== */}
          {activeTab === "live" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-navy-900">Protected Live Class Hall</h2>
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase">
                  <Video className="w-4 h-4" />
                  <span>Authorized Student Access Granted</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">
                  Physics: Vectors, Dot & Cross Product Problem Solving
                </h3>
                <p className="text-xs text-slate-600">
                  Class instructor is Engr. Tanvir Ahmed. Ensure your microphone is muted upon entering the meeting.
                </p>
                <div className="pt-2">
                  <a
                    href="https://meet.google.com/aur-phys-class"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-transform hover:scale-105"
                  >
                    <span>Click Here to Launch Google Meet Class</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
