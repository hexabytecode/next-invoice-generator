import { ItemDetailsSchema } from "@/schema/invoiceSchema";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Button } from "../ui/button";
import { FormChildProps } from "@/types/ui/formTypes";
import { StepNavigationButtons } from "./StepNavigation";
import { useStore } from "@/store/invoiceStore";

export const ItemDetails = ({ handleNext, handleBack }: FormChildProps) => {
  const { invoice } = useStore();
  const formSchema = ItemDetailsSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: invoice.items?.length
        ? invoice.items
        : [
            {
              item_name: "Item 1",
              item_hsn: 1234,
              item_qty: 1,
              item_unitWeight: 1,
              item_unitRate: 1,
              item_cost: 1,
            },
          ],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNext)}>
        {fields.map((item, index) => (
          <div key={item.id}>
            <div className="flex gap-4 justify-between">
              <FormItem>
                <FormLabel>Item No</FormLabel>
                <FormControl>
                  <Input disabled value={index + 1} />
                </FormControl>
                <FormDescription>Enter Item No</FormDescription>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name={`items.${index}.item_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Item Name" {...field} />
                    </FormControl>
                    <FormDescription>Enter Item Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.item_hsn`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item HSN</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Item HSN" {...field} />
                    </FormControl>
                    <FormDescription>Enter Item HSN</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 justify-between">
              <FormField
                control={form.control}
                name={`items.${index}.item_qty`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Item Quantity" {...field} />
                    </FormControl>
                    <FormDescription>Enter Item Quantity</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.item_unitWeight`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Unit Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Item Unit Weight" {...field} />
                    </FormControl>
                    <FormDescription>Enter Item Unit Weight</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.item_unitRate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Unit Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Item Unit Rate" {...field} />
                    </FormControl>
                    <FormDescription>Enter Item Unit Rate</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`items.${index}.item_cost`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Cost</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Item Cost" {...field} />
                  </FormControl>
                  <FormDescription>Enter Item Cost</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.length > 1 && index == fields.length - 1 && (
              <Button type="button" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            append({
              item_name: "Item " + (fields.length + 1),
              item_hsn: 1234,
              item_qty: 1,
              item_unitWeight: 1,
              item_unitRate: 1,
              item_cost: 1,
            })
          }
        >
          Add Item
        </Button>

        <StepNavigationButtons handleBack={handleBack} />
      </form>
    </Form>
  );
};
