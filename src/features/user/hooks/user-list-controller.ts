import { useEffect, useState } from "react";
import useNavigator from "@hooks/navigator";

import type { User } from "@features/user/types/entity";
import { useUserController, type UserController } from "@features/user/hooks/user-controller";

export interface UserListController extends UserController {
    data: User[];
    refresh(): Promise<void>;

    handleCreate(): void;
    handleUpdate(user: User): void;
    handleRemove(user: User): void;
}

export function useUserListController(): UserListController {
    const controller = useUserController();
    const navigate = useNavigator();
    const [data, setData] = useState<User[]>([]);

    const loadData = async () => {
        return controller.getAll()
            .then(async (users: User[]) => {
                setData(users);
            })
            .catch((error) => {
                console.error("Error loading users:", error);
                throw error;
            });
    };

    const refresh = async () => {
        await loadData();
    };

    const handleCreate = () => {
        navigate.to("/admin/user/form");
    };

    const handleUpdate = (user: User) => {
        navigate.to(`/admin/user/form/${user.id}`);
    };

    const handleRemove = async (user: User) => {
        controller.remove(user.id)
            .then(async (_: boolean) => {
                refresh();
            })
            .catch((error) => {
                console.error("Error removing user:", error);
            });
    };

    useEffect(() => {
        loadData();
    }, []);
    return { 
        data,
        refresh,
        handleRemove,
        handleCreate,
        handleUpdate,
        ...controller
    };
}