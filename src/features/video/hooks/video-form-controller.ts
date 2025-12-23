import { useEffect, useState } from "react";

import type { NewVideo, Video } from "@features/video/types/entity";
import { useVideoController } from "@features/video/hooks/video-controller";

import { useAlert } from "@components/feedback/alert";

export interface VideoFormController {
    entity: Partial<Video>;
    handleChange: (field: string, value: any) => void;
    handleBlur: (field: string, value: any) => void;
    handleSubmit: () => void;
}

export interface VideoFormConfiguration {
    defaultValues?: Partial<Video>;
    onSuccess?: (video: Video) => void;
    onError?: (error: any) => void;
}

export function useVideoFormController(config?: VideoFormConfiguration): VideoFormController {
    const controller = useVideoController();
    const alert = useAlert();
    const [entity, setEntity] = useState<Partial<Video>>(config?.defaultValues || {});
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
            ? controller.update(entity.id, entity as Video)
            : controller.create(entity as NewVideo)
        )
            .then(async (savedVideo: Video) => {
                config?.onSuccess?.(savedVideo);
            })
            .catch((error) => {
                config?.onError?.(error);
                alert.showMessage("Error creating video", "error");
            });
    };

    useEffect(() => {
        if (config?.defaultValues?.id) {
            controller.getById(config.defaultValues.id)
                .then((fetchedEntity) => {
                    setEntity(fetchedEntity);
                })
                .catch((error) => {
                    console.error("Error fetching video:", error);
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