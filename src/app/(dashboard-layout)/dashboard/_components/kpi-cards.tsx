"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { dashboardKpis } from "@/lib/mock-data/dashboard";
import { useAppSelector } from "@/store/hooks";

export function KpiCards() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardKpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader>
            <CardDescription>{kpi.label}</CardDescription>
            <CardTitle
              className={kpi.tone === "danger" ? "text-2xl font-bold text-red-600" : "text-2xl"}
            >
              {formatCurrency(kpi.value, symbol)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{kpi.trendLabel}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
