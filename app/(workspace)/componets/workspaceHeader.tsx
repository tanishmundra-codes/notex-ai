"use client";

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { ProfileMenu } from '@/components/auth/ProfileMenu'

function WorkspaceHeader({ onSave }: { onSave?: () => void }) {
    const { fileId } = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const fileInfo = useQuery(
        api.fileStorage.getFileData,
        fileId ? { fileId: fileId as string } : "skip"
    )

    return (
        <header className="flex items-center px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex-1 flex items-center">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2 text-lg font-semibold text-black hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Workspace</span>
                </button>
            </div>

            <h1 className="text-lg font-semibold tracking-wide text-black text-center">
                {fileInfo?.fileName ?? "Untitled"}
            </h1>

            <div className="flex-1 flex items-center justify-end gap-3">
                <Button
                    variant="brutal-dark"
                    className={`rounded-full px-5 py-1 text-sm h-8 min-w-[80px] ${loading
                            ? "bg-white text-black translate-x-[2px] translate-y-[2px] shadow-[1px_1px_0px_0px_#000]"
                            : ""
                        }`}
                    onClick={async () => {
                        setLoading(true)
                        await Promise.all([
                            onSave?.(),
                            new Promise(res => setTimeout(res, 2000)),
                        ])
                        setLoading(false)
                    }}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
                <ProfileMenu className='mt-2' />
            </div>
        </header>
    )
}

export default WorkspaceHeader