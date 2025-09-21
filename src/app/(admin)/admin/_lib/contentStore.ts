import fs from "node:fs/promises";
import path from "node:path";

export type PageJSON = {
  slug: string;
  title?: string;
  blocks: { blockId: string }[];
};

export type BlockInstance = {
  blockId: string;
  type: string;
  props: Record<string, any>;
  meta?: Record<string, any>;
};

function projectRoot(...segments: string[]) {
  return path.join(process.cwd(), ...segments);
}

export function pagesDir(...segments: string[]) {
  return projectRoot("src", "content", "pages", ...segments);
}

export function blocksDir(...segments: string[]) {
  return projectRoot("src", "content", "blocks", ...segments);
}

export async function listPages(): Promise<PageJSON[]> {
  const dir = pagesDir();
  const entries = await fs.readdir(dir);
  const pages: PageJSON[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".json")) continue;
    const file = await fs.readFile(path.join(dir, entry), "utf8");
    const json = JSON.parse(file) as PageJSON;
    pages.push(json);
  }
  pages.sort((a, b) => a.slug.localeCompare(b.slug));
  return pages;
}

export async function readPage(slug: string): Promise<PageJSON> {
  const filePath = pagesDir(`${slug}.json`);
  const text = await fs.readFile(filePath, "utf8");
  return JSON.parse(text) as PageJSON;
}

export function typeSlugFromId(blockId: string) {
  const lastDash = blockId.lastIndexOf("-");
  return lastDash === -1 ? blockId : blockId.slice(0, lastDash);
}

export async function readBlock(blockId: string): Promise<BlockInstance> {
  const typeSlug = typeSlugFromId(blockId);
  const filePath = blocksDir(typeSlug, `${blockId}.json`);
  const text = await fs.readFile(filePath, "utf8");
  return JSON.parse(text) as BlockInstance;
}

export async function writeBlockProps(blockId: string, newProps: Record<string, any>): Promise<void> {
  const typeSlug = typeSlugFromId(blockId);
  const filePath = blocksDir(typeSlug, `${blockId}.json`);
  const text = await fs.readFile(filePath, "utf8");
  const current = JSON.parse(text) as BlockInstance;
  const updated: BlockInstance = { ...current, props: newProps };
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf8");
}
