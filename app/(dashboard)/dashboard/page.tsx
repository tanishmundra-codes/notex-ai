"use client";

import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { FileText, Plus } from 'lucide-react'
import FileUpload from '../componets/fileUpload'
import { Button } from '@/components/ui/button'

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  const files = useQuery(
    api.fileStorage.getUserFiles,
    user?.primaryEmailAddress?.emailAddress
      ? { userEmail: user.primaryEmailAddress.emailAddress }
      : "skip"
  );

  const fileCount = files?.length ?? 0;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
          <p className="text-sm text-gray-500 mt-1">
            You have {fileCount} document{fileCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="block md:hidden">
          <FileUpload>
            <Button className="h-10 w-10 p-0 rounded-full bg-black text-white hover:bg-black/80 hover:scale-105 active:scale-95 transition-all">
              <Plus className="h-5 w-5" />
            </Button>
          </FileUpload>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {files?.map((file: any) => (
          <div
            key={file._id}
            onClick={() => router.push(`/workspace/${file.fileId}`)}
            className="group cursor-pointer rounded-2xl border-2 border-gray-900 bg-white p-5 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-gray-500" />
            </div>
   
            <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
              {file.fileName}
            </h3>
       
            <p className="text-sm text-gray-500 leading-relaxed">
              PDF document uploaded to your workspace. Click to open and take notes.
            </p>
          </div>
        ))}
      </div>


      {files && files.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FileText className="w-16 h-16 mb-4" />
          <p className="text-lg font-medium">No documents yet</p>
          <p className="text-sm mt-1">Upload a PDF to get started</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard