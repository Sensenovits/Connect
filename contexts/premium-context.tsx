"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface PremiumContextType {
  hasPremiumAccess: boolean
  isPremiumDemo: boolean
  demoExpiryTime: number | null
  activatePremiumDemo: () => void
  deactivatePremiumDemo: () => void
  getRemainingDemoTime: () => string
}

const PremiumContext = createContext<PremiumContextType>({
  hasPremiumAccess: false,
  isPremiumDemo: false,
  demoExpiryTime: null,
  activatePremiumDemo: () => {},
  deactivatePremiumDemo: () => {},
  getRemainingDemoTime: () => "",
})

export const usePremium = () => useContext(PremiumContext)

interface PremiumProviderProps {
  children: ReactNode
}

export function PremiumProvider({ children }: PremiumProviderProps) {
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false)
  const [isPremiumDemo, setIsPremiumDemo] = useState(false)
  const [demoExpiryTime, setDemoExpiryTime] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if user has premium access
    if (typeof window !== "undefined") {
      const premiumAccess = localStorage.getItem("premiumAccess") === "true"
      setHasPremiumAccess(premiumAccess)

      // Check if demo is active
      const demoExpiry = localStorage.getItem("premiumDemoExpiry")
      if (demoExpiry) {
        const expiryTime = Number.parseInt(demoExpiry, 10)
        const now = Date.now()

        if (expiryTime > now) {
          setIsPremiumDemo(true)
          setDemoExpiryTime(expiryTime)
        } else {
          // Demo has expired
          localStorage.removeItem("premiumDemoExpiry")
          setIsPremiumDemo(false)
          setDemoExpiryTime(null)
        }
      }
    }
  }, [])

  // Check demo expiry every minute
  useEffect(() => {
    if (!mounted) return

    const checkDemoExpiry = () => {
      if (typeof window !== "undefined") {
        const demoExpiry = localStorage.getItem("premiumDemoExpiry")
        if (demoExpiry) {
          const expiryTime = Number.parseInt(demoExpiry, 10)
          const now = Date.now()

          if (expiryTime <= now) {
            // Demo has expired
            localStorage.removeItem("premiumDemoExpiry")
            setIsPremiumDemo(false)
            setDemoExpiryTime(null)
          }
        }
      }
    }

    const interval = setInterval(checkDemoExpiry, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [mounted])

  const activatePremiumDemo = () => {
    if (!mounted) return

    // Set demo expiry to 24 hours from now
    if (typeof window !== "undefined") {
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem("premiumDemoExpiry", expiryTime.toString())
      setIsPremiumDemo(true)
      setDemoExpiryTime(expiryTime)
    }
  }

  const deactivatePremiumDemo = () => {
    if (!mounted) return

    if (typeof window !== "undefined") {
      localStorage.removeItem("premiumDemoExpiry")
      setIsPremiumDemo(false)
      setDemoExpiryTime(null)
    }
  }

  const getRemainingDemoTime = (): string => {
    if (!demoExpiryTime) return ""

    const now = Date.now()
    const remainingMs = Math.max(0, demoExpiryTime - now)

    const hours = Math.floor(remainingMs / (1000 * 60 * 60))
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  return (
    <PremiumContext.Provider
      value={{
        hasPremiumAccess: hasPremiumAccess || isPremiumDemo,
        isPremiumDemo,
        demoExpiryTime,
        activatePremiumDemo,
        deactivatePremiumDemo,
        getRemainingDemoTime,
      }}
    >
      {children}
    </PremiumContext.Provider>
  )
}

