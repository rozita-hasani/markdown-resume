import '../styles/globals.css';
import React from 'react';

export const metadata = {
    title: 'Resume Markdown - Create Your Professional Resume By Markdown',
    description: 'Create a professional resume by writing in Markdown, using our simple editor, and choose from various templates to export your resume easily.',
};

const base64Logo = "data:image/svg+xml;base64," +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18.74"><path d="..." /></svg>`);


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="icon" href={base64Logo} />
        </head>
        <body className='bg-gray-50 font-sans'>
        {children}
        </body>
        </html>
    );
}