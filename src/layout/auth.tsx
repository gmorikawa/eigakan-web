import { Container } from "@/components/container/container";
import { Outlet } from "react-router";

export function AuthLayout() {
    return (
        <Container width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Outlet />
        </Container>
    );
}