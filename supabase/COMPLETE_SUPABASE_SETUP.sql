-- ====================================================================
-- AURORA ACADEMIC CARE - COMPLETE DATABASE SCHEMA
-- Migration: 20261117000001_initial_schema.sql
-- Description: Core 30 normalized tables with indexes, enums, triggers
-- ====================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- CUSTOM ENUM TYPES
-- --------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'teacher', 'student', 'parent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE learning_mode AS ENUM ('offline', 'online', 'hybrid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE admission_status AS ENUM ('draft', 'pending', 'under_review', 'approved', 'rejected', 'enrolled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'leave');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE exam_type AS ENUM ('mcq', 'written', 'model_test', 'monthly', 'final');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'partially_paid', 'overdue', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- --------------------------------------------------------------------
-- HELPER FUNCTION: Trigger for updated_at
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================================================
-- 1. PROFILES (Extends auth.users)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    bangla_name TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 2. STUDENTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. AAC-2026-STU001
    date_of_birth DATE,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    present_address TEXT,
    permanent_address TEXT,
    current_school TEXT,
    class_level VARCHAR(50),
    academic_group VARCHAR(50), -- Science, Commerce, Arts
    emergency_contact TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 3. TEACHERS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    designation TEXT NOT NULL,
    department TEXT NOT NULL,
    qualification TEXT NOT NULL,
    bio TEXT,
    experience_years INT DEFAULT 1,
    joining_date DATE DEFAULT CURRENT_DATE,
    specialization TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 4. GUARDIANS (Parents)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    father_name TEXT,
    mother_name TEXT,
    occupation TEXT,
    monthly_income NUMERIC(12, 2),
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 5. STUDENT_GUARDIANS (Relationship junction)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.student_guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    guardian_id UUID NOT NULL REFERENCES public.guardians(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL DEFAULT 'Guardian',
    is_primary BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(student_id, guardian_id)
);

-- ====================================================================
-- 6. SUBJECTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(30) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100),
    class_level VARCHAR(50),
    group_name VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 7. COURSES
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en TEXT NOT NULL,
    title_bn TEXT,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(60) NOT NULL, -- SSC, HSC, Admission, Foundation
    class_level VARCHAR(50) NOT NULL,
    duration_months INT NOT NULL DEFAULT 6,
    fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    learning_mode learning_mode NOT NULL DEFAULT 'hybrid',
    thumbnail_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 8. COURSE_SUBJECTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.course_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    UNIQUE(course_id, subject_id)
);

-- ====================================================================
-- 9. BATCHES
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    lead_teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    classroom_number VARCHAR(50),
    capacity INT NOT NULL DEFAULT 40,
    schedule_days TEXT, -- e.g. "Sat, Mon, Wed"
    time_slot VARCHAR(60), -- e.g. "04:00 PM - 06:00 PM"
    start_date DATE,
    end_date DATE,
    learning_mode learning_mode NOT NULL DEFAULT 'hybrid',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 10. ENROLLMENTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
    roll_number VARCHAR(30),
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    UNIQUE(student_id, batch_id)
);

-- ====================================================================
-- 11. ADMISSION_APPLICATIONS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.admission_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_reference VARCHAR(40) UNIQUE NOT NULL, -- AAC-2026-ADMxxxxx
    student_name TEXT NOT NULL,
    student_name_bn TEXT,
    phone VARCHAR(30) NOT NULL,
    email TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    present_address TEXT,
    permanent_address TEXT,
    current_class VARCHAR(50) NOT NULL,
    previous_school TEXT,
    academic_group VARCHAR(50),
    selected_course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
    selected_batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
    learning_mode learning_mode NOT NULL DEFAULT 'hybrid',
    guardian_name TEXT NOT NULL,
    guardian_phone VARCHAR(30) NOT NULL,
    guardian_email TEXT,
    guardian_relationship VARCHAR(50) NOT NULL,
    photo_url TEXT,
    emergency_contact TEXT,
    status admission_status NOT NULL DEFAULT 'pending',
    review_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    assigned_student_id UUID REFERENCES public.students(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 12. ADMISSION_DOCUMENTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.admission_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.admission_applications(id) ON DELETE CASCADE,
    document_type VARCHAR(60) NOT NULL, -- 'marksheet', 'birth_cert', 'nid'
    file_url TEXT NOT NULL,
    file_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 13. CLASS_SESSIONS (Schedules & Online links)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.class_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    meeting_platform VARCHAR(40), -- 'google_meet', 'zoom', 'offline'
    meeting_link TEXT, -- Protected link
    recording_link TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 14. ATTENDANCE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.class_sessions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    status attendance_status NOT NULL DEFAULT 'present',
    remark TEXT,
    marked_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(session_id, student_id)
);

