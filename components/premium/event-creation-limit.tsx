"use client"

import type React from "react"

// Import the hasPremiumAccess function
import { hasPremiumAccess } from "@/lib/subscription-service"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from "@clerk/nextjs"

interface EventCreationLimitProps {
  children: React.ReactNode
}

export const EventCreationLimit = ({ children }: EventCreationLimitProps) => {
  const { user: currentUser } = useUser()

  const isPremium = currentUser ? hasPremiumAccess(currentUser) : false

  if (isPremium) {
    return <>{children}</>
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upgrade to Premium</AlertDialogTitle>
          <AlertDialogDescription>
            You have reached the limit of free event creations. Upgrade to premium to create unlimited events.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Upgrade</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

