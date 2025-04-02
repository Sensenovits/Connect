// Make sure the hasPremiumAccess function is properly implemented
export function hasPremiumAccess(): boolean {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return false
  }

  // Check localStorage for premium status
  const premiumStatus = localStorage.getItem("premiumStatus")
  return premiumStatus === "active"
}

