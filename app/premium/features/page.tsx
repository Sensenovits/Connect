"use client"

import { useState } from "react"
import { Header } from "@/components/navigation/header"
import { FooterNav } from "@/components/navigation/footer-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Palette,
  MessageSquare,
  Users,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
  Filter,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useUserStore } from "@/lib/user-store"
import { hasPremiumAccess } from "@/lib/subscription-service"
import { PremiumNavigation } from "@/components/premium/premium-navigation"
import { PremiumPreview } from "@/components/premium/premium-preview"

// Update the features array with more detailed categorization
const features = [
  {
    id: "analytics",
    title: "Event Analytics",
    description: "Gain valuable insights with detailed attendance data, demographics, and growth trends.",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    category: "analytics",
    href: "/premium/features/analytics",
  },
  {
    id: "attendance-tracking",
    title: "Attendance Tracking",
    description: "Track check-ins, no-shows, and attendance patterns across all your events.",
    icon: CheckCircle2,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    category: "analytics",
    href: "/premium/features/analytics",
  },
  {
    id: "conversion-metrics",
    title: "Conversion Metrics",
    description: "Measure registration to attendance conversion rates and optimize your event marketing.",
    icon: Filter,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    category: "analytics",
    href: "/premium/features/analytics",
  },
  {
    id: "branding",
    title: "Custom Branding",
    description: "Personalize your event pages with your logo, colors, and custom domain.",
    icon: Palette,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    category: "customization",
    href: "/premium/features/branding",
  },
  {
    id: "custom-themes",
    title: "Custom Themes",
    description: "Create and save multiple themes to maintain consistent branding across all events.",
    icon: Palette,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    category: "customization",
    href: "/premium/features/branding",
  },
  {
    id: "messaging",
    title: "Advanced Messaging",
    description: "Send targeted messages, schedule reminders, and create custom email templates.",
    icon: MessageSquare,
    color: "text-green-500",
    bgColor: "bg-green-100",
    category: "communication",
    href: "/premium/features/messaging",
  },
  {
    id: "scheduled-messages",
    title: "Scheduled Messages",
    description: "Plan and schedule messages to be sent at specific times before or after your events.",
    icon: Clock,
    color: "text-green-500",
    bgColor: "bg-green-100",
    category: "communication",
    href: "/premium/features/messaging",
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    description: "Invite team members, assign roles, and work together seamlessly.",
    icon: Users,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    category: "productivity",
    href: "/premium/features/collaboration",
  },
  {
    id: "role-management",
    title: "Role Management",
    description: "Define custom roles and permissions for your team members to control access.",
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    category: "productivity",
    href: "/premium/features/collaboration",
  },
  {
    id: "unlimited",
    title: "Unlimited Events",
    description: "Create as many events as you need without any restrictions or limitations.",
    icon: Zap,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
    category: "core",
    href: "/premium/features",
  },
  {
    id: "priority",
    title: "Priority Support",
    description: "Get faster responses and dedicated assistance from our support team.",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-100",
    category: "support",
    href: "/premium/features",
  },
  {
    id: "early",
    title: "Early Access",
    description: "Be the first to try new features and improvements before they're widely released.",
    icon: Clock,
    color: "text-cyan-500",
    bgColor: "bg-cyan-100",
    category: "core",
    href: "/premium/features",
  },
]

// Define feature categories with more descriptive names
const categories = [
  { id: "all", name: "All Features" },
  { id: "analytics", name: "Analytics" },
  { id: "customization", name: "Customization" },
  { id: "communication", name: "Communication" },
  { id: "productivity", name: "Productivity" },
  { id: "core", name: "Core Benefits" },
  { id: "support", name: "Support" },
]

export default function FeaturesPage() {
  const { currentUser } = useUserStore()
  const isPremium = currentUser ? hasPremiumAccess(currentUser) : false
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter features based on selected category
  const filteredFeatures =
    activeCategory === "all" ? features : features.filter((feature) => feature.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Premium Features" showBackButton />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Premium Features</h1>
            <PremiumNavigation />
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-center">
              <p className="text-blue-800 mb-2">Want to see all premium features in one place?</p>
              <Link href="/premium/features/all">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                  View All Features <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Discover all the powerful features available with your premium subscription
            </p>
          </div>

          {/* Premium Status Banner */}
          {isPremium ? (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <h3 className="font-medium text-green-800">Premium Active</h3>
                  <p className="text-green-700 text-sm">You have access to all premium features</p>
                </div>
              </div>
              <Link href="/account/subscription">
                <Button variant="outline" size="sm">
                  Manage Subscription
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-6 w-6 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-medium text-blue-800">Upgrade to Premium</h3>
                  <p className="text-blue-700 text-sm">
                    Unlock all these features and take your events to the next level
                  </p>
                </div>
              </div>
              <Link href="/premium/pricing">
                <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                  View Pricing
                </Button>
              </Link>
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-8 overflow-x-auto">
            <div className="inline-flex space-x-2 min-w-full pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature) => (
              <Link key={feature.id} href={feature.href} className="block h-full">
                <Card className="h-full hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    {feature.href.includes("/premium/features/") && (
                      <p className="text-blue-600 font-medium">Learn more →</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Premium Preview */}
          {!isPremium && (
            <div className="mt-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Preview Premium Features</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Get a glimpse of what you'll unlock with a premium subscription
                </p>
              </div>

              <PremiumPreview />

              <div className="text-center mt-8">
                <Link href="/premium/pricing">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-bold text-lg mb-2">How do I access premium features?</h3>
                <p className="text-gray-600">
                  After upgrading to premium, all features will be automatically unlocked in your account. You can
                  access them from the main dashboard or through the premium features page.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Can I use premium features on multiple events?</h3>
                <p className="text-gray-600">
                  Yes, your premium subscription applies to all events you create. There's no limit to how many events
                  can benefit from premium features.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Will I lose data if I downgrade from premium?</h3>
                <p className="text-gray-600">
                  No, you won't lose any data if you downgrade. However, you'll no longer have access to premium
                  features, and some premium-specific settings may be reverted to default.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Can I request new premium features?</h3>
                <p className="text-gray-600">
                  We love hearing from our users. You can submit feature requests through the feedback form in your
                  account settings or by contacting our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterNav />
    </div>
  )
}

