import { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-1 flex-col">
        <TopNavbar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;