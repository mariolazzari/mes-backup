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
import { MdSettingsBackupRestore } from "react-icons/md";

export function RestoreDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="w-16 h-16 p-2 cursor-pointer"
            variant="outline"
            size="icon-lg"
          >
            <MdSettingsBackupRestore className="w-full! h-full!" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ripristina record</DialogTitle>
            <DialogDescription>
              Seleziona i record da ripristinare
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Chiudi</Button>
            </DialogClose>
            <Button type="submit">Recupera</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
