import { IncomeExpenseChart } from "@/app/(dashboard-layout)/dashboard/_components/income-expense-chart";
import { InvoiceStatusChart } from "@/app/(dashboard-layout)/dashboard/_components/invoice-status-chart";
import { KpiCards } from "@/app/(dashboard-layout)/dashboard/_components/kpi-cards";
import { NewWhatsappClients } from "@/app/(dashboard-layout)/dashboard/_components/new-whatsapp-clients";
import { RecentOverdueInvoices } from "@/app/(dashboard-layout)/dashboard/_components/recent-overdue-invoices";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Bird&apos;s-eye view of business performance and pending actions.
        </p>
      </div>

      <KpiCards />

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <IncomeExpenseChart />
        </div>
        <div className="lg:col-span-2">
          <InvoiceStatusChart />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <RecentOverdueInvoices />
        <NewWhatsappClients />
      </section>
    </div>
  );
};

export default DashboardPage;