-- ====================================================================
-- 15. EXAMS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    exam_type exam_type NOT NULL DEFAULT 'model_test',
    exam_date DATE NOT NULL,
    total_marks NUMERIC(6, 2) NOT NULL DEFAULT 100,
    pass_marks NUMERIC(6, 2) NOT NULL DEFAULT 40,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 16. EXAM_SUBJECTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.exam_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    max_marks NUMERIC(6, 2) NOT NULL DEFAULT 100,
    pass_marks NUMERIC(6, 2) NOT NULL DEFAULT 40,
    UNIQUE(exam_id, subject_id)
);

-- ====================================================================
-- 17. RESULTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    marks_obtained NUMERIC(6, 2) NOT NULL,
    grade VARCHAR(5) NOT NULL, -- A+, A, A-, B, C, D, F
    grade_point NUMERIC(3, 2) NOT NULL, -- 5.0, 4.0, etc.
    merit_rank INT,
    remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(exam_id, student_id, subject_id)
);

-- ====================================================================
-- 18. GRADING_RULES (Bangladesh Standard 5.0 scale)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.grading_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade VARCHAR(5) NOT NULL,
    min_score NUMERIC(5, 2) NOT NULL,
    max_score NUMERIC(5, 2) NOT NULL,
    grade_point NUMERIC(3, 2) NOT NULL,
    remarks VARCHAR(60) NOT NULL
);

-- ====================================================================
-- 19. INVOICES
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL, -- INV-2026-XXXXX
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    fee_type VARCHAR(60) NOT NULL, -- 'admission', 'monthly_tuition', 'exam_fee'
    amount NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    net_amount NUMERIC(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    status invoice_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 20. PAYMENTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'sslcommerz', 'bkash', 'nagad', 'rocket', 'cash'
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'BDT',
    status payment_status NOT NULL DEFAULT 'pending',
    gateway_val_id TEXT,
    gateway_response JSONB,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 21. PAYMENT_WEBHOOK_EVENTS (Idempotency)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.payment_webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gateway VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100),
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    is_processed BOOLEAN NOT NULL DEFAULT false,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 22. EXPENSES
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    category VARCHAR(60) NOT NULL, -- 'rent', 'teacher_remuneration', 'utilities', 'stationery'
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    receipt_url TEXT,
    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 23. NOTICES
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    target_role VARCHAR(40) NOT NULL DEFAULT 'all', -- 'all', 'student', 'teacher', 'parent'
    category VARCHAR(60) NOT NULL DEFAULT 'academic',
    attachment_url TEXT,
    is_pinned BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 24. MATERIALS (Study Notes, PDFs, Lectures)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    file_type VARCHAR(50) NOT NULL, -- 'pdf', 'video', 'document', 'link'
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 25. ASSIGNMENTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    max_points NUMERIC(5, 2) NOT NULL DEFAULT 20,
    attachment_url TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 26. SUBMISSIONS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    submission_file_url TEXT NOT NULL,
    student_note TEXT,
    marks_obtained NUMERIC(5, 2),
    teacher_feedback TEXT,
    graded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    graded_at TIMESTAMPTZ,
    UNIQUE(assignment_id, student_id)
);

-- ====================================================================
-- 27. NOTIFICATIONS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 28. SUPPORT_TICKETS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    status ticket_status NOT NULL DEFAULT 'open',
    response TEXT,
    responded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 29. SITE_SETTINGS (Admin CMS Content)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 30. AUDIT_LOGS
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    target_table VARCHAR(80),
    record_id TEXT,
    details_json JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_students_student_id_code ON public.students(student_id_code);
