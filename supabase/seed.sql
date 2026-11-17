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
