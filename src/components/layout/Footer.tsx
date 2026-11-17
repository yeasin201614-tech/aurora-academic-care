import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg inline-block">
                <Image
                  src="/logo.png"
                  alt="Aurora Academic Care"
                  width={160}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Aurora Academic Care is Bangladesh's premier hybrid educational institution, 
              empowering HSC, SSC, Medical, and Engineering candidates through conceptual 
              excellence and dedicated academic mentorship.
            </p>

            <div className="text-xs text-gold-400 font-semibold tracking-wide">
              Tagline: Learn Today. Lead Tomorrow. | Slogan: Learn · Practice · Excel
            </div>

            {/* Social handles */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-brandBlue-600 flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">f</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <span className="font-bold text-xs">▶</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <span className="font-bold text-xs">in</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">
              Academic
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-gold-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-gold-400 transition-colors">
                  Faculty & Mentors
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-gold-400 transition-colors">
                  Online Admission
                </Link>
              </li>
              <li>
                <Link href="/admission-status" className="hover:text-gold-400 transition-colors">
                  Application Status
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-gold-400 transition-colors">
                  Exam Results & Marksheets
                </Link>
              </li>
              <li>
                <Link href="/online-classes" className="hover:text-gold-400 transition-colors">
                  Online Class Hall
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Roles */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">
              Portals
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/auth/login" className="hover:text-gold-400 transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-gold-400 transition-colors">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-gold-400 transition-colors">
                  Parent / Guardian Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-gold-400 transition-colors">
                  Admin & Management
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-gold-400 transition-colors">
                  Notice Board
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-400 transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campuses */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">
              Main Campus
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-1" />
                <span>House #42, Road #11, Dhanmondi, Dhaka-1209, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>+880 1712-345678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>info@auroraacademic.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>Open: Sat - Thu (8:00 AM - 8:30 PM)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Campuses & Payment methods ribbon */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-navy-800 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <span className="font-semibold text-slate-200">Our Branches:</span>
            <span className="bg-navy-800 px-2.5 py-1 rounded">Dhanmondi Main</span>
            <span className="bg-navy-800 px-2.5 py-1 rounded">Uttara Campus</span>
            <span className="bg-navy-800 px-2.5 py-1 rounded">Mirpur 10</span>
            <span className="bg-navy-800 px-2.5 py-1 rounded">Chittagong GEC</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Official Payment Gateways:</span>
            <span className="bg-pink-900/60 text-pink-300 font-bold px-2 py-0.5 rounded text-[11px]">
              bKash
            </span>
            <span className="bg-amber-900/60 text-amber-300 font-bold px-2 py-0.5 rounded text-[11px]">
              Nagad
            </span>
            <span className="bg-purple-900/60 text-purple-300 font-bold px-2 py-0.5 rounded text-[11px]">
              Rocket
            </span>
            <span className="bg-blue-900/60 text-blue-300 font-bold px-2 py-0.5 rounded text-[11px]">
              SSLCOMMERZ
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Bangladesh */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            © 2026 Aurora Academic Care. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gold-400 font-medium">Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
