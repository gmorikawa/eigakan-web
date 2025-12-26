import { useEffect } from "react";

import { useNavigator } from "@hooks/navigator";
import { useForm, type FormController } from "@hooks/form";

import type { NewFileType, FileType } from "@features/file-type/types/entity";
import { useFileTypeController } from "@features/file-type/hooks/file-type-controller";
import { fileTypeValidatorSchema } from "@features/file-type/utils/validator";

import { useAlert } from "@components/feedback/alert";

export interface FileTypeFormController extends FormController<FileType> {
    handleBack: () => void;
}

export interface FileTypeFormConfiguration {
    defaultValues: Partial<FileType>;
}

export function useFileTypeFormController(config: FileTypeFormConfiguration): FileTypeFormController {
    const controller = useFileTypeController();
    const alert = useAlert();
    const navigate = useNavigator();

    const form = useForm<FileType>({
        defaultValues: config.defaultValues,
        schema: fileTypeValidatorSchema,
        onSubmit: () => {
            ((form.entity.id)
                ? controller.update(form.entity.id, form.entity as FileType)
                : controller.create(form.entity as NewFileType)
            )
                .then(async (_: FileType) => {
                    handleBack();
                })
                .catch((error: Error) => {
                    alert.showMessage(`Error creating file type: ${error.message}`, "error");
                });
        }
    });


    const handleBack = () => {
        navigate.to("/admin/file-type/list");
    };

    const loadEntity = async (id: string | null) => {
        if (id) {
            controller.getById(id)
                .then((fetchedEntity) => {
                    form.updateEntity(fetchedEntity);
                })
                .catch((error: Error) => {
                    console.error(`Error fetching file type: ${error.message}`, error);
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
