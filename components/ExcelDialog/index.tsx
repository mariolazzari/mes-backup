"us client";
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
import { FaRegFileExcel } from "react-icons/fa";
import { CloseButton, SaveButton } from "../Buttons";
import { DateTimePicker } from "../Pickers";
import { startOfToday, endOfToday } from "date-fns";
import { FormEventHandler, useState } from "react";
import { getProdsByDate } from "@/actions/mes";
import { Mes } from "@/types";
import * as XLSX from "xlsx";

export function ExcelDialog() {
  const [from, setFrom] = useState(startOfToday());
  const [to, setTo] = useState(endOfToday());
  const [prods, setProds] = useState<Mes[]>([]);
  const [error, setError] = useState("");

  const onFromChange = (date?: Date) => {
    if (date) {
      setFrom(date);
    }
  };

  const onToChange = (date?: Date) => {
    if (date) {
      setTo(date);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      const prods = await getProdsByDate(from, to);
      setProds(prods);
      setError("");
    } catch (ex) {
      console.error(ex);
      setProds([]);
      setError("Errore recupero dati");
    }
  };

  const downloadExcel = () => {
    if (prods.length === 0) return;

    // Map Mes objects to a plain object suitable for Excel
    const data = prods.map(prod => ({
      ID: prod.id,
      ODP: prod.odp,
      Operatore: prod.operatore,
      WC: prod.wc,
      Fase: prod.fase,
      Prodotto: prod.prodotto,
      UM_Prod: prod.um_prod,
      Nr_Fili: prod.nr_fili,
      Qta_Prodotta: prod.qta_prodotta,
      HU_Prod_OK: prod.hu_prod_ok,
      Qta_Scartata: prod.qta_scartata,
      Cod_Scarto: prod.cod_scarto,
      HU_Scarto: prod.hu_scarto,
      Data_Ora_Inizio: prod.data_ora_inizio.toISOString(),
      Data_Ora_Fine: prod.data_ora_fine.toISOString(),
      Componente: prod.componente,
      HU_Comp: prod.hu_comp,
      Flag_HU_Comp: prod.flag_hu_comp,
      UM_Cons: prod.um_cons,
      Qta_Cons: prod.qta_cons,
      Hold: prod.hold ? "Si" : "No",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Prodotti");

    XLSX.writeFile(
      wb,
      `prodotti_${from.toISOString().split("T")[0]}_to_${
        to.toISOString().split("T")[0]
      }.xlsx`
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-16 h-16 p-2 cursor-pointer"
          variant="outline"
          size="icon-lg"
        >
          <FaRegFileExcel className="w-full! h-full!" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-xs md:w-md lg:w-lg">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Esportazione Excel</DialogTitle>
            <DialogDescription>
              Seleziona i record da esportare in Excel
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center my-4 gap-4">
            <div>
              <DateTimePicker
                value={from}
                dateLabel="Data iniziale"
                timeLabel="Ora iniziale"
                onChange={onFromChange}
              />
            </div>
            <div>
              <DateTimePicker
                value={to}
                dateLabel="Data finale"
                timeLabel="Ora finale"
                onChange={onToChange}
              />
            </div>

            {error !== "" && (
              <h6 className="text-destructive font-semibold text-lg">
                {error}
              </h6>
            )}

            <h6 className="text-md">
              {prods.length > 0
                ? `${prods.length} records da esportare`
                : "Non ci sono record da esportare"}
            </h6>
          </div>

          <DialogFooter>
            <CloseButton />
            <SaveButton onClick={downloadExcel} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
