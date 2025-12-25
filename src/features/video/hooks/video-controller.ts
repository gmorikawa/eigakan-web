import type { ID } from "@shared/types/id";

import { useSession } from "@features/auth/hooks/session";
import type { NewVideo, Video } from "@features/video/types/entity";
import type { BinaryFile } from "@features/file/types/binary";
import {
    createVideo,
    deleteVideo,
    downloadVideo,
    getAllVideos,
    getVideoById,
    getVideoDownloadUrl,
    updateVideo,
    uploadVideo
} from "@features/video/utils/api";

export interface VideoController {
    getAll(): Promise<Video[]>;
    getById(id: ID): Promise<Video>;
    create(video: NewVideo): Promise<Video>;
    update(id: ID, video: Video): Promise<Video>;
    remove(id: ID): Promise<boolean>;
    upload(id: ID, binary: BinaryFile): Promise<boolean>;
    download(id: ID): Promise<Blob | null>;
    downloadUrl(id: ID): string;
}

export function useVideoController(): VideoController {
    const session = useSession();

    const getAll = () => getAllVideos(session);
    const getById = (id: ID) => getVideoById(session, id);
    const create = (video: NewVideo) => createVideo(session, video);
    const update = (id: ID, video: Video) => updateVideo(session, id, video);
    const remove = (id: ID) => deleteVideo(session, id);
    const upload = (id: ID, binary: BinaryFile) => uploadVideo(session, id, binary);
    const download = (id: ID) => downloadVideo(session, id);
    const downloadUrl = (id: ID) => getVideoDownloadUrl(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
        upload,
        download,
        downloadUrl
    };
}
