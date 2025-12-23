import { useEffect, useState } from "react";

import { useNavigator } from "@hooks/navigator";

import type { NewVideo, Video } from "@features/video/types/entity";
import { useVideoController } from "@features/video/hooks/video-controller";

import { useAlert } from "@components/feedback/alert";

export interface VideoFormController {
    entity: Partial<Video>;
    handleChange: (field: string, value: any) => void;
    handleBlur: (field: string, value: any) => void;
    handleSubmit: () => void;
    handleBack: () => void;
}

export interface VideoFormConfiguration {
    defaultValues?: Partial<Video>;
}

export function useVideoFormController(config?: VideoFormConfiguration): VideoFormController {
    const navigate = useNavigator();
    const alert = useAlert();
    const controller = useVideoController();

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
                setEntity(savedVideo);
                alert.showMessage(`Video ${entity.id ? "updated" : "created"} successfully`, "success");
            })
            .catch((_: Error) => {
                alert.showMessage("Error creating video", "error");
            });
    };

    const handleBack = () => {
        navigate.to("/admin/video/list");
    };

    useEffect(() => {
        if (config?.defaultValues?.id) {
            controller.getById(config.defaultValues.id)
                .then((fetchedEntity) => {
                    setEntity(fetchedEntity);
                })
                .catch((error: Error) => {
                    console.error("Error fetching video:", error);
                });
        }
    }, []);
    return {
        entity,
        handleChange,
        handleBlur,
        handleSubmit,
        handleBack
    };
}