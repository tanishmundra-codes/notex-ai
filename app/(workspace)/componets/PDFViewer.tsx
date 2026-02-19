import React from 'react'

export const PDFViewer = ({ fileUrl }: { fileUrl: string }) => {
    return (
        <div className="h-[90vh] w-full">
            <iframe
                src={fileUrl ? fileUrl + "#toolbar=0&view=FitH" : ""}
                className="w-full h-full border-none"
            />
        </div>
    )
}