'use client';

import { SidebarSection } from "@/components/sidebar/SidebarSection";
import ColorPicker from "@/components/sidebar/ColorPicker";

interface ColorSectionProps {
    headerColor: string;
    setHeaderColorAction: (color: string) => void;
    textColor: string;
    setTextColorAction: (color: string) => void;
    linkColor: string;
    setLinkColorAction: (color: string) => void;
}

export default function ColorSection({headerColor, setHeaderColorAction, textColor, setTextColorAction, linkColor, setLinkColorAction}: ColorSectionProps) {
    return (
        <SidebarSection title="Colors">
            <ColorPicker
                label="Heading"
                value={headerColor}
                onChange={setHeaderColorAction}
            />
            <ColorPicker
                label="Text"
                value={textColor}
                onChange={setTextColorAction}
            />
            <ColorPicker
                label="Link"
                value={linkColor}
                onChange={setLinkColorAction}
            />
        </SidebarSection>
    );
}