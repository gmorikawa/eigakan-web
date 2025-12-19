import { Outlet } from "@tanstack/react-router";
import { Divider } from "@mui/joy";

import { Menu } from "@layout/menu";
import { Container } from "@components/container/container";

export function AdminLayout() {
    return (
        <Container height="100vh" display="flex" flexDirection="row">
            <Container height="100%">
                <Menu />
            </Container>

            <Divider orientation="vertical" />

            <Container height="100%" flexGrow={1} padding={4}>
                <Outlet />
            </Container>
        </Container>
    );
}

export default AdminLayout;
