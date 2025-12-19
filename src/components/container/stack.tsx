import { Stack as JoyStack, type StackProps as JoyStackProps } from "@mui/joy";

export interface StackProps extends JoyStackProps {
    direction?: "row" | "column";
    spacing?: number;
}

export function Stack({ direction = "column", spacing = 0, sx, children }: StackProps) {
    return (
        <JoyStack direction={direction} spacing={spacing} sx={sx}>
            {children}
        </JoyStack>
    );
}

export default Stack;