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
import { MdSettingsBackupRestore } from "react-icons/md";
import { CloseButton } from "../Buttons";
import { RestoreButton } from "../Buttons/RestoreButton";
import { RestoreDialogProps } from ".";
import { useActionState } from "react";
import { restoreMes } from "@/actions/mes";
import { initialActionState } from "@/types";

export function RestoreDialog({ mes, disabled }: RestoreDialogProps) {
  const [state, formAction] = useActionState(restoreMes, initialActionState);

  return (
    <Dialog key={mes?.odp}>
      <DialogTrigger asChild>
        <Button
          className="w-16 h-16 p-2 cursor-pointer"
          variant="outline"
          size="icon-lg"
          disabled={disabled || !mes?.hold}
        >
          <MdSettingsBackupRestore className="w-full! h-full!" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-xs md:w-md">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Ripristina ODP</DialogTitle>
            <DialogDescription>
              {mes?.odp} - {mes?.prodotto}
            </DialogDescription>
          </DialogHeader>

          <input type="hidden" name="id" defaultValue={mes?.id} />

          <div className="h-24">
            <p>
              Sei sicuro di voler rirpistinare ordine di produzione
              <span className="ml-1 font-bold">{mes?.odp}</span>?
            </p>
            {state.success && (
              <p>
                Ordine di produzione
                <span className="mx-1 font-bold">{mes?.odp}</span> ripristinato
              </p>
            )}
          </div>

          <DialogFooter>
            <CloseButton />
            <RestoreButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
