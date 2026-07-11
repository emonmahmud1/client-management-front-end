import {
  ExpenseCategoryTotal,
  ExpenseRecord,
  MonthlyProfitPoint,
} from "@/types/domain";

export const expenseSummary = {
  thisMonth: 97000,
  pending: 14500,
  averageWeekly: 24250,
};

export const expenses: ExpenseRecord[] = [
  {
    id: "EXP-301",
    title: "Meta Ads Boost",
    category: "Marketing",
    amount: 18000,
    date: "2026-07-02",
    paymentMethod: "Bank",
    status: "paid",
  },
  {
    id: "EXP-302",
    title: "Warehouse Rent",
    category: "Operations",
    amount: 25000,
    date: "2026-07-03",
    paymentMethod: "Bank",
    status: "paid",
  },
  {
    id: "EXP-303",
    title: "Courier Delivery Batch",
    category: "Logistics",
    amount: 12500,
    date: "2026-07-05",
    paymentMethod: "bKash",
    status: "pending",
  },
  {
    id: "EXP-304",
    title: "Support Team Salary",
    category: "Salary",
    amount: 31000,
    date: "2026-07-07",
    paymentMethod: "Bank",
    status: "paid",
  },
  {
    id: "EXP-305",
    title: "Electricity + Internet",
    category: "Utilities",
    amount: 10500,
    date: "2026-07-08",
    paymentMethod: "Cash",
    status: "paid",
  },
];

export const expenseCategoryTotals: ExpenseCategoryTotal[] = [
  { category: "Marketing", amount: 18000 },
  { category: "Operations", amount: 25000 },
  { category: "Logistics", amount: 12500 },
  { category: "Salary", amount: 31000 },
  { category: "Utilities", amount: 10500 },
];

export const monthlyProfitData: MonthlyProfitPoint[] = [
  { month: "Jan", revenue: 180000, expense: 60000, profit: 120000 },
  { month: "Feb", revenue: 210000, expense: 65000, profit: 145000 },
  { month: "Mar", revenue: 225000, expense: 72000, profit: 153000 },
  { month: "Apr", revenue: 190000, expense: 68000, profit: 122000 },
  { month: "May", revenue: 255000, expense: 81000, profit: 174000 },
  { month: "Jun", revenue: 285000, expense: 97000, profit: 188000 },
];
