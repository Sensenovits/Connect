import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart3, Brush, MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremiumFeatureHeader } from "@/components/premium/premium-feature-header"
import { BrandingPreview } from "@/components/premium/branding-preview"
import { AnalyticsPreview } from "@/components/premium/analytics-preview"
import { MessagingPreview } from "@/components/premium/messaging-preview"
import { CollaborationPreview } from "@/components/premium/collaboration-preview"

export const metadata: Metadata = {
  title: "All Premium Features",
  description: "Explore all premium features available with your subscription",
}

export default function AllFeaturesPage() {
  return (
    <div className="container mx-auto py-8">
      <PremiumFeatureHeader
        title="All Premium Features"
        description="Explore all premium features available with your subscription"
        icon="Star"
      />

      <Tabs defaultValue="all" className="mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Features</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>Gain valuable insights into your events and attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Event Performance Dashboard</h3>
                      <p className="text-sm text-gray-600">
                        View key metrics for all your events in one centralized dashboard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Attendance Tracking</h3>
                      <p className="text-sm text-gray-600">
                        Monitor check-ins, no-shows, and attendance patterns across events
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Conversion Analytics</h3>
                      <p className="text-sm text-gray-600">
                        Measure registration to attendance conversion rates to optimize marketing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/premium/features/analytics" passHref>
                  <Button variant="outline" className="w-full">
                    Explore Analytics Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customization & Branding</CardTitle>
                <CardDescription>Create a unique and branded experience for your attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Brush className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Custom Branding</h3>
                      <p className="text-sm text-gray-600">
                        Add your logo, colors, and branding to create a cohesive experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brush className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Custom Email Templates</h3>
                      <p className="text-sm text-gray-600">
                        Create branded email templates for invitations, reminders, and follow-ups
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brush className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Custom Registration Forms</h3>
                      <p className="text-sm text-gray-600">
                        Design custom registration forms with your branding and required fields
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/premium/features/branding" passHref>
                  <Button variant="outline" className="w-full">
                    Explore Branding Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Communication</CardTitle>
                <CardDescription>Enhance communication with attendees and team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Advanced Messaging</h3>
                      <p className="text-sm text-gray-600">
                        Send targeted messages to specific attendee groups or individuals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Automated Notifications</h3>
                      <p className="text-sm text-gray-600">
                        Set up automated email and SMS reminders based on event timelines
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Feedback Collection</h3>
                      <p className="text-sm text-gray-600">
                        Create and send customized surveys to gather attendee feedback
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/premium/features/messaging" passHref>
                  <Button variant="outline" className="w-full">
                    Explore Communication Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Work seamlessly with your team to manage events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Team Management</h3>
                      <p className="text-sm text-gray-600">
                        Add team members and assign specific roles and permissions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Collaborative Planning</h3>
                      <p className="text-sm text-gray-600">
                        Plan and manage events collaboratively with shared access and tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Activity Tracking</h3>
                      <p className="text-sm text-gray-600">
                        Track team member activities and changes with detailed logs
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/premium/features/collaboration" passHref>
                  <Button variant="outline" className="w-full">
                    Explore Collaboration Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">How to Use Premium Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Navigate to the specific feature page from the Premium Features menu</li>
                    <li>Review the feature overview and capabilities</li>
                    <li>Follow the step-by-step instructions for each feature</li>
                    <li>Access settings by going to Settings {"->"} Premium Features</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">If you need assistance with any premium feature, we're here to help:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>
                      Check our{" "}
                      <Link href="/help" className="text-blue-600 hover:underline">
                        Help Center
                      </Link>{" "}
                      for detailed guides
                    </li>
                    <li>
                      Watch{" "}
                      <Link href="/tutorials" className="text-blue-600 hover:underline">
                        Video Tutorials
                      </Link>{" "}
                      for visual instructions
                    </li>
                    <li>
                      Contact our{" "}
                      <Link href="/support" className="text-blue-600 hover:underline">
                        Premium Support Team
                      </Link>{" "}
                      for personalized help
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Analytics & Reporting Features</CardTitle>
              <CardDescription>
                Gain valuable insights into your events and attendees with our comprehensive analytics tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Event Performance Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    View key metrics for all your events in one centralized dashboard. Track attendance, engagement, and
                    conversion rates to optimize your event strategy.
                  </p>
                  <AnalyticsPreview />
                  <div className="mt-4">
                    <Link href="/premium/features/analytics" passHref>
                      <Button>
                        Go to Analytics Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">Key Analytics Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Attendance Tracking</h4>
                      <p className="text-sm text-gray-600">
                        Monitor check-ins, no-shows, and attendance patterns across events
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Conversion Analytics</h4>
                      <p className="text-sm text-gray-600">
                        Measure registration to attendance conversion rates to optimize marketing
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Demographic Insights</h4>
                      <p className="text-sm text-gray-600">
                        Understand your audience with detailed demographic breakdowns
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">How to Use Analytics</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                    <li>Navigate to Premium Features {"->"} Analytics Dashboard</li>
                    <li>Select the time period you want to analyze</li>
                    <li>Filter by specific events or event types</li>
                    <li>Export reports in various formats for sharing or presentation</li>
                    <li>Set up scheduled reports to automatically track performance</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/premium/features/analytics" passHref>
                <Button className="w-full">
                  Explore Analytics Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Customization & Branding Features</CardTitle>
              <CardDescription>Create a unique and branded experience for your attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Custom Branding</h3>
                  <p className="text-gray-600 mb-4">
                    Add your logo, colors, and branding to create a cohesive experience across your event pages, emails,
                    and registration forms.
                  </p>
                  <BrandingPreview />
                  <div className="mt-4">
                    <Link href="/premium/features/branding" passHref>
                      <Button>
                        Go to Branding Settings
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">Key Customization Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Custom Email Templates</h4>
                      <p className="text-sm text-gray-600">
                        Create branded email templates for invitations, reminders, and follow-ups
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Custom Registration Forms</h4>
                      <p className="text-sm text-gray-600">
                        Design custom registration forms with your branding and required fields
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Custom Landing Pages</h4>
                      <p className="text-sm text-gray-600">
                        Create branded landing pages for your events with custom layouts and content
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">How to Use Branding Features</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                    <li>Go to Settings {"->"} Branding to upload your company logo</li>
                    <li>Set your brand colors and fonts in the Appearance tab</li>
                    <li>Customize email templates in the Communication section</li>
                    <li>Preview your branded content before publishing</li>
                    <li>Apply your branding consistently across all event materials</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/premium/features/branding" passHref>
                <Button className="w-full">
                  Explore Branding Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Advanced Communication Features</CardTitle>
              <CardDescription>Enhance communication with attendees and team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Advanced Messaging</h3>
                  <p className="text-gray-600 mb-4">
                    Send targeted messages to specific attendee groups or individuals. Create automated communication
                    workflows for different event stages.
                  </p>
                  <MessagingPreview />
                  <div className="mt-4">
                    <Link href="/premium/features/messaging" passHref>
                      <Button>
                        Go to Messaging Center
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">Key Communication Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Automated Notifications</h4>
                      <p className="text-sm text-gray-600">
                        Set up automated email and SMS reminders based on event timelines
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Feedback Collection</h4>
                      <p className="text-sm text-gray-600">
                        Create and send customized surveys to gather attendee feedback
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Multi-channel Communication</h4>
                      <p className="text-sm text-gray-600">Reach attendees via email, SMS, and in-app notifications</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">How to Use Communication Features</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                    <li>Navigate to Premium Features {"->"} Messaging Center</li>
                    <li>Create message templates for different communication needs</li>
                    <li>Set up automated communication workflows in the Automation tab</li>
                    <li>Segment your audience for targeted messaging</li>
                    <li>Track message delivery and engagement in the Analytics section</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/premium/features/messaging" passHref>
                <Button className="w-full">
                  Explore Communication Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Team Collaboration Features</CardTitle>
              <CardDescription>Work seamlessly with your team to manage events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Team Management</h3>
                  <p className="text-gray-600 mb-4">
                    Add team members and assign specific roles and permissions. Collaborate effectively with shared
                    access to event planning and management tools.
                  </p>
                  <CollaborationPreview />
                  <div className="mt-4">
                    <Link href="/premium/features/collaboration" passHref>
                      <Button>
                        Go to Team Management
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">Key Collaboration Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Collaborative Planning</h4>
                      <p className="text-sm text-gray-600">
                        Plan and manage events collaboratively with shared access and tools
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Activity Tracking</h4>
                      <p className="text-sm text-gray-600">
                        Track team member activities and changes with detailed logs
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Role-based Permissions</h4>
                      <p className="text-sm text-gray-600">Assign specific roles and access levels to team members</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">How to Use Collaboration Features</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                    <li>Go to Settings {"->"} Team to add team members</li>
                    <li>Assign appropriate roles and permissions to each team member</li>
                    <li>Use the shared calendar for collaborative planning</li>
                    <li>Track team activities in the Activity Log</li>
                    <li>Set up notifications for important team updates and changes</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/premium/features/collaboration" passHref>
                <Button className="w-full">
                  Explore Collaboration Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

