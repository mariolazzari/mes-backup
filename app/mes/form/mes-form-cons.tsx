"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ComboBox } from "@/components/ComboBox/ComboBox";
import { useMes } from "@/components/Providers/MesProvider";
import { Mes } from "@/types";

type Props = {
  selected: Mes;
  setSelected: (mes: Mes) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: keyof Mes;
};

export const MesFormCons = ({
  selected,
  setSelected,
  onChange,
  autoFocus,
}: Props) => {
  const { ums } = useMes();

  const onUmChange = (um: string) => {
    if (!selected) {
      return;
    }
    setSelected({
      ...selected,
      um_cons: um,
    });
  };

  return (
    <FieldGroup>
      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="item">Componente</FieldLabel>
          <Input
            id="componente"
            name="componente"
            value={selected?.componente ?? ""}
            onChange={onChange}
            className="border p-2 w-full rounded"
            autoFocus={autoFocus === "componente"}
            required
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="item">Qtà consumata</FieldLabel>
          <Input
            className="border p-2 w-full rounded"
            type="number"
            id="qta_cons"
            name="qta_cons"
            value={selected?.qta_cons ?? 0}
            onChange={onChange}
            required
            min={0}
            step={0.001}
          />
          <FieldError></FieldError>
        </Field>
      </div>

      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="item">HU usata</FieldLabel>
          <Input
            className="border p-2 w-full rounded"
            id="hu_comp"
            name="hu_comp"
            value={selected?.hu_comp ?? ""}
            onChange={onChange}
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-2">
          <FieldLabel htmlFor="operatore">UM consumo</FieldLabel>
          <ComboBox
            items={ums.map(um => ({
              label: um.descrizione,
              value: um.cod,
            }))}
            placeholder="Unita di misura"
            value={selected?.um_cons ?? "MT"}
            onChange={onUmChange}
            required
          />
          <FieldError></FieldError>
        </Field>
      </div>
    </FieldGroup>
  );
};
