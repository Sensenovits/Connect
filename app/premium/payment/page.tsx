"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/user-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { hasPremiumAccess } from "@/lib/subscription-service"

export default function PaymentPage() {
  const router = useRouter()
  const userStore = useUserStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("monthly")

  // Check if user is already premium
  if (userStore.currentUser && hasPremiumAccess(userStore.currentUser)) {
    router.push("/premium/features")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update user subscription
    if (userStore.currentUser) {
      const updatedUser = {
        ...userStore.currentUser,
        subscription: {
          id: "sub_" + Math.random().toString(36).substring(2, 11),
          planId: selectedPlan === "monthly" ? "premium-monthly" : "premium-yearly",
          status: "active",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          isYearly: selectedPlan === "yearly",
          features: ["analytics", "branding", "messaging", "collaboration"],
        },
      }
      userStore.setUser(updatedUser)
    }

    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect after showing success message
    setTimeout(() => {
      router.push("/premium/features")
    }, 2000)
  }

  const handleTestPremium = () => {
    // Update user subscription for testing
    if (userStore.currentUser) {
      const updatedUser = {
        ...userStore.currentUser,
        subscription: {
          id: "test_" + Math.random().toString(36).substring(2, 11),
          planId: "premium-test",
          status: "active",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          isYearly: false,
          features: ["analytics", "branding", "messaging", "collaboration"],
        },
      }
      userStore.setUser(updatedUser)
      router.push("/premium/features")
    }
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for upgrading to premium. You now have access to all premium features.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>Redirecting you to premium features...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/premium/pricing" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pricing
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your payment information to complete your subscription</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing Information</h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" required />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          defaultValue="4242 4242 4242 4242"
                          required
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="expMonth">Expiration Month</Label>
                        <Input id="expMonth" placeholder="MM" defaultValue="12" required />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="expYear">Expiration Year</Label>
                        <Input id="expYear" placeholder="YY" defaultValue="25" required />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" defaultValue="123" required />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing Address</h3>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" defaultValue="123 Main St" required />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="San Francisco" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" defaultValue="CA" required />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input id="zip" defaultValue="94103" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" defaultValue="United States" required />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Complete Payment"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-green-600 border-green-600 hover:bg-green-50"
                    onClick={handleTestPremium}
                  >
                    Test Premium Features (Skip Payment)
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    This is a demo. No actual payment will be processed.
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="monthly" value={selectedPlan} onValueChange={setSelectedPlan}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="flex-1">
                      Monthly Plan
                    </Label>
                    <span className="font-medium">$19.99/mo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly" className="flex-1">
                      Yearly Plan
                      <span className="ml-2 text-xs text-green-600 font-medium">Save 20%</span>
                    </Label>
                    <span className="font-medium">$191.90/yr</span>
                  </div>
                </RadioGroup>

                <Separator />

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{selectedPlan === "monthly" ? "$19.99" : "$191.90"}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax</span>
                    <span>{selectedPlan === "monthly" ? "$0.00" : "$0.00"}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{selectedPlan === "monthly" ? "$19.99" : "$191.90"}</span>
                </div>

                <div className="text-sm text-gray-500">
                  {selectedPlan === "monthly"
                    ? "You will be charged $19.99 today and then $19.99 monthly until canceled."
                    : "You will be charged $191.90 today and then $191.90 annually until canceled."}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

