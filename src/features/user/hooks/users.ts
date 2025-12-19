import { useEffect, useState } from "react";

import { useSession } from "@features/auth/hooks/session";
import type { Session } from "@features/auth/types/session";
import type { User } from "@features/user/types/entity";

const getUsersRequest = async (session: Session) => {
    return fetch("http://localhost:3020/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });
};

export function useUsers() {
    const [data, setData] = useState<User[]>([]);
    const session = useSession();

    const loadData = async () => {
        return getUsersRequest(session)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const users = await response.json();
                setData(users);
                return users;
            })
            .catch((error) => {
                console.error("Error loading users:", error);
                throw error;
            });
    };

    useEffect(() => {
        loadData();
    }, []);
    return { data, loadData };
}