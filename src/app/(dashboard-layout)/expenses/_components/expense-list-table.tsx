"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock, Plus } from "lucide-react";
import { AddExpenseDialog } from "@/app/(dashboard-layout)/expenses/_components/add-expense-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import { expenses as initialExpenses } from "@/lib/mock-data/expenses-reports";
import { ExpenseRecord } from "@/types/domain";
import { useAppSelector } from "@/store/hooks";

export function ExpenseListTable() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(initialExpenses);
  const [query, setQuery] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return expenses;
    return expenses.filter((item) =>
      `${item.title} ${item.category} ${item.paymentMethod}`.toLowerCase().includes(q),
    );
  }, [query, expenses]);

  const toggleStatus = (id: string) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? { ...exp, status: exp.status === "pending" ? "paid" : "pending" }
          : exp,
      ),
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Expense Ledger</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              placeholder="Search title, category, method..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="sm:w-72"
            />
            <Button onClick={() => setOpenAdd(true)} className="shrink-0">
              <Plus className="size-4" />
              Add Expense
            </Button>
          </div>
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
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-muted-foreground">
                    No expenses found.
                  </td>
                </tr>
              )}
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
                  <td className="px-3 py-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleStatus(expense.id)}
                      title={expense.status === "pending" ? "Mark as Paid" : "Mark as Pending"}
                    >
                      {expense.status === "pending" ? (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      ) : (
                        <Clock className="size-4 text-orange-500" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AddExpenseDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={(expense) => setExpenses((prev) => [expense, ...prev])}
      />
    </>
  );
}
