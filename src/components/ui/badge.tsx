import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  tone?: "default" | "success" | "danger";
};

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "default" && "bg-muted text-muted-foreground",
        tone === "success" && "bg-emerald-100 text-emerald-700",
        tone === "danger" && "bg-red-100 text-red-700",
        className,
      )}
      {...props}
    />
  );
}
