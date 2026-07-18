"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetInvoiceStatusQuery } from "@/store/endpoints/dashboard-endpoints";
import { Loader2 } from "lucide-react";

const COLORS = ["#16a34a", "#eab308", "#dc2626"];

export function InvoiceStatusChart() {
  const { data: invoiceStatusData = [], isLoading, isError } = useGetInvoiceStatusQuery({});

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Invoice Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Invoice Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px] flex items-center justify-center text-red-500">
          Failed to load chart data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Invoice Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={invoiceStatusData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
            >
              {invoiceStatusData.map((item: any, index: number) => (
                <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
