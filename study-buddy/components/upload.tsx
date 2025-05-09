"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadIcon, FileText, File } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Upload() {
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // In a real app, you would upload the files to a server
      // For now, we'll simulate processing with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file(s) have been uploaded and are being processed.`,
      })

      // Redirect to dashboard in a real app
      // router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section id="upload" className="py-12 px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Upload Study Materials</CardTitle>
            <CardDescription>
              Upload your lecture notes, textbooks, or any study materials to get started. Supported formats: PDF, DOCX,
              TXT.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, DOCX, TXT up to 10MB</p>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center text-sm">
                      {file.name.endsWith(".pdf") ? (
                        <FileText className="mr-2 h-4 w-4 text-gray-500" />
                      ) : (
                        <File className="mr-2 h-4 w-4 text-gray-500" />
                      )}
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpload} disabled={isUploading || files.length === 0} className="w-full">
              {isUploading ? "Uploading..." : "Upload and Process"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
