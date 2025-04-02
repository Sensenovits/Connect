"use client"

import { Check, Palette, Image, Mail, FileText } from "lucide-react"

import { PremiumFeatureHeader } from "@/components/premium/premium-feature-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BrandingPageClient() {
  // Dummy variables for email template
  const attendee_name = "John Doe"
  const event_name = "Awesome Conference"
  const event_date = "2024-03-15"
  const event_time = "9:00 AM"
  const event_location = "Convention Center"
  const company_name = "Acme Corp"
  const current_year = new Date().getFullYear()
  const ticket_type = "General Admission"

  return (
    <div className="container mx-auto py-8">
      <PremiumFeatureHeader
        title="Custom Branding"
        description="Create a unique and branded experience for your attendees"
        icon="Brush"
      />

      <Tabs defaultValue="general" className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="colors">Colors & Fonts</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="forms">Registration Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Identity</CardTitle>
                  <CardDescription>Customize your brand identity across all event materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company/Organization Name</Label>
                    <Input id="company-name" placeholder="Enter your company name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Logo Upload</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Image className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-500 mb-2">Drag and drop your logo here, or click to browse</p>
                      <p className="text-xs text-gray-400">Recommended size: 200x200px, PNG or SVG format</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => alert("File upload functionality will be implemented in the next update")}
                      >
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favicon-upload">Favicon Upload</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Image className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-500 mb-2">Upload a favicon for your event pages</p>
                      <p className="text-xs text-gray-400">Recommended size: 32x32px, ICO or PNG format</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => alert("File upload functionality will be implemented in the next update")}
                      >
                        Upload Favicon
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline/Slogan</Label>
                    <Input id="tagline" placeholder="Enter your company tagline" />
                    <p className="text-xs text-gray-500">This will appear on event pages and emails</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={() => alert("Changes saved successfully!")}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>See how your branding will appear</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                      <div>
                        <p className="font-medium">Your Company Name</p>
                        <p className="text-xs text-gray-500">Your tagline goes here</p>
                      </div>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      Event Page Preview
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gray-200 rounded-md mr-3"></div>
                      <p className="font-medium">Email Header</p>
                    </div>
                    <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      Email Template Preview
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => alert("Branding reset to default")}>
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => alert("Full preview will be available in the next update")}>
                    Full Preview
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Branding Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Logo uploaded</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Company name set</span>
                    </li>
                    <li className="flex items-start opacity-50">
                      <div className="h-5 w-5 border rounded-full mr-2 mt-0.5"></div>
                      <span className="text-sm">Colors customized</span>
                    </li>
                    <li className="flex items-start opacity-50">
                      <div className="h-5 w-5 border rounded-full mr-2 mt-0.5"></div>
                      <span className="text-sm">Email templates branded</span>
                    </li>
                    <li className="flex items-start opacity-50">
                      <div className="h-5 w-5 border rounded-full mr-2 mt-0.5"></div>
                      <span className="text-sm">Registration forms customized</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Colors & Typography</CardTitle>
                  <CardDescription>Customize the colors and fonts used across your event pages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Brand Colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex">
                          <div className="w-10 h-10 rounded-l-md bg-blue-600"></div>
                          <Input id="primary-color" defaultValue="#2563EB" className="rounded-l-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondary-color">Secondary Color</Label>
                        <div className="flex">
                          <div className="w-10 h-10 rounded-l-md bg-purple-600"></div>
                          <Input id="secondary-color" defaultValue="#9333EA" className="rounded-l-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <div className="flex">
                          <div className="w-10 h-10 rounded-l-md bg-pink-600"></div>
                          <Input id="accent-color" defaultValue="#DB2777" className="rounded-l-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="background-color">Background Color</Label>
                        <div className="flex">
                          <div className="w-10 h-10 rounded-l-md bg-gray-100"></div>
                          <Input id="background-color" defaultValue="#F3F4F6" className="rounded-l-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Typography</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heading-font">Heading Font</Label>
                        <Select defaultValue="Inter">
                          <SelectTrigger id="heading-font">
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="OpenSans">Open Sans</SelectItem>
                            <SelectItem value="Montserrat">Montserrat</SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="body-font">Body Font</Label>
                        <Select defaultValue="Inter">
                          <SelectTrigger id="body-font">
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="OpenSans">Open Sans</SelectItem>
                            <SelectItem value="Montserrat">Montserrat</SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heading-size">Heading Size Scale</Label>
                        <Select defaultValue="Default">
                          <SelectTrigger id="heading-size">
                            <SelectValue placeholder="Select size scale" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Default">Default</SelectItem>
                            <SelectItem value="Compact">Compact</SelectItem>
                            <SelectItem value="Expanded">Expanded</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="body-size">Body Text Size</Label>
                        <Select defaultValue="Medium">
                          <SelectTrigger id="body-size">
                            <SelectValue placeholder="Select text size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Medium">Medium (16px)</SelectItem>
                            <SelectItem value="Small">Small (14px)</SelectItem>
                            <SelectItem value="Large">Large (18px)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Button Styles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="button-style">Button Style</Label>
                        <Select defaultValue="Rounded">
                          <SelectTrigger id="button-style">
                            <SelectValue placeholder="Select button style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rounded">Rounded</SelectItem>
                            <SelectItem value="Square">Square</SelectItem>
                            <SelectItem value="Pill">Pill</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="button-animation">Button Animation</Label>
                        <Select defaultValue="Subtle">
                          <SelectTrigger id="button-animation">
                            <SelectValue placeholder="Select animation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Subtle">Subtle</SelectItem>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Scale">Scale</SelectItem>
                            <SelectItem value="Bounce">Bounce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <Button>Primary Button</Button>
                      <Button variant="outline">Secondary Button</Button>
                      <Button variant="ghost">Ghost Button</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={() => alert("Changes saved successfully!")}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Theme Preview</CardTitle>
                  <CardDescription>See how your color and font choices look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Heading Example</h3>
                      <p className="text-sm">This is how your body text will appear on your event pages and emails.</p>
                    </div>

                    <div className="p-3 rounded-md bg-blue-600 text-white">Primary Color Block</div>

                    <div className="p-3 rounded-md bg-purple-600 text-white">Secondary Color Block</div>

                    <div className="flex space-x-2">
                      <Button size="sm">Button</Button>
                      <Button size="sm" variant="outline">
                        Button
                      </Button>
                    </div>

                    <div className="p-3 rounded-md bg-gray-100">Background Color Example</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => alert("Theme reset to default")}>
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => alert("Full preview will be available in the next update")}>
                    Full Preview
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Color Palette Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      className="cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                      onClick={() => alert("Professional Blue palette applied")}
                    >
                      <p className="text-sm font-medium mb-2">Professional Blue</p>
                      <div className="flex space-x-1">
                        <div className="w-8 h-8 rounded-md bg-blue-700"></div>
                        <div className="w-8 h-8 rounded-md bg-blue-500"></div>
                        <div className="w-8 h-8 rounded-md bg-gray-700"></div>
                        <div className="w-8 h-8 rounded-md bg-gray-100"></div>
                      </div>
                    </div>

                    <div
                      className="cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                      onClick={() => alert("Vibrant Purple palette applied")}
                    >
                      <p className="text-sm font-medium mb-2">Vibrant Purple</p>
                      <div className="flex space-x-1">
                        <div className="w-8 h-8 rounded-md bg-purple-700"></div>
                        <div className="w-8 h-8 rounded-md bg-pink-500"></div>
                        <div className="w-8 h-8 rounded-md bg-indigo-300"></div>
                        <div className="w-8 h-8 rounded-md bg-gray-100"></div>
                      </div>
                    </div>

                    <div
                      className="cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                      onClick={() => alert("Nature Green palette applied")}
                    >
                      <p className="text-sm font-medium mb-2">Nature Green</p>
                      <div className="flex space-x-1">
                        <div className="w-8 h-8 rounded-md bg-green-700"></div>
                        <div className="w-8 h-8 rounded-md bg-emerald-500"></div>
                        <div className="w-8 h-8 rounded-md bg-amber-400"></div>
                        <div className="w-8 h-8 rounded-md bg-gray-50"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize the email templates sent to your event attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="space-y-4">
                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => alert("Event Invitation template selected")}
                    >
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Event Invitation</h3>
                      </div>
                      <p className="text-sm text-gray-600">The initial invitation sent to potential attendees</p>
                    </div>

                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 bg-blue-50 border-blue-200"
                      onClick={() => alert("Registration Confirmation template selected")}
                    >
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Registration Confirmation</h3>
                      </div>
                      <p className="text-sm text-gray-600">Sent after successful registration</p>
                    </div>

                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => alert("Event Reminder template selected")}
                    >
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Event Reminder</h3>
                      </div>
                      <p className="text-sm text-gray-600">Sent before the event to remind attendees</p>
                    </div>

                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => alert("Post-Event Thank You template selected")}
                    >
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Post-Event Thank You</h3>
                      </div>
                      <p className="text-sm text-gray-600">Sent after the event to thank attendees</p>
                    </div>

                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => alert("Feedback Request template selected")}
                    >
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Feedback Request</h3>
                      </div>
                      <p className="text-sm text-gray-600">Sent after the event to collect feedback</p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => alert("New template creation will be available in the next update")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Create New Template
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Registration Confirmation</h3>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert("Template preview will be available in the next update")}
                        >
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => alert("Test email sent successfully!")}>
                          Test Send
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-subject">Email Subject</Label>
                        <Input id="email-subject" defaultValue={`Your registration for ${event_name} is confirmed!`} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-sender">Sender Name</Label>
                        <Input id="email-sender" defaultValue={`${company_name} Events`} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-content">Email Content</Label>
                        <div className="border rounded-md p-4 min-h-[300px] bg-white">
                          <div className="p-4 border-b">
                            <div className="w-32 h-8 bg-gray-200 rounded mb-2"></div>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Hello {attendee_name},</p>
                            <p className="mb-4">
                              Thank you for registering for {event_name}! Your registration has been confirmed.
                            </p>
                            <p className="mb-4">Event Details:</p>
                            <ul className="list-disc list-inside mb-4">
                              <li>Date: {event_date}</li>
                              <li>Time: {event_time}</li>
                              <li>Location: {event_location}</li>
                            </ul>
                            <p className="mb-4">
                              Your ticket information is attached to this email. You can also access your ticket by
                              logging into your account.
                            </p>
                            <div className="bg-blue-600 text-white text-center py-3 px-4 rounded-md w-48 mx-auto mb-4">
                              View Ticket
                            </div>
                            <p className="mb-4">We look forward to seeing you at the event!</p>
                            <p>
                              Best regards,
                              <br />
                              The {company_name} Team
                            </p>
                          </div>
                          <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-500">
                            <p>
                              © {current_year} {company_name}. All rights reserved.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Available Variables</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{attendee_name}}"}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{event_name}}"}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{event_date}}"}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{company_name}}"}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{ticket_type}}"}</span>
                          </div>
                        </div>
                        <Button onClick={() => alert("Template saved successfully!")}>Save Template</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Forms</CardTitle>
              <CardDescription>Customize the registration forms for your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="space-y-4">
                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => alert("Standard Registration form selected")}
                    >
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Standard Registration</h3>
                      </div>
                      <p className="text-sm text-gray-600">Basic registration form for most events</p>
                    </div>

                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 bg-blue-50 border-blue-200"
                      onClick={() => alert("Conference Registration form selected")}
                    >
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Conference Registration</h3>
                      </div>
                      <p className="text-sm text-gray-600">Detailed form for conference attendees</p>
                    </div>

                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => alert("Workshop Registration form selected")}
                    >
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">Workshop Registration</h3>
                      </div>
                      <p className="text-sm text-gray-600">Form for workshop participants</p>
                    </div>

                    <div
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => alert("VIP Registration form selected")}
                    >
                      <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        <h3 className="font-medium">VIP Registration</h3>
                      </div>
                      <p className="text-sm text-gray-600">Premium registration form for VIP events</p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => alert("New form creation will be available in the next update")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Create New Form
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Conference Registration Form</h3>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert("Form preview will be available in the next update")}
                        >
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => alert("Form duplicated successfully!")}>
                          Duplicate
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="form-title">Form Title</Label>
                        <Input id="form-title" defaultValue={`Register for ${event_name}`} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="form-description">Form Description</Label>
                        <textarea
                          id="form-description"
                          className="w-full p-2 border rounded-md min-h-[80px]"
                          defaultValue="Please complete the registration form below to secure your spot at our upcoming conference. All fields marked with * are required."
                        ></textarea>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Form Fields</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert("Field addition will be available in the next update")}
                          >
                            Add Field
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div className="border rounded-md p-3 bg-white">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Checkbox id="field-name" className="mr-2" />
                                <span className="font-medium">Full Name *</span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field styling will be available in the next update")}
                                >
                                  <Palette className="h-4 w-4 text-gray-500" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field properties will be available in the next update")}
                                >
                                  <FileText className="h-4 w-4 text-gray-500" />
                                </button>
                              </div>
                            </div>
                            <Input placeholder="Enter your full name" disabled />
                          </div>

                          <div className="border rounded-md p-3 bg-white">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Checkbox id="field-email" className="mr-2" />
                                <span className="font-medium">Email Address *</span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field styling will be available in the next update")}
                                >
                                  <Palette className="h-4 w-4 text-gray-500" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field properties will be available in the next update")}
                                >
                                  <FileText className="h-4 w-4 text-gray-500" />
                                </button>
                              </div>
                            </div>
                            <Input placeholder="Enter your email address" disabled />
                          </div>

                          <div className="border rounded-md p-3 bg-white">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Checkbox id="field-company" className="mr-2" />
                                <span className="font-medium">Company/Organization</span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field styling will be available in the next update")}
                                >
                                  <Palette className="h-4 w-4 text-gray-500" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field properties will be available in the next update")}
                                >
                                  <FileText className="h-4 w-4 text-gray-500" />
                                </button>
                              </div>
                            </div>
                            <Input placeholder="Enter your company or organization" disabled />
                          </div>

                          <div className="border rounded-md p-3 bg-white">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Checkbox id="field-sessions" className="mr-2" />
                                <span className="font-medium">Session Selection *</span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field styling will be available in the next update")}
                                >
                                  <Palette className="h-4 w-4 text-gray-500" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-100 rounded"
                                  onClick={() => alert("Field properties will be available in the next update")}
                                >
                                  <FileText className="h-4 w-4 text-gray-500" />
                                </button>
                              </div>
                            </div>
                            <select className="w-full p-2 border rounded-md" disabled>
                              <option>Select sessions you wish to attend</option>
                            </select>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-dashed"
                            onClick={() => alert("Drag and drop functionality will be available in the next update")}
                          >
                            + Drag and drop fields here
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="form-button">Submit Button Text</Label>
                        <Input id="form-button" defaultValue="Complete Registration" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="form-confirmation">Confirmation Message</Label>
                        <textarea
                          id="form-confirmation"
                          className="w-full p-2 border rounded-md min-h-[80px]"
                          defaultValue="Thank you for registering! You will receive a confirmation email shortly with all the details about the event."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button onClick={() => alert("Form saved successfully!")}>Save Form</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

