import { useEffect, useState } from "react";
import type { User } from "@features/user/types/entity";
import type { Session } from "@features/auth/types/session";
import { useSession } from "@features/auth/hooks/session";
import Environment from "@config/environment";

const getUserByIdRequest = async (session: Session, id: string) => {
    return fetch(Environment.API_URL.concat(`/users/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });
}

export function useUser(id: string) {
    const session = useSession();
    const [entity, setEntity] = useState<User | null>(null);

    const loadEntity = async () => {
        getUserByIdRequest(session, id)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                return response.json();
            })
            .then((data: User) => setEntity(data))
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    };

    useEffect(() => {
        if (id) {
            loadEntity();
        }
    }, [id]);
    return { entity };
}