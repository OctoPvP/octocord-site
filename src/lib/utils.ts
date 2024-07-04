import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserFallbackAvatar(username: string) {
  return username.slice(0, 2).toUpperCase()
}

export function truncate(str: string | undefined, length: number) {
  if (!str) return ""
  return str.length > length ? str.slice(0, length) + "..." : str
}