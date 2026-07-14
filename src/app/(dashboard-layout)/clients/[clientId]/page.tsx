"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { ClientDetailsTabs } from "@/app/(dashboard-layout)/clients/_components/client-details-tabs";
import { ClientProfileSummary } from "@/app/(dashboard-layout)/clients/_components/client-profile-summary";
import { NewOrderDialog } from "@/app/(dashboard-layout)/clients/_components/new-order-dialog";
import { Button } from "@/components/ui/button";
import {
  clientInvoicesById,
  clientNotesById,
  clientPaymentsById,
  clients,
} from "@/lib/mock-data/clients";
import { useAppSelector } from "@/store/hooks";

const ClientProfilePage = () => {
  const params = useParams<{ clientId: string }>();
  const currencySymbol = useAppSelector((state) => state.app.currencySymbol);
  const [openOrder, setOpenOrder] = useState(false);
  const clientId = params.clientId;
  const client = clients.find((item) => item.id === clientId);

  if (!client) {
    return (
      <p className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
        Client not found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Client 360° Profile</h1>
          <p className="text-sm text-muted-foreground">
            Full financial and communication context for {client.name}.
          </p>
        </div>
        <Button onClick={() => setOpenOrder(true)} className="shrink-0 sm:self-start">
          <ShoppingCart className="size-4" />
          New Order
        </Button>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ClientProfileSummary client={client} currencySymbol={currencySymbol} />
        </div>
        <div className="lg:col-span-2">
          <ClientDetailsTabs
            currencySymbol={currencySymbol}
            invoices={clientInvoicesById[clientId] ?? []}
            payments={clientPaymentsById[clientId] ?? []}
            note={clientNotesById[clientId] ?? ""}
          />
        </div>
      </section>

      <NewOrderDialog
        open={openOrder}
        client={client}
        onClose={() => setOpenOrder(false)}
      />
    </div>
  );
};

export default ClientProfilePage;
