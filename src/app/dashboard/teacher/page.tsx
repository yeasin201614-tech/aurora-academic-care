"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "@/lib/supabase/mock-db";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import {
  Video,
  UserCheck,
  Award,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  FileText,
  Upload,
  ArrowRight
} from "lucide-react";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const teacher = db.teachers[0]; // Engr. Tanvir Ahmed
  const assignedBatches = db.batches.filter((b) => b.lead_teacher_id === teacher.id);
  const students = db.students;
  const sessions = db.classSessions.filter((s) => s.teacher_id === teacher.id);

  const [enteredMarks, setEnteredMarks] = useState<Record<string, string>>({
    "stu-01": "46.5",
    "stu-02": "42.0",
  });
  const [saveSuccess, setSaveSuccess] = useState("");

  const handleSaveMarks = () => {
    setSaveSuccess("Marks entered and recalculated according to Bangladesh 5.00 GPA grading rule.");
    setTimeout(() => setSaveSuccess(""), 4000);
  };

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <DashboardSidebar
        currentRole="teacher"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader currentRole="teacher" title="Faculty Mentorship Console" />

        <main className="p-4 sm:p-8 space-y-8">
          {saveSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Profile Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-gold-400 shadow flex-shrink-0">
                  <Image
                    src={teacher.profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                    alt={teacher.profile?.full_name || "Faculty"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="bg-blue-50 text-brandBlue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {teacher.department}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {teacher.designation}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-navy-900">
                    Welcome, {teacher.profile?.full_name}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {teacher.qualification} • {teacher.experience_years}+ Years Experience
                  </p>
                </div>
              </div>

              {/* Next Live Class Launcher */}
              <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-navy-950 px-2.5 py-1 rounded">
                    Upcoming Class Session
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Physics: Vectors, Dot & Cross Product Problem Solving
                  </h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-400" /> Saturday</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-400" /> 08:00 AM - 10:30 AM</span>
                    <span className="text-emerald-400 font-semibold">Google Meet Room Prepared</span>
                  </div>
                </div>

                <a
                  href="https://meet.google.com/aur-phys-class"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2 flex-shrink-0"
                >
                  <Video className="w-4 h-4 text-navy-950" />
                  <span>Launch Live Google Meet Hall</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Assigned Batches */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-navy-900">Assigned Cohorts & Batches</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignedBatches.map((batch) => (
                    <div key={batch.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span className="font-mono text-brandBlue-600">{batch.code}</span>
                        <span className="capitalize text-slate-500">{batch.learning_mode}</span>
                      </div>
                      <h4 className="text-base font-bold text-navy-900">{batch.name}</h4>
                      <p className="text-slate-500">{batch.schedule_days} • {batch.time_slot}</p>
                      <p className="text-slate-500">Venue: {batch.classroom_number} (Capacity: {batch.capacity})</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MARKS ENTRY TAB */}
          {activeTab === "marks" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Student Marks Entry & GPA Generation</h2>
                  <p className="text-xs text-slate-500">Enter scores for Weekly Assessment Test 01 (Max Marks: 50).</p>
                </div>
                <button
                  onClick={handleSaveMarks}
                  className="px-5 py-2 bg-navy-800 hover:bg-navy-900 text-gold-400 font-bold text-xs rounded-xl transition-all shadow"
                >
                  Save & Publish Marks
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <th className="p-3 font-semibold">Student ID</th>
                      <th className="p-3 font-semibold">Name</th>
                      <th className="p-3 font-semibold">College</th>
                      <th className="p-3 font-semibold">Marks (Out of 50)</th>
                      <th className="p-3 font-semibold">Calculated Grade</th>
                      <th className="p-3 font-semibold">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-navy-900">{s.student_id_code}</td>
                        <td className="p-3 font-bold text-slate-900">{s.profile?.full_name}</td>
                        <td className="p-3 text-slate-600">{s.current_school}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={enteredMarks[s.id] || "40.0"}
                            onChange={(e) => setEnteredMarks({ ...enteredMarks, [s.id]: e.target.value })}
                            className="w-20 px-2 py-1 border border-slate-300 rounded font-bold font-mono text-center text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                            A+ (5.00)
                          </span>
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            defaultValue="Good performance"
                            className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
