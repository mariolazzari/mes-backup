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
import { Edit, Plus } from "lucide-react";
import { SaveButton } from "../Buttons/SaveButton";
import { CloseButton } from "../Buttons/CloseButton";
import { WcDialogProps } from ".";
import { useActionState } from "react";
import { initialActionState } from "@/types/ActionState";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { saveWorkCenter } from "@/actions/wc";

export function WcForm({ wc }: WcDialogProps) {
  const [state, action] = useActionState(saveWorkCenter, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="p-2 cursor-pointer text-primary"
          variant="outline"
          size="icon-lg"
        >
          {wc ? <Edit /> : <Plus />}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl" key={wc ? wc.cod : "newWc"}>
        <form action={action}>
          <DialogHeader className="mb-4">
            <DialogTitle>{wc ? `Modifica ${wc.cod}` : "Nuovo WC"}</DialogTitle>
            <DialogDescription>
              {wc
                ? `Modifica ${wc.descrizione}`
                : "Aggiungi nuovo centro di lavoro"}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="cod">Codice WC</FieldLabel>
              <Input
                id="cod"
                name="cod"
                defaultValue={wc?.cod ?? ""}
                className="border p-2 w-full rounded"
                autoFocus={!!!wc}
                readOnly={!!wc}
              />
              <FieldError>{state.errors.cod}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="cod">Descrizione WC</FieldLabel>
              <Input
                id="descrizione"
                name="descrizione"
                defaultValue={wc?.descrizione ?? ""}
                className="border p-2 w-full rounded"
                autoFocus={!!wc}
              />
              <FieldError>{state.errors.descrizione}</FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <CloseButton />
            <SaveButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
