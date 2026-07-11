import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newWhatsappClients } from "@/lib/mock-data/dashboard";

export function NewWhatsappClients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newly Added Clients from WhatsApp</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {newWhatsappClients.map((client) => (
          <div key={client.id} className="rounded-md border border-border p-3">
            <p className="text-sm font-semibold">{client.name}</p>
            <p className="text-xs text-muted-foreground">{client.phone}</p>
            <p className="text-xs text-muted-foreground">{client.email}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
