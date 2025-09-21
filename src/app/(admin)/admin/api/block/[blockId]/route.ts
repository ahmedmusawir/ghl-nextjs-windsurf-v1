import { NextRequest, NextResponse } from "next/server";
import { readBlock, writeBlockProps } from "../../../_lib/contentStore";

export async function GET(
  req: NextRequest,
  ctx:
    | { params: { blockId?: string } }
    | { params: Promise<{ blockId?: string }> }
) {
  try {
    const rawParams: any = (ctx as any).params;
    const resolved = typeof rawParams?.then === "function" ? await rawParams : rawParams;
    const blockId: string | undefined = resolved?.blockId;
    if (!blockId) return NextResponse.json({ error: "Missing blockId" }, { status: 400 });

    const block = await readBlock(blockId);
    return NextResponse.json(block);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to read block" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  ctx:
    | { params: { blockId?: string } }
    | { params: Promise<{ blockId?: string }> }
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
    const rawParams: any = (ctx as any).params;
    const resolved = typeof rawParams?.then === "function" ? await rawParams : rawParams;
    const blockId: string | undefined = resolved?.blockId;
    if (!blockId) return NextResponse.json({ error: "Missing blockId" }, { status: 400 });

    await writeBlockProps(blockId, props);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to save block" }, { status: 500 });
  }
}

