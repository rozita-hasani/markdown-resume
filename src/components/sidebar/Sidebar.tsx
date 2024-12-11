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
    onXPaddingChange: (padding: number) => void;
    onYPaddingChange: (padding: number) => void;
    onFontChange: (font: string) => void;
    fontScale: number;
    lineHeightScale: number;
    headingScale: number;
    onHeadingChange: (heading: number) => void;
    xPaddingScale: number;
    yPaddingScale: number;
    selectedTheme: string;
    headerColor: string;
    setHeaderColor: (color: string) => void;
    textColor: string;
    setTextColor: (color: string) => void;
    linkColor: string;
    setLinkColor: (color: string) => void;
    font: string;
    setFont: (font: string) => void;
}

const Sidebar = ({font, setFont, handlePrint, onThemeChange, onFontSizeChange, onYPaddingChange, onXPaddingChange, onLineHeightChange, onFontChange, fontScale, lineHeightScale, headingScale, onHeadingChange, xPaddingScale, yPaddingScale, selectedTheme, headerColor, setHeaderColor, textColor, setTextColor, linkColor, setLinkColor,}: SidebarProps) => {
    return (
        <div className="sidebar hidden md:block flex-col justify-between fixed right-0 top-0 bottom-0 max-w-[300px] w-full bg-white py-6 ml-10 border border-gray-200 overflow-auto">
            <div>
                <ThemeSection onThemeChange={onThemeChange} selectedTheme={selectedTheme}/>
                <FontSection font={font} setFontAction={setFont} onFontChangeAction={onFontChange} onFontSizeChangeAction={onFontSizeChange} fontScale={fontScale} headingScale={headingScale} onHeadingChangeAction={onHeadingChange}/>
                <LayoutSection onLineHeightChangeAction={onLineHeightChange} onXPaddingChangeAction={onXPaddingChange} onYPaddingChangeAction={onYPaddingChange} lineHeightScale={lineHeightScale} xPaddingScale={xPaddingScale} yPaddingScale={yPaddingScale}/>
                <ColorSection headerColor={headerColor} setHeaderColorAction={setHeaderColor} linkColor={linkColor} setLinkColorAction={setLinkColor} textColor={textColor} setTextColorAction={setTextColor}/>
            </div>
            <SidebarButtons handlePrint={handlePrint}/>
        </div>
    );
};

export default Sidebar;