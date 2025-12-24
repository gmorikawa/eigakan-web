import { useMemo } from "react";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

export interface DateFieldProps {
    label: string;
    property: string;
    value?: Date | null;
    required?: boolean;
    fullWidth?: boolean;
    error?: string;

    palette?: ThemePalette;

    onChange?: (property: string, value: Date | null) => void;
    onBlur?: (property: string, value: Date | null) => void;
}

/*
 * This component prevents direct input from user to avoid invalid date format.
 * Users must use the date picker to select a date.
 */
export function DateField({ label, property, value, required = false, fullWidth = false, error, palette = "primary", onChange, onBlur }: DateFieldProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(property, event.target.value ? new Date(event.target.value) : null);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(property, event.target.value ? new Date(event.target.value) : null);
    };

    return useMemo(
        () => (
            <FormControl required={required} style={{ width: fullWidth ? "100%" : "auto" }} color={palette}>
                <FormLabel color={palette}>{label}</FormLabel>

                <Input
                    type="date"
                    value={value ? value.toISOString().substring(0, 10) : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => e.preventDefault()}
                    onKeyUp={(e) => e.preventDefault()}
                    color={palette}
                    error={Boolean(error)}
                />

                <FormHelperText>
                    {error}
                </FormHelperText>
            </FormControl>
        ),
        [value]
    );
}

export default DateField;