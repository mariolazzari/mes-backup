"use client";
import { Um } from "@/types/Um";
import { ColumnDef } from "@tanstack/react-table";
import { UmDialog } from "./UmDialog";
import { ColumnHeader, DataTable } from "../DataTable";
import { UmDataTableProps } from ".";
import { UmDelete } from "./UmDelete";

export const UmDataTable = ({ ums }: UmDataTableProps) => {
  const columns: ColumnDef<Um>[] = [
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <UmDialog um={row.original} />
          <UmDelete um={row.original} />
        </div>
      ),
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
