"use client";
import { ExcelDialog } from "./dialogs/excel-dialog";
import { RestoreDialog } from "./dialogs/restore-dialog";
import { DeleteDialog } from "./dialogs/delete-dialog";
import { MesForm } from "./form/mes-form";
import { Mes } from "@/types";

type Props = {
  selected?: Mes;
  disableActions: boolean;
};

export const MesBar = ({ selected, disableActions }: Props) => {
  return (
    <div className="flex xs:scale-75">
      <MesForm mode="insert" disabled={false} />
      <MesForm mode="update" mes={selected} disabled={disableActions} />
      <MesForm mode="clone" mes={selected} disabled={disableActions} />
      <ExcelDialog />
      <RestoreDialog mes={selected} disabled={disableActions} />
      <DeleteDialog mes={selected} disabled={disableActions} />
    </div>
  );
};
