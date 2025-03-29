import { TransportDetailsSchema } from "@/schema/invoiceSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { FormChildProps } from "@/types/ui/formTypes";
import { StepNavigationButtons } from "./StepNavigation";
import { useStore } from "@/store/invoiceStore";

export const TransportDetails = ({
  handleNext,
  handleBack,
}: FormChildProps) => {
  const { invoice } = useStore();
  const formSchema = TransportDetailsSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transport_name: invoice.transport_name || "",
      transport_gst: invoice.transport_gst || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNext)}>
        <FormField
          control={form.control}
          name="transport_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Transport Name" {...field} />
              </FormControl>
              <FormDescription>Enter Transport Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transport_gst"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport GST</FormLabel>
              <FormControl>
                <Input placeholder="Enter Transport GST" {...field} />
              </FormControl>
              <FormDescription>Enter Transport GST</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepNavigationButtons handleBack={handleBack} />
      </form>
    </Form>
  );
};
