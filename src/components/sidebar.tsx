"use client"
import React, { useState } from "react";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Cpu, HelpCircle, Home, LayoutDashboard, LifeBuoy, Zap } from "lucide-react"
import { User } from "lucide-react" // or whichever you prefer
import SupportModal from "@/components/SupportModal"; // import the modal

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  
  {
    title: "Energy Usage",
    href: "/devices",
    icon: Zap,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "About Us",
    href: "/about-us",
    icon: User,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 md:h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
            <Home className="h-4 w-4" />
          </div>
          <span>SmartHome</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === link.href && "bg-sky-100 text-sky-700 hover:bg-sky-100 hover:text-sky-700",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <HelpCircle className="h-4 w-4" />
            Help & Documentation
          </Button>
          <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <LifeBuoy className="h-4 w-4" />
          Support
        </Button>
        </div>
        <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      </div>
    </div>
  )
}
