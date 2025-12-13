"use client";
import { ExcelDialog } from "../ExcelDialog";
import { RestoreDialog } from "../RestoreDialog";
import { DeleteDialog } from "../DeleteDialog";
import { MesForm } from "../MesTable";
import { MesBarProps } from ".";

export const MesBar = ({
  wcs,
  scraps,
  selected,
  disableActions,
}: MesBarProps) => {
  return (
    <div className="flex xs:scale-75">
      <MesForm mode="insert" wcs={wcs} scraps={scraps} disabled={false} />
      <MesForm
        mode="update"
        wcs={wcs}
        scraps={scraps}
        mes={selected}
        disabled={disableActions}
      />
      <MesForm
        mode="clone"
        wcs={wcs}
        scraps={scraps}
        mes={selected}
        disabled={disableActions}
      />
      <ExcelDialog />
      <RestoreDialog mes={selected} disabled={disableActions} />
      <DeleteDialog mes={selected} disabled={disableActions} />
    </div>
  );
};
