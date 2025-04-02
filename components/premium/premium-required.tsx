"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Lock } from "lucide-react"
import Link from "next/link"

interface PremiumRequiredProps {
  feature: string
  description?: string
}

export function PremiumRequired({
  feature,
  description = "This feature requires a premium subscription. Upgrade now to access this and other premium features.",
}: PremiumRequiredProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Premium Feature: {feature}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-3">
            <div className="flex items-start gap-3">
              <Crown className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Premium Benefits</h3>
                <p className="text-sm text-muted-foreground">
                  Unlock advanced features, analytics, and customization options.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/premium">Upgrade to Premium</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

