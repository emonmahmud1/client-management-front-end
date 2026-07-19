"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock, Loader2, Trash2, Plus } from "lucide-react";
import { AddExpenseDialog } from "@/app/(dashboard-layout)/expenses/_components/add-expense-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import { useGetExpensesQuery, useUpdateExpenseMutation, useDeleteExpenseMutation } from "@/store/endpoints/expenses-endpoints";
import { toast } from "sonner";

export function ExpenseListTable() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const [query, setQuery] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const { data: expenses = [], isLoading } = useGetExpensesQuery({});
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return expenses;
    return expenses.filter((item: any) =>
      `${item.title} ${item.category} ${item.paymentMethod}`.toLowerCase().includes(q),
    );
  }, [query, expenses]);

  const toggleStatus = async (expense: any) => {
    const newStatus = expense.status === "PENDING" ? "PAID" : "PENDING";
    try {
      await updateExpense({
        id: expense.id,
        title: expense.title,
        category: expense.category,
        amount: expense.amount,
        date: expense.date,
        paymentMethod: expense.paymentMethod,
        status: newStatus,
      }).unwrap();
      toast.success(`Expense marked as ${newStatus.toLowerCase()}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id).unwrap();
      toast.success("Expense deleted");
    } catch {
      toast.error("Failed to delete expense");
    }
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
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-6 text-center text-muted-foreground">
                      No expenses found. Add your first expense!
                    </td>
                  </tr>
                )}
                {rows.map((expense: any) => (
                  <tr key={expense.id} className="border-t border-border">
                    <td className="px-3 py-2 font-medium">{expense.title}</td>
                    <td className="px-3 py-2">{expense.category}</td>
                    <td className="px-3 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="px-3 py-2">{expense.paymentMethod}</td>
                    <td className="px-3 py-2">{formatCurrency(expense.amount, symbol)}</td>
                    <td className="px-3 py-2">
                      <Badge variant={expense.status === "PAID" ? "default" : "secondary"}>
                        {expense.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleStatus(expense)}
                          title={expense.status === "PENDING" ? "Mark as Paid" : "Mark as Pending"}
                        >
                          {expense.status === "PENDING" ? (
                            <CheckCircle2 className="size-4 text-emerald-600" />
                          ) : (
                            <Clock className="size-4 text-orange-500" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(expense.id)}
                          title="Delete Expense"
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <AddExpenseDialog open={openAdd} onClose={() => setOpenAdd(false)} />
    </>
  );
}
