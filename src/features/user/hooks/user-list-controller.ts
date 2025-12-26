import { useEffect, useState } from "react";
import useNavigator from "@hooks/navigator";

import { useAlert } from "@components/feedback/alert";

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
    const alert = useAlert();
    const [data, setData] = useState<User[]>([]);

    const loadData = async () => {
        return controller.getAll()
            .then(async (users: User[]) => {
                setData(users);
            })
            .catch((error) => {
                alert.showMessage(`Error loading users: ${error.message}`, "error");
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
            .catch((error: Error) => {
                alert.showMessage(`Error removing user: ${error.message}`, "error");
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