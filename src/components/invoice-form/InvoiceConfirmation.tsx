import { InvoiceConfirmationSchema } from "@/schema/invoiceSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { FormChildProps } from "@/types/ui/formTypes";
import { StepNavigationButtons } from "./StepNavigation";
import { useStore } from "@/store/invoiceStore";

export const InvoiceConfirmation = ({
  handleNext,
  handleBack,
}: FormChildProps) => {
  const { invoice } = useStore();
  const formSchema = InvoiceConfirmationSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice_no: "",
      invoice_date: invoice.invoice_date || new Date(),
      subtotal_cost: invoice.subtotal_cost || 0,
      cgst_cost: invoice.cgst_cost || 0,
      sgst_cost: invoice.sgst_cost || 0,
      total_cost: invoice.total_cost || 0,
      totalCost_toWords: invoice.totalCost_toWords || "",
      status: invoice.status || false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNext)}>
        <div className="flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="invoice_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Invoice Number" {...field} />
                </FormControl>
                <FormDescription>Enter Invoice Number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoice_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={clsx(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Invoice date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select Invoice Date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subtotal_cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtotal Cost</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={({ target }) =>
                    field.onChange(Number(target.value) || 0)
                  }
                  placeholder="Enter Subtotal Cost"
                />
              </FormControl>
              <FormDescription>Enter Subtotal Cost</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="cgst_cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax - CGST</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={({ target }) =>
                      field.onChange(Number(target.value) || 0)
                    }
                    placeholder="Enter Tax - CGST"
                  />
                </FormControl>
                <FormDescription>Enter Tax - CGST</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sgst_cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax - SGST</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={({ target }) =>
                      field.onChange(Number(target.value) || 0)
                    }
                    placeholder="Enter Tax - SGST"
                  />
                </FormControl>
                <FormDescription>Enter Tax - SGST</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="total_cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={({ target }) =>
                    field.onChange(Number(target.value) || 0)
                  }
                  placeholder="Enter Total Amount"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCost_toWords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount in Words</FormLabel>
              <FormControl>
                <Input placeholder="Enter Total Amount in Words" {...field} />
              </FormControl>
              <FormDescription>Enter Total Amount in Words</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid</FormLabel>
              <FormControl>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormControl>
              <FormDescription>Check to confirm</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <StepNavigationButtons handleBack={handleBack} />
      </form>
    </Form>
  );
};
