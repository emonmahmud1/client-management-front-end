export type InvoiceStatus = "paid" | "due" | "overdue";

export type DashboardKpi = {
  label: string;
  value: number;
  trendLabel: string;
  tone?: "default" | "danger";
};

export type MonthlyFinance = {
  month: string;
  income: number;
  expense: number;
};

export type InvoiceStatusBreakdown = {
  name: "Paid" | "Due" | "Overdue";
  value: number;
};

export type ActivityInvoice = {
  id: string;
  clientName: string;
  amount: number;
  dueDate: string;
};

export type Client = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  status: "active" | "overdue";
  totalPurchase: number;
  outstandingDue: number;
};

export type ClientPayment = {
  id: string;
  date: string;
  method: "Cash" | "bKash" | "Bank";
  amount: number;
};

export type ClientInvoiceHistory = {
  id: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
};

export type ExpenseCategory =
  | "Marketing"
  | "Operations"
  | "Logistics"
  | "Salary"
  | "Utilities";

export type ExpenseRecord = {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paymentMethod: "Cash" | "bKash" | "Bank";
  status: "paid" | "pending";
};

export type ExpenseCategoryTotal = {
  category: ExpenseCategory;
  amount: number;
};

export type MonthlyProfitPoint = {
  month: string;
  revenue: number;
  expense: number;
  profit: number;
};
