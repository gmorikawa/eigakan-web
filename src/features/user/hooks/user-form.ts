import { useState } from "react";

import type { NewUser, User } from "@features/user/types/entity";
import { useUserController } from "@features/user/hooks/user-controller";

import { useAlert } from "@components/feedback/alert";

export interface UserFormConfiguration {
    defaultValues?: Partial<User>;
    onSuccess?: (user: User) => void;
    onError?: (error: any) => void;
}

export function useUserForm(config?: UserFormConfiguration) {
    const controller = useUserController();
    const alert = useAlert();
    const [user, setUser] = useState<Partial<User>>(config?.defaultValues || {});
    const handleChange = (field: string, value: any) => {
        setUser((previvousUser) => ({
            ...previvousUser,
            [field]: value,
        }));
    };

    const handleBlur = (field: string, value: any) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        ((user.id)
            ? controller.update(user.id, user as User)
            : controller.create(user as NewUser)
        )
            .then(async (savedUser: User) => {
                config?.onSuccess?.(savedUser);
            })
            .catch((error) => {
                config?.onError?.(error);
                alert.showMessage("Error creating user", "error");
            });
    };

    const updateEntity = (entity: Partial<User>) => {
        setUser(entity);
    };

    return {
        user,
        updateEntity,
        handleChange,
        handleBlur,
        handleSubmit
    };
}