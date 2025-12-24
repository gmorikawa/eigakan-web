import { useMemo } from "react";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

export interface TextFieldProps {
    label: string;
    property: string;
    value?: string;
    required?: boolean;
    fullWidth?: boolean;

    palette?: ThemePalette;
    error?: string;

    onChange?: (property: string, value: string) => void;
    onBlur?: (property: string, value: string) => void;
}

export function TextField({ label, property, value, required = false, fullWidth = false, palette = "primary", error, onChange, onBlur }: TextFieldProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(property, event.target.value);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(property, event.target.value);
    };

    return useMemo(
        () => (
            <FormControl error={Boolean(error)} required={required} style={{ width: fullWidth ? "100%" : "auto" }} color={palette}>
                <FormLabel>{label}</FormLabel>
                <Input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FormHelperText>
                    {error}
                </FormHelperText>
            </FormControl>
        ),
        [value, error]
    );
}

export default TextField;