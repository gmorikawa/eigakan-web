import { Chip as JoyChip, type ChipProps as JoyChipProps } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

export interface ChipProps extends JoyChipProps {
    label: string;
    palette?: ThemePalette;
}

export function Chip({ label, palette = "primary", ...props }: ChipProps) {
    return (
        <JoyChip color={palette} {...props}>
            {label}
        </JoyChip>
    );
}

export default Chip;
