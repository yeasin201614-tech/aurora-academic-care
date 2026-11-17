"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "@/lib/supabase/mock-db";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { formatBDT } from "@/lib/utils/utils";
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  FileCheck2,
  Shield,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  Search,
  Filter,
  ArrowUpRight,
  Database,
  Lock,
  Layers,
  AlertCircle
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [applications, setApplications] = useState(db.admissionApplications);
  const [courses, setCourses] = useState(db.courses);
  const [invoices, setInvoices] = useState(db.invoices);
  const [actionSuccess, setActionSuccess] = useState("");

  const handleApprove = (id: string) => {
    db.updateApplicationStatus(id, "approved", "Approved by Super Administrator. Eligible for enrollment payment.");
    setApplications([...db.admissionApplications]);
    setActionSuccess("Application approved successfully.");
    setTimeout(() => setActionSuccess(""), 4000);
  };

  const handleReject = (id: string) => {
    db.updateApplicationStatus(id, "rejected", "Application rejected based on eligibility requirements.");
    setApplications([...db.admissionApplications]);
    setActionSuccess("Application rejected.");
    setTimeout(() => setActionSuccess(""), 4000);
  };

  const handleEnroll = (id: string) => {
    db.updateApplicationStatus(id, "enrolled", "Enrolled! Student ID generated & invoice issued.");
    setApplications([...db.admissionApplications]);
    setActionSuccess("Student enrolled with permanent ID.");
    setTimeout(() => setActionSuccess(""), 4000);
  };

  // Metrics
  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((acc, curr) => acc + curr.net_amount, 0);
  const pendingAdmissions = applications.filter(a => a.status === "pending").length;

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <DashboardSidebar
        currentRole="super_admin"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader currentRole="super_admin" title="Super Administrator Central Console" />

        <main className="p-4 sm:p-8 space-y-8">
          {actionSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* ====================================================================
              TAB: OVERVIEW
             ==================================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Enrolled Students</span>
                    <GraduationCap className="w-4 h-4 text-brandBlue-600" />
                  </div>
                  <div className="text-2xl font-black text-navy-900">{db.students.length} Active</div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> +14% this session
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Total Collections</span>
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-navy-900">{formatBDT(totalRevenue)}</div>
                  <div className="text-[11px] text-slate-400">Via SSLCOMMERZ & bKash</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Pending Admissions</span>
                    <FileCheck2 className="w-4 h-4 text-gold-500" />
                  </div>
                  <div className="text-2xl font-black text-navy-900">{pendingAdmissions} Applications</div>
                  <div className="text-[11px] text-amber-600 font-semibold">Requires verification</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Active Batches</span>
                    <Layers className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-black text-navy-900">{db.batches.length} Cohorts</div>
                  <div className="text-[11px] text-slate-400">Across 4 campuses</div>
                </div>
              </div>

              {/* Quick Admissions Queue */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Recent Admission Applications</h3>
                    <p className="text-xs text-slate-500">Review and verify student registrations.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("admissions")}
                    className="text-xs font-semibold text-brandBlue-600 hover:underline"
                  >
                    View All Applications →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <th className="p-3 font-semibold">Reference</th>
                        <th className="p-3 font-semibold">Applicant</th>
                        <th className="p-3 font-semibold">Course & Mode</th>
                        <th className="p-3 font-semibold">Guardian Phone</th>
                        <th className="p-3 font-semibold">Status</th>
                        <th className="p-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.slice(0, 5).map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3 font-mono font-bold text-navy-900">{app.application_reference}</td>
                          <td className="p-3 font-semibold text-slate-800">{app.student_name}</td>
                          <td className="p-3 text-slate-600">
                            {courses.find(c => c.id === app.selected_course_id)?.title_en.slice(0, 24)}...
                            <span className="ml-1 uppercase text-[10px] font-bold text-brandBlue-600">({app.learning_mode})</span>
                          </td>
                          <td className="p-3 text-slate-600">{app.guardian_phone}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              app.status === "enrolled" ? "bg-emerald-100 text-emerald-800" :
                              app.status === "approved" ? "bg-blue-100 text-blue-800" :
                              app.status === "rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1.5">
                            {app.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(app.id)}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(app.id)}
                                  className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-[11px] font-semibold"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {app.status === "approved" && (
                              <button
                                onClick={() => handleEnroll(app.id)}
                                className="px-3 py-1 bg-navy-800 hover:bg-navy-900 text-gold-400 rounded text-[11px] font-bold"
                              >
                                Enroll Now
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: ADMISSIONS REVIEW
             ==================================================================== */}
          {activeTab === "admissions" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Admission Applications Registry</h2>
                  <p className="text-xs text-slate-500">Manage all student applications with strict approval controls.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <th className="p-3 font-semibold">Ref Number</th>
                      <th className="p-3 font-semibold">Student Name</th>
                      <th className="p-3 font-semibold">Mobile</th>
                      <th className="p-3 font-semibold">Previous School</th>
                      <th className="p-3 font-semibold">Guardian Info</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold text-right">Administrative Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-navy-900">{app.application_reference}</td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{app.student_name}</span>
                          <span className="text-[10px] text-slate-500">{app.current_class}</span>
                        </td>
                        <td className="p-3 text-slate-600">{app.phone}</td>
                        <td className="p-3 text-slate-600 max-w-xs truncate">{app.previous_school}</td>
                        <td className="p-3 text-slate-600">
                          {app.guardian_name} ({app.guardian_phone})
                        </td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            app.status === "enrolled" ? "bg-emerald-100 text-emerald-800" :
                            app.status === "approved" ? "bg-blue-100 text-blue-800" :
                            app.status === "rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          {app.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(app.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(app.id)}
                                className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-[11px] font-semibold"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {app.status === "approved" && (
                            <button
                              onClick={() => handleEnroll(app.id)}
                              className="px-3 py-1 bg-navy-800 hover:bg-navy-900 text-gold-400 rounded text-[11px] font-bold"
                            >
                              Finalize Enrollment
                            </button>
                          )}
                          {app.status === "enrolled" && (
                            <span className="text-emerald-700 font-semibold text-[11px]">Enrolled ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: FINANCE & SSLCOMMERZ
             ==================================================================== */}
          {activeTab === "finance" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Financial Ledger & Invoices</h2>
                  <p className="text-xs text-slate-500">Live SSLCOMMERZ gateway payments and fee collections.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <th className="p-3 font-semibold">Invoice #</th>
                      <th className="p-3 font-semibold">Student ID</th>
                      <th className="p-3 font-semibold">Title</th>
                      <th className="p-3 font-semibold">Net Amount</th>
                      <th className="p-3 font-semibold">Due Date</th>
                      <th className="p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-navy-900">{inv.invoice_number}</td>
                        <td className="p-3 font-mono text-brandBlue-600">AAC-2026-STU001</td>
                        <td className="p-3 font-semibold text-slate-800">{inv.title}</td>
                        <td className="p-3 font-bold text-navy-900">{formatBDT(inv.net_amount)}</td>
                        <td className="p-3 text-slate-500 font-mono">{inv.due_date}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inv.status === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: AUDIT LOGS & DATABASE
             ==================================================================== */}
          {activeTab === "audit" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-navy-900">Database & Security Compliance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-navy-900 block flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-brandBlue-600" /> PostgreSQL Engine
                  </span>
                  <p className="text-slate-600">Supabase RLS active on 30 tables.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-navy-900 block flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" /> Role-Based Access Control
                  </span>
                  <p className="text-slate-600">Strict separation between Students, Teachers, Admins.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-navy-900 block flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-600" /> SSLCOMMERZ IPN
                  </span>
                  <p className="text-slate-600">Idempotent server-side validation active.</p>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB: CMS & SETTINGS
             ==================================================================== */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-navy-900">Website CMS Configuration</h2>
              <p className="text-xs text-slate-500">Edit dynamic banners, admission sessions, and emergency notices.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Academic Session</label>
                  <input
                    type="text"
                    defaultValue="2026-2027"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Central Helpline Number</label>
                  <input
                    type="text"
                    defaultValue="+880 1712-345678"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
