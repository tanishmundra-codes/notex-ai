import React from 'react'

export const PDFViewer = ({ fileUrl }: { fileUrl?: string }) => {
    return (
        <div className="w-full h-full bg-white shadow-sm border border-gray-200 overflow-hidden">
            {fileUrl ? (
                <>
                    <iframe
                        src={fileUrl + "#toolbar=0&view=FitH"}
                        className="hidden md:block w-full h-full border-none"
                    />
                    <iframe
                        src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
                        className="block md:hidden w-full h-full border-none"
                    />
                </>
            ) : null}
        </div>
    )
}