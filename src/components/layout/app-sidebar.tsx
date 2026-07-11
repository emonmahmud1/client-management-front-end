"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/components/layout/sidebar-links";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  onNavigate?: () => void;
};

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 p-3">
      {sidebarLinks.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground",
              active && "bg-accent text-foreground",
            )}
          >
            <link.icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-border bg-card lg:sticky lg:top-0 lg:block">
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <div>
          <p className="text-sm text-muted-foreground">Plaxora</p>
          <p className="text-lg font-semibold tracking-tight">Admin Hub</p>
        </div>
        <Badge>v1</Badge>
      </div>
      <SidebarNav />
    </aside>
  );
}
