"use client";

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

type NewClientForm = {
  name: string;
  phone: string;
  email: string;
};

type CreateClientModalProps = {
  open: boolean;
  form: NewClientForm;
  onClose: () => void;
  onChange: (field: keyof NewClientForm, value: string) => void;
  onCreate: () => void;
};

export function CreateClientModal({
  open,
  form,
  onClose,
  onChange,
  onCreate,
}: CreateClientModalProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Client</DialogTitle>
          <DialogDescription>
            Add client details now and select instantly for this invoice.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <Input
            placeholder="Client name"
            value={form.name}
            onChange={(event) => onChange("name", event.target.value)}
          />
          <Input
            placeholder="Phone / WhatsApp"
            value={form.phone}
            onChange={(event) => onChange("phone", event.target.value)}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(event) => onChange("email", event.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onCreate}>Create Client</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
