"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin, FileText, Palette, ChevronRight, Plus, Image, Check } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

// Sample templates for premium users
const eventTemplates = [
  {
    id: "birthday-party",
    name: "Birthday Party",
    description: "A fun celebration with friends and family",
    image: "/placeholder.svg?height=100&width=200&text=Birthday",
    defaultValues: {
      title: "Birthday Celebration",
      description: "Join us for a special birthday celebration! Food, drinks, and fun activities provided.",
      location: "123 Party Street",
    },
  },
  {
    id: "corporate-meeting",
    name: "Corporate Meeting",
    description: "Professional meeting template with agenda",
    image: "/placeholder.svg?height=100&width=200&text=Corporate",
    defaultValues: {
      title: "Quarterly Business Meeting",
      description: "Agenda includes Q2 results, upcoming projects, and team building activities.",
      location: "Company Headquarters",
    },
  },
  {
    id: "workshop",
    name: "Workshop",
    description: "Interactive workshop with registration",
    image: "/placeholder.svg?height=100&width=200&text=Workshop",
    defaultValues: {
      title: "Skills Development Workshop",
      description: "Learn new skills in this hands-on workshop. All materials provided.",
      location: "Community Center",
    },
  },
]

// Sample themes for premium users
const eventThemes = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    colors: ["#ffffff", "#000000", "#f3f4f6"],
    preview: "/placeholder.svg?height=100&width=200&text=Modern",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      accentColor: "#f3f4f6",
    },
  },
  {
    id: "vibrant-celebration",
    name: "Vibrant Celebration",
    colors: ["#8b5cf6", "#ec4899", "#f59e0b"],
    preview: "/placeholder.svg?height=100&width=200&text=Vibrant",
    styles: {
      backgroundColor: "#fdf4ff",
      textColor: "#8b5cf6",
      accentColor: "#ec4899",
    },
  },
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    colors: ["#1e40af", "#93c5fd", "#f8fafc"],
    preview: "/placeholder.svg?height=100&width=200&text=Corporate",
    styles: {
      backgroundColor: "#f8fafc",
      textColor: "#1e40af",
      accentColor: "#93c5fd",
    },
  },
]

// Map locations with coordinates
const mapLocations = [
  { name: "Downtown", lat: 40.7128, lng: -74.006 },
  { name: "Uptown", lat: 40.8075, lng: -73.9626 },
  { name: "Midtown", lat: 40.7549, lng: -73.984 },
  { name: "West Side", lat: 40.787, lng: -73.9754 },
  { name: "East Side", lat: 40.7681, lng: -73.9568 },
  { name: "Central Park", lat: 40.7812, lng: -73.9665 },
]

