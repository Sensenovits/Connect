"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, Clock } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PremiumOverview() {
  const { isPremiumDemo } = usePremium()
  const [demoTimeRemaining, setDemoTimeRemaining] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (typeof window === "undefined") return

    const calculateTimeLeft = () => {
      const demoActivatedAt = localStorage.getItem("demoActivatedAt")

      if (demoActivatedAt && isPremiumDemo) {
        const activationTime = Number.parseInt(demoActivatedAt, 10)
        const expirationTime = activationTime + 24 * 60 * 60 * 1000 // 24 hours
        const currentTime = Date.now()
        const difference = expirationTime - currentTime

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

          return `${hours}h ${minutes}m`
        }
      }

      return null
    }

    setDemoTimeRemaining(calculateTimeLeft())

    const timer = setInterval(() => {
      setDemoTimeRemaining(calculateTimeLeft())
    }, 60000)

    return () => clearInterval(timer)
  }, [isPremiumDemo])

  if (!mounted) {
    return null
  }

  if (!isPremiumDemo) {
    return null
  }

  return (
    <Card className="mb-6 bg-green-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 rounded-full p-2">
            <Crown className="h-5 w-5 text-green-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-green-700">Premium Demo Active</h3>
            <p className="text-sm text-green-600 mt-1">You have full access to all premium features.</p>
            {demoTimeRemaining && (
              <div className="flex items-center mt-2 text-sm text-green-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Demo expires in {demoTimeRemaining}</span>
              </div>
            )}
          </div>
          <div>
            <Link href="/premium/pricing">
              <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                Upgrade
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

