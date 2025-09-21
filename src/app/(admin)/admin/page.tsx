import { redirect } from "next/navigation";
import { listPages } from "./_lib/contentStore";

export default async function AdminIndexPage() {
  const pages = await listPages();
  const first = pages[0];
  const target = first ? `/admin/${first.slug}` : "/admin/empty";
  redirect(target);
}
