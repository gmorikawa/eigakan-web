import { useAlert } from "@components/feedback/alert";
import { useSession } from "@features/auth/hooks/session";
import type { Session } from "@features/auth/types/session";
import type { NewUser, User } from "@features/user/types/entity";
import { useState } from "react";

const createUserRequest = async (session: Session, user: NewUser) => {
    return fetch("http://localhost:3020/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(user),
    });
};

export interface UserFormConfiguration {
    defaultValues?: Partial<User>;
    onSuccess?: (user: User) => void;
    onError?: (error: any) => void;
}

export function useUserForm(config?: UserFormConfiguration) {
    const session = useSession();
    const alert = useAlert();
    const [user, setUser] = useState<Partial<User>>(config?.defaultValues || {});
    const handleChange = (field: string, value: any) => {
        setUser((prevUser) => ({
            ...prevUser,
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
        createUserRequest(session, user as NewUser)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to create user");
                }

                const createdUser: User = await response.json();
                config?.onSuccess?.(createdUser);
            })
            .catch((error) => {
                config?.onError?.(error);
                alert.showMessage("Error creating user", "error");
            });
    };

    return {
        user,
        handleChange,
        handleBlur,
        handleSubmit
    };
}