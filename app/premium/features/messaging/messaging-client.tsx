"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Users, Clock, Send, Plus, Image, Paperclip } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { PremiumRequired } from "@/components/premium-required"

const messages = [
  {
    id: 1,
    sender: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Hi everyone! I'm excited to share some updates about our beach party next week.",
    time: "10:30 AM",
    isYou: true,
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Looking forward to it! Will there be a bonfire?",
    time: "10:32 AM",
    isYou: false,
  },
  {
    id: 3,
    sender: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I can bring some extra chairs if needed.",
    time: "10:35 AM",
    isYou: false,
  },
  {
    id: 4,
    sender: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Yes, we'll have a bonfire! And thanks Michael, that would be great. We could use about 5 more chairs.",
    time: "10:38 AM",
    isYou: true,
  },
  {
    id: 5,
    sender: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I'll bring some snacks and drinks to share!",
    time: "10:40 AM",
    isYou: false,
  },
]

const scheduledMessages = [
  {
    id: 1,
    title: "Day Before Reminder",
    content: "Just a reminder that our beach party is tomorrow! Don't forget to bring sunscreen and a towel.",
    scheduledFor: "July 14, 2023 • 10:00 AM",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Morning of Event",
    content: "The beach party is today! We're setting up now and will be ready by 2 PM. Can't wait to see you all!",
    scheduledFor: "July 15, 2023 • 8:00 AM",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Weather Update",
    content: "Good news! The weather forecast shows sunny skies for our beach party. It's going to be perfect!",
    scheduledFor: "July 13, 2023 • 6:00 PM",
    status: "sent",
  },
]

const guestList = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "pending",
  },
  {
    id: 3,
    name: "David Lee",
    email: "david.lee@example.com",
    status: "rejected",
  },
]

export function MessagingClient() {
  const { hasPremiumAccess } = usePremium()
  const [activeTab, setActiveTab] = useState("chat")
  const [messageText, setMessageText] = useState("")

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    alert(`Sending message: "${messageText}"! In a real app, this would send your message to the group.`)
    setMessageText("")
  }

  const handleAddPeople = () => {
    alert("In a real app, this would open a dialog to add people to the chat.")
  }

  const handleCreateScheduledMessage = () => {
    alert("In a real app, this would open a form to create a new scheduled message.")
  }

  const handleEditScheduledMessage = (id: number) => {
    alert(`Editing scheduled message #${id}! In a real app, this would open an edit form.`)
  }

  const handleCancelScheduledMessage = (id: number) => {
    alert(`Canceling scheduled message #${id}! In a real app, this would cancel the scheduled message.`)
  }

  const handleAddAttendee = () => {
    alert("In a real app, this would open a form to add a new attendee.")
  }

  const handleMessageAttendee = (name: string) => {
    alert(`Messaging ${name}! In a real app, this would open a direct message conversation.`)
  }

  const handleRemoveAttendee = (name: string) => {
    alert(`Removing ${name} from the chat! In a real app, this would remove the attendee.`)
  }

  if (!hasPremiumAccess) {
    return (
      <PremiumRequired
        featureName="Group Messaging"
        description="Send updates and communicate with all attendees in one place"
      >
        <div>This content is only visible with premium access</div>
      </PremiumRequired>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Group Messaging</h1>
        <p className="text-muted-foreground">Send updates and communicate with all attendees in one place</p>
      </div>

      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="chat" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Group Chat
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Scheduled Messages
          </TabsTrigger>
          <TabsTrigger value="attendees" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Attendees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-0">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Summer Beach Party</CardTitle>
                  <CardDescription>6 participants • 3 online</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleAddPeople}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add People
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isYou ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[80%] ${message.isYou ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className={`h-8 w-8 ${message.isYou ? "ml-2" : "mr-2"}`}>
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.isYou ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                        <div
                          className={`text-xs mt-1 flex items-center ${
                            message.isYou ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span className="text-muted-foreground">{message.time}</span>
                          {message.isYou && <span className="ml-2 text-muted-foreground">Read</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-3">
              <div className="flex items-center w-full gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Scheduled Messages</CardTitle>
                  <CardDescription>Plan and automate messages to your attendees</CardDescription>
                </div>
                <Button onClick={handleCreateScheduledMessage}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledMessages.map((message) => (
                  <Card key={message.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{message.title}</CardTitle>
                          <CardDescription>Scheduled for: {message.scheduledFor}</CardDescription>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            message.status === "sent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {message.status === "sent" ? "Sent" : "Scheduled"}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm">{message.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 border-t pt-3">
                      <Button variant="outline" size="sm" onClick={() => handleEditScheduledMessage(message.id)}>
                        Edit
                      </Button>
                      {message.status !== "sent" && (
                        <Button variant="outline" size="sm" onClick={() => handleCancelScheduledMessage(message.id)}>
                          Cancel
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendees" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Attendees</CardTitle>
                  <CardDescription>Manage who can access the group chat</CardDescription>
                </div>
                <Button onClick={handleAddAttendee}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Attendee
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 border-b bg-muted/50">
                  <Input placeholder="Search attendees..." className="max-w-sm" />
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Email</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guestList.map((guest) => (
                      <tr key={guest.id} className="border-b">
                        <td className="p-3 font-medium">{guest.name}</td>
                        <td className="p-3 text-muted-foreground">{guest.email}</td>
                        <td className="p-3">
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              guest.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : guest.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleMessageAttendee(guest.name)}>
                              Message
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => handleRemoveAttendee(guest.name)}
                            >
                              Remove
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

