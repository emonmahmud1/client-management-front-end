"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetRecentClientsQuery } from "@/store/endpoints/dashboard-endpoints";
import { Loader2 } from "lucide-react";

export function NewWhatsappClients() {
  const { data: recentClients = [], isLoading } = useGetRecentClientsQuery({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newly Added Clients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : recentClients.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
            No recent clients
          </div>
        ) : (
          recentClients.map((client: any) => (
            <div key={client.id} className="rounded-md border border-border p-3">
              <div className="flex justify-between">
                <p className="text-sm font-semibold">{client.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(client.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{client.phone}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
