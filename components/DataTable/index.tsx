import { ColumnDef, Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
} & Partial<HeaderProps<T>>;

export type HeaderProps<T> = {
  table: Table<T>;
  add: ReactNode;
} & Partial<{
  searchField?: keyof T;
  searchPlaceholder?: string;
  onClick: (row: T) => void;
}>;

export * from "./ColumnHeader";
export * from "./DataTable";
