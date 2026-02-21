"use client";

import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react";
import { Loader2Icon } from 'lucide-react';
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';

import { useAction } from "convex/react";


function FileUpload({ isMaxFiles }: { isMaxFiles?: boolean }) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDB);
    const embedDocuments = useAction(api.myAction.ingest);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const { user } = useUser();

    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [open, setOpen] = useState(false)


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setFileName(file.name.replace(/\.pdf$/i, ""))
        }
    }

    const handleSave = async () => {
        setLoading(true)
        const postUrl = await generateUploadUrl();

        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": selectedFile!.type },
            body: selectedFile,
        });
        const { storageId } = await result.json();
        // console.log(storageId)

        const fileId = uuidv4();
        const fileUrl = await getFileUrl({ storageId });

        const response = await addFileEntry({
            fileId: fileId,
            storageId: storageId,
            fileName: fileName ?? "untitled file name",
            createdBy: user?.primaryEmailAddress?.emailAddress as string,
            fileUrl: fileUrl as string
        })

        // API call to fetch the PDF parsed data
        const apiResponse = await fetch('/api/pdf-loader?pdfUrl=' + fileUrl);
        const pdfData = await apiResponse.json();
        const splitText: string[] = pdfData.result;
        // console.log(apiResponse.data.result)
        await embedDocuments({
            splitText,
            fileId: fileId
        })

        setLoading(false);
        setOpen(false);

    }

    const handleCancel = () => {
        setSelectedFile(null)
        setFileName("")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    disabled={isMaxFiles}
                    variant="brutal-dark"
                    className={`w-full rounded-full gap-2 ${open ? "bg-white text-black shadow-[1px_1px_0px_0px_#000] translate-x-[2px] translate-y-[2px]" : ""}`}
                >
                    <Upload className="h-[18px] w-[18px]" />
                    Upload PDF
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md border-2 border-black rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-black">
                        Upload PDF file
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Upload your PDF file here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-black">File</label>
                        <div className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-3 py-2.5 shadow-[3px_3px_0px_0px_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#000]">
                            <label
                                htmlFor="pdf-upload"
                                className="cursor-pointer rounded-lg border-2 border-black bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-gray-50 transition-colors whitespace-nowrap"
                            >
                                Choose File
                            </label>
                            <input
                                id="pdf-upload"
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <span className="truncate text-sm text-gray-500">
                                {selectedFile ? selectedFile.name : "No file chosen"}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-black" htmlFor="file-name">
                            File name
                        </label>
                        <input
                            id="file-name"
                            type="text"
                            placeholder="Enter file name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="w-full rounded-xl border-2 border-black px-3 py-2.5 text-sm text-black placeholder-gray-400 outline-none shadow-[3px_3px_0px_0px_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[1px_1px_0px_0px_#000]"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-1">
                        <Button
                            variant="brutal"
                            onClick={handleCancel}
                            className="rounded-full px-5"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="brutal-dark"
                            onClick={handleSave}
                            className="rounded-full px-5"
                        >{loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Save"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FileUpload