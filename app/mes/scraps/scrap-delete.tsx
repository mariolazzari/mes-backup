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
import { DeleteButton, CloseButton } from "@/components/Buttons";
import { useActionState } from "react";
import { deleteScrap } from "@/actions/scrap";
import { Scrap } from "@/types";

type Props = {
  scrap: Scrap;
};

export function ScrapDelete({ scrap }: Props) {
  const { cod, descrizione } = scrap;
  const [state, formAction] = useActionState(deleteScrap, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-96">
        <form action={formAction}>
          <input type="hidden" name="cod" value={cod} />

          <DialogHeader>
            <DialogTitle>Elimina {cod}</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare la causale di scarto
              <span className="ml-1 font-semibold">{descrizione}</span>?
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
