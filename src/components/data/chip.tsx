import { Chip as JoyChip, type ChipProps as JoyChipProps } from "@mui/joy";

export interface ChipProps extends JoyChipProps  {
    label: string;
}

export function Chip({ label, ...props }: ChipProps) {
    return (
        <JoyChip {...props}>
            {label}
        </JoyChip>
    );
}

export default Chip;
