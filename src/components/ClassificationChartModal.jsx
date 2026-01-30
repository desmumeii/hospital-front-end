import React, { useMemo } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, Chip } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const levelValue = { I: 1, II: 2, III: 3, IV: 4, V: 5 }
const valueToLevel = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" }
const levelColor = "#2563eb"

const ClassificationChartModal = ({ open, onClose, data, subject }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []

    const byYear = new Map()
    data.forEach((record) => {
      if (!record || record.year === undefined || record.year === null) return
      const yearKey = String(record.year)
      const value = levelValue[record.classification] || 0
      byYear.set(yearKey, {
        year: yearKey,
        value
      })
    })

    return Array.from(byYear.values()).sort((a, b) => Number(a.year) - Number(b.year))
  }, [data])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Classification Over Time{subject ? ` – ${subject.fullName || "Staff"}` : ""}
      </DialogTitle>
      <DialogContent dividers>
        {chartData.length === 0 ? (
          <Typography>No data available for charting.</Typography>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} label={{ value: "Classification Level", angle: -90, position: "insideLeft" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
                  formatter={(value) => [`Level ${valueToLevel[value] || value}`, "Classification"]}
                />
                <Bar dataKey="value" fill={levelColor} name="Classification" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClassificationChartModal
