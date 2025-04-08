
"use client"

import { useState } from "react"
import { calculateLoopCosts } from "@/lib/cost-calculator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TimeSavingsTab from "./TimeSavingsTab"
import PerformanceTab from "./PerformanceTab"
import BusinessCaseTab from "./BusinessCaseTab"

// Define types for use in the tabs
export interface TimeSavingsData {
  numberOfDealers: number
  dataAnalystCount: number
  hoursPerWeekDataAnalyst: number
  hourlyRateDataAnalyst: number
  numberOfDealers: number
  areaManagerCount: number
  hoursPerWeekAreaManager: number
  hourlyRateAreaManager: number
}

export interface PerformanceData {
  numberOfDealers: number
  averageRevenue: number
  improvementPercentage: number
}

export interface ScoreCardData {
  numberOfDealers: number
  peopleCount: number
  hoursPerMonth: number
  annualCost: number
}

export interface Module {
  id: string
  title: string
  description: string
  price: number
}

export default function RoiCalculator() {
  const [selectedModules] = useState<string[]>(["core", "scorecard"])
  
  const [scorecardData, setScoreCardData] = useState<ScoreCardData>({
    numberOfDealers: 50,
    peopleCount: 3,
    hoursPerMonth: 40,
    annualCost: 75000,
  })

  // Initialize time savings data
  const [timeSavingsData, setTimeSavingsData] = useState<TimeSavingsData>({
    numberOfDealers: 50,
    dataAnalystCount: 3,
    hoursPerWeekDataAnalyst: 10,
    hourlyRateDataAnalyst: 30,
    areaManagerCount: 5,
    hoursPerWeekAreaManager: 8,
    hourlyRateAreaManager: 40
  })

  // Initialize performance data
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    numberOfDealers: 50,
    averageRevenue: 1000000,
    improvementPercentage: 2.0
  })

  // Calculate annual time savings for business case
  const weeklyTimeSavingsDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerWeekDataAnalyst
  const weeklyTimeSavingsAreaManager = timeSavingsData.areaManagerCount * timeSavingsData.hoursPerWeekAreaManager
  const annualTimeSavings = 
    (weeklyTimeSavingsDataAnalyst * timeSavingsData.hourlyRateDataAnalyst + 
     weeklyTimeSavingsAreaManager * timeSavingsData.hourlyRateAreaManager) * 52

  // Calculate annual performance improvement
  const totalAnnualRevenue = performanceData.numberOfDealers * performanceData.averageRevenue
  const annualPerformanceImprovement = totalAnnualRevenue * (performanceData.improvementPercentage / 100)

  // Get Loop costs for business case
  const loopCosts = calculateLoopCosts(scorecardData.numberOfDealers, selectedModules)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Loop ROI Calculator</h2>
        <p className="text-slate-600">
          Estimate the benefits of implementing Loop's solutions for your business.
        </p>
      </div>

      <Tabs defaultValue="timeSavings" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="timeSavings">Time Savings</TabsTrigger>
          <TabsTrigger value="performance">Performance Improvement</TabsTrigger>
          <TabsTrigger value="businessCase">Business Case</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeSavings">
          <TimeSavingsTab 
            data={timeSavingsData} 
            onChange={setTimeSavingsData}
          />
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceTab 
            data={performanceData} 
            onChange={setPerformanceData}
          />
        </TabsContent>
        
        <TabsContent value="businessCase">
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
  )
}
