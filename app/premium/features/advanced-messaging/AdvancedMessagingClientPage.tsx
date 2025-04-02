"use client"

import { MessageSquare, BarChart3, Settings, Palette, FileText } from "lucide-react"

import { PremiumFeatureHeader } from "@/components/premium/premium-feature-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdvancedMessagingClientPage() {
  return (
    <div className="container mx-auto py-8">
      <PremiumFeatureHeader
        title="Advanced Messaging"
        description="Enhance communication with attendees and team members"
        icon="MessageSquare"
      />

      <Tabs defaultValue="compose" className="mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Message</CardTitle>
                  <CardDescription>Create and send messages to your event attendees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="message-type">Message Type</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-blue-50 border-blue-200">
                        Email
                      </Button>
                      <Button variant="outline" className="flex-1">
                        SMS
                      </Button>
                      <Button variant="outline" className="flex-1">
                        In-App
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message-subject">Subject Line</Label>
                    <Input id="message-subject" placeholder="Enter subject line" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="message-content">Message Content</Label>
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-xs text-blue-600 hover:underline"
                          onClick={() => alert("Insert variable functionality will be available in the next update")}
                        >
                          Insert Variable
                        </button>
                        <button
                          className="text-xs text-blue-600 hover:underline"
                          onClick={() => alert("Add media functionality will be available in the next update")}
                        >
                          Add Media
                        </button>
                      </div>
                    </div>
                    <textarea
                      id="message-content"
                      className="w-full p-2 border rounded-md min-h-[200px]"
                      placeholder="Enter your message content here..."
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="border rounded-md p-4 bg-gray-50 min-h-[100px]">
                      <div className="bg-white rounded-md p-3 shadow-sm">
                        <p className="font-medium mb-2">Important Update About Your Event</p>
                        <p className="text-sm text-gray-600">Hello [Attendee Name],</p>
                        <p className="text-sm text-gray-600 mt-2">
                          We're excited to share some important updates about the upcoming event...
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => alert("Draft saved successfully!")}>
                    Save Draft
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => alert("Test message sent successfully!")}>
                      Test Send
                    </Button>
                    <Button onClick={() => alert("Message sent successfully!")}>Send Message</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                  <CardDescription>Select who will receive this message</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-type">Recipient Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="recipient-type">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Attendees</SelectItem>
                        <SelectItem value="registered">Registered but not attended</SelectItem>
                        <SelectItem value="vip">VIP Attendees</SelectItem>
                        <SelectItem value="custom">Custom Segment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-select">Select Event</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="event-select">
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="conference">Annual Conference 2023</SelectItem>
                        <SelectItem value="webinar">Product Launch Webinar</SelectItem>
                        <SelectItem value="workshop">Workshop Series</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">Advanced Filtering</Label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="filter-registered" className="mr-2" />
                        <Label htmlFor="filter-registered" className="text-sm font-normal">
                          Registered Only
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="filter-attended" className="mr-2" />
                        <Label htmlFor="filter-attended" className="text-sm font-normal">
                          Attended Previous Events
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="filter-location" className="mr-2" />
                        <Label htmlFor="filter-location" className="text-sm font-normal">
                          Specific Location
                        </Label>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => alert("Filter functionality will be available in the next update")}
                      >
                        Add More Filters
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Recipient Summary</Label>
                      <Badge>243 Recipients</Badge>
                    </div>
                    <div className="border rounded-md p-3 bg-gray-50 text-sm">
                      <p>• All attendees from Annual Conference 2023</p>
                      <p>• Who registered but did not attend</p>
                      <p>• Located in North America</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => alert("Recipient list preview will be available in the next update")}
                  >
                    Preview Recipient List
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Delivery Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="delivery-time">Delivery Time</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-blue-50 border-blue-200">
                        Send Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => alert("Schedule functionality will be available in the next update")}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center">
                    <Checkbox id="track-opens" className="mr-2" defaultChecked />
                    <Label htmlFor="track-opens" className="text-sm font-normal">
                      Track Opens and Clicks
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Create and manage reusable message templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <Input placeholder="Search templates..." className="w-64" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="inapp">In-App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => alert("Template creation will be available in the next update")}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Template cards would go here */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Email</Badge>
                      <h3 className="font-medium">Event Reminder</h3>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => alert("Template styling will be available in the next update")}
                      >
                        <Palette className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => alert("Template editing will be available in the next update")}
                      >
                        <FileText className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Reminder email sent 24 hours before event start</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Last edited: 2 days ago</span>
                    <Button variant="outline" size="sm" onClick={() => alert("Template applied successfully!")}>
                      Use
                    </Button>
                  </div>
                </div>

                {/* More template cards would be here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Automation</CardTitle>
              <CardDescription>Set up automated messaging workflows for your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Automation Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Our automation features are currently in development. Soon you'll be able to create powerful messaging
                  workflows for your events.
                </p>
                <Button
                  variant="outline"
                  onClick={() => alert("You'll be notified when automation features are available")}
                >
                  Get Notified When Available
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Messaging Analytics</CardTitle>
              <CardDescription>Track the performance of your messages and campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Message analytics features are currently in development. Soon you'll be able to track open rates,
                  click-through rates, and more.
                </p>
                <Button
                  variant="outline"
                  onClick={() => alert("You'll be notified when analytics features are available")}
                >
                  Get Notified When Available
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Messaging Settings</CardTitle>
              <CardDescription>Configure your messaging preferences and defaults</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Settings Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Advanced messaging settings are currently in development. Soon you'll be able to configure sender
                  details, delivery preferences, and more.
                </p>
                <Button
                  variant="outline"
                  onClick={() => alert("You'll be notified when settings features are available")}
                >
                  Get Notified When Available
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

