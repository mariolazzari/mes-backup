"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader, DataTable } from "../DataTable";
import { ScrapTableProps } from ".";
import { Scrap } from "@/types/Scrap";
import { ScrapForm } from "./ScrapForm";
import { ScrapDelete } from "./ScrapDelete";

export const ScrapTable = ({ scraps }: ScrapTableProps) => {
  const columns: ColumnDef<Scrap>[] = [
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const { original } = row;

        return (
          <div className="flex items-center gap-1">
            <ScrapForm scrap={original} />
            <ScrapDelete scrap={original} />
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
      data={scraps}
      add={<ScrapForm />}
      searchField="descrizione"
      searchPlaceholder="Cerca descrizione..."
    />
  );
};
