"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PremiumFeatureHeader } from "@/components/premium/premium-feature-header"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, formatDate } from "@/lib/utils"
import { CalendarIcon, Clock, Edit, Plus, Search, Trash2, Users } from "lucide-react"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"

// Sample message templates
const messageTemplates = [
  {
    id: "template-1",
    name: "Event Reminder",
    subject: "Reminder: {{event_name}} is tomorrow!",
    content:
      "Hello {{recipient_name}},\n\nThis is a friendly reminder that {{event_name}} is happening tomorrow at {{event_time}}. We're looking forward to seeing you there!\n\nBest regards,\n{{organizer_name}}",
    lastUsed: "2023-11-15T10:30:00Z",
    category: "reminder",
  },
  {
    id: "template-2",
    name: "Thank You",
    subject: "Thank you for attending {{event_name}}",
    content:
      "Dear {{recipient_name}},\n\nThank you for attending {{event_name}}. We hope you enjoyed the event and found it valuable. We would appreciate your feedback to help us improve future events.\n\nBest regards,\n{{organizer_name}}",
    lastUsed: "2023-11-10T14:45:00Z",
    category: "follow-up",
  },
  {
    id: "template-3",
    name: "Event Cancellation",
    subject: "Important: {{event_name}} has been cancelled",
    content:
      "Dear {{recipient_name}},\n\nWe regret to inform you that {{event_name}} scheduled for {{event_date}} has been cancelled due to unforeseen circumstances. We apologize for any inconvenience this may cause.\n\nBest regards,\n{{organizer_name}}",
    lastUsed: null,
    category: "notification",
  },
]

// Sample scheduled messages
const scheduledMessages = [
  {
    id: "scheduled-1",
    template: "Event Reminder",
    event: "Tech Conference 2023",
    scheduledDate: "2023-12-10T08:00:00Z",
    recipients: 145,
    status: "scheduled",
  },
  {
    id: "scheduled-2",
    template: "Thank You",
    event: "Product Launch",
    scheduledDate: "2023-12-05T09:30:00Z",
    recipients: 78,
    status: "scheduled",
  },
  {
    id: "scheduled-3",
    template: "Event Update",
    event: "Annual Meetup",
    scheduledDate: "2023-11-28T10:00:00Z",
    recipients: 210,
    status: "sent",
  },
]

// Sample analytics data
const analyticsData = {
  totalSent: 1245,
  openRate: 68.4,
  clickRate: 32.7,
  responseRate: 12.3,
  topPerforming: "Event Reminder",
  byTemplate: [
    { name: "Event Reminder", sent: 580, opened: 435, clicked: 210 },
    { name: "Thank You", sent: 420, opened: 290, clicked: 125 },
    { name: "Event Cancellation", sent: 245, opened: 128, clicked: 72 },
  ],
}

export function AdvancedMessagingClient() {
  const [activeTab, setActiveTab] = useState("compose")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PremiumFeatureHeader
        title="Advanced Messaging"
        description="Create, schedule, and manage communications with your event attendees"
        icon={<Users className="h-6 w-6" />}
      />

      <Tabs defaultValue="compose" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Compose Tab */}
        <TabsContent value="compose" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose New Message</CardTitle>
              <CardDescription>Create a new message to send to your event attendees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event">Event</Label>
                    <Select defaultValue="tech-conf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech-conf">Tech Conference 2023</SelectItem>
                        <SelectItem value="product-launch">Product Launch</SelectItem>
                        <SelectItem value="annual-meetup">Annual Meetup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Template (Optional)</Label>
                    <Select onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {messageTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Attendees</SelectItem>
                      <SelectItem value="registered">Registered Only</SelectItem>
                      <SelectItem value="attended">Attended Only</SelectItem>
                      <SelectItem value="no-show">No-Shows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter message subject"
                    defaultValue={
                      selectedTemplate ? messageTemplates.find((t) => t.id === selectedTemplate)?.subject : ""
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className="min-h-[200px]"
                    defaultValue={
                      selectedTemplate ? messageTemplates.find((t) => t.id === selectedTemplate)?.content : ""
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="schedule" />
                  <Label htmlFor="schedule">Schedule for later</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="time" type="time" defaultValue="09:00" />
                      <Select defaultValue="recipient">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recipient">Recipient's Time Zone</SelectItem>
                          <SelectItem value="sender">Your Time Zone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="save-template" />
                  <Label htmlFor="save-template">Save as template</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input id="template-name" placeholder="Enter template name" disabled />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Preview</Button>
              <div className="space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Send Now</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search templates..." className="pl-8" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {messageTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-1">{template.subject}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="text-sm text-muted-foreground line-clamp-3">{template.content}</div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <div className="text-xs text-muted-foreground">
                    {template.lastUsed ? `Last used: ${formatDate(template.lastUsed, "MMM d, yyyy")}` : "Never used"}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search scheduled messages..." className="pl-8" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Schedule Message
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Messages</CardTitle>
              <CardDescription>View and manage your scheduled messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>Event</div>
                  <div>Template</div>
                  <div>Scheduled For</div>
                  <div>Recipients</div>
                  <div>Status</div>
                </div>
                {scheduledMessages.map((message) => (
                  <div key={message.id} className="grid grid-cols-5 p-4 border-b last:border-0 items-center">
                    <div>{message.event}</div>
                    <div>{message.template}</div>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(message.scheduledDate, "MMM d, yyyy")}</span>
                      <Clock className="mx-2 h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(message.scheduledDate, "h:mm a")}</span>
                    </div>
                    <div>{message.recipients} recipients</div>
                    <div>
                      <Badge variant={message.status === "sent" ? "secondary" : "outline"}>
                        {message.status === "sent" ? "Sent" : "Scheduled"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalSent}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.openRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Click Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.clickRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.responseRate}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Message Performance</CardTitle>
              <CardDescription>Performance metrics for your message templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Template</div>
                  <div>Sent</div>
                  <div>Opened</div>
                  <div>Clicked</div>
                </div>
                {analyticsData.byTemplate.map((template, index) => (
                  <div key={index} className="grid grid-cols-4 p-4 border-b last:border-0 items-center">
                    <div>{template.name}</div>
                    <div>{template.sent}</div>
                    <div>
                      {template.opened} ({Math.round((template.opened / template.sent) * 100)}%)
                    </div>
                    <div>
                      {template.clicked} ({Math.round((template.clicked / template.sent) * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Settings</CardTitle>
              <CardDescription>Configure your messaging preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sender Information</h4>
                    <p className="text-sm text-muted-foreground">Configure the default sender name and email</p>
                  </div>
                  <Button variant="outline">Edit</Button>
                </div>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input id="sender-name" defaultValue="Event Organizer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Sender Email</Label>
                    <Input id="sender-email" defaultValue="events@example.com" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="font-medium">Email Signature</h4>
                    <p className="text-sm text-muted-foreground">Set your default email signature</p>
                  </div>
                  <Button variant="outline">Edit</Button>
                </div>
                <Separator />

                <Textarea className="min-h-[100px]" defaultValue="Best regards,\nThe Event Team\nwww.example.com" />

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h4 className="font-medium">Notification Preferences</h4>
                    <p className="text-sm text-muted-foreground">Configure when you receive notifications</p>
                  </div>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="message-sent">Message Sent</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when messages are sent</p>
                    </div>
                    <Switch id="message-sent" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high-open-rate">High Open Rate</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for high performing messages
                      </p>
                    </div>
                    <Switch id="high-open-rate" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="low-open-rate">Low Open Rate</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for underperforming messages
                      </p>
                    </div>
                    <Switch id="low-open-rate" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

