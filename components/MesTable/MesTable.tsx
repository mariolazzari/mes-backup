"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader, DataTable, OnPageChange } from "../DataTable";
import { MesTableProps, SearchDialogArgs } from ".";
import { Mes } from "@/types/Mes";
import { formatDateTime } from "@/lib/date";
import { useState } from "react";
import { MesBar } from "../MesBar";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { SearcDialog } from "./SearchDialog";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export const MesTable = ({ mes, total, page, size }: MesTableProps) => {
  const [selected, setSelected] = useState<Mes | undefined>(undefined);
  const router = useRouter();

  const validSelected =
    selected && mes.some(m => m.id === selected.id) ? selected : undefined;

  const columns: ColumnDef<Mes>[] = [
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const { original } = row;

        return (
          <div className="flex gap-1">
            <Checkbox
              checked={original.id === selected?.id}
              onCheckedChange={() => setSelected(original)}
              onClick={e => e.stopPropagation()}
            />
            {original.hold && <Trash2 size={16} />}
          </div>
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
      cell: ({ row }) => {
        const { qta_prodotta, odp } = row.original;

        return (
          <Badge
            className={cn(
              "font-semibold min-w-20",
              qta_prodotta > 0 ? "bg-green-700" : "bg-yellow-600"
            )}
          >
            {odp}
          </Badge>
        );
      },
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
    router.push(`/mes?page=${page + 1}&size=${size}`);
  };

  const onSearchClick = ({ from, to, odp, prodotto }: SearchDialogArgs) => {
    let url = `/mes?page=${page}&size=${size}`;

    if (odp) {
      url += `&odp=${odp}`;
    }
    if (prodotto) {
      url += `&prodotto=${prodotto}`;
    }
    if (from) {
      url += `&from=${from}`;
    }
    if (to) {
      url += `&to=${to}`;
    }

    router.push(url);
  };

  return (
    <div className="w-full flex flex-col items-center xs:scale-75">
      <MesBar selected={validSelected} disableActions={!validSelected?.id} />
      <DataTable
        columns={columns}
        data={mes}
        page={page}
        size={size}
        total={total}
        onClick={setSelected}
        onPageChange={onPageChange}
        add={<SearcDialog onSearchClick={onSearchClick} />}
      />
    </div>
  );
};
