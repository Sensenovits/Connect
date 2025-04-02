"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Crown, CreditCard, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [plan, setPlan] = useState<"premium" | "business">("premium")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Get plan and billing cycle from URL parameters
    const planParam = searchParams.get("plan")
    const cycleParam = searchParams.get("cycle")

    if (planParam === "premium" || planParam === "business") {
      setPlan(planParam)
    }

    if (cycleParam === "monthly" || cycleParam === "yearly") {
      setBillingCycle(cycleParam)
    }
  }, [searchParams])

  const calculatePrice = () => {
    if (plan === "premium") {
      return billingCycle === "monthly" ? 7.99 : 79.99
    } else {
      return billingCycle === "monthly" ? 19.99 : 199.99
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // In a real app, this would process the payment and update the subscription
      localStorage.setItem("premiumSubscriptionActive", "true")

      // Redirect to success page
      router.push("/premium/checkout/success")
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase to access premium features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter your payment details to complete your purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" placeholder="John Doe" required />
                    </div>

                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base">Billing Cycle</Label>
                    <RadioGroup
                      defaultValue={billingCycle}
                      value={billingCycle}
                      onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
                      className="mt-2"
                    >
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="font-normal">
                            Monthly Billing
                          </Label>
                        </div>
                        <div className="text-sm font-medium">${plan === "premium" ? "7.99" : "19.99"}/month</div>
                      </div>
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yearly" id="yearly" />
                          <Label htmlFor="yearly" className="font-normal">
                            Annual Billing
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium mr-2">
                            ${plan === "premium" ? "79.99" : "199.99"}/year
                          </div>
                          <div className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Save 17%</div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-renew" defaultChecked />
                      <Label htmlFor="auto-renew">Auto-renew subscription</Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Pay $${calculatePrice().toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <CardTitle>{plan === "premium" ? "Premium" : "Business"} Plan</CardTitle>
                </div>
                <CardDescription>{billingCycle === "monthly" ? "Monthly" : "Annual"} subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {plan === "premium" ? "Premium" : "Business"} Plan ({billingCycle})
                      </span>
                      <span>${calculatePrice().toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${calculatePrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-md">
                  <h3 className="font-medium mb-2">What's included:</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All premium features</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited events</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                    {plan === "business" && (
                      <>
                        <li className="flex items-start text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Custom branding</span>
                        </li>
                        <li className="flex items-start text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Advanced analytics</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 items-start">
                <div className="text-xs text-muted-foreground">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CreditCard className="h-3 w-3 mr-1" />
                  <span>Secure payment processing</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

