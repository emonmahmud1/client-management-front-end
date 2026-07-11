import {
  BarChart3,
  Receipt,
  UsersRound,
  WalletCards,
  FileText,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/clients", label: "Clients", icon: UsersRound },
  { href: "/invoices/new", label: "Invoices", icon: Receipt },
  { href: "/expenses", label: "Expenses", icon: WalletCards },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];
