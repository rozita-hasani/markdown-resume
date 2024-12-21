'use client';

import { SidebarSection } from "@/components/sidebar/SidebarSection";
import ColorPicker from "@/components/sidebar/ColorPicker";
import {Palette} from "lucide-react";

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
        <SidebarSection title="Colors" icon={<Palette className="h-4 w-4" />}>
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