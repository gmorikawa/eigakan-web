import Box, { type BoxProps } from "@mui/joy/Box";

export interface ContainerProps extends BoxProps {
    children?: React.ReactNode;
}

export function Container({ children, ...props }: ContainerProps) {
    return (
        <Box {...props}>
            {children}
        </Box>
    );
}

export default Container;
