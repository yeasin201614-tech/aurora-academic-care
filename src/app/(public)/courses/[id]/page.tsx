import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase/mock-db";
import { formatBDT } from "@/lib/utils/utils";
import {
  GraduationCap,
  Clock,
  Calendar,
  Building,
  Users,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  FileText,
  Video,
  Award
} from "lucide-react";

export async function generateStaticParams() {
  return db.courses.map((c) => ({ id: c.id }));
}

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = db.courses.find((c) => c.id === params.id || c.slug === params.id);
  if (!course) notFound();

  const relatedBatches = db.batches.filter((b) => b.course_id === course.id);

  return (
    <div className="space-y-12 py-10">
      {/* Course Hero */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-gold-500 text-navy-950 text-xs font-bold px-2.5 py-0.5 rounded uppercase">
                  {course.category}
                </span>
                <span className="bg-navy-800 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded border border-navy-700 capitalize">
                  {course.learning_mode} Learning
                </span>
                <span className="text-slate-400 text-xs">• Class Level: {course.class_level}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {course.title_en}
              </h1>

              {course.title_bn && (
                <p className="text-lg text-gold-300 font-bangla font-medium">
                  {course.title_bn}
                </p>
              )}

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {course.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <span>Duration: {course.duration_months} Months</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gold-400" />
                  <span>{relatedBatches.length} Active Batches Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span>Certificate & Board Booster</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="lg:col-span-4">
              <div className="bg-white text-navy-900 rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-5">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                    Total Course Investment
                  </span>
                  <div className="text-3xl font-black text-navy-900 mt-1">
                    {formatBDT(course.fee)}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    ✓ Includes All Books, Model Tests & Online Access
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Complete syllabus coverage + Revision tests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Digital OMR with instant SMS to Guardian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Printed lecture sheets & previous year bank</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Dedicated 1-on-1 mentor problem solving</span>
                  </div>
                </div>

                <Link
                  href={`/admission?course=${course.id}`}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold rounded-xl text-center block text-sm shadow-md transition-transform hover:scale-[1.02]"
                >
                  Apply for Admission in This Course →
                </Link>

                <p className="text-[10px] text-center text-slate-400">
                  Scholarships available for Golden GPA 5.0 holders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Batches & Routine */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-6">
          Assigned Batches & Class Schedules
        </h2>

        {relatedBatches.length === 0 ? (
          <p className="text-xs text-slate-500">Batches currently being finalized. Please contact campus office.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBatches.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-blue-50 text-brandBlue-700 px-2.5 py-1 rounded">
                    Batch Code: {batch.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full capitalize">
                    {batch.learning_mode}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-900">{batch.name}</h3>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Class Days:</span>
                    <span className="font-semibold text-slate-800">{batch.schedule_days}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Time Slot:</span>
                    <span className="font-semibold text-slate-800">{batch.time_slot}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Classroom:</span>
                    <span className="font-semibold text-slate-800">{batch.classroom_number}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Seat Capacity:</span>
                    <span className="font-semibold text-slate-800">{batch.capacity} Students</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/admission?course=${course.id}&batch=${batch.id}`}
                    className="w-full py-2 bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold rounded-lg text-center block transition-colors"
                  >
                    Select this Batch & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
