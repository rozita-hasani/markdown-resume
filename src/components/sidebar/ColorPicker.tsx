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
                <div className='flex justify-between items-center gap-2 bg-gray-100 p-[2px] rounded-md border '>
                    <div className="relative w-6 h-6 rounded-lg overflow-hidden">
                        <input
                            type="color"
                            value={value}
                            onChange={handleColorChange}
                            className="absolute top-0 left-0 w-full h-full border-none cursor-pointer p-0"
                            style={{transform: 'scale(1.4)'}}
                        />
                    </div>
                    {value}
                </div>
            </label>
        </div>
    )
}