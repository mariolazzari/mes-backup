"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { initialActionState } from "@/types/ActionState";
import { MesStatusProps } from ".";
import { DeleteButton } from "../Buttons/DeleteButton";
import { CloseButton } from "../Buttons/CloseButton";
import { useActionState } from "react";
import { deleteMes, restoreMes } from "@/actions/mes";

export function MesStatus({ mes, mode }: MesStatusProps) {
  const { id } = mes;
  const [stateDelete, actionDelete] = useActionState(
    deleteMes,
    initialActionState
  );
  const [stateRestore, actionRestore] = useActionState(
    restoreMes,
    initialActionState
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <form action={mode === "delete" ? actionDelete : actionRestore}>
          <input type="hidden" name="id" value={id} />

          <DialogHeader>
            <DialogTitle>Elimina {id}</DialogTitle>
            <DialogDescription>
              {mode === "delete"
                ? "Sei sicuro di voler eliminare la transazione"
                : "Sei sicuro di voler recuperare la transazione"}
              <span className="font-bold ml-1">{id}</span>?
            </DialogDescription>
          </DialogHeader>

          <p className="text-destructive">{stateDelete.errors.general}</p>
          <p className="text-destructive">{stateRestore.errors.general}</p>

          <DialogFooter className="mt-4">
            <CloseButton />
            <DeleteButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
