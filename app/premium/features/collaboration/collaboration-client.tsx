"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Users,
  Calendar,
  CheckSquare,
  MessageSquare,
  Plus,
  Clock,
  User,
  Mail,
  UserPlus,
  MoreHorizontal,
  Send,
} from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { PremiumRequired } from "@/components/premium-required"

const teamMembers = [
  {
    id: 1,
    name: "You (Owner)",
    email: "you@example.com",
    role: "Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Co-host",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Team Member",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Team Member",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const tasks = [
  { id: 1, title: "Book beach location", assignee: "You", dueDate: "Jun 15", status: "completed" },
  { id: 2, title: "Order food and drinks", assignee: "Sarah Johnson", dueDate: "Jul 1", status: "in-progress" },
  { id: 3, title: "Arrange music and speakers", assignee: "Michael Brown", dueDate: "Jul 5", status: "in-progress" },
  { id: 4, title: "Send invitations", assignee: "You", dueDate: "Jun 20", status: "completed" },
  { id: 5, title: "Buy decorations", assignee: "Emily Davis", dueDate: "Jul 10", status: "not-started" },
  { id: 6, title: "Coordinate transportation", assignee: "Sarah Johnson", dueDate: "Jul 12", status: "not-started" },
]

export function CollaborationClient() {
  const { hasPremiumAccess } = usePremium()
  const [activeTab, setActiveTab] = useState("team")

  const handleInviteMember = () => {
    alert("In a real app, this would open a form to invite a new team member.")
  }

  const handleMessageMember = (name: string) => {
    alert(`Messaging ${name}! In a real app, this would open a direct message conversation.`)
  }

  const handleResendInvitation = () => {
    alert("Invitation resent! In a real app, this would resend the invitation email.")
  }

  const handleCancelInvitation = () => {
    alert("Invitation canceled! In a real app, this would cancel the pending invitation.")
  }

  const handleAddTask = () => {
    alert("In a real app, this would open a form to add a new task.")
  }

  const handleToggleTaskStatus = (taskId: number, completed: boolean) => {
    alert(
      `Task #${taskId} marked as ${completed ? "completed" : "incomplete"}! In a real app, this would update the task status.`,
    )
  }

  const handleAddEvent = () => {
    alert("In a real app, this would open a form to add a new calendar event.")
  }

  if (!hasPremiumAccess) {
    return (
      <PremiumRequired
        featureName="Team Collaboration"
        description="Collaborate with co-hosts to plan and manage events together"
      >
        <div>This content is only visible with premium access</div>
      </PremiumRequired>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Team Collaboration</h1>
        <p className="text-muted-foreground">Collaborate with co-hosts to plan and manage events together</p>
      </div>

      <Tabs defaultValue="team" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="team" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center">
            <CheckSquare className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Team Calendar
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Team Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Team Members</CardTitle>
                  <CardDescription>Manage your event planning team</CardDescription>
                </div>
                <Button onClick={handleInviteMember}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Email</th>
                      <th className="p-3 text-left font-medium">Role</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b">
                        <td className="p-3">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">{member.email}</td>
                        <td className="p-3">
                          <Badge variant={member.role === "Owner" ? "default" : "outline"}>{member.role}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleMessageMember(member.name)}>
                              <Mail className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            {member.role !== "Owner" && (
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Pending Invitations</h3>
                <div className="rounded-md border p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">david@example.com</p>
                    <p className="text-sm text-muted-foreground">Invited 2 days ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleResendInvitation}>
                      Resend
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={handleCancelInvitation}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Tasks</CardTitle>
                  <CardDescription>Track and manage event planning tasks</CardDescription>
                </div>
                <Button onClick={handleAddTask}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Overall Progress</h3>
                    <p className="text-sm text-muted-foreground">2 of 6 tasks completed</p>
                  </div>
                  <div className="text-sm font-medium">33%</div>
                </div>
                <Progress value={33} className="h-2" />

                <div className="rounded-md border mt-6">
                  <div className="p-4 border-b bg-muted/50 flex justify-between items-center">
                    <Input placeholder="Search tasks..." className="max-w-sm" />
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Filter by Assignee
                      </Button>
                      <Button variant="outline" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Sort by Due Date
                      </Button>
                    </div>
                  </div>
                  <div className="divide-y">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.status === "completed"}
                            onCheckedChange={(checked) => handleToggleTaskStatus(task.id, !!checked)}
                            className="mr-3"
                          />
                          <div>
                            <Label
                              htmlFor={`task-${task.id}`}
                              className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                            >
                              {task.title}
                            </Label>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <span className="mr-3">Assigned to: {task.assignee}</span>
                              <span>Due: {task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "default"
                                : task.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {task.status === "completed"
                              ? "Completed"
                              : task.status === "in-progress"
                                ? "In Progress"
                                : "Not Started"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Team Calendar</CardTitle>
                  <CardDescription>Coordinate schedules and deadlines</CardDescription>
                </div>
                <Button onClick={handleAddEvent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg">July 2023</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                  <div className="text-sm font-medium">Sun</div>
                  <div className="text-sm font-medium">Mon</div>
                  <div className="text-sm font-medium">Tue</div>
                  <div className="text-sm font-medium">Wed</div>
                  <div className="text-sm font-medium">Thu</div>
                  <div className="text-sm font-medium">Fri</div>
                  <div className="text-sm font-medium">Sat</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const hasEvent = [1, 5, 10, 15, 20].includes(day)
                    const isToday = day === 7

                    return (
                      <div
                        key={day}
                        className={`aspect-square border rounded-md flex flex-col p-1 ${
                          isToday ? "bg-primary/10 border-primary" : ""
                        }`}
                      >
                        <div className="text-right text-sm">{day}</div>
                        {hasEvent && (
                          <div className="mt-auto">
                            <div className="text-xs bg-primary/20 rounded p-0.5 truncate">
                              {day === 1 && "Team Meeting"}
                              {day === 5 && "Order Deadline"}
                              {day === 10 && "Venue Visit"}
                              {day === 15 && "Beach Party"}
                              {day === 20 && "Debrief"}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Team Planning Meeting</h4>
                        <p className="text-sm text-muted-foreground">July 1, 2023 • 10:00 AM - 11:00 AM</p>
                      </div>
                      <Badge>Today</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Discuss final preparations for the beach party</p>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>All team members</span>
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Order Deadline</h4>
                        <p className="text-sm text-muted-foreground">July 5, 2023 • All day</p>
                      </div>
                      <Badge variant="outline">In 4 days</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Final day to place orders for food and drinks</p>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-muted-foreground">
                      <User className="h-3.5 w-3.5 mr-1" />
                      <span>Assigned to: Sarah Johnson</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-0">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Team Chat</CardTitle>
                  <CardDescription>Communicate with your planning team</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto py-4">
              <div className="flex justify-center mb-4">
                <div className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">Today</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="flex max-w-[80%]">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-sm mr-2">Sarah Johnson</span>
                        <span className="text-xs text-muted-foreground">10:15 AM</span>
                      </div>
                      <div className="rounded-lg p-3 bg-muted">
                        I've contacted the catering company and they can provide everything we need for the beach party.
                        They'll need a final headcount by July 10th.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex max-w-[80%] flex-row-reverse">
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-end mb-1">
                        <span className="font-medium text-sm mr-2">You</span>
                        <span className="text-xs text-muted-foreground">10:18 AM</span>
                      </div>
                      <div className="rounded-lg p-3 bg-primary text-primary-foreground">
                        Great work, Sarah! I think we should be able to get the final headcount by then. We have 32
                        confirmed guests so far.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="flex max-w-[80%]">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael" />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-sm mr-2">Michael Brown</span>
                        <span className="text-xs text-muted-foreground">10:22 AM</span>
                      </div>
                      <div className="rounded-lg p-3 bg-muted">
                        I've booked the DJ for the party. They'll be there from 2 PM to 8 PM. They're asking if we have
                        any specific song requests?
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="flex max-w-[80%]">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Emily" />
                      <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-sm mr-2">Emily Davis</span>
                        <span className="text-xs text-muted-foreground">10:25 AM</span>
                      </div>
                      <div className="rounded-lg p-3 bg-muted">
                        I can create a shared playlist for everyone to add their song requests. I'll send the link later
                        today.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex max-w-[80%] flex-row-reverse">
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-end mb-1">
                        <span className="font-medium text-sm mr-2">You</span>
                        <span className="text-xs text-muted-foreground">10:30 AM</span>
                      </div>
                      <div className="rounded-lg p-3 bg-primary text-primary-foreground">
                        That sounds perfect, Emily! Thanks everyone for your hard work. Let's meet tomorrow at 10 AM to
                        go over the final details.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-3">
              <div className="flex items-center w-full gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon" className="rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

