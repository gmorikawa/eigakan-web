import { useMemo } from "react";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

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
    palette?: ThemePalette;

    onChange?: (property: string, value: string) => void;
    onBlur?: (property: string, value: string) => void;
}

export function RadioField({ label, property, value, required, fullWidth, options, palette = "primary", onChange, onBlur }: RadioFieldProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(property, event.target.value);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(property, event.target.value);
    };

    return useMemo(
        () => (
            <FormControl required={required} style={{ width: fullWidth ? "100%" : "auto" }} color={palette}>
                <FormLabel htmlFor={property} color={palette}>{label}</FormLabel>

                <RadioGroup value={value} name={property} onChange={handleChange} onBlur={handleBlur} orientation="horizontal" color={palette}>
                    {options?.map((option) => (
                        <Radio key={option.value} value={option.value} label={option.label} size="sm" color={palette} />
                    ))}
                </RadioGroup>
            </FormControl>
        ),
        [value]
    );
}

export default RadioField;