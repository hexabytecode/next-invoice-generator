import { ItemsType } from "@/types/invoiceTypes";

export const serializeItems = (items: ItemsType[]) => {
  return items.map((item, index) => ({
    ...item,
    item_no: index + 1,
  }));
};
