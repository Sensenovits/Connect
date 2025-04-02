"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Mail, Share, Facebook, Twitter, Instagram, Send, Clock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function PromotionClient() {
  const [emailSubject, setEmailSubject] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [emailRecipients, setEmailRecipients] = useState("")
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined)
  const [showSchedule, setShowSchedule] = useState(false)

  const handleSendEmail = () => {
    if (!emailSubject || !emailContent || !emailRecipients) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Email Campaign Created",
      description: scheduleDate
        ? `Your email will be sent on ${format(scheduleDate, "PPP")}`
        : "Your email has been sent successfully!",
    })

    // Reset form
    setEmailSubject("")
    setEmailContent("")
    setEmailRecipients("")
    setScheduleDate(undefined)
    setShowSchedule(false)
  }

  const handleShareSocial = (platform: string) => {
    toast({
      title: `Shared on ${platform}`,
      description: `Your event has been shared on ${platform} successfully!`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Promotion Tools</h2>
        <p className="text-muted-foreground">Promote your events through email campaigns and social media</p>
      </div>

      <Tabs defaultValue="email">
        <TabsList>
          <TabsTrigger value="email">Email Campaigns</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Email Campaign</CardTitle>
              <CardDescription>Send personalized emails to promote your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Input
                  id="recipients"
                  placeholder="Enter email addresses (comma separated)"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your email content here"
                  className="min-h-[200px]"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" type="button" onClick={() => setShowSchedule(!showSchedule)}>
                  <Clock className="mr-2 h-4 w-4" />
                  {showSchedule ? "Cancel Scheduling" : "Schedule for Later"}
                </Button>
              </div>

              {showSchedule && (
                <div className="pt-2">
                  <Label>Schedule Date</Label>
                  <div className="pt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              {scheduleDate && (
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    Your email will be scheduled for {format(scheduleDate, "PPP")}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSendEmail}>
                <Send className="mr-2 h-4 w-4" />
                {scheduleDate ? "Schedule Email" : "Send Now"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Choose from pre-designed email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Event Announcement", "Reminder", "Thank You"].map((template) => (
                  <Card key={template} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                        <Mail className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">{template}</h3>
                      <p className="text-sm text-muted-foreground">
                        Professional {template.toLowerCase()} email template
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Share on Social Media</CardTitle>
              <CardDescription>Promote your event on popular social media platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Write your social media message here" className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="bg-blue-100 rounded-full p-3 mb-2">
                      <Facebook className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium">Facebook</h3>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => handleShareSocial("Facebook")}>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="bg-blue-100 rounded-full p-3 mb-2">
                      <Twitter className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-medium">Twitter</h3>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => handleShareSocial("Twitter")}>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-pink-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="bg-pink-100 rounded-full p-3 mb-2">
                      <Instagram className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="font-medium">Instagram</h3>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => handleShareSocial("Instagram")}>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Analytics</CardTitle>
              <CardDescription>Track the performance of your social media promotions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Share your event on social media to start tracking analytics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

