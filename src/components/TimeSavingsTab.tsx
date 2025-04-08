
"use client"

import { useState, useEffect } from "react"
import type { TimeSavingsData } from "./roi-calculator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface TimeSavingsTabProps {
  data: TimeSavingsData
  onChange: (data: TimeSavingsData) => void
  onNext: () => void
}

export default function TimeSavingsTab({ data, onChange, onNext }: TimeSavingsTabProps) {
  const [localData, setLocalData] = useState<TimeSavingsData>(data)

  useEffect(() => {
    onChange(localData)
  }, [localData, onChange])

  const handleChange = (field: keyof TimeSavingsData, value: number) => {
    setLocalData((prev) => ({ ...prev, [field]: value }))
  }

  // Calculate time savings for data analysts (scorecard production team)
  const weeklyTimeSavingsDataAnalyst = localData.dataAnalystCount * localData.hoursPerWeekDataAnalyst
  const weeklyCostSavingsDataAnalyst = weeklyTimeSavingsDataAnalyst * localData.hourlyRateDataAnalyst
  const annualCostSavingsDataAnalyst = weeklyCostSavingsDataAnalyst * 52

  // Calculate total time and cost savings
  const weeklyTimeSavingsTotal = weeklyTimeSavingsDataAnalyst
  const annualHoursSaved = weeklyTimeSavingsTotal * 52
  const annualCostSavingsTotal = annualCostSavingsDataAnalyst

  // Calculate breakdown of savings
  const reportGenerationSavings = annualHoursSaved * 0.6 // 60% of time savings
  const visitPreparationSavings = annualHoursSaved * 0.25 // 25% of time savings
  const otherTasksSavings = annualHoursSaved * 0.15 // 15% of time savings

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Time Savings Calculator</h2>
        <p className="text-slate-600 mb-6">
          Estimate the time and cost savings from implementing Loop's Scorecard solution.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
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
            <p className="text-sm text-slate-500">The total number of dealership locations in your network.</p>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <h3 className="font-medium">Scorecard Production</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="dataAnalystCount">Number of People: {localData.dataAnalystCount}</Label>
              </div>
              <Slider
                id="dataAnalystCount"
                min={1}
                max={20}
                step={1}
                value={[localData.dataAnalystCount]}
                onValueChange={(value) => handleChange("dataAnalystCount", value[0])}
              />
              <p className="text-sm text-slate-500">How many people are involved in creating and distributing scorecards.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="hoursPerWeekDataAnalyst">Hours Per Week: {localData.hoursPerWeekDataAnalyst}</Label>
              </div>
              <Slider
                id="hoursPerWeekDataAnalyst"
                min={1}
                max={40}
                step={0.5}
                value={[localData.hoursPerWeekDataAnalyst]}
                onValueChange={(value) => handleChange("hoursPerWeekDataAnalyst", value[0])}
              />
              <p className="text-sm text-slate-500">Hours spent weekly on creating and managing scorecards per person.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRateDataAnalyst">Average Hourly Rate (£)</Label>
              <Input
                id="hourlyRateDataAnalyst"
                type="number"
                min={1}
                value={localData.hourlyRateDataAnalyst}
                onChange={(e) => handleChange("hourlyRateDataAnalyst", Number(e.target.value))}
              />
              <p className="text-sm text-slate-500">The average hourly cost for your scorecard production team.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Time Savings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Weekly Time Saved:</span>
                  <span className="font-medium">{weeklyTimeSavingsTotal.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual Time Saved:</span>
                  <span className="font-medium">{annualHoursSaved.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-slate-800 font-medium">Annual Cost Saved:</span>
                  <span className="font-medium text-lg">£{annualCostSavingsTotal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Time Savings Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Report Generation:</span>
                  <div className="text-right">
                    <div className="font-medium">{reportGenerationSavings.toLocaleString()} hours</div>
                    <div className="text-sm text-slate-500">60% of savings</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Visit Preparation:</span>
                  <div className="text-right">
                    <div className="font-medium">{visitPreparationSavings.toLocaleString()} hours</div>
                    <div className="text-sm text-slate-500">25% of savings</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Other Tasks:</span>
                  <div className="text-right">
                    <div className="font-medium">{otherTasksSavings.toLocaleString()} hours</div>
                    <div className="text-sm text-slate-500">15% of savings</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Next: Performance Improvement <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
