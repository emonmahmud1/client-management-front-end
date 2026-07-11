import { cn } from "@/lib/utils";

type DivProps = React.ComponentProps<"div">;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card text-card-foreground", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("p-4 pb-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }: DivProps) {
  return <h3 className={cn("text-sm font-semibold", className)} {...props} />;
}

export function CardDescription({ className, ...props }: DivProps) {
  return <p className={cn("text-xs text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn("p-4 pt-2", className)} {...props} />;
}
