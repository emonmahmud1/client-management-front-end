"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { monthlyFinanceData } from "@/lib/mock-data/dashboard";
import { useAppSelector } from "@/store/hooks";

export function IncomeExpenseChart() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Income vs Expense</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyFinanceData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value ?? 0), symbol)}
            />
            <Bar dataKey="income" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#f97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
