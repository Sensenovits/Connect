"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePremium } from "@/contexts/premium-context"

function DemoExpirationTimer() {
  const [timeLeft, setTimeLeft] = useState<string>("Loading...")

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (typeof window === "undefined") return "Loading..."

      const demoActivatedAt = localStorage.getItem("demoActivatedAt")

      if (demoActivatedAt) {
        const activationTime = Number.parseInt(demoActivatedAt, 10)
        const expirationTime = activationTime + 24 * 60 * 60 * 1000 // 24 hours
        const currentTime = Date.now()
        const difference = expirationTime - currentTime

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

          return `${hours}h ${minutes}m`
        } else {
          return "Expired"
        }
      } else {
        return "Not active"
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-sm text-muted-foreground mt-2">
      Demo access expires in: <span className="font-medium">{timeLeft}</span>
    </div>
  )
}

export default function DemoAccessPage() {
  const { isPremiumDemo, activateDemoAccess } = usePremium()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Premium Demo Access</h1>
          <p className="text-muted-foreground">Try out all premium features without payment</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Premium Demo Mode</CardTitle>
            <CardDescription>Experience all premium features for 24 hours without payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">What's included:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Event Templates</li>
                <li>Custom Themes</li>
                <li>Promotion Tools</li>
                <li>RSVP Management</li>
                <li>Group Messaging</li>
                <li>Team Collaboration</li>
              </ul>
            </div>

            {isPremiumDemo ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                <h3 className="font-medium">Demo Mode Active</h3>
                <p className="text-sm mt-1">You now have access to all premium features for 24 hours.</p>
                <DemoExpirationTimer />
              </div>
            ) : (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
                <h3 className="font-medium">Demo Mode Inactive</h3>
                <p className="text-sm mt-1">Activate demo mode to try all premium features for 24 hours.</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {isPremiumDemo ? (
              <div className="space-y-2 w-full">
                <Link href="/premium">
                  <Button className="w-full">Explore Premium Features</Button>
                </Link>
                <Link href="/premium/pricing">
                  <Button variant="outline" className="w-full">
                    View Pricing
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2 w-full">
                <Button className="w-full" onClick={activateDemoAccess}>
                  Activate Demo Mode
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">No payment information required</p>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

