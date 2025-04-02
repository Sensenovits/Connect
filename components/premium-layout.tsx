"use client"

import type React from "react"

import { PremiumNavigation } from "./premium/premium-navigation"
import { MainNav } from "./main-nav"

interface PremiumLayoutProps {
  children: React.ReactNode
}

export function PremiumLayout({ children }: PremiumLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] py-8">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <PremiumNavigation />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

