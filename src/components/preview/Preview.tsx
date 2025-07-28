'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {RefObject, useState, useEffect} from "react";
import { renderTemplate, TemplateVariables } from '@/lib/templateEngine';

interface PreviewProps {
    content?: string;
    theme: string;
    font: string;
    previewContainerRef?: RefObject<HTMLDivElement>;
    templateVariables?: TemplateVariables;
}

export default function Preview({content, theme, font, previewContainerRef, templateVariables}: PreviewProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Render template variables if provided and we're on the client
    const renderedContent = isClient && templateVariables && Object.keys(templateVariables).length > 0 
        ? renderTemplate(content || '', templateVariables) 
        : content;



    return (
        <div
            ref={previewContainerRef}
            className={`previewContainer mr-2 w-1/2 relative overflow-auto custom-scrollbar h-full theme bg-white border border-gray-200 prose max-w-none text-[#1c2024] p-3 ${theme?.toLowerCase()}`}
            style={{fontFamily: isClient ? font : 'Inter', }}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{renderedContent}</ReactMarkdown>
        </div>
    );
};