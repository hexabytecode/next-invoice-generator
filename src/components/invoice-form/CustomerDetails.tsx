import { CustomerDetailsSchema } from "@/schema/invoiceSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/store/invoiceStore";
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

export const CustomerDetails = () => {
  const formSchema = CustomerDetailsSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyer_name: "",
      buyer_homeAddress: "",
      buyer_workAddress: "",
      buyer_gst: "",
      buyer_contact: 0,
    },
  });

  const { invoice, setInvoice } = useStore();

  const handleNext = (values: z.infer<typeof formSchema>) => {
    setInvoice(values);
    console.log("form values: ", values);
    console.log("invoice values: ", invoice);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNext)}>
        <FormField
          control={form.control}
          name="buyer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Buyer Name" {...field} />
              </FormControl>
              <FormDescription>Enter Buyer Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buyer_homeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer Home Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter Buyer Home Address" {...field} />
              </FormControl>
              <FormDescription>Enter Buyer Home Address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buyer_workAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer Work Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter Buyer Work Address" {...field} />
              </FormControl>
              <FormDescription>Enter Buyer Work Address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buyer_gst"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer GST</FormLabel>
              <FormControl>
                <Input placeholder="Enter Buyer GST" {...field} />
              </FormControl>
              <FormDescription>Enter Buyer GST</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buyer_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="Enter Buyer Contact" {...field} />
              </FormControl>
              <FormDescription>Enter Buyer Contact</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};
