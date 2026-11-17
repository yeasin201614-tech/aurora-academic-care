"use client";

import { useState } from "react";
import Link from "next/link";
import { db } from "@/lib/supabase/mock-db";
import { Calendar, Search, Filter, Pin, FileText, ArrowRight } from "lucide-react";

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allNotices = db.notices;
  const categories = ["All", "admission", "exam", "general"];

  const filteredNotices = allNotices.filter((n) => {
    const matchesCategory =
      selectedCategory === "All" || n.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
            Institutional Bulletin
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Official Notice Board
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            All official announcements regarding examinations, schedules, holidays, 
            and admissions are published here.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandBlue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all ${
                  selectedCategory === cat
                    ? "bg-navy-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-50 text-brandBlue-700 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-blue-200">
                  {notice.category}
                </span>
                {notice.is_pinned && (
                  <span className="bg-amber-100 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {notice.published_at.slice(0, 10)}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-navy-900">
                {notice.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {notice.content}
              </p>
            </div>

            <Link
              href={`/notices/${notice.id}`}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-navy-800 hover:text-white text-navy-900 text-xs font-semibold flex items-center gap-1.5 transition-all self-end sm:self-center flex-shrink-0"
            >
              <span>Read Notice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
