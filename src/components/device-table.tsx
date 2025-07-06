"use client"

import { useState } from "react"
import { AirVent, Droplet, Lamp, Laptop, MonitorSmartphone, Refrigerator, Search, Tv, Wifi } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Mock data for devices
const devices = [
  {
    id: 1,
    name: "Living Room AC",
    room: "Living Room",
    consumption: 1.8,
    status: "Active",
    icon: AirVent,
  },
  {
    id: 2,
    name: "Kitchen Refrigerator",
    room: "Kitchen",
    consumption: 0.9,
    status: "Active",
    icon: Refrigerator,
  },
  {
    id: 3,
    name: "Master Bedroom TV",
    room: "Master Bedroom",
    consumption: 0.4,
    status: "Active",
    icon: Tv,
  },
  {
    id: 4,
    name: "Study Room Laptop",
    room: "Study",
    consumption: 0.3,
    status: "Active",
    icon: Laptop,
  },
  {
    id: 5,
    name: "Guest Room Lights",
    room: "Guest Room",
    consumption: 0.1,
    status: "Active",
    icon: Lamp,
  },
  {
    id: 6,
    name: "Bathroom Heater",
    room: "Bathroom",
    consumption: 0.0,
    status: "Off",
    icon: Droplet,
  },
  {
    id: 7,
    name: "WiFi Router",
    room: "Living Room",
    consumption: 0.1,
    status: "Active",
    icon: Wifi,
  },
  {
    id: 8,
    name: "Smart TV",
    room: "Living Room",
    consumption: 0.0,
    status: "Off",
    icon: MonitorSmartphone,
  },
]

export function DeviceTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.room.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-2">
        <CardTitle>Live Device Usage</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search devices or rooms..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Consumption</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <device.icon className="h-4 w-4 text-sky-600" />
                      {device.name}
                    </div>
                  </TableCell>
                  <TableCell>{device.room}</TableCell>
                  <TableCell>{device.consumption} kWh</TableCell>
                  <TableCell>
                    <Badge variant={device.status === "Active" ? "default" : "secondary"}>{device.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
