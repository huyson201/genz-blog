import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export * from "./formatDate";
export * from "./calcBlogReadingTime";
export * from "./slugify";
export * from "./queryStringify";
export * from "./assertPostDataChange";
export * from "./textFormat";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
