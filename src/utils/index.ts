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

export const createOpenGraphImg = () => {
  if (!process.env.VERCEL_URL)
    return `http://localhost:${process.env.PORT || 3000}`;
  if (!/https|http/i.test(process.env.VERCEL_URL))
    return `https://${process.env.VERCEL_URL}`;
  return `${process.env.VERCEL_URL}`;
};
