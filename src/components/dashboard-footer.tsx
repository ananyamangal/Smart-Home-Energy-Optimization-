import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardFooter() {
  return (
    <footer className="mt-12 border-t py-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © 2023 SmartHome Energy. Powered by Oracle SQL + ML Backend
        </p>
       
      </div>
    </footer>
  )
}
