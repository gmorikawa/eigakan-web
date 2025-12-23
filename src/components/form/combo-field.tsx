import { useMemo } from "react";
import { FormControl, FormLabel, Autocomplete } from "@mui/joy";

export type ComboOption = {
    label: string;
    value: string;
}

export interface ComboFieldProps<T extends Object> {
    label: string;
    property: string;
    value?: T;
    placeholder?: string;
    required?: boolean;
    fullWidth?: boolean;

    options: T[];
    optionKey: keyof T;
    optionLabel: keyof T;

    onChange?: (property: string, value: T | null) => void;
    // onBlur?: (property: string, value: T | null) => void;
}

export function ComboField<T extends Object>({ label, property, value, placeholder, required, fullWidth, options, optionKey, optionLabel, onChange }: ComboFieldProps<T>) {
    const handleChange = (_: React.SyntheticEvent, value: T | null) => {
        onChange?.(property, value);
    };

    // const handleBlur = (_: any) => {
    //     // onBlur?.(property, value);
    // };

    const getKey = (option: T) => String(option[optionKey]);
    const getLabel = (option: T) => String(option[optionLabel]);
    const isEqual = (option: T, value: T) => getKey(option) === getKey(value);

    return useMemo(
        () => (
            <FormControl required={required} style={{ width: fullWidth ? "100%" : "auto" }}>
                <FormLabel htmlFor={property}>{label}</FormLabel>

                <Autocomplete
                    value={value}
                    placeholder={placeholder}
                    options={options || []}
                    getOptionLabel={getLabel}
                    getOptionKey={getKey}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    isOptionEqualToValue={isEqual}
                    sx={{ width: "100%" }}
                />
            </FormControl>
        ),
        [value, options]
    );
}

export default ComboField;