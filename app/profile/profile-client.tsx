"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MapPin, Mail, User, Edit, Calendar } from "lucide-react"

export function ProfileClient() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Event enthusiast and organizer",
    location: "New York, NY",
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Load profile data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const savedData = localStorage.getItem("profileData")
    if (savedData) {
      setProfileData(JSON.parse(savedData))
    }

    const savedImage = localStorage.getItem("profileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  return (
    <div className="container py-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader className="relative pb-2">
            <div className="absolute right-6 top-6">
              <Link href="/profile/edit">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage || ""} />
                <AvatarFallback className="bg-primary/10">
                  <User className="h-12 w-12 text-primary/80" />
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                <CardDescription className="mt-1 max-w-md">{profileData.bio}</CardDescription>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-1 h-4 w-4" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    Joined January 2023
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="events">
          <TabsList className="mb-4">
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="attending">Attending</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>My Events</CardTitle>
                <CardDescription>Events you've created and organized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No events yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't created any events yet. Start organizing your first event!
                  </p>
                  <Link href="/create-event">
                    <Button className="mt-4">Create Event</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attending">
            <Card>
              <CardHeader>
                <CardTitle>Attending</CardTitle>
                <CardDescription>Events you're attending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No events yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You're not attending any events yet. Explore events to find something interesting!
                  </p>
                  <Button className="mt-4">Explore Events</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Events</CardTitle>
                <CardDescription>Events you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No saved events</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't saved any events yet. Save events to find them easily later!
                  </p>
                  <Button className="mt-4">Explore Events</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

