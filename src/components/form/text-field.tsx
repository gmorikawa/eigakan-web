import { useMemo } from "react";
import { FormControl, FormLabel, Input } from "@mui/joy";

export interface TextFieldProps {
    label: string;
    property: string;
    value?: string;
    required?: boolean;
    fullWidth?: boolean;

    onChange?: (property: string, value: string) => void;
    onBlur?: (property: string, value: string) => void;
}

export function TextField({ label, property, value, required = false, fullWidth = false, onChange, onBlur }: TextFieldProps) {
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
                <Input id={property} type="text" name={property} value={value} onChange={handleChange} onBlur={handleBlur} />
            </FormControl>
        ),
        [value]
    );
}

export default TextField;