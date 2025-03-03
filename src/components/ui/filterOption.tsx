"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FilterOptionsProps } from "@/types/filterOptionTypes";

export const FilterOption = ({ filter, setFilter }: FilterOptionsProps) => {
  const handleChange = (value: string) => {
    setFilter(value);
  };

  return (
    <Select value={filter} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Last 7 days</SelectItem>
        <SelectItem value="30">Last 30 days</SelectItem>
        <SelectItem value="90">Last 90 days</SelectItem>
      </SelectContent>
    </Select>
  );
};
