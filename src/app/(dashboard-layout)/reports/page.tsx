import { ProfitOverviewChart } from "@/app/(dashboard-layout)/reports/_components/profit-overview-chart";
import { TopClientsReport } from "@/app/(dashboard-layout)/reports/_components/top-clients-report";

const ReportsPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Business Reports</h1>
        <p className="text-sm text-muted-foreground">
          Monitor profitability, revenue-expense movement, and top client performance.
        </p>
      </div>

      <ProfitOverviewChart />
      <TopClientsReport />
    </div>
  );
};

export default ReportsPage;
