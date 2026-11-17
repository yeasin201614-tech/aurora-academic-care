"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase/mock-db";
import { Award, BookOpen, GraduationCap, ArrowRight, Filter } from "lucide-react";

export default function TeachersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const allTeachers = db.teachers;

  const departments = ["All", "Physics", "Chemistry", "Higher Mathematics", "Biology"];

  const filteredTeachers = allTeachers.filter((t) => {
    return selectedDept === "All" || t.department.toLowerCase() === selectedDept.toLowerCase();
  });

  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
            Faculty Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Renowned Faculty & Mentors
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Meet the experienced educators from BUET, DMC, and Dhaka University guiding you 
            to supreme academic clarity.
          </p>
        </div>
      </section>

      {/* Department Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                selectedDept === dept
                  ? "bg-navy-800 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between text-center group"
            >
              <div>
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-gold-400 shadow-md">
                  <Image
                    src={t.profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                    alt={t.profile?.full_name || "Teacher"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-base font-bold text-navy-900">
                  {t.profile?.full_name}
                </h3>
                {t.profile?.bangla_name && (
                  <p className="text-xs text-slate-500 font-bangla mt-0.5">
                    {t.profile.bangla_name}
                  </p>
                )}

                <div className="text-xs font-semibold text-brandBlue-600 mt-1">
                  {t.designation}
                </div>

                <div className="text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-full inline-block mt-1">
                  {t.qualification}
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {t.bio}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{t.experience_years}+ Yrs Exp</span>
                <Link
                  href={`/teachers/${t.id}`}
                  className="text-brandBlue-600 hover:text-navy-900 font-semibold inline-flex items-center gap-1"
                >
                  <span>Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
