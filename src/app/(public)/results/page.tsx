"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "@/lib/supabase/mock-db";
import { calculateBDGrade } from "@/lib/utils/gpa-calculator";
import {
  Search,
  Award,
  Printer,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";

export default function ResultsPage() {
  const [searchId, setSearchId] = useState("AAC-2026-STU001");
  const [hasSearched, setHasSearched] = useState(false);
  const [foundStudent, setFoundStudent] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setHasSearched(true);

    const clean = searchId.trim().toUpperCase();
    const student = db.students.find(
      (s) => s.student_id_code.toUpperCase() === clean || s.profile?.phone?.includes(clean)
    );

    if (student) {
      setFoundStudent(student);
    } else {
      setFoundStudent(null);
    }
  };

  const studentResults = foundStudent
    ? db.results.filter((r) => r.student_id === foundStudent.id)
    : [];

  return (
    <div className="space-y-12 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 no-print">
        <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
          Assessment & Evaluation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Exam Results & Digital Marksheet
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          Enter your permanent Student ID (e.g. <strong className="text-navy-900">AAC-2026-STU001</strong>) 
          to retrieve verified marks, GPA, and merit ranking.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft max-w-xl mx-auto no-print">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Student ID (e.g. AAC-2026-STU001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandBlue-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>View Result</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </button>
        </form>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
          <span>Demo Student ID:</span>
          <button
            onClick={() => {
              setSearchId("AAC-2026-STU001");
              const s = db.students.find((stu) => stu.student_id_code === "AAC-2026-STU001");
              setFoundStudent(s);
              setHasSearched(true);
            }}
            className="text-brandBlue-600 font-mono font-bold hover:underline bg-blue-50 px-2 py-0.5 rounded"
          >
            AAC-2026-STU001 (Mahmud Hasan)
          </button>
        </div>
      </div>

      {/* Search Result Display */}
      {hasSearched && !foundStudent && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-center text-xs flex items-center justify-center gap-2 max-w-xl mx-auto no-print">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>No student record found with this Student ID. Please verify your Admit Card or ID.</span>
        </div>
      )}

      {foundStudent && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-10 space-y-8 printable-card animate-fadeIn">
          {/* Printable Institutional Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Aurora Academic Care"
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
              />
              <div className="border-l border-slate-200 pl-3">
                <h3 className="font-bold text-navy-900 text-sm">AURORA ACADEMIC CARE</h3>
                <p className="text-[10px] text-slate-500">Central Examination & Assessment Division • Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                Verified Marksheet
              </span>
              <button
                onClick={() => window.print()}
                className="no-print p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Print Digital Marksheet"
              >
                <Printer className="w-4 h-4 text-navy-900" />
                <span className="hidden sm:inline">Print Marksheet</span>
              </button>
            </div>
          </div>

          {/* Student Profile Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Student Name</span>
              <span className="font-bold text-navy-900 text-sm">{foundStudent.profile?.full_name}</span>
              {foundStudent.profile?.bangla_name && (
                <span className="text-[11px] text-slate-500 font-bangla block">
                  {foundStudent.profile.bangla_name}
                </span>
              )}
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Student ID Code</span>
              <span className="font-mono font-bold text-brandBlue-600 text-sm">
                {foundStudent.student_id_code}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Institution & Class</span>
              <span className="font-semibold text-slate-800">
                {foundStudent.current_school} ({foundStudent.class_level})
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Academic Group</span>
              <span className="font-semibold text-slate-800">
                {foundStudent.academic_group} Group
              </span>
            </div>
          </div>

          {/* Published Exam Results Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold-500" />
              Published Examination Records
            </h3>

            {studentResults.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">No examination results published yet for this student.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      <th className="p-3 rounded-tl-xl font-semibold">Exam Title</th>
                      <th className="p-3 font-semibold">Exam Date</th>
                      <th className="p-3 font-semibold text-center">Marks Obtained</th>
                      <th className="p-3 font-semibold text-center">Letter Grade</th>
                      <th className="p-3 font-semibold text-center">Grade Point (GPA)</th>
                      <th className="p-3 font-semibold text-center">Merit Rank</th>
                      <th className="p-3 rounded-tr-xl font-semibold">Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 border-x border-b border-slate-200">
                    {studentResults.map((res) => {
                      const exam = db.exams.find((e) => e.id === res.exam_id);
                      return (
                        <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-navy-900">
                            {exam?.title || "Assessment Test"}
                          </td>
                          <td className="p-3 text-slate-500 font-mono">
                            {exam?.exam_date || "2026-01-18"}
                          </td>
                          <td className="p-3 text-center font-bold text-navy-900">
                            {res.marks_obtained} / {exam?.total_marks || 50}
                          </td>
                          <td className="p-3 text-center">
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-xs">
                              {res.grade}
                            </span>
                          </td>
                          <td className="p-3 text-center font-extrabold text-navy-900 font-mono">
                            {res.grade_point.toFixed(2)}
                          </td>
                          <td className="p-3 text-center">
                            <span className="bg-gold-100 text-gold-800 font-bold px-2 py-0.5 rounded text-xs font-mono">
                              #{res.merit_rank}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 italic">
                            {res.remarks || "Satisfactory"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bangladesh Board Grading Scale Guide */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <span className="font-bold text-navy-900 block">
              National Board Standard Grading System (5.00 Scale):
            </span>
            <div className="flex flex-wrap gap-4 pt-1 font-mono">
              <span>80-100% : <strong>A+ (5.00)</strong></span>
              <span>70-79% : <strong>A (4.00)</strong></span>
              <span>60-69% : <strong>A- (3.50)</strong></span>
              <span>50-59% : <strong>B (3.00)</strong></span>
              <span>40-49% : <strong>C (2.00)</strong></span>
              <span>33-39% : <strong>D (1.00)</strong></span>
              <span>0-32% : <strong>F (0.00)</strong></span>
            </div>
          </div>

          {/* Marksheet Footer & Stamp */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              <p>Aurora Academic Care Examination Controller</p>
              <p className="text-[10px]">Digitally verified from central exam database.</p>
            </div>
            <div className="text-right font-mono text-[11px]">
              Doc Ref: AAC-RES-{Date.now().toString().slice(-6)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
