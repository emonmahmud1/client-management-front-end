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
import { toast } from "sonner";
import { useCreateClientMutation } from "@/store/endpoints/clients-endpoints";

type AddClientDialogProps = {
  open: boolean;
  onClose: () => void;
};

const emptyForm = () => ({
  name: "",
  company: "",
  phone: "",
  email: "",
  address: "",
});

export function AddClientDialog({ open, onClose }: AddClientDialogProps) {
  const [form, setForm] = useState(emptyForm);
  const [createClient, { isLoading }] = useCreateClientMutation();

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAdd = async () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    if (!form.phone.trim()) { toast.error("Phone is required"); return; }
    if (!form.email.trim()) { toast.error("Email is required"); return; }
    if (!form.address.trim()) { toast.error("Address is required"); return; }

    try {
      await createClient({
        name: form.name.trim(),
        company: form.company.trim() || "—",
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
      }).unwrap();
      toast.success(`${form.name} added to directory`);
      setForm(emptyForm);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add client");
    }
  };

  const handleClose = () => { setForm(emptyForm); onClose(); };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Name, phone, email and address are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input placeholder="e.g. Rakib Ahmed" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Company</label>
              <Input placeholder="e.g. Rakib Furnishings" value={form.company} onChange={(e) => set("company", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Phone / WhatsApp <span className="text-destructive">*</span>
              </label>
              <Input placeholder="+8801711000011" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <Input type="email" placeholder="client@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Address <span className="text-destructive">*</span>
            </label>
            <Input placeholder="e.g. Dhanmondi, Dhaka" value={form.address} onChange={(e) => set("address", e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleAdd} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Client"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
