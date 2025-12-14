"use client";
import { ExcelDialog } from "../ExcelDialog";
import { RestoreDialog } from "../RestoreDialog";
import { DeleteDialog } from "../DeleteDialog";
import { MesForm } from "../MesTable";
import { MesBarProps } from ".";

export const MesBar = ({ selected, disableActions }: MesBarProps) => {
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
