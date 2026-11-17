"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, PhoneCall, Globe, X, ArrowRight } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [lang, setLang] = useState<"en" | "bn">("en");

  if (!isVisible) return null;

  return (
    <div className="bg-navy-900 text-white border-b border-navy-800 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Announcement tag */}
        <div className="flex items-center gap-2">
          <span className="bg-gold-500 text-navy-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-navy-950" />
            Admissions Open
          </span>
          <span className="hidden sm:inline text-slate-300 font-medium">
            {lang === "en"
              ? "Academic Session 2026-2027 Admissions Open for HSC & SSC Batches."
              : "শিক্ষাবর্ষ ২০২৬-২০২৭ এর জন্য এইচএসসি ও এসএসসি ব্যাচে ভর্তি চলছে।"}
          </span>
          <Link
            href="/admission"
            className="text-gold-400 hover:text-gold-300 font-semibold inline-flex items-center gap-1 underline underline-offset-2 ml-1"
          >
            {lang === "en" ? "Apply Online" : "অনলাইনে আবেদন করুন"}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right: Phone & Lang Switcher */}
        <div className="flex items-center gap-4 text-slate-300">
          <a
            href="tel:+8801712345678"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-gold-400" />
            <span className="hidden md:inline text-slate-400">Helpline:</span>
            <span className="font-semibold text-white">+880 1712-345678</span>
          </a>

          <div className="h-3 w-px bg-slate-700 hidden sm:block" />

          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="flex items-center gap-1 bg-navy-800 hover:bg-navy-700 px-2 py-0.5 rounded text-[11px] font-medium border border-navy-700 transition-colors"
            title="Toggle Language"
          >
            <Globe className="w-3 h-3 text-gold-400" />
            <span>{lang === "en" ? "বাংলা" : "English"}</span>
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
