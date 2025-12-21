import { ComboBox } from "@/components/ComboBox/ComboBox";
import { DatePicker, TimePicker } from "@/components/Pickers";
import { useMes } from "@/components/Providers/MesProvider";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mes } from "@/types";

type Props = {
  selected: Mes;
  setSelected: (mes: Mes) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MesFormGeneral = ({ selected, setSelected, onChange }: Props) => {
  const { wcs } = useMes();

  const onWcChange = (wc: string) => {
    if (!selected) {
      return;
    }
    setSelected({ ...selected, wc });
  };

  const onDateChange = (date: Date | undefined) => {
    if (!selected) {
      return;
    }
    setSelected({
      ...selected,
      data_ora_inizio: date ?? new Date(),
    });
  };

  return (
    <FieldGroup>
      <div className="flex items-center gap-2">
        <Field className="flex-1">
          <DatePicker
            value={selected?.data_ora_inizio}
            onChange={onDateChange}
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <TimePicker
            value={selected?.data_ora_inizio}
            onChange={onDateChange}
          />
          <FieldError></FieldError>
        </Field>
      </div>

      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="operatore">Operatore</FieldLabel>
          <Input
            className="border p-2 w-full rounded"
            id="operatore"
            name="operatore"
            value={selected?.operatore}
            onChange={onChange}
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="wc">Work center</FieldLabel>
          <ComboBox
            items={wcs.map(wc => ({
              label: wc.descrizione,
              value: wc.cod,
            }))}
            placeholder="Seleziona WC"
            value={selected?.wc ?? ""}
            onChange={onWcChange}
          />
          <FieldError></FieldError>
        </Field>
      </div>

      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="operatore">Ordine di Produzione</FieldLabel>
          <Input
            id="odp"
            name="odp"
            value={selected?.odp ?? ""}
            onChange={onChange}
            className="border p-2 w-full rounded"
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="fase">Fase</FieldLabel>
          <Input
            id="fase"
            name="fase"
            value={selected?.fase === "" ? "0010" : selected?.fase}
            onChange={onChange}
            className="border p-2 w-full rounded"
            required
          />
          <FieldError></FieldError>
        </Field>
      </div>
    </FieldGroup>
  );
};
