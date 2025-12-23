import type { ID } from "@shared/types/id";

import Environment from "@config/environment";

import { useSession } from "@features/auth/hooks/session";
import type { Session } from "@features/auth/types/session";
import type { NewUser, User } from "@features/user/types/entity";

const getAllRequest = async (session: Session) => {
    const response = await fetch(Environment.API_URL.concat("/users"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get users");
    }

    return response.json() as Promise<User[]>;
};

const getByIdRequest = async (session: Session, id: ID) => {
    const response = await fetch(Environment.API_URL.concat(`/users/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get user");
    }

    return response.json() as Promise<User>;
};

const createRequest = async (session: Session, user: NewUser) => {
    const response = await fetch(Environment.API_URL.concat("/users"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    return response.json() as Promise<User>;
};

const updateRequest = async (session: Session, id: ID, user: Partial<User>) => {
    const response = await fetch(Environment.API_URL.concat(`/users/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }

    return response.json() as Promise<User>;
};

const removeRequest = async (session: Session, id: ID) => {
    const response = await fetch(Environment.API_URL.concat(`/users/${id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to remove user");
    }

    return response.json() as Promise<boolean>;
};

export interface UserController {
    getAll(): Promise<User[]>;
    getById(id: ID): Promise<User>;
    create(user: NewUser): Promise<User>;
    update(id: ID, user: User): Promise<User>;
    remove(id: ID): Promise<boolean>;
}

export function useUserController(): UserController {
    const session = useSession();

    const getAll = (): Promise<User[]> => getAllRequest(session);
    const getById = (id: ID): Promise<User> => getByIdRequest(session, id);
    const create = (user: NewUser): Promise<User> => createRequest(session, user);
    const update = (id: ID, user: User): Promise<User> => updateRequest(session, id, user);
    const remove = (id: ID): Promise<boolean> => removeRequest(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    }
}