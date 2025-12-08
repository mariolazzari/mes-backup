import { ExcelDialog } from "../ExcelDialog";
import { RestoreDialog } from "../RestoreDialog";
import { DeleteDialog } from "../DeleteDialog";
import { MesForm } from "../MesTable";

export const MesBar = () => {
  return (
    <div className="flex">
      <MesForm mode="insert" />
      <MesForm mode="update" />
      <MesForm mode="clone" />
      <ExcelDialog />
      <RestoreDialog />
      <DeleteDialog />
    </div>
  );
};
