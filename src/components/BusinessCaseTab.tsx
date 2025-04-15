
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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"

interface BusinessCaseTabProps {
  timeSavingsData: TimeSavingsData
  performanceData: PerformanceData
  annualTimeSavings: number
  monthlyTimeSavings: number
  monthlyTimeSavingsHours: number
  annualTimeSavingsHours: number
  hourlyRate: number
  annualPerformanceImprovement: number
  loopCosts: LoopCosts
  selectedModules: string[]
}

export default function BusinessCaseTab({
  timeSavingsData,
  performanceData,
  annualTimeSavings,
  monthlyTimeSavings,
  monthlyTimeSavingsHours,
  annualTimeSavingsHours,
  annualPerformanceImprovement,
  loopCosts,
}: BusinessCaseTabProps) {
  const isMobile = useIsMobile()
  const totalAnnualBenefit = annualTimeSavings + annualPerformanceImprovement
  const firstYearROI = ((totalAnnualBenefit - loopCosts.firstYearTotal) / loopCosts.firstYearTotal) * 100
  const ongoingAnnualROI = ((totalAnnualBenefit - loopCosts.annualLicense) / loopCosts.annualLicense) * 100
  
  // Get ROI color based on percentage
  const getRoiColor = (roiPercentage: number) => {
    if (roiPercentage < 0) return "text-red-600 bg-red-50"
    if (roiPercentage < 100) return "text-orange-600 bg-orange-50"
    return "text-emerald-600 bg-emerald-50"
  }

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

  // Hours saved across a year chart data
  const hoursChartData = [
    { month: 'Jan', hours: annualTimeSavingsHours / 12 },
    { month: 'Feb', hours: (annualTimeSavingsHours / 12) * 2 },
    { month: 'Mar', hours: (annualTimeSavingsHours / 12) * 3 },
    { month: 'Apr', hours: (annualTimeSavingsHours / 12) * 4 },
    { month: 'May', hours: (annualTimeSavingsHours / 12) * 5 },
    { month: 'Jun', hours: (annualTimeSavingsHours / 12) * 6 },
    { month: 'Jul', hours: (annualTimeSavingsHours / 12) * 7 },
    { month: 'Aug', hours: (annualTimeSavingsHours / 12) * 8 },
    { month: 'Sep', hours: (annualTimeSavingsHours / 12) * 9 },
    { month: 'Oct', hours: (annualTimeSavingsHours / 12) * 10 },
    { month: 'Nov', hours: (annualTimeSavingsHours / 12) * 11 },
    { month: 'Dec', hours: annualTimeSavingsHours },
  ];

  // Revenue comparison data - original implementation
  const baseRevenue = performanceData.numberOfLocations * performanceData.averageRevenue;
  const revenueWithTimeSavings = baseRevenue + annualTimeSavings;
  const revenueWithBothImprovements = baseRevenue + totalAnnualBenefit;
  
  const revenueChartData = [
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
  
  const savingsChartConfig = {
    savings: {
      label: "Cumulative Savings",
      color: "#011d29",
    },
  } satisfies ChartConfig

  const hoursChartConfig = {
    hours: {
      label: "Cumulative Hours Saved",
      color: "#011d29",
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
                <li>Save {annualTimeSavingsHours.toLocaleString()} hours annually</li>
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

        {/* Right column - ROI Analysis - Height matched to left column */}
        <div className="h-full">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Hours Saved Section */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <div>
                    <span className="font-medium block">Monthly Hours Saved</span>
                  </div>
                  <span className="font-bold">{monthlyTimeSavingsHours.toFixed(0)} hrs</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <div>
                    <span className="font-medium block">Annual Hours Saved</span>
                  </div>
                  <span className="font-bold">{annualTimeSavingsHours.toLocaleString()} hrs</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Monthly Cost Saved</span>
                  <span className="font-bold">£{monthlyTimeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Annual Cost Saved</span>
                  <span className="font-bold">£{annualTimeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Annual Performance Improvement</span>
                  <span className="font-bold">£{annualPerformanceImprovement.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-md">
                  <span className="font-medium">Total Annual Benefit</span>
                  <span className="font-bold text-emerald-700">£{totalAnnualBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              {/* ROI Section with dynamic colors */}
              <div className="space-y-3">
                <div className={`flex justify-between items-center p-3 rounded-md ${getRoiColor(firstYearROI)}`}>
                  <span className="font-medium">First Year ROI</span>
                  <div className="flex items-center">
                    <span className="font-bold">
                      {firstYearROI.toFixed(0)}%
                    </span>
                    {firstYearROI > 0 && <TrendingUp className="ml-1 h-4 w-4" />}
                  </div>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-md ${getRoiColor(ongoingAnnualROI)}`}>
                  <span className="font-medium">Ongoing Annual ROI</span>
                  <div className="flex items-center">
                    <span className="font-bold">
                      {ongoingAnnualROI.toFixed(0)}%
                    </span>
                    {ongoingAnnualROI > 0 && <TrendingUp className="ml-1 h-4 w-4" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section - Full Width */}
      <div className={`grid gap-6 ${isMobile ? "" : "md:grid-cols-2"}`}>
        {/* Hours Saved Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cumulative Hours Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`h-${isMobile ? '60' : '80'}`}>
              <ChartContainer config={hoursChartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={hoursChartData}
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
                    <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-hours)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-hours)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="hours"
                    type="monotone"
                    fill="url(#fillHours)"
                    fillOpacity={0.6}
                    stroke="var(--color-hours)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Comparison Chart - Original Implementation */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`h-${isMobile ? '60' : '80'}`}>
              <ChartContainer config={savingsChartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={revenueChartData}
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
              
              {/* Revenue comparison summary */}
              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#011d29] mr-2"></span>
                    Current Annual Revenue
                  </span>
                  <span className="font-medium">£{baseRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#33b7b9] mr-2"></span>
                    Revenue with Time Savings
                  </span>
                  <span className="font-medium">£{revenueWithTimeSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#22F6AC] mr-2"></span>
                    Revenue with All Improvements
                  </span>
                  <span className="font-medium">£{revenueWithBothImprovements.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-medium">Total Revenue Increase</span>
                  <span className="font-bold text-emerald-600">+£{totalAnnualBenefit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Percentage Increase</span>
                  <span className="font-bold text-emerald-600">+{((totalAnnualBenefit / baseRevenue) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

