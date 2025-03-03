import { Dispatch, SetStateAction } from "react";

export interface FilterOptionsProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}
