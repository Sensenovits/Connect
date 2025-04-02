export type SubscriptionPlan = {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: string[]
  highlighted?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Basic",
    description: "For individuals and small events",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      "Up to 7 events",
      "Basic event management",
      "Email notifications",
      "Event page customization",
      "Mobile check-in",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "For growing businesses",
    price: {
      monthly: 7.99,
      yearly: 79,
    },
    features: [
      "Unlimited events",
      "All Basic features",
      "Custom branding",
      "Basic analytics",
      "Team collaboration (2 members)",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    description: "For established organizations",
    price: {
      monthly: 17.99,
      yearly: 179.9,
    },
    features: ["All Premium features", "Regional promotions"],
  },
]

/**
 * Get a subscription plan by ID
 */
export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find((plan) => plan.id === planId)
}

/**
 * Calculate the price with potential discount
 */
export function calculatePrice(plan: SubscriptionPlan, billingCycle: "monthly" | "yearly"): number {
  return plan.price[billingCycle]
}

/**
 * Check if a feature is available in a given plan
 */
export function isPlanFeatureAvailable(planId: string, featureKey: string): boolean {
  const plan = getPlanById(planId)
  if (!plan) return false

  // This is a simplified implementation - in a real app, you might have a more
  // structured approach to feature flags
  return plan.features.some((feature) => feature.toLowerCase().includes(featureKey.toLowerCase()))
}

export function hasPremiumAccess(user: any): boolean {
  return user?.subscription?.plan === "premium" || user?.subscription?.plan === "business"
}

