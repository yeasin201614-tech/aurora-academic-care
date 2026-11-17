# Aurora Academic Care — Deployment & Production Guide

This guide covers deploying Aurora Academic Care to **Vercel** and **Supabase Cloud**, and setting up live **SSLCOMMERZ** in Bangladesh.

---

## 1. Supabase Cloud Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Choose AWS Region closest to Bangladesh (e.g., `Singapore - ap-southeast-1` or `Mumbai - ap-south-1`).
3. In SQL Editor, run the migrations in order:
   - `supabase/migrations/20261117000001_initial_schema.sql` (Creates 30 tables, enums, triggers, indexes)
   - `supabase/migrations/20261117000002_rls_policies.sql` (Enables RLS and creates security definer policies)
   - `supabase/seed.sql` (Inserts initial Bangladesh curricula, HSC/SSC courses, and grading scale)
4. Create a public storage bucket named `academic-documents` for admission marksheets and student photos.

---

## 2. SSLCOMMERZ Production Configuration

1. Contact SSLCOMMERZ (Bangladesh) to open a live Merchant Account.
2. Retrieve your Production `Store ID` and `Store Password`.
3. Set the environment variable:
   ```env
   SSLCOMMERZ_STORE_ID="your_live_store_id"
   SSLCOMMERZ_STORE_PASSWORD="your_live_store_password"
   SSLCOMMERZ_IS_LIVE="true"
   ```
4. Set the IPN (Instant Payment Notification) Webhook URL in your SSLCOMMERZ Merchant Portal to:
   ```
   https://your-domain.com/api/payments/sslcommerz/ipn
   ```

---

## 3. Vercel Deployment

1. Push your repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. Configure the following Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_APP_NAME="Aurora Academic Care"`
   - `NEXT_PUBLIC_APP_TAGLINE="Learn Today. Lead Tomorrow."`
   - `NEXT_PUBLIC_BASE_URL="https://your-production-domain.com"`
   - `NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"`
   - `SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"`
   - `SSLCOMMERZ_STORE_ID="your_store_id"`
   - `SSLCOMMERZ_STORE_PASSWORD="your_store_password"`
   - `SSLCOMMERZ_IS_LIVE="true"`
4. Click **Deploy**. Vercel will build the Next.js App Router application and deploy globally on Edge Network.
