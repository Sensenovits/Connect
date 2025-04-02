"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserStore } from "@/lib/user-store"
import { PremiumRequired } from "@/components/premium/premium-required"
import { hasPremiumAccess } from "@/lib/subscription-service"
import { Button } from "@/components/ui/button"
import { Download, UserCheck, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartBar,
  ChartBarItem,
} from "@/components/ui/chart"

// Mock data for attendance tracking
const mockAttendanceData = [
  {
    eventId: "event-1",
    eventName: "Tech Conference 2023",
    date: new Date(2023, 5, 15),
    registeredAttendees: 120,
    actualAttendees: 98,
    attendanceRate: 81.67,
    checkInTimes: [
      { time: "08:00-09:00", count: 45 },
      { time: "09:00-10:00", count: 32 },
      { time: "10:00-11:00", count: 15 },
      { time: "11:00-12:00", count: 6 },
    ],
    attendees: [
      { id: "user-1", name: "John Doe", email: "john@example.com", checkInTime: "08:15", status: "attended" },
      { id: "user-2", name: "Jane Smith", email: "jane@example.com", checkInTime: "08:30", status: "attended" },
      { id: "user-3", name: "Bob Johnson", email: "bob@example.com", checkInTime: "09:45", status: "attended" },
      { id: "user-4", name: "Alice Brown", email: "alice@example.com", checkInTime: null, status: "no-show" },
      { id: "user-5", name: "Charlie Wilson", email: "charlie@example.com", checkInTime: "10:20", status: "attended" },
    ],
  },
  {
    eventId: "event-2",
    eventName: "Marketing Workshop",
    date: new Date(2023, 6, 22),
    registeredAttendees: 50,
    actualAttendees: 42,
    attendanceRate: 84,
    checkInTimes: [
      { time: "13:00-14:00", count: 28 },
      { time: "14:00-15:00", count: 10 },
      { time: "15:00-16:00", count: 4 },
      { time: "16:00-17:00", count: 0 },
    ],
    attendees: [
      { id: "user-6", name: "David Lee", email: "david@example.com", checkInTime: "13:10", status: "attended" },
      { id: "user-7", name: "Emma Davis", email: "emma@example.com", checkInTime: "13:25", status: "attended" },
      { id: "user-8", name: "Frank Miller", email: "frank@example.com", checkInTime: "14:05", status: "attended" },
      { id: "user-9", name: "Grace Taylor", email: "grace@example.com", checkInTime: null, status: "no-show" },
      { id: "user-10", name: "Henry Wilson", email: "henry@example.com", checkInTime: "13:50", status: "attended" },
    ],
  },
  {
    eventId: "event-3",
    eventName: "Networking Mixer",
    date: new Date(2023, 7, 5),
    registeredAttendees: 80,
    actualAttendees: 65,
    attendanceRate: 81.25,
    checkInTimes: [
      { time: "18:00-19:00", count: 40 },
      { time: "19:00-20:00", count: 20 },
      { time: "20:00-21:00", count: 5 },
      { time: "21:00-22:00", count: 0 },
    ],
    attendees: [
      { id: "user-11", name: "Ivy Chen", email: "ivy@example.com", checkInTime: "18:05", status: "attended" },
      { id: "user-12", name: "Jack Brown", email: "jack@example.com", checkInTime: "18:20", status: "attended" },
      { id: "user-13", name: "Karen White", email: "karen@example.com", checkInTime: "19:15", status: "attended" },
      { id: "user-14", name: "Leo Garcia", email: "leo@example.com", checkInTime: null, status: "no-show" },
      { id: "user-15", name: "Mia Johnson", email: "mia@example.com", checkInTime: "18:40", status: "attended" },
    ],
  },
]

export function AttendanceTrackingClient() {
  const { currentUser } = useUserStore()
  const [selectedEvent, setSelectedEvent] = useState(mockAttendanceData[0])

  if (!currentUser || !hasPremiumAccess(currentUser)) {
    return <PremiumRequired feature="Attendance Tracking" />
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground">Monitor attendance for your events and gain valuable insights</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{selectedEvent.registeredAttendees}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Actual Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{selectedEvent.actualAttendees}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{selectedEvent.attendanceRate}%</div>
              <Progress value={selectedEvent.attendanceRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Selection</CardTitle>
          <CardDescription>Choose an event to view attendance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockAttendanceData.map((event) => (
              <Button
                key={event.eventId}
                variant={selectedEvent.eventId === event.eventId ? "default" : "outline"}
                onClick={() => setSelectedEvent(event)}
              >
                {event.eventName}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="check-in-times">Check-in Times</TabsTrigger>
          <TabsTrigger value="attendee-list">Attendee List</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{selectedEvent.eventName} - Attendance Overview</CardTitle>
              <CardDescription>{formatDate(selectedEvent.date, "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Attendance Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Registered:</span>
                        <span className="font-medium">{selectedEvent.registeredAttendees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Attended:</span>
                        <span className="font-medium">{selectedEvent.actualAttendees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">No-shows:</span>
                        <span className="font-medium">
                          {selectedEvent.registeredAttendees - selectedEvent.actualAttendees}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Attendance Rate:</span>
                        <span className="font-medium">{selectedEvent.attendanceRate}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Attendance Breakdown</h3>
                    <div className="h-[200px]">
                      <Chart
                        type="pie"
                        data={[
                          { name: "Attended", value: selectedEvent.actualAttendees },
                          { name: "No-show", value: selectedEvent.registeredAttendees - selectedEvent.actualAttendees },
                        ]}
                        valueFormatter={(value) => `${value} attendees`}
                        category="name"
                        index="name"
                        colors={["#0ea5e9", "#e11d48"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="check-in-times" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{selectedEvent.eventName} - Check-in Times</CardTitle>
              <CardDescription>{formatDate(selectedEvent.date, "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ChartBar
                    data={selectedEvent.checkInTimes}
                    category="time"
                    index="time"
                    valueFormatter={(value) => `${value} attendees`}
                  >
                    <ChartBarItem name="Attendees" value="count" color="#0ea5e9" />
                  </ChartBar>
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartLegend>
                    <ChartLegendItem name="Attendees" color="#0ea5e9" />
                  </ChartLegend>
                </ChartContainer>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Check-in Insights</h3>
                <p className="text-muted-foreground">
                  Most attendees checked in during the first hour of the event. Consider scheduling your most important
                  content during peak attendance times.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendee-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{selectedEvent.eventName} - Attendee List</CardTitle>
              <CardDescription>{formatDate(selectedEvent.date, "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedEvent.attendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell>{attendee.email}</TableCell>
                      <TableCell>{attendee.checkInTime || "—"}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            attendee.status === "attended" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {attendee.status === "attended" ? "Attended" : "No-show"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

