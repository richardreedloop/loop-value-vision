
"use client"

import { Check } from "lucide-react"
import { useState } from "react"
import type { Module } from "./roi-calculator"

interface ModuleSelectorProps {
  availableModules: Module[]
  selectedModules: string[]
  onChange: (modules: string[]) => void
}

export default function ModuleSelector({ 
  availableModules, 
  selectedModules, 
  onChange 
}: ModuleSelectorProps) {
  
  const toggleModule = (moduleId: string, required?: boolean) => {
    if (required) return // Can't toggle required modules
    
    const newSelection = selectedModules.includes(moduleId)
      ? selectedModules.filter(id => id !== moduleId)
      : [...selectedModules, moduleId]
    
    onChange(newSelection)
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4">Select Loop Modules</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {availableModules.map((module) => {
          const isSelected = selectedModules.includes(module.id)
          return (
            <div
              key={module.id}
              onClick={() => toggleModule(module.id, module.required)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-md border cursor-pointer transition-colors
                ${isSelected ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:bg-gray-50'}
                ${module.required ? 'cursor-not-allowed' : ''}
              `}
            >
              {isSelected && <Check className="h-5 w-5 text-green-500 mb-2" />}
              <span className="font-medium text-center">{module.name}</span>
              {module.required && <span className="text-xs text-gray-500 mt-1">(Required)</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
