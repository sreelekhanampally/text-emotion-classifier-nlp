import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn — merge Tailwind class strings safely.
 * @param  {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
