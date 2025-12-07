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
import { ScrapFormProps } from ".";
import { useActionState } from "react";
import { initialActionState } from "@/types/ActionState";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { saveScrap } from "@/actions/scrap";

export function ScrapForm({ scrap }: ScrapFormProps) {
  const [state, action] = useActionState(saveScrap, initialActionState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="p-2 cursor-pointer text-primary"
          variant="outline"
          size="icon-lg"
        >
          {scrap ? <Edit /> : <Plus />}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl" key={scrap ? scrap.cod : "newScrap"}>
        <form action={action}>
          <DialogHeader className="mb-4">
            <DialogTitle>
              {scrap ? `Modifica ${scrap.cod}` : "Nuova causale"}
            </DialogTitle>
            <DialogDescription>
              {scrap
                ? `Modifica ${scrap.descrizione}`
                : "Aggiungi nuova causale di scarto"}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="cod">Causale scarto</FieldLabel>
              <Input
                id="cod"
                name="cod"
                defaultValue={scrap?.cod ?? ""}
                className="border p-2 w-full rounded"
                autoFocus={!!!scrap}
                readOnly={!!scrap}
              />
              <FieldError>{state.errors.cod}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="cod">Descrizione causale</FieldLabel>
              <Input
                id="descrizione"
                name="descrizione"
                defaultValue={scrap?.descrizione ?? ""}
                className="border p-2 w-full rounded"
                autoFocus={!!scrap}
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
