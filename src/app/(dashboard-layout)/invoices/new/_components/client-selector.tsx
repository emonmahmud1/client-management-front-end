"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client } from "@/types/domain";
import { cn } from "@/lib/utils";

type ClientSelectorProps = {
  clients: Client[];
  selectedClientId: string;
  onSelect: (clientId: string) => void;
  onCreateNew: () => void;
};

export function ClientSelector({
  clients,
  selectedClientId,
  onSelect,
  onCreateNew,
}: ClientSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedClient = clients.find((client) => client.id === selectedClientId);
  const filteredClients = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((client) =>
      `${client.name} ${client.phone} ${client.company}`.toLowerCase().includes(q),
    );
  }, [clients, query]);

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className="w-full justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedClient ? `${selectedClient.name} · ${selectedClient.phone}` : "Select client"}
        <ChevronDown className="size-4 opacity-60" />
      </Button>

      <div
        className={cn(
          "absolute z-20 mt-2 w-full rounded-md border border-border bg-background p-3 shadow-md",
          !open && "hidden",
        )}
      >
        <Input
          placeholder="Search name, phone, company..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mb-2"
        />
        <div className="max-h-44 space-y-1 overflow-y-auto">
          {filteredClients.map((client) => (
            <button
              key={client.id}
              type="button"
              className="w-full rounded-md px-2 py-2 text-left text-sm hover:bg-accent"
              onClick={() => {
                onSelect(client.id);
                setOpen(false);
              }}
            >
              <p className="font-medium">{client.name}</p>
              <p className="text-xs text-muted-foreground">{client.phone}</p>
            </button>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          className="mt-2 w-full justify-start"
          onClick={() => {
            onCreateNew();
            setOpen(false);
          }}
        >
          + Create New Client
        </Button>
      </div>
    </div>
  );
}
