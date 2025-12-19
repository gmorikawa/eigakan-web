import { useEffect, useState } from "react";

import type { Session } from "@features/auth/types/session";
import type { Token } from "@features/auth/types/token";
import type { LoggedUser } from "@features/user/types/logged-user";
import { UserSessionContext } from "@features/auth/hooks/session";

export interface UserSessionProviderProps {
    children: React.ReactNode;
}

export function UserSessionProvider({ children }: UserSessionProviderProps) {
    const [session, setSession] = useState<Session>({ token: "", loggedUser: null });

    const loadFromLocalStorage = () => {
        const token = window.localStorage.getItem("token") || "";
        const loggedUserString = window.localStorage.getItem("logged_user") || "";
        const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

        setSession({ token, loggedUser });
    };

    const update = (token: Token, loggedUser: LoggedUser) => {
        window.localStorage.setItem("token", token ?? "");
        window.localStorage.setItem("logged_user", JSON.stringify(loggedUser ?? {}));
        setSession({ token, loggedUser });
    };

    const reset = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("logged_user");
        setSession({ token: "", loggedUser: null });
    };

    useEffect(() => {
        loadFromLocalStorage();
    }, []);
    return (
        <UserSessionContext.Provider value={{ ...session, update, reset }}>
            {children}
        </UserSessionContext.Provider>
    )
}