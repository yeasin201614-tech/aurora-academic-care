import { Profile, UserRole } from "@/types/database";

export interface DemoUserAccount {
  email: string;
  role: UserRole;
  name: string;
  banglaName: string;
  avatar: string;
  id: string;
}

export const DEMO_ACCOUNTS: Record<UserRole, DemoUserAccount> = {
  super_admin: {
    id: "usr-super-01",
    email: "superadmin@auroraacademic.com",
    role: "super_admin",
    name: "Dr. K. M. Rahman",
    banglaName: "ড. কে. এম. রহমান",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
  admin: {
    id: "usr-admin-01",
    email: "admin@auroraacademic.com",
    role: "admin",
    name: "Mahfuzur Rahman",
    banglaName: "মাহফুজুর রহমান",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
  },
  teacher: {
    id: "prof-tch-01",
    email: "physics.lead@auroraacademic.com",
    role: "teacher",
    name: "Engr. Tanvir Ahmed",
    banglaName: "প্রকৌ. তানভীর আহমেদ",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  student: {
    id: "prof-stu-01",
    email: "student@auroraacademic.com",
    role: "student",
    name: "Mahmud Hasan",
    banglaName: "মাহমুদ হাসান",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
  },
  parent: {
    id: "prof-parent-01",
    email: "parent@auroraacademic.com",
    role: "parent",
    name: "Md. Rafiqul Hasan",
    banglaName: "মো. রফিকুল হাসান",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
};
