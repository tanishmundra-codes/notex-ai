import React, { useState, useEffect, useCallback } from 'react'
import {
    Heading1,
    Heading2,
    Heading3,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Sparkles,
    Highlighter,
    Loader2,
    Type,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useParams } from 'next/navigation'
import { useAction } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { getGeminiResponse } from '@/config/AIModel'
import { useMutation } from 'convex/react'
import { useUser } from '@clerk/nextjs'


function EditorExtension({ editor }: { editor: any }) {
    const { fileId } = useParams()
    const [, setForceUpdate] = useState(0);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const { user } = useUser();
    const addNotes = useMutation(api.notes.saveNote);
    const SearchAI = useAction(api.myAction.search);

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            setForceUpdate((prev) => prev + 1);
        };

        editor.on('transaction', handleUpdate);

        return () => {
            editor.off('transaction', handleUpdate);
        };
    }, [editor]);

    if (!editor) return null

    const onAiClick = async () => {
        if (isAiLoading) return;

        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " ",
        )

        if (!selectedText.trim()) return;

        setIsAiLoading(true);
        const originalHTML = editor.getHTML();

        try {
            const result = await SearchAI({
                query: selectedText,
                fileId: fileId as string
            });

            let answer = '';
            result.forEach((item: any) => {
                answer += item.pageContent + "\n";
            });

            const PROMPT = `You are a helpful AI assistant. Return ONLY raw HTML. Do NOT use markdown. Do NOT use backticks, asterisks, or triple backticks. Do NOT wrap in code blocks.

USER QUESTION:
${selectedText}

RETRIEVED CONTEXT (may be incomplete):
${answer}

TASK:
Use the retrieved context as the primary source to answer the question.  
If the context is unclear, incomplete, or empty, use your general knowledge to provide a helpful and reasonable explanation.

STYLE GUIDELINES:
- Explain in simple, short and easy-to-understand language.
- Be clear, structured, and beginner-friendly.
- Do not mention "context" or "retrieved data" in the answer.
- Focus on giving value, not disclaimers.

OUTPUT FORMAT:
Return ONLY valid HTML tags like <p>, <h3>, <ul>, <li>, <strong>, <em>. 
No markdown syntax at all. No \`\`\`, no *, no #, no -.
Example:
<p>Main explanation here.</p>
<h3>Key Points</h3>
<ul>
<li>Important point</li>
<li>Another helpful point</li>
</ul>`;

            let aiResult = await getGeminiResponse(PROMPT);
            console.log("AI Response:", aiResult);
            aiResult = aiResult
                .replace(/```html\n?/gi, '')
                .replace(/```\n?/g, '')
                .replace(/^\s*#{1,6}\s+/gm, '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .trim();

            editor.commands.setContent(originalHTML + `<p><strong> Answer: </strong></p>${aiResult}`);
        } catch (error) {
            console.error("AI Error:", error);
            editor.commands.setContent(originalHTML + `<p><em style="color: #ef4444;"> Failed to generate AI response. Please try again.</em></p>`);
        } finally {
            setIsAiLoading(false);
        }

        const Allnote = editor.getHTML();
        await addNotes({
            fileId: fileId as string,
            note: Allnote,
            createBy: user?.primaryEmailAddress?.emailAddress as string,
        });


    };

    return (
        <div className="flex items-center justify-between md:justify-center gap-2 w-full">
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("heading", { level: 1 }) ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Heading 1"
                    >
                        <Heading1 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("heading", { level: 2 }) ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Heading 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("heading", { level: 3 }) ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Heading 3"
                    >
                        <Heading3 className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("bold") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Bold"
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("italic") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Italic"
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("underline") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Underline"
                    >
                        <Underline className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("highlight") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Highlight"
                    >
                        <Highlighter className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    <button
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive({ textAlign: "left" }) ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Align Left"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive({ textAlign: "center" }) ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Align Center"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive({ textAlign: "right" }) ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Align Right"
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("bulletList") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("orderedList") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                        title="Ordered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 md:hidden flex items-center justify-center gap-1 p-1 rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto overflow-y-hidden scrollbar-hide">
                <div className="flex items-center shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="p-2 flex items-center gap-1 rounded-md transition-all duration-150 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                title="Headings"
                            >
                                <Type className="w-4 h-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-[120px]">
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                className={editor.isActive("heading", { level: 1 }) ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <Heading1 className="w-4 h-4 mr-2" />
                                Heading 1
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                className={editor.isActive("heading", { level: 2 }) ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <Heading2 className="w-4 h-4 mr-2" />
                                Heading 2
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                className={editor.isActive("heading", { level: 3 }) ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <Heading3 className="w-4 h-4 mr-2" />
                                Heading 3
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

        
                <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />

        
                <div className="flex items-center shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="p-2 flex items-center gap-1 rounded-md transition-all duration-150 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                title="Formatting"
                            >
                                <Bold className="w-4 h-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-[120px]">
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={editor.isActive("bold") ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <Bold className="w-4 h-4 mr-2" />
                                Bold
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={editor.isActive("italic") ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <Italic className="w-4 h-4 mr-2" />
                                Italic
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={editor.isActive("underline") ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <Underline className="w-4 h-4 mr-2" />
                                Underline
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`p-2 rounded-md transition-all duration-150 ${editor.isActive("highlight")
                            ? "bg-blue-50 text-blue-600 shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        title="Highlight"
                    >
                        <Highlighter className="w-4 h-4" />
                    </button>
                </div>

        
                <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />

          
                <div className="flex items-center shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="p-2 flex items-center gap-1 rounded-md transition-all duration-150 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                title="Alignment"
                            >
                                <AlignLeft className="w-4 h-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-[120px]">
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                                className={editor.isActive({ textAlign: "left" }) ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <AlignLeft className="w-4 h-4 mr-2" />
                                Align Left
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                                className={editor.isActive({ textAlign: "center" }) ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <AlignCenter className="w-4 h-4 mr-2" />
                                Align Center
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                                className={editor.isActive({ textAlign: "right" }) ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <AlignRight className="w-4 h-4 mr-2" />
                                Align Right
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

 
                <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />
        
                <div className="flex items-center shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="p-2 flex items-center gap-1 rounded-md transition-all duration-150 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                title="Lists"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-[120px]">
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={editor.isActive("bulletList") ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <List className="w-4 h-4 mr-2" />
                                Bullet List
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={editor.isActive("orderedList") ? "bg-blue-50 text-blue-600 font-medium" : ""}
                            >
                                <ListOrdered className="w-4 h-4 mr-2" />
                                Ordered List
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Button
                variant="brutal"
                size="sm"
                className="gap-1 rounded-full px-4 shrink-0"
                onClick={() => onAiClick()}
                disabled={isAiLoading}
            >
                {isAiLoading ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        <span className="hidden md:inline">Generating...</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="size-4" />
                        AI
                    </>
                )}
            </Button>
        </div>
    )
}

export default EditorExtension