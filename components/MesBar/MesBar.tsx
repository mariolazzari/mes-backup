"use client";
import { ExcelDialog } from "../ExcelDialog";
import { RestoreDialog } from "../RestoreDialog";
import { DeleteDialog } from "../DeleteDialog";
import { MesForm } from "../MesTable";
import { MesBarProps } from ".";

export const MesBar = ({ wcs, selected, disableActions }: MesBarProps) => {
  console.log("mesbar selected", selected);

  return (
    <div className="flex">
      <MesForm mode="insert" wcs={wcs} mes={{}} disabled={false} />
      <MesForm
        mode="update"
        wcs={wcs}
        mes={selected}
        disabled={disableActions}
      />
      <MesForm
        mode="clone"
        wcs={wcs}
        mes={selected}
        disabled={disableActions}
      />
      <ExcelDialog />
      <RestoreDialog />
      <DeleteDialog />
    </div>
  );
};
