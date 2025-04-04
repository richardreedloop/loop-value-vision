
"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import type { TimeSavingsData } from "./roi-calculator"

interface TimeSavingsTabProps {
  data: TimeSavingsData
  onChange: (data: TimeSavingsData) => void
}

export default function TimeSavingsTab({ data, onChange }: TimeSavingsTabProps) {
  const [localData, setLocalData] = useState<TimeSavingsData>(data)

  useEffect(() => {
    onChange(localData)
  }, [localData, onChange])

  const handleChange = (field: keyof TimeSavingsData, value: number) => {
    setLocalData((prev) => ({ ...prev, [field]: value }))
  }

  const weeklyTimeSavings = localData.numberOfDealers * localData.staffCount * localData.hoursPerWeek
  const weeklyCostSavings = weeklyTimeSavings * localData.hourlyRate
  const annualCostSavings = weeklyCostSavings * 52

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Time Savings Calculator</h2>
        <p className="text-slate-600 mb-6">
          Estimate the time and cost savings from implementing Loop's Balanced Scorecard solution.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="numberOfDealers">Number of Dealers: {localData.numberOfDealers}</Label>
            </div>
            <Slider
              id="numberOfDealers"
              min={1}
              max={1000}
              step={1}
              value={[localData.numberOfDealers]}
              onValueChange={(value) => handleChange("numberOfDealers", value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="staffCount">Staff Members Per Dealer: {localData.staffCount}</Label>
            </div>
            <Slider
              id="staffCount"
              min={1}
              max={10}
              step={1}
              value={[localData.staffCount]}
              onValueChange={(value) => handleChange("staffCount", value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="hoursPerWeek">Hours Saved Per Week (Per Staff): {localData.hoursPerWeek}</Label>
            </div>
            <Slider
              id="hoursPerWeek"
              min={1}
              max={20}
              step={0.5}
              value={[localData.hoursPerWeek]}
              onValueChange={(value) => handleChange("hoursPerWeek", value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Average Hourly Rate (£)</Label>
            <Input
              id="hourlyRate"
              type="number"
              min={1}
              value={localData.hourlyRate}
              onChange={(e) => handleChange("hourlyRate", Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Time Savings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Weekly Time Saved:</span>
                  <span className="font-medium">{weeklyTimeSavings.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual Time Saved:</span>
                  <span className="font-medium">{(weeklyTimeSavings * 52).toLocaleString()} hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Cost Savings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Weekly Cost Saved:</span>
                  <span className="font-medium">£{weeklyCostSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual Cost Saved:</span>
                  <span className="font-medium text-lg">£{annualCostSavings.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
