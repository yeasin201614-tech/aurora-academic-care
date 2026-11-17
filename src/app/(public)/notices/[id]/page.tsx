import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/supabase/mock-db";
import { Calendar, ArrowLeft, Pin } from "lucide-react";
import { PrintButton } from "@/components/common/PrintButton";

export async function generateStaticParams() {
  return db.notices.map((n) => ({ id: n.id }));
}

export default function NoticeDetailsPage({ params }: { params: { id: string } }) {
  const notice = db.notices.find((n) => n.id === params.id);
  if (!notice) notFound();

  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/notices"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors no-print"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Notice Board
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card space-y-6 printable-card">
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-50 text-brandBlue-700 font-bold text-xs px-3 py-1 rounded-full uppercase border border-blue-200">
              {notice.category}
            </span>
            {notice.is_pinned && (
              <span className="bg-amber-100 text-amber-800 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                <Pin className="w-3 h-3" /> Pinned Notice
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Published: {new Date(notice.published_at).toLocaleDateString()}
            </span>
            <PrintButton />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 leading-snug">
          {notice.title}
        </h1>

        <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
          {notice.content}
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            <span>By Authority of Academic Affairs • Aurora Academic Care</span>
          </div>
          <div>
            <span>Dhanmondi, Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
