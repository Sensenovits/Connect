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
const conversionRateData = [
  { month: "Jan", views: 1200, registrations: 240, conversionRate: 20 },
  { month: "Feb", views: 1500, registrations: 330, conversionRate: 22 },
  { month: "Mar", views: 1800, registrations: 414, conversionRate: 23 },
  { month: "Apr", views: 2200, registrations: 550, conversionRate: 25 },
  { month: "May", views: 2500, registrations: 650, conversionRate: 26 },
  { month: "Jun", views: 2800, registrations: 756, conversionRate: 27 },
]

const channelConversionData = [
  { name: "Social Media", value: 35 },
  { name: "Email", value: 25 },
  { name: "Direct", value: 20 },
  { name: "Referral", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const conversionByDeviceData = [
  { device: "Desktop", conversionRate: 28 },
  { device: "Mobile", conversionRate: 22 },
  { device: "Tablet", conversionRate: 25 },
]

export function ConversionMetricsClient() {
  const [isPremium, setIsPremium] = useState(true)

  // For demo purposes, toggle premium status
  const togglePremium = () => setIsPremium(!isPremium)

  if (!isPremium) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Conversion Metrics</h1>
        <PremiumRequired
          featureName="Conversion Metrics"
          description="Track and analyze how visitors convert to registered attendees."
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
        <h1 className="text-3xl font-bold">Conversion Metrics</h1>
        <button onClick={togglePremium} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Demo: Deactivate Premium
        </button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate Trend</CardTitle>
                <CardDescription>Views to registrations conversion rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    conversionRate: {
                      label: "Conversion Rate (%)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversionRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="conversionRate"
                        stroke="var(--color-conversionRate)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration Sources</CardTitle>
                <CardDescription>Where your registrations are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelConversionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {channelConversionData.map((entry, index) => (
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

        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Conversion rates by marketing channel</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  conversionRate: {
                    label: "Conversion Rate (%)",
                    color: "hsl(var(--chart-1))",
                  },
                  registrations: {
                    label: "Registrations",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { channel: "Social Media", conversionRate: 24, registrations: 350 },
                      { channel: "Email", conversionRate: 32, registrations: 250 },
                      { channel: "Direct", conversionRate: 18, registrations: 200 },
                      { channel: "Referral", conversionRate: 28, registrations: 150 },
                      { channel: "Search", conversionRate: 22, registrations: 100 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis yAxisId="left" orientation="left" stroke="var(--color-conversionRate)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-registrations)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="conversionRate" fill="var(--color-conversionRate)" />
                    <Bar yAxisId="right" dataKey="registrations" fill="var(--color-registrations)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Conversion by Device</CardTitle>
              <CardDescription>How different devices affect conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  conversionRate: {
                    label: "Conversion Rate (%)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionByDeviceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="device" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="conversionRate" fill="var(--color-conversionRate)" />
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

