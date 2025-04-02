"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Define the form schema with validation
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  organization: z.string().optional(),
  title: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This is a mock function - replace with your actual data fetching logic
const fetchUserProfile = async () => {
  // Simulate API call
  return {
    name: "John Doe",
    email: "john@example.com",
    bio: "Event organizer and tech enthusiast",
    organization: "Tech Events Inc.",
    title: "Event Manager",
  }
}

// This is a mock function - replace with your actual update logic
const updateUserProfile = async (values: ProfileFormValues) => {
  // Simulate API call
  console.log("Updating profile with:", values)
  return { success: true }
}

export function ProfileEditDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [defaultValues, setDefaultValues] = useState<Partial<ProfileFormValues>>({
    name: "",
    email: "",
    bio: "",
    organization: "",
    title: "",
  })

  // Initialize the form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // Fetch user data when the dialog opens
  useEffect(() => {
    if (open) {
      const loadUserData = async () => {
        setIsLoading(true)
        try {
          const userData = await fetchUserProfile()

          // Safely handle potentially undefined values with null checks
          setDefaultValues({
            name: userData?.name ? userData.name.trim() : "",
            email: userData?.email ? userData.email.trim() : "",
            bio: userData?.bio ? userData.bio.trim() : "",
            organization: userData?.organization ? userData.organization.trim() : "",
            title: userData?.title ? userData.title.trim() : "",
          })

          // Reset form with the new values
          form.reset({
            name: userData?.name ? userData.name.trim() : "",
            email: userData?.email ? userData.email.trim() : "",
            bio: userData?.bio ? userData.bio.trim() : "",
            organization: userData?.organization ? userData.organization.trim() : "",
            title: userData?.title ? userData.title.trim() : "",
          })
        } catch (error) {
          console.error("Error loading user data:", error)
          toast({
            title: "Error",
            description: "Failed to load profile data. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }

      loadUserData()
    }
  }, [open, form])

  // Handle form submission
  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    try {
      // Safely trim all string values before submission
      const trimmedData = {
        name: data.name ? data.name.trim() : "",
        email: data.email ? data.email.trim() : "",
        bio: data.bio ? data.bio.trim() : "",
        organization: data.organization ? data.organization.trim() : "",
        title: data.title ? data.title.trim() : "",
      }

      const result = await updateUserProfile(trimmedData)

      if (result.success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
        setOpen(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile information here.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Brief description for your profile. Max 160 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Your organization" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your job title" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

