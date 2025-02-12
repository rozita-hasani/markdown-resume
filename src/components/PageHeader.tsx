import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";
import { Github } from "lucide-react";

export default function PageHeader() {
    return (
        <header className="container mx-auto md:px-16 p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Logo/>
                    <Link href='/' className="ml-3 text-2xl font-bold text-gray-900">MarkdownResume</Link>
                </div>
                <Link 
                    href="https://github.com/yourusername/markdownresume" 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black border border-black rounded-md hover:bg-gray-800"
                >
                    <Github size={20} />
                    GitHub
                </Link>
            </div>
        </header>
    )
}