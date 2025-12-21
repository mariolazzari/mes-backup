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
import { deleteUm } from "@/actions/um";
import { initialActionState } from "@/types/ActionState";
import { DeleteButton, CloseButton } from "@/components/Buttons";
import { useActionState } from "react";
import { Um } from "@/types";

type Props = {
  um: Um;
};

export function UmDelete({ um }: Props) {
  const { cod, descrizione } = um;
  const [state, formAction] = useActionState(deleteUm, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-96">
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

          <p className="text-destructive text-sm">{state.errors.general}</p>

          <DialogFooter className="mt-4">
            <CloseButton />
            <DeleteButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
