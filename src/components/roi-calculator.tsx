
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateLoopCosts } from "@/lib/cost-calculator"
import { InfoCircle } from "./InfoCircle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./CustomTooltip"
import TimeSavingsTab from "./TimeSavingsTab"
import PerformanceTab from "./PerformanceTab"
import BusinessCaseTab from "./BusinessCaseTab"
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

export interface PerformanceData {
  numberOfDealers: number
  averageRevenue: number
  improvementPercentage: number
}

export interface Module {
  id: string
  name: string
  required?: boolean
}

export default function RoiCalculator() {
  const [activeTab, setActiveTab] = useState("time-savings")
  
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
  const weeklyTimeSavingsAreaManager = timeSavingsData.areaManagerCount * timeSavingsData.hoursPerWeekAreaManager
  const weeklyTimeSavingsDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerWeekDataAnalyst
  const weeklyCostSavingsAreaManager = weeklyTimeSavingsAreaManager * timeSavingsData.hourlyRateAreaManager
  const weeklyCostSavingsDataAnalyst = weeklyTimeSavingsDataAnalyst * timeSavingsData.hourlyRateDataAnalyst
  const weeklyCostSavings = weeklyCostSavingsAreaManager + weeklyCostSavingsDataAnalyst
  const annualTimeSavings = weeklyCostSavings * 52

  // Calculate annual performance improvement
  const totalAnnualRevenue = performanceData.numberOfDealers * performanceData.averageRevenue
  const annualPerformanceImprovement = totalAnnualRevenue * (performanceData.improvementPercentage / 100)

  // Calculate costs based on selected modules
  const loopCosts = calculateLoopCosts(timeSavingsData.numberOfDealers, selectedModules)

  const handleModuleChange = (modules: string[]) => {
    setSelectedModules(modules)
  }

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h1 className="text-3xl font-bold mr-2">Loop ROI Calculator</h1>
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
          <p className="text-slate-600 mb-6">
            Estimate the business value you could achieve by using the Loop Enterprise Platform.
          </p>
          
          <ModuleSelector 
            availableModules={availableModules} 
            selectedModules={selectedModules} 
            onChange={handleModuleChange} 
          />
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
              selectedModules={selectedModules}
            />
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
