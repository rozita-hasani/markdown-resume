'use client';

import {ThemeSection} from "@/components/sidebar/ThemeSection";
import {FontSection} from "@/components/sidebar/FontSection";
import {LayoutSection} from "@/components/sidebar/LayoutSection";
import {SidebarButtons} from "@/components/sidebar/SidebarButtons";

interface SidebarProps {
    handlePrint: () => void;
    onThemeChange: (theme: string) => void;
    onFontSizeChange: (size: number) => void;
    onLineHeightChange: (height: number) => void;
    onPaddingChange: (padding: number) => void;
    onFontChange: (font: string) => void;
    fontScale: number;
    lineHeightScale: number;
    paddingScale: number;
}

const Sidebar = ({handlePrint, onThemeChange, onFontSizeChange, onLineHeightChange, onPaddingChange, onFontChange, fontScale, lineHeightScale, paddingScale}: SidebarProps) => {
    return (
        <div className="sidebar flex flex-col justify-between fixed right-0 top-0 bottom-0 max-w-[300px] w-full bg-white py-6 ml-10 border border-gray-200 overflow-auto">
            <div>
                <ThemeSection onThemeChange={onThemeChange}/>
                <FontSection onFontChangeAction={onFontChange} onFontSizeChangeAction={onFontSizeChange} fontScale={fontScale}/>
                <LayoutSection onLineHeightChangeAction={onLineHeightChange} onPaddingChangeAction={onPaddingChange} lineHeightScale={lineHeightScale} paddingScale={paddingScale}/>
            </div>
            <SidebarButtons handlePrint={handlePrint}/>
        </div>
    );
};

export default Sidebar;