"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import { useGetMonthlyFinanceQuery } from "@/store/endpoints/dashboard-endpoints";
import { Loader2 } from "lucide-react";

export function IncomeExpenseChart() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const { data: monthlyData = [], isLoading } = useGetMonthlyFinanceQuery({});

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Income vs Expense</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
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
        )}
      </CardContent>
    </Card>
  );
}
