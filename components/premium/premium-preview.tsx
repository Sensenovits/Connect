"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, Palette, MessageSquare, Lock } from "lucide-react"
import Link from "next/link"
import { useUserStore } from "@/lib/user-store"
import { AnalyticsPreview } from "./analytics-preview"
import { BrandingPreview } from "./branding-preview"
import { MessagingPreview } from "./messaging-preview"
import { CollaborationPreview } from "./collaboration-preview"
import { hasPremiumAccess } from "@/lib/subscription-service"

export function PremiumPreview() {
  const [activeTab, setActiveTab] = useState("analytics")
  const { currentUser } = useUserStore()
  const isPremium = currentUser ? hasPremiumAccess(currentUser) : false

  const features = [
    {
      id: "analytics",
      title: "Event Analytics",
      icon: BarChart3,
      description: "Track attendance, engagement, and growth metrics for your events.",
      color: "bg-blue-100 text-blue-600",
      component: AnalyticsPreview,
    },
    {
      id: "branding",
      title: "Custom Branding",
      icon: Palette,
      description: "Add your own logo, colors, and styling to your event pages.",
      color: "bg-purple-100 text-purple-600",
      component: BrandingPreview,
    },
    {
      id: "messaging",
      title: "Advanced Messaging",
      icon: MessageSquare,
      description: "Send targeted communications to specific groups of participants.",
      color: "bg-green-100 text-green-600",
      component: MessagingPreview,
    },
    {
      id: "collaboration",
      title: "Team Collaboration",
      icon: Users,
      description: "Invite team members to help manage your events with custom permissions.",
      color: "bg-amber-100 text-amber-600",
      component: CollaborationPreview,
    },
  ]

  const currentFeature = features.find((f) => f.id === activeTab) || features[0]
  const FeaturePreview = currentFeature.component

  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <CardTitle className="text-xl text-blue-700">Premium Features Preview</CardTitle>
        <CardDescription>Get a glimpse of what you'll unlock with a premium subscription</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="analytics" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-none grid grid-cols-4">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id} className="text-xs md:text-sm">
                <feature.icon className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeTab} className="m-0">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-full ${currentFeature.color} flex items-center justify-center mr-3`}>
                  <currentFeature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{currentFeature.title}</h3>
                  <p className="text-sm text-gray-600">{currentFeature.description}</p>
                </div>
              </div>

              <div className="relative mt-4 rounded-md overflow-hidden">
                <FeaturePreview />

                {!isPremium && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                    <Lock className="h-10 w-10 text-white mb-2" />
                    <p className="text-white font-medium text-center px-4">Upgrade to Premium to unlock this feature</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {!isPremium && (
        <CardFooter className="bg-gray-50 border-t">
          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-gray-600">Unlock all premium features</p>
            <Link href="/premium/pricing">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Upgrade Now
              </Button>
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

