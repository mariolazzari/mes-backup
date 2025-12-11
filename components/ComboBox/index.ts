export type ComboBoxItem = {
  label: string;
  value: string;
};

export type ComboBoxProps = {
  items: ComboBoxItem[];
  onChange: (val: string) => void;
} & Partial<{
  name: string;
  placeholder: string;
  value: string;
}>;
