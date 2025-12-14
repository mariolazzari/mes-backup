"use client";
import { useState, useEffect } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableProps } from ".";
import { Pagination } from "./Pagination";
import { Header } from "./Header";

export function DataTable<T>({
  columns,
  data,
  add,
  searchField,
  searchPlaceholder = "Cerca...",
  pageSizeOptions = [5, 10, 25, 50, 100],
  page = 0,
  size = 10,
  total,
  onClick,
  onPageChange,
}: DataTableProps<T>) {
  const [pageIndex, setPageIndex] = useState(page);
  const [pageSize, setPageSize] = useState(size);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Calculate total pages
  const pageCount = Math.ceil((total ?? data.length) / pageSize);

  // Clamp pageIndex if it exceeds pageCount
  useEffect(() => {
    if (pageIndex >= pageCount && pageCount > 0) {
      setPageIndex(pageCount - 1);
    }
  }, [pageCount, pageIndex]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    manualPagination: !!onPageChange,
    onPaginationChange: updater => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      const newPageCount = Math.ceil(
        (total ?? data.length) / newPagination.pageSize
      );
      const newPageIndex = Math.min(
        newPagination.pageIndex,
        Math.max(newPageCount - 1, 0)
      );

      setPageIndex(newPageIndex);
      setPageSize(newPagination.pageSize);

      // Raise event
      onPageChange?.(newPageIndex, newPagination.pageSize);
    },
  });

  return (
    <div className="w-full">
      <Header
        table={table}
        add={add}
        searchField={searchField}
        searchPlaceholder={searchPlaceholder}
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onClick?.(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination table={table} pageSizeOptions={pageSizeOptions} />
      </div>
    </div>
  );
}
