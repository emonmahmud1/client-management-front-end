"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { expenseSummary } from "@/lib/mock-data/expenses-reports";
import { useAppSelector } from "@/store/hooks";

export function ExpenseSummaryCards() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardDescription>This Month Expense</CardDescription>
          <CardTitle className="text-2xl">{formatCurrency(expenseSummary.thisMonth, symbol)}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Pending Expense</CardDescription>
          <CardTitle className="text-2xl text-red-600">
            {formatCurrency(expenseSummary.pending, symbol)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Weekly Average</CardDescription>
          <CardTitle className="text-2xl">
            {formatCurrency(expenseSummary.averageWeekly, symbol)}
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
