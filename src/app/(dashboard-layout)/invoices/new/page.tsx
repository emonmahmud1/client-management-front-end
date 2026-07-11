"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClientSelector } from "@/app/(dashboard-layout)/invoices/new/_components/client-selector";
import { CreateClientModal } from "@/app/(dashboard-layout)/invoices/new/_components/create-client-modal";
import { InvoiceItem, InvoiceItemsTable } from "@/app/(dashboard-layout)/invoices/new/_components/invoice-items-table";
import { ShareInvoiceModal } from "@/app/(dashboard-layout)/invoices/new/_components/share-invoice-modal";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/format";
import { clients as initialClients } from "@/lib/mock-data/clients";
import { Client } from "@/types/domain";
import { useAppSelector } from "@/store/hooks";

const createItem = (): InvoiceItem => ({
  id: crypto.randomUUID(),
  name: "Service Item",
  quantity: 1,
  price: 0,
});

const NewInvoicePage = () => {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClientId, setSelectedClientId] = useState(initialClients[0]?.id ?? "");
  const [items, setItems] = useState<InvoiceItem[]>([createItem()]);
  const [invoiceNote, setInvoiceNote] = useState("");
  const [openCreateClient, setOpenCreateClient] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [latestInvoiceId, setLatestInvoiceId] = useState("INV-100001");
  const [newClientForm, setNewClientForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const selectedClient = clients.find((client) => client.id === selectedClientId);
  const grandTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items],
  );

  const updateItem = (
    itemId: string,
    key: "name" | "quantity" | "price",
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        if (key === "name") return { ...item, name: value };
        return { ...item, [key]: Number(value) || 0 };
      }),
    );
  };

  const createClient = () => {
    if (!newClientForm.name || !newClientForm.phone) {
      toast({
        title: "Missing fields",
        description: "Name and phone are required to create a client.",
        variant: "destructive",
      });
      return;
    }

    const newClient: Client = {
      id: `c-${Date.now()}`,
      name: newClientForm.name,
      phone: newClientForm.phone,
      email: newClientForm.email || "na@na.com",
      company: "New Client",
      address: "Not set",
      status: "active",
      totalPurchase: 0,
      outstandingDue: 0,
    };
    setClients((prev) => [newClient, ...prev]);
    setSelectedClientId(newClient.id);
    setNewClientForm({ name: "", phone: "", email: "" });
    setOpenCreateClient(false);
    toast({
      title: "Client created",
      description: `${newClient.name} is ready for invoice creation.`,
    });
  };

  const handleSaveInvoice = () => {
    if (!selectedClientId) {
      toast({
        title: "Select client first",
        description: "Please select or create a client before saving invoice.",
        variant: "destructive",
      });
      return;
    }

    if (items.every((item) => item.quantity <= 0 || item.price <= 0)) {
      toast({
        title: "Invoice items incomplete",
        description: "Add at least one item with quantity and price.",
        variant: "destructive",
      });
      return;
    }

    const generatedId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setLatestInvoiceId(generatedId);
    setOpenShare(true);
    toast({
      title: "Invoice saved",
      description: `${generatedId} is created successfully.`,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Quick Order & Invoice Creation</h1>
        <p className="text-sm text-muted-foreground">
          Fast single-page workflow for WhatsApp orders and payment commitments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Select Client</p>
              <ClientSelector
                clients={clients}
                selectedClientId={selectedClientId}
                onSelect={setSelectedClientId}
                onCreateNew={() => setOpenCreateClient(true)}
              />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Invoice Note</p>
              <Input
                placeholder="Payment terms, delivery comments..."
                value={invoiceNote}
                onChange={(event) => setInvoiceNote(event.target.value)}
              />
            </div>
          </div>

          <InvoiceItemsTable
            items={items}
            onChange={updateItem}
            onAdd={() => setItems((prev) => [...prev, createItem()])}
            onRemove={(itemId) => {
              setItems((prev) => prev.filter((item) => item.id !== itemId));
            }}
          />

          <div className="flex flex-col items-end gap-2 rounded-md bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Grand Total</p>
            <p className="text-2xl font-bold">{formatCurrency(grandTotal, symbol)}</p>
            <Button onClick={handleSaveInvoice}>Save Invoice</Button>
          </div>
        </CardContent>
      </Card>

      <CreateClientModal
        open={openCreateClient}
        form={newClientForm}
        onClose={() => setOpenCreateClient(false)}
        onChange={(field, value) => setNewClientForm((prev) => ({ ...prev, [field]: value }))}
        onCreate={createClient}
      />

      <ShareInvoiceModal
        open={openShare}
        clientPhone={selectedClient?.phone ?? "+8801700000000"}
        invoiceId={latestInvoiceId}
        onClose={() => setOpenShare(false)}
      />
    </div>
  );
};

export default NewInvoicePage;
