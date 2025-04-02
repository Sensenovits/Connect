"use client"

import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function EventMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative h-full w-full">
      <Card className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
          <p className="text-lg font-medium">Map Preview</p>
          <p className="text-sm text-gray-500">Google Maps integration will be available in production</p>
        </div>
      </Card>
    </div>
  )
}

