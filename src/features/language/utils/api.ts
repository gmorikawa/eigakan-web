import type { ID } from "@/shared/types/id";
import Environment from "@config/environment";

import type { Session } from "@features/auth/types/session";
import type { NewLanguage, Language } from "@features/language/types/entity";

export async function getAllLanguages(session: Session): Promise<Language[]> {
    const response = await fetch(Environment.API_URL.concat("/languages"), {
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

    return response.json() as Promise<Language[]>;
};

export async function getLanguageById(session: Session, id: ID): Promise<Language> {
    const response = await fetch(Environment.API_URL.concat(`/languages/${id}`), {
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

    return response.json() as Promise<Language>;
};

export async function createLanguage(session: Session, language: NewLanguage): Promise<Language> {
    const response = await fetch(Environment.API_URL.concat("/languages"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(language),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<Language>;
};

export async function updateLanguage(session: Session, id: ID, language: Partial<Language>): Promise<Language> {
    const response = await fetch(Environment.API_URL.concat(`/languages/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(language),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<Language>;
};

export async function removeLanguage(session: Session, id: ID): Promise<boolean> {
    const response = await fetch(Environment.API_URL.concat(`/languages/${id}`), {
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