import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}
export function fDateShort(date,locale) {
  return format(new Date(date), "dd MMM yyyy",{locale: locale});
}

export function fDateTime(date,locale)  {
  return format(new Date(date), "dd MMM yyyy HH:mm",{locale: locale});
}

export function fTimestamp(date,locale)  {
  return getTime(new Date(date),{locale: locale});
}

export function fDateTimeSuffix(date,locale)  {
  return format(new Date(date), "dd/MM/yyyy hh:mm p",{locale: locale});
}

export function fToNow(date,locale)  {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: locale
  });
}
