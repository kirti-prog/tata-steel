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

export function ModuleDetailDialog({ module, onClose }) {
  if (!module) return null

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <span className="text-3xl">{module.icon}</span>
          {module.name}
        </DialogTitle>
        <DialogDescription>Details about the "{module.name}" training module.</DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-4">
        <div>
          <h4 className="font-semibold text-slate-800">Total Modules:</h4>
          <p className="text-slate-600">{module.modules} sub-modules</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">Description:</h4>
          <p className="text-slate-600">
            This module provides comprehensive training on {module.name.toLowerCase()} covering essential concepts and
            practical applications. It is designed to enhance your skills and knowledge in this area.
          </p>
        </div>
        {/* You can add more details here if your module data expands */}
        <div>
          <h4 className="font-semibold text-slate-800">Key Learning Areas:</h4>
          <ul className="list-disc list-inside text-slate-600">
            <li>Core principles of {module.name.toLowerCase()}</li>
            <li>Practical exercises and case studies</li>
            <li>Best practices and industry standards</li>
          </ul>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="bg-white text-slate-700 hover:bg-slate-100" onClick={onClose}>
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}