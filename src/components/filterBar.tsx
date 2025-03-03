import { FilterOption } from "./ui/filterOption";
import { FilterOptionsProps } from "@/types/filterOptionTypes";

export const FilterBar = ({ filter, setFilter }: FilterOptionsProps) => {
  return <FilterOption filter={filter} setFilter={setFilter} />;
};
