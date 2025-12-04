"use client";

import { useFormState, useFormStatus } from "react-dom";
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
import { Um } from "@/types/Um";
import { Trash2 } from "lucide-react";
import { deleteUm } from "@/actions/um";
import { initialActionState } from "@/types/ActionState";

type UmDeleteProps = {
  um: Um;
};

export function UmDelete({ um }: UmDeleteProps) {
  const { cod, descrizione } = um;

  const [state, formAction] = useFormState(deleteUm, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          {/* Hidden input per passare il cod da eliminare */}
          <input type="hidden" name="cod" value={cod} />

          <DialogHeader>
            <DialogTitle>Elimina {cod}</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare l’unità di misura:{" "}
              <b>{descrizione}</b>?
            </DialogDescription>
          </DialogHeader>

          {/* Errori */}
          {state.errors.length > 0 && (
            <p className="text-red-500 text-sm">{state.errors[0]}</p>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Chiudi</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      {pending ? "Eliminando..." : "Elimina"}
    </Button>
  );
}
