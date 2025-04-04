
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { TimeSavingsData, PerformanceData } from "./roi-calculator"
import type { LoopCosts } from "@/lib/cost-calculator"

interface BusinessCaseTabProps {
  timeSavingsData: TimeSavingsData
  performanceData: PerformanceData
  annualTimeSavings: number
  annualPerformanceImprovement: number
  loopCosts: LoopCosts
  selectedModules: string[]
}

export default function BusinessCaseTab({
  timeSavingsData,
  performanceData,
  annualTimeSavings,
  annualPerformanceImprovement,
  loopCosts,
  selectedModules,
}: BusinessCaseTabProps) {
  const totalAnnualBenefit = annualTimeSavings + annualPerformanceImprovement
  const firstYearROI = ((totalAnnualBenefit - loopCosts.firstYearTotal) / loopCosts.firstYearTotal) * 100
  const ongoingAnnualROI = ((totalAnnualBenefit - loopCosts.annualLicense) / loopCosts.annualLicense) * 100
  const paybackPeriodMonths = loopCosts.setupFee / (totalAnnualBenefit / 12)
  
  // Format module names for display
  const getModuleName = (id: string): string => {
    const moduleMap: Record<string, string> = {
      core: "Core Platform",
      dashboard: "Dashboard",
      scorecard: "Scorecard",
      action: "Action Centre", 
      visits: "Visits",
      surveys: "Surveys"
    }
    return moduleMap[id] || id
  }

  // Calculate total weekly hours saved
  const weeklyHoursSavedAreaManager = timeSavingsData.areaManagerCount * timeSavingsData.hoursPerWeekAreaManager
  const weeklyHoursSavedDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerWeekDataAnalyst
  const totalWeeklyHoursSaved = weeklyHoursSavedAreaManager + weeklyHoursSavedDataAnalyst
  const totalAnnualHoursSaved = totalWeeklyHoursSaved * 52

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Business Case Summary</h2>
        <p className="text-slate-600 mb-6">
          Review the complete business case for implementing Loop's Balanced Scorecard solution.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Annual Benefits</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Time Savings:</span>
                  <span className="font-medium">£{annualTimeSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Performance Improvement:</span>
                  <span className="font-medium">£{annualPerformanceImprovement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-slate-800 font-medium">Total Annual Benefit:</span>
                  <span className="font-bold text-lg">£{totalAnnualBenefit.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Selected Modules</h3>
              <div className="space-y-2">
                {selectedModules.map(moduleId => (
                  <div key={moduleId} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>{getModuleName(moduleId)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Loop Investment</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">One-time Setup Fee:</span>
                  <span className="font-medium">£{loopCosts.setupFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual License Fee:</span>
                  <span className="font-medium">£{loopCosts.annualLicense.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-slate-800 font-medium">First Year Total Cost:</span>
                  <span className="font-bold">£{loopCosts.firstYearTotal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-slate-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">ROI Analysis</h3>
              <div className="space-y-6">
                <div className="flex flex-col">
                  <span className="text-slate-600 mb-1">First Year ROI:</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{firstYearROI.toFixed(0)}%</span>
                    {firstYearROI > 0 && <ArrowRight className="ml-2 text-emerald-500" />}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-600 mb-1">Ongoing Annual ROI:</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{ongoingAnnualROI.toFixed(0)}%</span>
                    {ongoingAnnualROI > 0 && <ArrowRight className="ml-2 text-emerald-500" />}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-600 mb-1">Payback Period:</span>
                  <span className="text-2xl font-bold">{paybackPeriodMonths.toFixed(1)} months</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Summary</h3>
              <p className="text-slate-700 mb-4">
                Based on your inputs, implementing Loop's solution for{" "}
                {timeSavingsData.numberOfDealers} dealers would:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-slate-700">
                <li>
                  Save {totalAnnualHoursSaved.toLocaleString()} hours annually ({weeklyHoursSavedAreaManager.toLocaleString()} hours for Area Managers, {weeklyHoursSavedDataAnalyst.toLocaleString()} hours for Data Analysts)
                </li>
                <li>Generate £{annualPerformanceImprovement.toLocaleString()} in additional revenue</li>
                <li>Provide a {firstYearROI.toFixed(0)}% ROI in the first year</li>
                <li>Pay for itself in {paybackPeriodMonths.toFixed(1)} months</li>
                <li>Utilize {selectedModules.length} Loop modules</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
