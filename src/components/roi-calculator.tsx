
"use client"

import { useState } from "react"
import { calculateLoopCosts } from "@/lib/cost-calculator"
import { InfoCircle } from "./InfoCircle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./CustomTooltip"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export interface ScoreCardData {
  numberOfDealers: number
  peopleCount: number
  hoursPerMonth: number
  annualCost: number
}

export default function RoiCalculator() {
  const [selectedModules] = useState<string[]>(["core", "scorecard"])
  
  const [scorecardData, setScoreCardData] = useState<ScoreCardData>({
    numberOfDealers: 50,
    peopleCount: 3,
    hoursPerMonth: 40,
    annualCost: 75000,
  })

  const handleChange = (field: keyof ScoreCardData, value: number) => {
    setScoreCardData((prev) => ({ ...prev, [field]: value }))
  }

  // Calculate time savings
  const monthlyHoursSaved = scorecardData.hoursPerMonth * 0.9 // Assume 90% time savings
  const annualHoursSaved = monthlyHoursSaved * 12
  
  // Calculate cost savings (based on annual cost)
  const annualCostSavings = scorecardData.annualCost * 0.85 // Assume 85% cost savings
  
  // Calculate ROI based on the formula: people × hours × annual cost / cost of Loop
  const loopCosts = calculateLoopCosts(scorecardData.numberOfDealers, selectedModules)
  const roi = (scorecardData.peopleCount * scorecardData.hoursPerMonth * scorecardData.annualCost) / loopCosts.annualLicense
  const formattedROI = roi.toFixed(1) + "x"

  // Calculate breakdown of savings
  const reportGenerationSavings = annualHoursSaved * 0.6 // 60% of time savings
  const visitPreparationSavings = annualHoursSaved * 0.25 // 25% of time savings
  const otherTasksSavings = annualHoursSaved * 0.15 // 15% of time savings

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-bold mr-2">Loop Scorecard ROI Calculator</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-slate-500 hover:text-slate-700">
                  <InfoCircle className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This calculator estimates the time and cost savings from implementing Loop's Scorecard solution.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-slate-600">
            Estimate the time and cost savings you could achieve by using Loop's Scorecard solution.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="numberOfDealers">Number of Dealers: {scorecardData.numberOfDealers}</Label>
              </div>
              <Slider
                id="numberOfDealers"
                min={1}
                max={1000}
                step={1}
                value={[scorecardData.numberOfDealers]}
                onValueChange={(value) => handleChange("numberOfDealers", value[0])}
              />
              <p className="text-sm text-slate-500">The total number of dealership locations in your network.</p>
            </div>

            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">Scorecard Production</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="peopleCount">Number of People: {scorecardData.peopleCount}</Label>
                </div>
                <Slider
                  id="peopleCount"
                  min={1}
                  max={20}
                  step={1}
                  value={[scorecardData.peopleCount]}
                  onValueChange={(value) => handleChange("peopleCount", value[0])}
                />
                <p className="text-sm text-slate-500">How many people are involved in creating and distributing scorecards.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="hoursPerMonth">Hours Per Month: {scorecardData.hoursPerMonth}</Label>
                </div>
                <Slider
                  id="hoursPerMonth"
                  min={1}
                  max={160}
                  step={1}
                  value={[scorecardData.hoursPerMonth]}
                  onValueChange={(value) => handleChange("hoursPerMonth", value[0])}
                />
                <p className="text-sm text-slate-500">Total hours spent monthly on creating scorecards across your team.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualCost">Annual Cost to Business (£)</Label>
                <Input
                  id="annualCost"
                  type="number"
                  min={1000}
                  value={scorecardData.annualCost}
                  onChange={(e) => handleChange("annualCost", Number(e.target.value))}
                />
                <p className="text-sm text-slate-500">The total annual cost of scorecard production (salaries, resources, etc).</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-center mb-6">Total Estimated Annual Savings</h3>
                <div className="text-5xl font-bold text-center text-green-500 mb-2">
                  £{annualCostSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </div>
                <div className="text-center text-xl font-semibold mb-4">
                  {formattedROI} ROI
                </div>
                <div className="text-center text-gray-600 mb-8">
                  {annualHoursSaved.toLocaleString(undefined, {maximumFractionDigits: 0})} hours saved annually
                </div>

                <div className="space-y-8 mt-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">Report Generation</h4>
                      <p className="text-gray-600">{reportGenerationSavings.toLocaleString(undefined, {maximumFractionDigits: 0})} hours saved annually</p>
                    </div>
                    <span className="text-xl font-semibold text-green-500">60%</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">Visit Preparation</h4>
                      <p className="text-gray-600">{visitPreparationSavings.toLocaleString(undefined, {maximumFractionDigits: 0})} hours saved annually</p>
                    </div>
                    <span className="text-xl font-semibold text-green-500">25%</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">Other Tasks</h4>
                      <p className="text-gray-600">{otherTasksSavings.toLocaleString(undefined, {maximumFractionDigits: 0})} hours saved annually</p>
                    </div>
                    <span className="text-xl font-semibold text-green-500">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Scorecard Benefits</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-md mr-4">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Automated Data Collection</h4>
                      <p className="text-gray-600">Eliminate manual data gathering and processing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-md mr-4">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Standardized Reporting</h4>
                      <p className="text-gray-600">Consistent metrics and visualization across all dealers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-md mr-4">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Real-time Updates</h4>
                      <p className="text-gray-600">Always current data instead of periodic manual reports</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
