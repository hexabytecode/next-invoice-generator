import { TransportDetailsSchema } from "@/schema/invoiceSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { FormChildProps } from "@/types/ui/formTypes";

export const TransportDetails = ({
  handleNext,
  handleBack,
}: FormChildProps) => {
  const formSchema = TransportDetailsSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transport_name: "",
      transport_gst: "",
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
        <div>
          <Button type="submit">Next</Button>
          <Button type="button" onClick={handleBack}>
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};
