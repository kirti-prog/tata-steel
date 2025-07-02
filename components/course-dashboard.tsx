"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Circle, Download } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // Import Accordion components

export function CourseDashboard({ course, onBack, onGenerateCertificate }) {
  const [completedModules, setCompletedModules] = useState(() => {
    // Initialize completion status for each module
    const initialStatus = {}
    course.curriculum.forEach((_, index) => {
      initialStatus[index] = false
    })
    return initialStatus
  })

  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    const totalModules = course.curriculum.length
    const completedCount = Object.values(completedModules).filter(Boolean).length
    setCompletionPercentage(totalModules > 0 ? (completedCount / totalModules) * 100 : 0)
  }, [completedModules, course.curriculum.length])

  const handleMarkComplete = (index) => {
    setCompletedModules((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle completion status
    }))
  }

  const allModulesCompleted = completionPercentage === 100

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4 text-slate-600 hover:text-teal-600">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-4xl font-bold text-teal-800">Course Dashboard: {course.title}</h1>
        </div>

        <Card className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">Your Progress</h2>
          <div className="flex items-center gap-4 mb-6">
            <Progress value={completionPercentage} className="w-full h-3 bg-slate-200 [&>*]:bg-teal-600" />
            <span className="text-lg font-medium text-teal-700">{Math.round(completionPercentage)}%</span>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-4">Curriculum Modules</h3>
          <div className="space-y-4">
            {course.curriculum.map((moduleItem, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 rounded-lg border border-slate-200" // Removed flex-col and items-center to allow accordion content
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {completedModules[index] ? (
                      <CheckCircle className="text-emerald-500 mr-3" size={24} />
                    ) : (
                      <Circle className="text-slate-400 mr-3" size={24} />
                    )}
                    <span
                      className={`text-lg font-medium ${completedModules[index] ? "text-slate-700 line-through" : "text-slate-800"}`}
                    >
                      {index + 1}. {moduleItem.name}
                    </span>
                  </div>
                  <Button
                    variant={completedModules[index] ? "outline" : "default"}
                    onClick={() => handleMarkComplete(index)}
                    className={
                      completedModules[index]
                        ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        : "bg-teal-600 hover:bg-teal-700"
                    }
                  >
                    {completedModules[index] ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                </div>

                {moduleItem.subModules && moduleItem.subModules.length > 0 && (
                  <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-sm text-slate-600 hover:no-underline py-2">
                        View Sub-modules ({moduleItem.subModules.length})
                      </AccordionTrigger>
                      <AccordionContent className="pl-6 pt-2 pb-0">
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          {moduleItem.subModules.map((subModule, subIdx) => (
                            <li key={subIdx}>{subModule}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => onGenerateCertificate(course.title)}
              disabled={!allModulesCompleted}
              className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="mr-2 h-5 w-5" /> Generate Certificate
            </Button>
            {!allModulesCompleted && (
              <p className="text-sm text-slate-500 mt-2">Complete all modules to generate your certificate.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

