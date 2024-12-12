import '../styles/globals.css';
import React from 'react';

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <script async type="module" src={"/google-analytics.js"}></script>
            <link rel="icon" href="/logo.svg" type="image/png"/>
        </head>
        <body className='bg-gray-50 font-sans'>
        {children}
        </body>
        </html>
    );
}