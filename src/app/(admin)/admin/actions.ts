"use server";

import { readBlock, writeBlockProps } from "./_lib/contentStore";

export async function getBlock(blockId: string) {
  const block = await readBlock(blockId);
  return block;
}

export async function saveBlockProps(blockId: string, props: Record<string, any>) {
  await writeBlockProps(blockId, props);
  return { ok: true } as const;
}
