import { z } from "zod";

const bangladeshMobileRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

export const admissionSchema = z.object({
  // Student Information
  student_name: z.string().min(3, "Full name must be at least 3 characters"),
  student_name_bn: z.string().optional(),
  phone: z.string().regex(bangladeshMobileRegex, "Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017xxxxxxxx)"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  present_address: z.string().min(5, "Present address is required"),
  permanent_address: z.string().min(5, "Permanent address is required"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  confirm_password: z.string().optional(),

  // Guardian Information
  guardian_name: z.string().min(3, "Guardian name is required"),
  guardian_phone: z.string().regex(bangladeshMobileRegex, "Valid 11-digit Bangladeshi mobile number required"),
  guardian_email: z.string().email("Invalid email address").optional().or(z.literal("")),
  guardian_relationship: z.string().min(2, "Relationship is required"),
  emergency_contact: z.string().min(6, "Emergency contact is required"),

  // Academic Information
  current_class: z.string().min(1, "Current class is required"),
  previous_school: z.string().min(2, "Previous institution name is required"),
  academic_group: z.string().min(1, "Academic group is required"),
  selected_course_id: z.string().min(1, "Please select a course"),
  selected_batch_id: z.string().optional(),
  learning_mode: z.enum(["offline", "online", "hybrid"]),

  // Additional
  additional_notes: z.string().optional(),
});

export type AdmissionFormData = z.infer<typeof admissionSchema>;
