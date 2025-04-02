import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Subscription = {
  id: string
  planId: string
  status: "active" | "canceled" | "past_due"
  currentPeriodEnd: string
  isYearly: boolean
  features?: string[]
}

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  subscription?: Subscription
  createdEvents?: number
}

type UserStore = {
  currentUser: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => void
}

// Mock user data
const mockUser: User = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
  createdEvents: 3,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: mockUser,
      setUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
      isAuthenticated: !!mockUser,
      login: async (email, password) => {
        // In a real app, this would make an API call
        // For demo purposes, we'll just return the mock user
        set({ currentUser: mockUser, isAuthenticated: true })
        return mockUser
      },
      logout: () => set({ currentUser: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
    },
  ),
)

