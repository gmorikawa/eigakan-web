import type { ID } from "@shared/types/id";

import Environment from "@config/environment";

import type { Session } from "@features/auth/types/session";
import type { NewVideo, Video } from "@features/video/types/entity";
import { parseVideo, parseVideoArray } from "@features/video/utils/parser";
import type { BinaryFile } from "@features/file/types/binary";

export async function getAllVideos(session: Session) {
    const response = await fetch(Environment.API_URL.concat("/videos"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    return parseVideoArray(data);
}

export async function getVideoById(session: Session, id: ID) {
    const response = await fetch(Environment.API_URL.concat(`/videos/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    return parseVideo(data);
}

export async function createVideo(session: Session, video: NewVideo) {
    const response = await fetch(Environment.API_URL.concat("/videos"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(video),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    return parseVideo(data);
};

export async function updateVideo(session: Session, id: ID, video: Video) {
    const response = await fetch(Environment.API_URL.concat(`/videos/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(video),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    return parseVideo(data);
};

export async function deleteVideo(session: Session, id: ID) {
    const response = await fetch(Environment.API_URL.concat(`/videos/${id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return true;
};

export async function uploadVideo(session: Session, id: ID, binary: BinaryFile) {
    const formData = new FormData();
    formData.append("file", binary);

    const response = await fetch(Environment.API_URL.concat(`/videos/${id}/upload`), {
        method: "POST",
        headers: {
            "Authorization": session.token ?? "",
        },
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return true;
};

export async function downloadVideo(session: Session, id: ID) {
    const response = await fetch(Environment.API_URL.concat(`/videos/${id}/download`), {
        method: "GET",
        headers: {
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.blob();
};

export function getVideoDownloadUrl(session: Session, id: ID) {
    return `${Environment.API_URL}/videos/${id}/download?auth_token=${encodeURIComponent(session.token ?? "")}`;
}