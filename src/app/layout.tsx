import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Smart Home Energy Dashboard",
  description: "Monitor and optimize your home energy usage",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} data-testid="root-layout-body">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col">
              {/* Navbar */}
              <Navbar />

              {/* Main Content */}
              <main className="flex-1 overflow-y-auto p-4">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
