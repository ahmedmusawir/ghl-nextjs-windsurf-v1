import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Passthrough: rely on parent /app/(admin)/layout.tsx for the real sidebar and shell
  return <>{children}</>;
}
