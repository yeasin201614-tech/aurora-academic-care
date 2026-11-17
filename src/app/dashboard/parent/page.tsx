"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "@/lib/supabase/mock-db";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { formatBDT } from "@/lib/utils/utils";
import {
  Users,
  GraduationCap,
  Award,
  CreditCard,
  UserCheck,
  Calendar,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Printer
} from "lucide-react";

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const linkedStudent = db.students[0]; // Mahmud Hasan (Linked Child)
  const results = db.results.filter((r) => r.student_id === linkedStudent.id);
  const invoices = db.invoices.filter((i) => i.student_id === linkedStudent.id);
  const attendance = db.attendance.filter((a) => a.student_id === linkedStudent.id);

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <DashboardSidebar
        currentRole="parent"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader currentRole="parent" title="Guardian Oversight & Academic Portal" />

        <main className="p-4 sm:p-8 space-y-8">
          {/* Linked Child Selector Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0">
                <Image
                  src={linkedStudent.profile?.avatar_url || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"}
                  alt={linkedStudent.profile?.full_name || "Child"}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brandBlue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Linked Student
                </span>
                <h2 className="text-lg font-bold text-navy-900 mt-1">
                  {linkedStudent.profile?.full_name}
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Student ID: {linkedStudent.student_id_code} • {linkedStudent.current_school}
                </p>
              </div>
            </div>

            <div className="text-right flex items-center gap-3">
              <span className="text-xs text-slate-400">Relationship: <strong>Father</strong></span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Progress Report</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
              <div className="text-xs text-slate-500 font-medium">Session Attendance</div>
              <div className="text-2xl font-black text-emerald-600">96.5%</div>
              <div className="text-[11px] text-slate-400">Regular attendance on campus</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
              <div className="text-xs text-slate-500 font-medium">Current Grade Average</div>
              <div className="text-2xl font-black text-navy-900">5.00 GPA (A+)</div>
              <div className="text-[11px] text-gold-600 font-bold">Rank 1 in Batch A</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
              <div className="text-xs text-slate-500 font-medium">Tuition & Exam Fees</div>
              <div className="text-2xl font-black text-navy-900">1 Due Invoice</div>
              <div className="text-[11px] text-amber-600 font-semibold">{formatBDT(1500)} model test fee</div>
            </div>
          </div>

          {/* Attendance & Exam Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Exam Marks */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
              <h3 className="text-base font-bold text-navy-900">Recent Model Test Marks</h3>
              <div className="space-y-3">
                {results.map((res) => {
                  const exam = db.exams.find(e => e.id === res.exam_id);
                  return (
                    <div key={res.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-navy-900">{exam?.title}</h4>
                        <p className="text-[11px] text-slate-500">Date: {exam?.exam_date} • Score: {res.marks_obtained}/{exam?.total_marks}</p>
                        <p className="text-[11px] text-slate-600 italic">"{res.remarks}"</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-emerald-600">{res.grade}</span>
                        <span className="text-xs text-slate-400 block font-mono">Rank #{res.merit_rank}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Attendance Log */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
              <h3 className="text-base font-bold text-navy-900">Daily Attendance Alerts</h3>
              <div className="space-y-2 text-xs">
                {attendance.map((att) => (
                  <div key={att.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-800 block">Session Lecture Verified</span>
                      <span className="text-[11px] text-slate-400 font-mono">{att.recorded_at.slice(0, 10)}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px] uppercase">
                      {att.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Counselor contact */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <span className="font-bold text-navy-900 block">Faculty Counselor Contact:</span>
                <p>Engr. Tanvir Ahmed (Physics Head) • Mon & Wed (5:00 PM - 6:30 PM)</p>
                <a href="tel:+8801712345678" className="text-brandBlue-600 font-semibold inline-flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> Call Academic Office
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
