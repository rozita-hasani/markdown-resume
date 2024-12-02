'use client';

import {SidebarSection} from "@/components/sidebar/SidebarSection";
import {Slider} from "@/components/sidebar/Slider";
import {ChangeEvent} from "react";

interface LayoutSectionProps {
    onLineHeightChangeAction: (height: number) => void;
    onPaddingChangeAction: (padding: number) => void;
    lineHeightScale: number;
    paddingScale: number;
}

export function LayoutSection({onLineHeightChangeAction, onPaddingChangeAction, lineHeightScale, paddingScale}: LayoutSectionProps) {
    const handleLineHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        onLineHeightChangeAction(parseFloat(e.target.value));
    };

    const handlePaddingChange = (e: ChangeEvent<HTMLInputElement>) => {
        onPaddingChangeAction(parseFloat(e.target.value));
    };

    return (
        <SidebarSection title="Layout">
            <Slider label="Line Height" value={lineHeightScale} min={1.0} max={3.0} step={0.1}
                    onChange={handleLineHeightChange}
                    currentValue={lineHeightScale.toString()}/>
            <Slider label="Page Padding" value={paddingScale} min={0} max={48} step={2}
                    onChange={handlePaddingChange}
                    currentValue={`${paddingScale}px`}/>
        </SidebarSection>
    )
}