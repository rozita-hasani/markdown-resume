'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {RefObject} from "react";

interface PreviewProps {
    content?: string;
    theme: string;
    font: string;
    previewContainerRef?: RefObject<HTMLDivElement>
}

export default function Preview({content, theme, font, previewContainerRef}: PreviewProps) {
    return (
        <div
            ref={previewContainerRef}
            className={`previewContainer my-4 mr-2 w-1/2 relative overflow-auto custom-scrollbar h-full theme bg-white border border-gray-200 prose max-w-none text-[#1c2024] p-3 ${theme?.toLowerCase()}`}
            style={{fontFamily: font, height: 'calc(100vh - 32px)', }}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    );
};