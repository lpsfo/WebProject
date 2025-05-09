import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, BrainCircuit, FileQuestion, History, Lightbulb, Map } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Material Upload & Preview",
      description: "Upload and preview your course materials in various formats.",
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "Content Extraction",
      description: "Automatically extract and analyze text content from your materials.",
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Concept Visualization",
      description: "Visualize key concepts and their relationships in an interactive map.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Study Tips",
      description: "Get personalized study advice and reminders based on your materials.",
    },
    {
      icon: <FileQuestion className="h-6 w-6" />,
      title: "Quiz Generation",
      description: "Generate practice quizzes based on your uploaded content.",
    },
    {
      icon: <History className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Save your progress and track your study history over time.",
    },
  ]

  return (
    <section className="py-12 px-4 md:px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Features</h2>
          <p className="mt-4 text-lg text-gray-600">Everything you need to study smarter, not harder.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-700">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
