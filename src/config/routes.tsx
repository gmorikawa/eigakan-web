import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import AdminLayout from '../layout/admin';
import LoginPage from '../features/auth/pages/login-page';

const rootRoute = createRootRoute({
    component: AdminLayout,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage
});

const router = createRouter({
    routeTree: rootRoute.addChildren([loginRoute])
});

export function RoutesProvider() {
    return (
        <RouterProvider router={router} />
    );
}

export default RoutesProvider;