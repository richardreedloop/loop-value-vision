
"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { PerformanceData } from "./roi-calculator"

interface PerformanceTabProps {
  data: PerformanceData
  onChange: (data: PerformanceData) => void
  onNext: () => void
}

export default function PerformanceTab({ data, onChange, onNext }: PerformanceTabProps) {
  const [localData, setLocalData] = useState<PerformanceData>(data)

  useEffect(() => {
    onChange(localData)
  }, [localData, onChange])

  const handleChange = (field: keyof PerformanceData, value: number) => {
    setLocalData((prev) => ({ ...prev, [field]: value }))
  }

  const annualImprovement = localData.annualPartsRevenue * (localData.improvementPercentage / 100)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Parts Revenue Improvement Calculator</h2>
        <p className="text-slate-600 mb-6">
          Estimate the annual incremental parts revenue improvement from implementing Loop solution.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="annualPartsRevenue">Annual Parts Revenue (£)</Label>
            <Input
              id="annualPartsRevenue"
              type="text"
              inputMode="numeric"
              value={localData.annualPartsRevenue.toLocaleString()}
              onChange={(e) => {
                const value = Number(e.target.value.replace(/,/g, ''))
                if (!isNaN(value)) {
                  handleChange("annualPartsRevenue", value)
                }
              }}
            />
            <p className="text-sm text-slate-500">The total annual parts revenue across your network.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="improvementPercentage">Annual Performance Improvement: {localData.improvementPercentage}%</Label>
            </div>
            <Slider
              id="improvementPercentage"
              min={0.1}
              max={10}
              step={0.1}
              value={[localData.improvementPercentage]}
              onValueChange={(value) => handleChange("improvementPercentage", value[0])}
            />
            <p className="text-sm text-slate-500">
              Loop customers typically see a 2-10% annual incremental improvement in parts revenue.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Annual Revenue Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Current Annual Parts Revenue:</span>
                  <span className="font-medium">£{localData.annualPartsRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual Parts Revenue Increase:</span>
                  <span className="font-medium">£{annualImprovement.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Annual Performance Improvement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Annual Incremental Improvement:</span>
                  <span className="font-medium text-lg">£{annualImprovement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual Improvement Percentage:</span>
                  <span className="font-medium">{localData.improvementPercentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} className="bg-[#011d29] hover:bg-[#011d29]/90">
          Next: Business Case <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
