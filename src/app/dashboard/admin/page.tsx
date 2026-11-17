"use client";

import { useState } from "react";
import { db } from "@/lib/supabase/mock-db";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { formatBDT } from "@/lib/utils/utils";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileCheck2,
  Clock,
  UserCheck,
  Award,
  CreditCard,
  Plus,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState(db.students);
  const [batches, setBatches] = useState(db.batches);
  const [attendanceList, setAttendanceList] = useState(db.attendance);
  const [exams, setExams] = useState(db.exams);
  const [noticeSuccess, setNoticeSuccess] = useState("");

  const markAttendance = (studentId: string, status: any) => {
    const existing = attendanceList.find(a => a.student_id === studentId);
    if (existing) {
      existing.status = status;
      setAttendanceList([...attendanceList]);
    }
    setNoticeSuccess(`Attendance recorded as ${status.toUpperCase()}`);
    setTimeout(() => setNoticeSuccess(""), 3000);
  };

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <DashboardSidebar
        currentRole="admin"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader currentRole="admin" title="Academic Operations Command" />

        <main className="p-4 sm:p-8 space-y-8">
          {noticeSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{noticeSuccess}</span>
            </div>
          )}

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Registered Students</div>
                  <div className="text-2xl font-black text-navy-900">{students.length} Active</div>
                  <div className="text-[11px] text-emerald-600">85%+ avg attendance</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Active Batches</div>
                  <div className="text-2xl font-black text-navy-900">{batches.length} Batches</div>
                  <div className="text-[11px] text-slate-400">Offline & Online</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Faculty Strength</div>
                  <div className="text-2xl font-black text-navy-900">{db.teachers.length} Mentors</div>
                  <div className="text-[11px] text-brandBlue-600">BUET, DMC, DU</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Upcoming Exams</div>
                  <div className="text-2xl font-black text-navy-900">{exams.length} Scheduled</div>
                  <div className="text-[11px] text-purple-600">OMR Model Tests</div>
                </div>
              </div>

              {/* Student Directory Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
                <h3 className="text-base font-bold text-navy-900">Enrolled Students Overview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <th className="p-3 font-semibold">Student ID</th>
                        <th className="p-3 font-semibold">Name</th>
                        <th className="p-3 font-semibold">Current College</th>
                        <th className="p-3 font-semibold">Class & Group</th>
                        <th className="p-3 font-semibold">Phone</th>
                        <th className="p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-brandBlue-600">{s.student_id_code}</td>
                          <td className="p-3 font-bold text-navy-900">{s.profile?.full_name}</td>
                          <td className="p-3 text-slate-600">{s.current_school}</td>
                          <td className="p-3 text-slate-600">{s.class_level} ({s.academic_group})</td>
                          <td className="p-3 text-slate-600">{s.profile?.phone}</td>
                          <td className="p-3">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ATTENDANCE TAB */}
          {activeTab === "attendance" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Daily Attendance Registry</h2>
                  <p className="text-xs text-slate-500">Record and verify batch attendance with automated guardian alerts.</p>
                </div>
                <div className="text-xs font-semibold bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
                  Batch: HSC Sci Morning Titans (Batch A)
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <th className="p-3 font-semibold">Student ID</th>
                      <th className="p-3 font-semibold">Student Name</th>
                      <th className="p-3 font-semibold">Current Attendance Status</th>
                      <th className="p-3 font-semibold text-right">Mark Daily Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((s) => {
                      const att = attendanceList.find(a => a.student_id === s.id);
                      return (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-navy-900">{s.student_id_code}</td>
                          <td className="p-3 font-bold text-slate-900">{s.profile?.full_name}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              att?.status === "present" ? "bg-emerald-100 text-emerald-800" :
                              att?.status === "late" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                            }`}>
                              {att?.status || "present"}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              onClick={() => markAttendance(s.id, "present")}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                            >
                              Present
                            </button>
                            <button
                              onClick={() => markAttendance(s.id, "late")}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[11px] font-semibold"
                            >
                              Late
                            </button>
                            <button
                              onClick={() => markAttendance(s.id, "absent")}
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-semibold"
                            >
                              Absent
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

          {/* EXAMS & RESULTS TAB */}
          {activeTab === "exams" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Exams & Merit Rankings</h2>
                  <p className="text-xs text-slate-500">Create tests, calculate BD Board GPA, and publish marksheets.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exams.map((exam) => (
                  <div key={exam.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brandBlue-600 uppercase">{exam.exam_type}</span>
                      <span className="text-slate-500 font-mono">{exam.exam_date}</span>
                    </div>
                    <h4 className="text-base font-bold text-navy-900">{exam.title}</h4>
                    <div className="text-xs text-slate-600 flex justify-between">
                      <span>Total Marks: {exam.total_marks}</span>
                      <span>Pass Marks: {exam.pass_marks}</span>
                      <span className="text-emerald-600 font-bold">Published ✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
