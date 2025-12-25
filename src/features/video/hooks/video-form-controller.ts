import { useEffect, useState } from "react";

import type { ID } from "@shared/types/id";

import { useNavigator } from "@hooks/navigator";
import { useForm, type FormController } from "@hooks/form";

import type { BinaryFile } from "@features/file/types/binary";
import type { NewVideo, Video } from "@features/video/types/entity";
import { useVideoController } from "@features/video/hooks/video-controller";
import { videoValidatorSchema } from "@features/video/utils/validator";

import { useAlert } from "@components/feedback/alert";

export interface VideoFormController extends FormController<Video> {
    handleBack: () => void;
    handleFileChange: (property: string, newBinary: BinaryFile | null) => void;
}

export interface VideoFormConfiguration {
    defaultValues: Partial<Video>;
}

export function useVideoFormController(config: VideoFormConfiguration): VideoFormController {
    const navigate = useNavigator();
    const alert = useAlert();
    const controller = useVideoController();
    const [binary, setBinary] = useState<BinaryFile | null>(null);
    const form = useForm({
        defaultValues: config.defaultValues,
        schema: videoValidatorSchema,
        onSubmit: () => {
            ((form.entity.id)
                ? controller.update(form.entity.id, form.entity as Video)
                : controller.create(form.entity as NewVideo)
            )
                .then((savedVideo: Video) => savedVideo.id)
                .then((id: ID) => {
                    if (binary && id) {
                        return controller.upload(id, binary);
                    }
                })
                .then(() => {
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

    const handleFileChange = (_: string, newBinary: BinaryFile | null) => {
        setBinary(newBinary);
    };

    useEffect(() => {
        loadEntity(form.entity.id || null);
    }, [form.entity.id]);
    return {
        handleBack,
        handleFileChange,
        ...form,
    };
}