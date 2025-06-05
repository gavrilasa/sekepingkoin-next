import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a currency value with the appropriate symbol
 */
export function formatCurrency(
  value: number,
  currencySymbol: string = '$',
  maximumFractionDigits: number = 8
): string {
  // Use different formatting for small crypto values
  if (value < 0.01 && value > 0) {
    return `${currencySymbol}${value.toFixed(maximumFractionDigits)}`;
  }

  // For normal values, use standard formatting with commas for thousands
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : maximumFractionDigits
  });

  return `${currencySymbol}${formatter.format(value)}`;
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
}