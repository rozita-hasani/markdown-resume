'use client';

import {SidebarSection} from "@/components/sidebar/SidebarSection";
import {Slider} from "@/components/sidebar/Slider";

interface LayoutSectionProps {
    onLineHeightChange: (height: number) => void;
    onXPaddingChange: (padding: number) => void;
    onYPaddingChange: (padding: number) => void;
    lineHeightScale: number;
    xPaddingScale: number;
    yPaddingScale: number;
}

export function LayoutSection({onLineHeightChange, onXPaddingChange, onYPaddingChange, lineHeightScale, xPaddingScale, yPaddingScale}: LayoutSectionProps) {
    return (
        <SidebarSection title="Layout">
            <Slider label="Line Height" value={lineHeightScale} min={1.0} max={3.0} step={0.1}
                onChange={(e) => onLineHeightChange(parseFloat(e.target.value))}
                currentValue={lineHeightScale.toString()}
            />
            <Slider label="X Padding" value={xPaddingScale} min={0} max={48} step={2}
                onChange={(e) => onXPaddingChange(parseFloat(e.target.value))}
                currentValue={`${xPaddingScale}px`}
            />
            <Slider label="Y Padding" value={yPaddingScale} min={0} max={48} step={2}
                onChange={(e) => onYPaddingChange(parseFloat(e.target.value))}
                currentValue={`${yPaddingScale}px`}
            />
        </SidebarSection>
    );
}