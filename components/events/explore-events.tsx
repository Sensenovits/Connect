"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, X } from "lucide-react"
import { FeaturedEvents } from "./featured-events"
import { useEventStore } from "@/lib/event-store"
import { useUserStore } from "@/lib/user-store"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

// Mock users data for demonstration
const mockUsers = [
  {
    id: "101",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Los Angeles, CA",
    bio: "Event enthusiast and community organizer",
  },
  {
    id: "102",
    name: "Sam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "New York, NY",
    bio: "Music lover and party planner",
  },
  {
    id: "103",
    name: "Emily Parker",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Chicago, IL",
    bio: "Food and culture enthusiast",
  },
  {
    id: "104",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, CA",
    bio: "Tech meetup organizer",
  },
]

interface ExploreEventsProps {
  initialSearchQuery?: string
}

export function ExploreEvents({ initialSearchQuery = "" }: ExploreEventsProps) {
  const router = useRouter()
  const { events } = useEventStore()
  const { currentUser } = useUserStore()
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    date: "all",
    distance: "all",
    category: "all",
  })

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery)

      // Execute search immediately without setTimeout
      // setTimeout can cause issues with React's reconciliation
      const query = initialSearchQuery.toLowerCase()

      // Search events
      const matchingEvents = events.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query),
      )

      // Search users (including mock users and current user)
      const allUsers = [...mockUsers]
      if (currentUser && !allUsers.find((u) => u.id === currentUser.id)) {
        allUsers.push(currentUser)
      }

      const matchingUsers = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.location.toLowerCase().includes(query) ||
          (user.bio && user.bio.toLowerCase().includes(query)),
      )

      // Search cities
      const matchingCities = [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
      ].filter((city) => city.toLowerCase().includes(query))

      // Combine results
      const combinedResults = [
        ...matchingEvents.map((event) => ({ type: "event", ...event })),
        ...matchingUsers.map((user) => ({ type: "user", ...user })),
        ...matchingCities.map((city) => ({ type: "city", name: city })),
      ]

      setSearchResults(combinedResults)
    }

    return () => {
      // Cleanup function (if needed)
    }
  }, [initialSearchQuery, events, currentUser])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()

    // Search events
    const matchingEvents = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query),
    )

    // Search users (including mock users and current user)
    const allUsers = [...mockUsers]
    if (currentUser && !allUsers.find((u) => u.id === currentUser.id)) {
      allUsers.push(currentUser)
    }

    const matchingUsers = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query) ||
        (user.bio && user.bio.toLowerCase().includes(query)),
    )

    // Search cities
    const matchingCities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
    ].filter((city) => city.toLowerCase().includes(query))

    // Combine results
    const combinedResults = [
      ...matchingEvents.map((event) => ({ type: "event", ...event })),
      ...matchingUsers.map((user) => ({ type: "user", ...user })),
      ...matchingCities.map((city) => ({ type: "city", name: city })),
    ]

    setSearchResults(combinedResults)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const updateFilter = (type: string, value: string) => {
    setFilters({
      ...filters,
      [type]: value,
    })
  }

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search events, users, and cities"
          className="pl-10 pr-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        {searchQuery && (
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={clearSearch}>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Discover</h2>
        <Button
          variant={showFilters ? "default" : "outline"}
          size="sm"
          className="flex items-center"
          onClick={toggleFilters}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <motion.div
          className="mb-6 p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Filter options (unchanged) */}
        </motion.div>
      )}

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">
            All
          </TabsTrigger>
          <TabsTrigger value="events" className="flex-1">
            Events
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1">
            Users
          </TabsTrigger>
          <TabsTrigger value="cities" className="flex-1">
            Cities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {result.type === "event" && (
                    <div>
                      <h3 className="text-lg font-semibold">{result.title}</h3>
                      <p className="text-sm text-gray-600">{result.location}</p>
                      <Button size="sm" className="mt-2" onClick={() => router.push(`/events/${result.id}`)}>
                        View Event
                      </Button>
                    </div>
                  )}
                  {result.type === "user" && (
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src={result.avatar || "/placeholder.svg"}
                          alt={result.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{result.name}</h3>
                        <p className="text-sm text-gray-600">{result.location}</p>
                        {result.bio && <p className="text-sm text-gray-600 line-clamp-2 mt-1">{result.bio}</p>}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => router.push(`/profile/${result.id}`)}>
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => router.push(`/messages?user=${result.id}`)}>
                          Message
                        </Button>
                      </div>
                    </div>
                  )}
                  {result.type === "city" && (
                    <div>
                      <h3 className="text-lg font-semibold">{result.name}</h3>
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setSearchQuery(result.name)
                          handleSearch()
                        }}
                      >
                        View Events in {result.name}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <FeaturedEvents events={events} />
          )}
        </TabsContent>

        <TabsContent value="events">
          <FeaturedEvents
            events={events.filter((event) =>
              searchQuery
                ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  event.location.toLowerCase().includes(searchQuery.toLowerCase())
                : true,
            )}
          />
        </TabsContent>

        <TabsContent value="users">
          {searchQuery ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults
                .filter((result) => result.type === "user")
                .map((result) => (
                  <div
                    key={result.id}
                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src={result.avatar || "/placeholder.svg"}
                          alt={result.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{result.name}</h3>
                        <p className="text-sm text-gray-600">{result.location}</p>
                      </div>
                    </div>
                    {result.bio && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{result.bio}</p>}
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" onClick={() => router.push(`/profile/${result.id}`)}>
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => router.push(`/messages?user=${result.id}`)}>
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Enter a search term to find users</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cities">{/* Display city results here */}</TabsContent>
      </Tabs>

      {searchResults.length === 0 && searchQuery && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-2">No results found matching your criteria</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setFilters({
                date: "all",
                distance: "all",
                category: "all",
              })
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

