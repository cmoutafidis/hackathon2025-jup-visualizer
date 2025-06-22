import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmount = (amount: string, decimals = 6) => {
  return (Number(amount) / 10 ** decimals).toFixed(4);
};
