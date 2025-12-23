import { useEffect, useState } from "react";
import useNavigator from "@hooks/navigator";

import type { Video } from "@features/video/types/entity";
import { useVideoController, type VideoController } from "@features/video/hooks/video-controller";

export interface VideoListController extends VideoController {
    data: Video[];
    refresh(): Promise<void>;

    handleCreate(): void;
    handleUpdate(video: Video): void;
    handleRemove(video: Video): void;
}

export function useVideoListController(): VideoListController {
    const controller = useVideoController();
    const navigate = useNavigator();
    const [data, setData] = useState<Video[]>([]);

    const loadData = async () => {
        return controller.getAll()
            .then(async (videos: Video[]) => {
                setData(videos);
            })
            .catch((error) => {
                console.error("Error loading videos:", error);
                throw error;
            });
    };

    const refresh = async () => {
        await loadData();
    };

    const handleCreate = () => {
        navigate.to("/admin/video/form");
    };

    const handleUpdate = (video: Video) => {
        navigate.to(`/admin/video/form/${video.id}`);
    };

    const handleRemove = async (video: Video) => {
        controller.remove(video.id)
            .then(async (_: boolean) => {
                refresh();
            })
            .catch((error) => {
                console.error("Error removing video:", error);
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