import { BrowserRouter, Routes, Route } from "react-router";

import { AuthLayout } from "@/layout/auth";
import { AdminLayout } from "@/layout/admin";

import { LoginPage } from "@/features/auth/pages/login";

import { UserListPage } from "@/features/user/pages/user-list";
import { UserCreateFormPage } from "@features/user/pages/user-create-form";
import { UserUpdateFormPage } from "@features/user/pages/user-update-form";

import { LanguageListPage } from "@features/language/pages/language-list";
import { LanguageCreateFormPage } from "@features/language/pages/language-create-form";
import { LanguageUpdateFormPage } from "@features/language/pages/language-update-form";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                </Route>

                <Route path="admin" element={<AdminLayout />}>
                    <Route path="user">
                        <Route path="list" element={<UserListPage />} />
                        <Route path="form">
                            <Route index element={<UserCreateFormPage />} />
                            <Route path=":id" element={<UserUpdateFormPage />} />
                        </Route>
                    </Route>

                    <Route path="language">
                        <Route path="list" element={<LanguageListPage />} />
                        <Route path="form">
                            <Route index element={<LanguageCreateFormPage />} />
                            <Route path=":id" element={<LanguageUpdateFormPage />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;