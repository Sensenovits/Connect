"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Menu, Plus, User } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { cn } from "@/lib/utils"

export function AppHeader() {
  const pathname = usePathname()
  const { isPremiumDemo } = usePremium()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load profile image if available
    if (typeof window !== "undefined") {
      const savedImage = localStorage.getItem("profileImage")
      if (savedImage) {
        setProfileImage(savedImage)
      }
    }
  }, [])

  if (!mounted) {
    return <header className="border-b h-14"></header>
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">EventApp</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/events"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/events" ? "text-primary" : "text-muted-foreground",
              )}
            >
              My Events
            </Link>
            <Link
              href="/create-event"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/create-event" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Create Event
            </Link>
            <Link
              href="/premium"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/premium") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Premium
              {isPremiumDemo && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">Demo</span>
              )}
            </Link>
          </nav>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center space-x-4">
          <Link href="/create-event" className="hidden md:block">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileImage || ""} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/events" className="block px-2 py-1 text-lg font-medium">
                  My Events
                </Link>
                <Link href="/create-event" className="block px-2 py-1 text-lg font-medium">
                  Create Event
                </Link>
                <Link href="/premium" className="block px-2 py-1 text-lg font-medium">
                  Premium
                  {isPremiumDemo && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">Demo</span>
                  )}
                </Link>
                <Link href="/profile" className="block px-2 py-1 text-lg font-medium">
                  Profile
                </Link>
                <Link href="/settings" className="block px-2 py-1 text-lg font-medium">
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

