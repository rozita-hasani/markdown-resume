'use client';

import {SidebarSection} from "@/components/sidebar/SidebarSection";
import {Slider} from "@/components/sidebar/Slider";

interface LayoutSectionProps {
    onLineHeightChangeAction: (height: number) => void;
    onXPaddingChangeAction: (padding: number) => void;
    onYPaddingChangeAction: (padding: number) => void;
    lineHeightScale: number;
    xPaddingScale: number;
    yPaddingScale: number;
}

export function LayoutSection({onLineHeightChangeAction, onXPaddingChangeAction, onYPaddingChangeAction, lineHeightScale, xPaddingScale, yPaddingScale}: LayoutSectionProps) {
    return (
        <SidebarSection title="Layout">
            <Slider label="Line Height" value={lineHeightScale} min={1.0} max={3.0} step={0.1}
                onChange={(e) => onLineHeightChangeAction(parseFloat(e.target.value))}
                currentValue={lineHeightScale.toString()}
            />
            <Slider label="X Padding" value={xPaddingScale} min={0} max={48} step={2}
                onChange={(e) => onXPaddingChangeAction(parseFloat(e.target.value))}
                currentValue={`${xPaddingScale}px`}
            />
            <Slider label="Y Padding" value={yPaddingScale} min={0} max={48} step={2}
                onChange={(e) => onYPaddingChangeAction(parseFloat(e.target.value))}
                currentValue={`${yPaddingScale}px`}
            />
        </SidebarSection>
    );
}