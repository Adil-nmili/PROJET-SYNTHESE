"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface DatePickerWithPresetsProps {
  onDateChange?: (date: Date | null) => void;
}

export function DatePickerWithPresets({ onDateChange }: DatePickerWithPresetsProps) {
  const [date, setDate] = React.useState<Date>()
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState("")
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const presets = [
    { value: "0", label: "Today" },
    { value: "1", label: "Tomorrow" },
    { value: "3", label: "In 3 days" },
    { value: "7", label: "In a week" },
  ]

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value)
    const newDate = addDays(new Date(), parseInt(value))
    setDate(newDate)
    onDateChange?.(newDate)
    setIsOpen(false)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null
    setDate(newDate || undefined)
    onDateChange?.(newDate)
    setIsOpen(false)
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "flex items-center gap-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full mb-4 rounded-md border bg-popover p-4 shadow-md">
          <div className="mb-4">
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select a preset</option>
              {presets.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-md border">
            <input
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={handleDateChange}
              className="w-full rounded-md border-0 bg-background px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
