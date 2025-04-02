"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { hasPremiumAccess } from "@/lib/premium"

interface MainNavigationProps {
  className?: string
}

export function MainNavigation({ className }: MainNavigationProps) {
  const pathname = usePathname()
  const isPremiumActive = hasPremiumAccess()

  const links = [
    {
      href: "/app/dashboard",
      label: "Dashboard",
      active: pathname === "/app/dashboard",
    },
    {
      href: "/app/events",
      label: "Events",
      active: pathname.startsWith("/app/events"),
    },
    {
      href: "/app/attendees",
      label: "Attendees",
      active: pathname.startsWith("/app/attendees"),
    },
    ...(isPremiumActive
      ? [
          {
            href: "/app/premium/features/all",
            label: "Premium Features",
            active: pathname.startsWith("/app/premium/features"),
          },
        ]
      : []),
    {
      href: "/app/settings",
      label: "Settings",
      active: pathname.startsWith("/app/settings"),
    },
  ]

  return (
    <nav className={cn("flex space-x-4 lg:space-x-6", className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            link.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

