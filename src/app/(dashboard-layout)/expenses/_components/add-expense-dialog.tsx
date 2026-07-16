"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ExpenseCategory, ExpenseRecord } from "@/types/domain";

type AddExpenseDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (expense: ExpenseRecord) => void;
};

const CATEGORIES: ExpenseCategory[] = [
  "Marketing",
  "Operations",
  "Logistics",
  "Salary",
  "Utilities",
];
const METHODS = ["Cash", "bKash", "Bank"] as const;

const today = () => new Date().toISOString().split("T")[0];

const emptyForm = () => ({
  title: "",
  category: "Operations" as ExpenseCategory,
  amount: "",
  date: today(),
  paymentMethod: "Cash" as "Cash" | "bKash" | "Bank",
});

export function AddExpenseDialog({ open, onClose, onAdd }: AddExpenseDialogProps) {
  const [form, setForm] = useState(emptyForm);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAdd = () => {
    if (!form.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      toast({ title: "Enter a valid amount", variant: "destructive" });
      return;
    }
    if (!form.date) {
      toast({ title: "Date required", variant: "destructive" });
      return;
    }

    const expense: ExpenseRecord = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      title: form.title.trim(),
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
      paymentMethod: form.paymentMethod,
      status: "pending",
    };

    onAdd(expense);
    setForm(emptyForm);
    onClose();
    toast({ title: "Expense added", description: `${expense.title} recorded as pending.` });
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>Record a new expense. Status will be set to pending.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g. Warehouse Rent, Meta Ads Boost"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Payment Method <span className="text-destructive">*</span>
              </label>
              <select
                value={form.paymentMethod}
                onChange={(e) => set("paymentMethod", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Amount <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                min={1}
                placeholder="0"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Date <span className="text-destructive">*</span>
              </label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Expense</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
