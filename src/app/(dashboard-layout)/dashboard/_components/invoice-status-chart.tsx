"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { invoiceStatusData } from "@/lib/mock-data/dashboard";

const COLORS = ["#16a34a", "#eab308", "#dc2626"];

export function InvoiceStatusChart() {
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
              {invoiceStatusData.map((item, index) => (
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
