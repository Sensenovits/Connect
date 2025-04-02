"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Create a custom icon for markers
const createDefaultIcon = () => {
  return new L.Icon({
    iconUrl: "/images/marker-icon.png",
    iconRetinaUrl: "/images/marker-icon-2x.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
}

interface EventMapProps {
  location?: { lat: number; lng: number } | null
  onLocationChange?: (location: { lat: number; lng: number }) => void
  readOnly?: boolean
  height?: string
  width?: string
  zoom?: number
  showSearch?: boolean
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

function MapClickHandler({
  readOnly,
  onLocationChange,
  setMapCenter,
  setMarkers,
}: {
  readOnly: boolean
  onLocationChange?: (location: { lat: number; lng: number }) => void
  setMapCenter: (center: [number, number]) => void
  setMarkers: (markers: Array<{ position: [number, number]; name: string }>) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (readOnly) return

    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      setMapCenter([lat, lng])
      setMarkers([{ position: [lat, lng], name: "Selected Location" }])

      if (onLocationChange) {
        onLocationChange({ lat, lng })
      }
    }

    map.on("click", handleClick)

    return () => {
      map.off("click", handleClick)
    }
  }, [map, readOnly, onLocationChange, setMapCenter, setMarkers])

  return null
}

export function EventMap({
  location,
  onLocationChange,
  readOnly = false,
  height = "400px",
  width = "100%",
  zoom = 13,
  showSearch = true,
}: EventMapProps) {
  const defaultLocation: [number, number] = [51.505, -0.09] // London as default
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    location ? [location.lat, location.lng] : defaultLocation,
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [markers, setMarkers] = useState<Array<{ position: [number, number]; name: string }>>([])
  const mapRef = useRef<L.Map | null>(null)
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null)

  // Initialize the default icon
  useEffect(() => {
    setDefaultIcon(createDefaultIcon())

    // Fix Leaflet's default icon
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconUrl: "/images/marker-icon.png",
      iconRetinaUrl: "/images/marker-icon-2x.png",
      shadowUrl: "/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }, [])

  useEffect(() => {
    // Update markers when location changes
    if (location) {
      setMapCenter([location.lat, location.lng])
      setMarkers([{ position: [location.lat, location.lng], name: "Event Location" }])
    }
  }, [location])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const lat = Number.parseFloat(data[0].lat)
        const lng = Number.parseFloat(data[0].lon)

        setMapCenter([lat, lng])
        setMarkers([{ position: [lat, lng], name: data[0].display_name }])

        if (onLocationChange) {
          onLocationChange({ lat, lng })
        }

        if (mapRef.current) {
          mapRef.current.setView([lat, lng], zoom)
        }
      }
    } catch (error) {
      console.error("Error searching location:", error)
    }
  }

  return (
    <Card className="overflow-hidden">
      {showSearch && !readOnly && (
        <div className="p-3 border-b flex gap-2">
          <Input
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button variant="secondary" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div style={{ height, width }}>
        {defaultIcon && (
          <MapContainer
            center={mapCenter}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(map) => {
              mapRef.current = map
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={mapCenter} zoom={zoom} />
            <MapClickHandler
              readOnly={readOnly}
              onLocationChange={onLocationChange}
              setMapCenter={setMapCenter}
              setMarkers={setMarkers}
            />

            {markers.map((marker, idx) => (
              <Marker key={idx} position={marker.position} icon={defaultIcon}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </Card>
  )
}

