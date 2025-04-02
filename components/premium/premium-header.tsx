import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Crown } from "lucide-react"

interface PremiumHeaderProps {
  title: string
  description: string
}

export function PremiumHeader({ title, description }: PremiumHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Crown className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          {title || "Upgrade to Premium"}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {description || "Unlock powerful features to take your events to the next level"}
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/premium/pricing">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

