import { Activity, Clock, Cpu, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Energy Consumed Today</CardTitle>
          <Activity className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">12.8 kWh</div>
          <p className="text-xs text-gray-500">+2.1% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peak Usage Time</CardTitle>
          <Clock className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">7:00 PM</div>
          <p className="text-xs text-gray-500">3.2 kWh during peak</p>
        </CardContent>
      </Card>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Devices in Use</CardTitle>
          <Cpu className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">8 / 15</div>
          <p className="text-xs text-gray-500">53% of devices active</p>
        </CardContent>
      </Card>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estimated Daily Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">₹156.42</div>
          <p className="text-xs text-gray-500">-₹12.30 from yesterday</p>
        </CardContent>
      </Card>
    </div>
  )
}
