import { ClientsDirectoryTable } from "@/app/(dashboard-layout)/clients/_components/clients-directory-table";
import { clients } from "@/lib/mock-data/clients";

const ClientsPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Client Management</h1>
        <p className="text-sm text-muted-foreground">
          Directory view with sorting, filtering, and status visibility.
        </p>
      </div>

      <ClientsDirectoryTable clients={clients} />
    </div>
  );
};

export default ClientsPage;
