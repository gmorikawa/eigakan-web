import type { ID } from "@shared/types/id";

import { useSession } from "@features/auth/hooks/session";
import type { NewVideo, Video } from "@features/video/types/entity";
import { createVideo, deleteVideo, getAllVideos, getVideoById, updateVideo } from "../utils/api";

export interface VideoController {
    getAll(): Promise<Video[]>;
    getById(id: ID): Promise<Video>;
    create(video: NewVideo): Promise<Video>;
    update(id: ID, video: Video): Promise<Video>;
    remove(id: ID): Promise<boolean>;
}

export function useVideoController(): VideoController {
    const session = useSession();

    const getAll = () => getAllVideos(session);
    const getById = (id: ID) => getVideoById(session, id);
    const create = (video: NewVideo) => createVideo(session, video);
    const update = (id: ID, video: Video) => updateVideo(session, id, video);
    const remove = (id: ID) => deleteVideo(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    };
}
