'use client';

import React, { useState, useCallback } from "react";
import { SidebarSection } from "@/components/sidebar/SidebarSection";
import { ChevronDown } from "lucide-react";
import { Slider } from "@/components/sidebar/Slider";

interface FontSectionProps {
    onFontChangeAction: (font: string) => void;
    onFontSizeChangeAction: (size: number) => void;
    fontScale: number;
    headingScale: number;
    onHeadingChangeAction: (heading: number) => void;
}

const loadFont = (fontUrl: string) => {
    const linkId = 'font-link';
    let linkElement = document.getElementById(linkId) as HTMLLinkElement;

    if (linkElement) {
        linkElement.href = fontUrl;
    } else {
        linkElement = document.createElement('link');
        linkElement.id = linkId;
        linkElement.rel = 'stylesheet';
        linkElement.href = fontUrl;
        document.head.appendChild(linkElement);
    }
};

export function FontSection({ onFontChangeAction, onFontSizeChangeAction, fontScale, headingScale, onHeadingChangeAction }: FontSectionProps) {
    const [font, setFont] = useState<string>("'Open Sans', sans-serif");
    const baseFontSize = 16;

    const fonts: { [key: string]: string } = {
        "Open Sans": 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
        "Noto Sans": 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap',
        "Ubuntu": 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap',
    };

    const handleFontChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFont = e.target.value;
        setFont(selectedFont);
        onFontChangeAction(selectedFont);
        loadFont(fonts[selectedFont]);
    }, [onFontChangeAction, fonts]);

    return (
        <SidebarSection title="Font">
            <div className='relative w-full mb-4'>
                <label className="block text-sm font-medium py-3 text-[#5f6368]">Name</label>
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

            <Slider
                label="Size"
                value={fontScale}
                min={0.5}
                max={3.0}
                step={0.1}
                onChange={(e) => onFontSizeChangeAction(parseFloat(e.target.value))}
                currentValue={`${(fontScale * baseFontSize).toFixed(1)}px`}
            />

            <Slider
                label="Heading Scale"
                value={headingScale}
                min={0.5}
                max={3.0}
                step={0.1}
                onChange={(e) => onHeadingChangeAction(parseFloat(e.target.value))}
                currentValue={headingScale.toFixed(1)}
            />
        </SidebarSection>
    )
}