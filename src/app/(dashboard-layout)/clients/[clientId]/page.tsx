"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, Loader2 } from "lucide-react";
import { ClientDetailsTabs } from "@/app/(dashboard-layout)/clients/_components/client-details-tabs";
import { ClientProfileSummary } from "@/app/(dashboard-layout)/clients/_components/client-profile-summary";
import { NewOrderDialog } from "@/app/(dashboard-layout)/clients/_components/new-order-dialog";
import { AddPaymentDialog } from "@/app/(dashboard-layout)/clients/_components/add-payment-dialog";
import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";
import { useGetClientByIdQuery } from "@/store/endpoints/clients-endpoints";
import { useAppSelector } from "@/store/hooks";

const ClientProfilePage = () => {
  const params = useParams<{ clientId: string }>();
  const currencySymbol = useAppSelector((state) => state.app.currencySymbol);
  const [openOrder, setOpenOrder] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const clientId = params.clientId;

  const { data: clientData, isLoading, isError } = useGetClientByIdQuery(clientId);
  const client = clientData?.data || clientData;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !client) {
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
        <div className="flex shrink-0 sm:self-start gap-2">
          {client.outstandingDue > 0 && (
            <Button variant="outline" onClick={() => setOpenPayment(true)}>
              <Banknote className="size-4" />
              Receive Payment
            </Button>
          )}
          <Button onClick={() => setOpenOrder(true)}>
            <ShoppingCart className="size-4" />
            New Order
          </Button>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ClientProfileSummary client={client} currencySymbol={currencySymbol} />
        </div>
        <div className="lg:col-span-2">
          <ClientDetailsTabs
            currencySymbol={currencySymbol}
            client={client}
          />
        </div>
      </section>

      <NewOrderDialog
        open={openOrder}
        client={client}
        onClose={() => setOpenOrder(false)}
      />

      <AddPaymentDialog
        open={openPayment}
        onOpenChange={setOpenPayment}
        clientId={client.id}
        clientName={client.name}
        outstandingDue={client.outstandingDue}
      />
    </div>
  );
};

export default ClientProfilePage;
