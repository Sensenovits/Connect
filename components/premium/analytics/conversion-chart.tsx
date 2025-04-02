"use client"

import { useState } from "react"
import { ArrowUpRight, Calendar, Download, Filter, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConversionChartProps {
  compact?: boolean
}

export function ConversionChart({ compact = false }: ConversionChartProps) {
  const [timeRange, setTimeRange] = useState("6months")

  // Mock data for the chart
  const mockData = [
    { month: "Jan", rate: 62 },
    { month: "Feb", rate: 58 },
    { month: "Mar", rate: 65 },
    { month: "Apr", rate: 72 },
    { month: "May", rate: 68 },
    { month: "Jun", rate: 75 },
  ]

  if (compact) {
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Conversion Rate Trend</span>
          </div>
          <div className="text-sm font-medium text-green-600 flex items-center">
            +8%
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </div>
        </div>
        <div className="h-[150px] flex items-end space-x-1">
          {mockData.map((item, index) => (
            <div key={index} className="flex-1">
              <div
                className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                style={{ height: `${item.rate * 1.5}px` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {mockData.map((item, index) => (
            <span key={index}>{item.month}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium">Conversion Analytics</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Registration to Attendance Conversion</h4>
            <div className="h-[250px] flex items-end space-x-4">
              {mockData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${item.rate * 2.5}px` }}
                  >
                    <div className="text-white text-center text-xs font-medium mt-1">{item.rate}%</div>
                  </div>
                  <p className="text-sm mt-2">{item.month}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Average: 67%</span>
                <span className="text-sm text-green-600 flex items-center">
                  Trend: +8%
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Conversion by Event Type</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Workshops</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Conferences</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Networking</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Webinars</span>
                  <span className="text-sm font-medium">58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "58%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Social Events</span>
                  <span className="text-sm font-medium">52%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "52%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Marketing Channel Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Email</span>
                <span className="text-sm font-medium">76%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Social Media</span>
                <span className="text-sm font-medium">64%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Website</span>
                <span className="text-sm font-medium">58%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Pricing Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Free Events</span>
                <span className="text-sm font-medium">52%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Paid Events</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Donation-based</span>
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Reminder Effectiveness</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">24h Before</span>
                <span className="text-sm font-medium">82%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Same Day</span>
                <span className="text-sm font-medium">74%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">No Reminder</span>
                <span className="text-sm font-medium">48%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Conversion Optimization Tips</h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h5 className="font-medium">Send targeted reminders</h5>
                <p className="text-sm text-gray-600">
                  Events with 24-hour reminders saw 34% higher attendance rates. Consider adding SMS reminders for
                  critical events.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h5 className="font-medium">Optimize registration forms</h5>
                <p className="text-sm text-gray-600">
                  Shorter forms (3-5 fields) have 28% higher completion rates than longer forms.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h5 className="font-medium">Implement social proof</h5>
                <p className="text-sm text-gray-600">
                  Events displaying attendee counts and testimonials saw 22% higher conversion rates.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

