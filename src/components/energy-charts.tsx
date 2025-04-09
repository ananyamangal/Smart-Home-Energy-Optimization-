"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"


// Mock data for charts
const hourlyData = [
  { hour: "12 AM", consumption: 0.8 },
  { hour: "2 AM", consumption: 0.5 },
  { hour: "4 AM", consumption: 0.3 },
  { hour: "6 AM", consumption: 0.7 },
  { hour: "8 AM", consumption: 1.2 },
  { hour: "10 AM", consumption: 1.5 },
  { hour: "12 PM", consumption: 1.8 },
  { hour: "2 PM", consumption: 1.6 },
  { hour: "4 PM", consumption: 1.9 },
  { hour: "6 PM", consumption: 2.3 },
  { hour: "8 PM", consumption: 2.0 },
  { hour: "10 PM", consumption: 1.2 },
]

const roomData = [
  { room: "Living Room", consumption: 4.2 },
  { room: "Kitchen", consumption: 3.8 },
  { room: "Master Bedroom", consumption: 2.5 },
  { room: "Guest Room", consumption: 1.2 },
  { room: "Bathroom", consumption: 0.8 },
  { room: "Study", consumption: 1.5 },
]

const deviceData = [
  { name: "AC", value: 45 },
  { name: "Heater", value: 20 },
  { name: "TV", value: 15 },
  { name: "Refrigerator", value: 10 },
  { name: "Lights", value: 5 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function EnergyCharts() {
  const [activeTab, setActiveTab] = useState("hourly")

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Energy Consumption</CardTitle>
        <CardDescription>View your energy usage patterns across different timeframes and categories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="hourly">Hourly Usage</TabsTrigger>
            <TabsTrigger value="rooms">Usage by Room</TabsTrigger>
            <TabsTrigger value="devices">Usage by Device</TabsTrigger>
          </TabsList>
          <TabsContent value="hourly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
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
          <TabsContent value="rooms" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={roomData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
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
