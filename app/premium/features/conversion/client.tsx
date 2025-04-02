"use client"

import type React from "react"
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface ConversionChartProps {
  data: { name: string; value: number }[]
}

const ConversionChart: React.FC<ConversionChartProps> = ({ data }) => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          <ChartLegend />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default ConversionChart

