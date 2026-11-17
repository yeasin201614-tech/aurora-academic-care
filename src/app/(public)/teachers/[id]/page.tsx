import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase/mock-db";
import {
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export async function generateStaticParams() {
  return db.teachers.map((t) => ({ id: t.id }));
}

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
  const teacher = db.teachers.find((t) => t.id === params.id);
  if (!teacher) notFound();

  const assignedBatches = db.batches.filter((b) => b.lead_teacher_id === teacher.id);

  return (
    <div className="space-y-12 py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/teachers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Faculty Directory
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-soft">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-gold-400 shadow-md flex-shrink-0">
            <Image
              src={teacher.profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
              alt={teacher.profile?.full_name || "Teacher"}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-blue-50 text-brandBlue-700 font-bold text-xs px-2.5 py-0.5 rounded-full border border-blue-200">
                {teacher.department}
              </span>
              <span className="bg-gold-50 text-gold-700 font-bold text-xs px-2.5 py-0.5 rounded-full border border-gold-200">
                {teacher.experience_years}+ Years Experience
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              {teacher.profile?.full_name}
            </h1>

            {teacher.profile?.bangla_name && (
              <p className="text-sm font-bangla text-slate-500 font-semibold">
                {teacher.profile.bangla_name}
              </p>
            )}

            <div className="text-sm font-semibold text-slate-700">
              {teacher.designation}
            </div>

            <div className="text-xs font-medium text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <strong className="text-navy-900">Academic Qualification:</strong> {teacher.qualification}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
              {teacher.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Assigned Batches */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy-900">
          Classes & Batches Taught by {teacher.profile?.full_name}
        </h2>

        {assignedBatches.length === 0 ? (
          <p className="text-xs text-slate-500">No active batches assigned at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedBatches.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-brandBlue-600">{batch.code}</span>
                  <span className="capitalize font-semibold text-slate-500">{batch.learning_mode}</span>
                </div>
                <h4 className="text-base font-bold text-navy-900">{batch.name}</h4>
                <div className="text-xs text-slate-500">
                  <span>Schedule: {batch.schedule_days} ({batch.time_slot})</span>
                </div>
                <div className="text-xs text-slate-500">
                  <span>Classroom: {batch.classroom_number}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
