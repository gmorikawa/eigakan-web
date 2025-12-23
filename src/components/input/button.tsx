import { Button as JoyButton } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

export type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "solid" | "outlined" | "soft" | "plain";

export interface ButtonProps extends React.PropsWithChildren {
    type?: ButtonType;
    fullWidth?: boolean;
    variant?: ButtonVariant;
    palette?: ThemePalette;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
    type = "button",
    fullWidth = false,
    variant = "solid",
    palette = "primary",
    onClick,
    children,
}: ButtonProps) {
    return (
        <JoyButton
            type={type}
            fullWidth={fullWidth}
            variant={variant}
            color={palette}
            onClick={onClick}
        >
            {children}
        </JoyButton>
    );
}

export default Button;