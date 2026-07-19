"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClientSelector } from "@/app/(dashboard-layout)/invoices/new/_components/client-selector";
import { CreateClientModal } from "@/app/(dashboard-layout)/invoices/new/_components/create-client-modal";
import { InvoiceItem, InvoiceItemsTable } from "@/app/(dashboard-layout)/invoices/new/_components/invoice-items-table";
import { ShareInvoiceModal } from "@/app/(dashboard-layout)/invoices/new/_components/share-invoice-modal";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import { useGetClientsQuery, useCreateClientMutation } from "@/store/endpoints/clients-endpoints";
import { useCreateInvoiceMutation } from "@/store/endpoints/invoices-endpoints";

const createItem = (): InvoiceItem => ({
  id: crypto.randomUUID(),
  name: "Service Item",
  quantity: 1,
  price: 0,
});

const NewInvoicePage = () => {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const router = useRouter();

  const { data: clients = [] } = useGetClientsQuery({});
  const [createClientApi] = useCreateClientMutation();
  const [createInvoice, { isLoading: isSaving }] = useCreateInvoiceMutation();

  const [selectedClientId, setSelectedClientId] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([createItem()]);
  const [invoiceNote, setInvoiceNote] = useState("");
  const [openCreateClient, setOpenCreateClient] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [latestInvoiceId, setLatestInvoiceId] = useState("");
  const [newClientForm, setNewClientForm] = useState({ name: "", phone: "", email: "" });

  // Set first client as selected when data loads
  useMemo(() => {
    if (clients.length > 0 && !selectedClientId) {
      setSelectedClientId(clients[0].id);
    }
  }, [clients, selectedClientId]);

  const selectedClient = clients.find((c: any) => c.id === selectedClientId);
  const grandTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items],
  );

  const updateItem = (itemId: string, key: "name" | "quantity" | "price", value: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        if (key === "name") return { ...item, name: value };
        return { ...item, [key]: Number(value) || 0 };
      }),
    );
  };

  const handleCreateClient = async () => {
    if (!newClientForm.name || !newClientForm.phone) {
      toast.error("Name and phone are required");
      return;
    }
    try {
      const newClient: any = await createClientApi({
        name: newClientForm.name,
        phone: newClientForm.phone,
        email: newClientForm.email || "na@na.com",
        company: "New Client",
        address: "Not set",
      }).unwrap();
      setSelectedClientId(newClient.data?.id || newClient.id);
      setNewClientForm({ name: "", phone: "", email: "" });
      setOpenCreateClient(false);
      toast.success(`${newClientForm.name} created and selected`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create client");
    }
  };

  const handleSaveInvoice = async () => {
    if (!selectedClientId) {
      toast.error("Please select a client first");
      return;
    }
    if (items.every((item) => item.quantity <= 0 || item.price <= 0)) {
      toast.error("Add at least one item with quantity and price");
      return;
    }

    try {
      const result: any = await createInvoice({
        clientId: selectedClientId,
        note: invoiceNote || undefined,
        items: items.map(({ name, quantity, price }) => ({ name, quantity, price })),
      }).unwrap();

      const invoiceId = result.data?.invoiceNumber || result.invoiceNumber || "INV-SAVED";
      setLatestInvoiceId(invoiceId);
      setOpenShare(true);
      toast.success(`Invoice ${invoiceId} created successfully`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save invoice");
    }
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
            <Button onClick={handleSaveInvoice} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Invoice"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateClientModal
        open={openCreateClient}
        form={newClientForm}
        onClose={() => setOpenCreateClient(false)}
        onChange={(field, value) => setNewClientForm((prev) => ({ ...prev, [field]: value }))}
        onCreate={handleCreateClient}
      />

      <ShareInvoiceModal
        open={openShare}
        clientPhone={selectedClient?.phone ?? ""}
        clientEmail={selectedClient?.email ?? ""}
        clientName={selectedClient?.name ?? "Client"}
        invoiceId={latestInvoiceId}
        onClose={() => setOpenShare(false)}
      />
    </div>
  );
};

export default NewInvoicePage;
