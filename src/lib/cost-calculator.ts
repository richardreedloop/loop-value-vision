
export interface LoopCosts {
  setupFee: number
  annualLicense: number
  firstYearTotal: number
}

interface ModuleCosts {
  setup: number
  monthly: number
}

// This function calculates the Loop costs based on the pricing tables provided
export function calculateLoopCosts(numberOfDealers: number, selectedModules: string[]): LoopCosts {
  // Define costs for each module based on dealer count
  const getModuleCosts = (dealerCount: number): Record<string, ModuleCosts> => {
    if (dealerCount <= 100) {
      return {
        core: { setup: 12500, monthly: 1750 },
        dashboard: { setup: 8000, monthly: 1500 },
        scorecard: { setup: 8000, monthly: 1250 },
        action: { setup: 600, monthly: 1000 },
        visits: { setup: 600, monthly: 1250 },
        surveys: { setup: 600, monthly: 1500 },
      }
    } else if (dealerCount <= 250) {
      return {
        core: { setup: 15000, monthly: 2000 },
        dashboard: { setup: 11000, monthly: 1750 },
        scorecard: { setup: 11000, monthly: 1500 },
        action: { setup: 700, monthly: 1250 },
        visits: { setup: 700, monthly: 1500 },
        surveys: { setup: 700, monthly: 1750 },
      }
    } else if (dealerCount <= 500) {
      return {
        core: { setup: 17500, monthly: 2250 },
        dashboard: { setup: 13000, monthly: 2000 },
        scorecard: { setup: 13000, monthly: 1750 },
        action: { setup: 800, monthly: 1500 },
        visits: { setup: 800, monthly: 1750 },
        surveys: { setup: 800, monthly: 2000 },
      }
    } else if (dealerCount <= 1000) {
      return {
        core: { setup: 20000, monthly: 2500 },
        dashboard: { setup: 15000, monthly: 2500 },
        scorecard: { setup: 15000, monthly: 2250 },
        action: { setup: 900, monthly: 1750 },
        visits: { setup: 900, monthly: 2000 },
        surveys: { setup: 900, monthly: 2250 },
      }
    } else {
      // For over 1000 dealers, estimate higher than the previous tier
      return {
        core: { setup: 25000, monthly: 3000 },
        dashboard: { setup: 18000, monthly: 3000 },
        scorecard: { setup: 18000, monthly: 2750 },
        action: { setup: 1100, monthly: 2000 },
        visits: { setup: 1100, monthly: 2500 },
        surveys: { setup: 1100, monthly: 2750 },
      }
    }
  }

  const moduleCosts = getModuleCosts(numberOfDealers)

  let setupFee = 0
  let monthlyFee = 0

  // Calculate costs based on selected modules
  selectedModules.forEach((moduleId) => {
    if (moduleCosts[moduleId]) {
      setupFee += moduleCosts[moduleId].setup
      monthlyFee += moduleCosts[moduleId].monthly
    }
  })

  const annualLicense = monthlyFee * 12
  const firstYearTotal = setupFee + annualLicense

  return {
    setupFee,
    annualLicense,
    firstYearTotal,
  }
}
