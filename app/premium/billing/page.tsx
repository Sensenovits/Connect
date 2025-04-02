import type { Metadata } from "next"
import { BillingClient } from "./billing-client"

export const metadata: Metadata = {
  title: "Billing | Premium Features",
  description: "Manage your subscription and billing information",
}

export default function BillingPage() {
  return <BillingClient />
}

