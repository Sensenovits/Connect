"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Crown } from "lucide-react"
import Link from "next/link"

export function PremiumMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Crown className="h-4 w-4 text-amber-500" />
          Premium
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Premium Features</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/premium/features/analytics">Event Analytics</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/premium/features/attendance">Attendance Tracking</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/premium/features/conversion">Conversion Metrics</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/premium/features/advanced-messaging">Advanced Messaging</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/premium/features/branding">Custom Branding</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/premium/features/collaboration">Team Management</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/premium">Upgrade to Premium</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

