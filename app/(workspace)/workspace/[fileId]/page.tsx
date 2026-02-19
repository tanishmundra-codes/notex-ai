"use client";

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '../../componets/workspaceHeader'
import { PDFViewer } from '../../componets/PDFViewer'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from '../../componets/TextEditor'

function Workspace() {
    const { fileId } = useParams();
    const getFileRecord = useQuery(
        api.fileStorage.getFileData,
        fileId ? { fileId: fileId as string } : "skip"
    )

    useEffect(() => {
        console.log(getFileRecord)
    }, [getFileRecord])


    return (
        <div>
            <WorkspaceHeader />
            <div className='grid grid-cols-2 gap-5'>
                <div className="p-5">
                    <div><TextEditor /></div>
                </div>
                <div className="h-full border-l border-gray-200">
                    <PDFViewer fileUrl={getFileRecord?.fileUrl} />
                </div>
            </div>
        </div>
    )
}

export default Workspace