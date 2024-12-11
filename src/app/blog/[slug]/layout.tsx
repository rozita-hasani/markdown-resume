import React from "react";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-gray-50'>
            <PageHeader/>
            <section>{children}</section>
            <PageFooter/>
        </div>
    );
}