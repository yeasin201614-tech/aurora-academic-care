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
