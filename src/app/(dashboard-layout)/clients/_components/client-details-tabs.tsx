"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";
import { ClientInvoiceHistory, ClientPayment } from "@/types/domain";
import { cn } from "@/lib/utils";

type ClientDetailsTabsProps = {
  currencySymbol: "৳" | "$";
  invoices: ClientInvoiceHistory[];
  payments: ClientPayment[];
  note: string;
};

type TabId = "invoices" | "payments" | "notes";

export function ClientDetailsTabs({
  currencySymbol,
  invoices,
  payments,
  note,
}: ClientDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("invoices");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: "invoices", label: "Invoices" },
            { id: "payments", label: "Payments Ledger" },
            { id: "notes", label: "Internal Timeline / Notes" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabId)}
              className={cn(
                "rounded-md border border-border px-3 py-2 text-sm",
                activeTab === tab.id && "bg-accent",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "invoices" && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Invoice</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t border-border">
                    <td className="px-3 py-2 font-medium">{invoice.id}</td>
                    <td className="px-3 py-2">{invoice.date}</td>
                    <td className="px-3 py-2">
                      {formatCurrency(invoice.amount, currencySymbol)}
                    </td>
                    <td className="px-3 py-2 capitalize">{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-t border-border">
                    <td className="px-3 py-2">{payment.date}</td>
                    <td className="px-3 py-2">{payment.method}</td>
                    <td className="px-3 py-2">
                      {formatCurrency(payment.amount, currencySymbol)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Track WhatsApp communication and payment commitments here.
            </p>
            <Textarea defaultValue={note} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
