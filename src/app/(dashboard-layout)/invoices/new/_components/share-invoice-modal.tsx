"use client";

import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

type ShareInvoiceModalProps = {
  open: boolean;
  clientPhone: string;
  clientEmail: string;
  clientName: string;
  invoiceId: string;
  onClose: () => void;
};

export function ShareInvoiceModal({
  open,
  clientPhone,
  clientEmail,
  clientName,
  invoiceId,
  onClose,
}: ShareInvoiceModalProps) {
  const waMessage = encodeURIComponent(
    `Hello ${clientName}! Your invoice (${invoiceId}) is ready. Please review and confirm payment timeline.`,
  );
  const whatsappUrl = `https://wa.me/${clientPhone.replaceAll("+", "")}?text=${waMessage}`;

  const mailSubject = encodeURIComponent(`Invoice ${invoiceId} from Plaxora Admin Hub`);
  const mailBody = encodeURIComponent(
    `Dear ${clientName},\n\nPlease find your invoice details below.\n\nInvoice ID: ${invoiceId}\n\nKindly review and confirm the payment timeline at your earliest convenience.\n\nThank you,\nPlaxora Admin Hub`,
  );
  const mailtoUrl = `mailto:${clientEmail}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invoice Saved Successfully</DialogTitle>
          <DialogDescription>
            Share invoice <span className="font-medium text-foreground">{invoiceId}</span> with{" "}
            {clientName} via email or WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            asChild
          >
            <a href={mailtoUrl}>
              <Mail className="size-4" />
              Send via Mail
            </a>
          </Button>
          <Button
            type="button"
            onClick={() => {
              window.open(whatsappUrl, "_blank", "noopener,noreferrer");
              toast({
                title: "WhatsApp opened",
                description: `Invoice ${invoiceId} is ready to share with ${clientName}.`,
              });
            }}
          >
            <MessageCircle className="size-4" />
            Share via WhatsApp
          </Button>
        </div>
        <DialogFooter>
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
