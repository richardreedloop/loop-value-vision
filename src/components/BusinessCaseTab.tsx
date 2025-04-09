
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, ExternalLink, TrendingUp } from "lucide-react"
import type { TimeSavingsData, PerformanceData } from "./roi-calculator"
import type { LoopCosts } from "@/lib/cost-calculator"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"

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
}: BusinessCaseTabProps) {
  const isMobile = useIsMobile()
  const totalAnnualBenefit = annualTimeSavings + annualPerformanceImprovement
  const firstYearROI = ((totalAnnualBenefit - loopCosts.firstYearTotal) / loopCosts.firstYearTotal) * 100
  const ongoingAnnualROI = ((totalAnnualBenefit - loopCosts.annualLicense) / loopCosts.annualLicense) * 100
  
  // Calculate total weekly hours saved
  const weeklyHoursSavedDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerWeekDataAnalyst
  const totalWeeklyHoursSaved = weeklyHoursSavedDataAnalyst
  const totalAnnualHoursSaved = totalWeeklyHoursSaved * 52

  // Chart config for area chart - cumulative savings
  const areaChartData = [
    { month: 'Jan', savings: totalAnnualBenefit / 12 },
    { month: 'Feb', savings: (totalAnnualBenefit / 12) * 2 },
    { month: 'Mar', savings: (totalAnnualBenefit / 12) * 3 },
    { month: 'Apr', savings: (totalAnnualBenefit / 12) * 4 },
    { month: 'May', savings: (totalAnnualBenefit / 12) * 5 },
    { month: 'Jun', savings: (totalAnnualBenefit / 12) * 6 },
    { month: 'Jul', savings: (totalAnnualBenefit / 12) * 7 },
    { month: 'Aug', savings: (totalAnnualBenefit / 12) * 8 },
    { month: 'Sep', savings: (totalAnnualBenefit / 12) * 9 },
    { month: 'Oct', savings: (totalAnnualBenefit / 12) * 10 },
    { month: 'Nov', savings: (totalAnnualBenefit / 12) * 11 },
    { month: 'Dec', savings: totalAnnualBenefit },
  ];

  const areaChartConfig = {
    savings: {
      label: "Cumulative Savings",
      color: "#33b7b9",
    },
  } satisfies ChartConfig

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Business Case Summary</h2>
        <p className="text-slate-600 mb-6">
          Review the complete business case for implementing Loop's solution for your business.
        </p>
      </div>

      {/* Main content grid */}
      <div className={`grid gap-6 ${isMobile ? "" : "md:grid-cols-2"}`}>
        {/* Left column - Executive Summary and Next Steps */}
        <div className="space-y-6">
          <Card className="border-emerald-100 bg-emerald-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Executive Summary</h3>
              <p className="text-slate-700 mb-4">
                Based on your inputs, implementing Loop's solution for{" "}
                {performanceData.numberOfLocations} locations would:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-slate-700">
                <li>Save {totalAnnualHoursSaved.toLocaleString()} hours annually</li>
                <li>Generate £{annualPerformanceImprovement.toLocaleString()} in additional revenue</li>
                <li>Provide a {firstYearROI.toFixed(0)}% ROI in the first year</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#33b7b9]/20 bg-[#33b7b9]/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Next Steps</h3>
              <p className="text-slate-700 mb-4">
                Ready to see these potential savings in action? Book a demo of Loop and we'll show 
                you how you can save time and improve performance across your locations.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-[#011d29]" />
                  <a href="mailto:tom.berry@loop-software.com" className="text-[#011d29]">
                    tom.berry@loop-software.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-[#011d29]" />
                  <a href="tel:07469356639" className="text-[#011d29]">
                    07469 356 639
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-[#011d29]" />
                  <a href="https://meetings-eu1.hubspot.com/tberry/intro" 
                     target="_blank" rel="noopener noreferrer" 
                     className="text-[#011d29] flex items-center">
                    Schedule a meeting <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Benefits & ROI Analysis */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Annual Benefits &amp; ROI</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Annual Benefits Section */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Time Savings</span>
                  <span className="font-bold">£{annualTimeSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Performance Improvement</span>
                  <span className="font-bold">£{annualPerformanceImprovement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-md">
                  <span className="font-medium">Total Annual Benefit</span>
                  <span className="font-bold text-emerald-700">£{totalAnnualBenefit.toLocaleString()}</span>
                </div>
              </div>

              {/* ROI Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">First Year ROI</span>
                  <div className="flex items-center">
                    <span className={`font-bold ${firstYearROI > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {firstYearROI.toFixed(0)}%
                    </span>
                    {firstYearROI > 0 && <TrendingUp className="ml-1 h-4 w-4 text-emerald-600" />}
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Ongoing Annual ROI</span>
                  <div className="flex items-center">
                    <span className={`font-bold ${ongoingAnnualROI > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {ongoingAnnualROI.toFixed(0)}%
                    </span>
                    {ongoingAnnualROI > 0 && <TrendingUp className="ml-1 h-4 w-4 text-emerald-600" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cumulative Savings Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cumulative Annual Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-${isMobile ? '60' : '80'}`}>
                <ChartContainer config={areaChartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={areaChartData}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 20,
                      bottom: 20,
                    }}
                    width={isMobile ? 300 : 500}
                    height={isMobile ? 200 : 300}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <defs>
                      <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-savings)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-savings)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="savings"
                      type="monotone"
                      fill="url(#fillSavings)"
                      fillOpacity={0.6}
                      stroke="var(--color-savings)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
