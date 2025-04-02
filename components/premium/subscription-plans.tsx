"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2 } from "lucide-react"
import { subscriptionPlans } from "@/lib/subscription-service"
import { useUserStore } from "@/lib/user-store"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface SubscriptionPlansProps {
  currentPlan: string
  billingInterval: "monthly" | "yearly"
  onBillingIntervalChange: (interval: "monthly" | "yearly") => void
}

export function SubscriptionPlans({ currentPlan, billingInterval, onBillingIntervalChange }: SubscriptionPlansProps) {
  const router = useRouter()
  const { currentUser, updateSubscription } = useUserStore()
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  // Update the handleSubscribe function to navigate to the payment page
  const handleSubscribe = (planId: string) => {
    if (currentUser) {
      // If already subscribed to this plan, don't do anything
      if (
        currentUser.subscription?.plan === planId &&
        currentUser.subscription?.isYearly === (billingInterval === "yearly")
      ) {
        return
      }

      // Navigate to payment page
      router.push(`/premium/payment?plan=${planId}&yearly=${billingInterval === "yearly"}`)
    } else {
      // If not logged in, show toast and redirect to login
      toast({
        title: "Login Required",
        description: "You need to be logged in to subscribe to a plan.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }

  const getButtonText = (planId: string) => {
    if (isProcessing === planId) return "Processing..."
    if (currentPlan === planId) return "Current Plan"
    if (planId === "free") return "Downgrade to Free"
    return `Subscribe to ${planId.charAt(0).toUpperCase() + planId.slice(1)}`
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
          <Button
            variant={billingInterval === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => onBillingIntervalChange("monthly")}
            className="relative"
          >
            Monthly
          </Button>
          <Button
            variant={billingInterval === "yearly" ? "default" : "ghost"}
            size="sm"
            onClick={() => onBillingIntervalChange("yearly")}
            className="relative"
          >
            Yearly
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-[10px] px-1.5 py-0.5">Save 20%</Badge>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id} className={`relative overflow-hidden ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none bg-blue-500">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {plan.id === "free"
                  ? "Basic features for casual users"
                  : plan.id === "premium"
                    ? "Perfect for active event organizers"
                    : "For professional event management"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${billingInterval === "monthly" ? plan.price.monthly.toFixed(2) : plan.price.yearly.toFixed(2)}
                </span>
                <span className="text-gray-500">
                  {plan.id !== "free" && `/${billingInterval === "monthly" ? "month" : "year"}`}
                </span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : plan.id === "free"
                      ? "bg-gray-500 hover:bg-gray-600"
                      : ""
                }`}
                disabled={isProcessing !== null || currentPlan === plan.id}
                onClick={() => handleSubscribe(plan.id)}
              >
                {isProcessing === plan.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {getButtonText(plan.id)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

