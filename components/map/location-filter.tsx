"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "lucide-react"
import { getCurrentLocation, getLocationName } from "@/lib/location-service"
import { toast } from "@/components/ui/use-toast"

interface LocationFilterProps {
  onFilterChange: (filter: {
    type: "distance" | "location"
    value: number | string
  }) => void
  onLocationChange?: (coordinates: [number, number], locationName: string) => void
}

export function LocationFilter({ onFilterChange, onLocationChange }: LocationFilterProps) {
  const [isLocating, setIsLocating] = useState(false)
  const [distanceFilter, setDistanceFilter] = useState<string>("")

  const handleDistanceChange = (value: string) => {
    setDistanceFilter(value)

    if (value === "") {
      // Reset filter when "All locations" is selected
      onFilterChange({
        type: "location",
        value: "",
      })
    } else {
      onFilterChange({
        type: "distance",
        value: Number.parseInt(value),
      })
    }
  }

  const handleGetCurrentLocation = async () => {
    setIsLocating(true)

    try {
      const coordinates = await getCurrentLocation()
      const locationName = await getLocationName(coordinates[0], coordinates[1])

      if (onLocationChange) {
        onLocationChange(coordinates, locationName)
      }

      toast({
        title: "Location updated",
        description: `Your location: ${locationName}`,
      })

      // Set distance filter to 50km by default when location is detected
      setDistanceFilter("50")
      onFilterChange({
        type: "distance",
        value: 50,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not get your location. Please check your browser permissions.",
        variant: "destructive",
      })
    } finally {
      setIsLocating(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button variant="outline" className="flex-1" onClick={handleGetCurrentLocation} disabled={isLocating}>
        <Navigation className="h-4 w-4 mr-2" />
        {isLocating ? "Getting location..." : "Use my location"}
      </Button>

      <Select value={distanceFilter} onValueChange={handleDistanceChange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Filter by distance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All locations</SelectItem>
          <SelectItem value="10">Within 10km</SelectItem>
          <SelectItem value="50">Within 50km</SelectItem>
          <SelectItem value="100">Within 100km</SelectItem>
          <SelectItem value="500">Within 500km</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

