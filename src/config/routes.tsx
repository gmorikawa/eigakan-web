import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";

import { AuthLayout } from "@/layout/auth";
import { AdminLayout } from "@/layout/admin";

import { LoginPage } from "@/features/auth/pages/login";

import { UserListPage } from "@/features/user/pages/user-list";
import { UserFormPage } from "@features/user/pages/user-form";

const rootRoute = createRootRoute();

const authLayout = createRoute({
    getParentRoute: () => rootRoute,
    path: "auth",
    component: AuthLayout,
});

const adminLayout = createRoute({
    getParentRoute: () => rootRoute,
    path: "admin",
    component: AdminLayout,
});

const loginRoute = createRoute({
    getParentRoute: () => authLayout,
    path: "login",
    component: LoginPage
});

const userListRoute = createRoute({
    getParentRoute: () => adminLayout,
    path: "user/list",
    component: UserListPage
});

const userFormRoute = createRoute({
    getParentRoute: () => adminLayout,
    path: "user/form",
    component: UserFormPage
});

const router = createRouter({
    routeTree: rootRoute.addChildren([
        authLayout.addChildren([
            loginRoute
        ]),
        adminLayout.addChildren([
            userListRoute,
            userFormRoute
        ]),
    ]),
});

export function RoutesProvider() {
    return (
        <RouterProvider router={router} />
    );
}

export default RoutesProvider;