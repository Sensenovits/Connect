"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MetricsOverview({ isPremium = false }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isPremium ? 34 : 3}</div>
            <p className="text-xs text-muted-foreground">
              {isPremium ? "+12% from last month" : "Create more events to see trends"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isPremium ? 1240 : 45}</div>
            <p className="text-xs text-muted-foreground">
              {isPremium ? "+18% from last month" : "Invite more people to grow your audience"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <CardDescription>Per event</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isPremium ? 36.5 : 15}</div>
            <p className="text-xs text-muted-foreground">
              {isPremium ? "+7% from last month" : "Upgrade to premium for more insights"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>
                {isPremium
                  ? "Event metrics for the past 6 months"
                  : "Event metrics for the past 3 months (limited data)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Chart visualization will appear here</p>
              </div>
              {!isPremium && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Upgrade to premium for full historical data and advanced analytics</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
              <CardDescription>
                {isPremium ? "Event metrics for the past 4 weeks" : "Event metrics for the past 2 weeks (limited data)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Chart visualization will appear here</p>
              </div>
              {!isPremium && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Upgrade to premium for full historical data and advanced analytics</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

