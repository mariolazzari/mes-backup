export type ComboBoxItem = {
  label: string;
  value: string;
};

export type ComboBoxProps = {
  items: ComboBoxItem[];
  onChange: (val: string) => void;
} & Partial<{
  label: string;
  name: string;
  placeholder: string;
  value: string;
  defaultValue: string;
  required: boolean;
}>;
