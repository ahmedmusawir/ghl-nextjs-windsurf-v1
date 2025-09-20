import React from "react";
import { BlockRegistry, BlockType } from "./BlockRegistry";
import fs from "node:fs/promises";
import path from "node:path";

// Expected structure of each block JSON under /content/blocks/<type-slug>/<id>.json
interface BlockInstance {
  blockId: string; // e.g., "best-offer-123"
  type: BlockType; // e.g., "BestOffer"
  props: Record<string, any>; // passed to the React component
  meta?: Record<string, any>;
}

interface PageJSON {
  slug: string; // e.g., "home"
  title?: string;
  blocks: { blockId: string }[]; // list of instance ids
}

function blocksDir(...segments: string[]) {
  return path.join(process.cwd(), "src", "content", "blocks", ...segments);
}

function pagesDir(...segments: string[]) {
  return path.join(process.cwd(), "src", "content", "pages", ...segments);
}

async function readJSON<T>(absPath: string): Promise<T> {
  const text = await fs.readFile(absPath, "utf8");
  return JSON.parse(text) as T;
}

function typeSlugFromId(blockId: string) {
  // Convention: <type-slug>-<shortId> → we grab everything before the last dash segment
  const lastDash = blockId.lastIndexOf("-");
  return lastDash === -1 ? blockId : blockId.slice(0, lastDash);
}

export async function BlockRenderer({ page }: { page: string }) {
  // 1) Load page composition JSON
  const pageJsonPath = pagesDir(`${page}.json`);
  const pageData = await readJSON<PageJSON>(pageJsonPath);

  // 2) Resolve each block instance JSON and render via registry
  const nodes = await Promise.all(
    pageData.blocks.map(async ({ blockId }) => {
      const typeSlug = typeSlugFromId(blockId); // e.g., "best-offer"
      const blockPath = blocksDir(typeSlug, `${blockId}.json`);
      const instance = await readJSON<BlockInstance>(blockPath);

      const Component = BlockRegistry[instance.type];
      if (!Component) {
        return (
          <div key={blockId} className="text-red-600">
            Unknown block type: {instance.type}
          </div>
        );
      }
      return <Component key={blockId} {...instance.props} />;
    })
  );

  return <>{nodes}</>;
}
