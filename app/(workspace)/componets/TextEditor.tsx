import React from 'react'

import Bold from '@tiptap/extension-bold'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit, Bold],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: 'outline-none h-screen pd-5',
            },
        },
        immediatelyRender: false,
    })

    return (
        <div>
            <div className="control-group">
                <div className="button-group">
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={editor?.isActive('bold') ? 'is-active' : ''}
                    >
                        Toggle bold
                    </button>
                </div>
                <div>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default TextEditor