import { MesFormGroupProps } from ".";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";

export const MesFormProd = ({ selected, setSelected }: MesFormGroupProps) => {
  return (
    <FieldGroup>
      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="item">Prodotto</FieldLabel>
          <Input
            id="item"
            name="item"
            value={selected?.prodotto ?? ""}
            onChange={e =>
              setSelected({ ...selected, prodotto: e.target.value })
            }
            className="border p-2 w-full rounded"
            required
          />
          <FieldError></FieldError>
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="item">Quantità versata</FieldLabel>
          <Input
            type="number"
            id="qta_prodotta"
            name="qta_prodotta"
            value={selected?.qta_prodotta ?? 0}
            onChange={e =>
              setSelected({ ...selected, qta_prodotta: +e.target.value })
            }
            className="border p-2 w-full rounded"
            required
            min={0}
            step={0.001}
          />
          <FieldError></FieldError>
        </Field>
      </div>
    </FieldGroup>
  );
};
