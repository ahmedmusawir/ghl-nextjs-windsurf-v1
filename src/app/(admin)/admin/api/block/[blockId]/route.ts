import { NextRequest, NextResponse } from "next/server";
import { readBlock, writeBlockProps } from "../../../_lib/contentStore";

export async function GET(
  req: NextRequest,
  { params }: { params: { blockId: string } }
) {
  try {
    const block = await readBlock(params.blockId);
    return NextResponse.json(block);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to read block" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { blockId: string } }
) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const { props } = body as { props: Record<string, any> };
    if (!props || typeof props !== "object") {
      return NextResponse.json({ error: "Invalid props" }, { status: 400 });
    }
    await writeBlockProps(params.blockId, props);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to save block" }, { status: 500 });
  }
}
