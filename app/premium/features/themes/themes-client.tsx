"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Palette, Check, Plus } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { PremiumRequired } from "@/components/premium-required"

const themeCategories = [
  { id: "all", name: "All Themes" },
  { id: "elegant", name: "Elegant" },
  { id: "fun", name: "Fun & Playful" },
  { id: "professional", name: "Professional" },
  { id: "seasonal", name: "Seasonal" },
]

const themes = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean, simple design with plenty of white space",
    category: "elegant",
    colors: ["#ffffff", "#000000", "#f3f4f6", "#4b5563"],
    popular: true,
  },
  {
    id: "vibrant-celebration",
    name: "Vibrant Celebration",
    description: "Colorful and energetic theme for parties",
    category: "fun",
    colors: ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
  },
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    description: "Professional theme for business events",
    category: "professional",
    colors: ["#1e40af", "#93c5fd", "#f8fafc", "#475569"],
  },
  {
    id: "autumn-warmth",
    name: "Autumn Warmth",
    description: "Warm colors inspired by fall foliage",
    category: "seasonal",
    colors: ["#b45309", "#d97706", "#fbbf24", "#7f1d1d"],
  },
  {
    id: "spring-bloom",
    name: "Spring Bloom",
    description: "Fresh and light theme with floral accents",
    category: "seasonal",
    colors: ["#059669", "#d1fae5", "#f0fdf4", "#047857"],
  },
  {
    id: "elegant-gold",
    name: "Elegant Gold",
    description: "Sophisticated theme with gold accents",
    category: "elegant",
    colors: ["#92400e", "#fcd34d", "#fffbeb", "#1e293b"],
  },
  {
    id: "tech-conference",
    name: "Tech Conference",
    description: "Modern theme for technology events",
    category: "professional",
    colors: ["#3b82f6", "#1e293b", "#f1f5f9", "#64748b"],
  },
  {
    id: "playful-patterns",
    name: "Playful Patterns",
    description: "Fun geometric patterns and bright colors",
    category: "fun",
    colors: ["#8b5cf6", "#ec4899", "#06b6d4", "#fbbf24"],
  },
]

export function ThemesClient() {
  const { hasPremiumAccess } = usePremium()
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  const handleApplyTheme = (themeId: string) => {
    // In a real app, this would apply the theme to the event
    setSelectedTheme(themeId)
    alert(
      `Theme "${themes.find((t) => t.id === themeId)?.name}" applied! In a real app, this would update your event's appearance.`,
    )
  }

  const filteredThemes = activeCategory === "all" ? themes : themes.filter((theme) => theme.category === activeCategory)

  if (!hasPremiumAccess) {
    return (
      <PremiumRequired
        featureName="Custom Themes"
        description="Personalize your events with professional design themes"
      >
        <div>This content is only visible with premium access</div>
      </PremiumRequired>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Custom Themes</h1>
        <p className="text-muted-foreground">
          Choose from professionally designed themes to customize your event's appearance
        </p>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {themeCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="mb-1">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredThemes.map((theme) => (
              <Card
                key={theme.id}
                className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                  selectedTheme === theme.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                    {theme.popular && <Badge variant="secondary">Popular</Badge>}
                    {selectedTheme === theme.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-2">{theme.name}</CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex space-x-2 mb-3">
                    {theme.colors.map((color, index) => (
                      <div key={index} className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <div
                    className="aspect-video rounded-md flex items-center justify-center"
                    style={{
                      background: `linear-gradient(to right, ${theme.colors[0]}22, ${theme.colors[1]}22)`,
                      border: `1px solid ${theme.colors[0]}33`,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: theme.colors[0] }}>
                      Theme Preview
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={selectedTheme === theme.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleApplyTheme(theme.id)
                    }}
                  >
                    {selectedTheme === theme.id ? "Selected" : "Select Theme"}
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="overflow-hidden border-dashed hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <div className="bg-muted rounded-full p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Create Custom Theme</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Design your own theme with custom colors
                </p>
                <Button
                  variant="outline"
                  onClick={() => alert("In a real app, this would open the theme customization tool.")}
                >
                  Create New
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

