"use client";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import { MdAddTask, MdEdit, MdCyclone } from "react-icons/md";
import { CloseButton, SaveButton } from "@/components/Buttons";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { emptyMes, Mes } from "@/types";
import { MesFormGeneral } from "./mes-form-general";
import { saveMes } from "@/actions/mes";
import { MesFormProd } from "./mes-form-prod";
import { MesFormCons } from "./mes-form-cons";
import { useMes } from "@/components/Providers/MesProvider";

type Props = {
  mode: "insert" | "update" | "clone";
  mes?: Mes;
  disabled?: boolean;
};

export function MesForm({ mode, mes, disabled = false }: Props) {
  const initialSelected =
    mode === "insert"
      ? emptyMes
      : mode === "clone" && mes
      ? { ...emptyMes, ...mes, id: -1 }
      : mes || emptyMes;

  const [isProd, setProd] = useState(false);
  const [selected, setSelected] = useState<Mes>(initialSelected);

  const { defaults } = useMes();

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

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (!selected) {
      return;
    }

    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

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
    if (mode === "update" && mes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(mes);
      setProd(mes.prodotto !== "");
    }

    if (mode === "clone" && mes) {
      setSelected({ ...mes, id: -1 });
      setProd(mes.prodotto !== "");
    }

    if (mode === "insert") {
      emptyMes.operatore = defaults?.operatore ?? "";
      emptyMes.fase = defaults?.fase ?? "0010";
      emptyMes.wc = defaults?.wc ?? "";
      emptyMes.odp = defaults?.odp ?? "";
      emptyMes.um_cons = defaults?.um_cons ?? "MT";
      emptyMes.um_prod = defaults?.um_prod ?? "MT";
      setSelected(emptyMes);
      setProd(true);
    }
  }, [mode, mes, defaults]);

  return (
    <Dialog key={mode === "insert" ? "insert" : `${mode}-${mes?.id ?? -1}`}>
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

      <DialogContent className="max-w-xl max-h-[70dvh]  lg:max-h-[95vh] overflow-y-auto md:w-96 lg:w-lg xl:w-xl">
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

          <div className="flex flex-col gap-2">
            <MesFormGeneral
              selected={selected}
              setSelected={setSelected}
              onChange={onChange}
            />

            {isProd ? (
              <MesFormProd
                selected={selected}
                setSelected={setSelected}
                onChange={onChange}
                autoFocus={mode === "clone" ? "qta_prodotta" : undefined}
              />
            ) : (
              <MesFormCons
                selected={selected}
                setSelected={setSelected}
                onChange={onChange}
                autoFocus={mode === "clone" ? "componente" : undefined}
              />
            )}
          </div>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-2">
            <CloseButton className="w-full sm:w-auto" />
            <SaveButton className="w-full sm:w-auto" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
