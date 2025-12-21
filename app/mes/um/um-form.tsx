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
import { SaveButton, CloseButton } from "@/components/Buttons";
import { useActionState } from "react";
import { initialActionState } from "@/types/ActionState";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Um } from "@/types";

type Props = {
  um?: Um;
};

export function UmForm({ um }: Props) {
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
          <DialogHeader className="mb-4">
            <DialogTitle>{um ? `Modifica ${um.cod}` : "Nuova UM"}</DialogTitle>
            <DialogDescription>
              {um
                ? `Modifica ${um.descrizione}`
                : "Aggiungi nuova unità di misura"}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="cod">Codice UM</FieldLabel>
              <Input
                id="cod"
                name="cod"
                defaultValue={um?.cod ?? ""}
                className="border p-2 w-full rounded"
                autoFocus={!!!um}
                readOnly={!!um}
              />
              <FieldError>{state.errors.cod}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="cod">Descrizione UM</FieldLabel>
              <Input
                id="descrizione"
                name="descrizione"
                defaultValue={um?.descrizione ?? ""}
                className="border p-2 w-full rounded"
                autoFocus={!!um}
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
