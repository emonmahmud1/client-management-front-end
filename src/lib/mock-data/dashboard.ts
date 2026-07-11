import {
  ActivityInvoice,
  Client,
  DashboardKpi,
  InvoiceStatusBreakdown,
  MonthlyFinance,
} from "@/types/domain";

export const dashboardKpis: DashboardKpi[] = [
  { label: "Total Revenue", value: 1265000, trendLabel: "+8.2% this month" },
  {
    label: "Total Receivable",
    value: 342000,
    trendLabel: "Needs collection follow-up",
    tone: "danger",
  },
  { label: "This Month Inflow", value: 285000, trendLabel: "+5 invoices paid" },
  { label: "This Month Expense", value: 97000, trendLabel: "Ad + operations" },
];

export const monthlyFinanceData: MonthlyFinance[] = [
  { month: "Jan", income: 180000, expense: 60000 },
  { month: "Feb", income: 210000, expense: 65000 },
  { month: "Mar", income: 225000, expense: 72000 },
  { month: "Apr", income: 190000, expense: 68000 },
  { month: "May", income: 255000, expense: 81000 },
  { month: "Jun", income: 285000, expense: 97000 },
];

export const invoiceStatusData: InvoiceStatusBreakdown[] = [
  { name: "Paid", value: 62 },
  { name: "Due", value: 24 },
  { name: "Overdue", value: 14 },
];

export const overdueInvoices: ActivityInvoice[] = [
  { id: "INV-1101", clientName: "Nexa Home", amount: 24500, dueDate: "2026-07-01" },
  { id: "INV-1102", clientName: "Apon Traders", amount: 18000, dueDate: "2026-07-03" },
  { id: "INV-1105", clientName: "Urban Cart", amount: 36000, dueDate: "2026-07-04" },
];

export const newWhatsappClients: Pick<Client, "id" | "name" | "phone" | "email">[] =
  [
    {
      id: "c-9",
      name: "Tanvir Hasan",
      phone: "+8801712345678",
      email: "tanvir@sample.com",
    },
    {
      id: "c-10",
      name: "Sadia Akter",
      phone: "+8801811122233",
      email: "sadia@sample.com",
    },
  ];
