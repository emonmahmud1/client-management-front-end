"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { expenseCategoryTotals, monthlyProfitData } from "@/lib/mock-data/expenses-reports";
import { useAppSelector } from "@/store/hooks";

const PIE_COLORS = ["#4f46e5", "#16a34a", "#0ea5e9", "#f97316", "#eab308"];

export function ProfitOverviewChart() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);

  return (
    <section className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Monthly Revenue vs Expense</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyProfitData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0), symbol)} />
              <Legend />
              <Bar dataKey="revenue" fill="#16a34a" />
              <Bar dataKey="expense" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseCategoryTotals}
                dataKey="amount"
                nameKey="category"
                outerRadius={90}
              >
                {expenseCategoryTotals.map((item, index) => (
                  <Cell key={item.category} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0), symbol)} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}
