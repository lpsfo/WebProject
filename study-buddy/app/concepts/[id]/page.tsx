import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/header"
import { ArrowLeft, ZoomIn, ZoomOut, Download } from "lucide-react"
import Link from "next/link"

export default function ConceptMapPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the concept map data based on the ID
  const conceptData = {
    id: params.id,
    title: "Psychology Concepts Map",
    concepts: [
      {
        id: 1,
        name: "Psychology",
        description: "The scientific study of the mind and behavior",
        related: [2, 3, 4],
      },
      {
        id: 2,
        name: "Nature vs. Nurture",
        description: "Debate about genetic vs. environmental influences",
        related: [1],
      },
      {
        id: 3,
        name: "Consciousness",
        description: "Awareness of internal and external stimuli",
        related: [1, 4],
      },
      {
        id: 4,
        name: "Cognitive Psychology",
        description: "Study of mental processes",
        related: [1, 3],
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
          <h1 className="text-3xl font-bold">{conceptData.title}</h1>
        </div>

        <div className="mb-6 flex justify-end space-x-2">
          <Button variant="outline" size="sm">
            <ZoomOut className="mr-2 h-4 w-4" />
            Zoom Out
          </Button>
          <Button variant="outline" size="sm">
            <ZoomIn className="mr-2 h-4 w-4" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="aspect-video bg-white border rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Interactive concept map visualization would be displayed here.</p>
                <div className="inline-block p-4 border rounded-lg bg-gray-50">
                  <p className="font-medium">Psychology</p>
                  <div className="flex justify-center mt-4 space-x-4">
                    <div className="p-2 border rounded-lg bg-white">Nature vs. Nurture</div>
                    <div className="p-2 border rounded-lg bg-white">Consciousness</div>
                    <div className="p-2 border rounded-lg bg-white">Cognitive Psychology</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold mb-4">Concept Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conceptData.concepts.map((concept) => (
            <Card key={concept.id}>
              <CardHeader>
                <CardTitle>{concept.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{concept.description}</p>
                <div>
                  <h4 className="text-sm font-medium mb-2">Related Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.related.map((relatedId) => {
                      const relatedConcept = conceptData.concepts.find((c) => c.id === relatedId)
                      return relatedConcept ? (
                        <span key={relatedId} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {relatedConcept.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
