import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

export default function PageHeader() {
    return (
        <header className="container mx-auto md:px-16 p-8">
            <div className="flex items-center">
                <Logo/>
                <Link href='/' className="ml-3 text-2xl font-bold text-gray-900">Markdown Resume</Link>
            </div>
        </header>
    )
}