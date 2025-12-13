import { MesFormGroupProps } from ".";
import { ComboBox } from "../ComboBox/ComboBox";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";

export const MesFormProd = ({
  selected,
  setSelected,
  onChange,
  scraps = [],
}: MesFormGroupProps) => {
  const onScrapChange = (scrap: string) => {
    setSelected({ ...selected, hu_scarto: scrap });
  };

  return (
    <FieldGroup>
      <div className="flex gap-2">
        <Field className="flex-2">
          <FieldLabel htmlFor="item">Prodotto</FieldLabel>
          <Input
            id="item"
            name="item"
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
          <FieldLabel htmlFor="hu_prod_ok">Qtà HU versata</FieldLabel>
          <Input
            type="number"
            id="hu_prod_ok"
            name="hu_prod_ok"
            value={selected?.hu_prod_ok ?? 0}
            onChange={onChange}
            className="border p-2 w-full rounded"
            required
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
          <FieldLabel htmlFor="qta_scartata">Qtà scartata</FieldLabel>
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

      <Field className="flex-1">
        <FieldLabel htmlFor="hu_scarto">Causale scarto</FieldLabel>
        <ComboBox
          name="hu_scarto"
          items={scraps.map(sc => ({
            label: sc.descrizione,
            value: sc.cod,
          }))}
          placeholder="Causale scarto"
          value={selected?.hu_scarto ?? ""}
          onChange={onScrapChange}
        />
        <FieldError></FieldError>
      </Field>

      <div></div>
    </FieldGroup>
  );
};
