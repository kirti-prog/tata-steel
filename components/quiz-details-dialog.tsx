"use client"

import { useState } from "react"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle } from "lucide-react"

export function QuizDetailDialog({ quiz, onClose }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  if (!quiz) return null

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmitQuiz = () => {
    let currentScore = 0
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (userAnswer && userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
        currentScore++
      }
    })
    setScore(currentScore)
    setSubmitted(true)
  }

  const getAnswerStatus = (question, userAnswer) => {
    if (!submitted) return null
    if (userAnswer && userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
      return <CheckCircle className="text-emerald-500 ml-2" size={16} />
    }
    return <XCircle className="text-rose-500 ml-2" size={16} />
  }

  const getCorrectAnswerDisplay = (question) => {
    if (!submitted) return null
    if (answers[question.id] && answers[question.id].toLowerCase() === question.correctAnswer.toLowerCase()) {
      return null // Already correct, no need to show again
    }
    return (
      <p className="text-sm text-emerald-600 mt-1">
        Correct Answer: <strong>{question.correctAnswer}</strong>
      </p>
    )
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{quiz.title}</DialogTitle>
        <DialogDescription>{quiz.description}</DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-6">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="border-b pb-4 last:border-b-0">
            <p className="font-semibold text-slate-800 mb-2">
              {index + 1}. {question.text}
            </p>
            {question.type === "multiple-choice" && (
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                value={answers[question.id] || ""}
                className="space-y-2"
                disabled={submitted}
              >
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                    <Label htmlFor={`q${question.id}-${option}`}>{option}</Label>
                    {submitted && answers[question.id] === option && getAnswerStatus(question, option)}
                  </div>
                ))}
              </RadioGroup>
            )}
            {question.type === "true-false" && (
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                value={answers[question.id] || ""}
                className="space-y-2"
                disabled={submitted}
              >
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                    <Label htmlFor={`q${question.id}-${option}`}>{option}</Label>
                    {submitted && answers[question.id] === option && getAnswerStatus(question, option)}
                  </div>
                ))}
              </RadioGroup>
            )}
            {question.type === "text" && (
              <div className="flex items-center">
                <Input
                  type="text"
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Your answer"
                  className="flex-1"
                  disabled={submitted}
                />
                {getAnswerStatus(question, answers[question.id])}
              </div>
            )}
            {submitted && getCorrectAnswerDisplay(question)}
          </div>
        ))}
      </div>
      <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
        {submitted ? (
          <div className="text-lg font-bold text-teal-700">
            Your Score: {score} / {quiz.questions.length}
          </div>
        ) : (
          <Button onClick={handleSubmitQuiz} className="bg-teal-600 hover:bg-teal-700">
            Submit Quiz
          </Button>
        )}
        <DialogClose asChild>
          <Button variant="outline" className="bg-white text-slate-700 hover:bg-slate-100" onClick={onClose}>
            {submitted ? "Close" : "Cancel"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
