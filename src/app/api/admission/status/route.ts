import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase/mock-db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("ref") || searchParams.get("phone");

  if (!query) {
    return NextResponse.json(
      { success: false, error: "Please provide an application reference number or phone" },
      { status: 400 }
    );
  }

  const app = db.getApplicationByRef(query);
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
    application: {
      ...app,
      course,
      batch,
    },
  });
}
