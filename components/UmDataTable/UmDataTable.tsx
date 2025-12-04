"use client";
import { Um } from "@/types/Um";
import { ColumnDef } from "@tanstack/react-table";
import { UmDialog } from "./UmDialog";
import { ColumnHeader, DataTable } from "../DataTable";
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
      header: ({ column }) => <ColumnHeader column={column} title="Codice" />,
    },
    {
      accessorKey: "descrizione",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Descrizione" />
      ),
    },
  ];

  return <DataTable columns={columns} data={ums} add={<UmDialog />} />;
};
