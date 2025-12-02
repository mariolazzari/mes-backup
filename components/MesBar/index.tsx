import { ProdDialog } from "../ProdDialog";
import { ExcelDialog } from "../ExcelDialog";
import { RestoreDialog } from "../RestoreDialog";
import { DeleteDialog } from "../DeleteDialog";

export const MesBar = () => {
  return (
    <div className="flex">
      <ProdDialog mode="insert" />
      <ProdDialog mode="update" />
      <ProdDialog mode="clone" />
      <ExcelDialog />
      <RestoreDialog />
      <DeleteDialog />
    </div>
  );
};
