import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase/mock-db";
import { getAdminClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawQuery =
    searchParams.get("ref") ||
    searchParams.get("phone") ||
    searchParams.get("q") ||
    "";
  const query = rawQuery.trim();

  if (!query) {
    return NextResponse.json(
      { success: false, error: "Please provide an application reference number or mobile number" },
      { status: 400 }
    );
  }

  // Clean phone number: remove dashes, spaces, +88 or 88 prefix
  const cleanPhone = query.replace(/[\s\-\(\)]/g, "");
  const normalizedPhone = cleanPhone.startsWith("+880")
    ? "0" + cleanPhone.slice(4)
    : cleanPhone.startsWith("880")
    ? "0" + cleanPhone.slice(3)
    : cleanPhone;

  // 1. Primary: Search in Supabase Cloud PostgreSQL Database
  try {
    const supabase = getAdminClient();
    if (supabase) {
      let queryBuilder = supabase
        .from("admission_applications")
        .select("*, courses(*), batches(*)");

      if (query.toUpperCase().startsWith("AAC-") || query.toUpperCase().includes("ADM")) {
        queryBuilder = queryBuilder.ilike("application_reference", `%${query}%`);
      } else {
        // Query by either raw phone or normalized phone
        queryBuilder = queryBuilder.or(`phone.eq.${query},phone.eq.${normalizedPhone}`);
      }

      // Order by latest created and take the top 1 (avoids maybeSingle PGRST116 error when multiple rows match)
      const { data: cloudApps, error: dbError } = await queryBuilder
        .order("created_at", { ascending: false })
        .limit(1);

      if (!dbError && cloudApps && cloudApps.length > 0) {
        const cloudApp = cloudApps[0];
        return NextResponse.json({
          success: true,
          source: "supabase_cloud",
          application: {
            ...cloudApp,
            course: cloudApp.courses || db.courses.find((c) => c.id === cloudApp.selected_course_id),
            batch: cloudApp.batches || db.batches.find((b) => b.id === cloudApp.selected_batch_id),
          },
        });
      } else if (dbError) {
        console.warn("Supabase query error:", dbError.message);
      }
    }
  } catch (err) {
    console.warn("Supabase Cloud status lookup warning:", err);
  }

  // 2. Fallback: Search in local mock store
  const app =
    db.getApplicationByRef(query) ||
    db.getApplicationByRef(normalizedPhone);

  if (!app) {
    return NextResponse.json(
      { success: false, error: "No admission application found matching this reference number or mobile number." },
      { status: 404 }
    );
  }

  // Enrich with course and batch details
  const course = db.courses.find((c) => c.id === app.selected_course_id);
  const batch = db.batches.find((b) => b.id === app.selected_batch_id);

  return NextResponse.json({
    success: true,
    source: "local_memory",
    application: {
      ...app,
      course,
      batch,
    },
  });
}
