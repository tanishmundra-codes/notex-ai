"use client";

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import EditorExtension from './EditorExtension'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

function TextEditor({ editorRef }: { editorRef?: React.MutableRefObject<any> }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Highlight,
            Placeholder.configure({
                placeholder: 'Start taking your notes here...',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        editorProps: {
            attributes: {
                class: 'outline-none min-h-full p-5 prose max-w-none tiptap overflow-y-auto',
            },
        },
        immediatelyRender: false,
    })

    const { fileId } = useParams();
    const getNotes = useQuery(api.notes.getNotes, fileId ? { fileId: fileId as string } : "skip");

    // Expose editor instance to parent via ref
    useEffect(() => {
        if (editorRef && editor) {
            editorRef.current = editor;
        }
    }, [editor, editorRef]);

    useEffect(() => {
        if (getNotes) {
            editor && editor.commands.setContent(getNotes[0]?.note);
        }
    }, [getNotes && editor])

    if (!editor) {
        return null
    }

    return (
        <div className="border border-gray-300 rounded-lg h-full flex flex-col overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="p-2 shrink-0">
                <EditorExtension editor={editor} />
            </div>
            {/* Separator */}
            <div className="border-t border-gray-300 shrink-0" />
            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto w-full">
                <EditorContent editor={editor} className="h-full" />
            </div>
        </div>
    )
}

export default TextEditor