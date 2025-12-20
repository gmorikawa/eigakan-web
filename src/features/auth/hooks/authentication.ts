import type { Authentication } from "@features/auth/types/authentication";
import { useSession, type SessionController } from "@features/auth/hooks/session";
import Environment from "@config/environment";

export interface AuthenticationController {
    session: SessionController;

    login: (username: string, password: string) => Promise<Authentication>;
    logout: () => void;
}

const loginRequest = (username: string, password: string) => {
    return fetch(Environment.API_URL.concat("/auth/login"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
}

export function useAuthentication(): AuthenticationController {
    const session = useSession();

    const login = async (username: string, password: string) => {
        return loginRequest(username, password)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }

                const authentication: Authentication = await response.json();
                session.update(authentication.token, authentication.loggedUser);

                return authentication;
            });
    };

    const logout = () => {
        session.reset();
    };

    return { session, login, logout };
}