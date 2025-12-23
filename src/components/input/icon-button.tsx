import { IconButton as JoyIconButton } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

export type ButtonType = "button" | "submit" | "reset";
export type IconButtonVariant = "solid" | "outlined" | "soft" | "plain";

export interface IconButtonProps extends React.PropsWithChildren {
    type?: ButtonType;
    variant?: IconButtonVariant;
    palette?: ThemePalette;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function IconButton({
    type = "button",
    variant = "plain",
    palette = "primary",
    onClick,
    children,
}: IconButtonProps) {
    return (
        <JoyIconButton
            type={type}
            variant={variant}
            color={palette}
            onClick={onClick}
        >
            {children}
        </JoyIconButton>
    );
}

export default IconButton;