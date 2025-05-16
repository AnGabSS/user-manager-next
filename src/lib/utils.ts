import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: unknown, locale: string = navigator.language || "pt-BR"): string | unknown {
  const date = new Date(value as string | number | Date);

  if (isNaN(date.getTime())) return value;

  const hasTime =
    date.getHours() !== 0 ||
    date.getMinutes() !== 0 ||
    date.getSeconds() !== 0;

  const datePart = date.toLocaleDateString(locale);

  if (hasTime) {
    const timePart = date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${datePart} às ${timePart}`;
  } else {
    return datePart;
  }
}