export function CreateEventClient() {
  const router = useRouter()
  const { toast } = useToast()
  const { hasPremiumAccess } = usePremium()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mapCanvasRef = useRef<HTMLCanvasElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "18:00",
    location: "",
    locationCoords: { lat: 40.7128, lng: -74.006 }, // Default to NYC
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [themeStyles, setThemeStyles] = useState({
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#f3f4f6",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [mapVisible, setMapVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedMapLocation, setSelectedMapLocation] = useState<number | null>(null)

  // Initialize map when it becomes visible
  useEffect(() => {
    if (mapVisible && mapCanvasRef.current) {
      drawMap()
    }
  }, [mapVisible, selectedMapLocation])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Draw the map on the canvas
  const drawMap = () => {
    const canvas = mapCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw map background
    ctx.fillStyle = "#e5e7eb" // Light gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw main roads
    ctx.strokeStyle = "#9ca3af"
    ctx.lineWidth = 3

    // Horizontal main road
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()

    // Vertical main road
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()

    // Draw location markers
    mapLocations.forEach((location, index) => {
      // Normalize coordinates to canvas size
      const x = ((location.lng + 74.1) / 0.3) * canvas.width
      const y = ((40.85 - location.lat) / 0.2) * canvas.height

      // Draw marker
      ctx.beginPath()
      ctx.arc(x, y, index === selectedMapLocation ? 12 : 8, 0, Math.PI * 2)
      ctx.fillStyle = index === selectedMapLocation ? "#ef4444" : "#3b82f6"
      ctx.fill()

      // Draw marker label
      ctx.font = "12px Arial"
      ctx.fillStyle = "#000000"
      ctx.textAlign = "center"
      ctx.fillText(location.name, x, y - 15)
    })

    // Add click event listener to the canvas
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if click is on any marker
      mapLocations.forEach((location, index) => {
        const markerX = ((location.lng + 74.1) / 0.3) * canvas.width
        const markerY = ((40.85 - location.lat) / 0.2) * canvas.height

        // Calculate distance from click to marker center
        const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2))

        // If click is within marker radius
        if (distance < 15) {
          setSelectedMapLocation(index)
          handleLocationSelect({ lat: location.lat, lng: location.lng }, location.name)
        }
      })
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }))
    }
  }

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    // Find the selected template
    const template = eventTemplates.find((t) => t.id === templateId)
    if (template && template.defaultValues) {
      // Apply template default values to form
      setFormData((prev) => ({
        ...prev,
        ...template.defaultValues,
      }))

      setSelectedTemplate(templateId)

      // Show success message
      toast({
        title: "Template Applied",
        description: `The "${template.name}" template has been applied to your event.`,
      })

      // Switch to basic tab to show applied template
      setActiveTab("basic")
    }
  }

  // Handle theme selection
  const handleThemeSelect = (themeId: string) => {
    // Find the selected theme
    const theme = eventThemes.find((t) => t.id === themeId)
    if (theme) {
      setSelectedTheme(themeId)

      // Apply theme styles
      if (theme.styles) {
        setThemeStyles(theme.styles)
      }

      // Show success message
      toast({
        title: "Theme Applied",
        description: `The "${theme.name}" theme has been applied to your event.`,
      })

      // Switch to basic tab to show applied theme
      setActiveTab("basic")
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      toast({
        title: "Image Uploaded",
        description: "Your event image has been uploaded successfully.",
      })
    }
  }

  // Handle map location selection
  const handleLocationSelect = (coords: { lat: number; lng: number }, name: string) => {
    setFormData((prev) => ({
      ...prev,
      locationCoords: coords,
      location: name,
    }))

    // Find the index of the selected location
    const locationIndex = mapLocations.findIndex((loc) => loc.lat === coords.lat && loc.lng === coords.lng)
    setSelectedMapLocation(locationIndex >= 0 ? locationIndex : null)

    toast({
      title: "Location Selected",
      description: `Location set to ${name}`,
    })
  }

  // Handle form submission
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter an event title.",
        variant: "destructive",
      })
      return
    }

    // Create event object
    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      image: imagePreview,
      template: selectedTemplate,
      theme: selectedTheme,
      themeStyles,
      createdAt: new Date().toISOString(),
    }

    // Save event data to localStorage
    if (typeof window !== "undefined") {
      try {
        // Get existing events or initialize empty array
        const existingEventsJSON = localStorage.getItem("events") || "[]"
        const existingEvents = JSON.parse(existingEventsJSON)

        // Add new event to array
        const updatedEvents = [...existingEvents, newEvent]

        // Save updated events array
        localStorage.setItem("events", JSON.stringify(updatedEvents))

        // Show success message
        toast({
          title: "Event Created",
          description: "Your event has been created successfully!",
        })

        // Redirect to events page
        setTimeout(() => {
          router.push("/events")
        }, 1500)
      } catch (error) {
        console.error("Error saving event:", error)
        toast({
          title: "Error",
          description: "There was a problem creating your event. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (!mounted) {
    return <div className="container py-8">Loading...</div>
  }

  // Apply theme styles to the container
  const containerStyle = selectedTheme
    ? {
        backgroundColor: themeStyles.backgroundColor,
        color: themeStyles.textColor,
      }
    : {}

  // Apply theme styles to buttons
  const buttonStyle = selectedTheme
    ? {
        backgroundColor: themeStyles.accentColor,
        color: themeStyles.textColor,
      }
    : {}

  return (
    <div className="py-8" style={containerStyle}>
      <div className="container flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={selectedTheme ? { color: themeStyles.textColor } : {}}>
            Create Event
          </h1>
          <p className="text-muted-foreground">Fill in the details to create your new event</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            {hasPremiumAccess && (
              <>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="themes">Themes</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="basic">
            <Card className={selectedTheme ? "border-0 shadow-lg" : ""}>
              <form onSubmit={handleCreateEvent}>
                <CardHeader>
                  <CardTitle style={selectedTheme ? { color: themeStyles.textColor } : {}}>Event Details</CardTitle>
                  <CardDescription>Enter the basic information about your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedTemplate && (
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-600">
                        Using the "{eventTemplates.find((t) => t.id === selectedTemplate)?.name}" template
                      </AlertDescription>
                    </Alert>
                  )}

                  {selectedTheme && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <Palette className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-600">
                        Using the "{eventThemes.find((t) => t.id === selectedTheme)?.name}" theme
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title" style={selectedTheme ? { color: themeStyles.textColor } : {}}>
                      Event Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" style={selectedTheme ? { color: themeStyles.textColor } : {}}>
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event"
                      className="min-h-[120px]"
                      value={formData.description}
                      onChange={handleInputChange}
                      style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label style={selectedTheme ? { color: themeStyles.textColor } : {}}>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={formData.date} onSelect={handleDateSelect} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" style={selectedTheme ? { color: themeStyles.textColor } : {}}>
                        Time
                      </Label>
                      <div className="relative">
                        <Input
                          id="time"
                          type="time"
                          className="pl-10"
                          value={formData.time}
                          onChange={handleInputChange}
                          style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                        />
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" style={selectedTheme ? { color: themeStyles.textColor } : {}}>
                      Location
                    </Label>
                    <div className="relative">
                      <Input
                        id="location"
                        placeholder="Enter event location"
                        className="pl-10"
                        value={formData.location}
                        onChange={handleInputChange}
                        style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                      />
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setMapVisible(!mapVisible)}
                      style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                    >
                      {mapVisible ? "Hide Map" : "Select on Map"}
                    </Button>

                    {mapVisible && (
                      <div
                        className="mt-2 border rounded-md overflow-hidden"
                        style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                      >
                        <div className="bg-muted aspect-video relative">
                          <canvas
                            ref={mapCanvasRef}
                            width={600}
                            height={300}
                            className="w-full h-full cursor-pointer"
                          />
                          <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-sm text-xs">
                            Click on a location marker to select it
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label style={selectedTheme ? { color: themeStyles.textColor } : {}}>Event Image</Label>
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2",
                        imagePreview && "border-primary",
                      )}
                      style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                    >
                      {imagePreview ? (
                        <div className="w-full">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Event preview"
                            className="w-full h-auto max-h-[200px] object-contain rounded-md"
                          />
                          <div className="flex justify-center mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              onClick={() => setImagePreview(null)}
                              style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                            >
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Image className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Drag and drop an image or click to browse</p>
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                          >
                            Upload Image
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.push("/")}
                    style={selectedTheme ? { borderColor: themeStyles.accentColor } : {}}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" style={selectedTheme ? buttonStyle : {}}>
                    Create Event
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {hasPremiumAccess && (
            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Event Templates
                  </CardTitle>
                  <CardDescription>
                    Choose from professionally designed templates to create your event quickly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {eventTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={cn(
                          "cursor-pointer hover:shadow-md transition-shadow overflow-hidden",
                          selectedTemplate === template.id && "ring-2 ring-primary",
                        )}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="aspect-video bg-muted">
                          <img
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </CardContent>
                      </Card>
                    ))}

                    <Card
                      className="border-dashed cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setSelectedTemplate(null)
                        setFormData({
                          title: "",
                          description: "",
                          date: new Date(),
                          time: "18:00",
                          location: "",
                          locationCoords: { lat: 40.7128, lng: -74.006 },
                        })
                        toast({
                          title: "Blank Template Selected",
                          description: "You're starting with a blank template.",
                        })
                        setActiveTab("basic")
                      }}
                    >
                      <CardContent className="flex flex-col items-center justify-center h-full py-8">
                        <div className="bg-muted rounded-full p-3 mb-4">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-1">Blank Template</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          Start from scratch with a blank template
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTemplate(null)
                        toast({
                          title: "Selection Cleared",
                          description: "Template selection has been cleared.",
                        })
                      }}
                    >
                      Clear Selection
                    </Button>
                    <Button
                      disabled={!selectedTemplate}
                      onClick={() => {
                        if (selectedTemplate) {
                          const template = eventTemplates.find((t) => t.id === selectedTemplate)
                          toast({
                            title: "Template Applied",
                            description: `The "${template?.name}" template has been applied to your event.`,
                          })
                          setActiveTab("basic")
                        }
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          )}

          {hasPremiumAccess && (
            <TabsContent value="themes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Event Themes
                  </CardTitle>
                  <CardDescription>Choose a theme to customize the look and feel of your event page</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {eventThemes.map((theme) => (
                      <Card
                        key={theme.id}
                        className={cn(
                          "cursor-pointer hover:shadow-md transition-shadow",
                          selectedTheme === theme.id && "ring-2 ring-primary",
                        )}
                        onClick={() => handleThemeSelect(theme.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">{theme.name}</h3>
                          <div className="flex space-x-2 mb-3">
                            {theme.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="aspect-video rounded-md overflow-hidden">
                            <img
                              src={theme.preview || "/placeholder.svg"}
                              alt={`${theme.name} preview`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Card
                      className="border-dashed cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setSelectedTheme(null)
                        setThemeStyles({
                          backgroundColor: "#ffffff",
                          textColor: "#000000",
                          accentColor: "#f3f4f6",
                        })
                        toast({
                          title: "Default Theme Selected",
                          description: "You're using the default theme.",
                        })
                        setActiveTab("basic")
                      }}
                    >
                      <CardContent className="flex flex-col items-center justify-center h-full py-8">
                        <div className="bg-muted rounded-full p-3 mb-4">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-1">Default Theme</h3>
                        <p className="text-sm text-muted-foreground text-center">Use the default event theme</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTheme(null)
                        setThemeStyles({
                          backgroundColor: "#ffffff",
                          textColor: "#000000",
                          accentColor: "#f3f4f6",
                        })
                        toast({
                          title: "Theme Cleared",
                          description: "Theme selection has been cleared.",
                        })
                      }}
                    >
                      Clear Selection
                    </Button>
                    <Button
                      disabled={!selectedTheme}
                      onClick={() => {
                        if (selectedTheme) {
                          const theme = eventThemes.find((t) => t.id === selectedTheme)
                          toast({
                            title: "Theme Applied",
                            description: `The "${theme?.name}" theme has been applied to your event.`,
                          })
                          setActiveTab("basic")
                        }
                      }}
                    >
                      Apply Theme
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {!hasPremiumAccess && (
          <Card className="bg-muted/50">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-medium mb-1">Unlock Premium Features</h3>
                <p className="text-sm text-muted-foreground">Get access to event templates, custom themes, and more</p>
              </div>
              <Link href="/premium">
                <Button>
                  Upgrade to Premium
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

