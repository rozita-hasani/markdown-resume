import '../styles/globals.css';
import React from 'react';

export const metadata = {
    title: 'Resume Markdown',
    description: 'Create Your Professional Resume By Markdown',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="icon" href="/logo.svg" type="image/svg+xml"/>
            <script src="/google-analytics.js" defer></script>
        </head>
        <body className='bg-gray-50 font-sans'>
        {children}
        </body>
        </html>
    );
}