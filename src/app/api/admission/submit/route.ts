import { NextRequest, NextResponse } from "next/server";
import { admissionSchema } from "@/lib/validations/admission";
import { db } from "@/lib/supabase/mock-db";
import { getAdminClient, COURSE_UUID_MAP } from "@/lib/supabase/server";

// Fallback course mapper based on class level
function resolveDefaultCourseId(currentClass: string): string {
  const cls = (currentClass || "").toLowerCase();
  if (cls.includes("6")) return "crs-cls6-fnd-05";
  if (cls.includes("7")) return "crs-cls7-fnd-06";
  if (cls.includes("8")) return "crs-cls8-fnd-07";
  if (cls.includes("9")) return "crs-cls9-ssc-08";
  if (cls.includes("10")) return "crs-cls10-ssc-09";
  if (cls.includes("11") || cls.includes("12")) return "crs-hsc-sci-01";
  if (cls.includes("passed") || cls.includes("med")) return "crs-med-adm-02";
  if (cls.includes("buet") || cls.includes("eng")) return "crs-buet-eng-03";
  return "crs-hsc-sci-01";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Server-side Zod validation
    const validationResult = admissionSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors).flat()[0] ||
        "Submission failed. Please check form fields.";
      return NextResponse.json(
        {
          success: false,
          error: firstErrorMessage,
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Smart auto-fill for address and emergency contact
    const presentAddr = (data.present_address || "").trim();
    const rawPermanent = (data.permanent_address || "").trim();
    const permanentAddr =
      rawPermanent.length >= 3 && rawPermanent.toLowerCase() !== "same"
        ? rawPermanent
        : presentAddr;

    const rawEmergency = (data.emergency_contact || "").trim();
    const emergencyContact =
      rawEmergency.length >= 6 && rawEmergency.toLowerCase() !== "same"
        ? rawEmergency
        : data.guardian_phone;

    // Resolve course ID
    let courseId = (data.selected_course_id || "").trim();
    if (!courseId) {
      courseId = resolveDefaultCourseId(data.current_class);
    }

    // Resolve course UUID for Supabase
    let courseUuid = courseId;
    if (COURSE_UUID_MAP[courseId]) {
      courseUuid = COURSE_UUID_MAP[courseId];
    }
    const isValidUuid =
      typeof courseUuid === "string" &&
      courseUuid.includes("-") &&
      courseUuid.length === 36;

    // Generate unique reference number: AAC-2026-ADMxxxxx
    const applicationRef = `AAC-2026-ADM${Math.floor(1000 + Math.random() * 9000)}`;

    let savedApplication: any = null;

    // 1. Primary: Save to Supabase Cloud PostgreSQL Database (if connected)
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const insertPayload = {
          application_reference: applicationRef,
          student_name: data.student_name,
          student_name_bn: data.student_name_bn || null,
          phone: data.phone,
          email: data.email || null,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          present_address: presentAddr,
          permanent_address: permanentAddr,
          current_class: data.current_class,
          previous_school: data.previous_school,
          academic_group: data.academic_group,
          selected_course_id: isValidUuid ? courseUuid : null,
          learning_mode: data.learning_mode,
          guardian_name: data.guardian_name,
          guardian_phone: data.guardian_phone,
          guardian_email: data.guardian_email || null,
          guardian_relationship: data.guardian_relationship,
          emergency_contact: emergencyContact,
          status: "pending",
          review_notes: data.password
            ? "Account password configured by applicant. Awaiting administrative review."
            : "Application received and queued for administrative review.",
        };

        const { data: cloudApp, error: dbError } = await supabase
          .from("admission_applications")
          .insert([insertPayload])
          .select()
          .single();

        if (!dbError && cloudApp) {
          savedApplication = cloudApp;

          // If email and password provided, register student in Supabase Auth
          if (data.email && data.password && data.password.length >= 6) {
            try {
              await supabase.auth.admin.createUser({
                email: data.email,
                password: data.password,
                email_confirm: true,
                user_metadata: {
                  full_name: data.student_name,
                  bangla_name: data.student_name_bn || "",
                  phone: data.phone,
                  role: "student",
                  application_ref: applicationRef,
                },
              });
            } catch (authError) {
              console.warn("Supabase Auth user creation note:", authError);
            }
          }
        } else if (dbError) {
          console.warn("Supabase insert warning, falling back to local store:", dbError.message);
        }
      }
    } catch (supabaseError) {
      console.warn("Supabase connection warning:", supabaseError);
    }

    // 2. Also save to in-memory mock store for local consistency & fallback
    const localApp = db.addApplication({
      student_name: data.student_name,
      student_name_bn: data.student_name_bn || undefined,
      phone: data.phone,
      email: data.email || undefined,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      present_address: presentAddr,
      permanent_address: permanentAddr,
      current_class: data.current_class,
      previous_school: data.previous_school,
      academic_group: data.academic_group,
      selected_course_id: courseId,
      selected_batch_id: data.selected_batch_id || undefined,
      learning_mode: data.learning_mode,
      guardian_name: data.guardian_name,
      guardian_phone: data.guardian_phone,
      guardian_email: data.guardian_email || undefined,
      guardian_relationship: data.guardian_relationship,
      emergency_contact: emergencyContact,
      review_notes: data.password
        ? "Account password configured by applicant. Awaiting administrative review."
        : "Application received and queued for administrative review.",
    });

    const finalApp = savedApplication || localApp;

    return NextResponse.json({
      success: true,
      message: "Admission application submitted successfully to database.",
      application: finalApp,
      cloudSynced: !!savedApplication,
      source: savedApplication ? "supabase_cloud" : "local_memory",
    });
  } catch (error) {
    console.error("Admission Submit API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error submitting application" },
      { status: 500 }
    );
  }
}
