"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Brush, CreditCard, Grid3X3, MessageSquareMore, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function PremiumNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Plans",
      href: "/premium",
      icon: CreditCard,
    },
    {
      name: "All Features",
      href: "/premium/features/all",
      icon: Grid3X3,
    },
    {
      name: "Analytics",
      href: "/premium/features/analytics",
      icon: BarChart3,
    },
    {
      name: "Custom Branding",
      href: "/premium/features/branding",
      icon: Brush,
    },
    {
      name: "Advanced Messaging",
      href: "/premium/features/messaging",
      icon: MessageSquareMore,
    },
    {
      name: "Team Collaboration",
      href: "/premium/features/collaboration",
      icon: Users,
    },
  ]

  return (
    <div className="flex overflow-auto pb-2 mb-4 border-b scrollbar-hide">
      <div className="flex space-x-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn("flex items-center justify-start gap-2", pathname === item.href && "bg-muted")}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

