"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Crown } from "lucide-react"
import Link from "next/link"
import { usePremium } from "@/contexts/premium-context"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const { isPremiumDemo } = usePremium()

  const handleCheckout = (plan: string) => {
    alert(`In a real app, this would redirect to the checkout page for the ${plan} plan with ${billingCycle} billing.`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Premium Plans</h1>
        <p className="text-muted-foreground">Choose the right plan for your event planning needs</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          <Label htmlFor="billing-cycle" className={billingCycle === "monthly" ? "font-medium" : ""}>
            Monthly
          </Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
          />
          <div className="flex items-center">
            <Label htmlFor="billing-cycle" className={billingCycle === "yearly" ? "font-medium" : ""}>
              Yearly
            </Label>
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
              Save 17%
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Essential features for casual event planners</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">Free</span>
              <span className="text-muted-foreground ml-1">forever</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Create up to 5 events</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Basic event customization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Simple RSVP collection</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Email notifications</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary relative">
          <div className="absolute top-0 right-0 left-0">
            <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">Most Popular</div>
          </div>
          <CardHeader className="pt-8">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-primary" />
              <CardTitle>Premium</CardTitle>
            </div>
            <CardDescription>Advanced features for serious event planners</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">{billingCycle === "monthly" ? "$7.99" : "$79.99"}</span>
              <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Unlimited events</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>All premium features</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Professional templates & themes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Advanced RSVP management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Group messaging</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Team collaboration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleCheckout("premium")}>
              {isPremiumDemo ? "Upgrade from Demo" : "Get Premium"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business</CardTitle>
            <CardDescription>Enterprise features for professional event management</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">{billingCycle === "monthly" ? "$19.99" : "$199.99"}</span>
              <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Everything in Premium</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Custom branding</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>API access</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>24/7 phone support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleCheckout("business")}>
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 bg-muted rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Can I cancel my subscription?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your subscription at any time. Your premium features will remain active until the end
              of your billing period.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there a free trial?</h3>
            <p className="text-muted-foreground">
              Yes! You can try all premium features for 24 hours with our demo mode, no credit card required.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I switch between plans?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your
              next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/premium/demo-access">
            <Button variant="outline">Try Premium Demo</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

