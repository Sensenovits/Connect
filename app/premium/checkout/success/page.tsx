"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Crown } from "lucide-react"
import Link from "next/link"
import { usePremium } from "@/contexts/premium-context"

export default function CheckoutSuccessPage() {
  const { setHasPremiumAccess } = usePremium()

  useEffect(() => {
    // Update premium access state
    setHasPremiumAccess(true)
  }, [setHasPremiumAccess])

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-green-200">
        <CardHeader className="text-center pb-3">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Thank you for upgrading to Premium</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>Your payment has been processed successfully and your premium features are now active.</p>

          <div className="bg-muted p-4 rounded-md">
            <div className="flex items-center justify-center mb-2">
              <Crown className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Premium Features Now Available</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              You now have access to all premium features including templates, themes, promotion tools, and more.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/premium" className="w-full">
            <Button className="w-full">Explore Premium Features</Button>
          </Link>
          <Link href="/create-event" className="w-full">
            <Button variant="outline" className="w-full">
              Create New Event
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

