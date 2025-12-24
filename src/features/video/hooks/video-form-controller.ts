import { useEffect } from "react";

import { useNavigator } from "@hooks/navigator";
import { useForm, type FormController } from "@hooks/form";

import type { NewVideo, Video } from "@features/video/types/entity";
import { useVideoController } from "@features/video/hooks/video-controller";
import { videoValidatorSchema } from "@features/video/utils/validator";

import { useAlert } from "@components/feedback/alert";

export interface VideoFormController extends FormController<Video> {
    handleBack: () => void;
}

export interface VideoFormConfiguration {
    defaultValues: Partial<Video>;
}

export function useVideoFormController(config: VideoFormConfiguration): VideoFormController {
    const navigate = useNavigator();
    const alert = useAlert();
    const controller = useVideoController();
    const form = useForm({
        defaultValues: config.defaultValues,
        schema: videoValidatorSchema,
        onSubmit: () => {
            ((form.entity.id)
                ? controller.update(form.entity.id, form.entity as Video)
                : controller.create(form.entity as NewVideo)
            )
                .then(async (_: Video) => {
                    alert.showMessage(`Video ${form.entity.id ? "updated" : "created"} successfully`, "success");
                    handleBack();
                })
                .catch((_: Error) => {
                    alert.showMessage("Error creating video", "error");
                });
        }
    });

    const handleBack = () => {
        navigate.to("/admin/video/list");
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
        handleBack,
        ...form,
    };
}