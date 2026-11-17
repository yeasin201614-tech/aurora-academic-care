"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/supabase/mock-db";
import { formatBDT } from "@/lib/utils/utils";
import { Search, Filter, BookOpen, Clock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allCourses = db.courses;

  const categories = ["All", "HSC", "Admission", "SSC"];
  const modes = ["All", "offline", "online", "hybrid"];

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesMode =
      selectedMode === "All" || course.learning_mode.toLowerCase() === selectedMode.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      course.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.title_bn && course.title_bn.includes(searchQuery));
    return matchesCategory && matchesMode && matchesSearch;
  });

  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
            Academic Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Courses & Programs
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Tailored curriculum engineered for high scores in Board Exams and peak performance 
            in Medical & Engineering University Admissions.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandBlue-500 focus:border-transparent"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-brandBlue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mode Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-500 mr-1">Mode:</span>
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all ${
                    selectedMode === mode
                      ? "bg-navy-800 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
            <h3 className="text-lg font-bold text-navy-900">No courses match your filter</h3>
            <p className="text-xs text-slate-500">Try adjusting your search keywords or resetting category filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedMode("All");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-brandBlue-600 hover:underline pt-2 inline-block"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full bg-navy-800 overflow-hidden">
                  <Image
                    src={course.thumbnail_url || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"}
                    alt={course.title_en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-md text-gold-400 font-bold text-[11px] px-2.5 py-1 rounded-md border border-navy-700">
                    {course.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 font-semibold text-[11px] px-2.5 py-1 rounded-md capitalize">
                    {course.learning_mode}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                      <span className="text-brandBlue-600 font-semibold">{course.class_level}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration_months} Months
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-navy-900 group-hover:text-brandBlue-600 transition-colors">
                      {course.title_en}
                    </h2>

                    {course.title_bn && (
                      <p className="text-xs font-medium text-slate-500 font-bangla">
                        {course.title_bn}
                      </p>
                    )}

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium uppercase">
                        Tuition Fee
                      </span>
                      <span className="text-xl font-extrabold text-navy-900">
                        {formatBDT(course.fee)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/courses/${course.id}`}
                        className="px-3 py-2 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold transition-colors"
                      >
                        Details
                      </Link>

                      <Link
                        href={`/admission?course=${course.id}`}
                        className="px-4 py-2 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
