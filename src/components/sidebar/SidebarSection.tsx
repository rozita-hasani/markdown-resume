import React from "react";

interface SidebarSection {
    children: React.ReactNode;
    title: string
}

export const SidebarSection = ({children, title}: SidebarSection) => (
    <div className="mb-4 pb-4 border-b border-gray-200 px-4">
        <h3 className="text-base font-medium">{title}</h3>
        {children}
    </div>
);