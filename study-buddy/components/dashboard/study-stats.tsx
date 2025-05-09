import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, Brain, Award } from "lucide-react"

export function StudyStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Statistics</CardTitle>
        <CardDescription>Your learning progress this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-8 w-8 text-gray-700 mb-2" />
            <span className="text-2xl font-bold">12h</span>
            <span className="text-xs text-gray-500">Study Time</span>
          </div>

          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <BookOpen className="h-8 w-8 text-gray-700 mb-2" />
            <span className="text-2xl font-bold">5</span>
            <span className="text-xs text-gray-500">Documents</span>
          </div>

          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Brain className="h-8 w-8 text-gray-700 mb-2" />
            <span className="text-2xl font-bold">8</span>
            <span className="text-xs text-gray-500">Quizzes Taken</span>
          </div>

          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Award className="h-8 w-8 text-gray-700 mb-2" />
            <span className="text-2xl font-bold">85%</span>
            <span className="text-xs text-gray-500">Avg. Score</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Weekly Progress</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Monday</span>
                <span>2h 15m</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "45%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Tuesday</span>
                <span>1h 30m</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Wednesday</span>
                <span>3h 45m</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
