import { Upload } from "@/components/upload"
import { Features } from "@/components/features"
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <Upload />
      <Features />
    </main>
  )
}
