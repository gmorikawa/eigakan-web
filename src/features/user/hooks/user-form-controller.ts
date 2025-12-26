import { useEffect } from "react";

import { useForm, type FormController } from "@hooks/form";
import { useNavigator } from "@hooks/navigator";

import type { NewUser, User } from "@features/user/types/entity";
import { useUserController } from "@features/user/hooks/user-controller";
import { userValidatorSchema } from "@features/user/utils/validator";

import { useAlert } from "@components/feedback/alert";

export interface UserFormController extends FormController<User> {
    handleBack: () => void;
}

export interface UserFormConfiguration {
    defaultValues: Partial<User>;
}

export function useUserFormController(config: UserFormConfiguration): UserFormController {
    const controller = useUserController();
    const alert = useAlert();
    const navigate = useNavigator();
    const form = useForm<User>({
        defaultValues: config.defaultValues,
        schema: userValidatorSchema,
        onSubmit: () => {
            ((form.entity.id)
                ? controller.update(form.entity.id, form.entity as User)
                : controller.create(form.entity as NewUser)
            )
                .then(async (_: User) => {
                    handleBack();
                })
                .catch((error: Error) => {
                    alert.showMessage(`Error creating user: ${error.message}`, "error");
                });
        }
    });

    const handleBack = () => {
        navigate.to("/admin/user/list");
    };

    const loadEntity = async (id: string | null) => {
        if (id) {
            controller.getById(id)
                .then((fetchedEntity) => {
                    form.updateEntity(fetchedEntity);
                })
                .catch((error: Error) => {
                    console.error(`Error fetching user: ${error.message}`, error);
                });
        }
    };

    useEffect(() => {
        loadEntity(form.entity.id || null);
    }, [form.entity.id]);
    return {
        ...form,
        handleBack
    };
}