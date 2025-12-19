import { useState } from "react";
import type { Session } from "../types/session";
import { UserSessionContext } from "../hooks/use-session";

export interface UserSessionProviderProps {
    children: React.ReactNode;
}

export function UserSessionProvider({ children }: UserSessionProviderProps) {
    const [session, setSession] = useState<Session>(null);

    return (
        <UserSessionContext.Provider value={{ session, setSession }}>
            {children}
        </UserSessionContext.Provider>
    )
};