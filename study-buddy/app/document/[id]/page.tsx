import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/header"
import { FileText, FileQuestion, Map, Lightbulb, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DocumentPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the document data based on the ID
  const documentData = {
    id: params.id,
    title: "Introduction to Psychology",
    content: `
      # Introduction to Psychology
      
      Psychology is the scientific study of the mind and behavior. Psychologists are actively involved in studying and understanding mental processes, brain functions, and behavior.
      
      ## Key Concepts
      
      ### 1. Nature vs. Nurture
      
      The nature versus nurture debate involves the extent to which particular aspects of behavior are a product of either inherited (i.e., genetic) or acquired (i.e., learned) influences.
      
      ### 2. Consciousness
      
      Consciousness refers to our awareness of internal and external stimuli. Awareness of internal stimuli includes feeling pain, hunger, thirst, sleepiness, and being aware of our thoughts and emotions.
      
      ### 3. Cognitive Psychology
      
      Cognitive psychology is the scientific study of mental processes such as attention, language use, memory, perception, problem solving, creativity, and thinking.
    `,
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
          <h1 className="text-3xl font-bold">{documentData.title}</h1>
        </div>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">
              <FileText className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="quiz">
              <FileQuestion className="mr-2 h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="concepts">
              <Map className="mr-2 h-4 w-4" />
              Concept Map
            </TabsTrigger>
            <TabsTrigger value="tips">
              <Lightbulb className="mr-2 h-4 w-4" />
              Study Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  {/* In a real app, you would render the document content properly */}
                  <h1>Introduction to Psychology</h1>
                  <p>
                    Psychology is the scientific study of the mind and behavior. Psychologists are actively involved in
                    studying and understanding mental processes, brain functions, and behavior.
                  </p>

                  <h2>Key Concepts</h2>

                  <h3>1. Nature vs. Nurture</h3>
                  <p>
                    The nature versus nurture debate involves the extent to which particular aspects of behavior are a
                    product of either inherited (i.e., genetic) or acquired (i.e., learned) influences.
                  </p>

                  <h3>2. Consciousness</h3>
                  <p>
                    Consciousness refers to our awareness of internal and external stimuli. Awareness of internal
                    stimuli includes feeling pain, hunger, thirst, sleepiness, and being aware of our thoughts and
                    emotions.
                  </p>

                  <h3>3. Cognitive Psychology</h3>
                  <p>
                    Cognitive psychology is the scientific study of mental processes such as attention, language use,
                    memory, perception, problem solving, creativity, and thinking.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Practice Quiz</h2>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Question 1:</h3>
                    <p className="mb-4">What is the scientific study of the mind and behavior called?</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q1-a" name="q1" className="h-4 w-4" />
                        <label htmlFor="q1-a">Sociology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q1-b" name="q1" className="h-4 w-4" />
                        <label htmlFor="q1-b">Psychology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q1-c" name="q1" className="h-4 w-4" />
                        <label htmlFor="q1-c">Anthropology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q1-d" name="q1" className="h-4 w-4" />
                        <label htmlFor="q1-d">Psychiatry</label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Question 2:</h3>
                    <p className="mb-4">
                      The debate about whether behavior is influenced more by genetics or environment is known as:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q2-a" name="q2" className="h-4 w-4" />
                        <label htmlFor="q2-a">Nature vs. Nurture</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q2-b" name="q2" className="h-4 w-4" />
                        <label htmlFor="q2-b">Conscious vs. Unconscious</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q2-c" name="q2" className="h-4 w-4" />
                        <label htmlFor="q2-c">Internal vs. External</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q2-d" name="q2" className="h-4 w-4" />
                        <label htmlFor="q2-d">Cognitive vs. Behavioral</label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Question 3:</h3>
                    <p className="mb-4">
                      Which branch of psychology focuses on mental processes such as attention, language, memory, and
                      thinking?
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q3-a" name="q3" className="h-4 w-4" />
                        <label htmlFor="q3-a">Behavioral Psychology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q3-b" name="q3" className="h-4 w-4" />
                        <label htmlFor="q3-b">Developmental Psychology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q3-c" name="q3" className="h-4 w-4" />
                        <label htmlFor="q3-c">Cognitive Psychology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="q3-d" name="q3" className="h-4 w-4" />
                        <label htmlFor="q3-d">Social Psychology</label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Check Answers</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concepts">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Concept Map</h2>
                <div className="bg-white p-4 border rounded-lg">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Interactive concept map would be displayed here, showing the relationships between key psychology
                      concepts.
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Psychology</h4>
                      <p className="text-sm text-gray-600">The scientific study of the mind and behavior</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Nature vs. Nurture</h4>
                      <p className="text-sm text-gray-600">Debate about genetic vs. environmental influences</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Consciousness</h4>
                      <p className="text-sm text-gray-600">Awareness of internal and external stimuli</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Study Tips</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex">
                    <div className="mr-4 p-2 bg-gray-100 rounded-full h-fit">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Create Flashcards</h3>
                      <p className="text-gray-600">
                        Make flashcards for key psychology terms like "nature vs. nurture" and "cognitive psychology" to
                        help with memorization.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg flex">
                    <div className="mr-4 p-2 bg-gray-100 rounded-full h-fit">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Use the Pomodoro Technique</h3>
                      <p className="text-gray-600">
                        Study for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents
                        burnout.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg flex">
                    <div className="mr-4 p-2 bg-gray-100 rounded-full h-fit">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Teach the Material</h3>
                      <p className="text-gray-600">
                        Try explaining psychology concepts to someone else. Teaching reinforces your understanding and
                        helps identify knowledge gaps.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg flex">
                    <div className="mr-4 p-2 bg-gray-100 rounded-full h-fit">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Connect to Real-Life Examples</h3>
                      <p className="text-gray-600">
                        Try to relate psychological concepts to real-world situations or personal experiences to make
                        them more memorable.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
