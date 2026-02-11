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
            className={`previewContainer mr-2 w-1/2 relative overflow-auto custom-scrollbar h-full theme bg-white border border-gray-200 prose max-w-none text-[#1c2024] p-3 ${theme?.toLowerCase()}`}
            style={{fontFamily: font, }}
        >
            <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                components={{
                    a: ({node, href, children, ...props}) => {
                        // Check if this is an auto-generated email link from remarkGfm
                        // Auto-generated links have the email as both href and text content
                        // children can be a string directly for simple text content
                        const childText = typeof children === 'string' ? children :
                                         (Array.isArray(children) && typeof children[0] === 'string' ? children[0] : '');

                        const isAutoEmail = href?.startsWith('mailto:') &&
                                          childText &&
                                          href === `mailto:${childText}`;

                        if (isAutoEmail) {
                            // Render as plain text for auto-detected bare emails
                            return <>{children}</>;
                        }
                        // Render as link for intentional markdown mailto links
                        return <a href={href} {...props}>{children}</a>;
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};