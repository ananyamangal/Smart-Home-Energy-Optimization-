"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts"

// Static data for devices
const deviceData = [
  { name: "AC", value: 45 },
  { name: "Heater", value: 20 },
  { name: "TV", value: 15 },
  { name: "Refrigerator", value: 10 },
  { name: "Lights", value: 5 },
  { name: "Other", value: 5 },
]

const fallbackHourlyData = [
  { hour: "00:00", consumption: 1.1 },
  { hour: "01:00", consumption: 1.3 },
  { hour: "02:00", consumption: 0.9 },
  { hour: "03:00", consumption: 1.0 },
  { hour: "04:00", consumption: 1.4 },
  { hour: "05:00", consumption: 1.6 },
  { hour: "06:00", consumption: 1.2 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

const BACKEND_URL = "http://localhost:8000/api";

export function EnergyCharts() {
  const [activeTab, setActiveTab] = useState("hourly")
  const [hourlyData, setHourlyData] = useState<any[]>([])
  const [roomUsage, setRoomUsage] = useState<any[]>([])

  useEffect(() => {
    if (activeTab === "hourly") {
      const fetchHourlyUsage = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/device_usage_log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "hourly_usage" }),
          })

          const data = await response.json()
          console.log("Fetched hourly data:", data)

          if (Array.isArray(data.hourlyData) && data.hourlyData.length > 0) {
            setHourlyData(data.hourlyData)
          } else {
            console.warn("Using fallback hourly data")
            setHourlyData(fallbackHourlyData)
          }
        } catch (error) {
          console.error("Failed to fetch hourly usage:", error)
          setHourlyData(fallbackHourlyData)
        }
      }

      fetchHourlyUsage()
    } else if (activeTab === "rooms") {
      const fetchRoomUsage = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/device_usage_log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "usage_by_room" }),
          })

          const data = await response.json()
          console.log("Fetched room usage data:", data)

          if (Array.isArray(data.roomData) && data.roomData.length > 0) {
            setRoomUsage(data.roomData)
          } else {
            console.warn("Using fallback room data")
            setRoomUsage([
              { room: "Living Room", consumption: 4.2 },
              { room: "Kitchen", consumption: 3.8 },
              { room: "Master Bedroom", consumption: 2.5 },
              { room: "Guest Room", consumption: 1.2 },
              { room: "Bathroom", consumption: 0.8 },
              { room: "Study", consumption: 1.5 },
            ])
          }
        } catch (error) {
          console.error("Failed to fetch room usage:", error)
          setRoomUsage([
            { room: "Living Room", consumption: 4.2 },
            { room: "Kitchen", consumption: 3.8 },
            { room: "Master Bedroom", consumption: 2.5 },
            { room: "Guest Room", consumption: 1.2 },
            { room: "Bathroom", consumption: 0.8 },
            { room: "Study", consumption: 1.5 },
          ])
        }
      }

      fetchRoomUsage()
    }
  }, [activeTab])

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Energy Consumption</CardTitle>
        <CardDescription>
          View your energy usage patterns across different timeframes and categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="hourly">Hourly Usage</TabsTrigger>
            <TabsTrigger value="rooms">Usage by Room</TabsTrigger>
            <TabsTrigger value="devices">Usage by Device</TabsTrigger>
          </TabsList>

          {/* HOURLY USAGE */}
          <TabsContent value="hourly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis unit=" kWh" />
                  <Tooltip
                    formatter={(value) => [`${value} kWh`, "Consumption"]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    name="Energy Consumption"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* ROOMS USAGE */}
          <TabsContent value="rooms" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={roomUsage}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="room" />
                  <YAxis unit=" kWh" />
                  <Tooltip
                    formatter={(value) => [`${value} kWh`, "Consumption"]}
                    labelFormatter={(label) => `Room: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="consumption" name="Energy Consumption" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* DEVICES USAGE */}
          <TabsContent value="devices" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
