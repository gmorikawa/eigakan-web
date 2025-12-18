import Container, { type ContainerProps } from "./container";

export interface FooterProps extends ContainerProps {
    children: React.ReactNode;
}

export function Footer({ children, ...props }: FooterProps) {
    return (
        <Container component="footer" {...props}>
            {children}
        </Container>
    );
}

export default Footer;