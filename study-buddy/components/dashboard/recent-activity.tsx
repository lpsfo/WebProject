import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, FileQuestion, Map, Clock } from "lucide-react"

// Mock data for recent activity
const activities = [
  {
    id: 1,
    type: "document",
    title: "Introduction to Psychology",
    time: "2 hours ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "quiz",
    title: "Data Structures Quiz",
    time: "Yesterday",
    icon: <FileQuestion className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "concept",
    title: "World History Concept Map",
    time: "3 days ago",
    icon: <Map className="h-4 w-4" />,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest study activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="p-2 bg-gray-100 rounded-full">{activity.icon}</div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
