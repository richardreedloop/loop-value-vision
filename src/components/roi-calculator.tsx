
"use client"

import { useState, useEffect } from "react"
import { calculateLoopCosts } from "@/lib/cost-calculator"
import { InfoCircle } from "./InfoCircle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./CustomTooltip"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import ModuleSelector from "./ModuleSelector"

export interface TimeSavingsData {
  numberOfDealers: number
  areaManagerCount: number
  dataAnalystCount: number
  hoursPerWeekAreaManager: number
  hoursPerWeekDataAnalyst: number
  hourlyRateAreaManager: number
  hourlyRateDataAnalyst: number
}

export interface Module {
  id: string
  name: string
  required?: boolean
}

export default function RoiCalculator() {
  const availableModules: Module[] = [
    { id: "core", name: "Core Platform", required: true },
    { id: "dashboard", name: "Dashboard" },
    { id: "scorecard", name: "Scorecard" },
    { id: "action", name: "Action Centre" },
    { id: "visits", name: "Visits" },
    { id: "surveys", name: "Surveys" },
  ]
  
  const [selectedModules, setSelectedModules] = useState<string[]>(["core", "scorecard"])
  
  const [timeSavingsData, setTimeSavingsData] = useState<TimeSavingsData>({
    numberOfDealers: 50,
    areaManagerCount: 10,
    dataAnalystCount: 3,
    hoursPerWeekAreaManager: 4,
    hoursPerWeekDataAnalyst: 8,
    hourlyRateAreaManager: 35,
    hourlyRateDataAnalyst: 25,
  })

  const handleModuleChange = (modules: string[]) => {
    setSelectedModules(modules)
  }

  const handleChange = (field: keyof TimeSavingsData, value: number) => {
    setTimeSavingsData((prev) => ({ ...prev, [field]: value }))
  }

  // Calculate time savings for area managers
  const weeklyTimeSavingsAreaManager = timeSavingsData.areaManagerCount * timeSavingsData.hoursPerWeekAreaManager
  const weeklyCostSavingsAreaManager = weeklyTimeSavingsAreaManager * timeSavingsData.hourlyRateAreaManager
  const annualCostSavingsAreaManager = weeklyCostSavingsAreaManager * 52

  // Calculate time savings for data analysts
  const weeklyTimeSavingsDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerWeekDataAnalyst
  const weeklyCostSavingsDataAnalyst = weeklyTimeSavingsDataAnalyst * timeSavingsData.hourlyRateDataAnalyst
  const annualCostSavingsDataAnalyst = weeklyCostSavingsDataAnalyst * 52

  // Calculate total time and cost savings
  const weeklyTimeSavingsTotal = weeklyTimeSavingsAreaManager + weeklyTimeSavingsDataAnalyst
  const annualTimeSavingsTotal = weeklyTimeSavingsTotal * 52
  const annualCostSavingsTotal = annualCostSavingsAreaManager + annualCostSavingsDataAnalyst

  // Calculate Loop costs based on selected modules
  const loopCosts = calculateLoopCosts(timeSavingsData.numberOfDealers, selectedModules)

  // Calculate ROI
  const firstYearROI = ((annualCostSavingsTotal - loopCosts.firstYearTotal) / loopCosts.firstYearTotal) * 100
  const ongoingAnnualROI = ((annualCostSavingsTotal - loopCosts.annualLicense) / loopCosts.annualLicense) * 100
  const paybackPeriodMonths = loopCosts.firstYearTotal / (annualCostSavingsTotal / 12)

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-bold mr-2">Loop ROI Calculator</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-slate-500 hover:text-slate-700">
                  <InfoCircle className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This calculator estimates the time and cost savings from implementing Loop's solution.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-slate-600">
            Estimate the time and cost savings you could achieve by using the Loop Enterprise Platform.
          </p>
        </div>
          
        <ModuleSelector 
          availableModules={availableModules} 
          selectedModules={selectedModules} 
          onChange={handleModuleChange} 
        />

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="numberOfDealers">Number of Dealers: {timeSavingsData.numberOfDealers}</Label>
              </div>
              <Slider
                id="numberOfDealers"
                min={1}
                max={1000}
                step={1}
                value={[timeSavingsData.numberOfDealers]}
                onValueChange={(value) => handleChange("numberOfDealers", value[0])}
              />
            </div>

            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">Area Managers</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="areaManagerCount">Number of Area Managers: {timeSavingsData.areaManagerCount}</Label>
                </div>
                <Slider
                  id="areaManagerCount"
                  min={1}
                  max={50}
                  step={1}
                  value={[timeSavingsData.areaManagerCount]}
                  onValueChange={(value) => handleChange("areaManagerCount", value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="hoursPerWeekAreaManager">Hours Saved Per Week (Per Manager): {timeSavingsData.hoursPerWeekAreaManager}</Label>
                </div>
                <Slider
                  id="hoursPerWeekAreaManager"
                  min={1}
                  max={20}
                  step={0.5}
                  value={[timeSavingsData.hoursPerWeekAreaManager]}
                  onValueChange={(value) => handleChange("hoursPerWeekAreaManager", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRateAreaManager">Average Hourly Rate (£)</Label>
                <Input
                  id="hourlyRateAreaManager"
                  type="number"
                  min={1}
                  value={timeSavingsData.hourlyRateAreaManager}
                  onChange={(e) => handleChange("hourlyRateAreaManager", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">Data Analysts</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="dataAnalystCount">Number of Data Analysts: {timeSavingsData.dataAnalystCount}</Label>
                </div>
                <Slider
                  id="dataAnalystCount"
                  min={1}
                  max={20}
                  step={1}
                  value={[timeSavingsData.dataAnalystCount]}
                  onValueChange={(value) => handleChange("dataAnalystCount", value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="hoursPerWeekDataAnalyst">Hours Saved Per Week (Per Analyst): {timeSavingsData.hoursPerWeekDataAnalyst}</Label>
                </div>
                <Slider
                  id="hoursPerWeekDataAnalyst"
                  min={1}
                  max={30}
                  step={0.5}
                  value={[timeSavingsData.hoursPerWeekDataAnalyst]}
                  onValueChange={(value) => handleChange("hoursPerWeekDataAnalyst", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRateDataAnalyst">Average Hourly Rate (£)</Label>
                <Input
                  id="hourlyRateDataAnalyst"
                  type="number"
                  min={1}
                  value={timeSavingsData.hourlyRateDataAnalyst}
                  onChange={(e) => handleChange("hourlyRateDataAnalyst", Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
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
                    <span className="font-medium">{annualTimeSavingsTotal.toLocaleString()} hours</span>
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

            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Return on Investment</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Loop Annual License:</span>
                    <span className="font-medium">£{loopCosts.annualLicense.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">First Year Total Cost:</span>
                    <span className="font-medium">£{loopCosts.firstYearTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-slate-800 font-medium">First Year ROI:</span>
                    <span className="font-medium">{firstYearROI.toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-medium">Ongoing Annual ROI:</span>
                    <span className="font-medium">{ongoingAnnualROI.toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-medium">Payback Period:</span>
                    <span className="font-medium">{paybackPeriodMonths.toFixed(1)} months</span>
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
