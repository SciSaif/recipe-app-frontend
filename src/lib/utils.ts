import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const limitCharacters = (text: string, limit: number) => {
    if (text?.length > limit) {
        return text.substring(0, limit) + "...";
    } else {
        return text;
    }
};
