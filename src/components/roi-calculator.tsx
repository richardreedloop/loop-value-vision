
"use client"

import { useState, useEffect } from "react"
import { calculateLoopCosts } from "@/lib/cost-calculator"
import { InfoCircle } from "./InfoCircle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./CustomTooltip"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
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
  const annualTimeSavingsAreaManager = weeklyTimeSavingsAreaManager * 52

  // Calculate time savings for data analysts
  const weeklyTimeSavingsDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerWeekDataAnalyst
  const weeklyCostSavingsDataAnalyst = weeklyTimeSavingsDataAnalyst * timeSavingsData.hourlyRateDataAnalyst
  const annualCostSavingsDataAnalyst = weeklyCostSavingsDataAnalyst * 52
  const annualTimeSavingsDataAnalyst = weeklyTimeSavingsDataAnalyst * 52

  // Calculate total time and cost savings
  const weeklyTimeSavingsTotal = weeklyTimeSavingsAreaManager + weeklyTimeSavingsDataAnalyst
  const annualTimeSavingsTotal = weeklyTimeSavingsTotal * 52
  const annualCostSavingsTotal = annualCostSavingsAreaManager + annualCostSavingsDataAnalyst

  // Calculate Loop costs based on selected modules (hidden from UI but used for ROI)
  const loopCosts = calculateLoopCosts(timeSavingsData.numberOfDealers, selectedModules)

  // Calculate ROI (still calculated but displayed differently)
  const ongoingAnnualROI = ((annualCostSavingsTotal / loopCosts.annualLicense) * 100).toFixed(1)

  // Format the ROI as "X.Xx"
  const formattedROI = (annualCostSavingsTotal / loopCosts.annualLicense).toFixed(1) + "x"

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
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-center mb-6">Total Estimated Annual Savings</h3>
                <div className="text-5xl font-bold text-center text-green-500 mb-2">
                  £{annualCostSavingsTotal.toLocaleString()}
                </div>
                <div className="text-center text-xl font-semibold mb-4">
                  {formattedROI} ROI
                </div>
                <div className="text-center text-gray-600 mb-8">
                  {annualTimeSavingsTotal.toLocaleString()} hours saved annually
                </div>

                <div className="space-y-8 mt-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">Report Creation Savings</h4>
                      <p className="text-gray-600">{annualTimeSavingsDataAnalyst.toLocaleString()} hours saved annually</p>
                    </div>
                    <span className="text-xl font-semibold text-green-500">£{annualCostSavingsDataAnalyst.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">Visit Preparation Savings</h4>
                      <p className="text-gray-600">{annualTimeSavingsAreaManager.toLocaleString()} hours saved annually</p>
                    </div>
                    <span className="text-xl font-semibold text-green-500">£{annualCostSavingsAreaManager.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Additional Benefits</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-md mr-4">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Better Dealer Alignment</h4>
                      <p className="text-gray-600">Standardised processes across all locations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-md mr-4">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Enhanced Reporting</h4>
                      <p className="text-gray-600">Clear insights for strategic decisions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-md mr-4">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Real-time Visibility</h4>
                      <p className="text-gray-600">Instant performance metrics across all dealers</p>
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
