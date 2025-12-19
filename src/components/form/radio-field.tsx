import { useMemo } from "react";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";

export type RadioOption = {
    label: string;
    value: string;
}

export interface RadioFieldProps {
    label: string;
    property: string;
    value?: string;
    required?: boolean;
    fullWidth?: boolean;

    options?: RadioOption[];

    onChange?: (property: string, value: string) => void;
    onBlur?: (property: string, value: string) => void;
}

export function RadioField({ label, property, value, required, fullWidth, options, onChange, onBlur }: RadioFieldProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(property, event.target.value);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(property, event.target.value);
    };

    return useMemo(
        () => (
            <FormControl required={required} style={{ width: fullWidth ? "100%" : "auto" }}>
                <FormLabel htmlFor={property}>{label}</FormLabel>

                <RadioGroup value={value} name={property} onChange={handleChange} onBlur={handleBlur} orientation="horizontal">
                    {options?.map((option) => (
                        <Radio key={option.value} value={option.value} label={option.label} size="sm" />
                    ))}
                </RadioGroup>
            </FormControl>
        ),
        [value]
    );
}

export default RadioField;