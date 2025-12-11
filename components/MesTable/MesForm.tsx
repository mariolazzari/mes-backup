"use client";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
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
import { MesFormProps } from ".";
import { MdAddTask, MdEdit, MdCyclone } from "react-icons/md";
import { CloseButton, SaveButton } from "../Buttons";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Mes } from "@/types";
import { MesFormGeneral } from "./MesFormGeneral";
import { saveMes } from "@/actions/mes";
import { MesFormProd } from "./MesFormProd";
import { MesFormCons } from "./MesFormCons";

export function MesForm({ mode, mes, wcs, disabled = false }: MesFormProps) {
  const [isProd, setProd] = useState(true);
  // const [selected, setSelected] = useState<Mes>(() => {
  //   if (mode === "insert") {
  //     return {
  //       id: -1, // or undefined
  //       operatore: "",
  //       data_ora_inizio: new Date(),
  //       // fill other required fields with defaults
  //     } as Mes;
  //   } else if (mode === "clone" && mes) {
  //     return {
  //       ...mes,
  //       id: -1, // clear ID so it's treated as new
  //     };
  //   } else if (mode === "update" && mes) {
  //     return mes;
  //   }
  //   return {} as Mes;
  // });

  const [selected, setSelected] = useState<Partial<Mes>>({});

  console.log("Mes form mes", mes);

  const renderIcon = useCallback(() => {
    switch (mode) {
      case "insert":
        return <MdAddTask className="w-full! h-full!" />;
      case "update":
        return <MdEdit className="w-full! h-full!" />;
      case "clone":
        return <MdCyclone className="w-full! h-full!" />;
      default:
        const missingMode: never = mode;
        throw new Error(`Mode ${missingMode} not supported`);
    }
  }, [mode]);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (!selected) {
      return;
    }

    if (mode === "insert" || mode === "clone") {
      // create new MES
      await saveMes({ ...selected, id: -1 } as Mes);
    } else if (mode === "update") {
      // update existing MES
      await saveMes(selected as Mes);
    }
  };

  useEffect(() => {
    setSelected(mes);
  }, [mes]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-16 h-16 p-2"
          variant="outline"
          size="icon-lg"
          disabled={disabled}
        >
          {renderIcon()}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-auto">
        <form onSubmit={onFormSubmit}>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=unchecked]:bg-yellow-400 data-[state=checked]:bg-green-400"
                  id="isProd"
                  checked={isProd}
                  onCheckedChange={setProd}
                />

                <Label
                  className={cn(
                    "p-1 rounded-md text-white w-24 text-center block",
                    isProd ? "bg-green-400" : "bg-yellow-400"
                  )}
                  htmlFor="isProd"
                >
                  {isProd ? "Versamento" : "Consumo"}
                </Label>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <MesFormGeneral
            selected={selected}
            setSelected={setSelected}
            wcs={wcs}
          />

          {isProd ? (
            <MesFormProd selected={selected} setSelected={setSelected} />
          ) : (
            <MesFormCons selected={selected} setSelected={setSelected} />
          )}

          <DialogFooter className="mt-4">
            <CloseButton />
            <SaveButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
