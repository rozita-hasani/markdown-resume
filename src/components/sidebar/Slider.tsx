import {ChangeEvent} from "react";

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    currentValue: string
}

export const Slider = ({label, value, min, max, step, onChange, currentValue}: SliderProps) => (
    <div>
        <label className="flex justify-between text-sm font-medium py-3 text-[#5f6368]">
            {label}
            <span>{currentValue}</span>
        </label>
        <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} className="w-full accent-[#1a73e8] transition-all"/>
    </div>
);