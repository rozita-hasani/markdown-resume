import '../styles/globals.css';
import React from 'react';

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <script async type="module" src={"/google-analytics.js"}></script>
        </head>
        <body className='bg-gray-50 font-sans'>
        {children}
        </body>
        </html>
    );
}