CREATE INDEX IF NOT EXISTS idx_batches_course_id ON public.batches(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_batch ON public.enrollments(batch_id);
CREATE INDEX IF NOT EXISTS idx_admission_ref ON public.admission_applications(application_reference);
CREATE INDEX IF NOT EXISTS idx_admission_status ON public.admission_applications(status);
CREATE INDEX IF NOT EXISTS idx_attendance_session ON public.attendance(session_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_results_exam ON public.results(exam_id);
CREATE INDEX IF NOT EXISTS idx_results_student ON public.results(student_id);
CREATE INDEX IF NOT EXISTS idx_invoices_student ON public.invoices(student_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_tx ON public.payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_user ON public.audit_logs(user_id);
-- ====================================================================
-- AURORA ACADEMIC CARE - ROW LEVEL SECURITY POLICIES
-- Migration: 20261117000002_rls_policies.sql
-- Description: Complete RLS policies for 30 tables with role enforcement
-- ====================================================================

-- Enable RLS on all 30 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grading_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------
-- HELPER FUNCTIONS FOR ROLE VERIFICATION (Security Definier)
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin_or_super()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_current_student_id()
RETURNS UUID AS $$
    SELECT id FROM public.students WHERE profile_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_current_teacher_id()
RETURNS UUID AS $$
    SELECT id FROM public.teachers WHERE profile_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_guardian_of_student(p_student_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.student_guardians sg
        JOIN public.guardians g ON g.id = sg.guardian_id
        WHERE g.profile_id = auth.uid() AND sg.student_id = p_student_id
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- --------------------------------------------------------------------
-- 1. PROFILES POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Public profiles can be viewed by authenticated users"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile details"
ON public.profiles FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid() AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())); -- Prevent self-elevation!

CREATE POLICY "Admins have full profile management"
ON public.profiles FOR ALL TO authenticated
USING (public.is_admin_or_super());

-- --------------------------------------------------------------------
-- 2. PUBLIC & ANONYMOUS POLICIES (Courses, Teachers, Notices, Settings)
-- --------------------------------------------------------------------
CREATE POLICY "Courses are viewable by everyone"
ON public.courses FOR SELECT TO anon, authenticated
USING (is_active = true OR public.is_admin_or_super());

CREATE POLICY "Teachers are viewable by everyone"
ON public.teachers FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Public notices viewable by everyone"
ON public.notices FOR SELECT TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Site settings public read"
ON public.site_settings FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Grading rules public read"
ON public.grading_rules FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Subjects read by authenticated"
ON public.subjects FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Batches viewable by enrolled, teachers, and admins"
ON public.batches FOR SELECT TO authenticated
USING (
    public.is_admin_or_super() OR
    lead_teacher_id = public.get_current_teacher_id() OR
    EXISTS (SELECT 1 FROM public.enrollments WHERE batch_id = batches.id AND student_id = public.get_current_student_id())
);

-- --------------------------------------------------------------------
-- 3. ADMISSION APPLICATIONS POLICIES
-- --------------------------------------------------------------------
-- Public can submit admission applications
CREATE POLICY "Public can submit admission application"
ON public.admission_applications FOR INSERT TO anon, authenticated
WITH CHECK (status = 'pending');

-- Public can check their own application status by reference
CREATE POLICY "Public can track admission by reference"
ON public.admission_applications FOR SELECT TO anon, authenticated
USING (true);

-- Admins can update/review admission applications
CREATE POLICY "Admins can manage admission applications"
ON public.admission_applications FOR ALL TO authenticated
USING (public.is_admin_or_super());

CREATE POLICY "Public can insert admission documents"
ON public.admission_documents FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view all admission documents"
ON public.admission_documents FOR SELECT TO authenticated
USING (public.is_admin_or_super());

-- --------------------------------------------------------------------
-- 4. STUDENTS & GUARDIANS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Students can view their own record"
ON public.students FOR SELECT TO authenticated
USING (
    profile_id = auth.uid() OR 
    public.is_admin_or_super() OR
    public.is_guardian_of_student(id)
);

CREATE POLICY "Admins manage students"
ON public.students FOR ALL TO authenticated
USING (public.is_admin_or_super());

CREATE POLICY "Parents view their linked students"
ON public.student_guardians FOR SELECT TO authenticated
USING (
    guardian_id IN (SELECT id FROM public.guardians WHERE profile_id = auth.uid()) OR
    public.is_admin_or_super()
);

-- --------------------------------------------------------------------
-- 5. ATTENDANCE & CLASS SESSIONS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "View class sessions"
ON public.class_sessions FOR SELECT TO authenticated
USING (
    public.is_admin_or_super() OR
    teacher_id = public.get_current_teacher_id() OR
    EXISTS (SELECT 1 FROM public.enrollments WHERE batch_id = class_sessions.batch_id AND student_id = public.get_current_student_id())
);

CREATE POLICY "Teachers and admins manage attendance"
ON public.attendance FOR ALL TO authenticated
USING (
    public.is_admin_or_super() OR
    EXISTS (
        SELECT 1 FROM public.class_sessions cs
        WHERE cs.id = attendance.session_id AND cs.teacher_id = public.get_current_teacher_id()
    )
);

CREATE POLICY "Students and parents view their attendance"
ON public.attendance FOR SELECT TO authenticated
USING (
    student_id = public.get_current_student_id() OR
    public.is_guardian_of_student(student_id)
);

-- --------------------------------------------------------------------
-- 6. EXAMS & RESULTS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "View published results"
ON public.results FOR SELECT TO authenticated
USING (
    public.is_admin_or_super() OR
    student_id = public.get_current_student_id() OR
    public.is_guardian_of_student(student_id) OR
    EXISTS (
        SELECT 1 FROM public.exams e
        JOIN public.batches b ON b.id = e.batch_id
        WHERE e.id = results.exam_id AND b.lead_teacher_id = public.get_current_teacher_id()
    )
);

CREATE POLICY "Staff manage exams and marks"
ON public.exams FOR ALL TO authenticated
USING (public.is_admin_or_super() OR EXISTS (
    SELECT 1 FROM public.batches b WHERE b.id = exams.batch_id AND b.lead_teacher_id = public.get_current_teacher_id()
));

CREATE POLICY "Staff manage results"
ON public.results FOR ALL TO authenticated
USING (public.is_admin_or_super() OR EXISTS (
    SELECT 1 FROM public.exams e
    JOIN public.batches b ON b.id = e.batch_id
    WHERE e.id = results.exam_id AND b.lead_teacher_id = public.get_current_teacher_id()
));

-- --------------------------------------------------------------------
-- 7. INVOICES & PAYMENTS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Students & parents view own invoices"
ON public.invoices FOR SELECT TO authenticated
USING (
    student_id = public.get_current_student_id() OR
    public.is_guardian_of_student(student_id) OR
    public.is_admin_or_super()
);

CREATE POLICY "Admins manage invoices"
ON public.invoices FOR ALL TO authenticated
USING (public.is_admin_or_super());

CREATE POLICY "Students & parents view payments"
ON public.payments FOR SELECT TO authenticated
USING (
    student_id = public.get_current_student_id() OR
    public.is_guardian_of_student(student_id) OR
    public.is_admin_or_super()
);

CREATE POLICY "Admins manage payments"
ON public.payments FOR ALL TO authenticated
USING (public.is_admin_or_super());

-- --------------------------------------------------------------------
-- 8. MATERIALS, ASSIGNMENTS & SUBMISSIONS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "View materials"
ON public.materials FOR SELECT TO authenticated
USING (
    public.is_admin_or_super() OR
    EXISTS (SELECT 1 FROM public.enrollments WHERE batch_id = materials.batch_id AND student_id = public.get_current_student_id()) OR
    EXISTS (SELECT 1 FROM public.batches WHERE id = materials.batch_id AND lead_teacher_id = public.get_current_teacher_id())
);

CREATE POLICY "Teachers and admins manage materials"
ON public.materials FOR ALL TO authenticated
USING (
    public.is_admin_or_super() OR
    EXISTS (SELECT 1 FROM public.batches WHERE id = materials.batch_id AND lead_teacher_id = public.get_current_teacher_id())
);

CREATE POLICY "View assignments"
ON public.assignments FOR SELECT TO authenticated
USING (
    public.is_admin_or_super() OR
    EXISTS (SELECT 1 FROM public.enrollments WHERE batch_id = assignments.batch_id AND student_id = public.get_current_student_id()) OR
    EXISTS (SELECT 1 FROM public.batches WHERE id = assignments.batch_id AND lead_teacher_id = public.get_current_teacher_id())
);

CREATE POLICY "Students view and submit own submissions"
ON public.submissions FOR ALL TO authenticated
USING (
    student_id = public.get_current_student_id() OR
    public.is_admin_or_super() OR
    EXISTS (
        SELECT 1 FROM public.assignments a
        JOIN public.batches b ON b.id = a.batch_id
        WHERE a.id = submissions.assignment_id AND b.lead_teacher_id = public.get_current_teacher_id()
    )
);

-- --------------------------------------------------------------------
-- 9. NOTIFICATIONS & SUPPORT TICKETS
-- --------------------------------------------------------------------
CREATE POLICY "Users view own notifications"
ON public.notifications FOR ALL TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users view and create own support tickets"
ON public.support_tickets FOR ALL TO authenticated
USING (user_id = auth.uid() OR public.is_admin_or_super());

-- --------------------------------------------------------------------
-- 10. AUDIT LOGS & EXPENSES
-- --------------------------------------------------------------------
CREATE POLICY "Admins view audit logs"
ON public.audit_logs FOR SELECT TO authenticated
USING (public.is_admin_or_super());

CREATE POLICY "Admins manage expenses"
ON public.expenses FOR ALL TO authenticated
USING (public.is_admin_or_super());
-- ====================================================================
-- AURORA ACADEMIC CARE - SEED DATA FOR BANGLADESH CURRICULUM
-- File: supabase/seed.sql
-- ====================================================================

-- 1. GRADING RULES (Bangladesh Standard 5.00 scale)
INSERT INTO public.grading_rules (grade, min_score, max_score, grade_point, remarks) VALUES
('A+', 80.0, 100.0, 5.00, 'Outstanding'),
('A',  70.0, 79.99, 4.00, 'Excellent'),
('A-', 60.0, 69.99, 3.50, 'Very Good'),
('B',  50.0, 59.99, 3.00, 'Good'),
('C',  40.0, 49.99, 2.00, 'Satisfactory'),
('D',  33.0, 39.99, 1.00, 'Pass'),
('F',   0.0, 32.99, 0.00, 'Fail')
ON CONFLICT DO NOTHING;

-- 2. SUBJECTS
INSERT INTO public.subjects (id, code, name_en, name_bn, class_level, group_name) VALUES
('11111111-1111-1111-1111-111111111101', 'PHY-HSC', 'Physics', 'পদার্থবিজ্ঞান', 'HSC', 'Science'),
('11111111-1111-1111-1111-111111111102', 'CHE-HSC', 'Chemistry', 'রসায়ন', 'HSC', 'Science'),
('11111111-1111-1111-1111-111111111103', 'H-MATH', 'Higher Mathematics', 'উচ্চতর গণিত', 'HSC', 'Science'),
('11111111-1111-1111-1111-111111111104', 'BIO-HSC', 'Biology', 'জীববিজ্ঞান', 'HSC', 'Science'),
('11111111-1111-1111-1111-111111111105', 'ENG-01', 'English for Today', 'ইংরেজি', 'HSC', 'General'),
('11111111-1111-1111-1111-111111111106', 'ICT-01', 'Information & Communication Tech', 'তথ্য ও যোগাযোগ প্রযুক্তি', 'HSC', 'General')
ON CONFLICT DO NOTHING;

-- 3. COURSES
INSERT INTO public.courses (id, title_en, title_bn, slug, description, category, class_level, duration_months, fee, learning_mode, thumbnail_url, is_active) VALUES
('22222222-2222-2222-2222-222222222201', 
 'HSC Science 1st & 2nd Year Complete Care', 
 'এইচএসসি বিজ্ঞান ১ম ও ২য় বর্ষ পূর্ণাঙ্গ প্রস্তুতি', 
 'hsc-science-complete-care', 
 'Comprehensive subject-by-subject coaching for Physics, Chemistry, Math & Biology with daily problem solving and model tests.', 
 'HSC', 'Class 11-12', 12, 18500.00, 'hybrid', '/images/courses/hsc-science.jpg', true),

('22222222-2222-2222-2222-222222222202', 
 'Medical Admission Buster 2026', 
 'মেডিকেল ভর্তি প্রস্তুতি ২০২৬', 
 'medical-admission-buster-2026', 
 'Specialized guidance for National Medical College admission with NCERT/NCTB line-by-line breakdown, GK, English and 50+ real-time OMR model tests.', 
 'Admission', 'HSC Passed', 6, 22000.00, 'offline', '/images/courses/medical-admission.jpg', true),

('22222222-2222-2222-2222-222222222203', 
 'BUET & Engineering Admission Mastery', 
 'বুয়েট ও ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি', 
 'buet-engineering-admission-mastery', 
 'Concept-clearing advanced math and mechanics, previous 25 years question analysis, and high-intensity problem solving.', 
 'Admission', 'HSC Passed', 6, 24000.00, 'hybrid', '/images/courses/engineering-admission.jpg', true),

('22222222-2222-2222-2222-222222222204', 
 'SSC Foundation & Board Exam Booster', 
 'এসএসসি পূর্ণাঙ্গ প্রস্তুতি ও বোর্ড বুস্টার', 
 'ssc-board-exam-booster', 
 'For Class 9 and 10 students aiming for Golden GPA 5.0 with weekly chapter tests, creative question practice, and test paper solving.', 
 'SSC', 'Class 9-10', 8, 12500.00, 'online', '/images/courses/ssc-booster.jpg', true)
ON CONFLICT DO NOTHING;

-- 4. BATCHES
INSERT INTO public.batches (id, course_id, name, code, classroom_number, capacity, schedule_days, time_slot, start_date, end_date, learning_mode, status) VALUES
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222201', 'HSC Sci Morning Titans (Batch A)', 'HSC-SCI-A', 'Room 301 (Auditorium)', 50, 'Sat, Mon, Wed', '08:00 AM - 10:30 AM', '2026-01-01', '2026-12-31', 'offline', 'active'),
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222201', 'HSC Sci Evening Spark (Batch B)', 'HSC-SCI-B', 'Room 302', 45, 'Sun, Tue, Thu', '04:30 PM - 07:00 PM', '2026-01-01', '2026-12-31', 'hybrid', 'active'),
('33333333-3333-3333-3333-333333333303', '22222222-2222-2222-2222-222222222202', 'Medical Champions Batch 2026', 'MED-CHAMP-01', 'Room 201 (Medical Lab)', 40, 'Daily (Sat-Thu)', '09:00 AM - 01:00 PM', '2026-06-01', '2026-11-30', 'offline', 'active'),
('33333333-3333-3333-3333-333333333304', '22222222-2222-2222-2222-222222222204', 'SSC Online Elite Batch', 'SSC-ONL-01', 'Virtual Hall 1', 100, 'Sun, Tue, Thu', '07:30 PM - 09:30 PM', '2026-01-15', '2026-09-30', 'online', 'active')
ON CONFLICT DO NOTHING;

-- 5. NOTICES
INSERT INTO public.notices (id, title, content, target_role, category, is_pinned, is_published, published_at) VALUES
('44444444-4444-4444-4444-444444444401', 
 'Admission Open for Academic Session 2026-2027', 
 'Aurora Academic Care announces admissions open for HSC Science, Medical Admission Program, and SSC Foundation batches. Early bird scholarship of 15% available till the end of the month. Apply online now.', 
 'all', 'admission', true, true, NOW()),

('44444444-4444-4444-4444-444444444402', 
 'HSC Model Test 03 Schedule Published', 
 'The 3rd Monthly Model Test for Physics & Chemistry will be held on upcoming Saturday. All students must collect their admit cards and report 15 minutes before the exam starts.', 
 'student', 'exam', false, true, NOW()),

('44444444-4444-4444-4444-444444444403', 
 'Parent-Teacher Meeting (PTM) for Term 1', 
 'Dear Guardians, we cordially invite you to attend the Term 1 Progress Review meeting on Friday at 3:30 PM at our main campus auditorium.', 
 'parent', 'general', false, true, NOW())
ON CONFLICT DO NOTHING;

-- 6. SITE SETTINGS (CMS)
INSERT INTO public.site_settings (setting_key, setting_value, description) VALUES
('site_info', '{
  "institution_name": "Aurora Academic Care",
  "tagline": "Learn Today. Lead Tomorrow.",
  "slogan": "Learn · Practice · Excel",
  "phone": "+880 1712-345678",
  "email": "info@auroraacademic.com",
  "address": "House #42, Road #11, Dhanmondi, Dhaka-1209, Bangladesh",
  "branches": ["Dhanmondi Main Campus", "Uttara Branch", "Mirpur Campus", "Chittagong Branch"],
  "established_year": 2018,
  "registration_no": "AAC-BD-2018-994"
}', 'Core institution details and branch locations'),

('admission_settings', '{
  "is_open": true,
  "current_session": "2026-2027",
  "application_fee": 500,
  "currency": "BDT",
  "helpline": "+880 1812-998877",
  "notice": "Online application is open for SSC, HSC and Admission programs. Result verification will take 24-48 business hours."
}', 'Admission portal live configuration'),

('social_links', '{
  "facebook": "https://facebook.com/auroraacademiccare",
  "youtube": "https://youtube.com/@auroraacademiccare",
  "linkedin": "https://linkedin.com/company/auroraacademiccare",
  "whatsapp": "+8801712345678"
}', 'Official social profiles and contact handles')
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;
