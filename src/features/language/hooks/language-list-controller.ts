import { useEffect, useState } from "react";
import useNavigator from "@hooks/navigator";

import type { Language } from "@features/language/types/entity";
import { useLanguageController, type LanguageController } from "@features/language/hooks/language-controller";
import { useAlert } from "@components/feedback/alert";

export interface LanguageListController extends LanguageController {
    data: Language[];
    refresh(): Promise<void>;

    handleCreate(): void;
    handleUpdate(language: Language): void;
    handleRemove(language: Language): void;
}

export function useLanguageListController(): LanguageListController {
    const controller = useLanguageController();
    const navigate = useNavigator();
    const alert = useAlert();
    const [data, setData] = useState<Language[]>([]);

    const loadData = async () => {
        return controller.getAll()
            .then(async (languages: Language[]) => {
                setData(languages);
            })
            .catch((error: Error) => {
                alert.showMessage(`Error loading languages: ${error.message}`, "error");
            });
    };

    const refresh = async () => {
        await loadData();
    };

    const handleCreate = () => {
        navigate.to("/admin/language/form");
    };

    const handleUpdate = (language: Language) => {
        navigate.to(`/admin/language/form/${language.id}`);
    };

    const handleRemove = async (language: Language) => {
        controller.remove(language.id)
            .then(async (_: boolean) => {
                refresh();
            })
            .catch((error: Error) => {
                alert.showMessage(`Error removing language: ${error.message}`, "error");
            });
    };

    useEffect(() => {
        loadData();
    }, []);
    return { 
        data,
        refresh,
        handleRemove,
        handleCreate,
        handleUpdate,
        ...controller
    };
}