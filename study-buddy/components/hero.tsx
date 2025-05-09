import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative px-6 lg:px-8">
      <div className="mx-auto max-w-3xl pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Study Buddy</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your AI-powered study assistant that helps you learn more efficiently. Upload your course materials and get
            personalized quizzes, concept maps, and study tips.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
            <Link href="#upload" className="text-sm font-semibold leading-6 text-gray-900">
              Upload Materials <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
