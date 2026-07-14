"use client";

import { useState } from "react";
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
import { toast } from "@/hooks/use-toast";
import { Client } from "@/types/domain";

type AddClientDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (client: Client) => void;
};

const emptyForm = () => ({
  name: "",
  company: "",
  phone: "",
  email: "",
  address: "",
});

export function AddClientDialog({ open, onClose, onAdd }: AddClientDialogProps) {
  const [form, setForm] = useState(emptyForm);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAdd = () => {
    if (!form.name.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }
    if (!form.phone.trim()) {
      toast({ title: "Phone / WhatsApp number required", variant: "destructive" });
      return;
    }

    const client: Client = {
      id: `c-${Date.now()}`,
      name: form.name.trim(),
      company: form.company.trim() || "—",
      phone: form.phone.trim(),
      email: form.email.trim() || "—",
      address: form.address.trim() || "—",
      status: "active",
      totalPurchase: 0,
      outstandingDue: 0,
    };

    onAdd(client);
    setForm(emptyForm);
    onClose();
    toast({ title: "Client added", description: `${client.name} is now in the directory.` });
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Add client details to the directory. Name and phone are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. Rakib Ahmed"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Company
              </label>
              <Input
                placeholder="e.g. Rakib Furnishings"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Phone / WhatsApp <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="+8801711000011"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="client@email.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Address
            </label>
            <Input
              placeholder="e.g. Dhanmondi, Dhaka"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Client</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
