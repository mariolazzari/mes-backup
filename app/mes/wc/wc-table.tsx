"use client";
import { ColumnDef } from "@tanstack/react-table";
import { WcForm } from "./wc-form";
import { ColumnHeader, DataTable } from "@/components/DataTable";
import { WcDelete } from "./wc-delete";
import { WorkCenter } from "@/types";

type Props = {
  wcs: WorkCenter[];
};

export const WcTable = ({ wcs = [] }: Props) => {
  const columns: ColumnDef<WorkCenter>[] = [
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const { original } = row;

        return (
          <div className="flex items-center gap-1">
            <WcForm wc={original} />
            <WcDelete wc={original} />
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
      data={wcs}
      add={<WcForm />}
      searchField="descrizione"
      searchPlaceholder="Cerca descrizione..."
    />
  );
};
