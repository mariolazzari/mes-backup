"use client";
import { Um } from "@/types/Um";
import { ColumnDef } from "@tanstack/react-table";
import { UmForm } from "./UmForm";
import { ColumnHeader, DataTable } from "../DataTable";
import { UmTableProps } from ".";
import { UmDelete } from "./UmDelete";

export const UmTable = ({ ums }: UmTableProps) => {
  const columns: ColumnDef<Um>[] = [
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const { original } = row;

        return (
          <div className="flex items-center gap-1">
            <UmForm um={original} />
            <UmDelete um={original} />
          </div>
        );
      },
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

  return (
    <DataTable
      columns={columns}
      data={ums}
      add={<UmForm />}
      searchField="descrizione"
      searchPlaceholder="Cerca descrizione..."
    />
  );
};
