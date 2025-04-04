
"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import type { PerformanceData } from "./roi-calculator"

interface PerformanceTabProps {
  data: PerformanceData
  onChange: (data: PerformanceData) => void
}

export default function PerformanceTab({ data, onChange }: PerformanceTabProps) {
  const [localData, setLocalData] = useState<PerformanceData>(data)

  useEffect(() => {
    onChange(localData)
  }, [localData, onChange])

  const handleChange = (field: keyof PerformanceData, value: number) => {
    setLocalData((prev) => ({ ...prev, [field]: value }))
  }

  const totalAnnualRevenue = localData.numberOfDealers * localData.averageRevenue
  const annualImprovement = totalAnnualRevenue * (localData.improvementPercentage / 100)
  const perDealerImprovement = localData.averageRevenue * (localData.improvementPercentage / 100)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Performance Improvement Calculator</h2>
        <p className="text-slate-600 mb-6">
          Estimate the revenue improvement from implementing Loop's Balanced Scorecard solution.
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
            <Label htmlFor="averageRevenue">Average Annual Revenue Per Dealer (£)</Label>
            <Input
              id="averageRevenue"
              type="number"
              min={10000}
              step={10000}
              value={localData.averageRevenue}
              onChange={(e) => handleChange("averageRevenue", Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="improvementPercentage">Performance Improvement: {localData.improvementPercentage}%</Label>
            </div>
            <Slider
              id="improvementPercentage"
              min={0.5}
              max={5}
              step={0.1}
              value={[localData.improvementPercentage]}
              onValueChange={(value) => handleChange("improvementPercentage", value[0])}
            />
            <p className="text-sm text-slate-500">
              Based on case studies, Loop customers typically see a 1-3% improvement in performance.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Revenue Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Annual Revenue:</span>
                  <span className="font-medium">£{totalAnnualRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Improvement Per Dealer:</span>
                  <span className="font-medium">£{perDealerImprovement.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Annual Performance Improvement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Annual Improvement:</span>
                  <span className="font-medium text-lg">£{annualImprovement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Improvement Percentage:</span>
                  <span className="font-medium">{localData.improvementPercentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
