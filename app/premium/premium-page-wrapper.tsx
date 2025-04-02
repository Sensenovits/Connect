"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Palette, Megaphone, ClipboardCheck, MessageCircle, Users, ArrowRight } from "lucide-react"

const premiumFeatures = [
  {
    name: "Event Templates",
    description: "Create professional events faster with our pre-designed templates for any occasion.",
    href: "/premium/features/templates",
    icon: FileText,
    color: "bg-blue-50 text-blue-700",
  },
  {
    name: "Custom Themes",
    description: "Personalize your events with professional design themes and color schemes.",
    href: "/premium/features/themes",
    icon: Palette,
    color: "bg-purple-50 text-purple-700",
  },
  {
    name: "Promotion Tools",
    description: "Boost attendance with social media integration and email campaigns.",
    href: "/premium/features/promotion",
    icon: Megaphone,
    color: "bg-orange-50 text-orange-700",
  },
  {
    name: "RSVP Management",
    description: "Collect custom information from attendees and manage guest lists easily.",
    href: "/premium/features/rsvp",
    icon: ClipboardCheck,
    color: "bg-green-50 text-green-700",
  },
  {
    name: "Group Messaging",
    description: "Send updates and communicate with all attendees in one place.",
    href: "/premium/features/messaging",
    icon: MessageCircle,
    color: "bg-pink-50 text-pink-700",
  },
  {
    name: "Team Collaboration",
    description: "Collaborate with co-hosts to plan and manage events together.",
    href: "/premium/features/collaboration",
    icon: Users,
    color: "bg-cyan-50 text-cyan-700",
  },
]

export function PremiumPageWrapper() {
  const [mounted, setMounted] = useState(false)

  // Only render after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything during SSR
  if (!mounted) {
    return <div className="min-h-screen"></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Premium Features</h1>
        <p className="text-muted-foreground">
          Explore all the premium features available to enhance your event planning experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {premiumFeatures.map((feature) => {
          const Icon = feature.icon

          return (
            <Card key={feature.name} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-2`}>
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{feature.name}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={feature.href} className="w-full">
                  <Button variant="outline" className="w-full">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

