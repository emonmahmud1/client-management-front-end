import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { Client } from "@/types/domain";

type ClientProfileSummaryProps = {
  client: Client;
  currencySymbol: "৳" | "$";
};

export function ClientProfileSummary({
  client,
  currencySymbol,
}: ClientProfileSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <p className="font-semibold">{client.name}</p>
          <p className="text-muted-foreground">{client.company}</p>
        </div>
        <div>
          <p>{client.phone}</p>
          <p>{client.email}</p>
        </div>
        <div className="rounded-md bg-muted p-3">
          <p className="text-xs text-muted-foreground">Lifetime Purchase</p>
          <p className="text-lg font-semibold">
            {formatCurrency(client.totalPurchase, currencySymbol)}
          </p>
        </div>
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-xs text-red-600">Current Outstanding Due</p>
          <p className="text-lg font-bold text-red-600">
            {formatCurrency(client.outstandingDue, currencySymbol)}
          </p>
        </div>
        <Badge tone={client.status === "active" ? "success" : "danger"}>
          {client.status === "active" ? "Active" : "Overdue Due"}
        </Badge>
      </CardContent>
    </Card>
  );
}
