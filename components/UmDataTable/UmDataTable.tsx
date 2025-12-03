"use client";
import { Um } from "@/types/Um";
import { ColumnDef } from "@tanstack/react-table";
import { UmDialog } from "./UmDialog";
import { DataTable } from "../DataTable";
import { UmDataTableProps } from ".";

export const UmDataTable = ({ ums }: UmDataTableProps) => {
  const columns: ColumnDef<Um>[] = [
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => <UmDialog um={row.original} />,
    },
    {
      accessorKey: "cod",
      header: "Codice",
    },
    {
      accessorKey: "descrizione",
      header: "Descrizione",
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={ums} />;
    </div>
  );
};
