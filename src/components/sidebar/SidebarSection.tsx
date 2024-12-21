import React from "react";

interface SidebarSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export function SidebarSection({ title, icon, children }: SidebarSectionProps) {
    return (
        <div className="border-b last:border-b-0">
            <div className="flex items-center gap-2 px-4 py-2">
                {icon}
                <h2 className="font-medium">{title}</h2>
            </div>
            <div className="px-4">{children}</div>
        </div>
    );
}