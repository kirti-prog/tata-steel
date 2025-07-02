  "use client"

  import { useState } from "react"
  import { Card, CardContent } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"

  import { Input } from "@/components/ui/input"
  import { Search, Award, BookOpen, Clock, Star, ArrowLeft, ChevronLeft, ChevronRight, Download,Bot, FileQuestion } from "lucide-react"
  import { CourseDashboard } from "@/components/course-dashboard"
  import { CertificateDialog } from "@/components/ui/certificate-dialog"
  import { Dialog } from "@/components/ui/dialog"
  import { RegisterDialog } from "@/components/register-dialog"
  import Image from "next/image"
  import { EnrollDialog } from "@/components/enrooll-dialog" 
  import { cn } from "@/lib/utils"
  import { ModuleDetailDialog } from "@/components/module-details-dialog"
  import { imageConfigDefault } from "next/dist/shared/lib/image-config"
  import ChatBot from "@/components/chatbot" 
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // Import Accordion components
  import {
    courses,
    facilities,
    achievements,
    trainingModules,
    initialUpcomingPrograms,
    testimonials
  } from "@/lib/website-data"
  import { QuizDetailDialog } from "@/components/quiz-details-dialog" // Import QuizDetailDialog
  export default function HomePage() {
    const [currentPage, setCurrentPage] = useState("home")
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedModule, setSelectedModule] = useState(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [upcomingPrograms, setUpcomingPrograms] = useState(initialUpcomingPrograms)
    const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false)
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
      const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false)  
    const [enrollModuleName, setEnrollModuleName] = useState("") 
    const [certificateDetails, setCertificateDetails] = useState({ title: "", type: "" })
      const [isModuleDetailDialogOpen, setIsModuleDetailDialogOpen] = useState(false) 
    const [selectedModuleDetails, setSelectedModuleDetails] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false) 
  const [isQuizzesSectionOpen, setIsQuizzesSectionOpen] = useState(false)
    const [selectedCourseForQuizzes, setSelectedCourseForQuizzes] = useState(null)
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    const [isQuizDetailDialogOpen, setIsQuizDetailDialogOpen] = useState(false)
    const categories = ["All", ...new Set(courses.map((course) => course.category))]

    const filteredCourses = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.desc.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    const getLevelColor = (level) => {
      switch (level) {
        case "Beginner":
          return "bg-emerald-100 text-emerald-800"
        case "Intermediate":
          return "bg-amber-100 text-amber-800"
        case "Advanced":
          return "bg-rose-100 text-rose-800"
        default:
          return "bg-slate-100 text-slate-800"
      }
    }

    const handleRegisterProgram = (id) => {
      setUpcomingPrograms((prevPrograms) =>
        prevPrograms.map((program) => (program.id === id ? { ...program, registered: true } : program)),
      )
    }

    const handleMarkAttendedProgram = (id) => {
      setUpcomingPrograms((prevPrograms) =>
        prevPrograms.map((program) => (program.id === id ? { ...program, attended: true } : program)),
      )
    }

    const handleGenerateEventCertificate = (programTitle) => {
      setCertificateDetails({ title: programTitle, type: "event" })
      setIsCertificateDialogOpen(true)
    }

    const renderHome = () => (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-100">
        {/* Header */}
        <header className="relative py-16 text-white overflow-hidden">
         <Image
          src="1_e4VQOprnWnMm8C18mWL0aw.jpg"
          alt="Learning and Development Strategy"
          layout="fill"
          objectFit=""
          quality={100}
          className="z-0"/>
               <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-900 opacity-85 z-0"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <Image
              src="tata-steel-logo.png"
              alt="Tata Steel Logo"
              width={300}
              height={200}
              className="mx-auto mb-11"
            />
            <h1 className="text-5xl font-bold mb-4">Tata Steel - Learning & Development</h1>
            <p className="text-2xl mb-8">Forging the Future Through Learning</p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setCurrentPage("courses")}
                variant="outline"
                className="bg-black text-white px-8 py-3 text-lg hover:bg-yellow-300 hover:scale-110 transition-transform duration-400"
              >
                Explore Courses
              </Button>
              <Button
                onClick={() => setCurrentPage("calendar")}
                variant="outline"
                className="bg-black text-white px-8 py-3 text-lg hover:bg-yellow-300 hover:scale-110 transition-transform duration-400"
              >
                View Calendar
              </Button>
                <Button
                onClick={() => setIsRegisterDialogOpen(true)} 
                variant="outline"
                className="bg-black text-white px-8 py-3 text-lg hover:bg-yellow-300 hover:scale-110 transition-transform duration-400 "
              >
                Register here
              </Button>
            </div>
          </div>
        </header>

        {/* Achievements Section */}
        <section className="py-16 bg-white ">
          <div className="container mx-auto px-6 ">
            <h2 className="text-4xl font-bold text-center text-teal-800 mb-12">Milestone Overview:</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 ">
              <div className="text-center p-6 bg-gradient-to-br from-teal-500 to-teal-900 text-white rounded-lg shadow-xl  hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">{achievements.yearsInOperation}</div>
                <div className="text-lg">Years in Operation</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">{achievements.totalEmployeesTrained.toLocaleString()}</div>
                <div className="text-lg">Total Employees Trained</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-900 text-white rounded-lg shadow-2xl  hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">{achievements.yearlyTraining.toLocaleString()}</div>
                <div className="text-lg">Trained This Year</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-400 to-orange-700 text-white rounded-lg shadow-2xl  hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">{achievements.partnerships}</div>
                <div className="text-lg">Industry Partnerships</div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg flex flex-col md:flex-row items-center md:items-start gap-8 shadow-xl">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-teal-700 mb-4">Industry Recognition</h3>
                <div className="space-y-2">
                  {achievements.recognitions.map((recognition, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Award className="text-amber-500" size={20} />
                      <span className="text-slate-700">{recognition}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="Screenshot 2025-06-07 091354.png"
                  alt="Industry Recognition"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </section>
  {/* facilities secton */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-teal-800 mb-12">Major Facilities at Kalinganagar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {facilities.map((facility, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{facility.icon}</div>
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">{facility.name}</h3>
                  <p className="text-slate-600">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold text-teal-800">Featured Courses</h2>
              <Button
                onClick={() => setCurrentPage("courses")}
                variant="outline"
                className="bg-white text-slate-700 hover:bg-slate-100"
              >
                View All Courses
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.slice(0, 6).map((course) => (
                <Card key={course.id} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {course.image && (
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={`${course.title} logo`}
                            width={85}
                            height={80}
                            className=" rounded-full"
                          />
                        )}
                        <h3 className="text-xl font-semibold text-teal-700">{course.title}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{course.desc}</p>
                    <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <BookOpen size={16} className="mr-1" />
                        {course.modules} modules
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedCourse(course)
                        setCurrentPage("course-detail")
                      }}
                      className="w-full bg-teal-600 hover:bg-teal-700"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-teal-800 mb-12">What Our Employees Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-amber-400 fill-current" size={20} />
                    ))}
                  </div>
                  <p className="text-slate-800 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-teal-700">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )

    const renderCourses = () => (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="container mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => {setCurrentPage("home")
                  setIsQuizzesSectionOpen(false)} 
              }
              className="mr-4 text-slate-600 hover:text-teal-600"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-4xl font-bold text-teal-800">All Courses</h1>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
              {!isQuizzesSectionOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      {course.image && (
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={`${course.title} logo`}
                          width={80}
                          height={70}
                          className="rounded-full"
                        />
                      )}
                      <h3 className="text-xl font-semibold text-teal-700">{course.title}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="text-sm text-teal-600 mb-2">{course.category}</div>
                  <p className="text-slate-600 mb-4">{course.desc}</p>
                  <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen size={16} className="mr-1" />
                      {course.modules} modules
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedCourse(course)
                      setCurrentPage("course-detail")
                    }}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
              )}
            {/* Quizzes & Tests Section Button */}
          {!isQuizzesSectionOpen && (
            <div className="mt-12 text-center">
              <Button
                onClick={() => setIsQuizzesSectionOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg"
              >
                <FileQuestion className="mr-2 h-5 w-5" /> Quizzes & Tests
              </Button>
          
            
            </div>
          )}

          {/* Render Quizzes Section if open */}
          {isQuizzesSectionOpen && renderQuizzesSection()}
        </div>
      </div>
    )

    const renderQuizzesSection = () => (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="container mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => {
                setIsQuizzesSectionOpen(false)
                setSelectedCourseForQuizzes(null)
                setSelectedQuiz(null)
              }}
              className="mr-4 text-slate-600 hover:text-teal-600"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-4xl font-bold text-teal-800">Quizzes & Tests</h1>
          </div>

          {!selectedCourseForQuizzes && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {course.image && (
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={`${course.title} logo`}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                      <h3 className="text-xl font-semibold text-teal-700">{course.title}</h3>
                    </div>
                    <p className="text-slate-600 mb-4">
                      {course.quizzes && course.quizzes.length > 0
                        ? `${course.quizzes.length} quizzes available`
                        : "No quizzes available"}
                    </p>
                    <Button
                      onClick={() => setSelectedCourseForQuizzes(course)}
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      disabled={!course.quizzes || course.quizzes.length === 0}
                    >
                      View Quizzes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedCourseForQuizzes && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCourseForQuizzes(null)}
                  className="mr-4 text-slate-600 hover:text-teal-600"
                >
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-3xl font-bold text-teal-800">Quizzes for {selectedCourseForQuizzes.title}</h2>
              </div>
              <div className="space-y-4">
                {selectedCourseForQuizzes.quizzes && selectedCourseForQuizzes.quizzes.length > 0 ? (
                  selectedCourseForQuizzes.quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-800">{quiz.title}</h3>
                        <p className="text-sm text-slate-600">{quiz.description}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedQuiz(quiz)
                          setIsQuizDetailDialogOpen(true)
                        }}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Start Quiz
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 text-center py-8">No quizzes available for this course yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )


    const renderCourseDetail = () => {
      if (!selectedCourse) return null

      return (
        <div className="min-h-screen bg-slate-50 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage("courses")}
                className="mr-4 text-slate-600 hover:text-teal-600"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-4xl font-bold text-teal-800">{selectedCourse.title}</h1>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full ${getLevelColor(selectedCourse.level)}`}>
                  {selectedCourse.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800">{selectedCourse.category}</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800">{selectedCourse.duration}</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                  {selectedCourse.modules} modules
                </span>
              </div>

              <p className="text-lg text-slate-700 mb-8">{selectedCourse.desc}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-teal-700 mb-4">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {selectedCourse.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-emerald-500 mr-2">✓</span>
                        <span className="text-slate-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-teal-700 mb-4">Course Details</h3>
                  <div className="space-y-4">
                    <div>
                      <strong className="text-slate-800">Prerequisites:</strong>
                      <p className="text-slate-600">{selectedCourse.prerequisites}</p>
                    </div>
                    <div>
                      <strong className="text-slate-800">Certification:</strong>
                      <p className="text-slate-600">{selectedCourse.certification}</p>
                    </div>
                  </div>
                </div>
              </div>

        <div className="mt-8">
                <h3 className="text-2xl font-semibold text-teal-700 mb-4">Curriculum</h3>
                <div className="space-y-2">
                  {selectedCourse.curriculum.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          {idx + 1}
                        </div>
                        <span className="text-slate-700">{item.name}</span>
                      </div>
                      {item.subModules && item.subModules.length > 0 && (
                        <Accordion type="single" collapsible className="w-full mt-2">
                          <AccordionItem value={`item-${idx}`}>
                            <AccordionTrigger className="text-sm text-slate-600 hover:no-underline py-2">
                              View Sub-modules ({item.subModules.length})
                            </AccordionTrigger>
                            <AccordionContent className="pl-6 pt-2 pb-0">
                              <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {item.subModules.map((subModule, subIdx) => (
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
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    setSelectedCourse(selectedCourse)
                    setCurrentPage("course-dashboard")
                  }}
                  className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const renderTrainingModules = () => (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="container mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage("home")}
              className="mr-4 text-slate-600 hover:text-teal-600"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-4xl font-bold text-teal-800">Training Modules</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(trainingModules).map(([category, modules]) => (
              <div key={category} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-teal-700 mb-6">{category}</h2>
                <div className="space-y-4">
                  {modules.map((module, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                      onClick={() => setSelectedModule(module)}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{module.icon}</span>
                        <div>
                          <h3 className="font-semibold text-slate-800">{module.name}</h3>
                          <p className="text-sm text-slate-600">{module.modules} modules available</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm"className="bg-teal-600  text-white px-5 py-3 text-lg hover:bg-teal-700"
                      onClick={() => {
                            setSelectedModuleDetails(module) // Set the module details
                            setIsModuleDetailDialogOpen(true) // Open the dialog
                          }}>
                        View
                      </Button>
                    <Button variant="outline" size="sm"className="bg-teal-600  text-white px-5 py-3 text-lg hover:bg-teal-700"    onClick={() => {
                            setEnrollModuleName(module.name)
                            setIsEnrollDialogOpen(true)
                          }}> Enroll now</Button>
                    </div>
                    
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

    const renderCalendar = () => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]

      const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      }

      const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
      }

      const navigateMonth = (direction) => {
        const newDate = new Date(currentMonth)
        newDate.setMonth(currentMonth.getMonth() + direction)
        setCurrentMonth(newDate)
      }

      const formatDate = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      }

      const getProgramsForDate = (dateStr) => {
        return upcomingPrograms.filter((program) => program.date === dateStr)
      }

      const daysInMonth = getDaysInMonth(currentMonth)
      const firstDay = getFirstDayOfMonth(currentMonth)
      const days = []

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(null)
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day)
      }

      return (
        <div className="min-h-screen bg-slate-50 p-8">
          <div className="container mx-auto">
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage("home")}
                className="mr-4 text-slate-600 hover:text-teal-600"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-4xl font-bold text-teal-800">Training Calendar</h1>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => navigateMonth(-1)}
                  className="bg-white text-slate-700 hover:bg-slate-100"
                >
                  <ChevronLeft size={20} />
                </Button>
                <h2 className="text-2xl font-semibold text-teal-700">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => navigateMonth(1)}
                  className="bg-white text-slate-700 hover:bg-slate-100"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center font-semibold text-slate-600 bg-slate-100 rounded">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                  if (!day) return <div key={idx} className="p-2"></div>

                  const dateStr = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  const programs = getProgramsForDate(dateStr)
                  const today = new Date()
                  const isToday =
                    currentMonth.getFullYear() === today.getFullYear() &&
                    currentMonth.getMonth() === today.getMonth() &&
                    day === today.getDate()

                  const hasPrograms = programs.length > 0
                  const hasRegisteredPrograms = programs.some((p) => p.registered) // Check if any program on this day is registered

                  return (
                    <div
                      key={idx}
                      className={cn(
                        "p-2 min-h-[80px] border rounded flex flex-col",
                        "hover:bg-slate-50",
                        isToday && "bg-teal-200 border-teal-600 ring-2 ring-teal-500", // Highlight current day
                        !isToday && hasRegisteredPrograms && "bg-red-300 border-red-700", // Highlight days with registered programs (changed to red)
                        !isToday && hasPrograms && !hasRegisteredPrograms && "bg-teal-50 border-teal-300", // Highlight days with programs (not today, not registered)
                        "relative",
                      )}
                    >
                      <div className="font-semibold text-slate-800 mb-1">{day}</div>
                      <div className="flex-1 overflow-hidden">
                        {programs.map((program, pIdx) => (
                          <div
                            key={pIdx}
                            className="text-xs bg-teal-100 text-teal-800 rounded px-1 py-0.5 mb-1 truncate"
                            title={program.title} // Add title for full text on hover
                          >
                            {program.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-teal-700 mb-6">Upcoming Programs</h3>
              <div className="space-y-4">
                {upcomingPrograms.map((program, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-800">{program.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 mt-1">
                        <span>📅 {program.date}</span>
                        <span>🏷️ {program.type}</span>
                        <span>🏢 {program.department}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3 sm:mt-0">
                      {!program.registered && (
                        <Button
                          size="sm"
                          onClick={() => handleRegisterProgram(program.id)}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Register
                        </Button>
                      )}
                      {program.registered && !program.attended && (
                        <Button variant="outline" size="sm" onClick={() => handleMarkAttendedProgram(program.id)}>
                          Mark Attended
                        </Button>
                      )}
                      {program.attended && (
                        <Button
                          size="sm"
                          onClick={() => handleGenerateEventCertificate(program.title)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Download className="mr-2 h-4 w-4" /> Certificate
                        </Button>
                      )}
                        <Button   
                          size="sm" className="bg-teal-600 hover:bg-teal-700">Notify me</Button>
                    </div>
                  
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    const renderFooter = () => (
      <footer className="bg-teal-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-slate-300">
                <p>📍 Kalinganagar, Jajpur, Odisha</p>
                <p>📞 +91-6758-660000</p>
                <p>✉️ learning@tatasteel.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => setCurrentPage("home")} className="block text-slate-300 hover:text-white">
                  About
                </button>
                <button
                  onClick={() => setCurrentPage("training-modules")}
                  className="block text-slate-300 hover:text-white"
                >
                  Modules
                </button>
                <button onClick={() => setCurrentPage("calendar")} className="block text-slate-300 hover:text-white">
                  Calendar
                </button>
                <button onClick={() => setCurrentPage("courses")} className="block text-slate-300 hover:text-white">
                  Courses
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Social Media</h3>
              <div className="space-y-2 text-slate-300">
                <p>📘 Facebook</p>
                <p>🐦 Twitter</p>
                <p>💼 LinkedIn</p>
                <p>📺 YouTube</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <p className="text-slate-300 mb-4">Stay updated with our latest training programs</p>
              <div className="flex">
                <Input type="email" placeholder="Enter email" className="flex-1 px-3 py-2 rounded-l text-slate-800" />
                <Button className="rounded-l-none bg-teal-600 hover:bg-teal-700">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-teal-800 mt-8 pt-8 text-center text-slate-300">
            © 2025 Tata Steel Learning & Development. All rights reserved.
          </div>
        </div>
      </footer>
    )

    // Main navigation
    const renderNavigation = () => (
      <nav className="bg-gradient-to-b from-teal-600 to-teal-900 text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-7 flex items-center justify-between">
          <button onClick={() => setCurrentPage("home")} className="text-2xl font-bold hover:text-teal-200">
            Tata Steel L&D
          </button>
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => setCurrentPage("home")}
              className={`hover:text-teal-300 ${currentPage === "home" ? "text-yellow-300 font-bold" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("courses")}
              className={`hover:text-teal-300 ${currentPage === "courses" ? "text-yellow-300 font-bold" : ""}`}
            >
              Courses
            </button>
            <button
              onClick={() => setCurrentPage("training-modules")}
              className={`hover:text-teal-300 ${currentPage === "training-modules" ? "text-yellow-300 font-bold" : ""}`}
            >
              Training Modules
            </button>
            <button
              onClick={() => setCurrentPage("calendar")}
              className={`hover:text-teal-300 ${currentPage === "calendar" ? "text-yellow-300 font-bold" : ""}`}
            >
              Calendar
            </button>
          </div>
        </div>
      </nav>
    )

    return (
      <div className="min-h-screen">
        {renderNavigation()}
        {currentPage === "home" && renderHome()}
        {currentPage === "courses" && renderCourses()}
        {currentPage === "course-detail" && renderCourseDetail()}
        {currentPage === "training-modules" && renderTrainingModules()}
        {currentPage === "calendar" && renderCalendar()}
        {currentPage === "course-dashboard" && selectedCourse && (
          <CourseDashboard
            course={selectedCourse}
            onBack={() => setCurrentPage("course-detail")}
            onGenerateCertificate={(courseTitle) => {
              setCertificateDetails({ title: courseTitle, type: "course" })
              setIsCertificateDialogOpen(true)
            }}
          />
        )}
        {renderFooter()}

        <Dialog open={isCertificateDialogOpen} onOpenChange={setIsCertificateDialogOpen}>
          <CertificateDialog
            courseTitle={certificateDetails.title}
            type={certificateDetails.type}
            onClose={() => setIsCertificateDialogOpen(false)}
          />
        </Dialog>
              <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
          <RegisterDialog onClose={() => setIsRegisterDialogOpen(false)} />
        </Dialog>
  <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
          <EnrollDialog moduleName={enrollModuleName} onClose={() => setIsEnrollDialogOpen(false)} />
        </Dialog>
          <Dialog open={isModuleDetailDialogOpen} onOpenChange={setIsModuleDetailDialogOpen}>
          <ModuleDetailDialog module={selectedModuleDetails} onClose={() => setIsModuleDetailDialogOpen(false)} />
        </Dialog>
        {/* Quiz Detail Dialog */}
        <Dialog open={isQuizDetailDialogOpen} onOpenChange={setIsQuizDetailDialogOpen}>
          <QuizDetailDialog quiz={selectedQuiz} onClose={() => setIsQuizDetailDialogOpen(false)} />
        </Dialog>
        {/* Floating Chatbot Icon */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-teal-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40 group"
        >
          <Bot className="w-7 h-7 group-hover:animate-pulse" />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with L&D Assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>

        {/* Compact Chat Widget */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-6 z-50">
            <ChatBot onClose={() => setIsChatOpen(false)} />
          </div>
        )}
      </div>
    )
  }
