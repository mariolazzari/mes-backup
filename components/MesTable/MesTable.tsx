"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader, DataTable } from "../DataTable";
import { MesTableProps } from ".";
import { Mes } from "@/types/Mes";

export const MesTable = ({ mes }: MesTableProps) => {
  const columns: ColumnDef<Mes>[] = [
    {
      accessorKey: "data_ora_inizio",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Data e ora" />
      ),
    },

    {
      accessorKey: "odp",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Ordine Prod" />
      ),
    },
    {
      accessorKey: "prodotto",
      header: ({ column }) => <ColumnHeader column={column} title="Prodotto" />,
    },
    {
      accessorKey: "qta_prodotta",
      header: ({ column }) => <ColumnHeader column={column} title="Qtà Prod" />,
    },
    {
      accessorKey: "qta_cons",
      header: ({ column }) => <ColumnHeader column={column} title="Qtà Cons" />,
    },
  ];

  return <DataTable columns={columns} data={mes} />;
};
