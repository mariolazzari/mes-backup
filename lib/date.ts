import { format } from "date-fns";

export function formatTimestamp(timestamp: number): string {
  const datetime = new Date(timestamp * 1000);
  const date = datetime.toLocaleDateString("it-IT");
  const time = datetime.toLocaleTimeString("it-IT");

  return `${date} ${time}`;
}

export const formatTime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return format(date, "HH:mm");
};
