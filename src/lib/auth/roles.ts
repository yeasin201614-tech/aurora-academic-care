import { UserRole } from "@/types/database";

export interface RoleConfig {
  role: UserRole;
  title: string;
  banglaTitle: string;
  defaultPath: string;
  allowedPaths: string[];
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  super_admin: {
    role: "super_admin",
    title: "Super Administrator",
    banglaTitle: "প্রধান প্রশাসক",
    defaultPath: "/dashboard/super-admin",
    allowedPaths: ["/dashboard/super-admin", "/dashboard/admin"],
  },
  admin: {
    role: "admin",
    title: "Academic Administrator",
    banglaTitle: "একাডেমিক অ্যাডমিন",
    defaultPath: "/dashboard/admin",
    allowedPaths: ["/dashboard/admin"],
  },
  teacher: {
    role: "teacher",
    title: "Faculty / Instructor",
    banglaTitle: "শিক্ষক / মেন্টর",
    defaultPath: "/dashboard/teacher",
    allowedPaths: ["/dashboard/teacher"],
  },
  student: {
    role: "student",
    title: "Enrolled Student",
    banglaTitle: "শিক্ষার্থী",
    defaultPath: "/dashboard/student",
    allowedPaths: ["/dashboard/student"],
  },
  parent: {
    role: "parent",
    title: "Guardian / Parent",
    banglaTitle: "অভিভাবক",
    defaultPath: "/dashboard/parent",
    allowedPaths: ["/dashboard/parent"],
  },
};

export function canAccessPath(userRole: UserRole, pathname: string): boolean {
  if (userRole === "super_admin") return true; // Super admin can view all dashboards
  const config = ROLE_CONFIGS[userRole];
  if (!config) return false;
  return config.allowedPaths.some((p) => pathname.startsWith(p));
}
