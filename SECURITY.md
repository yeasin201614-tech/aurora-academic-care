# Aurora Academic Care — Security & Access Control Policy

This document outlines the cybersecurity and access control architecture implemented in Aurora Academic Care, complying with strict educational data privacy and financial safety standards.

---

## 1. Zero Trust Role-Based Access Control (RBAC)

The system strictly enforces 5 user roles:
1. `super_admin`: System-wide oversight, financial audits, role provisioning, CMS.
2. `admin`: Academic scheduling, student/teacher records, exam management, batch allocation.
3. `teacher`: Assigned batches only, student attendance, marks entry, study materials.
4. `student`: Personal profile, enrolled routine, marksheet, invoices, protected meeting links.
5. `parent`: Linked children records only, real-time attendance, fee receipts.

### Key Safeguards:
- Roles are verified server-side through `profiles.role` joined against `auth.uid()`.
- Client-side headers, request bodies, or local storage cannot elevate user roles.
- Self-role modification is blocked via Row Level Security (RLS) `WITH CHECK` constraint:
  ```sql
  CREATE POLICY "Users can update their own profile details"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));
  ```

---

## 2. Row Level Security (RLS) Enforcement

- All 30 database tables have RLS explicitly enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`).
- Unauthorized SELECT, INSERT, UPDATE, and DELETE operations are rejected at the database engine level.
- Cross-user data isolation ensures Parents can never query students who are not registered in `student_guardians`.
- Service-role keys are strictly server-side and never exposed to the frontend bundle.

---

## 3. Financial Integrity & SSLCOMMERZ Security

- **No Client-Side Confirmation**: Frontend redirect URLs (`success_url`, `fail_url`) are NEVER trusted as proof of payment.
- **Mandatory Server Validation**: Invoices are marked `PAID` only when the backend successfully verifies the transaction via the SSLCOMMERZ Validator API (`/validator/api/validationserverAPI.php`) with matching `val_id` and store credentials.
- **Idempotency**: Webhook events logged in `payment_webhook_events` prevent duplicate crediting or replay attacks.
- **Credential Storage**: `SSLCOMMERZ_STORE_ID` and `SSLCOMMERZ_STORE_PASSWORD` reside exclusively in server-side environment variables.

---

## 4. Virtual Classrooms & Anti-Leaking Policies

- In compliance with Rule 10, private Google Meet and Zoom URLs are never rendered on public routes.
- Class session links are only exposed to students actively enrolled in that batch (`enrollments.status = 'active'`) and the assigned lead faculty.
