"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/user-store"
import { PremiumRequired } from "@/components/premium/premium-required"
import { hasPremiumAccess } from "@/lib/subscription-service"
import { Button } from "@/components/ui/button"
import { Download, CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for billing
const mockBillingData = {
  plan: "premium",
  status: "active",
  amount: 29.99,
  billingCycle: "monthly",
  nextBillingDate: new Date(2023, 11, 15),
  paymentMethod: {
    type: "credit_card",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    brand: "Visa",
  },
  invoices: [
    { id: "INV-001", date: new Date(2023, 10, 15), amount: 29.99, status: "paid" },
    { id: "INV-002", date: new Date(2023, 9, 15), amount: 29.99, status: "paid" },
    { id: "INV-003", date: new Date(2023, 8, 15), amount: 29.99, status: "paid" },
  ],
}

export function BillingClient() {
  const { currentUser } = useUserStore()
  const [isUpdating, setIsUpdating] = useState(false)

  if (!currentUser || !hasPremiumAccess(currentUser)) {
    return <PremiumRequired feature="Billing Management" />
  }

  const handleUpdatePayment = () => {
    setIsUpdating(true)
    // Mock API call
    setTimeout(() => {
      setIsUpdating(false)
    }, 1500)
  }

  const handleCancelSubscription = () => {
    // Mock API call
    if (
      confirm(
        "Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing cycle.",
      )
    ) {
      // Handle cancellation
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Receipts
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Plan:</span>
              <Badge variant="default" className="capitalize">
                {mockBillingData.plan}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="outline" className="capitalize flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {mockBillingData.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">${mockBillingData.amount}/month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Billing Cycle:</span>
              <span className="capitalize">{mockBillingData.billingCycle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Next Billing:</span>
              <span>{formatDate(mockBillingData.nextBillingDate, "PPP")}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your current payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {mockBillingData.paymentMethod.brand} ending in {mockBillingData.paymentMethod.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {mockBillingData.paymentMethod.expiryMonth}/{mockBillingData.paymentMethod.expiryYear}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleUpdatePayment} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Payment Method"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Features</CardTitle>
            <CardDescription>What's included in your plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Event Analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Attendance Tracking</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Conversion Metrics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Custom Branding</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Advanced Messaging</span>
              </li>
              <li className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">Team Collaboration (Business Plan)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full">
              Upgrade to Business
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList className="mb-4">
          <TabsTrigger value="invoices">Billing History</TabsTrigger>
          <TabsTrigger value="settings">Billing Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBillingData.invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{formatDate(invoice.date, "PPP")}</TableCell>
                      <TableCell>${invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize flex items-center gap-1 w-fit">
                          <CheckCircle className="h-3 w-3" />
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage your billing preferences and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="billing-email">Billing Email</Label>
                <Input id="billing-email" defaultValue={currentUser.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing-name">Billing Name</Label>
                <Input id="billing-name" defaultValue={currentUser.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name (Optional)</Label>
                <Input id="company-name" placeholder="Enter company name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID (Optional)</Label>
                <Input id="tax-id" placeholder="Enter tax ID" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

