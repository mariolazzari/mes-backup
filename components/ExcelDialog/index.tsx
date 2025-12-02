import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegFileExcel } from "react-icons/fa";

export function ExcelDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="w-16 h-16 p-2 cursor-pointer"
            variant="outline"
            size="icon-lg"
          >
            <FaRegFileExcel className="w-full! h-full!" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Esportazione Excel</DialogTitle>
            <DialogDescription>
              Seleziona i record da esportare in Excel
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Chiudi</Button>
            </DialogClose>
            <Button type="submit">Salva</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
