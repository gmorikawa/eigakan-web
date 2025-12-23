import { FormControl, FormLabel, Input } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";
import { useMemo } from "react";

export interface PasswordFieldProps {
    label: string;
    property: string;
    value?: string;
    required?: boolean;
    fullWidth?: boolean;

    palette?: ThemePalette;

    onChange?: (property: string, value: string) => void;
    onBlur?: (property: string, value: string) => void;
}

export function PasswordField({ label, property, value, required = false, fullWidth = false, palette = "primary", onChange, onBlur }: PasswordFieldProps) {
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
                <Input id={property} type="password" name={property} value={value} onChange={handleChange} onBlur={handleBlur} color={palette} />
            </FormControl>
        ),
        [value]
    );
}

export default PasswordField;