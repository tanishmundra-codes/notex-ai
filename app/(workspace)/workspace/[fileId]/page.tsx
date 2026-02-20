"use client";

import React, { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '../../componets/workspaceHeader'
import { PDFViewer } from '../../componets/PDFViewer'
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from '../../componets/TextEditor'
import { useUser } from '@clerk/nextjs'

export default function Workspace() {
    const { fileId } = useParams();
    const editorRef = useRef<any>(null);
    const { user } = useUser();
    const saveNote = useMutation(api.notes.saveNote);

    const getFileRecord = useQuery(
        api.fileStorage.getFileData,
        fileId ? { fileId: fileId as string } : "skip"
    );

    useEffect(() => {
        console.log(getFileRecord)
    }, [getFileRecord])

    const handleSave = async () => {
        if (!editorRef.current) return;
        const htmlContent = editorRef.current.getHTML();
        await saveNote({
            fileId: fileId as string,
            note: htmlContent,
            createBy: user?.primaryEmailAddress?.emailAddress as string,
        });
        console.log("Notes saved!");
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <WorkspaceHeader onSave={handleSave} />
            <div className="grid grid-cols-2 flex-1 min-h-0 overflow-hidden">
                <div className="p-4 h-full overflow-hidden">
                    <TextEditor editorRef={editorRef} />
                </div>
                <div className="h-full border-l border-gray-200 bg-[#727373] px-4 overflow-hidden">
                    <PDFViewer fileUrl={getFileRecord?.fileUrl} />
                </div>
            </div>
        </div>
    )
}
