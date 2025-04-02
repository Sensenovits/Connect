import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PremiumProvider } from "@/contexts/premium-context"
import { AppHeader } from "@/components/app-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Party Connect",
  description: "Connect with friends and plan events",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PremiumProvider>
          <AppHeader />
          {children}
        </PremiumProvider>
      </body>
    </html>
  )
}



import './globals.css'