'use client';

import React, {useCallback } from "react";
import { SidebarSection } from "@/components/sidebar/SidebarSection";
import {ChevronDown, Type} from "lucide-react";
import { SliderComponent } from "@/components/sidebar/SliderComponent";
import {fonts} from "@/lib/constants";
import {loadFont} from "@/lib/fontUtils";

interface FontSectionProps {
    onFontChangeAction: (font: string) => void;
    onFontSizeChangeAction: (size: number) => void;
    fontScale: number;
    headingScale: number;
    onHeadingChangeAction: (heading: number) => void;
    font: string;
    setFontAction: (font: string) => void;
}

export function FontSection({ onFontChangeAction, onFontSizeChangeAction, font, setFontAction, fontScale, headingScale, onHeadingChangeAction }: FontSectionProps) {
    const baseFontSize = 16;

    const handleFontChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFont = e.target.value;
        setFontAction(selectedFont);
        onFontChangeAction(selectedFont);
        loadFont(fonts[selectedFont]);
    }, [onFontChangeAction, setFontAction]);

    return (
        <SidebarSection title="Typography" icon={<Type className="h-4 w-4" />}>
            <div className='relative w-full mb-4'>
                <label className="block text-sm font-medium py-2 text-[#5f6368]">Name</label>
                <select
                    value={font}
                    onChange={handleFontChange}
                    className="w-full appearance-none text-sm text-[#3c4043] bg-gray-100 hover:bg-gray-200 hover:text-[#63676e] pl-3 pr-9 py-4 rounded-lg"
                    style={{fontFamily: font}}
                    aria-label="Select Font"
                >
                    {Object.keys(fonts).map((fontKey) => (
                        <option key={fontKey} value={fontKey}>{fontKey}</option>
                    ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3/4 transform -translate-y-1/2 text-[#3c4043]"/>
            </div>

            <SliderComponent
                label="Size"
                value={fontScale}
                min={0.5}
                max={3.0}
                step={0.1}
                onChange={(e) => onFontSizeChangeAction(e)}
                currentValue={`${(fontScale * baseFontSize).toFixed(1)}px`}
            />

            <SliderComponent
                label="Heading Scale"
                value={headingScale}
                min={0.5}
                max={3.0}
                step={0.1}
                onChange={(e) => onHeadingChangeAction(e)}
                currentValue={headingScale.toFixed(1)}
            />
        </SidebarSection>
    )
}