"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremiumRequired } from "@/components/premium-required"
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the charts
const monthlyAttendanceData = [
  { month: "Jan", registered: 120, attended: 95, noShow: 25 },
  { month: "Feb", registered: 150, attended: 120, noShow: 30 },
  { month: "Mar", registered: 180, attended: 155, noShow: 25 },
  { month: "Apr", registered: 220, attended: 175, noShow: 45 },
  { month: "May", registered: 250, attended: 210, noShow: 40 },
  { month: "Jun", registered: 280, attended: 240, noShow: 40 },
]

const attendanceRateData = [
  { name: "Attended", value: 78 },
  { name: "No-Show", value: 22 },
]

const COLORS = ["#0088FE", "#FF8042"]

const checkInTimeData = [
  { time: "Early (>30 min)", count: 15 },
  { time: "On Time (±30 min)", count: 65 },
  { time: "Late (30-60 min)", count: 12 },
  { time: "Very Late (>60 min)", count: 8 },
]

export function AttendanceMetricsClient() {
  const [isPremium, setIsPremium] = useState(true)

  // For demo purposes, toggle premium status
  const togglePremium = () => setIsPremium(!isPremium)

  if (!isPremium) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Attendance Tracking</h1>
        <PremiumRequired
          featureName="Attendance Tracking"
          description="Track and analyze attendance patterns for your events."
        />
        <button onClick={togglePremium} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Demo: Activate Premium
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Attendance Tracking</h1>
        <button onClick={togglePremium} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Demo: Deactivate Premium
        </button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
                <CardDescription>Registration vs. actual attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    registered: {
                      label: "Registered",
                      color: "hsl(var(--chart-1))",
                    },
                    attended: {
                      label: "Attended",
                      color: "hsl(var(--chart-2))",
                    },
                    noShow: {
                      label: "No-Show",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="registered" stroke="var(--color-registered)" strokeWidth={2} />
                      <Line type="monotone" dataKey="attended" stroke="var(--color-attended)" strokeWidth={2} />
                      <Line type="monotone" dataKey="noShow" stroke="var(--color-noShow)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Rate</CardTitle>
                <CardDescription>Overall attendance percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceRateData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {attendanceRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends by Event Type</CardTitle>
              <CardDescription>Comparison of attendance rates across different event types</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attendanceRate: {
                    label: "Attendance Rate (%)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { eventType: "Conferences", attendanceRate: 82 },
                      { eventType: "Workshops", attendanceRate: 88 },
                      { eventType: "Webinars", attendanceRate: 75 },
                      { eventType: "Networking", attendanceRate: 85 },
                      { eventType: "Training", attendanceRate: 90 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="eventType" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="attendanceRate" fill="var(--color-attendanceRate)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkins">
          <Card>
            <CardHeader>
              <CardTitle>Check-in Time Distribution</CardTitle>
              <CardDescription>When attendees typically check in to your events</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Number of Attendees",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={checkInTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

