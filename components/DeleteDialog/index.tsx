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
import { MdDeleteForever } from "react-icons/md";

export function DeleteDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="w-16 h-16 p-2 cursor-pointer"
            variant="outline"
            size="icon-lg"
          >
            <MdDeleteForever className="w-full! h-full!" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Elimina selezionati</DialogTitle>
            <DialogDescription>
              Seleziona i record da eliminare
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Chiudi</Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
