'use client';

import {ThemeSection} from "@/components/sidebar/ThemeSection";
import {FontSection} from "@/components/sidebar/FontSection";
import {LayoutSection} from "@/components/sidebar/LayoutSection";
import {SidebarButtons} from "@/components/sidebar/SidebarButtons";
import ColorSection from "@/components/sidebar/ColorSection";

interface SidebarProps {
    handlePrint: () => void;
    onThemeChange: (theme: string) => void;
    onFontSizeChange: (size: number) => void;
    onLineHeightChange: (height: number) => void;
    onPaddingChange: (padding: number) => void;
    onFontChange: (font: string) => void;
    fontScale: number;
    lineHeightScale: number;
    headingScale: number;
    onHeadingChange: (heading: number) => void;
    paddingScale: number;
    selectedTheme: string;
    headerColor: string;
    setHeaderColor: (color: string) => void;
    textColor: string;
    setTextColor: (color: string) => void;
    linkColor: string;
    setLinkColor: (color: string) => void;
}

const Sidebar = ({handlePrint, onThemeChange, onFontSizeChange, onLineHeightChange, onPaddingChange, onFontChange, fontScale, lineHeightScale, headingScale, onHeadingChange, paddingScale, selectedTheme, headerColor, setHeaderColor, textColor, setTextColor, linkColor, setLinkColor,}: SidebarProps) => {
    return (
        <div className="sidebar flex flex-col justify-between fixed right-0 top-0 bottom-0 max-w-[300px] w-full bg-white py-6 ml-10 border border-gray-200 overflow-auto">
            <div>
                <ThemeSection onThemeChange={onThemeChange} selectedTheme={selectedTheme}/>
                <FontSection onFontChangeAction={onFontChange} onFontSizeChangeAction={onFontSizeChange} fontScale={fontScale} headingScale={headingScale} onHeadingChangeAction={onHeadingChange}/>
                <LayoutSection onLineHeightChangeAction={onLineHeightChange} onPaddingChangeAction={onPaddingChange} lineHeightScale={lineHeightScale} paddingScale={paddingScale}/>
                <ColorSection headerColor={headerColor} setHeaderColor={setHeaderColor} linkColor={linkColor} setLinkColor={setLinkColor} textColor={textColor} setTextColor={setTextColor}/>
            </div>
            <SidebarButtons handlePrint={handlePrint}/>
        </div>
    );
};

export default Sidebar;