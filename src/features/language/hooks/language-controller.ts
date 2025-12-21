import type { ID } from "@/shared/types/id";
import Environment from "@config/environment";

import { useSession } from "@features/auth/hooks/session";
import type { Session } from "@features/auth/types/session";
import type { NewLanguage, Language } from "@features/language/types/entity";

const getAllRequest = async (session: Session) => {
    const response = await fetch(Environment.API_URL.concat("/languages"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get languages");
    }

    return response.json() as Promise<Language[]>;
};

const getByIdRequest = async (session: Session, id: ID) => {
    const response = await fetch(Environment.API_URL.concat(`/languages/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get language");
    }

    return response.json() as Promise<Language>;
};

const createRequest = async (session: Session, language: NewLanguage) => {
    const response = await fetch(Environment.API_URL.concat("/languages"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(language),
    });

    if (!response.ok) {
        throw new Error("Failed to create language");
    }

    return response.json() as Promise<Language>;
};

const updateRequest = async (session: Session, id: ID, language: Partial<Language>) => {
    const response = await fetch(Environment.API_URL.concat(`/languages/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(language),
    });

    if (!response.ok) {
        throw new Error("Failed to update language");
    }

    return response.json() as Promise<Language>;
};

const removeRequest = async (session: Session, id: ID) => {
    const response = await fetch(Environment.API_URL.concat(`/languages/${id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to remove language");
    }

    return response.json() as Promise<boolean>;
};

export interface LanguageController {
    getAll(): Promise<Language[]>;
    getById(id: ID): Promise<Language>;
    create(language: NewLanguage): Promise<Language>;
    update(id: ID, language: Language): Promise<Language>;
    remove(id: ID): Promise<boolean>;
}

export function useLanguageController(): LanguageController {
    const session = useSession();

    const getAll = async (): Promise<Language[]> => getAllRequest(session);
    const getById = async (id: ID): Promise<Language> => getByIdRequest(session, id);
    const create = async (language: NewLanguage): Promise<Language> => createRequest(session, language);
    const update = async (id: ID, language: Language): Promise<Language> => updateRequest(session, id, language);
    const remove = async (id: ID): Promise<boolean> => removeRequest(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    }
}