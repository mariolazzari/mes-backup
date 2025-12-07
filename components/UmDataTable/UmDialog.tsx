"use client";
import { saveUm } from "@/actions/um";
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
import { Edit, Plus } from "lucide-react";
import { SaveButton } from "../Buttons/SaveButton";
import { CloseButton } from "../Buttons/CloseButton";
import { UmDialogProps } from ".";
import { useActionState } from "react";
import { initialActionState } from "@/types/ActionState";

export function UmDialog({ um }: UmDialogProps) {
  const [state, action] = useActionState(saveUm, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="p-2 cursor-pointer text-primary"
          variant="outline"
          size="icon-lg"
        >
          {um ? <Edit /> : <Plus />}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl" key={um ? um.cod : "newUm"}>
        <form action={action}>
          <DialogHeader>
            <DialogTitle>{um ? `Modifica ${um.cod}` : "Nuova UM"}</DialogTitle>
            <DialogDescription>
              {um ? um.descrizione : "Aggiungi nuova unità di misura"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <label className="text-sm">Cod</label>
            <input
              name="cod"
              defaultValue={um?.cod ?? ""}
              className="border p-2 w-full rounded"
            />
            {state.errors.cod && (
              <p className="text-destructive text-sm">{state.errors.cod}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm">Descrizione</label>
            <input
              name="descrizione"
              defaultValue={um?.descrizione ?? ""}
              className="border p-2 w-full rounded"
            />
            {state.errors.descrizione && (
              <p className="text-destructive text-sm">
                {state.errors.descrizione}
              </p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <CloseButton />
            <SaveButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
