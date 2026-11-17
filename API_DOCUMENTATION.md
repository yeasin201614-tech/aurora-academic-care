# Aurora Academic Care — API Documentation

This document describes the server endpoints available in the Aurora Academic Care platform.

---

## 1. Admission System APIs

### `POST /api/admission/submit`
Submits a multi-step admission application with full Zod schema validation.

- **Request Body (JSON):**
  ```json
  {
    "student_name": "Mahmud Hasan",
    "student_name_bn": "মাহমুদ হাসান",
    "phone": "01811223344",
    "email": "student@example.com",
    "date_of_birth": "2008-05-14",
    "gender": "Male",
    "present_address": "Dhanmondi, Dhaka",
    "permanent_address": "Joypurhat Sadar",
    "current_class": "Class 11 (HSC)",
    "previous_school": "Notre Dame College",
    "academic_group": "Science",
    "selected_course_id": "crs-hsc-sci-01",
    "selected_batch_id": "bat-01",
    "learning_mode": "hybrid",
    "guardian_name": "Md. Rafiqul Hasan",
    "guardian_phone": "01711998877",
    "guardian_relationship": "Father",
    "emergency_contact": "01711998877"
  }
  ```

- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Admission application submitted successfully.",
    "application": {
      "id": "adm-app-1731800000",
      "application_reference": "AAC-2026-ADM1004",
      "status": "pending",
      "created_at": "2026-11-17T10:00:00.000Z"
    }
  }
  ```

---

### `GET /api/admission/status`
Queries application status and details by reference code or mobile number.

- **Query Parameters:**
  - `ref`: Application reference (e.g. `AAC-2026-ADM1001`)
  - `phone`: Mobile number (e.g. `01811223344`)

- **Response (200 OK):**
  ```json
  {
    "success": true,
    "application": {
      "application_reference": "AAC-2026-ADM1001",
      "student_name": "Mahmud Hasan",
      "status": "enrolled",
      "assigned_student_id": "AAC-2026-STU001",
      "review_notes": "Documents verified. Enrolled with Student ID AAC-2026-STU001.",
      "course": { "title_en": "HSC Science Complete Care" },
      "batch": { "name": "Morning Titans (Batch A)" }
    }
  }
  ```

---

## 2. Payment & SSLCOMMERZ Gateway APIs

### `POST /api/payments/sslcommerz/init`
Initializes a server-side payment session for course tuition or admission fees.

- **Request Body (JSON):**
  ```json
  {
    "invoiceId": "inv-01",
    "amount": 16500,
    "studentId": "stu-01"
  }
  ```

- **Response (200 OK):**
  ```json
  {
    "success": true,
    "gatewayUrl": "/api/payments/sslcommerz/sandbox-gateway?tran_id=AAC-TXN-1731800000&amount=16500&invoice=inv-01",
    "sessionkey": "SESSION_KEY_XXXXX"
  }
  ```

---

### `POST /api/payments/verify`
Server-side transaction verification calling the SSLCOMMERZ Validator API.

- **Request Body (JSON):**
  ```json
  {
    "val_id": "VAL-SSL-6789-OK",
    "invoice_id": "inv-01"
  }
  ```

- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Payment successfully verified and invoice updated.",
    "transaction": {
      "status": "VALID",
      "amount": "16500.00",
      "currency": "BDT"
    }
  }
  ```

---

### `POST /api/payments/sslcommerz/ipn`
Instant Payment Notification (IPN) webhook listener for idempotent background updates.
- Validates signature and duplicate transactions.
- Dispatches student invoice status change to `PAID`.
