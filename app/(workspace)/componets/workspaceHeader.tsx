"use client";

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { ProfileMenu } from '@/components/auth/ProfileMenu'

function WorkspaceHeader({ onSave }: { onSave?: () => void }) {
    const { fileId } = useParams()
    const router = useRouter()

    const fileInfo = useQuery(
        api.fileStorage.getFileData,
        fileId ? { fileId: fileId as string } : "skip"
    )

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 text-lg font-semibold text-black hover:opacity-70 transition-opacity"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Workspace</span>
            </button>

            <h1 className="text-lg font-semibold tracking-wide text-black">
                {fileInfo?.fileName ?? "Untitled"}
            </h1>

            <div className="flex items-center gap-3">
                <Button
                    variant="brutal-dark"
                    className="rounded-full px-5 py-1 text-sm h-8"
                    onClick={onSave}
                >
                    Save
                </Button>
                <ProfileMenu className='mt-2' />
            </div>
        </header>
    )
}

export default WorkspaceHeader