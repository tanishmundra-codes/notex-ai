import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const pdfUrl = searchParams.get('pdfUrl');
    console.log("pdfUrl: ", pdfUrl)
    if (!pdfUrl) {
        return NextResponse.json({ error: "PDF URL is required" }, { status: 400 });
    }
    const response = await fetch(pdfUrl);
    const data = await response.blob();

    const loader = new WebPDFLoader(data);
    const docs = await loader.load();
    let pdfTextContent = "";
    docs.forEach((doc) => {
        pdfTextContent += doc.pageContent + " ";
    })

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 0 })

    const splitDocs = await splitter.splitDocuments(docs)

    let splitList: string[] = [];
    splitDocs.forEach((doc) => {
        splitList.push(doc.pageContent)
    })
    console.log(splitList)
    return NextResponse.json({ result: splitList })
}