import { Header } from "@/components/navigation/header"
import { PremiumNavigation } from "@/components/premium/premium-navigation"

interface PremiumFeatureHeaderProps {
  title: string
  description?: string
  gradient?: string
}

export function PremiumFeatureHeader({
  title,
  description,
  gradient = "from-blue-600 to-indigo-600",
}: PremiumFeatureHeaderProps) {
  return (
    <div className="space-y-4">
      <Header title={title} showBackButton />

      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {title}
        </h1>
        <PremiumNavigation />
        {description && <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">{description}</p>}
      </div>
    </div>
  )
}

