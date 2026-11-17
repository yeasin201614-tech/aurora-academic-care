"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/supabase/mock-db";
import { AdmissionApplication } from "@/types/database";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Building,
  GraduationCap,
  BookOpen,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Printer,
  Sparkles
} from "lucide-react";

interface AdmissionFormProps {
  initialCourseId?: string;
  initialBatchId?: string;
}

export function AdmissionForm({ initialCourseId, initialBatchId }: AdmissionFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApplication, setSubmittedApplication] = useState<AdmissionApplication | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Student
    student_name: "",
    student_name_bn: "",
    phone: "",
    email: "",
    date_of_birth: "",
    gender: "Male",
    present_address: "",
    permanent_address: "",

    // Step 2: Guardian
    guardian_name: "",
    guardian_phone: "",
    guardian_email: "",
    guardian_relationship: "Father",
    emergency_contact: "",

    // Step 3: Academic
    current_class: "HSC 1st Year (Class 11)",
    previous_school: "",
    academic_group: "Science",
    selected_course_id: initialCourseId || db.courses[0]?.id || "",
    selected_batch_id: initialBatchId || db.batches[0]?.id || "",
    learning_mode: "hybrid",
    additional_notes: "",
  });

  const courses = db.courses;
  const filteredBatches = db.batches.filter(
    (b) => b.course_id === formData.selected_course_id
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.student_name.trim() || formData.student_name.length < 3) {
        errors.student_name = "Full name is required (at least 3 characters)";
      }
      if (!formData.phone.trim() || !/^(?:\+8801|8801|01)[3-9]\d{8}$/.test(formData.phone)) {
        errors.phone = "Valid Bangladeshi mobile number required (01xxxxxxxxx)";
      }
      if (!formData.date_of_birth) {
        errors.date_of_birth = "Date of birth is required";
      }
      if (!formData.present_address.trim()) {
        errors.present_address = "Present address is required";
      }
      if (!formData.permanent_address.trim()) {
        errors.permanent_address = "Permanent address is required";
      }
    }

    if (currentStep === 2) {
      if (!formData.guardian_name.trim() || formData.guardian_name.length < 3) {
        errors.guardian_name = "Guardian name is required";
      }
      if (!formData.guardian_phone.trim() || !/^(?:\+8801|8801|01)[3-9]\d{8}$/.test(formData.guardian_phone)) {
        errors.guardian_phone = "Valid Bangladeshi mobile number required for guardian";
      }
      if (!formData.emergency_contact.trim()) {
        errors.emergency_contact = "Emergency contact is required";
      }
    }

    if (currentStep === 3) {
      if (!formData.previous_school.trim()) {
        errors.previous_school = "Previous school/college name is required";
      }
      if (!formData.selected_course_id) {
        errors.selected_course_id = "Please select a course";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admission/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success && data.application) {
        setSubmittedApplication(data.application);
      } else {
        alert(data.error || "Submission failed. Please check form fields.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback direct mock DB insert
      const app = db.addApplication({
        student_name: formData.student_name,
        student_name_bn: formData.student_name_bn,
        phone: formData.phone,
        email: formData.email,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        present_address: formData.present_address,
        permanent_address: formData.permanent_address,
        current_class: formData.current_class,
        previous_school: formData.previous_school,
        academic_group: formData.academic_group,
        selected_course_id: formData.selected_course_id,
        selected_batch_id: formData.selected_batch_id,
        learning_mode: formData.learning_mode as any,
        guardian_name: formData.guardian_name,
        guardian_phone: formData.guardian_phone,
        guardian_email: formData.guardian_email,
        guardian_relationship: formData.guardian_relationship,
        emergency_contact: formData.emergency_contact,
        review_notes: "Application received and queued for administrative review.",
      });
      setSubmittedApplication(app);
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedApplication) {
    const selectedCourse = courses.find((c) => c.id === submittedApplication.selected_course_id);

    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card max-w-3xl mx-auto space-y-6 text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide">
            Status: {submittedApplication.status.toUpperCase()}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Admission Application Received!
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Your application has been logged into the Aurora Academic Care registry. 
            Our admissions board is reviewing your details.
          </p>
        </div>

        {/* Application Reference Callout */}
        <div className="bg-navy-900 text-white p-6 rounded-2xl max-w-md mx-auto space-y-2 shadow-lg">
          <span className="text-xs text-gold-400 font-medium uppercase tracking-wider block">
            Your Unique Application Reference Number
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold tracking-wider text-white">
            {submittedApplication.application_reference}
          </div>
          <p className="text-[11px] text-slate-300">
            Keep this reference safe. You will need it to check review status and complete enrollment.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left text-xs space-y-2.5 max-w-md mx-auto">
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500">Applicant Name:</span>
            <span className="font-bold text-navy-900">{submittedApplication.student_name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500">Contact Mobile:</span>
            <span className="font-semibold text-slate-800">{submittedApplication.phone}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500">Selected Program:</span>
            <span className="font-semibold text-slate-800">{selectedCourse?.title_en || "General Care"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500">Learning Mode:</span>
            <span className="font-bold text-brandBlue-600 uppercase">{submittedApplication.learning_mode}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Submission Timestamp:</span>
            <span className="text-slate-700">{new Date(submittedApplication.created_at).toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow"
          >
            <Printer className="w-4 h-4 text-gold-400" />
            <span>Print Application Slip</span>
          </button>

          <button
            onClick={() => router.push(`/admission-status?ref=${submittedApplication.application_reference}`)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow"
          >
            <span>Live Status Tracker →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {[
            { num: 1, label: "Student Info" },
            { num: 2, label: "Guardian Info" },
            { num: 3, label: "Academic & Course" },
            { num: 4, label: "Review & Submit" },
          ].map((item, idx) => (
            <div key={item.num} className="flex flex-col items-center flex-1 relative">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === item.num
                    ? "bg-navy-800 text-gold-400 ring-4 ring-navy-100"
                    : step > item.num
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > item.num ? <CheckCircle2 className="w-4 h-4" /> : item.num}
              </div>
              <span className={`text-[11px] font-medium mt-1 text-center ${step === item.num ? "text-navy-900 font-bold" : "text-slate-400"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ====================================================================
            STEP 1: STUDENT INFORMATION
           ==================================================================== */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-navy-900">Step 1: Student Personal Information</h3>
              <p className="text-xs text-slate-500">Provide verified student details according to official school/board records.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  placeholder="e.g. Mahmud Hasan"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.student_name && <p className="text-xs text-red-500 mt-1">{formErrors.student_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (বাংলা)
                </label>
                <input
                  type="text"
                  name="student_name_bn"
                  value={formData.student_name_bn}
                  onChange={handleChange}
                  placeholder="যেমন: মাহমুদ হাসান"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="017xxxxxxxx"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.date_of_birth && <p className="text-xs text-red-500 mt-1">{formErrors.date_of_birth}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white"
                >
                  <option value="Male">Male (ছাত্র)</option>
                  <option value="Female">Female (ছাত্রী)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Present Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="present_address"
                  value={formData.present_address}
                  onChange={handleChange}
                  placeholder="House, Road, Area, Dhaka"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.present_address && <p className="text-xs text-red-500 mt-1">{formErrors.present_address}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="permanent_address"
                  value={formData.permanent_address}
                  onChange={handleChange}
                  placeholder="Village/Thana, District"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.permanent_address && <p className="text-xs text-red-500 mt-1">{formErrors.permanent_address}</p>}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            STEP 2: GUARDIAN INFORMATION
           ==================================================================== */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-navy-900">Step 2: Guardian Information</h3>
              <p className="text-xs text-slate-500">Guardian contact will receive automated SMS notifications for attendance & test marks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Guardian Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="guardian_name"
                  value={formData.guardian_name}
                  onChange={handleChange}
                  placeholder="e.g. Md. Rafiqul Hasan"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.guardian_name && <p className="text-xs text-red-500 mt-1">{formErrors.guardian_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Guardian Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="guardian_phone"
                  value={formData.guardian_phone}
                  onChange={handleChange}
                  placeholder="017xxxxxxxx"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.guardian_phone && <p className="text-xs text-red-500 mt-1">{formErrors.guardian_phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Relationship with Student <span className="text-red-500">*</span>
                </label>
                <select
                  name="guardian_relationship"
                  value={formData.guardian_relationship}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white"
                >
                  <option value="Father">Father (বাবা)</option>
                  <option value="Mother">Mother (মা)</option>
                  <option value="Brother">Brother (ভাই)</option>
                  <option value="Sister">Sister (বোন)</option>
                  <option value="Legal Guardian">Legal Guardian (আইনগত অভিভাবক)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Guardian Email
                </label>
                <input
                  type="email"
                  name="guardian_email"
                  value={formData.guardian_email}
                  onChange={handleChange}
                  placeholder="guardian@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  placeholder="01xxxxxxxx"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.emergency_contact && <p className="text-xs text-red-500 mt-1">{formErrors.emergency_contact}</p>}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            STEP 3: ACADEMIC & COURSE SELECTION
           ==================================================================== */}
        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-navy-900">Step 3: Academic Background & Program</h3>
              <p className="text-xs text-slate-500">Choose your desired course, preferred batch timing, and learning modality.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Class Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="current_class"
                  value={formData.current_class}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white"
                >
                  <option value="Class 9 (SSC)">Class 9 (SSC)</option>
                  <option value="Class 10 (SSC Candidate)">Class 10 (SSC Candidate)</option>
                  <option value="HSC 1st Year (Class 11)">HSC 1st Year (Class 11)</option>
                  <option value="HSC 2nd Year (Class 12)">HSC 2nd Year (Class 12)</option>
                  <option value="HSC Passed (Admission Seeker)">HSC Passed (Admission Seeker)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="academic_group"
                  value={formData.academic_group}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white"
                >
                  <option value="Science">Science (বিজ্ঞান)</option>
                  <option value="Business Studies">Business Studies (ব্যবসায় শিক্ষা)</option>
                  <option value="Humanities">Humanities (মানবিক)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Previous Institution & Academic Results <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="previous_school"
                  value={formData.previous_school}
                  onChange={handleChange}
                  placeholder="e.g. Notre Dame College (SSC GPA 5.00)"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
                {formErrors.previous_school && <p className="text-xs text-red-500 mt-1">{formErrors.previous_school}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selected Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="selected_course_id"
                  value={formData.selected_course_id}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title_en} — {c.category} ({c.duration_months} mo)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Batch
                </label>
                <select
                  name="selected_batch_id"
                  value={formData.selected_batch_id}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white"
                >
                  {filteredBatches.length > 0 ? (
                    filteredBatches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.schedule_days} • {b.time_slot})
                      </option>
                    ))
                  ) : (
                    <option value="">Campus Management Assigns Automatically</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Learning Mode Preference <span className="text-red-500">*</span>
                </label>
                <select
                  name="learning_mode"
                  value={formData.learning_mode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white font-semibold text-brandBlue-700"
                >
                  <option value="offline">Offline Coaching (Physical Campus)</option>
                  <option value="online">Online Classes (Live Stream & Recordings)</option>
                  <option value="hybrid">Hybrid (Both Campus & Online Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Notes or Questions
                </label>
                <input
                  type="text"
                  name="additional_notes"
                  value={formData.additional_notes}
                  onChange={handleChange}
                  placeholder="e.g. Applying for Golden GPA 5.0 scholarship"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            STEP 4: REVIEW & CONFIRM
           ==================================================================== */}
        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-navy-900">Step 4: Review Application & Submit</h3>
              <p className="text-xs text-slate-500">Please verify all details before generating your admission reference.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-navy-900 block text-sm border-b border-slate-200 pb-1">
                  Student Details
                </span>
                <p><strong className="text-slate-500">Name:</strong> {formData.student_name}</p>
                <p><strong className="text-slate-500">Phone:</strong> {formData.phone}</p>
                <p><strong className="text-slate-500">DOB:</strong> {formData.date_of_birth}</p>
                <p><strong className="text-slate-500">Gender:</strong> {formData.gender}</p>
                <p><strong className="text-slate-500">Address:</strong> {formData.present_address}</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-navy-900 block text-sm border-b border-slate-200 pb-1">
                  Guardian & Academic
                </span>
                <p><strong className="text-slate-500">Guardian:</strong> {formData.guardian_name} ({formData.guardian_relationship})</p>
                <p><strong className="text-slate-500">Guardian Phone:</strong> {formData.guardian_phone}</p>
                <p><strong className="text-slate-500">Class:</strong> {formData.current_class} ({formData.academic_group})</p>
                <p><strong className="text-slate-500">Institution:</strong> {formData.previous_school}</p>
                <p><strong className="text-slate-500">Learning Mode:</strong> <span className="uppercase font-bold text-brandBlue-600">{formData.learning_mode}</span></p>
              </div>
            </div>

            {/* Document Upload Simulation */}
            <div className="border border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-2 bg-slate-50/50">
              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-xs font-semibold text-navy-900">
                Upload Student Photo & Previous Marksheet (Optional at this stage)
              </div>
              <p className="text-[11px] text-slate-500">
                You can also submit physical copies at our campus counter during final enrollment.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Important Notice:</strong> Submission of this form registers your application with <strong>PENDING</strong> status. 
                Our administration will verify academic eligibility before issuing your Student ID and Enrollment invoice.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Reference...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-navy-950" />
                  <span>Submit Admission Application</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
