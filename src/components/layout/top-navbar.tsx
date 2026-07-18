"use client";

import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { SidebarNav } from "@/components/layout/app-sidebar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGlobalSearchQuery } from "@/store/slices/app-slice";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TopNavbar() {
  const dispatch = useAppDispatch();
  const { activeUser, globalSearchQuery } = useAppSelector((state) => state.app);
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 lg:px-6">
        <Sheet open={openMobileSidebar} onOpenChange={setOpenMobileSidebar}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader className="h-16 border-b border-border px-5 py-3">
              <SheetTitle className="text-left text-base">Plaxora Admin Hub</SheetTitle>
            </SheetHeader>
            <SidebarNav onNavigate={() => setOpenMobileSidebar(false)} />
          </SheetContent>
        </Sheet>

        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={globalSearchQuery}
            onChange={(event) => dispatch(setGlobalSearchQuery(event.target.value))}
            placeholder="Search clients, invoices, phone..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="flex items-center gap-2.5">
            {activeUser ? (
              <>
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                  title={activeUser.name}
                >
                  {getInitials(activeUser.name)}
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold leading-tight">{activeUser.name}</p>
                  <p className="text-xs text-muted-foreground">{activeUser.role}</p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
