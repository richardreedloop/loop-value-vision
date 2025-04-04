
"use client"

import { useState, useEffect } from "react"
import type { TimeSavingsData } from "./roi-calculator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

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

  // Calculate time savings for area managers
  const weeklyTimeSavingsAreaManager = localData.areaManagerCount * localData.hoursPerWeekAreaManager
  const weeklyCostSavingsAreaManager = weeklyTimeSavingsAreaManager * localData.hourlyRateAreaManager
  const annualCostSavingsAreaManager = weeklyCostSavingsAreaManager * 52

  // Calculate time savings for data analysts
  const weeklyTimeSavingsDataAnalyst = localData.dataAnalystCount * localData.hoursPerWeekDataAnalyst
  const weeklyCostSavingsDataAnalyst = weeklyTimeSavingsDataAnalyst * localData.hourlyRateDataAnalyst
  const annualCostSavingsDataAnalyst = weeklyCostSavingsDataAnalyst * 52

  // Calculate total time and cost savings
  const weeklyTimeSavingsTotal = weeklyTimeSavingsAreaManager + weeklyTimeSavingsDataAnalyst
  const weeklyCostSavingsTotal = weeklyCostSavingsAreaManager + weeklyCostSavingsDataAnalyst
  const annualCostSavingsTotal = annualCostSavingsAreaManager + annualCostSavingsDataAnalyst

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Time Savings Calculator</h2>
        <p className="text-slate-600 mb-6">
          Estimate the time and cost savings from implementing Loop's Balanced Scorecard solution.
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
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <h3 className="font-medium">Area Managers</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="areaManagerCount">Number of Area Managers: {localData.areaManagerCount}</Label>
              </div>
              <Slider
                id="areaManagerCount"
                min={1}
                max={50}
                step={1}
                value={[localData.areaManagerCount]}
                onValueChange={(value) => handleChange("areaManagerCount", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="hoursPerWeekAreaManager">Hours Saved Per Week (Per Manager): {localData.hoursPerWeekAreaManager}</Label>
              </div>
              <Slider
                id="hoursPerWeekAreaManager"
                min={1}
                max={20}
                step={0.5}
                value={[localData.hoursPerWeekAreaManager]}
                onValueChange={(value) => handleChange("hoursPerWeekAreaManager", value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRateAreaManager">Average Hourly Rate (£)</Label>
              <Input
                id="hourlyRateAreaManager"
                type="number"
                min={1}
                value={localData.hourlyRateAreaManager}
                onChange={(e) => handleChange("hourlyRateAreaManager", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <h3 className="font-medium">Data Analysts</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="dataAnalystCount">Number of Data Analysts: {localData.dataAnalystCount}</Label>
              </div>
              <Slider
                id="dataAnalystCount"
                min={1}
                max={20}
                step={1}
                value={[localData.dataAnalystCount]}
                onValueChange={(value) => handleChange("dataAnalystCount", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="hoursPerWeekDataAnalyst">Hours Saved Per Week (Per Analyst): {localData.hoursPerWeekDataAnalyst}</Label>
              </div>
              <Slider
                id="hoursPerWeekDataAnalyst"
                min={1}
                max={30}
                step={0.5}
                value={[localData.hoursPerWeekDataAnalyst]}
                onValueChange={(value) => handleChange("hoursPerWeekDataAnalyst", value[0])}
              />
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
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Time Savings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Area Manager Weekly Time Saved:</span>
                  <span className="font-medium">{weeklyTimeSavingsAreaManager.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Data Analyst Weekly Time Saved:</span>
                  <span className="font-medium">{weeklyTimeSavingsDataAnalyst.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-slate-800 font-medium">Total Weekly Time Saved:</span>
                  <span className="font-medium">{weeklyTimeSavingsTotal.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Annual Time Saved:</span>
                  <span className="font-medium">{(weeklyTimeSavingsTotal * 52).toLocaleString()} hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Cost Savings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Area Manager Annual Savings:</span>
                  <span className="font-medium">£{annualCostSavingsAreaManager.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Data Analyst Annual Savings:</span>
                  <span className="font-medium">£{annualCostSavingsDataAnalyst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-slate-800 font-medium">Total Annual Cost Saved:</span>
                  <span className="font-medium text-lg">£{annualCostSavingsTotal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
