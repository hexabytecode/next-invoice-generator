import { CustomerDetailsSchema } from "@/schema/invoiceSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepNavigationButtons } from "./StepNavigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { FormChildProps } from "@/types/ui/formTypes";

export const CustomerDetails = ({ handleNext, handleBack }: FormChildProps) => {
  const formSchema = CustomerDetailsSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyer_name: "",
      buyer_homeAddress: "",
      buyer_workAddress: "",
      buyer_gst: "",
      buyer_contact: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          handleNext<z.infer<typeof formSchema>>(data)
        )}
      >
        <FormField
          control={form.control}
          name="buyer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer Name</FormLabel>
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
                <Textarea placeholder="Enter Buyer Home Address" {...field} />
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
                <Textarea placeholder="Enter Buyer Work Address" {...field} />
              </FormControl>
              <FormDescription>Enter Buyer Work Address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="buyer_gst"
            render={({ field }) => (
              <FormItem className="w-1/2">
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
              <FormItem className="w-1/2">
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Buyer Contact" {...field} />
                </FormControl>
                <FormDescription>Enter Buyer Contact</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <StepNavigationButtons handleBack={handleBack} />
      </form>
    </Form>
  );
};
