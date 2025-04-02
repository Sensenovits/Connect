import { PremiumRequired } from "@/components/premium-required"

export default function AdvancedMessagingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Advanced Messaging</h1>
      <PremiumRequired
        featureName="Advanced Messaging"
        description="Unlock powerful messaging tools to better communicate with your event attendees."
      />
    </div>
  )
}

