"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, X, Minimize2 } from "lucide-react"
import {
  courses,
  facilities,
  achievements,
  trainingModules,
  initialUpcomingPrograms,
  testimonials
} from "@/lib/website-data" // Import data
// ...existing code...
interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatBotProps {
  onClose?: () => void
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Tata Steel L&D assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // General greetings and help
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Welcome to Tata Steel L&D. I'm here to help with courses, training schedules, certifications, and career development. What would you like to know?"
    }
    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do") || lowerMessage.includes("assist")) {
      return "I can assist with:\n• Course information & registration\n• Training schedules\n• Certifications\n• Career development\n• Learning portal help\n• Information about our facilities and achievements.\n\nWhat do you need help with?"
    }
    if (
      lowerMessage.includes("about tata steel l&d") ||
      lowerMessage.includes("about the company") ||
      lowerMessage.includes("who are you")
    ) {
      return "Tata Steel Learning & Development is dedicated to empowering employees through continuous learning. We offer a wide range of programs in technical skills, safety, soft skills, and leadership, leveraging our major facilities at Kalinganagar."
    }

    // Courses related queries
    if (
      lowerMessage.includes("list courses") ||
      lowerMessage.includes("all courses") ||
      lowerMessage.includes("what courses do you offer")
    ) {
      const courseTitles = courses.map((c) => c.title).join(", ")
      return `We offer courses like: ${courseTitles}. You can explore them all on our 'Courses' page.`
    }
    if (
      lowerMessage.includes("course details") ||
      lowerMessage.includes("about course") ||
      (lowerMessage.includes("tell me about") && lowerMessage.includes("course"))
    ) {
      const courseNameMatch = courses.find((c) => lowerMessage.includes(c.title.toLowerCase()))
      if (courseNameMatch) {
        return `The "${courseNameMatch.title}" course is about "${courseNameMatch.desc}". It's a ${courseNameMatch.level} level course, lasting ${courseNameMatch.duration} with ${courseNameMatch.modules} modules. It leads to a "${courseNameMatch.certification}" certification. Its prerequisites are: ${courseNameMatch.prerequisites}.`
      }
      return "Which specific course are you interested in? Please specify the course name, e.g., 'Tell me about Microsoft Excel - Basic' or 'What are the details for React JS?'"
    }
    if (lowerMessage.includes("course category") || lowerMessage.includes("categories of courses")) {
      const categories = [...new Set(courses.map((c) => c.category))].join(", ")
      return `Our courses are categorized into: ${categories}. Which category would you like to know more about?`
    }
    if (lowerMessage.includes("prerequisites for") && lowerMessage.includes("course")) {
      const courseNameMatch = courses.find((c) => lowerMessage.includes(c.title.toLowerCase()))
      if (courseNameMatch) {
        return `The prerequisites for "${courseNameMatch.title}" are: ${courseNameMatch.prerequisites}.`
      }
      return "Which course's prerequisites are you asking about?"
    }
    if (lowerMessage.includes("certification for") && lowerMessage.includes("course")) {
      const courseNameMatch = courses.find((c) => lowerMessage.includes(c.title.toLowerCase()))
      if (courseNameMatch) {
        return `Upon completion of "${courseNameMatch.title}", you will receive the "${courseNameMatch.certification}".`
      }
      return "Which course's certification are you interested in?"
    }

    // Training Modules queries
    if (
      lowerMessage.includes("training modules") ||
      lowerMessage.includes("modules available") ||
      lowerMessage.includes("types of modules")
    ) {
      const moduleCategories = Object.keys(trainingModules).join(", ")
      return `We have training modules in categories like: ${moduleCategories}. For example, in Technical, we have SAP Systems, Plant Operations, etc.`
    }
    if (
      lowerMessage.includes("about module") ||
      lowerMessage.includes("details of module") ||
      (lowerMessage.includes("tell me about") && lowerMessage.includes("module"))
    ) {
      let foundModule = null
      for (const category in trainingModules) {
        foundModule = trainingModules[category].find((m:any) => lowerMessage.includes(m.name.toLowerCase()))
        if (foundModule) break
      }
      if (foundModule) {
        return `The "${foundModule.name}" module is part of our ${foundModule.modules} modules available. It covers essential concepts and practical applications in its area.`
      }
      return "Which specific training module are you interested in? Please specify the module name, e.g., 'Tell me about SAP Systems' or 'What is Quality Control module about?'"
    }

    // Calendar/Upcoming Programs queries
    if (
      lowerMessage.includes("upcoming programs") ||
      lowerMessage.includes("training calendar") ||
      lowerMessage.includes("next training")
    ) {
      if (initialUpcomingPrograms.length > 0) {
        const nextPrograms = initialUpcomingPrograms
                 
          .filter((p) => new Date(p.date) >= new Date()) // Filter for future programs
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date
          .slice(0, 4) // Get up to 4 upcoming programs
          .map(
            (p) =>
              `${p.title} on ${new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
          )
          .join(", ")
          
        if (nextPrograms) {
          return `Some of our upcoming programs include: ${nextPrograms}. You can view the full calendar on the 'Calendar' page.`
        }
        return "There are no upcoming programs listed at the moment. Please check back later!"
      }
      return "There are no upcoming programs listed at the moment. Please check back later!"
    }
    if (
      lowerMessage.includes("register for program") ||
      lowerMessage.includes("enroll in program") ||
      lowerMessage.includes("how to register")
    ) {
      return "To register for a program, please visit the 'Calendar' page and click the 'Register' button next to the program you wish to join. You will need to fill in your details."
    }

    // Achievements queries
    if (
      lowerMessage.includes("achievements") ||
      lowerMessage.includes("what have you achieved") ||
      lowerMessage.includes("company milestones")
    ) {
      return `We have ${achievements.yearsInOperation} years in operation, trained over ${achievements.totalEmployeesTrained.toLocaleString()} employees, and trained ${achievements.yearlyTraining.toLocaleString()} this year alone. We also have ${achievements.partnerships} industry partnerships and have received recognitions like "${achievements.recognitions.join(", ")}".`
    }

    // Facilities queries
    if (
      lowerMessage.includes("facilities") ||
      lowerMessage.includes("major facilities") ||
      lowerMessage.includes("plant locations")
    ) {
      const facilityNames = facilities.map((f) => f.name).join(", ")
      return `Our major facilities at Kalinganagar include: ${facilityNames}. Each plays a crucial role in our operations.`
    }
    if (lowerMessage.includes("about facility") || lowerMessage.includes("details of facility")) {
      const facilityNameMatch = facilities.find((f) => lowerMessage.includes(f.name.toLowerCase()))
      if (facilityNameMatch) {
        return `The "${facilityNameMatch.name}" is an ${facilityNameMatch.desc}.`
      }
      return "Which facility are you interested in? Please specify the facility name, e.g., 'Tell me about the Power Plant'."
    }

    // Testimonials queries
    if (
      lowerMessage.includes("testimonials") ||
      lowerMessage.includes("what do employees say") ||
      lowerMessage.includes("employee feedback")
    ) {
      if (testimonials.length > 0) {
        const sampleTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)] // Get a random testimonial
        return `One of our employees, ${sampleTestimonial.name} (${sampleTestimonial.role}), said: "${sampleTestimonial.text}" They rated us ${sampleTestimonial.rating} out of 5 stars.`
      }
      return "We have many positive testimonials from our employees about their learning experience!"
    }

    // Contact information
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone number") || lowerMessage.includes("email")) {
      return "You can contact us at 📞 +91-6758-660000 or email us at ✉️ learning@tatasteel.com. Our location is 📍 Kalinganagar, Jajpur, Odisha."
    }

    // Default fallback
    return "Thanks for your question! I'm still learning, but I can help with information about our courses, training modules, upcoming programs, facilities, and achievements. Is there anything else specific you'd like to know?"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1200)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isMinimized) {
    return (
      <div className="w-80 bg-white rounded-t-2xl shadow-2xl border border-gray-200 animate-slide-up">
        <div
          className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-t-2xl cursor-pointer hover:from-teal-700 hover:to-teal-800 transition-all"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Tata Steel L&D Assistant</h3>
                <p className="text-teal-100 text-xs">Click to expand</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose?.()
              }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-500 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Tata Steel L&D Assistant</h3>
            <p className="text-yellow-300 text-xs">Online now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(true)} className="text-white/80 hover:text-white transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-end space-x-2 max-w-xs ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-600 text-white"
                }`}
              >
                {message.sender === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
              </div>
              <div
                className={`rounded-2xl px-3 py-2 shadow-sm text-sm ${
                  message.sender === "user"
                    ? "bg-teal-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white rounded-b-2xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-teal-600 text-white rounded-full p-2 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
