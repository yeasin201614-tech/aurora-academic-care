"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/database";
import { cn } from "@/lib/utils/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileCheck2,
  CreditCard,
  Bell,
  Settings,
  Shield,
  Video,
  Clock,
  Layers,
  Award,
  FileText,
  UserCheck,
  ChevronRight,
  LogOut
} from "lucide-react";

interface DashboardSidebarProps {
  currentRole: UserRole;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function DashboardSidebar({ currentRole, activeTab, onTabChange }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-950 text-slate-300 flex flex-col flex-shrink-0 border-r border-navy-800 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-navy-800 flex items-center justify-between">
        <Link href="/" className="inline-block">
          <div className="bg-white px-2 py-1 rounded-lg">
            <Image
              src="/logo.png"
              alt="Aurora Academic Care"
              width={140}
              height={45}
              className="h-8 w-auto object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-5 py-3 bg-navy-900/60 border-b border-navy-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Logged in as:</span>
        <span className="font-bold text-gold-400 uppercase tracking-wider text-[11px]">
          {currentRole.replace("_", " ")}
        </span>
      </div>

      {/* Quick Role Switcher (Crucial for Reviewer Experience) */}
      <div className="p-4 border-b border-navy-800/60">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
          Switch Dashboard Role:
        </span>
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <Link
            href="/dashboard/super-admin"
            className={cn(
              "p-1.5 rounded text-center font-medium transition-colors",
              currentRole === "super_admin" ? "bg-gold-500 text-navy-950 font-bold" : "bg-navy-900 hover:bg-navy-850 text-slate-300"
            )}
          >
            Super Admin
          </Link>
          <Link
            href="/dashboard/admin"
            className={cn(
              "p-1.5 rounded text-center font-medium transition-colors",
              currentRole === "admin" ? "bg-gold-500 text-navy-950 font-bold" : "bg-navy-900 hover:bg-navy-850 text-slate-300"
            )}
          >
            Admin
          </Link>
          <Link
            href="/dashboard/teacher"
            className={cn(
              "p-1.5 rounded text-center font-medium transition-colors",
              currentRole === "teacher" ? "bg-gold-500 text-navy-950 font-bold" : "bg-navy-900 hover:bg-navy-850 text-slate-300"
            )}
          >
            Teacher
          </Link>
          <Link
            href="/dashboard/student"
            className={cn(
              "p-1.5 rounded text-center font-medium transition-colors",
              currentRole === "student" ? "bg-gold-500 text-navy-950 font-bold" : "bg-navy-900 hover:bg-navy-850 text-slate-300"
            )}
          >
            Student
          </Link>
          <Link
            href="/dashboard/parent"
            className={cn(
              "col-span-2 p-1.5 rounded text-center font-medium transition-colors",
              currentRole === "parent" ? "bg-gold-500 text-navy-950 font-bold" : "bg-navy-900 hover:bg-navy-850 text-slate-300"
            )}
          >
            Parent / Guardian
          </Link>
        </div>
      </div>

      {/* Navigation Links depending on role */}
      <nav className="flex-1 p-4 space-y-1 text-xs overflow-y-auto">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 py-1">
          Menu Navigation
        </div>

        {currentRole === "super_admin" && (
          <>
            <button
              onClick={() => onTabChange?.("overview")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "overview" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> System Overview</span>
            </button>
            <button
              onClick={() => onTabChange?.("admissions")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "admissions" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><FileCheck2 className="w-4 h-4" /> Admissions Review</span>
            </button>
            <button
              onClick={() => onTabChange?.("users")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "users" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Users & Roles</span>
            </button>
            <button
              onClick={() => onTabChange?.("courses")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "courses" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Courses & Batches</span>
            </button>
            <button
              onClick={() => onTabChange?.("finance")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "finance" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Finance & SSLCOMMERZ</span>
            </button>
            <button
              onClick={() => onTabChange?.("audit")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "audit" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Audit Logs & Security</span>
            </button>
            <button
              onClick={() => onTabChange?.("settings")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "settings" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> CMS & Site Settings</span>
            </button>
          </>
        )}

        {currentRole === "admin" && (
          <>
            <button
              onClick={() => onTabChange?.("overview")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "overview" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Operations Hub</span>
            </button>
            <button
              onClick={() => onTabChange?.("admissions")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "admissions" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><FileCheck2 className="w-4 h-4" /> Admissions</span>
            </button>
            <button
              onClick={() => onTabChange?.("students")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "students" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Student Registry</span>
            </button>
            <button
              onClick={() => onTabChange?.("batches")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "batches" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Batches & Routines</span>
            </button>
            <button
              onClick={() => onTabChange?.("attendance")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "attendance" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Attendance Registry</span>
            </button>
            <button
              onClick={() => onTabChange?.("exams")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "exams" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Exams & Merit Lists</span>
            </button>
            <button
              onClick={() => onTabChange?.("invoices")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "invoices" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Fee Invoices</span>
            </button>
          </>
        )}

        {currentRole === "teacher" && (
          <>
            <button
              onClick={() => onTabChange?.("overview")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "overview" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Faculty Hub</span>
            </button>
            <button
              onClick={() => onTabChange?.("classes")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "classes" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Video className="w-4 h-4" /> Live Class Launcher</span>
            </button>
            <button
              onClick={() => onTabChange?.("attendance")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "attendance" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Mark Attendance</span>
            </button>
            <button
              onClick={() => onTabChange?.("marks")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "marks" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Grade Marks Entry</span>
            </button>
            <button
              onClick={() => onTabChange?.("materials")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "materials" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Study Materials</span>
            </button>
          </>
        )}

        {currentRole === "student" && (
          <>
            <button
              onClick={() => onTabChange?.("overview")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "overview" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Student Portal</span>
            </button>
            <button
              onClick={() => onTabChange?.("idcard")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "idcard" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Digital ID Card</span>
            </button>
            <button
              onClick={() => onTabChange?.("live")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "live" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Video className="w-4 h-4 text-emerald-400" /> Join Live Class</span>
            </button>
            <button
              onClick={() => onTabChange?.("results")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "results" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Results & Marksheet</span>
            </button>
            <button
              onClick={() => onTabChange?.("invoices")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "invoices" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-gold-400" /> Invoices & Pay</span>
            </button>
            <button
              onClick={() => onTabChange?.("attendance")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "attendance" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Attendance Tracker</span>
            </button>
          </>
        )}

        {currentRole === "parent" && (
          <>
            <button
              onClick={() => onTabChange?.("overview")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "overview" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Guardian Hub</span>
            </button>
            <button
              onClick={() => onTabChange?.("attendance")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "attendance" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Attendance & Alerts</span>
            </button>
            <button
              onClick={() => onTabChange?.("academics")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "academics" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Academic Progress</span>
            </button>
            <button
              onClick={() => onTabChange?.("billing")}
              className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-left transition-colors", activeTab === "billing" ? "bg-brandBlue-600 text-white font-bold" : "hover:bg-navy-900 text-slate-300")}
            >
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Tuition Invoices</span>
            </button>
          </>
        )}
      </nav>

      {/* Footer logout */}
      <div className="p-4 border-t border-navy-800">
        <Link
          href="/auth/login"
          className="flex items-center justify-between text-xs text-slate-400 hover:text-white transition-colors"
        >
          <span>Sign Out</span>
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
