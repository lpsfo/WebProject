import { DashboardHeader } from "@/components/dashboard/header"
import { DocumentList } from "@/components/dashboard/document-list"
import { StudyStats } from "@/components/dashboard/study-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DocumentList />
          </div>
          <div className="space-y-6">
            <StudyStats />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
