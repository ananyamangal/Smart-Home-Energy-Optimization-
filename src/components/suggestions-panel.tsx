"use client"

import { useState } from "react"
import { LightbulbIcon, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for suggestions
const initialSuggestions = [
  {
    id: 1,
    message: "Reduce AC usage during peak hours (6-9 PM) to save up to ₹45 per day",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    message: "Your refrigerator is consuming 15% more energy than usual. Consider checking the seals",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    message: "Switch to LED bulbs in the living room to save up to ₹120 per month",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    message: "Schedule your washing machine to run during off-peak hours (11 PM - 6 AM)",
    timestamp: "2 days ago",
  },
]

export function SuggestionsPanel() {
  const [suggestions, setSuggestions] = useState(initialSuggestions)

  const dismissSuggestion = (id: number) => {
    setSuggestions(suggestions.filter((suggestion) => suggestion.id !== id))
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5 text-yellow-500" />
          Energy Saving Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="relative rounded-lg border border-sky-100 bg-sky-50 p-4 pr-10 shadow-sm"
              >
                <p className="text-sm text-gray-700">{suggestion.message}</p>
                <p className="mt-1 text-xs text-gray-500">{suggestion.timestamp}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7 rounded-full"
                  onClick={() => dismissSuggestion(suggestion.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            ))
          ) : (
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-gray-500">
              No suggestions at the moment
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
