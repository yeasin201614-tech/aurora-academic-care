# Aurora Academic Care
**Tagline:** *Learn Today. Lead Tomorrow.* | *Learn · Practice · Excel*  
**Platform:** Next.js 14 App Router + TypeScript + Tailwind CSS + Supabase PostgreSQL + SSLCOMMERZ  
**Jurisdiction:** Bangladesh (Coaching Centre Management & Hybrid Learning Platform)

---

## 🌟 Executive Overview

**Aurora Academic Care** is a production-ready, full-stack coaching centre management and hybrid educational platform designed for Bangladesh's HSC, SSC, Medical, and Engineering admission programs.

It combines an elegant public-facing educational website, a multi-step digital admission application wizard with live application tracking, 5 dedicated role-based dashboards (`super_admin`, `admin`, `teacher`, `student`, `parent`), computerized digital marksheet generation on the Bangladesh National Board 5.00 GPA scale, and automated fee invoicing integrated with **SSLCOMMERZ** (bKash, Nagad, Rocket, Cards).

---

## 🚀 Key Modules & Capabilities

### 1. Public Institutional Portal (19 Pages)
- **Home (`/`)**: Hero section, admission announcements, key statistics, course showcase, faculty highlights, learning options, latest notices, testimonials, gallery, FAQs, contact form, and footer.
- **About Us (`/about`)**: Pedagogical mission, vision, advisory board note, campus facilities.
- **Courses (`/courses`, `/courses/[id]`)**: Full catalog with Category and Learning Mode (Offline, Online, Hybrid) filters, fees in BDT (`৳`), syllabus breakdown.
- **Faculty Directory (`/teachers`, `/teachers/[id]`)**: Detailed mentor profiles from BUET, DMC, and DU.
- **Online Admission (`/admission`)**: 4-step wizard with Zod validation and automated Application Reference generation.
- **Admission Status Tracker (`/admission-status`)**: Live status tracker with computerized printable confirmation slip.
- **Notice Board (`/notices`, `/notices/[id]`)**: Filtered bulletins by role and category.
- **Exam Results Portal (`/results`)**: Search by Student ID (`AAC-2026-STU001`) with printable digital marksheet and GPA calculator.
- **Online Classes (`/online-classes`)**: Virtual learning hall guidelines and secure room access.
- **Gallery (`/gallery`)**, **Testimonials (`/testimonials`)**, **FAQ (`/faq`)**, **Contact Us (`/contact`)**, **Privacy Policy (`/privacy`)**, **Terms & Conditions (`/terms`)**.

### 2. Multi-Step Online Admission System
- Step 1: Student Information (Full name, Bangla name, DOB, Gender, Present & Permanent addresses).
- Step 2: Guardian Information (Father/Mother/Guardian name, 11-digit mobile number, Emergency contact).
- Step 3: Academic & Course Selection (Current class, Previous school, Group, Course, Batch, Modality).
- Step 4: Document Upload Simulation & Review.
- Unique Reference Generation (e.g. `AAC-2026-ADM1004`).
- Strict Review Workflow: Statuses (`Draft` -> `Pending` -> `Under Review` -> `Approved` -> `Enrolled`).
- Automatic Student ID (`AAC-2026-STU001`) issuance upon enrollment.

### 3. Role-Based Dashboards
- **Super Admin (`/dashboard/super-admin`)**: System-wide analytics, admissions approval queue, finance ledger, user management, audit logs, CMS settings.
- **Admin (`/dashboard/admin`)**: Operations hub, student & teacher registries, daily attendance marking, exams and merit rankings.
- **Teacher (`/dashboard/teacher`)**: Faculty console, assigned batches, Google Meet / Zoom live class launcher, marks entry with automatic 5.00 GPA calculation.
- **Student (`/dashboard/student`)**: Official digital student ID card (printable), class routine, one-click live stream access, fee invoices & **Pay via SSLCOMMERZ**, marksheet download.
- **Parent / Guardian (`/dashboard/parent`)**: Linked child switcher, real-time attendance alerts, academic progress, tuition invoices.

### 4. Bangladesh Localization
- **Currency**: BDT (`৳`) formatted via standard Bangladeshi number formatting.
- **Timezone**: `Asia/Dhaka` (UTC+6).
- **Date Format**: `DD-MM-YYYY`.
- **Grading Scale**: National Board 5.00 Scale (A+, A, A-, B, C, D, F).
- **Phone Validation**: Bangladeshi 11-digit mobile regex (`01[3-9]xxxxxxxx`).
- **Typography**: Poppins & Inter for English; Hind Siliguri for Bangla.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **Database & Auth**: Supabase (PostgreSQL 15), Row Level Security (RLS)
- **Forms & Validation**: Zod, React Hook Form
- **Payment Gateway**: SSLCOMMERZ (bKash, Nagad, Rocket, Visa/Mastercard)
- **Testing**: Node.js Automated Test Suite (18 unit/integration tests)

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js >= 18.x (tested on v24.22)
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/your-org/aurora-academic-care.git
cd aurora-academic-care
npm install
```

### 3. Environment Setup
Copy the template configuration:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Automated Tests
```bash
node tests/run-tests.mjs
```

### 6. Production Build
```bash
npm run build
npm start
```

---

## 🔑 Demo Login Accounts

Test all 5 role dashboards directly from `/auth/login`:
| Role | Demo Email | Target Dashboard |
|---|---|---|
| **Super Admin** | `superadmin@auroraacademic.com` | `/dashboard/super-admin` |
| **Academic Admin** | `admin@auroraacademic.com` | `/dashboard/admin` |
| **Faculty / Teacher** | `physics.lead@auroraacademic.com` | `/dashboard/teacher` |
| **Enrolled Student** | `student@auroraacademic.com` | `/dashboard/student` |
| **Parent / Guardian** | `parent@auroraacademic.com` | `/dashboard/parent` |

---

## 📄 License
Proprietary software developed for Aurora Academic Care, Bangladesh. All rights reserved.
