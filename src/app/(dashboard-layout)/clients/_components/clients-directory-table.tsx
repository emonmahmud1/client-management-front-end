"use client";

import Link from "next/link";
import { ArrowDownWideNarrow } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import { Client } from "@/types/domain";
import { useAppSelector } from "@/store/hooks";

type SortKey = "totalPurchase" | "outstandingDue";

type ClientsDirectoryTableProps = {
  clients: Client[];
};

export function ClientsDirectoryTable({ clients }: ClientsDirectoryTableProps) {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("totalPurchase");

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
                  <Badge tone={client.status === "active" ? "success" : "danger"}>
                    {client.status === "active" ? "Active" : "Overdue Due"}
                  </Badge>
                </td>
                <td className="px-3 py-2">
                  <Link
                    href={`/clients/${client.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
