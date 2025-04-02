"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileText, Palette, Megaphone, ClipboardCheck, MessageCircle, Users, Crown, CreditCard } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { useEffect, useState } from "react"

const premiumNavItems = [
  {
    name: "Overview",
    href: "/premium",
    icon: Crown,
    exact: true,
  },
  {
    name: "Event Templates",
    href: "/premium/features/templates",
    icon: FileText,
  },
  {
    name: "Custom Themes",
    href: "/premium/features/themes",
    icon: Palette,
  },
  {
    name: "Promotion Tools",
    href: "/premium/features/promotion",
    icon: Megaphone,
  },
  {
    name: "RSVP Management",
    href: "/premium/features/rsvp",
    icon: ClipboardCheck,
  },
  {
    name: "Group Messaging",
    href: "/premium/features/messaging",
    icon: MessageCircle,
  },
  {
    name: "Team Collaboration",
    href: "/premium/features/collaboration",
    icon: Users,
  },
  {
    name: "Pricing",
    href: "/premium/pricing",
    icon: CreditCard,
  },
]

export function PremiumNavigation() {
  const pathname = usePathname()
  const { isPremiumDemo } = usePremium()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-1">
        {premiumNavItems.map((item) => (
          <div key={item.name} className="h-9 w-full rounded-md px-3"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="font-medium">Premium Features</div>
      <nav className="space-y-1">
        {premiumNavItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)

          const Icon = item.icon

          return (
            <Link key={item.name} href={item.href}>
              <Button variant="ghost" className={cn("w-full justify-start", isActive && "bg-muted font-medium")}>
                <Icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {isPremiumDemo && (
        <div className="pt-4 border-t">
          <Link href="/premium/demo-access">
            <Button variant="outline" size="sm" className="w-full">
              <Crown className="h-4 w-4 mr-2" />
              Demo Access
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

