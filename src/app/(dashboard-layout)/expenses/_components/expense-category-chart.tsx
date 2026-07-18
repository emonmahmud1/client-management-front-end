"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import { useGetExpenseCategoriesQuery } from "@/store/endpoints/dashboard-endpoints";
import { Loader2 } from "lucide-react";

const COLORS = ["#4f46e5", "#16a34a", "#0ea5e9", "#f97316", "#eab308"];

export function ExpenseCategoryChart() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const { data: expenseCategoryTotals = [], isLoading, isError } = useGetExpenseCategoriesQuery({});

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-red-500">
          Failed to load chart data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Expense by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={expenseCategoryTotals} dataKey="amount" nameKey="category" outerRadius={100}>
              {expenseCategoryTotals.map((item: any, index: number) => (
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
