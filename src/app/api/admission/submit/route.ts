import { NextRequest, NextResponse } from "next/server";
import { admissionSchema } from "@/lib/validations/admission";
import { db } from "@/lib/supabase/mock-db";

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

    // Create admission application with default status = 'pending'
    const newApplication = db.addApplication({
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
      message: "Admission application submitted successfully.",
      application: newApplication,
    });
  } catch (error) {
    console.error("Admission Submit API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error submitting application" },
      { status: 500 }
    );
  }
}
