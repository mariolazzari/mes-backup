import { format, FormatOptions, differenceInMinutes } from "date-fns";
import { it } from "date-fns/locale";

const formatOpts: FormatOptions = {
  locale: it,
};

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return format(date, "d MMMM HH:mm", formatOpts);
}

export const formatDate = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "eee dd MMM yyyy", formatOpts);
};

export const formatTime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "HH:mm", formatOpts);
};

export const formatDateTime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "eee dd MMM yyyy HH:mm", formatOpts);
};

export const formatHoursAndMinutes = (date1: Date, date2: Date) => {
  const totalMinutes = Math.abs(differenceInMinutes(date1, date2));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? "ora" : "ore"}`);
  }

  if (minutes > 0 || hours === 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minuto" : "minuti"}`);
  }

  return parts.join(" e ");
};
