"use client"

import { useState, useEffect } from "react"
import { BarChart, Calendar, Clock, DollarSign, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserStore } from "@/lib/user-store"
import { useEventStore } from "@/lib/event-store"

export function MetricsOverview() {
  const [timeRange, setTimeRange] = useState("30days")
  const { currentUser } = useUserStore()
  const { events } = useEventStore()
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    avgAttendance: 0,
    conversionRate: 0,
    avgDuration: "0h",
    revenue: "$0",
  })

  // Calculate metrics based on user's events and subscription status
  useEffect(() => {
    if (currentUser.subscription) {
      // User has premium, calculate real metrics
      const userEvents = events.filter(
        (event) =>
          event.creator.id === currentUser.id ||
          (Array.isArray(currentUser.createdEvents) && currentUser.createdEvents.includes(event.id)),
      )

      const totalEvents = userEvents.length
      const totalAttendees = userEvents.reduce((sum, event) => sum + (event.attendees?.length || 0), 0)
      const avgAttendance = totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0

      // Calculate conversion rate (registered vs. attended)
      const totalRegistered = userEvents.reduce((sum, event) => sum + (event.registered?.length || 0), 0)
      const conversionRate = totalRegistered > 0 ? Math.round((totalAttendees / totalRegistered) * 100) : 0

      // Calculate average duration
      const totalDuration = userEvents.reduce((sum, event) => {
        const duration = event.duration || 2 // Default to 2 hours if not specified
        return sum + duration
      }, 0)
      const avgDuration = totalEvents > 0 ? (totalDuration / totalEvents).toFixed(1) + "h" : "0h"

      // Calculate revenue (if premium)
      const totalRevenue = userEvents.reduce(
        (sum, event) => sum + (event.ticketPrice || 0) * (event.attendees?.length || 0),
        0,
      )
      const revenue = "$" + totalRevenue.toFixed(1) + "k"

      setMetrics({
        totalEvents,
        totalAttendees,
        avgAttendance,
        conversionRate,
        avgDuration,
        revenue,
      })
    } else {
      // User doesn't have premium, show sample data
      setMetrics({
        totalEvents: 24,
        totalAttendees: 1248,
        avgAttendance: 52,
        conversionRate: 68,
        avgDuration: "2.5h",
        revenue: "$8.4k",
      })
    }
  }, [currentUser, events, timeRange])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Key Metrics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{metrics.totalEvents}</p>
              </div>
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+3 from previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                <p className="text-2xl font-bold">{metrics.totalAttendees}</p>
              </div>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+12% from previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                <p className="text-2xl font-bold">{metrics.avgAttendance}</p>
              </div>
              <BarChart className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+8% from previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{metrics.conversionRate}%</p>
              </div>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+5% from previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Duration</p>
                <p className="text-2xl font-bold">{metrics.avgDuration}</p>
              </div>
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">No change</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">{metrics.revenue}</p>
              </div>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+18% from previous period</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

