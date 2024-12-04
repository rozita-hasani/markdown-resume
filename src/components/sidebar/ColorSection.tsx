'use client';

import { SidebarSection } from "@/components/sidebar/SidebarSection";
import ColorPicker from "@/components/sidebar/ColorPicker";

interface ColorSectionProps {
    headerColor: string;
    setHeaderColor: (color: string) => void;
    textColor: string;
    setTextColor: (color: string) => void;
    linkColor: string;
    setLinkColor: (color: string) => void;
}

export default function ColorSection({headerColor, setHeaderColor, textColor, setTextColor, linkColor, setLinkColor}: ColorSectionProps) {
    return (
        <SidebarSection title="Colors">
            <ColorPicker
                label="Header"
                value={headerColor}
                onChange={setHeaderColor}
            />
            <ColorPicker
                label="Text"
                value={textColor}
                onChange={setTextColor}
            />
            <ColorPicker
                label="Link"
                value={linkColor}
                onChange={setLinkColor}
            />
        </SidebarSection>
    );
}