import { MesFormGroupProps } from ".";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";

export const MesFormProd = ({ selected, setSelected }: MesFormGroupProps) => {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="item">Prodotto</FieldLabel>
        <Input
          id="item"
          name="item"
          value={selected?.prodotto ?? ""}
          onChange={e => setSelected({ ...selected, prodotto: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <FieldError></FieldError>
      </Field>
    </FieldGroup>
  );
};
