import { useEffect } from "react";

import { useNavigator } from "@hooks/navigator";
import { useForm, type FormController } from "@hooks/form";

import type { NewLanguage, Language } from "@features/language/types/entity";
import { useLanguageController } from "@features/language/hooks/language-controller";
import { languageValidatorSchema } from "@features/language/utils/validator";

import { useAlert } from "@components/feedback/alert";

export interface LanguageFormController extends FormController<Language> {
    handleBack: () => void;
}

export interface LanguageFormConfiguration {
    defaultValues: Partial<Language>;
}

export function useLanguageFormController(config: LanguageFormConfiguration): LanguageFormController {
    const controller = useLanguageController();
    const alert = useAlert();
    const navigate = useNavigator();

    const form = useForm<Language>({
        defaultValues: config.defaultValues,
        schema: languageValidatorSchema,
        onSubmit: () => {
            ((form.entity.id)
                ? controller.update(form.entity.id, form.entity as Language)
                : controller.create(form.entity as NewLanguage)
            )
                .then(async (_: Language) => {
                    handleBack();
                })
                .catch((_: Error) => {
                    alert.showMessage("Error creating language", "error");
                });
        }
    });


    const handleBack = () => {
        navigate.to("/admin/language/list");
    };

    const loadEntity = async (id: string | null) => {
        if (id) {
            controller.getById(id)
                .then((fetchedEntity) => {
                    form.updateEntity(fetchedEntity);
                })
                .catch((error: Error) => {
                    console.error("Error fetching video:", error);
                });
        }
    };

    useEffect(() => {
        loadEntity(form.entity.id || null);
    }, [form.entity.id]);
    return {
        ...form,
        handleBack,
    };
}