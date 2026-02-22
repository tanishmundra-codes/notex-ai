"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '../../componets/workspaceHeader'
import { PDFViewer } from '../../componets/PDFViewer'
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from '../../componets/TextEditor'
import { useUser } from '@clerk/nextjs'

export default function Workspace() {
    const { fileId } = useParams();
    const [activeTab, setActiveTab] = useState<'doc' | 'pdf'>('doc');
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
            <WorkspaceHeader
                onSave={handleSave}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <div className="flex md:grid md:grid-cols-2 flex-1 min-h-0 overflow-hidden">
                {/* Document View */}
                <div className={`p-4 h-full overflow-hidden w-full ${activeTab === 'doc' ? 'block' : 'hidden md:block'}`}>
                    <TextEditor editorRef={editorRef} />
                </div>
                {/* PDF View */}
                <div className={`h-full border-gray-200 bg-[#727373] px-4 overflow-hidden w-full md:border-l ${activeTab === 'pdf' ? 'block' : 'hidden md:block'}`}>
                    <PDFViewer fileUrl={getFileRecord?.fileUrl} />
                </div>
            </div>
        </div>
    )
}
