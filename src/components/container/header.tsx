import Container, { type ContainerProps } from "./container";

export interface HeaderProps extends ContainerProps {
    children: React.ReactNode;
}

export function Header({ children, ...props }: HeaderProps) {
    return (
        <Container component="header" {...props}>
            {children}
        </Container>
    );
}

export default Header;