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
import { toast } from "sonner";
import { useCreateExpenseMutation } from "@/store/endpoints/expenses-endpoints";

type AddExpenseDialogProps = {
  open: boolean;
  onClose: () => void;
};

// Must match backend ExpenseCategory enum
const CATEGORIES = ["MARKETING", "OPERATIONS", "LOGISTICS", "SALARY", "UTILITIES"] as const;
// Must match backend PaymentMethod enum
const METHODS = ["CASH", "BKASH", "BANK"] as const;

const today = () => new Date().toISOString().split("T")[0];

const emptyForm = () => ({
  title: "",
  category: "OPERATIONS" as typeof CATEGORIES[number],
  amount: "",
  date: today(),
  paymentMethod: "CASH" as typeof METHODS[number],
});

export function AddExpenseDialog({ open, onClose }: AddExpenseDialogProps) {
  const [form, setForm] = useState(emptyForm);
  const [createExpense, { isLoading }] = useCreateExpenseMutation();

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAdd = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.amount || Number(form.amount) <= 0) { toast.error("Enter a valid amount"); return; }
    if (!form.date) { toast.error("Date is required"); return; }

    try {
      await createExpense({
        title: form.title.trim(),
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
        paymentMethod: form.paymentMethod,
        status: "PENDING",
      }).unwrap();
      toast.success(`${form.title} recorded as pending`);
      setForm(emptyForm);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add expense");
    }
  };

  const handleClose = () => { setForm(emptyForm); onClose(); };

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
                  <option key={c} value={c}>{c}</option>
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
                  <option key={m} value={m}>{m}</option>
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
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleAdd} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
