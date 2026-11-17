import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/supabase/mock-db";
import { formatBDT } from "@/lib/utils/utils";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Shield,
  Laptop,
  Building,
  Layers,
  ChevronRight,
  Star,
  FileCheck,
  TrendingUp,
  MapPin,
  PhoneCall,
  Mail,
  Send,
  HelpCircle
} from "lucide-react";

export default function HomePage() {
  const courses = db.courses;
  const teachers = db.teachers;
  const notices = db.notices;

  return (
    <div className="space-y-20 pb-16">
      {/* ====================================================================
          1. HERO SECTION
         ==================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800 to-navy-950 text-white pt-16 pb-24 lg:pt-20 lg:pb-32">
        {/* Subtle decorative glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandBlue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-gold-500/30 text-gold-400 text-xs font-semibold backdrop-blur-sm shadow-inner">
                <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Admissions Open for Academic Session 2026-2027</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
                Empowering Minds. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-yellow-500">
                  Building Futures.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to <strong className="text-white">Aurora Academic Care</strong> — Bangladesh's premier educational 
                institution dedicated to HSC, SSC, Medical, and Engineering entrance triumph. 
                Experience top-tier faculty, digitized assessment, and true personalized mentorship.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/admission"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold text-base shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-5 h-5 text-navy-950" />
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4 text-navy-950" />
                </Link>

                <Link
                  href="/courses"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-navy-800/90 hover:bg-navy-700/90 text-white font-semibold text-base border border-slate-700/80 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-brandBlue-400" />
                  <span>Explore Courses</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-navy-700/70 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gold-400">98.4%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Board GPA 5.0 Rate</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">450+</div>
                  <div className="text-xs text-slate-400 mt-0.5">BUET & Medical Selections</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">12,000+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Successful Alumni</div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-navy-800/90 to-navy-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 border-b border-navy-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gold-400 font-mono font-medium tracking-wider">
                    AURORA SMART PORTAL
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="bg-navy-950/80 p-4 rounded-xl border border-navy-700/60 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brandBlue-600/30 flex items-center justify-center text-brandBlue-400 font-bold">
                      <Laptop className="w-6 h-6 text-brandBlue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Hybrid Class Routine</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Seamlessly switch between AC campus lectures & HD live streams
                      </p>
                    </div>
                  </div>

                  <div className="bg-navy-950/80 p-4 rounded-xl border border-navy-700/60 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400 font-bold">
                      <FileCheck className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Digital OMR & Instant SMS</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Automated marksheet, merit rank, and guardian SMS within 2 hours
                      </p>
                    </div>
                  </div>

                  <div className="bg-navy-950/80 p-4 rounded-xl border border-navy-700/60 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                      <Users className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">1-on-1 Mentor Doubt Clearing</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Special care sessions after every lecture with BUET & DMC mentors
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/admission-status"
                    className="w-full py-3 bg-navy-700 hover:bg-navy-600 text-slate-200 text-xs font-semibold rounded-lg text-center block transition-colors border border-navy-600"
                  >
                    Already Applied? Track Application Status →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHY CHOOSE US
         ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
            Why Aurora Academic Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-3">
            Setting the Benchmark in Coaching Excellence
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We don't believe in rote memorization. Our proven pedagogy transforms fundamental concepts 
            into competitive mastery for board exams and university admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-brandBlue-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Premier Faculties</h3>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Learn directly from BUET, Dhaka Medical College, and Dhaka University top rank holders with years of proven teaching pedigree.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-gold-600 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Weekly Model Tests</h3>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Rigorous weekly exams, comprehensive creative question evaluation, and competitive merit lists mirroring actual Board and Admission patterns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Smart Study Materials</h3>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Curated lecture sheets, question banks, previous 20 years chapter-wise analysis, and downloadable PDF solution sets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Hybrid Learning Flex</h3>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Missed a physical class? Catch up immediately with crystal-clear 1080p recorded lectures and live interactive Q&A sessions.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. FEATURED COURSES
         ==================================================================== */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
                Featured Programs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2">
                Designed for Academic Dominance
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Explore our specialized coaching programs tailored for HSC, SSC, Medical, and Engineering candidates.
              </p>
            </div>

            <Link
              href="/courses"
              className="text-brandBlue-600 hover:text-brandBlue-700 font-bold text-sm inline-flex items-center gap-1 group self-start md:self-auto"
            >
              <span>View All Courses</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, 8).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-44 w-full bg-navy-800 overflow-hidden">
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

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-brandBlue-600">
                      {course.class_level} • {course.duration_months} Months
                    </div>
                    <h3 className="text-base font-bold text-navy-900 mt-1 line-clamp-2 group-hover:text-brandBlue-600 transition-colors">
                      {course.title_en}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Course Fee</span>
                      <span className="text-lg font-extrabold text-navy-900">
                        {formatBDT(course.fee)}
                      </span>
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      className="px-3.5 py-2 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. EXPERT FACULTY & MENTORS
         ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
            Our Mentors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-3">
            Learn from Bangladesh's Finest Minds
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Every teacher at Aurora is selected through a rigorous 3-stage evaluation process, 
            combining academic excellence with exceptional teaching communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card transition-all text-center group"
            >
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 border-2 border-gold-400 shadow-md">
                <Image
                  src={t.profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                  alt={t.profile?.full_name || "Faculty"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-base font-bold text-navy-900">
                {t.profile?.full_name}
              </h3>
              <p className="text-xs font-medium text-brandBlue-600 mt-0.5">
                {t.designation}
              </p>
              <div className="text-[11px] text-slate-500 mt-1 font-medium bg-slate-50 px-2 py-1 rounded-full inline-block">
                {t.qualification}
              </div>

              <p className="text-xs text-slate-600 mt-3 line-clamp-3">
                {t.bio}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Exp: {t.experience_years}+ Years</span>
                <Link
                  href={`/teachers/${t.id}`}
                  className="text-navy-800 hover:text-brandBlue-600 font-semibold inline-flex items-center gap-0.5"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          5. LEARNING MODES: OFFLINE vs ONLINE vs HYBRID
         ==================================================================== */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
              Flexible Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Learn Your Way: Offline, Online or Hybrid
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Whether you prefer physical classroom interaction or studying from anywhere in Bangladesh, 
              Aurora delivers the highest standard of educational immersion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mode 1: Offline */}
            <div className="bg-navy-800/80 rounded-2xl p-7 border border-navy-700/80 shadow-lg space-y-5">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Offline Coaching</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience world-class air-conditioned multimedia classrooms in Dhanmondi, Uttara, Mirpur, and Chittagong.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Face-to-face mentorship and instant problem solving</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Physical OMR sheet weekly examinations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Printed lecture materials & comprehensive books</span>
                </li>
              </ul>
            </div>

            {/* Mode 2: Online */}
            <div className="bg-navy-800/80 rounded-2xl p-7 border border-navy-700/80 shadow-lg space-y-5">
              <div className="w-12 h-12 rounded-xl bg-brandBlue-600/30 text-brandBlue-400 flex items-center justify-center font-bold">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Online Classes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect from any district in Bangladesh. HD live stream with Google Meet / Zoom and digital whiteboards.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Full 1080p live classes with real-time mic permission</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Online portal MCQ & written exam submission</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>24/7 access to recorded lectures & PDF notes</span>
                </li>
              </ul>
            </div>

            {/* Mode 3: Hybrid (Recommended) */}
            <div className="bg-gradient-to-b from-navy-800 to-navy-950 rounded-2xl p-7 border-2 border-gold-500 shadow-2xl space-y-5 relative">
              <div className="absolute -top-3.5 right-6 bg-gold-500 text-navy-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="w-12 h-12 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Hybrid Learning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The ultimate flexibility. Attend on campus when you want, or switch to online live when traveling or unwell.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Full campus access + unlimited online portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Both physical OMR and digital exam options</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Personal academic counselor assigned</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. LATEST NOTICES & BULLETIN
         ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
              Announcements
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 mt-2">
              Official Notice Board
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Stay updated with academic routines, exam dates, holidays, and admission deadlines.
            </p>
          </div>

          <Link
            href="/notices"
            className="text-brandBlue-600 hover:text-brandBlue-700 font-bold text-sm inline-flex items-center gap-1 group self-start md:self-auto"
          >
            <span>View All Notices</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-brandBlue-700 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-blue-200">
                    {notice.category}
                  </span>
                  {notice.is_pinned && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      📌 Pinned
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-navy-900 line-clamp-2">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {notice.published_at.slice(0, 10)}
                </span>

                <Link
                  href={`/notices/${notice.id}`}
                  className="text-brandBlue-600 hover:text-navy-900 font-semibold"
                >
                  Read Notice →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          7. STUDENT TESTIMONIALS & SUCCESS STORIES
         ==================================================================== */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-3">
              What Our Toppers & Guardians Say
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Hear directly from students who secured Golden GPA 5.0 in Board exams and top ranks in BUET & Medical entrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "Aurora's weekly Physics model tests changed my perspective completely. Instead of memorizing equations, 
                Tanvir Sir taught us how to visualize mechanics problems. Secured BUET 84th merit rank!"
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-800 text-white font-bold flex items-center justify-center text-sm">
                  RH
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Riazul Hoque</h4>
                  <p className="text-xs text-brandBlue-600">BUET '25 (CSE) | Ex-Notre Dame</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "The Medical Buster batch line-by-line textbook analysis and daily OMR tests gave me supreme confidence in Biology & Chemistry. 
                Secured admission at Dhaka Medical College (DMC)!"
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-800 text-white font-bold flex items-center justify-center text-sm">
                  FA
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Farzana Akhter</h4>
                  <p className="text-xs text-brandBlue-600">Dhaka Medical College (DMC) | HSC 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "As a guardian, I appreciate the Parent Portal and immediate SMS attendance alerts. 
                The teachers are always available for consultation during Parent-Teacher meetings."
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-600 text-navy-950 font-bold flex items-center justify-center text-sm">
                  AS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Md. Ashraful Samad</h4>
                  <p className="text-xs text-slate-500">Guardian of HSC Batch A Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FREQUENTLY ASKED QUESTIONS (FAQ)
         ==================================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-navy-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Find quick answers regarding our admission process, fee structure, class timings, and scholarship policies.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brandBlue-600 flex-shrink-0" />
              How does the online admission application work?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed pl-7">
              You fill out our multi-step admission form with student and guardian information, current school details, 
              and preferred course. Once submitted, a unique Application Reference is generated (e.g. AAC-2026-ADM1001). 
              Our administrative panel reviews the application within 24-48 hours and notifies you for enrollment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brandBlue-600 flex-shrink-0" />
              What payment methods are supported?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed pl-7">
              We integrate official SSLCOMMERZ gateway accepting bKash, Nagad, Rocket, Upay, 
              Visa, Mastercard, and internet banking. You can also pay tuition fees via offline cash counter at our campuses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brandBlue-600 flex-shrink-0" />
              Are scholarships available for meritorious students?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed pl-7">
              Yes! Students who achieved Golden GPA 5.0 in SSC or previous school board examinations 
              are eligible for up to 25% waiver on course tuition fees. We also provide full financial aid 
              for deserving underprivileged students upon submitting verification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brandBlue-600 flex-shrink-0" />
              Can I access online classes if I enroll in an offline batch?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed pl-7">
              Absolutely. All our offline students are given complete access to the Aurora Student Portal, 
              allowing you to join live Google Meet / Zoom streams when you cannot attend physically, 
              as well as review 1080p class recordings and download PDF lecture notes.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. BIG CTA BANNER (APPLY TODAY)
         ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 rounded-3xl p-8 sm:p-14 border border-gold-500/40 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wide">
              Limited Seats per Batch
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Ready to Accelerate Your Academic Excellence?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join thousands of aspiring doctors, engineers, and board toppers. Complete your online admission 
              application in less than 5 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                href="/admission"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-base shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Complete Admission Form</span>
                <ArrowRight className="w-4 h-4 text-navy-950" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-base border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-gold-400" />
                <span>Contact Campus Helpline</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
