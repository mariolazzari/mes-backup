import { MesFormGeneralProps } from ".";
import { ComboBox } from "../ComboBox/ComboBox";
import { DateTimePicker } from "../Pickers";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export const MesFormGeneral = ({
  selected,
  setSelected,
  wcs,
}: MesFormGeneralProps) => {
  console.log("general selected", selected);

  return (
    <FieldGroup>
      <Field>
        <DateTimePicker
          value={selected?.data_ora_inizio}
          onChange={date =>
            setSelected(prev => ({
              ...prev,
              data_ora_inizio: date ?? new Date(),
            }))
          }
        />
        <FieldError></FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="operatore">Operatore</FieldLabel>
        <Input
          id="operatore"
          name="operatore"
          value={selected?.operatore ?? ""}
          onChange={e =>
            setSelected(prev => ({
              ...(prev ?? {}), // <-- ensure prev is always object
              operatore: e.target.value,
            }))
          }
          className="border p-2 w-full rounded"
        />
        <FieldError></FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="wc">Work center</FieldLabel>
        <ComboBox
          name="wc"
          items={wcs.map(wc => ({
            label: wc.descrizione,
            value: wc.cod,
          }))}
          placeholder="Seleziona WC"
          value={selected?.wc ?? ""}
          onChange={wc => setSelected(prev => ({ ...prev, wc }))}
        />
        <FieldError></FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="operatore">Ordine do Produzione</FieldLabel>
        <Input
          id="odp"
          name="odp"
          value={selected?.odp ?? ""}
          onChange={e =>
            setSelected(prev => ({ ...prev, odp: e.target.value }))
          }
          className="border p-2 w-full rounded"
        />
        <FieldError></FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="operatore">Fase</FieldLabel>
        <Input
          id="fase"
          name="fase"
          value={selected?.fase ?? ""}
          onChange={e =>
            setSelected(prev => ({ ...prev, fase: e.target.value }))
          }
          className="border p-2 w-full rounded"
          required
        />
        <FieldError></FieldError>
      </Field>
    </FieldGroup>
  );
};
