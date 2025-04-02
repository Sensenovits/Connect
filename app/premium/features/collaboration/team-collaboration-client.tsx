"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/user-store"
import { PremiumRequired } from "@/components/premium/premium-required"
import { hasPremiumAccess } from "@/lib/subscription-service"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, Mail, MoreHorizontal, Edit, Trash, Shield, User, Settings } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format as formatDate } from "date-fns"

// Mock data for team members
const mockTeamMembers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: new Date(2023, 10, 15, 14, 30),
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "editor",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: new Date(2023, 10, 15, 10, 15),
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "viewer",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    status: "invited",
    lastActive: null,
  },
  {
    id: "user-4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "editor",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: new Date(2023, 10, 14, 16, 45),
  },
]

// Mock data for roles
const mockRoles = [
  {
    id: "role-1",
    name: "Admin",
    description: "Full access to all features and settings",
    permissions: [
      "Create and edit events",
      "Manage team members",
      "Access analytics",
      "Billing management",
      "Custom branding",
      "Advanced messaging",
    ],
  },
  {
    id: "role-2",
    name: "Editor",
    description: "Can create and edit events, but cannot manage team or billing",
    permissions: ["Create and edit events", "Access analytics", "Custom branding", "Advanced messaging"],
  },
  {
    id: "role-3",
    name: "Viewer",
    description: "Read-only access to events and analytics",
    permissions: ["View events", "View analytics"],
  },
]

export function TeamCollaborationClient() {
  const { currentUser } = useUserStore()
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [roles, setRoles] = useState(mockRoles)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("editor")

  if (!currentUser || !hasPremiumAccess(currentUser) || currentUser.subscription?.plan !== "business") {
    return <PremiumRequired feature="Team Collaboration" plan="business" />
  }

  const handleInviteSubmit = () => {
    if (!inviteEmail) return

    // Add new invited user
    const newMember = {
      id: `user-${Date.now()}`,
      name: inviteEmail.split("@")[0], // Use part of email as name
      email: inviteEmail,
      role: inviteRole,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      status: "invited",
      lastActive: null,
    }

    setTeamMembers([...teamMembers, newMember])
    setInviteEmail("")
    setInviteRole("editor")
    setIsInviteDialogOpen(false)
  }

  const handleRemoveMember = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id))
    }
  }

  const handleChangeRole = (id: string, newRole: string) => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, role: newRole } : member)))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "editor":
        return <Edit className="h-4 w-4" />
      case "viewer":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Collaboration</h1>
          <p className="text-muted-foreground">Manage your team members and their access to your events</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to collaborate on your events.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Role Description</Label>
                <div className="text-sm text-muted-foreground">
                  {inviteRole === "admin" && "Full access to all features and settings"}
                  {inviteRole === "editor" && "Can create and edit events, but cannot manage team or billing"}
                  {inviteRole === "viewer" && "Read-only access to events and analytics"}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteSubmit}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="members">
        <TabsList className="mb-4">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and their access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize flex items-center gap-1 w-fit">
                          {getRoleIcon(member.role)}
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === "active" ? "default" : "secondary"} className="capitalize">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.lastActive ? formatDate(member.lastActive, "PPp") : "Never"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleChangeRole(member.id, "admin")}>
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChangeRole(member.id, "editor")}>
                              <Edit className="mr-2 h-4 w-4" />
                              Make Editor
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChangeRole(member.id, "viewer")}>
                              <User className="mr-2 h-4 w-4" />
                              Make Viewer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleRemoveMember(member.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Configure roles and permissions for your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {roles.map((role) => (
                <Card key={role.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {role.name === "Admin" && <Shield className="h-5 w-5" />}
                        {role.name === "Editor" && <Edit className="h-5 w-5" />}
                        {role.name === "Viewer" && <User className="h-5 w-5" />}
                        {role.name}
                      </CardTitle>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {role.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Role
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

