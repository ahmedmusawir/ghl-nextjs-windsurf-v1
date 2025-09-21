import { NextResponse } from "next/server";
import { listPages } from "../../_lib/contentStore";

export async function GET() {
  try {
    const pages = await listPages();
    // Return minimal info for sidebar
    const result = pages.map((p) => ({ slug: p.slug, title: p.title }));
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to list pages" }, { status: 500 });
  }
}
