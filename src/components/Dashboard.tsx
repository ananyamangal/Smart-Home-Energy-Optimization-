// src/components/Dashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { OverviewCards } from "@/components/overview-cards";
import { EnergyCharts } from "@/components/energy-charts";
import { DeviceTable } from "@/components/device-table";
import { SuggestionsPanel } from "@/components/suggestions-panel";
import { AlertsPanel } from "@/components/alerts-panel";
import { DashboardFooter } from "@/components/dashboard-footer";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // mock fetch
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm">
            <div className="h-8 w-8 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-lg font-semibold mb-2">Loading data from backend</h2>
            <p className="text-sm text-gray-600">
              This may take a little time. <br />
              Please wait or try to refresh/reopen.
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-4 space-y-4">
          <OverviewCards />
          <EnergyCharts />
          <DeviceTable />
          <SuggestionsPanel />
          <AlertsPanel />
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}
