import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Eye,
  Award,
  CheckCircle2,
  Users,
  Building2,
  BookOpenCheck,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "About Us | Aurora Academic Care",
  description: "Learn about Aurora Academic Care's mission, values, faculty, and commitment to educational excellence in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
            Our Legacy of Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About Aurora Academic Care
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Founded with a vision to revolutionize coaching education in Bangladesh through 
            conceptual clarity, ethical pedagogy, and modernized digital learning tools.
          </p>
        </div>
      </section>

      {/* Main Story & Message from Academic Director */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brandBlue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
              Director's Note
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 leading-tight">
              "We Don't Just Teach; We Inspire You to Conquer Your Potential."
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At Aurora Academic Care, we recognized early on that conventional coaching centres 
              in Bangladesh rely too heavily on rote memorization and question predictions. That 
              approach falls short when students face challenging Board exams or competitive BUET 
              and Medical Admission tests.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We designed our curriculum from the ground up: starting from foundational textbook 
              mechanisms, advancing through creative application, and testing rigorously through 
              weekly digital OMR assessments. Our hybrid system ensures no student is ever left behind.
            </p>

            <div className="pt-2 border-t border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center text-base">
                AAC
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-900">Academic Advisory Board</h4>
                <p className="text-xs text-slate-500">Aurora Academic Care, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-black text-brandBlue-600">8+</div>
                  <div className="text-xs font-semibold text-navy-900 mt-1">Years of Pedagogy</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Established in 2018 in Dhanmondi, Dhaka</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-black text-gold-600">4</div>
                  <div className="text-xs font-semibold text-navy-900 mt-1">Prime Campuses</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Dhanmondi, Uttara, Mirpur & Chittagong</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-black text-emerald-600">98.4%</div>
                  <div className="text-xs font-semibold text-navy-900 mt-1">Board Pass Rate</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Over 70% Golden GPA 5.0 recipients</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-black text-purple-600">100%</div>
                  <div className="text-xs font-semibold text-navy-900 mt-1">Verified Mentors</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">BUET, Medical & DU alumni faculties</p>
                </div>
              </div>

              <div className="bg-navy-900 text-white p-5 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  Our Core Pillars
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1. Deep Conceptual Understanding • 2. Continuous Metric Tracking • 3. Guardian Transparency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-brandBlue-600 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To empower secondary and higher secondary students across Bangladesh with unshakeable 
                academic confidence, cutting-edge problem-solving skills, and ethical values through 
                hybrid learning accessible to everyone.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-600 flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be recognised as Bangladesh's most trusted educational institution by consistently 
                fostering national toppers, university leaders, and conscientious citizens who excel 
                in STEM, medical sciences, and global academia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-navy-900">Campus Facilities</h2>
          <p className="text-slate-600 text-sm mt-1">
            Engineered to provide an optimal learning environment for intensive concentration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-2">
            <Building2 className="w-6 h-6 text-brandBlue-600" />
            <h4 className="text-base font-bold text-navy-900">Air-Conditioned Auditoriums</h4>
            <p className="text-xs text-slate-600">Acoustically treated lecture halls equipped with ultra-bright laser projectors.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-2">
            <BookOpenCheck className="w-6 h-6 text-gold-600" />
            <h4 className="text-base font-bold text-navy-900">Quiet Study Library</h4>
            <p className="text-xs text-slate-600">Curated collection of NCTB references, Indian Olympiad books, and quiet reading desks.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="text-base font-bold text-navy-900">CCTV & Guardian Safety</h4>
            <p className="text-xs text-slate-600">24/7 campus security monitoring with automated SMS upon student entry and exit.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Join the Aurora Family Today</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Take the first step towards securing your golden future in HSC, SSC, or university admission.
          </p>
          <div className="pt-2">
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-xl transition-all shadow-lg"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
