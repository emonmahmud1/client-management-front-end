"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePaymentMutation } from "@/store/endpoints/invoices-endpoints";

const paymentSchema = z.object({
  paymentType: z.enum(["full", "partial"]),
  amount: z.number({
    message: "Amount is required and must be a number",
  }).min(1, "Amount must be greater than 0"),
  method: z.enum(["CASH", "BKASH", "BANK"]),
  date: z.string().min(1, "Date is required"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface AddPaymentDialogProps {
  clientId: string;
  clientName: string;
  outstandingDue: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPaymentDialog({
  clientId,
  clientName,
  outstandingDue,
  open,
  onOpenChange,
}: AddPaymentDialogProps) {
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentType: "full",
      amount: outstandingDue,
      method: "CASH",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const paymentType = form.watch("paymentType");

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        paymentType: "full",
        amount: outstandingDue,
        method: "CASH",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [open, outstandingDue, form]);

  // Update amount when payment type changes
  useEffect(() => {
    if (paymentType === "full") {
      form.setValue("amount", outstandingDue);
    }
  }, [paymentType, outstandingDue, form]);

  const onSubmit = async (values: PaymentFormValues) => {
    try {
      await createPayment({
        clientId,
        amount: values.amount,
        method: values.method,
        date: new Date(values.date).toISOString(),
      }).unwrap();

      toast.success("Payment recorded successfully!");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to record payment");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Receive Payment</DialogTitle>
          <DialogDescription>
            Record a new payment for {clientName}. Outstanding: {outstandingDue.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="full" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Full Payment ({(outstandingDue || 0).toLocaleString()})
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="partial" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Partial Payment
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={paymentType === "full"}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CASH">Cash</SelectItem>
                        <SelectItem value="BKASH">bKash</SelectItem>
                        <SelectItem value="BANK">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || outstandingDue <= 0}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Payment
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
