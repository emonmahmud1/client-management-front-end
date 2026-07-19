"use client";

import { useRef, useState } from "react";
import { Download, Mail, MessageCircle, FileText } from "lucide-react";
import { toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/format";

type InvoicePreviewDialogProps = {
  invoice: any;
  client: any;
  currencySymbol: "৳" | "$";
};

export function InvoicePreviewDialog({ invoice, client, currencySymbol }: InvoicePreviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const totalAmount = (invoice.items || []).reduce(
    (sum: number, item: any) => sum + item.quantity * item.price,
    0
  );

  const handleDownload = async () => {
    if (!invoiceRef.current) return;
    setIsGenerating(true);
    try {
      const element = invoiceRef.current;
      
      const dataUrl = await toJpeg(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "a4"
      });

      const pdfWidth = 8.27; // A4 width in inches
      const margin = 0.5;
      const contentWidth = pdfWidth - (margin * 2);

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

      pdf.addImage(dataUrl, "JPEG", margin, margin, contentWidth, imgHeight);
      pdf.save(`Invoice_${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.invoiceNumber} from Plaxora`);
    const body = encodeURIComponent(
      `Hello ${client.name},\n\nPlease find attached the invoice ${invoice.invoiceNumber} for the amount of ${formatCurrency(totalAmount, currencySymbol)}.\n\nThank you for your business!`
    );
    window.location.href = `mailto:${client.email}?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${client.name},\n\nThis is a friendly message regarding Invoice ${invoice.invoiceNumber} for ${formatCurrency(totalAmount, currencySymbol)}.\n\nPlease find the attached PDF.`
    );
    window.open(`https://wa.me/${client.phone?.replaceAll("+", "")}?text=${text}`, "_blank");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="View & Download Invoice">
          <FileText className="size-4 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Invoice Preview</DialogTitle>
          <div className="flex items-center gap-2 pr-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsApp}
              title="Send WhatsApp message"
            >
              <MessageCircle className="size-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={handleEmail} title="Open Mail client">
              <Mail className="size-4 mr-2" />
              Email
            </Button>
            <Button onClick={handleDownload} size="sm" disabled={isGenerating}>
              <Download className="size-4 mr-2" />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </DialogHeader>

        {/* Invoice Printable Area */}
        <div className="bg-white text-black rounded-lg shadow-sm overflow-x-auto relative">
          <div ref={invoiceRef} className="relative z-10 p-8 min-w-[800px]">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-0">
              <span
                className={`text-9xl font-black uppercase rotate-[-45deg] tracking-widest ${
                  invoice.status === "PAID"
                    ? "text-green-600"
                    : invoice.status === "OVERDUE"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {invoice.status}
              </span>
            </div>
            {/* Header */}
            <div className="flex justify-between items-start border-b pb-6 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">PLAXORA</h1>
                <p className="text-sm text-gray-500 mt-1">Software Solutions & Services</p>
                <div className="text-sm text-gray-600 mt-4">
                  <p>123 Tech Valley</p>
                  <p>Dhaka, Bangladesh</p>
                  <p>contact@plaxora.com</p>
                  <p>+880 1234 567890</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-light text-gray-400 mb-2">INVOICE</h2>
                <p className="font-medium text-gray-800">#{invoice.invoiceNumber}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">Issue Date:</span>{" "}
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </p>
                {invoice.dueDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Due Date:</span>{" "}
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Client Info */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Billed To
              </h3>
              <p className="text-lg font-medium text-gray-800">{client.name}</p>
              {client.company && <p className="text-gray-600">{client.company}</p>}
              <p className="text-sm text-gray-600 mt-1">{client.address}</p>
              <p className="text-sm text-gray-600">{client.phone}</p>
              <p className="text-sm text-gray-600">{client.email}</p>
            </div>

            {/* Items Table */}
            <table className="w-full text-left mb-8">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="py-3 text-sm font-semibold text-gray-700 text-right">Quantity</th>
                  <th className="py-3 text-sm font-semibold text-gray-700 text-right">Unit Price</th>
                  <th className="py-3 text-sm font-semibold text-gray-700 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items?.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-800">{item.name}</td>
                    <td className="py-3 text-gray-800 text-right">{item.quantity}</td>
                    <td className="py-3 text-gray-800 text-right">
                      {formatCurrency(item.price, currencySymbol)}
                    </td>
                    <td className="py-3 text-gray-800 text-right font-medium">
                      {formatCurrency(item.quantity * item.price, currencySymbol)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-1/2">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Subtotal:</span>
                  <span className="text-gray-800 font-medium">
                    {formatCurrency(totalAmount, currencySymbol)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Tax/VAT:</span>
                  <span className="text-gray-800 font-medium">{formatCurrency(0, currencySymbol)}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xl font-bold text-gray-800">Total Due:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(
                      invoice.status === "PAID" ? 0 : totalAmount,
                      currencySymbol
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Thank you for your business. Please remit payment at your earliest convenience.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
