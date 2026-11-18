import { NextRequest, NextResponse } from "next/server";
import { admissionSchema } from "@/lib/validations/admission";
import { db } from "@/lib/supabase/mock-db";
import { getAdminClient, COURSE_UUID_MAP } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Server-side Zod validation
    const validationResult = admissionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Resolve course UUID
    let courseUuid = data.selected_course_id;
    if (COURSE_UUID_MAP[courseUuid]) {
      courseUuid = COURSE_UUID_MAP[courseUuid];
    }
    const isValidUuid =
      typeof courseUuid === "string" &&
      courseUuid.includes("-") &&
      courseUuid.length === 36;

    // Generate unique reference number: AAC-2026-ADMxxxxx
    const applicationRef = `AAC-2026-ADM${Math.floor(1000 + Math.random() * 9000)}`;

    let savedApplication: any = null;

    // 1. Primary: Save to Supabase Cloud PostgreSQL Database
    try {
      const supabase = getAdminClient();

      const insertPayload = {
        application_reference: applicationRef,
        student_name: data.student_name,
        student_name_bn: data.student_name_bn || null,
        phone: data.phone,
        email: data.email || null,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        present_address: data.present_address,
        permanent_address: data.permanent_address,
        current_class: data.current_class,
        previous_school: data.previous_school,
        academic_group: data.academic_group,
        selected_course_id: isValidUuid ? courseUuid : null,
        learning_mode: data.learning_mode,
        guardian_name: data.guardian_name,
        guardian_phone: data.guardian_phone,
        guardian_email: data.guardian_email || null,
        guardian_relationship: data.guardian_relationship,
        emergency_contact: data.emergency_contact,
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
    } catch (supabaseError) {
      console.warn("Supabase connection warning:", supabaseError);
    }

    // 2. Also save to in-memory mock store for local consistency
    const localApp = db.addApplication({
      student_name: data.student_name,
      student_name_bn: data.student_name_bn,
      phone: data.phone,
      email: data.email || undefined,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      present_address: data.present_address,
      permanent_address: data.permanent_address,
      current_class: data.current_class,
      previous_school: data.previous_school,
      academic_group: data.academic_group,
      selected_course_id: data.selected_course_id,
      selected_batch_id: data.selected_batch_id,
      learning_mode: data.learning_mode,
      guardian_name: data.guardian_name,
      guardian_phone: data.guardian_phone,
      guardian_email: data.guardian_email || undefined,
      guardian_relationship: data.guardian_relationship,
      emergency_contact: data.emergency_contact,
      review_notes: "Application received and queued for administrative review.",
    });

    return NextResponse.json({
      success: true,
      message: "Admission application submitted successfully to database.",
      application: savedApplication || localApp,
      cloudSynced: !!savedApplication,
    });
  } catch (error) {
    console.error("Admission Submit API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error submitting application" },
      { status: 500 }
    );
  }
}
