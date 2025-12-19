import { IconButton as JoyIconButton } from "@mui/joy";

export type ButtonType = "button" | "submit" | "reset";

export type IconButtonVariant = "solid" | "outlined" | "soft" | "plain";
export type IconButtonPalette = "primary" | "neutral" | "danger" | "success" | "warning";

export interface IconButtonProps extends React.PropsWithChildren {
    type?: ButtonType;
    variant?: IconButtonVariant;
    palette?: IconButtonPalette;
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