"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import { useGetRecentOverdueInvoicesQuery } from "@/store/endpoints/dashboard-endpoints";
import { Loader2 } from "lucide-react";

export function RecentOverdueInvoices() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const { data: overdueInvoices = [], isLoading } = useGetRecentOverdueInvoicesQuery({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Overdue Invoices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : overdueInvoices.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
            No overdue invoices
          </div>
        ) : (
          overdueInvoices.map((invoice: any) => (
            <div
              key={invoice.id}
              className="flex flex-col gap-2 rounded-md border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold">{invoice.clientName}</p>
                <p className="text-xs text-muted-foreground">
                  {invoice.invoiceNumber} · Due: {invoice.dueDate}
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
          ))
        )}
      </CardContent>
    </Card>
  );
}
