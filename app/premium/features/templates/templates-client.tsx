"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Users, Music, Gift, Briefcase, GraduationCap, Heart, Plus, Check } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { PremiumRequired } from "@/components/premium-required"

const templateCategories = [
  { id: "all", name: "All Templates" },
  { id: "social", name: "Social Events" },
  { id: "business", name: "Business Events" },
  { id: "celebration", name: "Celebrations" },
  { id: "education", name: "Education" },
]

const templates = [
  {
    id: "birthday-party",
    name: "Birthday Party",
    description: "A fun celebration with friends and family",
    category: "celebration",
    icon: Gift,
    popular: true,
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    description: "Elegant wedding event template with RSVP",
    category: "celebration",
    icon: Heart,
  },
  {
    id: "corporate-meeting",
    name: "Corporate Meeting",
    description: "Professional meeting template with agenda",
    category: "business",
    icon: Briefcase,
  },
  {
    id: "workshop",
    name: "Workshop",
    description: "Interactive workshop with registration",
    category: "education",
    icon: GraduationCap,
  },
  {
    id: "concert",
    name: "Concert",
    description: "Music event with ticket options",
    category: "social",
    icon: Music,
  },
  {
    id: "networking",
    name: "Networking Event",
    description: "Professional networking with contact sharing",
    category: "business",
    icon: Users,
  },
  {
    id: "conference",
    name: "Conference",
    description: "Multi-day conference with sessions",
    category: "business",
    icon: Calendar,
  },
  {
    id: "blank",
    name: "Blank Template",
    description: "Start from scratch with a blank template",
    category: "all",
    icon: FileText,
  },
]

export function EventTemplatesClient() {
  const { hasPremiumAccess } = usePremium()
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleUseTemplate = (templateId: string) => {
    // In a real app, this would redirect to the event creation page with the template
    setSelectedTemplate(templateId)
    alert(
      `Template "${templates.find((t) => t.id === templateId)?.name}" selected! In a real app, this would take you to the event creation page.`,
    )
  }

  const filteredTemplates =
    activeCategory === "all" ? templates : templates.filter((template) => template.category === activeCategory)

  if (!hasPremiumAccess) {
    return (
      <PremiumRequired
        featureName="Event Templates"
        description="Create professional events faster with our pre-designed templates"
      >
        <div>This content is only visible with premium access</div>
      </PremiumRequired>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Event Templates</h1>
        <p className="text-muted-foreground">
          Choose from professionally designed templates to create your event quickly
        </p>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {templateCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="mb-1">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon

              return (
                <Card
                  key={template.id}
                  className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                    selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {template.popular && <Badge variant="secondary">Popular</Badge>}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Template Preview</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUseTemplate(template.id)
                      }}
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}

            <Card className="overflow-hidden border-dashed hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <div className="bg-muted rounded-full p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Create Custom Template</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">Design your own template from scratch</p>
                <Button variant="outline">Create New</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

