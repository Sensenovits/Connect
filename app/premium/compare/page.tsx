"use client"

import { Header } from "@/components/navigation/header"
import { FooterNav } from "@/components/navigation/footer-nav"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { subscriptionPlans } from "@/lib/subscription-service"
import { useUserStore } from "@/lib/user-store"
import { PremiumNavigation } from "@/components/premium/premium-navigation"

export default function ComparePlansPage() {
  const { currentUser } = useUserStore()
  const currentPlan = currentUser?.subscription?.plan || "free"

  // Define features for comparison
  const comparisonFeatures = [
    { name: "Join events", free: true, premium: true, business: true },
    { name: "Create events", free: "Up to 3", premium: "Unlimited", business: "Unlimited" },
    { name: "Event customization", free: "Basic", premium: "Advanced", business: "Advanced" },
    { name: "Ad-free experience", free: false, premium: true, business: true },
    { name: "Event analytics", free: false, premium: true, business: true },
    { name: "Custom branding", free: false, premium: true, business: true },
    { name: "Team collaboration", free: false, premium: false, business: true },
    { name: "Advanced messaging", free: false, premium: true, business: true },
    { name: "Premium badge", free: false, premium: true, business: true },
    { name: "Early access to features", free: false, premium: true, business: true },
    { name: "Global reach", free: false, premium: true, business: true },
    { name: "Dedicated account manager", free: false, premium: false, business: true },
    { name: "Custom integrations", free: false, premium: false, business: true },
    { name: "White-label events", free: false, premium: false, business: true },
    { name: "Enterprise-grade security", free: false, premium: false, business: true },
  ]

  return (
    <div className="pb-16">
      <Header title="Compare Plans" showBackButton />

      <PremiumNavigation />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Plan Comparison
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare our plans to find the perfect fit for your needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 border-b-2 border-gray-200 w-1/3">Features</th>
                  {subscriptionPlans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`p-4 text-center border-b-2 ${
                        plan.id === currentPlan ? "bg-blue-50 border-blue-500" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="font-bold text-lg">{plan.name}</div>
                      <div className="text-sm text-gray-500">
                        {plan.id === "free" ? "Free" : `$${plan.price.monthly}/mo`}
                      </div>
                      {plan.id === currentPlan && (
                        <div className="mt-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Current Plan
                          </span>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 border-b border-gray-200 font-medium">{feature.name}</td>
                    <td className="p-4 text-center border-b border-gray-200">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span>{feature.free}</span>
                      )}
                    </td>
                    <td
                      className={`p-4 text-center border-b border-gray-200 ${
                        currentPlan === "premium" ? "bg-blue-50" : ""
                      }`}
                    >
                      {typeof feature.premium === "boolean" ? (
                        feature.premium ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span>{feature.premium}</span>
                      )}
                    </td>
                    <td
                      className={`p-4 text-center border-b border-gray-200 ${
                        currentPlan === "business" ? "bg-blue-50" : ""
                      }`}
                    >
                      {typeof feature.business === "boolean" ? (
                        feature.business ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span>{feature.business}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold mb-4">Ready to upgrade?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/premium/pricing">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Pricing Plans
                </Button>
              </Link>
              <Link href="/premium/features">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterNav />
    </div>
  )
}

