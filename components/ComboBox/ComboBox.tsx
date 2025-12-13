"use client";
import { ComboBoxProps } from ".";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function ComboBox({
  items,
  placeholder = "Select value...",
  value = "",
  onChange,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);

  const onItemSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-between"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {value ? items.find(i => i.value === value)?.label : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No records</CommandEmpty>
            <CommandGroup>
              {items.map(i => (
                <CommandItem
                  key={i.value}
                  value={i.value}
                  onSelect={() => onItemSelect(i.value)}
                >
                  {i.label}
                  <Check
                    className={cn(
                      "ml-auto text-primary",
                      i.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
