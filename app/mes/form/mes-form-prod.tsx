"use client";
import { ComboBox } from "@/components/ComboBox/ComboBox";
import { TimePicker } from "@/components/Pickers";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatHoursAndMinutes } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { useMes } from "@/components/Providers/MesProvider";
import { Mes } from "@/types";

type Props = {
  selected: Mes;
  setSelected: (mes: Mes) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: "qta_prodotta" | undefined;
};

export const MesFormProd = ({
  selected,
  setSelected,
  onChange,
  autoFocus,
}: Props) => {
  const { scraps, ums } = useMes();

  const onScrapChange = (cod_scarto: string) => {
    if (!selected) {
      return;
    }
    setSelected({ ...selected, cod_scarto });
  };

  const onStartChange = (date?: Date) => {
    if (!selected || !date) {
      return;
    }
    setSelected({ ...selected, data_ora_inizio: date });
  };

  const onEndChange = (date?: Date) => {
    if (!selected || !date) {
      return;
    }
    setSelected({ ...selected, data_ora_fine: date });
  };

  const onUmChange = (um: string) => {
    if (!selected) {
      return;
    }
    setSelected({
      ...selected,
      um_prod: um,
    });
  };

  return (
    <FieldGroup>
      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="item">Prodotto</FieldLabel>
          <Input
            id="prodotto"
            name="prodotto"
            value={selected?.prodotto ?? ""}
            onChange={onChange}
            className="border p-2 w-full rounded"
            required
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="item">Qtà versata</FieldLabel>
          <Input
            type="number"
            id="qta_prodotta"
            name="qta_prodotta"
            value={selected?.qta_prodotta ?? 0}
            onChange={onChange}
            className="border p-2 w-full rounded"
            required
            min={0}
            step={0.001}
            autoFocus={autoFocus === "qta_prodotta"}
          />
          <FieldError></FieldError>
        </Field>
      </div>

      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="hu_comp">HU versata</FieldLabel>
          <Input
            id="hu_comp"
            name="hu_comp"
            value={selected?.hu_comp ?? ""}
            onChange={onChange}
            className="border p-2 w-full rounded"
            required
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="hu_prod_ok">Qtà scartata</FieldLabel>
          <Input
            type="number"
            id="qta_scartata"
            name="qta_scartata"
            value={selected?.qta_scartata ?? 0}
            onChange={onChange}
            className="border p-2 w-full rounded"
            min={0}
            step={0.001}
          />
          <FieldError></FieldError>
        </Field>
      </div>

      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="hu_scarto">HU scarto</FieldLabel>
          <Input
            id="hu_scarto"
            name="hu_scarto"
            value={selected?.hu_scarto ?? ""}
            onChange={onChange}
            className="border p-2 w-full rounded"
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="hu_scarto">Causale scarto</FieldLabel>
          <ComboBox
            items={scraps.map(sc => ({
              label: sc.descrizione,
              value: sc.cod,
            }))}
            placeholder="Causale scarto"
            value={selected?.cod_scarto}
            onChange={onScrapChange}
          />
          <FieldError></FieldError>
        </Field>
      </div>

      <div className="flex items-center gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="operatore">UM produzione</FieldLabel>
          <ComboBox
            items={ums.map(um => ({
              label: um.descrizione,
              value: um.cod,
            }))}
            placeholder="Unita di misura"
            value={selected?.um_prod}
            onChange={onUmChange}
            required
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="hu_prod_ok">Numero fili</FieldLabel>
          <Input
            type="number"
            id="nr_fili"
            name="nr_fili"
            value={selected?.nr_fili ?? 0}
            onChange={onChange}
            className="border p-2 w-full rounded"
            min={0}
            step={0.001}
          />
          <FieldError></FieldError>
        </Field>
      </div>

      <div className="flex items-center gap-2">
        <Field className="flex-1">
          <TimePicker
            label="Inizio"
            value={selected?.data_ora_inizio}
            onChange={onStartChange}
          />
          <FieldError></FieldError>
        </Field>
        <Field className="flex-1">
          <TimePicker
            label="Fine"
            value={selected?.data_ora_fine}
            onChange={onEndChange}
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-2">
          <FieldLabel htmlFor="hu_scarto">Tempo</FieldLabel>
          <Badge variant="secondary" className="p-2 font-semibold">
            {selected
              ? formatHoursAndMinutes(
                  selected.data_ora_inizio,
                  selected.data_ora_fine
                )
              : ""}
          </Badge>
        </Field>
      </div>
    </FieldGroup>
  );
};
