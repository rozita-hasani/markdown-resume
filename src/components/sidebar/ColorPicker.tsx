import {ChangeEvent} from "react";

interface ColorSectionProps {
    label: string;
    value: string;
    onChange: (color: string) => void;}

export default function ColorPicker({label, value, onChange}: ColorSectionProps) {
    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label className="flex justify-between text-sm font-medium py-3 text-[#5f6368]">
                {label}
                <span>{value}</span>
            </label>
            <input
                type="color"
                value={value}
                onChange={handleColorChange}
                className="w-8 h-8 rounded border border-gray-300 mb-2"
            />
        </div>
    )
}