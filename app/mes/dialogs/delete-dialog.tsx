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
import { MdDeleteForever } from "react-icons/md";
import { CloseButton, DeleteButton } from "@/components/Buttons";
import { deleteMes } from "@/actions/mes";
import { useActionState } from "react";
import { initialActionState, Mes } from "@/types";

type Props = {
  mes?: Mes;
  disabled?: boolean;
};

export function DeleteDialog({ mes, disabled }: Props) {
  const [state, formAction] = useActionState(deleteMes, initialActionState);

  return (
    <Dialog key={mes?.odp}>
      <DialogTrigger asChild>
        <Button
          className="w-16 h-16 p-2 cursor-pointer"
          variant="outline"
          size="icon-lg"
          disabled={disabled || mes?.hold}
        >
          <MdDeleteForever className="w-full! h-full!" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-xs">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Elimina ODP</DialogTitle>
            <DialogDescription>
              {mes?.odp} - {mes?.prodotto}
            </DialogDescription>
          </DialogHeader>

          <input type="hidden" name="id" defaultValue={mes?.id} />

          <div className="h-12">
            <p className="text-justify">
              Sei sicuro di voler eliminare ordine di produzione
              <span className="font-semibold ml-1">{mes?.odp}</span>?
            </p>

            {state.success && (
              <p>
                Ordine di produzione{" "}
                <span className="font-bold mx-1">{mes?.odp}</span> eliminato con
                successo
              </p>
            )}
          </div>

          <DialogFooter>
            <CloseButton />
            <DeleteButton disabled={state.success} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
