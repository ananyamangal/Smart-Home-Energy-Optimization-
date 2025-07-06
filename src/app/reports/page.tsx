"use client"

import { useState } from "react"
import { Download, FileText, Filter, Home, Info, Lightbulb, Printer, RefreshCw, Share2 } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for the charts
const monthlyEnergyData = [
  { name: "Jan", usage: 320 },
  { name: "Feb", usage: 300 },
  { name: "Mar", usage: 280 },
  { name: "Apr", usage: 260 },
  { name: "May", usage: 240 },
  { name: "Jun", usage: 220 },
  { name: "Jul", usage: 280 },
  { name: "Aug", usage: 260 },
  { name: "Sep", usage: 240 },
  { name: "Oct", usage: 220 },
  { name: "Nov", usage: 280 },
  { name: "Dec", usage: 320 },
]

const roomEnergyData = [
  { name: "Living Room", value: 35 },
  { name: "Kitchen", value: 25 },
  { name: "Bedroom", value: 15 },
  { name: "Bathroom", value: 10 },
  { name: "Office", value: 15 },
]

const deviceEnergyData = [
  { name: "HVAC", usage: 45 },
  { name: "Lighting", usage: 20 },
  { name: "Refrigerator", usage: 15 },
  { name: "TV", usage: 10 },
  { name: "Computer", usage: 10 },
]

