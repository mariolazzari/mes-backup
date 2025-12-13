"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader, DataTable, OnPageChange } from "../DataTable";
import { MesTableProps } from ".";
import { Mes } from "@/types/Mes";
import { formatDateTime } from "@/lib/date";
import { useState } from "react";
import { MesBar } from "../MesBar";
import { Checkbox } from "../ui/checkbox";

export const MesTable = ({
  mes,
  wcs,
  scraps,
  total,
  page,
  size,
}: MesTableProps) => {
  const [selected, setSelected] = useState<Partial<Mes>>({});

  const columns: ColumnDef<Mes>[] = [
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const { original } = row;

        return (
          <Checkbox
            checked={original.id === selected?.id}
            onCheckedChange={() => setSelected(original)}
            onClick={e => e.stopPropagation()}
          />
        );
      },
    },
    {
      accessorKey: "data_ora_inizio",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Data e ora" />
      ),
      cell: ({ row }) => {
        return formatDateTime(row.original.data_ora_inizio);
      },
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

  const onPageChange: OnPageChange = (page, size) => {
    console.log("first", page, size);
  };

  return (
    <div className="w-full flex flex-col items-center xs:scale-75">
      <MesBar
        wcs={wcs}
        scraps={scraps}
        selected={selected}
        disableActions={!!!selected.id}
      />
      <DataTable
        columns={columns}
        data={mes}
        page={page}
        size={size}
        total={total}
        onClick={setSelected}
        onPageChange={onPageChange}
      />
      ;
    </div>
  );
};
