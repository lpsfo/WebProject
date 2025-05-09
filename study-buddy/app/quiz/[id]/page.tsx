import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard/header"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function QuizPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the quiz data based on the ID
  const quizData = {
    id: params.id,
    title: "Introduction to Psychology Quiz",
    questions: [
      {
        id: 1,
        question: "What is the scientific study of the mind and behavior called?",
        options: ["Sociology", "Psychology", "Anthropology", "Psychiatry"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "The debate about whether behavior is influenced more by genetics or environment is known as:",
        options: [
          "Nature vs. Nurture",
          "Conscious vs. Unconscious",
          "Internal vs. External",
          "Cognitive vs. Behavioral",
        ],
        correctAnswer: 0,
      },
      {
        id: 3,
        question:
          "Which branch of psychology focuses on mental processes such as attention, language, memory, and thinking?",
        options: ["Behavioral Psychology", "Developmental Psychology", "Cognitive Psychology", "Social Psychology"],
        correctAnswer: 2,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{quizData.title}</h1>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Question 1 of {quizData.questions.length}</span>
            <span className="text-sm text-gray-500">33% Complete</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{quizData.questions[0].question}</p>
            <div className="space-y-3">
              {quizData.questions[0].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="h-5 w-5 rounded-full border border-gray-300 mr-3"></div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <div className="flex justify-center">
          <Button variant="outline" className="mr-2">
            Save Progress
          </Button>
          <Button variant="destructive">End Quiz</Button>
        </div>
      </main>
    </div>
  )
}
