"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Scrap } from "@/types/Scrap";
import { ScrapForm } from "./scrap-form";
import { ScrapDelete } from "./scrap-delete";
import { ColumnHeader, DataTable } from "@/components/DataTable";

type Props = {
  scraps: Scrap[];
};

export const ScrapsTable = ({ scraps = [] }: Props) => {
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
