"use client";
import { useFormState } from "react-dom";
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
import { deleteUm } from "@/actions/um";
import { initialActionState } from "@/types/ActionState";
import { UmDeleteProps } from ".";
import { DeleteButton } from "../Buttons/DeleteButton";
import { CloseButton } from "../Buttons/CloseButton";

export function UmDelete({ um }: UmDeleteProps) {
  const { cod, descrizione } = um;
  const [state, formAction] = useFormState(deleteUm, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          {/* Hidden input for um id to delete */}
          <input type="hidden" name="cod" value={cod} />

          <DialogHeader>
            <DialogTitle>Elimina {cod}</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare l’unità di misura:{" "}
              <b>{descrizione}</b>?
            </DialogDescription>
          </DialogHeader>

          {state.errors.length > 0 && (
            <p className="text-destructive text-sm">{state.errors[0]}</p>
          )}

          <DialogFooter className="mt-4">
            <CloseButton />
            <DeleteButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
