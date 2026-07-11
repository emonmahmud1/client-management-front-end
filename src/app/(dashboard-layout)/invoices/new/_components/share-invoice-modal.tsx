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
import { toast } from "@/hooks/use-toast";

type ShareInvoiceModalProps = {
  open: boolean;
  clientPhone: string;
  invoiceId: string;
  onClose: () => void;
};

export function ShareInvoiceModal({
  open,
  clientPhone,
  invoiceId,
  onClose,
}: ShareInvoiceModalProps) {
  const message = encodeURIComponent(
    `Hello! Your invoice (${invoiceId}) is ready. Please review and confirm payment timeline.`,
  );
  const whatsappUrl = `https://wa.me/${clientPhone.replaceAll("+", "")}?text=${message}`;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invoice Saved Successfully</DialogTitle>
          <DialogDescription>
            You can share the invoice now via email or WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                toast({
                  title: "Email queued",
                  description: "SMTP integration will send this invoice email after backend connection.",
                })
              }
            >
              Send via Mail
            </Button>
            <Button
              type="button"
              onClick={() => {
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                toast({
                  title: "WhatsApp opened",
                  description: `Invoice ${invoiceId} is ready to share with the client.`,
                });
              }}
            >
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
