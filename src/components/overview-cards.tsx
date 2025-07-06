"use client";  // This marks the file as a client-side component

import { useEffect, useState } from "react";
import { Activity, Clock, Cpu, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BACKEND_URL = "https://smart-home-energy-optimization.onrender.com/api";

export function OverviewCards() {
  const [totalEnergy, setTotalEnergy] = useState<number | null>(null);
  const [peakHour, setPeakHour] = useState<string | null>(null);
  const [peakPower, setPeakPower] = useState<number | null>(null);
  const [totalDevices, setTotalDevices] = useState<number | null>(null);
  const [activeDevices, setActiveDevices] = useState<number | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null); // New state for estimated cost

  // Fetch total energy consumed today
  useEffect(() => {
    const fetchTotalEnergy = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/device_usage_log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "total_today" }),
        });
        const data = await res.json();
        if (data.result !== undefined) {
          setTotalEnergy(data.result || 0);
        } else {
          console.error("Failed to fetch total energy data");
        }
      } catch (error) {
        console.error("Failed to fetch energy data:", error);
      }
    };

    fetchTotalEnergy();
  }, []);

  // Fetch peak usage time
  useEffect(() => {
    const fetchPeakUsage = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/device_usage_log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "peak_hour" }),
        });
        const data = await res.json();
        if (data.hour && data.power !== undefined) {
          // Convert hour to a readable format (e.g. 7:00 PM)
          const formattedHour = new Date(0, 0, 0, data.hour).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          setPeakHour(formattedHour);
          setPeakPower(data.power);
        } else {
          console.error("Failed to fetch peak usage data");
        }
      } catch (error) {
        console.error("Failed to fetch peak usage data:", error);
      }
    };

    fetchPeakUsage();
  }, []);

  // Fetch active devices and total devices
  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/device_usage_log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "active_devices" }),
        });
        const data = await res.json();
        if (data.totalDevices !== undefined && data.activeDevices !== undefined) {
          setTotalDevices(data.totalDevices);
          setActiveDevices(data.activeDevices);
        } else {
          console.error("Failed to fetch device data");
        }
      } catch (error) {
        console.error("Failed to fetch device data:", error);
      }
    };

    fetchDeviceData();
  }, []);

  // Fetch estimated daily cost
  useEffect(() => {
    const fetchEstimatedCost = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/device_usage_log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "estimated_cost" }),
        });
        const data = await res.json();
        if (data.estimatedCost !== undefined) {
          // Ensure it's a valid number before setting the state
          const cost = parseFloat(data.estimatedCost);
          if (!isNaN(cost)) {
            setEstimatedCost(cost);
          } else {
            console.error("Invalid estimated cost value:", data.estimatedCost);
          }
        } else {
          console.error("Failed to fetch estimated cost data");
        }
      } catch (error) {
        console.error("Failed to fetch estimated cost data:", error);
      }
    };

    fetchEstimatedCost();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Energy Consumed Today</CardTitle>
          <Activity className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">
            {totalEnergy !== null ? `${totalEnergy.toFixed(2)} kWh` : "Loading..."}
          </div>
          <p className="text-xs text-gray-500">+2.1% from yesterday</p>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peak Usage Time</CardTitle>
          <Clock className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">
            {peakHour ? peakHour : "Loading..."}
          </div>
          <p className="text-xs text-gray-500">
            {peakPower !== null ? `${peakPower.toFixed(2)} kWh during peak` : "Loading..."}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Devices in Use</CardTitle>
          <Cpu className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">
            {totalDevices !== null && activeDevices !== null
              ? `${activeDevices} / ${totalDevices}`
              : "Loading..."}
          </div>
          <p className="text-xs text-gray-500">
            {totalDevices && activeDevices
              ? `${((activeDevices / totalDevices) * 100).toFixed(1)}% of devices active`
              : "Loading..."}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estimated Daily Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-sky-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sky-700">
            {estimatedCost !== null ? `₹${estimatedCost.toFixed(2)}` : "Loading..."}
          </div>
          <p className="text-xs text-gray-500">-₹12.30 from yesterday</p>
        </CardContent>
      </Card>
    </div>
  );
}
