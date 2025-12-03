"use client";
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
import { UmDialogProps } from ".";
import { Edit } from "lucide-react";
import { FormEventHandler } from "react";

export function UmDialog({ um }: UmDialogProps) {
  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 cursor-pointer" variant="outline" size="icon-lg">
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl" key={um ? um.cod : "newUm"}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Modifica {um ? um.cod : "Nuova UM"}</DialogTitle>
            <DialogDescription>
              {um ? um.descrizione : "Aggiungi nuova unità di misura"}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Chiudi</Button>
            </DialogClose>
            <Button type="submit">Salva</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
