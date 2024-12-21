import {ChangeEvent, useEffect, useState} from "react";
import {SidebarSection} from "@/components/sidebar/SidebarSection";
import {ChevronDown, Palette} from "lucide-react";
import {ThemeList} from "@/lib/constants";

interface ThemeSectionProps {
    onThemeChange: (theme: string) => void;
    selectedTheme: string
}

function capitalizeFirstLetter(str: string) {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
}

export function ThemeSection({onThemeChange, selectedTheme}: ThemeSectionProps) {
    const fallbackSelectedTheme = selectedTheme ? capitalizeFirstLetter(selectedTheme) : 'tehran';
    const [theme, setTheme] = useState<string>(fallbackSelectedTheme);

    useEffect(() => {
        if (!selectedTheme) return;
        setTheme(capitalizeFirstLetter(selectedTheme));
    }, [selectedTheme]);

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setTheme(selected);
        onThemeChange(selected);
    };

    return (
        <SidebarSection title="Theme" icon={<Palette className="h-4 w-4" />}>
            <div className='relative w-full pb-4'>
                <select
                    value={theme}
                    onChange={handleThemeChange}
                    className="w-full appearance-none text-sm text-[#3c4043] bg-gray-100 hover:bg-gray-200 hover:text-[#63676e] pl-3 pr-9 py-4 rounded-lg"
                    style={{fontFamily: "'Inter', 'Noto Sans SC', sans-serif"}}>
                    {Object.entries(ThemeList).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-[40%] transform -translate-y-1/2 text-[#3c4043]"/>
            </div>
        </SidebarSection>
    )
}