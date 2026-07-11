"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

function Sheet(props: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />;
}

function SheetTrigger(props: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof DialogClose>) {
  return <DialogClose {...props} />;
}

function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogContent> & VariantProps<typeof sheetVariants>) {
  return (
    <DialogContent
      className={cn(sheetVariants({ side }), "w-full max-w-none translate-x-0 translate-y-0 left-auto top-auto", className)}
      {...props}
    >
      {children}
    </DialogContent>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)} {...props} />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  );
}

function SheetTitle(props: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle {...props} />;
}

function SheetDescription(props: React.ComponentProps<typeof DialogDescription>) {
  return <DialogDescription {...props} />;
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
