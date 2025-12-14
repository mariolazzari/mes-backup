import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { DatePickerProps } from ".";
import { useState } from "react";

export function DatePicker({
  label = "Data",
  value,
  onChange,
  isOpen = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(isOpen);

  const onDateChange = (day?: Date) => {
    setOpen(false);
    if (!day) return;

    // Preserve time from previous value
    const updated = new Date(day);
    if (value) {
      updated.setHours(value.getHours());
      updated.setMinutes(value.getMinutes());
      updated.setSeconds(value.getSeconds());
    }

    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date-picker" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            className="w-auto justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : "Seleziona data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={onDateChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
