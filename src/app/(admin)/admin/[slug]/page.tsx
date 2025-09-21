import { readPage, readBlock } from "../_lib/contentStore";
import { BlockListClient } from "../_components";

export default async function AdminPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const page = await readPage(slug);

  // Read minimal block info for display (type + meta.label) without altering files
  const blocks = await Promise.all(
    page.blocks.map(async ({ blockId }) => {
      try {
        const data = await readBlock(blockId);
        return {
          blockId,
          type: data.type ?? "Unknown",
          label: data.meta?.label ?? "",
        };
      } catch {
        return { blockId, type: "Unknown", label: "" };
      }
    })
  );

  return (
    <main className="w-full p-4 md:p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{page.title || page.slug}</h1>
            <p className="text-sm text-slate-500">{page.slug} • {page.blocks.length} blocks</p>
          </div>
        </div>

        {blocks.length === 0 ? (
          <div className="text-slate-500">No blocks on this page.</div>
        ) : (
          <div className="grid gap-4">
            <BlockListClient blocks={blocks} />
          </div>
        )}
      </div>
    </main>
  );
}

