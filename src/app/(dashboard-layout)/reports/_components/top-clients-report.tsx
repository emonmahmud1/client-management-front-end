"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/format";
import { clients } from "@/lib/mock-data/clients";
import { useAppSelector } from "@/store/hooks";

export function TopClientsReport() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const rows = [...clients].sort((a, b) => b.totalPurchase - a.totalPurchase);

  const sendDueInvoice = (clientName: string, phone: string, due: number) => {
    if (due <= 0) {
      toast({ title: "No outstanding due", description: `${clientName} has no pending amount.` });
      return;
    }
    const message = encodeURIComponent(
      `Hello ${clientName}, this is a reminder that you have an outstanding due of ${formatCurrency(due, symbol)}. Please clear it at your earliest convenience. Thank you!`,
    );
    const url = `https://wa.me/${phone.replaceAll("+", "")}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast({
      title: "WhatsApp opened",
      description: `Due reminder sent to ${clientName}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Clients by Purchase</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Lifetime Purchase</th>
              <th className="px-3 py-2">Current Due</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((client) => (
              <tr key={client.id} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{client.name}</td>
                <td className="px-3 py-2">{client.company}</td>
                <td className="px-3 py-2">{formatCurrency(client.totalPurchase, symbol)}</td>
                <td className="px-3 py-2">{formatCurrency(client.outstandingDue, symbol)}</td>
                <td className="px-3 py-2">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Send due invoice via WhatsApp"
                    onClick={() =>
                      sendDueInvoice(client.name, client.phone, client.outstandingDue)
                    }
                  >
                    <Send className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
