"use client";

import Link from "next/link";
import { AlertTriangle, ArrowDownWideNarrow, CheckCircle2, Eye, Banknote } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import { Client } from "@/types/domain";
import { useAppSelector } from "@/store/hooks";
import { AddPaymentDialog } from "./add-payment-dialog";

type SortKey = "totalPurchase" | "outstandingDue";

type ClientsDirectoryTableProps = {
  clients: any[];
  onStatusToggle?: (clientId: string) => void;
};

export function ClientsDirectoryTable({ clients, onStatusToggle }: ClientsDirectoryTableProps) {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("totalPurchase");
  const [paymentClient, setPaymentClient] = useState<any>(null);

  const rows = useMemo(() => {
    const filtered = clients.filter((client) =>
      `${client.name} ${client.phone} ${client.address}`.toLowerCase().includes(query.toLowerCase()),
    );
    return filtered.sort((a, b) => b[sortKey] - a[sortKey]);
  }, [clients, query, sortKey]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Client Directory</CardTitle>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Input
            placeholder="Search by phone, name, address"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="sm:w-72"
          />
          <Button
            variant="outline"
            onClick={() =>
              setSortKey((prev) => (prev === "totalPurchase" ? "outstandingDue" : "totalPurchase"))
            }
          >
            <ArrowDownWideNarrow className="size-4" />
            Sort: {sortKey === "totalPurchase" ? "Total Purchase" : "Outstanding Due"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Total Purchase</th>
              <th className="px-3 py-2">Outstanding</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((client) => (
              <tr key={client.id} className="border-t border-border">
                <td className="px-3 py-2">
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.company}</p>
                </td>
                <td className="px-3 py-2">{client.phone}</td>
                <td className="px-3 py-2">{formatCurrency(client.totalPurchase, symbol)}</td>
                <td className="px-3 py-2">{formatCurrency(client.outstandingDue, symbol)}</td>
                <td className="px-3 py-2">
                  <Badge tone={client.status === "ACTIVE" ? "success" : "danger"}>
                    {client.status === "ACTIVE" ? "Active" : client.status === "OVERDUE" ? "Overdue" : client.status}
                  </Badge>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onStatusToggle?.(client.id)}
                      title={client.status === "ACTIVE" ? "Mark as Overdue" : "Mark as Active"}
                    >
                      {client.status === "ACTIVE" ? (
                        <AlertTriangle className="size-4 text-orange-500" />
                      ) : (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      )}
                    </Button>
                    {client.outstandingDue > 0 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPaymentClient(client)}
                        title="Receive Payment"
                      >
                        <Banknote className="size-4 text-primary" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon" asChild title="View Profile">
                      <Link href={`/clients/${client.id}`}>
                        <Eye className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>

      {paymentClient && (
        <AddPaymentDialog
          open={!!paymentClient}
          onOpenChange={(open) => !open && setPaymentClient(null)}
          clientId={paymentClient.id}
          clientName={paymentClient.name}
          outstandingDue={paymentClient.outstandingDue}
        />
      )}
    </Card>
  );
}
