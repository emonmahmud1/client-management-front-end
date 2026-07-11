"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import { expenses } from "@/lib/mock-data/expenses-reports";
import { useAppSelector } from "@/store/hooks";

export function ExpenseListTable() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return expenses;
    return expenses.filter((item) =>
      `${item.title} ${item.category} ${item.paymentMethod}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Expense Ledger</CardTitle>
        <Input
          placeholder="Search title, category, payment method..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="sm:w-80"
        />
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((expense) => (
              <tr key={expense.id} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{expense.id}</td>
                <td className="px-3 py-2">{expense.title}</td>
                <td className="px-3 py-2">{expense.category}</td>
                <td className="px-3 py-2">{expense.date}</td>
                <td className="px-3 py-2">{expense.paymentMethod}</td>
                <td className="px-3 py-2">{formatCurrency(expense.amount, symbol)}</td>
                <td className="px-3 py-2">
                  <Badge tone={expense.status === "paid" ? "success" : "danger"}>
                    {expense.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
