"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useGetInvoicesQuery } from "@/store/endpoints/invoices-endpoints";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteInvoiceMutation } from "@/store/endpoints/invoices-endpoints";
import { toast } from "sonner";

type ClientDetailsTabsProps = {
  currencySymbol: "৳" | "$";
  clientId: string;
};

type TabId = "invoices" | "payments" | "notes";

export function ClientDetailsTabs({ currencySymbol, clientId }: ClientDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("invoices");
  const { data: allInvoices = [], isLoading } = useGetInvoicesQuery({});
  const [deleteInvoice] = useDeleteInvoiceMutation();

  // Filter invoices for this specific client
  const invoices: any[] = Array.isArray(allInvoices)
    ? allInvoices.filter((inv: any) => inv.clientId === clientId)
    : [];
  const payments: any[] = invoices.flatMap((inv: any) => inv.payments ?? []);

  const handleDeleteInvoice = async (id: string) => {
    try {
      await deleteInvoice(id).unwrap();
      toast.success("Invoice deleted");
    } catch {
      toast.error("Failed to delete invoice");
    }
  };

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
            { id: "notes", label: "Internal Notes" },
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

        {isLoading && (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && activeTab === "invoices" && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Invoice #</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                      No invoices yet.
                    </td>
                  </tr>
                )}
                {invoices.map((invoice: any) => {
                  const amount = (invoice.items || []).reduce(
                    (sum: number, item: any) => sum + item.quantity * item.price, 0
                  );
                  return (
                    <tr key={invoice.id} className="border-t border-border">
                      <td className="px-3 py-2 font-medium">{invoice.invoiceNumber}</td>
                      <td className="px-3 py-2">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                      <td className="px-3 py-2">{formatCurrency(amount, currencySymbol)}</td>
                      <td className="px-3 py-2">
                        <Badge variant={invoice.status === "PAID" ? "default" : invoice.status === "OVERDUE" ? "destructive" : "secondary"}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          title="Delete Invoice"
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && activeTab === "payments" && (
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
                {payments.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
                      No payments yet.
                    </td>
                  </tr>
                )}
                {payments.map((payment: any) => (
                  <tr key={payment.id} className="border-t border-border">
                    <td className="px-3 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="px-3 py-2">{payment.method}</td>
                    <td className="px-3 py-2">{formatCurrency(payment.amount, currencySymbol)}</td>
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
            <Textarea placeholder="Add internal notes about this client..." />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
