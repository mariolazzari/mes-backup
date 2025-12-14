"use client";
import { DatePicker, DateTimePickerProps, TimePicker } from ".";

export function DateTimePicker({
  value,
  onChange,
  isOpen = false,
  dateLabel,
  timeLabel,
}: DateTimePickerProps) {
  return (
    <div className="flex gap-4">
      <DatePicker
        label={dateLabel}
        value={value}
        onChange={onChange}
        isOpen={isOpen}
      />
      <TimePicker label={timeLabel} value={value} onChange={onChange} />
    </div>
  );
}
