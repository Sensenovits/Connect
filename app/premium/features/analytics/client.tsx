"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { PremiumRequired } from "@/components/premium-required"

const monthlyData = [
  { name: "Jan", events: 4, attendees: 120, revenue: 2400 },
  { name: "Feb", events: 3, attendees: 98, revenue: 1800 },
  { name: "Mar", events: 5, attendees: 135, revenue: 3000 },
  { name: "Apr", events: 6, attendees: 165, revenue: 3600 },
  { name: "May", events: 4, attendees: 110, revenue: 2200 },
  { name: "Jun", events: 7, attendees: 210, revenue: 4200 },
]

const eventTypeData = [
  { name: "Conference", value: 35 },
  { name: "Workshop", value: 25 },
  { name: "Webinar", value: 20 },
  { name: "Networking", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function AnalyticsClient() {
  return (
    <div className="container mx-auto py-10">
      <PremiumRequired>
        <h1 className="text-3xl font-bold mb-6">Event Analytics</h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Performance</CardTitle>
                  <CardDescription>Monthly events and attendees</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <ChartTooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="events" fill="#8884d8" name="Events" />
                        <Bar yAxisId="right" dataKey="attendees" fill="#82ca9d" name="Attendees" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Types</CardTitle>
                  <CardDescription>Distribution of event types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={eventTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {eventTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Event Growth</CardTitle>
                <CardDescription>Monthly event count trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} name="Events" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue from events</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                        name="Revenue ($)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendees">
            <Card>
              <CardHeader>
                <CardTitle>Attendee Growth</CardTitle>
                <CardDescription>Monthly attendee count</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="attendees"
                        stroke="#82ca9d"
                        activeDot={{ r: 8 }}
                        name="Attendees"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PremiumRequired>
    </div>
  )
}

