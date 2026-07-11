"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { clients } from "@/lib/mock-data/clients";
import { useAppSelector } from "@/store/hooks";

export function TopClientsReport() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const rows = [...clients].sort((a, b) => b.totalPurchase - a.totalPurchase);

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
            </tr>
          </thead>
          <tbody>
            {rows.map((client) => (
              <tr key={client.id} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{client.name}</td>
                <td className="px-3 py-2">{client.company}</td>
                <td className="px-3 py-2">{formatCurrency(client.totalPurchase, symbol)}</td>
                <td className="px-3 py-2">{formatCurrency(client.outstandingDue, symbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
