'use client';

import {SidebarSection} from "@/components/sidebar/SidebarSection";
import {SliderComponent} from "@/components/sidebar/SliderComponent";
import {Layout} from "lucide-react";

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
        <SidebarSection title="Layout" icon={<Layout className="h-4 w-4" />}>
            <div className='pt-2'>
                <SliderComponent label="Line Height" value={lineHeightScale} min={1.0} max={3.0} step={0.1}
                                 onChange={(e) => onLineHeightChangeAction(e)}
                                 currentValue={lineHeightScale.toString()}
                />
                <SliderComponent label="X Padding" value={xPaddingScale} min={0} max={48} step={2}
                                 onChange={(e) => onXPaddingChangeAction(e)}
                                 currentValue={`${xPaddingScale}px`}
                />
                <SliderComponent label="Y Padding" value={yPaddingScale} min={0} max={48} step={2}
                                 onChange={(e) => onYPaddingChangeAction(e)}
                                 currentValue={`${yPaddingScale}px`}
                />
            </div>
        </SidebarSection>
    );
}