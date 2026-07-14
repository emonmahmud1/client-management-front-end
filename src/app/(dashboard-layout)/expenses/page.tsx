import { ExpenseListTable } from "@/app/(dashboard-layout)/expenses/_components/expense-list-table";

const ExpensesPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Expenses Management</h1>
        <p className="text-sm text-muted-foreground">
          Track operational costs, pending payouts, and category-level spending.
        </p>
      </div>

      <ExpenseListTable />
    </div>
  );
};

export default ExpensesPage;
