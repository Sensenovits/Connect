"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, MapPin, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  locationCoords: { lat: number; lng: number }
  image: string | null
  template: string | null
  theme: string | null
  themeStyles?: {
    backgroundColor: string
    textColor: string
    accentColor: string
  }
  createdAt: string
}

export function EventsClient() {
  const [events, setEvents] = useState<Event[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load events from localStorage
    if (typeof window !== "undefined") {
      try {
        const savedEvents = localStorage.getItem("events")
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents))
        }
      } catch (error) {
        console.error("Error loading events:", error)
      }
    }
  }, [])

  if (!mounted) {
    return <div className="container py-8">Loading...</div>
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Events</h1>
          <Link href="/create-event">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>

        {events.length === 0 ? (
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-3 mb-4">
                <CalendarIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No Events Yet</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                You haven't created any events yet. Get started by creating your first event.
              </p>
              <Link href="/create-event">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className={cn("overflow-hidden hover:shadow-md transition-shadow", event.theme && "border-0 shadow")}
                style={
                  event.themeStyles
                    ? {
                        backgroundColor: event.themeStyles.backgroundColor,
                        color: event.themeStyles.textColor,
                      }
                    : {}
                }
              >
                {event.image && (
                  <div className="aspect-video bg-muted">
                    <img
                      src={event.image || "/placeholder.svg?height=200&width=400&text=Event"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle style={event.themeStyles ? { color: event.themeStyles.textColor } : {}}>
                    {event.title}
                  </CardTitle>
                  <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 mb-4">{event.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/events/${event.id}`} className="w-full">
                    <Button
                      className="w-full"
                      variant="outline"
                      style={
                        event.themeStyles
                          ? {
                              borderColor: event.themeStyles.accentColor,
                              color: event.themeStyles.textColor,
                            }
                          : {}
                      }
                    >
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

