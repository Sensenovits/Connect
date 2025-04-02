"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data
const attendanceData = [
  { month: "Jan", count: 45 },
  { month: "Feb", count: 52 },
  { month: "Mar", count: 49 },
  { month: "Apr", count: 63 },
  { month: "May", count: 58 },
  { month: "Jun", count: 72 },
  { month: "Jul", count: 78 },
]

const demographicData = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function AnalyticsClient() {
  const [timeframe, setTimeframe] = useState("monthly")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Attendance</CardTitle>
              <CardDescription>Track attendance trends over time</CardDescription>
              <div className="flex justify-end">
                <TabsList>
                  <TabsTrigger
                    value="monthly"
                    onClick={() => setTimeframe("monthly")}
                    className={timeframe === "monthly" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    onClick={() => setTimeframe("weekly")}
                    className={timeframe === "weekly" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Weekly
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Attendees"
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendee Demographics</CardTitle>
              <CardDescription>Age distribution of your event attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {demographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendee Engagement</CardTitle>
              <CardDescription>Interaction metrics for your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Comments", value: 120 },
                      { name: "Likes", value: 230 },
                      { name: "Shares", value: 45 },
                      { name: "RSVPs", value: 180 },
                      { name: "Messages", value: 85 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

