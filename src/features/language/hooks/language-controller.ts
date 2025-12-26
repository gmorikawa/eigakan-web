import type { ID } from "@/shared/types/id";

import { useSession } from "@features/auth/hooks/session";
import type { NewLanguage, Language } from "@features/language/types/entity";
import { createLanguage, getAllLanguages, getLanguageById, removeLanguage, updateLanguage } from "../utils/api";

export interface LanguageController {
    getAll(): Promise<Language[]>;
    getById(id: ID): Promise<Language>;
    create(language: NewLanguage): Promise<Language>;
    update(id: ID, language: Language): Promise<Language>;
    remove(id: ID): Promise<boolean>;
}

export function useLanguageController(): LanguageController {
    const session = useSession();

    const getAll = async (): Promise<Language[]> => getAllLanguages(session);
    const getById = async (id: ID): Promise<Language> => getLanguageById(session, id);
    const create = async (language: NewLanguage): Promise<Language> => createLanguage(session, language);
    const update = async (id: ID, language: Language): Promise<Language> => updateLanguage(session, id, language);
    const remove = async (id: ID): Promise<boolean> => removeLanguage(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    }
}