import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

export function generatePastTime(days = 0): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

export function generateFutureTime(days = 0): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getDemoExpirationTime(startTime: number): number {
  // Demo access lasts for 24 hours (86400000 milliseconds)
  const expirationTime = startTime + 86400000
  return expirationTime
}

export function formatTimeRemaining(milliseconds: number): string {
  if (milliseconds <= 0) return "Expired"

  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

export function getInitials(name: string): string {
  const parts = name.split(" ")
  let initials = ""

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 0) {
      initials += parts[i][0].toUpperCase()
    }
  }

  return initials
}

