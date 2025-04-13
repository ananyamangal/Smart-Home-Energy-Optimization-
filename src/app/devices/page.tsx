"use client"

import { useState } from "react"
import {
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  ChevronDown,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Power,
  Search,
  Settings,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for devices
const devices = [
  {
    id: 1,
    name: "Living Room Smart Thermostat",
    type: "Climate Control",
    status: "Online",
    energy: 1250,
    usage: "High",
    lastActive: "2 minutes ago",
    battery: 85,
    location: "Living Room",
    image: "/thermo.png",
  },
  {
    id: 2,
    name: "Kitchen Smart Refrigerator",
    type: "Appliance",
    status: "Online",
    energy: 980,
    usage: "High",
    lastActive: "Active now",
    battery: null, // Plugged in
    location: "Kitchen",
    image: "/fridge.png",
  },
  {
    id: 3,
    name: "Bedroom Smart Lights",
    type: "Lighting",
    status: "Online",
    energy: 120,
    usage: "Low",
    lastActive: "15 minutes ago",
    battery: null, // Plugged in
    location: "Bedroom",
    image: "/light.png",
  },
  {
    id: 4,
    name: "Office Smart TV",
    type: "Entertainment",
    status: "Offline",
    energy: 450,
    usage: "Medium",
    lastActive: "2 hours ago",
    battery: null, // Plugged in
    location: "Office",
    image: "/tv.png",
  },
  {
    id: 5,
    name: "Bathroom Smart Speaker",
    type: "Entertainment",
    status: "Online",
    energy: 60,
    usage: "Low",
    lastActive: "30 minutes ago",
    battery: 42,
    location: "Bathroom",
    image: "/speaker.png",
  },
  {
    id: 6,
    name: "Garage Door Controller",
    type: "Security",
    status: "Online",
    energy: 85,
    usage: "Low",
    lastActive: "1 hour ago",
    battery: 78,
    location: "Garage",
    image: "/door.png",
  },
  {
    id: 7,
    name: "Hallway Motion Sensor",
    type: "Security",
    status: "Online",
    energy: 30,
    usage: "Very Low",
    lastActive: "5 minutes ago",
    battery: 92,
    location: "Hallway",
    image: "/hall.png",
  },
  {
    id: 8,
    name: "Kitchen Smart Oven",
    type: "Appliance",
    status: "Offline",
    energy: 1800,
    usage: "Very High",
    lastActive: "Yesterday",
    battery: null, // Plugged in
    location: "Kitchen",
    image: "/kitchen-smart-oven.png",

  },
]

// Past devices
const pastDevices = [
  {
    id: 101,
    name: "Old Living Room Thermostat",
    type: "Climate Control",
    status: "Replaced",
    energy: 1800,
    lastActive: "3 months ago",
    location: "Living Room",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 102,
    name: "Old Kitchen Lights",
    type: "Lighting",
    status: "Replaced",
    energy: 250,
    lastActive: "2 months ago",
    location: "Kitchen",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 103,
    name: "Old Bedroom Fan",
    type: "Climate Control",
    status: "Removed",
    energy: 400,
    lastActive: "6 months ago",
    location: "Bedroom",
    image: "/placeholder.svg?height=80&width=80",
  },
]
// Energy usage colors
const getEnergyColor = (usage: string): string => {
  switch (usage) {
    case "Very Low":
      return "bg-green-500";
    case "Low":
      return "bg-green-400";
    case "Medium":
      return "bg-yellow-400";
    case "High":
      return "bg-orange-500";
    case "Very High":
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};

const getBatteryIcon = (level: number | null) => {
  if (level === null)
    return <BatteryCharging className="h-5 w-5 text-green-500" />;
  if (level > 80)
    return <BatteryFull className="h-5 w-5 text-green-500" />;
  if (level > 50)
    return <BatteryMedium className="h-5 w-5 text-yellow-500" />;
  if (level > 20)
    return <BatteryLow className="h-5 w-5 text-orange-500" />;
  return <BatteryWarning className="h-5 w-5 text-red-500" />;
};


export default function DevicesPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("energy")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sort devices based on selected criteria
  const sortedDevices = [...devices].sort((a, b) => {
    if (sortBy === "energy") return b.energy - a.energy
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "location") return a.location.localeCompare(b.location)
    if (sortBy === "status") return a.status.localeCompare(b.status)
    return 0
  })

  // Filter devices based on status
  const filteredDevices = sortedDevices.filter((device) => {
    if (filterStatus === "all") return true
    if (filterStatus === "online") return device.status === "Online"
    if (filterStatus === "offline") return device.status === "Offline"
    return true
  })

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-blue-700">Devices</h1>
          <p className="text-gray-500">Manage and monitor all your connected smart home devices.</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search devices..." className="pl-8" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="energy">Energy Usage</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">More filters</span>
            </Button>

            <div className="flex items-center rounded-md border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-none rounded-l-md"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-none rounded-r-md"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="current">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="current">Current Devices</TabsTrigger>
              <TabsTrigger value="past">Past Devices</TabsTrigger>
            </TabsList>

            
          </div>

          <TabsContent value="current" className="space-y-6">
            {viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredDevices.map((device) => (
                  <Card key={device.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="line-clamp-1 text-base">{device.name}</CardTitle>
                          <CardDescription>{device.type}</CardDescription>
                        </div>
                        <Badge
                          variant={device.status === "Online" ? "default" : "secondary"}
                          className={device.status === "Online" ? "bg-green-500" : ""}
                        >
                          {device.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-100">
                          <img src={device.image || "/placeholder.svg"} alt={device.name} className="h-12 w-12" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Zap className="mr-1 h-4 w-4 text-yellow-500" />
                            <span>{device.energy} kWh/year</span>
                          </div>
                          <div className="flex items-center text-sm">
                            {getBatteryIcon(device.battery)}
                            <span className="ml-1">{device.battery ? `${device.battery}%` : "Plugged In"}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{device.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Energy Usage</span>
                          <span className="font-medium">{device.usage}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className={`h-2 rounded-full ${getEnergyColor(device.usage)}`}
                            style={{ width: `${device.energy / 20}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-3 w-3" />
                        Settings
                      </Button>
                      <Switch checked={device.status === "Online"} />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-4">Device</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Energy Usage</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {filteredDevices.map((device) => (
                  <div key={device.id} className="grid grid-cols-12 items-center gap-2 border-b p-4 last:border-0">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                        <img src={device.image || "/placeholder.svg"} alt={device.name} className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-xs text-gray-500">{device.type}</div>
                      </div>
                    </div>
                    <div className="col-span-2">{device.location}</div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getEnergyColor(device.usage)}`} />
                        <span>{device.energy} kWh/yr</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant={device.status === "Online" ? "default" : "secondary"}
                        className={device.status === "Online" ? "bg-green-500" : ""}
                      >
                        {device.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Settings</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Power className="h-4 w-4" />
                        <span className="sr-only">Power</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Device</DropdownMenuItem>
                          <DropdownMenuItem>Remove Device</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-4">Device</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Energy Usage</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Last Active</div>
              </div>
              {pastDevices.map((device) => (
                <div key={device.id} className="grid grid-cols-12 items-center gap-2 border-b p-4 last:border-0">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <img src={device.image || "/placeholder.svg"} alt={device.name} className="h-6 w-6 opacity-50" />
                    </div>
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-xs text-gray-500">{device.type}</div>
                    </div>
                  </div>
                  <div className="col-span-2">{device.location}</div>
                  <div className="col-span-2">
                    <span>{device.energy} kWh/yr</span>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline">{device.status}</Badge>
                  </div>
                  <div className="col-span-2 text-gray-500">{device.lastActive}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Energy Optimization Suggestions</CardTitle>
            <CardDescription>Ways to reduce energy consumption of your devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Thermostat Schedule Optimization</h3>
                    <p className="text-sm text-gray-500">
                      Your living room thermostat is running at high energy usage. Adjusting the schedule could save up
                      to 15% on heating costs.
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-blue-600">
                      Optimize Schedule
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Kitchen Appliance Power Management</h3>
                    <p className="text-sm text-gray-500">
                      Your refrigerator is consuming more energy than similar models. Consider a maintenance check or
                      temperature adjustment.
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-blue-600">
                      View Recommendations
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

