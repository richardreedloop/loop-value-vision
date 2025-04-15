
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

  // Calculate hourly rate from annual salary (assuming 40 hours per week, 52 weeks per year)
  const hourlyRateDataAnalyst = localData.annualSalaryDataAnalyst / (40 * 52)

  // Calculate time savings for data analysts (scorecard production team)
  const monthlyHoursSaved = localData.dataAnalystCount * localData.hoursPerMonthDataAnalyst
  const annualHoursSaved = monthlyHoursSaved * 12
  const monthlyCostSavings = monthlyHoursSaved * hourlyRateDataAnalyst
  const annualCostSavings = monthlyCostSavings * 12

  // Calculate breakdown of savings
  const reportGenerationSavings = annualHoursSaved * 0.7 // 70% of time savings
  const visitPreparationSavings = annualHoursSaved * 0.3 // 30% of time savings

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
                <Label htmlFor="hoursPerMonthDataAnalyst">Hours Per Month Per Person: {localData.hoursPerMonthDataAnalyst}</Label>
              </div>
              <Slider
                id="hoursPerMonthDataAnalyst"
                min={1}
                max={40}
                step={1}
                value={[localData.hoursPerMonthDataAnalyst]}
                onValueChange={(value) => handleChange("hoursPerMonthDataAnalyst", value[0])}
              />
              <p className="text-sm text-slate-500">Hours spent monthly per person on creating and managing scorecards.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualSalaryDataAnalyst">Average Annual Salary (£)</Label>
              <Input
                id="annualSalaryDataAnalyst"
                type="number"
                min={20000}
                value={localData.annualSalaryDataAnalyst}
                onChange={(e) => handleChange("annualSalaryDataAnalyst", Number(e.target.value))}
              />
              <p className="text-sm text-slate-500">The average annual salary for your scorecard production team.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Time Savings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Monthly Time Saved:</span>
                  <span className="font-medium">{monthlyHoursSaved.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual Time Saved:</span>
                  <span className="font-medium">{annualHoursSaved.toLocaleString()} hours</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Monthly Cost Saved:</span>
                    <span className="font-medium">£{monthlyCostSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-slate-800 font-medium">Annual Cost Saved:</span>
                    <span className="font-medium text-lg">£{annualCostSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Annual Time Savings Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Report Generation:</span>
                  <div className="text-right">
                    <div className="font-medium">{reportGenerationSavings.toLocaleString()} hours</div>
                    <div className="text-sm text-slate-500">70% of savings</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Visit Preparation:</span>
                  <div className="text-right">
                    <div className="font-medium">{visitPreparationSavings.toLocaleString()} hours</div>
                    <div className="text-sm text-slate-500">30% of savings</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button onClick={onNext} className="bg-[#011d29] hover:bg-[#011d29]/90">
          Next: Performance Improvement <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
