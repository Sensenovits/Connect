"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PremiumMenu } from "./premium/premium-menu"
import { Bell, MessageSquare, Plus, Search } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/explore",
      label: "Explore",
      active: pathname === "/explore",
    },
    {
      href: "/messages",
      label: "Messages",
      active: pathname === "/messages",
    },
  ]

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6 lg:gap-10">
        <Link href="/" className="font-bold text-xl">
          EventApp
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Link href="/create-event">
          <Button size="sm" className="hidden md:flex gap-1">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
        <PremiumMenu />
      </div>
    </div>
  )
}

