export type UserRole = "super_admin" | "admin" | "teacher" | "student" | "parent";

export type LearningMode = "offline" | "online" | "hybrid";

export type AdmissionStatus = "draft" | "pending" | "under_review" | "approved" | "rejected" | "enrolled";

export type AttendanceStatus = "present" | "absent" | "late" | "leave";

export type ExamType = "mcq" | "written" | "model_test" | "monthly" | "final";

export type InvoiceStatus = "pending" | "paid" | "partially_paid" | "overdue" | "cancelled";

export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  bangla_name?: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  profile_id: string;
  student_id_code: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  present_address?: string;
  permanent_address?: string;
  current_school?: string;
  class_level?: string;
  academic_group?: string;
  emergency_contact?: string;
  status: string;
  profile?: Profile;
}

export interface Teacher {
  id: string;
  profile_id: string;
  designation: string;
  department: string;
  qualification: string;
  bio?: string;
  experience_years: number;
  joining_date: string;
  specialization?: string;
  is_featured: boolean;
  profile?: Profile;
}

export interface Course {
  id: string;
  title_en: string;
  title_bn?: string;
  slug: string;
  description: string;
  category: string;
  class_level: string;
  duration_months: number;
  fee: number;
  learning_mode: LearningMode;
  thumbnail_url?: string;
  is_active: boolean;
  created_at?: string;
}

export interface Batch {
  id: string;
  course_id: string;
  name: string;
  code: string;
  lead_teacher_id?: string;
  classroom_number?: string;
  capacity: number;
  schedule_days?: string;
  time_slot?: string;
  start_date?: string;
  end_date?: string;
  learning_mode: LearningMode;
  status: string;
  course?: Course;
  lead_teacher?: Teacher;
}

export interface AdmissionApplication {
  id: string;
  application_reference: string;
  student_name: string;
  student_name_bn?: string;
  phone: string;
  email?: string;
  date_of_birth?: string;
  gender?: string;
  present_address?: string;
  permanent_address?: string;
  current_class: string;
  previous_school?: string;
  academic_group?: string;
  selected_course_id?: string;
  selected_batch_id?: string;
  learning_mode: LearningMode;
  guardian_name: string;
  guardian_phone: string;
  guardian_email?: string;
  guardian_relationship: string;
  photo_url?: string;
  emergency_contact?: string;
  status: AdmissionStatus;
  review_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  assigned_student_id?: string;
  created_at: string;
  course?: Course;
  batch?: Batch;
}

export interface ClassSession {
  id: string;
  batch_id: string;
  teacher_id?: string;
  title: string;
  session_date: string;
  start_time: string;
  end_time: string;
  meeting_platform?: string;
  meeting_link?: string;
  recording_link?: string;
  is_completed: boolean;
}

export interface AttendanceRecord {
  id: string;
  session_id: string;
  student_id: string;
  status: AttendanceStatus;
  remark?: string;
  recorded_at: string;
  student?: Student;
}

export interface Exam {
  id: string;
  batch_id: string;
  title: string;
  exam_type: ExamType;
  exam_date: string;
  total_marks: number;
  pass_marks: number;
  is_published: boolean;
  published_at?: string;
}

export interface Result {
  id: string;
  exam_id: string;
  student_id: string;
  subject_id?: string;
  marks_obtained: number;
  grade: string;
  grade_point: number;
  merit_rank?: number;
  remarks?: string;
  exam?: Exam;
  student?: Student;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  student_id: string;
  title: string;
  fee_type: string;
  amount: number;
  discount: number;
  net_amount: number;
  due_date: string;
  status: InvoiceStatus;
  created_at: string;
  student?: Student;
}

export interface Payment {
  id: string;
  invoice_id?: string;
  student_id: string;
  transaction_id: string;
  payment_method: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gateway_val_id?: string;
  gateway_response?: any;
  paid_at?: string;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  target_role: string;
  category: string;
  attachment_url?: string;
  is_pinned: boolean;
  is_published: boolean;
  published_at: string;
}
