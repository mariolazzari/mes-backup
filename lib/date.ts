import { format, FormatOptions } from "date-fns";
import { it } from "date-fns/locale";

const opts: FormatOptions = {
  locale: it,
};

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return format(date, "d MMMM HH:mm", opts);
}

export const formatDate = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "eee dd MMM yyyy", opts);
};

export const formatTime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "HH:mm", opts);
};

export const formatDateTime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "eee dd MMM yyyy HH:mm", opts);
};
