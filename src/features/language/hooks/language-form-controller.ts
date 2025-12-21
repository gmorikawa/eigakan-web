import { useEffect, useState } from "react";

import type { NewLanguage, Language } from "@features/language/types/entity";
import { useLanguageController } from "@features/language/hooks/language-controller";

import { useAlert } from "@components/feedback/alert";

export interface LanguageFormController {
    entity: Partial<Language>;
    handleChange: (field: string, value: any) => void;
    handleBlur: (field: string, value: any) => void;
    handleSubmit: () => void;
}

export interface LanguageFormConfiguration {
    defaultValues?: Partial<Language>;
    onSuccess?: (language: Language) => void;
    onError?: (error: any) => void;
}

export function useLanguageFormController(config?: LanguageFormConfiguration): LanguageFormController {
    const controller = useLanguageController();
    const alert = useAlert();
    const [entity, setEntity] = useState<Partial<Language>>(config?.defaultValues || {});
    const handleChange = (field: string, value: any) => {
        setEntity((previousEntity) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleBlur = (field: string, value: any) => {
        setEntity((previousEntity) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        ((entity.id)
            ? controller.update(entity.id, entity as Language)
            : controller.create(entity as NewLanguage)
        )
            .then(async (savedLanguage: Language) => {
                config?.onSuccess?.(savedLanguage);
            })
            .catch((error) => {
                config?.onError?.(error);
                alert.showMessage("Error creating language", "error");
            });
    };

    useEffect(() => {
        if (config?.defaultValues?.id) {
            controller.getById(config.defaultValues.id)
                .then((fetchedEntity) => {
                    setEntity(fetchedEntity);
                })
                .catch((error) => {
                    console.error("Error fetching language:", error);
                });
        }
    }, []);
    return {
        entity,
        handleChange,
        handleBlur,
        handleSubmit
    };
}