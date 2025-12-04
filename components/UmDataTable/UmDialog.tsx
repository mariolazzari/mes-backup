"use client";
import { saveUm } from "@/actions/um";
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
import { Edit, Plus } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

type UmDialogProps = {
  um?: Um;
};

export function UmDialog({ um }: UmDialogProps) {
  const initialState = {
    success: false,
    errors: {} as Record<string, string[]>,
  };
  const [state, action] = useFormState(saveUm, initialState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 cursor-pointer" variant="outline" size="icon-lg">
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

          {/* CAMPO COD */}
          <div className="mt-4">
            <label className="text-sm">Cod</label>
            <input
              name="cod"
              defaultValue={um?.cod ?? ""}
              className="border p-2 w-full rounded"
            />
            {state.errors.cod && (
              <p className="text-red-500 text-sm">{state.errors.cod[0]}</p>
            )}
          </div>

          {/* CAMPO DESCRIZIONE */}
          <div className="mt-4">
            <label className="text-sm">Descrizione</label>
            <input
              name="descrizione"
              defaultValue={um?.descrizione ?? ""}
              className="border p-2 w-full rounded"
            />
            {state.errors.descrizione && (
              <p className="text-red-500 text-sm">
                {state.errors.descrizione[0]}
              </p>
            )}
          </div>

          <DialogFooter className="mt-6">
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
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salva"}
    </Button>
  );
}
