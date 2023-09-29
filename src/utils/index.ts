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

export function convertNumberToShortFormat(number: number) {
  if (number === 0) return `${number}`;
  const suffixes = ["", "k", "m", "b", "t"];
  const magnitude = Math.floor(Math.log10(number) / 3);

  // Đảm bảo không vượt quá các hậu tố đã xác định
  const index = Math.min(magnitude, suffixes.length - 1);

  // Chuyển đổi số và thêm hậu tố
  const convertedNumber = number / Math.pow(10, index * 3);
  const formattedNumber =
    convertedNumber % 1 === 0
      ? convertedNumber.toFixed(0)
      : convertedNumber.toFixed(1);
  return formattedNumber + suffixes[index];
}
