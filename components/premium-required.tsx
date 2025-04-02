"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, ChevronRight } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"

interface PremiumRequiredProps {
  title?: string
  description?: string
  featureName?: string
}

export function PremiumRequired({
  title = "Premium Feature",
  description = "This feature requires a premium subscription.",
  featureName = "this feature",
}: PremiumRequiredProps) {
  const { hasPremiumAccess, isPremiumDemo, activatePremiumDemo } = usePremium()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-[300px] flex items-center justify-center">Loading...</div>
  }

  if (hasPremiumAccess) {
    return null
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Upgrade to premium to unlock {featureName} and many other exclusive features.</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Link href="/premium/pricing" className="w-full sm:w-auto">
          <Button className="w-full">
            Upgrade to Premium
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" className="w-full sm:w-auto" onClick={activatePremiumDemo}>
          Try Demo
        </Button>
      </CardFooter>
    </Card>
  )
}

