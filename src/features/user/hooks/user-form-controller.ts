import { useEffect, useState } from "react";

import { useNavigator } from "@hooks/navigator";

import type { NewUser, User } from "@features/user/types/entity";
import { useUserController } from "@features/user/hooks/user-controller";

import { useAlert } from "@components/feedback/alert";

export interface UserFormController {
    entity: Partial<User>;
    handleChange: (field: string, value: any) => void;
    handleBlur: (field: string, value: any) => void;
    handleBack: () => void;
    handleSubmit: () => void;
}

export interface UserFormConfiguration {
    defaultValues?: Partial<User>;
}

export function useUserFormController(config?: UserFormConfiguration): UserFormController {
    const controller = useUserController();
    const alert = useAlert();
    const navigate = useNavigator();
    const [entity, setEntity] = useState<Partial<User>>(config?.defaultValues || {});
    const handleChange = (field: string, value: any) => {
        setEntity((previousEntity) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleBlur = (field: string, value: any) => {
        setEntity((previousEntity) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        ((entity.id)
            ? controller.update(entity.id, entity as User)
            : controller.create(entity as NewUser)
        )
            .then(async (_: User) => {
                handleBack();
            })
            .catch((_: Error) => {
                alert.showMessage("Error creating user", "error");
            });
    };

    const handleBack = () => {
        navigate.to("/admin/user/list");
    };

    useEffect(() => {
        if (config?.defaultValues?.id) {
            controller.getById(config.defaultValues.id)
                .then((user: User | null) => {
                    setEntity(user || {});
                })
                .catch((_: Error) => {
                    alert.showMessage("Error loading user", "error");
                });
        }
    }, [])
    return {
        entity,
        handleChange,
        handleBlur,
        handleSubmit,
        handleBack
    };
}