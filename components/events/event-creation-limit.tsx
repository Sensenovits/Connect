"use client"

import { useUserStore } from "@/lib/user-store"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function EventCreationLimit() {
  const { currentUser, events } = useUserStore()

  // Count events created by the current user
  const userEvents = events.filter((event) => event.organizerId === currentUser?.id)
  const eventCount = userEvents.length

  // Set limit based on subscription
  const isPremium = currentUser?.subscription?.plan === "premium" || currentUser?.subscription?.plan === "business"
  const eventLimit = isPremium ? Number.POSITIVE_INFINITY : 14

  // Calculate percentage for progress bar
  const percentage = eventLimit === Number.POSITIVE_INFINITY ? 100 : Math.min((eventCount / eventLimit) * 100, 100)

  // Don't show for premium users
  if (isPremium) return null

  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Event Creation Limit</h3>
        <span className="text-sm font-medium">
          {eventLimit === Number.POSITIVE_INFINITY ? "Unlimited" : `${eventCount} / ${eventLimit} events`}
        </span>
      </div>

      <Progress value={percentage} className="h-2 mb-3" />

      {eventCount >= eventLimit && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-3">
            You've reached your event creation limit. Upgrade to Premium for unlimited events.
          </p>
          <Link href="/premium/pricing">
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

