import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewCards } from "@/components/overview-cards"
import { EnergyCharts } from "@/components/energy-charts"
import { DeviceTable } from "@/components/device-table"
import { SuggestionsPanel } from "@/components/suggestions-panel"
import { AlertsPanel } from "@/components/alerts-panel"
import { DashboardFooter } from "@/components/dashboard-footer"


export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
    
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
  )
}
