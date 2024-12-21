import {ChangeEvent} from "react";

interface ColorSectionProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
}

export default function ColorPicker({label, value, onChange}: ColorSectionProps) {
    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label className="flex justify-between text-sm font-medium  text-[#5f6368]">
                <div className='flex w-full  items-center gap-2 hover:bg-gray-100 cursor-pointer rounded-md p-2 m-0 '>
                    <div className="relative w-6 h-6 rounded-lg overflow-hidden">
                        <input
                            type="color"
                            value={value}
                            onChange={handleColorChange}
                            className="invisible absolute top-0 left-0 w-full h-full outline-none rounded-full border-none cursor-pointer p-0"
                            style={{transform: 'scale(1.4)'}}
                        />
                        <span style={{background: value}} className="mt-[2px] inline-block w-5 h-5 rounded-full ring-1 ring-border"></span>
                    </div>
                    <div className="w-full justify-between flex">
                        <span className="font-semibold">{label}</span>
                        <span className="text-gray-400">{value}</span>
                    </div>
                </div>
            </label>
        </div>
    )
}