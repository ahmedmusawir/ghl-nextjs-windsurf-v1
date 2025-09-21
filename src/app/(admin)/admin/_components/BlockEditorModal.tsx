"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type BlockEditorModalProps = {
  blockId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
};

// Helpers to map between JSON props and form fields
function toTextarea(value: unknown): string {
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === "string")) return (value as string[]).join("\n");
  }
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function fromTextarea(original: unknown, value: string): any {
  // If original was an array of strings, split by newline
  if (Array.isArray(original) && original.every((v) => typeof v === "string")) {
    return value
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  // Otherwise keep as string
  return value;
}

export function BlockEditorModal({ blockId, open, onOpenChange, onSaved }: BlockEditorModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [type, setType] = React.useState<string>("");
  const [metaLabel, setMetaLabel] = React.useState<string>("");
  const [propsState, setPropsState] = React.useState<Record<string, any>>({});
  const [originalPropsShape, setOriginalPropsShape] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    let active = true;
    async function load() {
      if (!blockId || !open) return;
      setLoading(true);
      try {
        const res = await fetch(`/admin/api/block/${encodeURIComponent(blockId)}`);
        if (!res.ok) throw new Error("Failed to load block");
        const data = await res.json();
        if (!active) return;
        setType(data.type || "");
        setMetaLabel(data.meta?.label || "");
        setPropsState(data.props || {});
        setOriginalPropsShape(data.props || {});
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [blockId, open]);

  const handleChange = (key: string, value: any) => {
    setPropsState((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSave() {
    if (!blockId) return;
    setSaving(true);
    try {
      const res = await fetch(`/admin/api/block/${encodeURIComponent(blockId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ props: propsState }),
      });
      if (!res.ok) throw new Error("Save failed");
      onSaved();
      onOpenChange(false);
    } catch (e) {
      console.error(e);
      alert("Failed to save block. Check console for details.");
    } finally {
      setSaving(false);
    }
  }

  // Build simple form fields by looking at the current props shape
  const fields = Object.entries(propsState || {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit: {type}</DialogTitle>
          <DialogDescription className="text-slate-500">
            {blockId}
            {metaLabel ? ` • ${metaLabel}` : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
          {loading && <div className="text-sm text-slate-500">Loading…</div>}
          {!loading && fields.length === 0 && (
            <div className="text-sm text-slate-500">No editable props.</div>
          )}
          {!loading &&
            fields.map(([key, val]) => {
              const original = originalPropsShape[key];
              const typeOfVal = typeof val;

              if (typeof original === "boolean") {
                return (
                  <label key={key} className="flex items-center justify-between gap-4 border rounded-lg p-3">
                    <span className="text-sm font-medium text-slate-700">{key}</span>
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={Boolean(val)}
                      onChange={(e) => handleChange(key, e.target.checked)}
                    />
                  </label>
                );
              }

              // Array of objects -> Repeater UI (e.g., points: [{ title, desc }])
              if (
                Array.isArray(original) &&
                original.length > 0 &&
                original.every((v: any) => v && typeof v === "object" && !Array.isArray(v))
              ) {
                const currentArr: any[] = Array.isArray(propsState[key]) ? propsState[key] : [];
                // Determine the editable keys from the original shape (fallback to current first item)
                const templateObj = original[0] || currentArr[0] || {};
                const fieldKeys = Array.from(new Set(Object.keys(templateObj)));

                const updateItem = (idx: number, field: string, value: any) => {
                  const next = currentArr.map((it, i) => (i === idx ? { ...it, [field]: value } : it));
                  handleChange(key, next);
                };
                const removeItem = (idx: number) => {
                  const next = currentArr.filter((_, i) => i !== idx);
                  handleChange(key, next);
                };
                const addItem = () => {
                  const empty: Record<string, any> = {};
                  fieldKeys.forEach((k) => (empty[k] = ""));
                  const next = [...currentArr, empty];
                  handleChange(key, next);
                };

                return (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">{key}</label>
                      <Button type="button" className="rounded-lg h-8 px-3" onClick={addItem}>
                        + Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {currentArr.length === 0 && (
                        <div className="text-xs text-slate-500">No items yet.</div>
                      )}
                      {currentArr.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 p-3 space-y-3 bg-white">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-600">Item {idx + 1}</span>
                            <button
                              type="button"
                              className="text-xs text-red-600 hover:underline"
                              onClick={() => removeItem(idx)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {fieldKeys.map((fk) => (
                              <div key={fk} className="space-y-1">
                                <label className="text-xs font-medium text-slate-600">{fk}</label>
                                <input
                                  type="text"
                                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={String(item?.[fk] ?? "")}
                                  onChange={(e) => updateItem(idx, fk, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (Array.isArray(original) && original.every((v: any) => typeof v === "string")) {
                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">{key}</label>
                    <textarea
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={5}
                      value={toTextarea(val)}
                      onChange={(e) => handleChange(key, fromTextarea(original, e.target.value))}
                    />
                    <p className="text-xs text-slate-500">Enter one item per line.</p>
                  </div>
                );
              }

              // Fallback to text input for strings and others
              return (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{key}</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={String(val ?? "")}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              );
            })}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || loading} className="rounded-xl">
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
