
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Video, Mail, Phone, ExternalLink, TrendingUp } from "lucide-react"
import type { TimeSavingsData, PerformanceData } from "./roi-calculator"
import type { LoopCosts } from "@/lib/cost-calculator"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, AreaChart } from "recharts"

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
  const totalAnnualBenefit = annualTimeSavings + annualPerformanceImprovement
  const firstYearROI = ((totalAnnualBenefit - loopCosts.firstYearTotal) / loopCosts.firstYearTotal) * 100
  const ongoingAnnualROI = ((totalAnnualBenefit - loopCosts.annualLicense) / loopCosts.annualLicense) * 100
  
  // Calculate total weekly hours saved
  const weeklyHoursSavedDataAnalyst = timeSavingsData.dataAnalystCount * timeSavingsData.hoursPerWeekDataAnalyst
  const totalWeeklyHoursSaved = weeklyHoursSavedDataAnalyst
  const totalAnnualHoursSaved = totalWeeklyHoursSaved * 52

  const handleBookMeeting = () => {
    window.open("https://meetings-eu1.hubspot.com/tberry/intro", "_blank");
  }

  const handleWatchVideo = () => {
    window.open("https://loop.so/scorecard-demo", "_blank");
  }

  // Chart config for bar chart
  const barChartData = [
    {
      name: 'Year 1',
      'Loop Investment': loopCosts.firstYearTotal,
      'Time Savings': annualTimeSavings,
      'Performance Improvement': annualPerformanceImprovement,
    },
    {
      name: 'Year 2',
      'Loop Investment': loopCosts.annualLicense,
      'Time Savings': annualTimeSavings,
      'Performance Improvement': annualPerformanceImprovement,
    },
    {
      name: 'Year 3',
      'Loop Investment': loopCosts.annualLicense,
      'Time Savings': annualTimeSavings,
      'Performance Improvement': annualPerformanceImprovement,
    }
  ];

  // Chart config for area chart
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
          Review the complete business case for implementing Loop's Balanced Scorecard solution.
        </p>
      </div>

      {/* Summary card at the top */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold mb-2">Annual Benefits</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-lg">
                  <span>Total Annual Benefit:</span>
                  <span className="font-bold">£{totalAnnualBenefit.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Return on Investment</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg">First Year ROI:</span>
                <span className="text-2xl font-bold">{firstYearROI.toFixed(0)}%</span>
                {firstYearROI > 0 && <TrendingUp className="text-emerald-500" />}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Annual Benefits Breakdown</h3>
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
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
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
                Book a session where we'll review your ROI, share case studies from customers like 
                VW Group, Honda, and Hyundai, and build a Loop instance using your data.
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
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ROI Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart
                width={500}
                height={300}
                data={barChartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Loop Investment" stackId="a" fill="#011d29" />
                <Bar dataKey="Time Savings" stackId="b" fill="#33b7b9" />
                <Bar dataKey="Performance Improvement" stackId="b" fill="#4ade80" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumulative Annual Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={areaChartConfig}>
              <AreaChart
                accessibilityLayer
                data={areaChartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
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
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
        <Button onClick={handleBookMeeting} size="lg" className="bg-[#011d29] hover:bg-[#011d29]/90">
          <Calendar className="mr-2" />
          Book a Meeting with Tom
        </Button>
        
        <Button onClick={handleWatchVideo} size="lg" variant="outline" className="border-[#33b7b9] text-[#33b7b9] hover:bg-[#33b7b9]/10">
          <Video className="mr-2" />
          Watch Scorecard Demo
        </Button>
      </div>
    </div>
  )
}
