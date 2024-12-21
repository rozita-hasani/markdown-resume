'use client';

import {useEffect, useRef} from 'react';
import {MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, diffSourcePlugin, MDXEditorMethods} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './editor.css';

interface EditorProps {
    markdown?: string;
    onChangeAction: (value: string) => void;
}

export default function Editor({markdown, onChangeAction}: EditorProps) {
    const editorRef = useRef<MDXEditorMethods | null>(null)

    // Sync the markdown with the editor when it changes
    useEffect(() => {
        if (editorRef.current && markdown !== undefined) {
            const currentMarkdown = editorRef.current.getMarkdown();
            if (currentMarkdown !== markdown) {
                editorRef.current.setMarkdown(markdown);
            }
        }
    }, [markdown]);

    const handleChange = (newMarkdown: string) => {
        if (markdown !== newMarkdown) {
            onChangeAction(newMarkdown || '');
        }
    };

    return (
        <div className="editor h-full relative w-1/2 custom-scrollbar overflow-auto bg-white border border-gray-200"
           >
            <MDXEditor
                ref={editorRef}
                markdown={markdown ?? ''}
                onChange={handleChange}
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    diffSourcePlugin({viewMode: 'source'})
                ]}
            />
        </div>
    );
};