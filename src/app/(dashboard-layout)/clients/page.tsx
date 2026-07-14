"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { AddClientDialog } from "@/app/(dashboard-layout)/clients/_components/add-client-dialog";
import { ClientsDirectoryTable } from "@/app/(dashboard-layout)/clients/_components/clients-directory-table";
import { Button } from "@/components/ui/button";
import { clients as initialClients } from "@/lib/mock-data/clients";
import { Client } from "@/types/domain";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Client Management</h1>
          <p className="text-sm text-muted-foreground">
            Directory view with sorting, filtering, and status visibility.
          </p>
        </div>
        <Button onClick={() => setOpenAdd(true)} className="shrink-0 sm:self-start">
          <UserPlus className="size-4" />
          Add Client
        </Button>
      </div>

      <ClientsDirectoryTable
        clients={clients}
        onStatusToggle={(id) =>
          setClients((prev) =>
            prev.map((c) =>
              c.id === id
                ? { ...c, status: c.status === "active" ? "overdue" : "active" }
                : c,
            ),
          )
        }
      />

      <AddClientDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={(client) => setClients((prev) => [client, ...prev])}
      />
    </div>
  );
};

export default ClientsPage;