const hourlyEnergyData = [
  { time: "00:00", usage: 10 },
  { time: "02:00", usage: 8 },
  { time: "04:00", usage: 7 },
  { time: "06:00", usage: 12 },
  { time: "08:00", usage: 18 },
  { time: "10:00", usage: 22 },
  { time: "12:00", usage: 24 },
  { time: "14:00", usage: 25 },
  { time: "16:00", usage: 26 },
  { time: "18:00", usage: 30 },
  { time: "20:00", usage: 28 },
  { time: "22:00", usage: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const recommendations = [
  {
    id: 1,
    title: "Optimize HVAC Schedule",
    description: "Adjust your HVAC schedule to run less during peak hours. This could save up to 15% on energy costs.",
    savings: "15%",
  },
  {
    id: 2,
    title: "Replace Lighting with LEDs",
    description: "Switch remaining non-LED bulbs to energy-efficient LEDs to reduce lighting energy consumption.",
    savings: "10%",
  },
  {
    id: 3,
    title: "Smart Power Strips",
    description:
      "Use smart power strips for electronics to eliminate phantom energy usage when devices are not in use.",
    savings: "5%",
  },
  {
    id: 4,
    title: "Optimize Refrigerator Temperature",
    description: "Set your refrigerator to the optimal temperature (37-40°F) to reduce energy consumption.",
    savings: "3%",
  },
]

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState("monthly")

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF or CSV
    alert("Downloading report...")
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-blue-700">Energy Reports</h1>
          <p className="text-gray-500">
            Comprehensive analysis of your home's energy usage and optimization recommendations.
          </p>
        </div>

     

        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rooms">By Room</TabsTrigger>
            <TabsTrigger value="devices">By Device</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-700">Total Energy Usage</CardTitle>
                  <CardDescription>Monthly consumption in kWh</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,845 kWh</div>
                  <p className="text-sm text-green-600">↓ 12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-700">Energy Cost</CardTitle>
                  <CardDescription>Monthly cost in USD</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$342.15</div>
                  <p className="text-sm text-green-600">↓ 8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-700">Carbon Footprint</CardTitle>
                  <CardDescription>CO2 emissions in kg</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,250 kg</div>
                  <p className="text-sm text-green-600">↓ 10% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">Monthly Energy Consumption</CardTitle>
                <CardDescription>Energy usage over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyEnergyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} kWh`, "Energy Usage"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            
              
          </TabsContent>

          <TabsContent value="rooms" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Energy Usage by Room</CardTitle>
                  <CardDescription>Percentage of total energy consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roomEnergyData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {roomEnergyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Room-by-Room Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of energy usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roomEnergyData.map((room, index) => (
                      <div key={room.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="mr-2 h-3 w-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{room.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{room.value}%</span>
                          <span className="text-sm text-gray-500">{(room.value * 28.45).toFixed(0)} kWh</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    View Room Details
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">Room Efficiency Score</CardTitle>
                <CardDescription>Energy efficiency rating for each room</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roomEnergyData.map((room) => {
                    const score = 100 - room.value
                    let color = "bg-red-500"
                    if (score > 80) color = "bg-green-500"
                    else if (score > 60) color = "bg-yellow-500"
                    else if (score > 40) color = "bg-orange-500"

                    return (
                      <div key={`score-${room.name}`} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{room.name}</span>
                          <span className="font-medium">{score}/100</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className={`h-2 rounded-full ${color}`} style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Energy Usage by Device Type</CardTitle>
                  <CardDescription>Percentage of total energy consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deviceEnergyData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip formatter={(value) => [`${value}%`, "Energy Usage"]} />
                        <Bar dataKey="usage" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Device Efficiency Ranking</CardTitle>
                  <CardDescription>Energy efficiency of your devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceEnergyData.map((device, index) => {
                      const efficiency = 100 - device.usage * 1.5
                      let rating = "Poor"
                      let color = "text-red-500"

                      if (efficiency > 80) {
                        rating = "Excellent"
                        color = "text-green-500"
                      } else if (efficiency > 60) {
                        rating = "Good"
                        color = "text-yellow-500"
                      } else if (efficiency > 40) {
                        rating = "Average"
                        color = "text-orange-500"
                      }

                      return (
                        <div key={device.name} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-blue-600" />
                            <span>{device.name}</span>
                          </div>
                          <div className={`font-medium ${color}`}>{rating}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Devices
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">Device Usage Patterns</CardTitle>
                <CardDescription>When your devices are consuming energy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {deviceEnergyData.slice(0, 3).map((device) => (
                    <div key={`pattern-${device.name}`} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{device.name}</span>
                        <span className="text-sm text-gray-500">{device.usage}% of total usage</span>
                      </div>
                      <div className="flex h-8 w-full rounded-md overflow-hidden">
                        {Array.from({ length: 24 }).map((_, i) => {
                          // Generate a random usage pattern
                          const intensity = Math.random()
                          let bgColor = "bg-blue-100"
                          if (intensity > 0.7) bgColor = "bg-blue-600"
                          else if (intensity > 0.4) bgColor = "bg-blue-400"
                          else if (intensity > 0.2) bgColor = "bg-blue-200"

                          return (
                            <div
                              key={i}
                              className={`flex-1 ${bgColor} border-r border-white`}
                              title={`${i}:00 - ${i + 1}:00`}
                            />
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>6 PM</span>
                        <span>12 AM</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Potential Savings</CardTitle>
                  <CardDescription>Estimated monthly savings with optimizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-5xl font-bold text-blue-700">$68.43</div>
                    <p className="text-sm text-gray-500">20% of your current bill</p>
                    <div className="mt-4 h-4 w-full rounded-full bg-gray-200">
                      <div className="h-4 rounded-full bg-blue-600" style={{ width: "20%" }} />
                    </div>
                    <div className="flex w-full justify-between text-xs">
                      <span>Current: $342.15</span>
                      <span>Potential: $273.72</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Environmental Impact</CardTitle>
                  <CardDescription>Potential reduction in carbon footprint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl font-bold">-250kg</div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle className="stroke-gray-200" cx="50" cy="50" r="40" strokeWidth="10" fill="none" />
                        <circle
                          className="stroke-blue-600"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset="50.24"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <p className="text-center text-sm">
                      Equivalent to planting <span className="font-bold">12 trees</span> per year
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">Optimization Recommendations</CardTitle>
                <CardDescription>Actionable steps to reduce energy consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="mt-0.5 h-5 w-5 text-yellow-500" />
                          <div>
                            <h3 className="font-medium">{rec.title}</h3>
                            <p className="text-sm text-gray-500">{rec.description}</p>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                          Save {rec.savings}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          <Info className="mr-2 h-4 w-4" />
                          Learn More
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Full Recommendation Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
