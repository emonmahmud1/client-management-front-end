"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import { useGetKpisQuery } from "@/store/endpoints/dashboard-endpoints";
import { Loader2 } from "lucide-react";

export function KpiCards() {
  const symbol = useAppSelector((state) => state.app.currencySymbol);
  const { data: dashboardKpis = [], isLoading, isError } = useGetKpisQuery({});

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load KPIs</div>;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardKpis.map((kpi: any) => (
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
