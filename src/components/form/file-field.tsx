import { useMemo, useRef, useState } from "react";
import { Button, FormControl, FormLabel, Stack, Typography } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

export interface FileFieldProps {
    label: string;
    property: string;
    // value?: File | FileList | null;
    required?: boolean;
    fullWidth?: boolean;
    multiple?: boolean;
    accept?: string;
    buttonText?: string;
    variant?: "solid" | "soft" | "outlined" | "plain";

    palette?: ThemePalette;

    onChange?: (property: string, value: File | FileList | null) => void;
}

export function FileField({ 
    label, 
    property,
    required = false, 
    fullWidth = false, 
    multiple = false,
    accept,
    buttonText = "Choose File",
    variant = "outlined",
    palette = "primary", 
    onChange 
}: FileFieldProps) {
    const [filename, setFilename] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            if (multiple) {
                setFilename(`${files.length} file${files.length > 1 ? 's' : ''} selected`);
                onChange?.(property, files);
            } else {
                setFilename(files[0].name);
                onChange?.(property, files[0]);
            }
        } else {
            setFilename("");
            onChange?.(property, null);
        }
    };

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    return useMemo(
        () => (
            <FormControl required={required} style={{ width: fullWidth ? "100%" : "auto" }}>
                <FormLabel>{label}</FormLabel>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button 
                        color={palette} 
                        variant={variant}
                        onClick={handleButtonClick}
                    >
                        {buttonText}
                    </Button>
                    <Typography level="body-sm" color="neutral">
                        {filename || "No file chosen"}
                    </Typography>
                </Stack>
                <input
                    ref={inputRef}
                    type="file"
                    multiple={multiple}
                    accept={accept}
                    onChange={handleChange}
                    style={{
                        display: 'none'
                    }}
                />
            </FormControl>
        ),
        [filename, label, fullWidth, buttonText, multiple, accept]
    );
}

export default FileField;