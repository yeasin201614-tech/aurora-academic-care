import Link from "next/link";
import {
  Laptop,
  Video,
  ShieldCheck,
  Lock,
  LogIn,
  CheckCircle2,
  Calendar,
  Clock,
  HelpCircle,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Online Classes Information | Aurora Academic Care",
  description: "Learn how to access Aurora Academic Care's secure live online lectures, Google Meet sessions, and lecture archives.",
};

export default function OnlineClassesInfoPage() {
  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
            Virtual Learning Hall
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Online Classes & Live Sessions
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Attend interactive live lectures from any district in Bangladesh with high-definition 
            audio, digital whiteboards, and real-time student-teacher interaction.
          </p>
        </div>
      </section>

      {/* Security & Access Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-soft">
          <div className="w-14 h-14 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h3 className="text-base font-bold text-amber-900">
              Live Meeting Links Are Strictly Protected
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              In accordance with institutional cybersecurity guidelines, Google Meet and Zoom 
              room links are never exposed publicly. They are dynamically generated and exclusively 
              accessible to verified enrolled students and assigned faculties inside the Student Portal.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 flex-shrink-0"
          >
            <LogIn className="w-4 h-4 text-gold-400" />
            <span>Login to Join Class</span>
          </Link>
        </div>
      </section>

      {/* Features & How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-brandBlue-600 flex items-center justify-center font-bold">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">HD Google Meet & Zoom</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Crystal-clear audio-video streaming with multi-screen camera setups capturing 
              the lecturer, digital writing tablets, and laboratory simulations.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">1080p Lecture Archives</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every live class is archived within 2 hours. Enrolled students enjoy unlimited 
              replays throughout the academic term for revision and exam prep.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Automated Attendance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Session duration and attendance are recorded automatically by our portal and 
              dispatched to guardian dashboards with daily SMS summaries.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Requirements */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft space-y-4">
          <h2 className="text-xl font-bold text-navy-900">Recommended Device Setup</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-navy-900">Device</h4>
              <p>Laptop, Desktop PC, Tablet, or Smartphone with Google Chrome / Zoom Client.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-navy-900">Internet Speed</h4>
              <p>Minimum 5 Mbps broadband or 4G mobile network for lag-free 1080p video.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-navy-900">Audio</h4>
              <p>Standard headphones or earphones with microphone for interactive Q&A.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-navy-900">Notes Access</h4>
              <p>PDF reader to view annotated lecture slides and chapter problem sets.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
