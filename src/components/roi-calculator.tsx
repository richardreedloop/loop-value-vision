
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
  hoursPerMonthDataAnalyst: number
  annualSalaryDataAnalyst: number
}

export interface PerformanceData {
  annualPartsRevenue: number
  improvementPercentage: number
}

export interface UserCosts {
  oneOffCost: number
  monthlyCost: number
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
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  
  const [timeSavingsData, setTimeSavingsData] = useState<TimeSavingsData>({
    hoursPerMonthDataAnalyst: 80,
    annualSalaryDataAnalyst: 60000
  })

  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    annualPartsRevenue: 74000000,
    improvementPercentage: 2.0
  })

  const [userCosts, setUserCosts] = useState<UserCosts>({
    oneOffCost: 25500,
    monthlyCost: 7500
  })

  const hourlyRateDataAnalyst = timeSavingsData.annualSalaryDataAnalyst / (40 * 52)
  
  const monthlyTimeSavingsHours = timeSavingsData.hoursPerMonthDataAnalyst
  const monthlyTimeSavingsCost = monthlyTimeSavingsHours * hourlyRateDataAnalyst
  
  const annualTimeSavingsHours = monthlyTimeSavingsHours * 12
  const annualTimeSavings = monthlyTimeSavingsCost * 12

  // Calculate performance improvement
  const annualPerformanceImprovement = performanceData.annualPartsRevenue * (performanceData.improvementPercentage / 100)

  // Calculate costs
  const calculatedCosts = {
    setupFee: userCosts.oneOffCost,
    annualLicense: userCosts.monthlyCost * 12,
    firstYearTotal: userCosts.oneOffCost + (userCosts.monthlyCost * 12)
  }

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
    <div ref={containerRef} className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto relative">
      {/* Logo in top right */}
      <div className="absolute top-4 right-4 z-10">
        <img src="/man.png" alt="Loop Logo" className="h-24 w-auto" />
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Loop ROI Calculator</h2>
        <p className="text-slate-600">
          Estimate the benefits of implementing Loop's solutions for MAN.
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
            monthlyTimeSavings={monthlyTimeSavingsCost}
            monthlyTimeSavingsHours={monthlyTimeSavingsHours}
            annualTimeSavingsHours={annualTimeSavingsHours}
            hourlyRate={hourlyRateDataAnalyst}
            annualPerformanceImprovement={annualPerformanceImprovement}
            userCosts={userCosts}
            onCostsChange={setUserCosts}
            calculatedCosts={calculatedCosts}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
