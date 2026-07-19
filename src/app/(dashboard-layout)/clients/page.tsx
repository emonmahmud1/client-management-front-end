"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { AddClientDialog } from "@/app/(dashboard-layout)/clients/_components/add-client-dialog";
import { ClientsDirectoryTable } from "@/app/(dashboard-layout)/clients/_components/clients-directory-table";
import { Button } from "@/components/ui/button";
import { useGetClientsQuery, useUpdateClientMutation } from "@/store/endpoints/clients-endpoints";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ClientsPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { data: clients = [], isLoading } = useGetClientsQuery({});
  const [updateClient] = useUpdateClientMutation();

  const handleStatusToggle = async (id: string) => {
    const client = clients.find((c: any) => c.id === id);
    if (!client) return;
    const newStatus = client.status === "ACTIVE" ? "OVERDUE" : "ACTIVE";
    try {
      await updateClient({ id, status: newStatus }).unwrap();
      toast.success("Client status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

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

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <ClientsDirectoryTable clients={clients} onStatusToggle={handleStatusToggle} />
      )}

      <AddClientDialog open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
};

export default ClientsPage;

