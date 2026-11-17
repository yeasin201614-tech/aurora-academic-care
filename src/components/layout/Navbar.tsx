"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/Logo";
import {
  Menu,
  X,
  GraduationCap,
  LogIn,
  Search,
  BookOpen,
  Calendar,
  Users,
  Award,
  Video,
  FileText,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Teachers", href: "/teachers" },
  { label: "Admission", href: "/admission", badge: "Open" },
  { label: "Status", href: "/admission-status" },
  { label: "Notices", href: "/notices" },
  { label: "Results", href: "/results" },
  { label: "Online Classes", href: "/online-classes" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2.5"
          : "bg-white border-b border-slate-100 py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-brandBlue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:text-navy-800 hover:bg-slate-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge && (
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs: Apply Now & Portal Login */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/admission-status"
              className="text-xs font-semibold text-slate-600 hover:text-navy-800 border border-slate-300 hover:border-slate-400 px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              Check Status
            </Link>

            <Link
              href="/auth/login"
              className="bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-gold-400" />
              <span>Portal Login</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/auth/login"
              className="bg-navy-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5 text-gold-400" />
              <span>Login</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-navy-800 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Link
              href="/admission"
              className="bg-brandBlue-600 hover:bg-brandBlue-700 text-white text-center text-xs font-semibold py-2.5 rounded-lg shadow"
            >
              Apply for Admission
            </Link>
            <Link
              href="/admission-status"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-center text-xs font-semibold py-2.5 rounded-lg"
            >
              Check Status
            </Link>
          </div>

          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium",
                    isActive
                      ? "bg-blue-50 text-brandBlue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Aurora Academic Care</span>
            <span>Hotline: +880 1712-345678</span>
          </div>
        </div>
      )}
    </header>
  );
}
