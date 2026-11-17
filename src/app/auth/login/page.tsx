"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEMO_ACCOUNTS } from "@/lib/auth/session";
import { UserRole } from "@/types/database";
import {
  LogIn,
  Lock,
  Mail,
  Shield,
  User,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("student@auroraacademic.com");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const demo = DEMO_ACCOUNTS[role];
    if (demo) {
      setEmail(demo.email);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Redirect to the respective role dashboard
    setTimeout(() => {
      if (selectedRole === "super_admin") {
        router.push("/dashboard/super-admin");
      } else if (selectedRole === "admin") {
        router.push("/dashboard/admin");
      } else if (selectedRole === "teacher") {
        router.push("/dashboard/teacher");
      } else if (selectedRole === "parent") {
        router.push("/dashboard/parent");
      } else {
        router.push("/dashboard/student");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.png"
            alt="Aurora Academic Care"
            width={180}
            height={60}
            className="h-14 w-auto mx-auto object-contain"
          />
        </Link>
        <h1 className="text-2xl font-black text-navy-900 tracking-tight">
          Aurora Academic Care Portal
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to access your customized academic dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 shadow-card space-y-6">
          {/* Role Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider text-center">
              Select Your Role / Portal
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(
                [
                  { role: "student", label: "Student", icon: GraduationCap },
                  { role: "parent", label: "Guardian", icon: Users },
                  { role: "teacher", label: "Teacher", icon: User },
                  { role: "admin", label: "Admin", icon: Shield },
                  { role: "super_admin", label: "Super Admin", icon: Lock },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedRole === tab.role;
                return (
                  <button
                    key={tab.role}
                    type="button"
                    onClick={() => handleRoleSelect(tab.role)}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all border ${
                      isSelected
                        ? "bg-navy-800 text-gold-400 border-navy-800 shadow-md ring-2 ring-navy-100"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Demo Switcher Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[11px] text-brandBlue-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brandBlue-600 flex-shrink-0" />
              <span>
                Testing as <strong>{DEMO_ACCOUNTS[selectedRole].name}</strong> ({selectedRole.replace("_", " ")})
              </span>
            </span>
            <span className="text-brandBlue-600 font-mono text-[10px]">Ready</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email / Student ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-slate-700">Password</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] text-brandBlue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-gold-400" />
                  <span>Enter {selectedRole.toUpperCase().replace("_", " ")} Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Links back to public */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-navy-900 transition-colors">
              ← Return to Main Website
            </Link>
            <Link href="/admission" className="text-brandBlue-600 font-semibold hover:underline">
              New student? Apply here
            </Link>
          </div>
        </div>

        {/* Quick Demo Credentials Helper */}
        <div className="mt-6 bg-white/90 backdrop-blur border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm text-xs">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-navy-900">ডিমো একাউন্টসমূহ (১-ক্লিক লগইন):</span>
            </div>
            <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
              Password: Aurora@2026
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => { handleRoleSelect("super_admin"); setPassword("Aurora@2026"); }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-gold-50/50 border border-slate-200 hover:border-gold-400 text-left transition-all group"
            >
              <div className="font-bold text-navy-900 group-hover:text-gold-700 flex items-center justify-between">
                <span>🛡️ Super Admin</span>
                <span className="text-[9px] text-slate-400 font-normal">Click to fill</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">superadmin@auroraacademic.com</div>
            </button>

            <button
              type="button"
              onClick={() => { handleRoleSelect("admin"); setPassword("Aurora@2026"); }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-brandBlue-400 text-left transition-all group"
            >
              <div className="font-bold text-navy-900 group-hover:text-brandBlue-700 flex items-center justify-between">
                <span>👔 Admin</span>
                <span className="text-[9px] text-slate-400 font-normal">Click to fill</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">admin@auroraacademic.com</div>
            </button>

            <button
              type="button"
              onClick={() => { handleRoleSelect("teacher"); setPassword("Aurora@2026"); }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-400 text-left transition-all group"
            >
              <div className="font-bold text-navy-900 group-hover:text-emerald-700 flex items-center justify-between">
                <span>👨‍🏫 Teacher</span>
                <span className="text-[9px] text-slate-400 font-normal">Click to fill</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">teacher@auroraacademic.com</div>
            </button>

            <button
              type="button"
              onClick={() => { handleRoleSelect("student"); setPassword("Aurora@2026"); }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-400 text-left transition-all group"
            >
              <div className="font-bold text-navy-900 group-hover:text-indigo-700 flex items-center justify-between">
                <span>🎓 Student</span>
                <span className="text-[9px] text-slate-400 font-normal">Click to fill</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">student@auroraacademic.com</div>
            </button>

            <button
              type="button"
              onClick={() => { handleRoleSelect("parent"); setPassword("Aurora@2026"); }}
              className="sm:col-span-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-400 text-left transition-all group"
            >
              <div className="font-bold text-navy-900 group-hover:text-amber-700 flex items-center justify-between">
                <span>👨‍👩‍👧 Guardian / Parent</span>
                <span className="text-[9px] text-slate-400 font-normal">Click to fill</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">parent@auroraacademic.com</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
