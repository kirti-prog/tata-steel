"use client"

import { useRef, useState, useEffect } from "react"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download } from "lucide-react"

export function CertificateDialog({ courseTitle, type, onClose }) {
  const canvasRef = useRef(null)
  const [participantName, setParticipantName] = useState("")

  const generateCertificate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = 800
    const height = 600
    canvas.width = width
    canvas.height = height

    // Background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    // Border
    ctx.strokeStyle = "#0f766e" // Teal color
    ctx.lineWidth = 10
    ctx.strokeRect(20, 20, width - 40, height - 40)

    // Tata Steel Logo (placeholder)
    const logoText = "TATA STEEL"
    ctx.font = "bold 48px Arial"
    ctx.fillStyle = "#0f766e"
    ctx.textAlign = "center"
    ctx.fillText(logoText, width / 2, 100)

    // Certificate Title
    ctx.font = "bold 36px Arial"
    ctx.fillStyle = "#334155" // Slate-700
    ctx.fillText("CERTIFICATE OF COMPLETION", width / 2, 180)

    // Awarded To
    ctx.font = "24px Arial"
    ctx.fillStyle = "#475569" // Slate-600
    ctx.fillText("This certifies that", width / 2, 250)

    // Participant Name
    ctx.font = "bold 48px Georgia"
    ctx.fillStyle = "#0f766e" // Teal color
    ctx.fillText(participantName || "[Your Name Here]", width / 2, 320)

    // For completing
    ctx.font = "24px Arial"
    ctx.fillStyle = "#475569"
    ctx.fillText(`has successfully completed the ${type} training`, width / 2, 380)

    // Course/Event Title
    ctx.font = "bold 36px Arial"
    ctx.fillStyle = "#334155"
    ctx.fillText(courseTitle, width / 2, 440)

    // Date
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    ctx.font = "20px Arial"
    ctx.fillStyle = "#475569"
    ctx.fillText(`Date: ${date}`, width / 2, 520)

    // Signature Line (placeholder)
    ctx.strokeStyle = "#475569"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width / 4, 550)
    ctx.lineTo((width * 3) / 4, 550)
    ctx.stroke()
    ctx.font = "18px Arial"
    ctx.fillStyle = "#475569"
    ctx.fillText("Authorized Signature", width / 2, 570)
  }

  useEffect(() => {
    generateCertificate()
  }, [participantName, courseTitle, type])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement("a")
      link.download = `${courseTitle.replace(/\s/g, "-")}-Certificate.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
  }

  return (
    <DialogContent className="sm:max-w-[850px] p-6">
      <DialogHeader>
        <DialogTitle>Generate Certificate</DialogTitle>
        <DialogDescription>
          Enter your name to generate and download your certificate for {courseTitle}.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="participantName">Your Name</Label>
          <Input
            id="participantName"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="border border-slate-300 rounded-md" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleDownload} disabled={!participantName.trim()}>
          <Download className="mr-2 h-4 w-4" /> Download Certificate
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
