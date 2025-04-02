"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Crown, Home, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUserStore } from "@/lib/user-store"
import { hasPremiumAccess } from "@/lib/subscription-service"

export function MainNav() {
  const pathname = usePathname()
  const { currentUser } = useUserStore()
  const isPremium = currentUser ? hasPremiumAccess(currentUser) : false

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Events",
      href: "/events",
      icon: CalendarDays,
    },
    {
      name: "Attendees",
      href: "/attendees",
      icon: Users,
    },
    ...(isPremium
      ? [
          {
            name: "Premium Features",
            href: "/premium/features/all",
            icon: Crown,
          },
        ]
      : []),
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

