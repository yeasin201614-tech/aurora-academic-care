"use client";

import Link from "next/link";
import Image from "next/image";
import { UserRole } from "@/types/database";
import { DEMO_ACCOUNTS } from "@/lib/auth/session";
import {
  Bell,
  Search,
  LogOut,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Users,
  UserCheck
} from "lucide-react";

interface DashboardHeaderProps {
  currentRole: UserRole;
  title: string;
}

export function DashboardHeader({ currentRole, title }: DashboardHeaderProps) {
  const account = DEMO_ACCOUNTS[currentRole];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-navy-900">{title}</h1>
        <span className="hidden sm:inline-block bg-blue-50 text-brandBlue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 uppercase">
          {currentRole.replace("_", " ")} Portal
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-xs text-slate-500 hover:text-navy-900 flex items-center gap-1 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Public Site</span>
        </Link>

        {/* Notifications Mock */}
        <div className="relative">
          <button className="p-2 text-slate-500 hover:text-navy-900 rounded-lg hover:bg-slate-100 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-navy-800 text-gold-400 flex items-center justify-center font-bold text-xs border border-slate-200">
            <Image
              src={account.avatar}
              alt={account.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block text-left text-xs leading-tight">
            <div className="font-bold text-navy-900">{account.name}</div>
            <div className="text-[10px] text-slate-400 capitalize">{account.role.replace("_", " ")}</div>
          </div>

          <Link
            href="/auth/login"
            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors ml-1"
            title="Sign Out / Switch Account"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
