"use client";

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { ProfileMenu } from '@/components/auth/ProfileMenu'

function WorkspaceHeader({
    onSave,
    activeTab,
    onTabChange
}: {
    onSave?: () => void,
    activeTab?: 'doc' | 'pdf',
    onTabChange?: (tab: 'doc' | 'pdf') => void
}) {
    const { fileId } = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const fileInfo = useQuery(
        api.fileStorage.getFileData,
        fileId ? { fileId: fileId as string } : "skip"
    )

    return (
        <header className="flex items-center justify-between px-3 md:px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex flex-1 items-center">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-1 md:gap-2 text-base md:text-lg font-semibold text-black hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Workspace</span>
                </button>
            </div>

            <h1 className="hidden md:block text-lg font-semibold tracking-wide text-black text-center truncate flex-1">
                {fileInfo?.fileName ?? "Untitled"}
            </h1>

            <div className="md:hidden flex items-center justify-center gap-3 px-2 shrink-0">
                <button
                    onClick={() => onTabChange?.('doc')}
                    className={`text-base font-medium transition-colors ${activeTab === 'doc' ? 'text-black' : 'text-gray-400'}`}
                >
                    DOC
                </button>
                <button
                    onClick={() => onTabChange?.('pdf')}
                    className={`text-base font-medium transition-colors ${activeTab === 'pdf' ? 'text-black' : 'text-gray-400'}`}
                >
                    PDF
                </button>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">

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

                <div className="hidden md:block">
                    <ProfileMenu className='mt-2' />
                </div>
            </div>
        </header>
    )
}

export default WorkspaceHeader