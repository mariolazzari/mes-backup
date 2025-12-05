import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
} & Partial<{
  add: ReactNode;
  searchField: keyof T;
  searchPlaceholder: string;
}>;

export * from "./ColumnHeader";
export * from "./DataTable";
