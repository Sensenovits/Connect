"use client"

import { useState } from "react"
import { BarChart, Calendar, Download, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AttendanceChartProps {
  compact?: boolean
}

export function AttendanceChart({ compact = false }: AttendanceChartProps) {
  const [eventFilter, setEventFilter] = useState("all")

  // Mock data for the chart
  const mockEvents = [
    { name: "Annual Conference", registered: 120, attended: 98, noShow: 22 },
    { name: "Product Launch", registered: 85, attended: 72, noShow: 13 },
    { name: "Workshop Series", registered: 50, attended: 42, noShow: 8 },
    { name: "Networking Mixer", registered: 65, attended: 38, noShow: 27 },
    { name: "Industry Panel", registered: 40, attended: 35, noShow: 5 },
  ]

  if (compact) {
    return (
      <div>
        <div className="h-[200px] flex items-end space-x-2">
          {mockEvents.map((event, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-blue-500 rounded-t h-[100px]"
                style={{ height: `${(event.attended / event.registered) * 150}px` }}
              ></div>
              <p className="text-xs mt-2 truncate w-full text-center">{event.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium">Attendance Metrics</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="recent">Recent Events</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chart">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">Chart View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="chart">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px] flex items-end space-x-6">
                {mockEvents.map((event, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="relative w-full flex flex-col items-center">
                      <div
                        className="w-full bg-gray-200 rounded-t"
                        style={{ height: `${(event.noShow / event.registered) * 250}px` }}
                      >
                        <div className="absolute top-0 w-full text-center text-xs text-gray-500 mt-1">
                          {event.noShow} no-shows
                        </div>
                      </div>
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(event.attended / event.registered) * 250}px` }}
                      >
                        <div className="absolute bottom-0 w-full text-center text-xs text-white mb-1">
                          {event.attended} attended
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mt-2 font-medium">{event.name}</p>
                    <p className="text-xs text-gray-500">
                      {Math.round((event.attended / event.registered) * 100)}% attendance
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                    <span>Attended</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-200 rounded-sm mr-2"></div>
                    <span>No-shows</span>
                  </div>
                  <div>
                    <span className="font-medium">Total Registered: 360</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Event Name</th>
                      <th className="text-right pb-2">Registered</th>
                      <th className="text-right pb-2">Attended</th>
                      <th className="text-right pb-2">No-shows</th>
                      <th className="text-right pb-2">Attendance Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEvents.map((event, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{event.name}</td>
                        <td className="text-right py-3">{event.registered}</td>
                        <td className="text-right py-3">{event.attended}</td>
                        <td className="text-right py-3">{event.noShow}</td>
                        <td className="text-right py-3">{Math.round((event.attended / event.registered) * 100)}%</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="py-3">Total</td>
                      <td className="text-right py-3">360</td>
                      <td className="text-right py-3">285</td>
                      <td className="text-right py-3">75</td>
                      <td className="text-right py-3">79%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px] relative">
                {/* This would be a line chart showing attendance trends over time */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Line chart showing attendance trends over time would be displayed here
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Attendance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Peak Attendance Days</h4>
              <p className="text-sm text-gray-600">
                Thursdays and Fridays show 22% higher attendance rates than other weekdays.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">No-show Patterns</h4>
              <p className="text-sm text-gray-600">
                Free events have a 35% higher no-show rate compared to paid events.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Reminder Effectiveness</h4>
              <p className="text-sm text-gray-600">Events with 24-hour reminders saw 18% higher attendance rates.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

