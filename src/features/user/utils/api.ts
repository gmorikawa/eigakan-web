import type { ID } from "@shared/types/id";

import Environment from "@config/environment";

import type { Session } from "@features/auth/types/session";
import type { NewUser, User } from "@features/user/types/entity";

export async function getAllUsers(session: Session): Promise<User[]> {
    const response = await fetch(Environment.API_URL.concat("/users"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<User[]>;
};

export async function getUserById(session: Session, id: ID): Promise<User> {
    const response = await fetch(Environment.API_URL.concat(`/users/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<User>;
};

export async function createUser(session: Session, user: NewUser): Promise<User> {
    const response = await fetch(Environment.API_URL.concat("/users"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<User>;
};

export async function updateUser(session: Session, id: ID, user: Partial<User>): Promise<User> {
    const response = await fetch(Environment.API_URL.concat(`/users/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<User>;
};

export async function removeUser(session: Session, id: ID): Promise<boolean> {
    const response = await fetch(Environment.API_URL.concat(`/users/${id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<boolean>;
};