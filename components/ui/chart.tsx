"use client"

import type * as React from "react"

interface ChartProps {
  children: React.ReactNode
  className?: string
  config?: Record<string, { label: string; color: string }>
}

// Add the missing Chart export
export function Chart({ children, className, config }: ChartProps) {
  // Create CSS variables for the chart colors
  const style = config
    ? Object.entries(config).reduce(
        (acc, [key, value]) => {
          acc[`--color-${key}`] = value.color
          return acc
        },
        {} as Record<string, string>,
      )
    : {}

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps {
  children: React.ReactNode
  config: ChartConfig
  className?: string
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  // Create CSS variables for the chart colors
  const style = Object.entries(config).reduce(
    (acc, [key, value]) => {
      acc[`--color-${key}`] = value.color
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      [key: string]: any
    }
  }>
  label?: string
  config?: ChartConfig
}

export function ChartTooltip({ active, payload, label, config }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
        </div>
        <div className="flex flex-col gap-1">
          {payload.map((item) => {
            const key = item.name as string
            const color = config?.[key]?.color || "currentColor"

            return (
              <div className="flex items-center gap-1" key={key}>
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[0.70rem] uppercase text-muted-foreground">{config?.[key]?.label || key}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Add the missing ChartTooltipContent export
export function ChartTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex flex-col gap-1 mt-1">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-muted-foreground">{entry.name}:</span>
              <span className="text-xs font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ChartLegendProps {
  children?: React.ReactNode
}

export function ChartLegend({ children }: ChartLegendProps) {
  return <div className="flex items-center justify-center gap-4">{children}</div>
}

interface ChartLegendItemProps {
  name: string
  color: string
}

export function ChartLegendItem({ name, color }: ChartLegendItemProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  )
}

interface ChartBarProps {
  children?: React.ReactNode
  data: any[]
  category: string
  index: string
  valueFormatter?: (value: number) => string
}

export function ChartBar({ children, data, category, index, valueFormatter }: ChartBarProps) {
  return <div>{children}</div>
}

interface ChartBarItemProps {
  name: string
  value: string
  color: string
}

export function ChartBarItem({ name, value, color }: ChartBarItemProps) {
  return null
}

interface ChartLineProps {
  children?: React.ReactNode
  data: any[]
  category: string
  index: string
  valueFormatter?: (value: number) => string
}

export function ChartLine({ children, data, category, index, valueFormatter }: ChartLineProps) {
  return <div>{children}</div>
}

interface ChartLineItemProps {
  name: string
  value: string
  color: string
}

export function ChartLineItem({ name, value, color }: ChartLineItemProps) {
  return null
}

