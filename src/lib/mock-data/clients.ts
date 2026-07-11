import { Client, ClientInvoiceHistory, ClientPayment } from "@/types/domain";

export const clients: Client[] = [
  {
    id: "c-1",
    name: "Rakib Ahmed",
    company: "Rakib Furnishings",
    phone: "+8801711000011",
    email: "rakib@furnishings.com",
    address: "Dhanmondi, Dhaka",
    status: "active",
    totalPurchase: 380000,
    outstandingDue: 42000,
  },
  {
    id: "c-2",
    name: "Jannat Islam",
    company: "Jannat Fashion Hub",
    phone: "+8801911223344",
    email: "jannat@fashionhub.com",
    address: "Mirpur, Dhaka",
    status: "overdue",
    totalPurchase: 520000,
    outstandingDue: 98000,
  },
  {
    id: "c-3",
    name: "Masud Karim",
    company: "Karim Electronics",
    phone: "+8801811554433",
    email: "masud@karimelectronics.com",
    address: "Uttara, Dhaka",
    status: "active",
    totalPurchase: 295000,
    outstandingDue: 15000,
  },
];

export const clientInvoicesById: Record<string, ClientInvoiceHistory[]> = {
  "c-1": [
    { id: "INV-1001", date: "2026-06-02", amount: 24000, status: "paid" },
    { id: "INV-1031", date: "2026-06-28", amount: 18000, status: "due" },
  ],
  "c-2": [
    { id: "INV-1090", date: "2026-06-19", amount: 52000, status: "overdue" },
    { id: "INV-1102", date: "2026-07-02", amount: 46000, status: "due" },
  ],
  "c-3": [{ id: "INV-1084", date: "2026-06-14", amount: 15000, status: "paid" }],
};

export const clientPaymentsById: Record<string, ClientPayment[]> = {
  "c-1": [
    { id: "p-1", date: "2026-06-06", method: "Cash", amount: 10000 },
    { id: "p-2", date: "2026-06-16", method: "bKash", amount: 12000 },
  ],
  "c-2": [{ id: "p-3", date: "2026-06-21", method: "Bank", amount: 14000 }],
  "c-3": [{ id: "p-4", date: "2026-06-15", method: "Cash", amount: 15000 }],
};

export const clientNotesById: Record<string, string> = {
  "c-1":
    "12 May: WhatsApp call completed. Client promised due clearance by 20 May.",
  "c-2":
    "28 Jun: Requested split payment plan in 2 parts. Follow up every Friday.",
  "c-3": "Reliable payer. Keep priority support for urgent orders.",
};
