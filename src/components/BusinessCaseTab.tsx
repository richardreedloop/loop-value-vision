
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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, BarChart, Bar } from "recharts"
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
  const totalMonthlyHoursSaved = totalWeeklyHoursSaved * 4.33 // Average weeks per month
  const totalAnnualHoursSaved = totalWeeklyHoursSaved * 52

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
    { month: 'Jan', hours: totalAnnualHoursSaved / 12 },
    { month: 'Feb', hours: (totalAnnualHoursSaved / 12) * 2 },
    { month: 'Mar', hours: (totalAnnualHoursSaved / 12) * 3 },
    { month: 'Apr', hours: (totalAnnualHoursSaved / 12) * 4 },
    { month: 'May', hours: (totalAnnualHoursSaved / 12) * 5 },
    { month: 'Jun', hours: (totalAnnualHoursSaved / 12) * 6 },
    { month: 'Jul', hours: (totalAnnualHoursSaved / 12) * 7 },
    { month: 'Aug', hours: (totalAnnualHoursSaved / 12) * 8 },
    { month: 'Sep', hours: (totalAnnualHoursSaved / 12) * 9 },
    { month: 'Oct', hours: (totalAnnualHoursSaved / 12) * 10 },
    { month: 'Nov', hours: (totalAnnualHoursSaved / 12) * 11 },
    { month: 'Dec', hours: totalAnnualHoursSaved },
  ];

  // Revenue comparison data
  const baseRevenue = performanceData.numberOfLocations * performanceData.averageRevenue;
  const improvedRevenue = baseRevenue + annualPerformanceImprovement;
  
  const revenueComparisonData = [
    { 
      category: "Annual Revenue", 
      "Without Loop": baseRevenue, 
      "With Loop": improvedRevenue 
    }
  ];

  const areaChartConfig = {
    savings: {
      label: "Cumulative Savings",
      color: "#33b7b9",
    },
  } satisfies ChartConfig

  const hoursChartConfig = {
    hours: {
      label: "Cumulative Hours Saved",
      color: "#011d29",
    },
  } satisfies ChartConfig

  const revenueChartConfig = {
    "Without Loop": {
      label: "Without Loop",
      color: "#011d29",
    },
    "With Loop": {
      label: "With Loop",
      color: "#22F6AC",
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
                  <span className="font-bold">{totalMonthlyHoursSaved.toFixed(0)} hrs</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <div>
                    <span className="font-medium block">Annual Hours Saved</span>
                  </div>
                  <span className="font-bold">{totalAnnualHoursSaved.toLocaleString()} hrs</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Time Savings Value</span>
                  <span className="font-bold">£{annualTimeSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                  <span className="font-medium">Annual Performance Improvement</span>
                  <span className="font-bold">£{annualPerformanceImprovement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-md">
                  <span className="font-medium">Total Annual Benefit</span>
                  <span className="font-bold text-emerald-700">£{totalAnnualBenefit.toLocaleString()}</span>
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

        {/* Revenue Comparison Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`h-${isMobile ? '60' : '80'}`}>
              <ChartContainer config={revenueChartConfig}>
                <BarChart
                  accessibilityLayer
                  data={revenueComparisonData}
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
                  <XAxis dataKey="category" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} tickFormatter={(value) => `£${(value / 1000000).toFixed(1)}M`} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillWithoutLoop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#011d29" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#011d29" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillWithLoop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22F6AC" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22F6AC" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Bar 
                    dataKey="Without Loop" 
                    fillOpacity={0.8} 
                    fill="url(#fillWithoutLoop)" 
                  />
                  <Bar 
                    dataKey="With Loop" 
                    fillOpacity={0.8} 
                    fill="url(#fillWithLoop)" 
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
