"use client";
import { Um } from "@/types/Um";
import { ColumnDef } from "@tanstack/react-table";
import { UmForm } from "./um-form";
import { ColumnHeader, DataTable } from "@/components/DataTable";
import { UmDelete } from "./um-delete";
import { WorkCenter } from "@/types";

type Props = {
  ums: WorkCenter[];
};

export const UmTable = ({ ums = [] }: Props) => {
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
