import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, FileQuestion, Map, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for documents
const documents = [
  {
    id: 1,
    title: "Introduction to Psychology",
    type: "PDF",
    uploadedAt: "2 days ago",
    pages: 24,
    progress: 65,
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    type: "DOCX",
    uploadedAt: "1 week ago",
    pages: 42,
    progress: 30,
  },
  {
    id: 3,
    title: "World History Notes",
    type: "PDF",
    uploadedAt: "3 days ago",
    pages: 18,
    progress: 90,
  },
]

export function DocumentList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>Manage and study your uploaded materials</CardDescription>
        </div>
        <Link href="/upload">
          <Button size="sm">Upload New</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-md">
                  <FileText className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-medium">{doc.title}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{doc.type}</span>
                    <span className="mx-2">•</span>
                    <span>{doc.pages} pages</span>
                    <span className="mx-2">•</span>
                    <span>Uploaded {doc.uploadedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="hidden md:block">
                  <div className="flex items-center space-x-1">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${doc.progress}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{doc.progress}%</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileQuestion className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Map className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" size="sm">
          View All Documents
        </Button>
      </CardFooter>
    </Card>
  )
}
