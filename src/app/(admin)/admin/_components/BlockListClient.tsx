"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BlockEditorModal } from "./BlockEditorModal";

export type BlockCard = {
  blockId: string;
  type: string;
  label?: string;
};

export default function BlockListClient({ blocks }: { blocks: BlockCard[] }) {
  const router = useRouter();
  const [editing, setEditing] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string>("");

  function handleSaved() {
    // show success toast and refresh data
    setToast("Saved successfully");
    router.refresh();
    setTimeout(() => setToast(""), 2000);
  }

  return (
    <div className="space-y-4">
      {toast && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm">
          {toast}
        </div>
      )}
      <ul className="grid gap-4">
        {blocks.map((b, index) => (
          <li key={`${b.blockId}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{b.type}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {b.blockId}
                  {b.label ? ` • ${b.label}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button className="rounded-xl" onClick={() => setEditing(b.blockId)}>
                  ✏️ Edit
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <BlockEditorModal
        blockId={editing}
        open={Boolean(editing)}
        onOpenChange={(o) => !o && setEditing(null)}
        onSaved={handleSaved}
      />
    </div>
  );
}
