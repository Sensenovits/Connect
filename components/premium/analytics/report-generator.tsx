"use client"

import { useState } from "react"
import { Calendar, Check, Download, FileText, Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("attendance")
  const [timeRange, setTimeRange] = useState("last30days")

  // Mock saved reports
  const savedReports = [
    { id: 1, name: "Q1 Attendance Summary", type: "Attendance", date: "Mar 31, 2023", downloads: 12 },
    { id: 2, name: "Marketing Channel Effectiveness", type: "Conversion", date: "Apr 15, 2023", downloads: 8 },
    { id: 3, name: "Annual Demographics Report", type: "Demographics", date: "Dec 31, 2023", downloads: 24 },
    { id: 4, name: "Event ROI Analysis", type: "Financial", date: "Jan 10, 2024", downloads: 15 },
  ]

  return (
    <div>
      <Tabs defaultValue="create">
        <TabsList className="mb-4">
          <TabsTrigger value="create">Create Report</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Report Settings</CardTitle>
                  <CardDescription>Configure your custom report</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Report Type</label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="attendance">Attendance Report</SelectItem>
                        <SelectItem value="conversion">Conversion Report</SelectItem>
                        <SelectItem value="demographics">Demographics Report</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Time Range</label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last7days">Last 7 days</SelectItem>
                        <SelectItem value="last30days">Last 30 days</SelectItem>
                        <SelectItem value="last90days">Last 90 days</SelectItem>
                        <SelectItem value="thisyear">This year</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Events to Include</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="all-events" checked />
                        <label htmlFor="all-events" className="text-sm">
                          All Events
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="select-events" />
                        <label htmlFor="select-events" className="text-sm">
                          Select Specific Events
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Data to Include</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="attendance-data" checked />
                        <label htmlFor="attendance-data" className="text-sm">
                          Attendance Data
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="conversion-data" checked />
                        <label htmlFor="conversion-data" className="text-sm">
                          Conversion Rates
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="demographic-data" checked />
                        <label htmlFor="demographic-data" className="text-sm">
                          Demographic Data
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="financial-data" />
                        <label htmlFor="financial-data" className="text-sm">
                          Financial Data
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing-data" />
                        <label htmlFor="marketing-data" className="text-sm">
                          Marketing Channel Data
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Format</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pdf-format" checked />
                        <label htmlFor="pdf-format" className="text-sm">
                          PDF
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="excel-format" />
                        <label htmlFor="excel-format" className="text-sm">
                          Excel
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="csv-format" />
                        <label htmlFor="csv-format" className="text-sm">
                          CSV
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Report Preview</CardTitle>
                  <CardDescription>Preview of your custom report</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px] overflow-auto">
                  <div className="border rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2">Event Performance Report</h3>
                    <p className="text-sm text-gray-500 mb-4">Generated on March 28, 2024 • Last 30 days</p>

                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">Executive Summary</h4>
                      <p className="text-sm text-gray-600">
                        This report provides an overview of event performance metrics for the last 30 days. During this
                        period, 5 events were held with a total of 248 attendees and an average attendance rate of 68%.
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">Attendance Overview</h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Total Registrations</p>
                            <p className="text-xl font-bold">365</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Attendees</p>
                            <p className="text-xl font-bold">248</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Attendance Rate</p>
                            <p className="text-xl font-bold">68%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">No-shows</p>
                            <p className="text-xl font-bold">117</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">Event Breakdown</h4>
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Event Name</th>
                            <th className="text-right py-2">Registrations</th>
                            <th className="text-right py-2">Attendees</th>
                            <th className="text-right py-2">Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Annual Conference</td>
                            <td className="text-right py-2">120</td>
                            <td className="text-right py-2">98</td>
                            <td className="text-right py-2">82%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Product Launch</td>
                            <td className="text-right py-2">85</td>
                            <td className="text-right py-2">72</td>
                            <td className="text-right py-2">85%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Workshop Series</td>
                            <td className="text-right py-2">50</td>
                            <td className="text-right py-2">42</td>
                            <td className="text-right py-2">84%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Networking Mixer</td>
                            <td className="text-right py-2">65</td>
                            <td className="text-right py-2">38</td>
                            <td className="text-right py-2">58%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Industry Panel</td>
                            <td className="text-right py-2">40</td>
                            <td className="text-right py-2">35</td>
                            <td className="text-right py-2">88%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">Demographic Insights</h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                          The majority of attendees (42%) were in the 25-34 age range, followed by 35-44 (28%).
                          Technology and Marketing were the most represented industries.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-medium mb-2">Recommendations</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Implement 24-hour reminder emails to improve attendance rates</li>
                        <li>Focus marketing efforts on technology and marketing professionals</li>
                        <li>Consider additional networking events based on high engagement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Customize Layout
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Saved Reports</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-md">{report.name}</CardTitle>
                        <CardDescription>
                          Type: {report.type} • Generated: {report.date}
                        </CardDescription>
                      </div>
                      <div className="text-xs text-gray-500">{report.downloads} downloads</div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Scheduled Reports</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Report
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Summary</CardTitle>
                <CardDescription>Automatically generated on the 1st of each month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                  <Check className="h-4 w-4" />
                  <span>Next report scheduled for April 1, 2024</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Monthly on the 1st</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">PDF format • Sent to 3 recipients</span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    Cancel Schedule
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance Report</CardTitle>
                <CardDescription>Automatically generated at the end of each quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                  <Check className="h-4 w-4" />
                  <span>Next report scheduled for June 30, 2024</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Quarterly (Mar, Jun, Sep, Dec)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">PDF & Excel formats • Sent to 5 recipients</span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    Cancel Schedule
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

