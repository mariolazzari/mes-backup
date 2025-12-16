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
import { CloseButton } from "../Buttons";
import { DateTimePicker } from "../Pickers";
import { startOfToday, endOfToday } from "date-fns";
import { useState } from "react";
import { Search } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { SearchDialogProps } from ".";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function SearcDialog({ onSearchClick }: SearchDialogProps) {
  const [from, setFrom] = useState<Date | undefined>(startOfToday());
  const [to, setTo] = useState<Date | undefined>(endOfToday());
  const [odp, setOdp] = useState("");
  const [prodotto, setProdotto] = useState("");

  const onClick = () => {
    onSearchClick({
      from: from?.toISOString() ?? startOfToday().toISOString(),
      to: to?.toISOString() ?? endOfToday().toISOString(),
      odp,
      prodotto,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-8 h-8 p-2 cursor-pointer"
          variant="outline"
          size="icon-lg"
        >
          <Search />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-xs md:w-md lg:w-lg">
        <DialogHeader>
          <DialogTitle>Cerca Mes</DialogTitle>
          <DialogDescription>
            Seleziona i parametri di ricerca
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center my-4 gap-4">
          <DateTimePicker
            value={from}
            dateLabel="Data iniziale"
            timeLabel="Ora iniziale"
            onChange={setFrom}
          />
          <DateTimePicker
            value={to}
            dateLabel="Data finale"
            timeLabel="Ora finale"
            onChange={setTo}
          />

          <Field className="flex-2">
            <FieldLabel htmlFor="odp">Ordine di Produzione</FieldLabel>
            <Input
              className="border p-2 w-full rounded"
              id="odp"
              name="odp"
              value={odp}
              onChange={e => setOdp(e.target.value)}
            />
          </Field>

          <Field className="flex-2">
            <FieldLabel htmlFor="prodotto">Prodotto</FieldLabel>
            <Input
              className="border p-2 w-full rounded"
              id="prodotto"
              name="prodotto"
              value={prodotto}
              onChange={e => setProdotto(e.target.value)}
            />
          </Field>
        </div>

        <DialogFooter>
          <CloseButton />

          <DialogClose asChild>
            <Button onClick={onClick}>
              <Search /> Cerca
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
