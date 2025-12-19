import { createContext, useContext } from "react";
import type { Session } from "@/features/auth/types/session";
import type { LoggedUser } from "@/features/user/types/logged-user";
import type { Token } from "@/features/auth/types/token";

export interface SessionController extends Session {
    update: (token: Token, loggedUser: LoggedUser | null) => void;
}

export const UserSessionContext = createContext<SessionController>({ token: "", loggedUser: null, update: () => {} });

export function useSession(): SessionController {
    return useContext(UserSessionContext);
}