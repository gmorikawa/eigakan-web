import type { DateString, ISODateString } from "@shared/types/date";

export function parseDate(dateString: ISODateString): Date {
    return new Date(dateString);
}

export function stringifyDate(date: Date): ISODateString {
    if (!(date instanceof Date)) {
        throw new Error("Invalid date object");
    }

    return date.toISOString();
}

export function formatDate(date: Date): DateString {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}