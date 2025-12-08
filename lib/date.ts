import { format } from "date-fns";
import { it } from "date-fns/locale";

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return format(date, "d MMMM HH:mm", { locale: it });
}

export const formatTime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "HH:mm");
};
