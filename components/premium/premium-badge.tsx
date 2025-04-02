import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PremiumBadgeProps {
  plan: string
  className?: string
}

export function PremiumBadge({ plan, className = "" }: PremiumBadgeProps) {
  if (plan === "free") return null

  const isPremium = plan === "premium"
  const isBusiness = plan === "business"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className={`${
              isPremium
                ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                : "bg-gradient-to-r from-purple-500 to-pink-500"
            } text-white ${className}`}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            {isPremium ? "Premium" : "Business"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isPremium ? "Premium" : "Business"} member since {new Date().toLocaleDateString()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

