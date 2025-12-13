"use client";
import { formatTime } from "@/lib/date";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TimePickerProps } from ".";
import { ChangeEventHandler } from "react";

export function TimePicker({ value, onChange }: TimePickerProps) {
  const onTimeChange: ChangeEventHandler<HTMLInputElement> = e => {
    const t = e.target.value;
    if (!t) return;

    const [h, m] = t.split(":").map(Number);

    const updated = value ? new Date(value) : new Date();
    updated.setHours(h);
    updated.setMinutes(m);
    updated.setSeconds(0);

    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="time-picker" className="px-1">
        Ora
      </Label>
      <Input
        className="bg-background w-24"
        id="time-picker"
        type="time"
        step="60"
        value={formatTime(value)}
        onChange={onTimeChange}
      />
    </div>
  );
}
