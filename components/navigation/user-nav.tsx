"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserStore } from "@/lib/user-store"
import { UserPlus, LogIn } from "lucide-react"

export function UserNav() {
  const { currentUser, logout } = useUserStore()
  const pathname = usePathname()
  const isLoggedIn = !!currentUser?.id

  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden hover:bg-transparent p-0">
              <Avatar className="h-9 w-9 border-2 border-transparent hover:border-blue-500 transition-all duration-200">
                <AvatarImage src={currentUser?.avatar || "/placeholder.svg?height=32&width=32"} alt="User" />
                <AvatarFallback>{currentUser?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center space-x-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="flex items-center">
              <LogIn className="h-4 w-4 mr-1.5" />
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex items-center">
              <UserPlus className="h-4 w-4 mr-1.5" />
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}

