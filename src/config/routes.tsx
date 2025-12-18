import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import AdminLayout from "@/layout/admin";
import LoginPage from "@/features/auth/pages/login-page";

import UserListPage from "@/features/user/pages/user-list-page";

const rootRoute = createRootRoute({
    component: AdminLayout,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage
});

const userListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/users",
    component: UserListPage
});

const router = createRouter({
    routeTree: rootRoute.addChildren([
        loginRoute,
        userListRoute
    ]),
});

export function RoutesProvider() {
    return (
        <RouterProvider router={router} />
    );
}

export default RoutesProvider;