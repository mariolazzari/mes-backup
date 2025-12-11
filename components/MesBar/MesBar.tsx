import { ExcelDialog } from "../ExcelDialog";
import { RestoreDialog } from "../RestoreDialog";
import { DeleteDialog } from "../DeleteDialog";
import { MesForm } from "../MesTable";
import { MesBarProps } from ".";

export const MesBar = ({ wcs }: MesBarProps) => {
  return (
    <div className="flex">
      <MesForm mode="insert" wcs={wcs} />
      <MesForm mode="update" wcs={wcs} />
      <MesForm mode="clone" wcs={wcs} />
      <ExcelDialog />
      <RestoreDialog />
      <DeleteDialog />
    </div>
  );
};
