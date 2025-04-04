
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateLoopCosts } from "@/lib/cost-calculator"
import { InfoCircle } from "./InfoCircle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./CustomTooltip"
import TimeSavingsTab from "./TimeSavingsTab"
import PerformanceTab from "./PerformanceTab"
import BusinessCaseTab from "./BusinessCaseTab"

export interface TimeSavingsData {
  numberOfDealers: number
  staffCount: number
  hoursPerWeek: number
  hourlyRate: number
}

export interface PerformanceData {
  numberOfDealers: number
  averageRevenue: number
  improvementPercentage: number
}

export default function RoiCalculator() {
  const [activeTab, setActiveTab] = useState("time-savings")
  
  const [timeSavingsData, setTimeSavingsData] = useState<TimeSavingsData>({
    numberOfDealers: 50,
    staffCount: 3,
    hoursPerWeek: 4,
    hourlyRate: 25,
  })

  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    numberOfDealers: 50,
    averageRevenue: 2000000,
    improvementPercentage: 1.5,
  })

  // Sync dealer count between tabs
  useEffect(() => {
    if (timeSavingsData.numberOfDealers !== performanceData.numberOfDealers) {
      setPerformanceData(prev => ({
        ...prev,
        numberOfDealers: timeSavingsData.numberOfDealers
      }))
    }
  }, [timeSavingsData.numberOfDealers, performanceData.numberOfDealers])

  useEffect(() => {
    if (performanceData.numberOfDealers !== timeSavingsData.numberOfDealers) {
      setTimeSavingsData(prev => ({
        ...prev,
        numberOfDealers: performanceData.numberOfDealers
      }))
    }
  }, [performanceData.numberOfDealers, timeSavingsData.numberOfDealers])

  // Calculate annual time savings
  const weeklyTimeSavings = timeSavingsData.numberOfDealers * timeSavingsData.staffCount * timeSavingsData.hoursPerWeek
  const weeklyCostSavings = weeklyTimeSavings * timeSavingsData.hourlyRate
  const annualTimeSavings = weeklyCostSavings * 52

  // Calculate annual performance improvement
  const totalAnnualRevenue = performanceData.numberOfDealers * performanceData.averageRevenue
  const annualPerformanceImprovement = totalAnnualRevenue * (performanceData.improvementPercentage / 100)

  // Calculate costs (assume we're using core, scorecard modules)
  const selectedModules = ["core", "scorecard"]
  const loopCosts = calculateLoopCosts(timeSavingsData.numberOfDealers, selectedModules)

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
        <div className="mb-8">
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
                  This calculator provides an estimate of the return on investment (ROI) for implementing Loop's Balanced Scorecard solution.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-slate-600">
            Calculate the potential return on investment for implementing Loop's Balanced Scorecard solution.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="time-savings">Time Savings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="business-case">Business Case</TabsTrigger>
          </TabsList>

          <TabsContent value="time-savings">
            <TimeSavingsTab data={timeSavingsData} onChange={setTimeSavingsData} />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceTab data={performanceData} onChange={setPerformanceData} />
          </TabsContent>

          <TabsContent value="business-case">
            <BusinessCaseTab
              timeSavingsData={timeSavingsData}
              performanceData={performanceData}
              annualTimeSavings={annualTimeSavings}
              annualPerformanceImprovement={annualPerformanceImprovement}
              loopCosts={loopCosts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
