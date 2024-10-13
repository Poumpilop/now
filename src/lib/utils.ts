import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate, formatDistanceToNowStrict } from "date-fns"
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeData(from: Date) {
  const currentDate = new Date();

  if(currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true, locale: fr });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "d/MM", { locale: fr });
    }
    else {
      return formatDate(from, "d/MM/yyyy");
    }
  }
}