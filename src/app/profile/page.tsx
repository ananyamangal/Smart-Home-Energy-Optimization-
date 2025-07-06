"use client"

import { useState } from "react"
import {
  AtSign,
  Bell,
  Camera,
  Check,
  CreditCard,
  Edit,
  Globe,
  Home,
  Key,
  Lock,
  LogOut,
  Moon,
  Plus,
  Save,
  Settings,
  Shield,
  SmartphoneCharging,
  Sun,
  User,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false)
  const [theme, setTheme] = useState("light")

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-blue-700">My Profile</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-4 py-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change profile picture</span>
                  </Button>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
                <Badge className="bg-blue-600">Premium User</Badge>
              </div>

              <Separator className="my-4" />

              <nav className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Personal Information
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy & Security
                </Button>
                <Button variant="ghost" className="justify-start">
                  <SmartphoneCharging className="mr-2 h-4 w-4" />
                  Connected Devices
                </Button>
                <Button variant="ghost" className="justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
              </nav>

              <Separator className="my-4" />

              <Button variant="outline" className="w-full justify-start text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-700">Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
                      {editMode ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" disabled={!editMode} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" disabled={!editMode} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" disabled={!editMode} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" disabled={!editMode} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        defaultValue="123 Smart Home Street, Energy City, EC 12345"
                        disabled={!editMode}
                      />
                    </div>
                  </CardContent>
                  {editMode && (
                    <CardFooter>
                      <Button className="ml-auto bg-blue-600 hover:bg-blue-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Account Information</CardTitle>
                    <CardDescription>Details about your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Type</span>
                      <span className="font-medium">Premium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Member Since</span>
                      <span className="font-medium">January 15, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Login</span>
                      <span className="font-medium">Today, 10:30 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subscription</span>
                      <span className="font-medium text-green-600">Active (Renews on Jan 15, 2024)</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Display Preferences</CardTitle>
                    <CardDescription>Customize how the application looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Theme</Label>
                        <p className="text-sm text-gray-500">Choose between light and dark mode</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className={`h-5 w-5 ${theme === "light" ? "text-yellow-500" : "text-gray-400"}`} />
                        <Switch
                          checked={theme === "dark"}
                          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                        />
                        <Moon className={`h-5 w-5 ${theme === "dark" ? "text-blue-500" : "text-gray-400"}`} />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Language</Label>
                        <p className="text-sm text-gray-500">Select your preferred language</p>
                      </div>
                      <div className="flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-gray-500" />
                        <select className="rounded-md border border-gray-300 px-3 py-1">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Dashboard Default View</Label>
                        <p className="text-sm text-gray-500">Choose your default dashboard view</p>
                      </div>
                      <select className="rounded-md border border-gray-300 px-3 py-1">
                        <option>Energy Overview</option>
                        <option>Device Status</option>
                        <option>Room Analysis</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Temperature Unit</Label>
                        <p className="text-sm text-gray-500">Choose your preferred temperature unit</p>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="celsius"
                            name="temp-unit"
                            className="h-4 w-4 accent-blue-600"
                            defaultChecked
                          />
                          <Label htmlFor="celsius">Celsius (°C)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="fahrenheit" name="temp-unit" className="h-4 w-4 accent-blue-600" />
                          <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive text messages for critical alerts</p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Notification Types</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="energy-alerts"
                            className="h-4 w-4 accent-blue-600"
                            defaultChecked
                          />
                          <Label htmlFor="energy-alerts">Energy usage alerts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="device-status"
                            className="h-4 w-4 accent-blue-600"
                            defaultChecked
                          />
                          <Label htmlFor="device-status">Device status changes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="savings-tips" className="h-4 w-4 accent-blue-600" defaultChecked />
                          <Label htmlFor="savings-tips">Energy saving tips</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="system-updates"
                            className="h-4 w-4 accent-blue-600"
                            defaultChecked
                          />
                          <Label htmlFor="system-updates">System updates</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto bg-blue-600 hover:bg-blue-700">Save Notification Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto bg-blue-600 hover:bg-blue-700">
                      <Key className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable 2FA</Label>
                        <p className="text-sm text-gray-500">Secure your account with two-factor authentication</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Authentication Method</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="app"
                            name="auth-method"
                            className="h-4 w-4 accent-blue-600"
                            defaultChecked
                          />
                          <Label htmlFor="app">Authenticator App</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="sms" name="auth-method" className="h-4 w-4 accent-blue-600" />
                          <Label htmlFor="sms">SMS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="email" name="auth-method" className="h-4 w-4 accent-blue-600" />
                          <Label htmlFor="email">Email</Label>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md bg-blue-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Your account is secure</h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>Two-factor authentication is enabled for your account.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="ml-auto">
                      <Lock className="mr-2 h-4 w-4" />
                      Manage 2FA Settings
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Login Sessions</CardTitle>
                    <CardDescription>Manage your active sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Device:</span> MacBook Pro
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Location:</span> New York, USA
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">IP Address:</span> 192.168.1.1
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Last Active:</span> Just now
                          </p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Device:</span> iPhone 13
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Location:</span> New York, USA
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">IP Address:</span> 192.168.1.2
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Last Active:</span> 2 hours ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="text-red-600">
                      Log Out of All Devices
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Connected Devices Tab */}
              <TabsContent value="devices" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Connected Devices</CardTitle>
                    <CardDescription>Manage devices connected to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Home className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Smart Home Hub</p>
                            <p className="text-sm text-gray-500">Connected since Jan 15, 2023</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <SmartphoneCharging className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Mobile App</p>
                            <p className="text-sm text-gray-500">Connected since Feb 3, 2023</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <AtSign className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Web Dashboard</p>
                            <p className="text-sm text-gray-500">Connected since Jan 15, 2023</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="text-red-600">
                      <X className="mr-2 h-4 w-4" />
                      Disconnect All
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Device
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">Third-Party Integrations</CardTitle>
                    <CardDescription>Manage connected services and applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-md bg-gray-100 p-2">
                            <img src="/placeholder.svg?height=40&width=40" alt="Google Home" />
                          </div>
                          <div>
                            <p className="font-medium">Google Home</p>
                            <p className="text-sm text-gray-500">Connected on Mar 10, 2023</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-md bg-gray-100 p-2">
                            <img src="/placeholder.svg?height=40&width=40" alt="Amazon Alexa" />
                          </div>
                          <div>
                            <p className="font-medium">Amazon Alexa</p>
                            <p className="text-sm text-gray-500">Connected on Feb 22, 2023</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-md bg-gray-100 p-2">
                            <img src="/placeholder.svg?height=40&width=40" alt="Apple HomeKit" />
                          </div>
                          <div>
                            <p className="font-medium">Apple HomeKit</p>
                            <p className="text-sm text-gray-500">Not connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto bg-blue-600 hover:bg-blue-700">
                      <Check className="mr-2 h-4 w-4" />
                      Save Integration Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
