import {ChangeEvent, useState} from "react";
import {SidebarSection} from "@/components/sidebar/SidebarSection";
import {ChevronDown} from "lucide-react";

interface ThemeSectionProps {
    onThemeChange: (theme: string) => void;
}

export function ThemeSection({onThemeChange}: ThemeSectionProps) {
    const [theme, setTheme] = useState<string>('tehran');

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        onThemeChange(selectedTheme);
    };

    return (
        <SidebarSection title="Theme">
            <div className='relative w-full'>
                <label className="block text-sm font-medium py-3 text-[#5f6368]">Select Theme</label>
                <select
                    value={theme}
                    onChange={handleThemeChange}
                    className="w-full appearance-none text-sm text-[#3c4043] bg-gray-100 hover:bg-gray-200 hover:text-[#63676e] pl-3 pr-9 py-4 rounded-lg"
                    style={{fontFamily: "'Inter', 'Noto Sans SC', sans-serif"}}>
                    <option value="Tehran">Tehran</option>
                    <option value="Isfahan">Isfahan</option>
                    <option value="Shiraz">Shiraz</option>
                    <option value="Mashhad">Mashhad</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3/4 transform -translate-y-1/2 text-[#3c4043]"/>
            </div>
        </SidebarSection>
    )
}