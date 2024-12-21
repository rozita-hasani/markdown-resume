import { Slider } from "@/components/ui/slider";

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (event: number) => void;
    currentValue: string
}

export const SliderComponent = ({label, value, min, max, step, onChange, currentValue}: SliderProps) => {
    const handleChange = (event: number[]) => {
        onChange(event[0]);
    };

    return (
        <div className='mb-2'>
            <label className="flex justify-between text-sm font-medium text-[#5f6368]">
                {label}
                <span>{currentValue}</span>
            </label>
            <Slider
                defaultValue={[value]}
                max={max}
                min={min}
                step={step}
                onValueChange={handleChange}
                className='py-2'
            />
        </div>
    );
}