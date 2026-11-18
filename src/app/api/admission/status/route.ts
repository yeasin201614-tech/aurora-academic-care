import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase/mock-db";
import { getAdminClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("ref") || searchParams.get("phone");

  if (!query) {
    return NextResponse.json(
      { success: false, error: "Please provide an application reference number or phone" },
      { status: 400 }
    );
  }

  // 1. Primary: Search in Supabase Cloud PostgreSQL Database
  try {
    const supabase = getAdminClient();
    if (supabase) {
      let queryBuilder = supabase
        .from("admission_applications")
        .select("*, courses(*), batches(*)");

      if (query.toUpperCase().startsWith("AAC-") || query.toUpperCase().includes("ADM")) {
        queryBuilder = queryBuilder.ilike("application_reference", query.trim());
      } else {
        queryBuilder = queryBuilder.eq("phone", query.trim());
      }

      const { data: cloudApp, error: dbError } = await queryBuilder.maybeSingle();

      if (!dbError && cloudApp) {
        return NextResponse.json({
          success: true,
          source: "supabase_cloud",
          application: {
            ...cloudApp,
            course: cloudApp.courses || db.courses.find((c) => c.id === cloudApp.selected_course_id),
            batch: cloudApp.batches || db.batches.find((b) => b.id === cloudApp.selected_batch_id),
          },
        });
      }
    }
  } catch (err) {
    console.warn("Supabase Cloud status lookup warning:", err);
  }

  // 2. Fallback: Search in local mock store
  const app = db.getApplicationByRef(query.trim());
  if (!app) {
    return NextResponse.json(
      { success: false, error: "No admission application found with this reference number or phone" },
      { status: 404 }
    );
  }

  // Enrich with course and batch details
  const course = db.courses.find((c) => c.id === app.selected_course_id);
  const batch = db.batches.find((b) => b.id === app.selected_batch_id);

  return NextResponse.json({
    success: true,
    source: "local_cache",
    application: {
      ...app,
      course,
      batch,
    },
  });
}
