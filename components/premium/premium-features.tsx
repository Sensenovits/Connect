import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Palette, MessageSquare, Users } from "lucide-react"
import Link from "next/link"

const features = [
  {
    id: "analytics",
    title: "Event Analytics",
    description: "Gain valuable insights with detailed attendance data, demographics, and growth trends.",
    icon: BarChart3,
    color: "text-blue-500",
    href: "/premium/features/analytics",
  },
  {
    id: "branding",
    title: "Custom Branding",
    description: "Personalize your event pages with your logo, colors, and custom domain.",
    icon: Palette,
    color: "text-purple-500",
    href: "/premium/features/branding",
  },
  {
    id: "messaging",
    title: "Advanced Messaging",
    description: "Send targeted messages, schedule reminders, and create custom email templates.",
    icon: MessageSquare,
    color: "text-green-500",
    href: "/premium/features/messaging",
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    description: "Invite team members, assign roles, and work together seamlessly.",
    icon: Users,
    color: "text-orange-500",
    href: "/premium/features/collaboration",
  },
]

export function PremiumFeatures() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Premium Features</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Unlock these powerful features to take your events to the next level
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link key={feature.id} href={feature.href} className="block h-full">
              <Card className="h-full transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-600">Learn more →</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

