import Link from "next/link";
import { listPages } from "../_lib/contentStore";

export default async function Sidebar({ activeSlug }: { activeSlug: string }) {
  const pages = await listPages();
  return (
    <aside className="col-span-12 md:col-span-3 lg:col-span-3">
      <div className="sticky top-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="px-2 pb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">
          Pages
        </h2>
        <nav className="space-y-1">
          {pages.map((p) => {
            const isActive = p.slug === activeSlug;
            const label = p.title || p.slug;
            return (
              <Link
                key={p.slug}
                href={`/admin/${p.slug}`}
                className={
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors " +
                  (isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-700 hover:bg-slate-50 border border-transparent")
                }
              >
                <span>{label}</span>
                {isActive && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide">Active</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
