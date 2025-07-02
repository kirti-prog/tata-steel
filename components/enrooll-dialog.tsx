"use client"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function EnrollDialog({ onClose, moduleName }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    courseDuration: "", // This will be user-inputted
    studentId: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Enrollment Data for ${moduleName}:`, formData)
    alert(`Enrollment for "${moduleName}" successful! (Simulated)`)
    onClose()
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Enroll for {moduleName}</DialogTitle>
        <DialogDescription>Please fill in your details to enroll in this training module.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="dob" className="text-right">
            Date of Birth
          </Label>
          <Input id="dob" type="date" value={formData.dob} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email ID
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDuration" className="text-right">
            Course Duration
          </Label>
          <Input
            id="courseDuration"
            value={formData.courseDuration}
            onChange={handleChange}
            placeholder="e.g., 40 hours"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="studentId" className="text-right">
            Student ID
          </Label>
          <Input id="studentId" value={formData.studentId} onChange={handleChange} className="col-span-3" required />
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
            Enroll Now
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="bg-white text-slate-700 hover:bg-slate-100" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}