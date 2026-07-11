"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { expenseCategoryTotals } from "@/lib/mock-data/expenses-reports";
import { formatCurrency } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";

const COLORS = ["#4f46e5", "#16a34a", "#0ea5e9", "#f97316", "#eab308"];

export function ExpenseCategoryChart() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Expense by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={expenseCategoryTotals} dataKey="amount" nameKey="category" outerRadius={100}>
              {expenseCategoryTotals.map((item, index) => (
                <Cell key={item.category} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0), symbol)} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
