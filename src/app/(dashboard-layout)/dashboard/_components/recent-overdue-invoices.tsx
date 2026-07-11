"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { overdueInvoices } from "@/lib/mock-data/dashboard";
import { useAppSelector } from "@/store/hooks";

export function RecentOverdueInvoices() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Overdue Invoices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {overdueInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-col gap-2 rounded-md border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold">{invoice.clientName}</p>
              <p className="text-xs text-muted-foreground">
                {invoice.id} · Due: {invoice.dueDate}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-red-600">
                {formatCurrency(invoice.amount, symbol)}
              </p>
              <Button size="sm" variant="outline">
                Send Reminder
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
