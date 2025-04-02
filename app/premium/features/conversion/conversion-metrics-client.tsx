"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserStore } from "@/lib/user-store"
import { PremiumRequired } from "@/components/premium/premium-required"
import { hasPremiumAccess } from "@/lib/subscription-service"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Users, DollarSign, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/lib/utils"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartLine,
  ChartLineItem,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for conversion metrics
const mockConversionData = [
  {
    eventId: "event-1",
    eventName: "Tech Conference 2023",
    date: new Date(2023, 5, 15),
    views: 1250,
    registrations: 120,
    conversionRate: 9.6,
    revenue: 3600,
    averageTicketValue: 30,
    timeSeriesData: [
      { date: "2023-05-01", views: 150, registrations: 10 },
      { date: "2023-05-02", views: 180, registrations: 15 },
      { date: "2023-05-03", views: 210, registrations: 18 },
      { date: "2023-05-04", views: 190, registrations: 12 },
      { date: "2023-05-05", views: 220, registrations: 20 },
      { date: "2023-05-06", views: 250, registrations: 25 },
      { date: "2023-05-07", views: 280, registrations: 30 },
    ],
    referralSources: [
      { source: "Direct", count: 45, percentage: 37.5 },
      { source: "Social Media", count: 35, percentage: 29.2 },
      { source: "Email", count: 25, percentage: 20.8 },
      { source: "Partner Sites", count: 15, percentage: 12.5 },
    ],
  },
  {
    eventId: "event-2",
    eventName: "Marketing Workshop",
    date: new Date(2023, 6, 22),
    views: 800,
    registrations: 50,
    conversionRate: 6.25,
    revenue: 2500,
    averageTicketValue: 50,
    timeSeriesData: [
      { date: "2023-06-10", views: 100, registrations: 5 },
      { date: "2023-06-11", views: 120, registrations: 8 },
      { date: "2023-06-12", views: 150, registrations: 10 },
      { date: "2023-06-13", views: 130, registrations: 7 },
      { date: "2023-06-14", views: 160, registrations: 12 },
      { date: "2023-06-15", views: 180, registrations: 15 },
      { date: "2023-06-16", views: 200, registrations: 18 },
    ],
    referralSources: [
      { source: "Direct", count: 20, percentage: 40 },
      { source: "Social Media", count: 15, percentage: 30 },
      { source: "Email", count: 10, percentage: 20 },
      { source: "Partner Sites", count: 5, percentage: 10 },
    ],
  },
  {
    eventId: "event-3",
    eventName: "Networking Mixer",
    date: new Date(2023, 7, 5),
    views: 950,
    registrations: 80,
    conversionRate: 8.42,
    revenue: 1600,
    averageTicketValue: 20,
    timeSeriesData: [
      { date: "2023-07-01", views: 120, registrations: 8 },
      { date: "2023-07-02", views: 140, registrations: 12 },
      { date: "2023-07-03", views: 160, registrations: 15 },
      { date: "2023-07-04", views: 150, registrations: 10 },
      { date: "2023-07-05", views: 180, registrations: 18 },
      { date: "2023-07-06", views: 200, registrations: 22 },
      { date: "2023-07-07", views: 220, registrations: 25 },
    ],
    referralSources: [
      { source: "Direct", count: 30, percentage: 37.5 },
      { source: "Social Media", count: 25, percentage: 31.25 },
      { source: "Email", count: 15, percentage: 18.75 },
      { source: "Partner Sites", count: 10, percentage: 12.5 },
    ],
  },
]

export function ConversionMetricsClient() {
  const { currentUser } = useUserStore()
  const [selectedEvent, setSelectedEvent] = useState(mockConversionData[0])
  const [timeRange, setTimeRange] = useState("7days")

  if (!currentUser || !hasPremiumAccess(currentUser)) {
    return <PremiumRequired feature="Conversion Metrics" />
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversion Metrics</h1>
          <p className="text-muted-foreground">
            Track how effectively your event pages convert visitors to registrations
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{selectedEvent.views}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{selectedEvent.registrations}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{selectedEvent.conversionRate}%</div>
              </div>
              <Progress value={selectedEvent.conversionRate * 10} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">${selectedEvent.revenue}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Selection</CardTitle>
          <CardDescription>Choose an event to view conversion data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockConversionData.map((event) => (
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
          <TabsTrigger value="time-series">Time Series</TabsTrigger>
          <TabsTrigger value="referral-sources">Referral Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{selectedEvent.eventName} - Conversion Overview</CardTitle>
              <CardDescription>{formatDate(selectedEvent.date, "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Conversion Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Page Views:</span>
                        <span className="font-medium">{selectedEvent.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Registrations:</span>
                        <span className="font-medium">{selectedEvent.registrations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversion Rate:</span>
                        <span className="font-medium">{selectedEvent.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium">${selectedEvent.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Ticket Value:</span>
                        <span className="font-medium">${selectedEvent.averageTicketValue}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Conversion Funnel</h3>
                    <div className="h-[200px]">
                      <Chart
                        type="bar"
                        data={[
                          { name: "Views", value: selectedEvent.views },
                          { name: "Registrations", value: selectedEvent.registrations },
                        ]}
                        valueFormatter={(value) => `${value}`}
                        category="name"
                        index="name"
                        colors={["#0ea5e9", "#10b981"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-series" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <CardTitle>{selectedEvent.eventName} - Time Series</CardTitle>
                <CardDescription>{formatDate(selectedEvent.date, "PPP")}</CardDescription>
              </div>
              <div className="mt-2 sm:mt-0">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="14days">Last 14 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ChartLine
                    data={selectedEvent.timeSeriesData}
                    category="date"
                    index="date"
                    valueFormatter={(value) => `${value}`}
                  >
                    <ChartLineItem name="Views" value="views" color="#0ea5e9" />
                    <ChartLineItem name="Registrations" value="registrations" color="#10b981" />
                  </ChartLine>
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartLegend>
                    <ChartLegendItem name="Views" color="#0ea5e9" />
                    <ChartLegendItem name="Registrations" color="#10b981" />
                  </ChartLegend>
                </ChartContainer>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Time Series Insights</h3>
                <p className="text-muted-foreground">
                  Registration activity peaked on May 7th with 30 registrations. Consider timing your promotional
                  campaigns to capitalize on high-conversion periods.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral-sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{selectedEvent.eventName} - Referral Sources</CardTitle>
              <CardDescription>{formatDate(selectedEvent.date, "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Registration Sources</h3>
                  <div className="space-y-4">
                    {selectedEvent.referralSources.map((source) => (
                      <div key={source.source} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{source.source}</span>
                          <span>
                            {source.count} ({source.percentage}%)
                          </span>
                        </div>
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Source Distribution</h3>
                  <div className="h-[250px]">
                    <Chart
                      type="pie"
                      data={selectedEvent.referralSources}
                      valueFormatter={(value) => `${value} registrations`}
                      category="source"
                      index="source"
                      value="count"
                      colors={["#0ea5e9", "#10b981", "#f59e0b", "#6366f1"]}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Referral Insights</h3>
                <p className="text-muted-foreground">
                  Direct traffic and social media are your top sources of registrations. Consider increasing your social
                  media marketing efforts to boost conversions further.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

