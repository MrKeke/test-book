import React, { ChangeEvent } from 'react';

export interface Option {
    value: string;
    label: string;
}
interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export const Selector: React.FC<SelectProps> = ({ options, value, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <select
            value={value}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
