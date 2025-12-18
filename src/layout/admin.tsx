import { Outlet } from "@tanstack/react-router";
import { Container } from "../components/container/container";
import { Menu } from "./menu";
import { Divider } from "@mui/joy";

export function AdminLayout() {
    return (
        <Container height="100vh" display="flex" flexDirection="row">
            <Container height="100%">
                <Menu />
            </Container>

            <Divider orientation="vertical" />

            <Container height="100%" padding={4}>
                <Outlet />
            </Container>
        </Container>
    );
}

export default AdminLayout;
