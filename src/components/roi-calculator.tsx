
"use client"

import { useState, useRef, useEffect } from "react"
import { calculateLoopCosts } from "@/lib/cost-calculator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TimeSavingsTab from "./TimeSavingsTab"
import PerformanceTab from "./PerformanceTab"
import BusinessCaseTab from "./BusinessCaseTab"
import { useIsMobile } from "@/hooks/use-mobile"

// Define types for use in the tabs
export interface TimeSavingsData {
  numberOfLocations: number
  dataAnalystCount: number
  hoursPerMonthDataAnalyst: number
  annualSalaryDataAnalyst: number
}

export interface PerformanceData {
  numberOfLocations: number
  averageRevenue: number
  improvementPercentage: number
}

export interface ScoreCardData {
  numberOfLocations: number
  peopleCount: number
  hoursPerMonth: number
  annualCost: number
}

export interface Module {
  id: string
  title: string
  description: string
  price: number
  name: string
  required?: boolean
}

export default function RoiCalculator() {
  const [activeTab, setActiveTab] = useState("timeSavings")
  const [selectedModules] = useState<string[]>(["core", "scorecard"])
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  
  const [scorecardData, setScoreCardData] = useState<ScoreCardData>({
    numberOfLocations: 50,
    peopleCount: 3,
    hoursPerMonth: 30,
    annualCost: 75000,
  })

  const [timeSavingsData, setTimeSavingsData] = useState<TimeSavingsData>({
    numberOfLocations: 50,
    dataAnalystCount: 3,
    hoursPerMonthDataAnalyst: 20,
    annualSalaryDataAnalyst: 60000
  })

  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    numberOfLocations: 50,
    averageRevenue: 1000000,
    improvementPercentage: 2.0
  })

  const hourlyRateDataAnalyst = timeSavingsData.annualSalaryDataAnalyst / (40 * 52)
  
  const monthlyTimeSavingsDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerMonthDataAnalyst
  const monthlyTimeSavingsCost = monthlyTimeSavingsDataAnalyst * hourlyRateDataAnalyst
  
  const annualTimeSavingsHours = monthlyTimeSavingsDataAnalyst * 12
  const annualTimeSavings = monthlyTimeSavingsCost * 12

  // Calculate performance improvement
  const annualPerformanceImprovement = performanceData.numberOfLocations * performanceData.averageRevenue * (performanceData.improvementPercentage / 100)

  const loopCosts = calculateLoopCosts(scorecardData.numberOfLocations, selectedModules)

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const goToNextTab = () => {
    if (activeTab === "timeSavings") {
      setActiveTab("performance");
    } else if (activeTab === "performance") {
      setActiveTab("businessCase");
    }
    
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div ref={containerRef} className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Loop ROI Calculator</h2>
        <p className="text-slate-600">
          Estimate the benefits of implementing Loop's solutions for your business.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-3"} mb-8`}>
          <TabsTrigger value="timeSavings">Time Savings</TabsTrigger>
          <TabsTrigger value="performance">Performance Improvement</TabsTrigger>
          <TabsTrigger value="businessCase">Business Case</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeSavings">
          <TimeSavingsTab 
            data={timeSavingsData} 
            onChange={setTimeSavingsData}
            onNext={goToNextTab}
          />
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceTab 
            data={performanceData} 
            onChange={setPerformanceData}
            onNext={goToNextTab}
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
            monthlyTimeSavings={monthlyTimeSavingsCost}
            monthlyTimeSavingsHours={monthlyTimeSavingsDataAnalyst}
            annualTimeSavingsHours={annualTimeSavingsHours}
            hourlyRate={hourlyRateDataAnalyst}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
