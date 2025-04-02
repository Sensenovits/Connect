import type React from "react"
import { PremiumNavigation } from "@/components/premium/premium-navigation"

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <PremiumNavigation />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

