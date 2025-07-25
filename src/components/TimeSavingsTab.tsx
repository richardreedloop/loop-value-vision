
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
  const hourlyRateDataAnalyst = localData.annualSalaryDataAnalyst > 0 ? localData.annualSalaryDataAnalyst / (40 * 52) : 0

  // Calculate time savings - now using only hours per month directly
  const monthlyHoursSaved = localData.hoursPerMonthDataAnalyst
  const monthlyCostSavings = monthlyHoursSaved * hourlyRateDataAnalyst
  const annualCostSavings = monthlyCostSavings * 12

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Time Savings Calculator</h2>
        <p className="text-slate-600 mb-6">
          Estimate the time and cost savings from implementing Loop solution.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="border p-4 rounded-md space-y-4">
            <h3 className="font-medium">Scorecard Production</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="hoursPerMonthDataAnalyst">Monthly Hours Saved: {localData.hoursPerMonthDataAnalyst}</Label>
              </div>
              <Slider
                id="hoursPerMonthDataAnalyst"
                min={1}
                max={200}
                step={1}
                value={[localData.hoursPerMonthDataAnalyst]}
                onValueChange={(value) => handleChange("hoursPerMonthDataAnalyst", value[0])}
              />
              <p className="text-sm text-slate-500">Hours saved monthly from automating scorecard creation and management.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualSalaryDataAnalyst">Average Annual Salary (£)</Label>
              <Input
                id="annualSalaryDataAnalyst"
                type="text"
                value={localData.annualSalaryDataAnalyst > 0 ? localData.annualSalaryDataAnalyst.toLocaleString() : ""}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/,/g, '');
                  if (numericValue === '') {
                    handleChange("annualSalaryDataAnalyst", 0);
                  } else {
                    const value = Number(numericValue);
                    if (!isNaN(value) && value >= 0) {
                      handleChange("annualSalaryDataAnalyst", value);
                    }
                  }
                }}
                placeholder="Enter annual salary"
              />
              <p className="text-sm text-slate-500">The average annual salary for your scorecard production team.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Estimated Cost Savings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Monthly Time Saved:</span>
                  <span className="font-medium">{monthlyHoursSaved.toLocaleString()} hours</span>
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
