"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/navigation/header"
import { FooterNav } from "@/components/navigation/footer-nav"
import { ExploreEvents } from "@/components/events/explore-events"

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Get search query from URL if it exists
    const query = searchParams.get("q")
    if (query) {
      console.log("Explore page loaded with search query:", query)
      setSearchQuery(query)
    } else {
      // Reset search query if not in URL
      setSearchQuery("")
    }
  }, [searchParams]) // Keep only searchParams in the dependency array

  return (
    <div className="pb-16">
      <Header title="Explore" showBackButton />

      <main className="container mx-auto px-4 py-6">
        <ExploreEvents initialSearchQuery={searchQuery} />
      </main>

      <FooterNav />
    </div>
  )
}

