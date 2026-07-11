"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type InvoiceItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type InvoiceItemsTableProps = {
  items: InvoiceItem[];
  onChange: (itemId: string, key: "name" | "quantity" | "price", value: string) => void;
  onAdd: () => void;
  onRemove: (itemId: string) => void;
};

export function InvoiceItemsTable({
  items,
  onChange,
  onAdd,
  onRemove,
}: InvoiceItemsTableProps) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Item</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Subtotal</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-3 py-2">
                  <Input
                    value={item.name}
                    onChange={(event) => onChange(item.id, "name", event.target.value)}
                  />
                </td>
                <td className="w-28 px-3 py-2">
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => onChange(item.id, "quantity", event.target.value)}
                  />
                </td>
                <td className="w-36 px-3 py-2">
                  <Input
                    type="number"
                    min={0}
                    value={item.price}
                    onChange={(event) => onChange(item.id, "price", event.target.value)}
                  />
                </td>
                <td className="px-3 py-2 font-semibold">
                  {(item.quantity * item.price).toLocaleString("en-US")}
                </td>
                <td className="px-3 py-2">
                  <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button type="button" variant="outline" onClick={onAdd}>
        <Plus className="size-4" />
        Add Item
      </Button>
    </div>
  );
}
