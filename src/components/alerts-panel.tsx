"use client"

import { useState } from "react"
import { AlertTriangle, BellRing, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for alerts
const initialAlerts = [
  {
    id: 1,
    message: "Unusual power consumption detected in Living Room",
    timestamp: "10 minutes ago",
    severity: "high",
  },
  {
    id: 2,
    message: "AC in Master Bedroom has been running for 8 hours",
    timestamp: "2 hours ago",
    severity: "medium",
  },
  {
    id: 3,
    message: "Power outage detected in your area, switching to backup",
    timestamp: "3 hours ago",
    severity: "high",
  },
  {
    id: 4,
    message: "Smart meter update completed successfully",
    timestamp: "1 day ago",
    severity: "low",
  },
]

export function AlertsPanel() {
  const [alerts] = useState(initialAlerts)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <BellRing className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <BellRing className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-sky-600" />
          Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded-lg border p-3 shadow-sm ${
                alert.severity === "high"
                  ? "border-red-200 bg-red-50"
                  : alert.severity === "medium"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-green-200 bg-green-50"
              }`}
            >
              <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">{alert.message}</p>
                  {getSeverityBadge(alert.severity)}
                </div>
                <p className="mt-1 text-xs text-gray-500">{alert.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
