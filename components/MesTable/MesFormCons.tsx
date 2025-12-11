import { MesFormGroupProps } from ".";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";

export const MesFormCons = ({ selected, setSelected }: MesFormGroupProps) => {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="item">Componente</FieldLabel>
        <Input
          id="componente"
          name="componente"
          value={selected?.componente ?? ""}
          onChange={e =>
            setSelected(prev => ({ ...prev, componente: e.target.value }))
          }
          className="border p-2 w-full rounded"
          required
        />
        <FieldError></FieldError>
      </Field>
    </FieldGroup>
  );
};
