"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InvoiceItemsTable, InvoiceItem } from "@/app/(dashboard-layout)/invoices/new/_components/invoice-items-table";
import { ShareInvoiceModal } from "@/app/(dashboard-layout)/invoices/new/_components/share-invoice-modal";
import { formatCurrency } from "@/lib/format";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { useCreateInvoiceMutation } from "@/store/endpoints/invoices-endpoints";

type NewOrderDialogProps = {
  open: boolean;
  client: any;
  onClose: () => void;
};

const createItem = (): InvoiceItem => ({
  id: crypto.randomUUID(),
  name: "Service Item",
  quantity: 1,
  price: 0,
});

export function NewOrderDialog({ open, client, onClose }: NewOrderDialogProps) {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const [items, setItems] = useState<InvoiceItem[]>([createItem()]);
  const [invoiceNote, setInvoiceNote] = useState("");
  const [openShare, setOpenShare] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

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

  const handleSave = async () => {
    if (items.every((item) => item.quantity <= 0 || item.price <= 0)) {
      toast.error("Add at least one item with quantity and price");
      return;
    }

    try {
      const result: any = await createInvoice({
        clientId: client.id,
        note: invoiceNote || undefined,
        items: items.map(({ name, quantity, price }) => ({ name, quantity, price })),
      }).unwrap();

      const generatedId = result.data?.invoiceNumber || result.invoiceNumber || "INV-SAVED";
      setInvoiceId(generatedId);
      setOpenShare(true);
      toast.success(`Invoice ${generatedId} created for ${client.name}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create invoice");
    }
  };

  const handleClose = () => {
    setItems([createItem()]);
    setInvoiceNote("");
    onClose();
  };

  return (
    <>
      <Dialog open={open && !openShare} onOpenChange={(next) => !next && handleClose()}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Order for {client?.name}</DialogTitle>
            <DialogDescription>
              {client?.company} · {client?.phone}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Invoice Note
              </label>
              <Input
                placeholder="Payment terms, delivery comments..."
                value={invoiceNote}
                onChange={(e) => setInvoiceNote(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Order Items
              </label>
              <InvoiceItemsTable
                items={items}
                onChange={updateItem}
                onAdd={() => setItems((prev) => [...prev, createItem()])}
                onRemove={(itemId) =>
                  setItems((prev) => prev.filter((item) => item.id !== itemId))
                }
              />
            </div>

            <div className="flex flex-col items-end gap-1 rounded-md bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Grand Total</p>
              <p className="text-2xl font-bold">{formatCurrency(grandTotal, symbol)}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>Cancel</Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save & Create Invoice"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ShareInvoiceModal
        open={openShare}
        clientPhone={client?.phone ?? ""}
        clientEmail={client?.email ?? ""}
        clientName={client?.name ?? "Client"}
        invoiceId={invoiceId}
        onClose={() => {
          setOpenShare(false);
          handleClose();
        }}
      />
    </>
  );
}
