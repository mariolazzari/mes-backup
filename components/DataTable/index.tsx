import { ColumnDef, Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
} & Partial<HeaderProps<T>>;

export type OnPageChange = (page: number, size: number) => void;

export type HeaderProps<T> = {
  table: Table<T>;
} & Partial<{
  add: ReactNode;
  searchField: keyof T;
  searchPlaceholder: string;
  pageSizeOptions: number[];
  onClick: (row: T) => void;
  onPageChange: OnPageChange;
  page: number;
  size: number;
  total: number;
}>;

export type PaginationProps<TData> = {
  table: Table<TData>;
  pageSizeOptions: number[];
};

export * from "./ColumnHeader";
export * from "./DataTable";
