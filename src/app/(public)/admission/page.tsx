import { AdmissionForm } from "@/components/forms/AdmissionForm";
import Link from "next/link";
import {
  Sparkles,
  PhoneCall,
  Clock,
  ShieldCheck,
  Search,
  FileCheck2,
  GraduationCap
} from "lucide-react";

export const metadata = {
  title: "Online Admission Application | Aurora Academic Care",
  description: "Apply online for HSC, SSC, Medical and Engineering admission coaching at Aurora Academic Care Bangladesh.",
};

export default function AdmissionPage({
  searchParams,
}: {
  searchParams: { course?: string; batch?: string };
}) {
  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold-400" />
            Session 2026-2027 Admissions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Online Admission Application
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Fill out the 4-step digital application form below to register for HSC, SSC, 
            Medical, or Engineering batches.
          </p>

          <div className="pt-2">
            <Link
              href="/admission-status"
              className="text-xs font-semibold text-gold-400 hover:text-gold-300 underline underline-offset-4 inline-flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" /> Already applied? Check your application status here
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <AdmissionForm
              initialCourseId={searchParams.course}
              initialBatchId={searchParams.batch}
            />
          </div>

          {/* Right Column: Information & Helpline */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Steps Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                Admission Workflow
              </h3>
              <ol className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    1
                  </span>
                  <span>Complete and submit this online application.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    2
                  </span>
                  <span>Receive unique Application Reference number.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    3
                  </span>
                  <span>Admin review & verification within 24-48 hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    4
                  </span>
                  <span>Pay admission invoice via SSLCOMMERZ / bKash / Campus counter.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    5
                  </span>
                  <span>Receive permanent Student ID & Portal Login credentials.</span>
                </li>
              </ol>
            </div>

            {/* Helpline Box */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <PhoneCall className="w-4 h-4" />
                <span>Admission Helpline</span>
              </div>
              <p className="text-xs text-slate-300">
                Need guidance choosing the right batch or curriculum? Speak directly with our academic counselors.
              </p>
              <div className="pt-1">
                <a
                  href="tel:+8801712345678"
                  className="text-lg font-bold text-white hover:text-gold-300 block font-mono"
                >
                  +880 1712-345678
                </a>
                <span className="text-[10px] text-slate-400">Available: Sat - Thu (8 AM - 8 PM)</span>
              </div>
            </div>

            {/* Documents Checklist */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-navy-900">Required for Final Enrollment:</h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>1 copy of recent passport size photograph</li>
                <li>Photocopy of previous board exam marksheet (SSC/JSC)</li>
                <li>Guardian's National ID (NID) copy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
