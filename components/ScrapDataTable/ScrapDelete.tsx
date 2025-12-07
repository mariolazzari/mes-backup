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
import { ScrapDeleteProps } from ".";
import { DeleteButton } from "../Buttons/DeleteButton";
import { CloseButton } from "../Buttons/CloseButton";
import { useActionState } from "react";
import { deleteScrap } from "@/actions/scrap";

export function ScrapDelete({ scrap }: ScrapDeleteProps) {
  const { cod, descrizione } = scrap;
  const [state, formAction] = useActionState(deleteScrap, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <input type="hidden" name="cod" value={cod} />

          <DialogHeader>
            <DialogTitle>Elimina {cod}</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare la causale di scarto:{" "}
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
