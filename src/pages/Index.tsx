
import RoiCalculator from "@/components/roi-calculator"

export default function Index() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Loop ROI Calculator</h1>
      <p className="text-slate-600 mb-8">
        Estimate the business value you could achieve by using the Loop Enterprise Platform.
      </p>
      <RoiCalculator />
    </div>
  )
}
