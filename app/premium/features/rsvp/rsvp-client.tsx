"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ClipboardCheck, Users, Settings, Plus, Trash2, MoveVertical, Edit, Mail } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { PremiumRequired } from "@/components/premium-required"

const guestList = [
  { id: 1, name: "John Smith", email: "john@example.com", status: "confirmed", plusOne: true },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", status: "confirmed", plusOne: false },
  { id: 3, name: "Michael Brown", email: "michael@example.com", status: "pending", plusOne: false },
  { id: 4, name: "Emily Davis", email: "emily@example.com", status: "declined", plusOne: false },
  { id: 5, name: "David Wilson", email: "david@example.com", status: "confirmed", plusOne: true },
  { id: 6, name: "Jessica Taylor", email: "jessica@example.com", status: "pending", plusOne: false },
]

export function RsvpClient() {
  const { hasPremiumAccess } = usePremium()
  const [activeTab, setActiveTab] = useState("guests")
  const [selectedGuests, setSelectedGuests] = useState<number[]>([])

  const toggleSelectGuest = (id: number) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter((guestId) => guestId !== id))
    } else {
      setSelectedGuests([...selectedGuests, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedGuests.length === guestList.length) {
      setSelectedGuests([])
    } else {
      setSelectedGuests(guestList.map((guest) => guest.id))
    }
  }

  const handleAddGuest = () => {
    alert("In a real app, this would open a form to add a new guest.")
  }

  const handleEditGuest = (id: number) => {
    alert(`Editing guest #${id}! In a real app, this would open an edit form.`)
  }

  const handleRemoveGuests = () => {
    alert(`Removing ${selectedGuests.length} guests! In a real app, this would delete the selected guests.`)
  }

  const handleEmailGuests = () => {
    alert(`Emailing ${selectedGuests.length} guests! In a real app, this would open an email composer.`)
  }

  const handleExportList = () => {
    alert("Exporting guest list! In a real app, this would generate a CSV or PDF file.")
  }

  const handleSaveForm = () => {
    alert("Form saved! In a real app, this would save your RSVP form configuration.")
  }

  const handleSaveSettings = () => {
    alert("Settings saved! In a real app, this would save your RSVP settings.")
  }

  if (!hasPremiumAccess) {
    return (
      <PremiumRequired
        featureName="RSVP Management"
        description="Collect custom information from attendees and manage guest lists easily"
      >
        <div>This content is only visible with premium access</div>
      </PremiumRequired>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">RSVP Management</h1>
        <p className="text-muted-foreground">Collect custom information from attendees and manage guest lists easily</p>
      </div>

      <Tabs defaultValue="guests" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="guests" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Guest List
          </TabsTrigger>
          <TabsTrigger value="form" className="flex items-center">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            RSVP Form
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guests" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Guest List</CardTitle>
                  <CardDescription>Manage attendees for your event</CardDescription>
                </div>
                <Button onClick={handleAddGuest}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Guest
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="flex items-center p-4 bg-muted/50">
                  <div className="flex items-center">
                    <Checkbox
                      id="select-all"
                      checked={selectedGuests.length === guestList.length}
                      onCheckedChange={toggleSelectAll}
                      className="mr-2"
                    />
                    <Label htmlFor="select-all" className="text-xs font-medium uppercase text-muted-foreground">
                      Select All
                    </Label>
                  </div>
                  {selectedGuests.length > 0 && (
                    <div className="ml-auto flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={handleEmailGuests}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={handleRemoveGuests}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left"></th>
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Email</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Plus One</th>
                      <th className="p-3 text-left font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {guestList.map((guest) => (
                      <tr key={guest.id} className="border-b">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedGuests.includes(guest.id)}
                            onCheckedChange={() => toggleSelectGuest(guest.id)}
                          />
                        </td>
                        <td className="p-3 font-medium">{guest.name}</td>
                        <td className="p-3 text-muted-foreground">{guest.email}</td>
                        <td className="p-3">
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              guest.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : guest.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                          </div>
                        </td>
                        <td className="p-3">
                          {guest.plusOne ? (
                            <span className="text-green-600">Yes</span>
                          ) : (
                            <span className="text-muted-foreground">No</span>
                          )}
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="icon" onClick={() => handleEditGuest(guest.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="text-sm text-muted-foreground">
                Showing 6 guests • 3 confirmed • 2 pending • 1 declined
              </div>
              <Button variant="outline" onClick={handleExportList}>
                Export List
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="form" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">RSVP Form Builder</CardTitle>
              <CardDescription>Customize the information you collect from attendees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Form Title</Label>
                <Input defaultValue="Summer Beach Party RSVP" />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input defaultValue="Please let us know if you can make it to our beach party!" />
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Form Fields</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                    <div className="flex items-center">
                      <MoveVertical className="h-4 w-4 text-muted-foreground mr-3" />
                      <div>
                        <p className="font-medium">Name</p>
                        <p className="text-xs text-muted-foreground">Text field (Required)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                    <div className="flex items-center">
                      <MoveVertical className="h-4 w-4 text-muted-foreground mr-3" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-xs text-muted-foreground">Email field (Required)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                    <div className="flex items-center">
                      <MoveVertical className="h-4 w-4 text-muted-foreground mr-3" />
                      <div>
                        <p className="font-medium">Will you be attending?</p>
                        <p className="text-xs text-muted-foreground">Radio buttons (Required)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                    <div className="flex items-center">
                      <MoveVertical className="h-4 w-4 text-muted-foreground mr-3" />
                      <div>
                        <p className="font-medium">Bringing a plus one?</p>
                        <p className="text-xs text-muted-foreground">Checkbox field</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                    <div className="flex items-center">
                      <MoveVertical className="h-4 w-4 text-muted-foreground mr-3" />
                      <div>
                        <p className="font-medium">Dietary Restrictions</p>
                        <p className="text-xs text-muted-foreground">Dropdown field</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Preview Form</Button>
              <Button onClick={handleSaveForm}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">RSVP Settings</CardTitle>
              <CardDescription>Configure how RSVPs work for your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>RSVP Deadline</Label>
                  <Input type="date" defaultValue="2023-07-10" />
                  <p className="text-xs text-muted-foreground">Guests won't be able to RSVP after this date</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Plus Ones</Label>
                    <p className="text-xs text-muted-foreground">Let guests bring an additional person</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Guest Limit</Label>
                    <p className="text-xs text-muted-foreground">Set a maximum number of attendees</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <Input type="number" defaultValue="50" className="w-20" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Waitlist</Label>
                    <p className="text-xs text-muted-foreground">Enable waitlist when guest limit is reached</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Confirmation</Label>
                    <p className="text-xs text-muted-foreground">Automatically confirm RSVPs</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>RSVP Confirmation Message</Label>
                  <Input defaultValue="Thank you for your RSVP! We look forward to seeing you at the event." />
                </div>

                <div className="space-y-2">
                  <Label>Notification Preferences</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All RSVP activity</SelectItem>
                      <SelectItem value="confirmations">Confirmations only</SelectItem>
                      <SelectItem value="declines">Declines only</SelectItem>
                      <SelectItem value="none">No notifications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

