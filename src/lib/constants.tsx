import React from 'react';

export const svgPaths: Record<string, React.ReactNode[]> = {
    "file-pen-line": [
        <path key="1" d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />,
        <path key="2" d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />,
        <path key="3" d="M8 18h1" />
    ],
    "palette": [
        <circle key="1" cx="13.5" cy="6.5" r=".5" fill="currentColor" />,
        <circle key="2" cx="17.5" cy="10.5" r=".5" fill="currentColor" />,
        <circle key="3" cx="8.5" cy="7.5" r=".5" fill="currentColor" />,
        <circle key="4" cx="6.5" cy="12.5" r=".5" fill="currentColor" />,
        <path key="5" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    ],
    "file-down": [
        <path key="1" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />,
        <path key="2" d="M14 2v4a2 2 0 0 0 2 2h4" />,
        <path key="3" d="M12 18v-6" />,
        <path key="4" d="m9 15 3 3 3-3" />
    ]
};


interface ThemeProps {
    fontName: string;
}

export const themes: { [key: string]: ThemeProps } = {
    Tehran: {
        fontName: "'Inter', 'Noto Sans SC', sans-serif"
    },
    Isfahan: {
        fontName: "'Poppins', 'Inter', 'Noto Sans SC', sans-serif"
    },
    Shiraz: {
        fontName: "'Nunito', 'Inter', 'Noto Sans SC', sans-serif"
    },
    Mashhad: {
        fontName: "'Work Sans', 'Inter', 'Noto Sans SC', sans-serif"
    }
};