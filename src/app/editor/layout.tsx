import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Resume Markdown Editor - Create and Customize Your Resume",
    description: "Write and customize your professional resume using our intuitive Markdown editor. Choose themes, adjust styles, and export effortlessly.",
    keywords: [
        "Resume Editor",
        "Markdown Resume Editor",
        "Customize Resume",
        "Professional Templates",
        "Markdown Editor",
        "Export PDF Resume",
    ].join(", "),
    openGraph: {
        title: "Resume Markdown Editor - Create and Customize Your Resume",
        description: "Write and customize your professional resume using Markdown. Choose from themes, adjust styles, and export as PDF with ease.",
        type: "website",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/editor`,
        locale: "en_US",
    },
};

export default function EditorLayout({children}: { children: React.ReactNode }) {
    return <>{children}</>;
}